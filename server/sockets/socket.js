const { Server } = require("socket.io");
const Message = require('../models/Message');
const Match = require('../models/Match');

function setupSockets(server) {
  const io = new Server(server, { cors: { origin: '*' } });

  io.on("connection", (socket) => {
    console.log('A user connected');

    socket.on("joinMatch", ({ matchId }) => {
      console.log(`User joined match: ${matchId}`);
      socket.join(matchId);
    });

    const { generateAIReply, AI_USER } = require('../ai/emotionEngine');
    const User = require('../models/User');

    socket.on("sendMessage", async (msg) => {
      try {
        // Create a new message
        const newMessage = new Message({
          matchId: msg.matchId,
          sender: msg.sender,
          text: msg.text,
          createdAt: msg.createdAt,
        });

        await newMessage.save();

        // Update the message count for the match
        await Match.findByIdAndUpdate(msg.matchId, { $inc: { messageCount: 1 } });

        // Construct message payload to be sent to the client
        const messageForClient = {
          _id: newMessage._id.toString(), // GiftedChat needs a string _id
          text: newMessage.text,
          createdAt: newMessage.createdAt,
          user: { _id: newMessage.sender }
        };

        // Emit the message to the room
        io.to(msg.matchId).emit("receiveMessage", messageForClient);

        // --- AI AUTOREPLY LOGIC ---
        // Only reply if this isn't the AI itself (avoid infinite loop)
        if (msg.sender !== AI_USER._id) {
          // Fetch the user who sent the message
          const user = await User.findById(msg.sender);
          if (user) {
            // Generate AI reply
            setTimeout(async () => {
              try {
                const aiText = await generateAIReply({
                  lastMessage: msg.text,
                  emotionalValues: user.emotionalValues || [],
                });
                // Save AI message
                const aiMessage = new Message({
                  matchId: msg.matchId,
                  sender: AI_USER._id,
                  text: aiText,
                  createdAt: new Date(),
                });
                await aiMessage.save();
                // Emit AI message
                const aiMessageForClient = {
                  _id: aiMessage._id.toString(),
                  text: aiMessage.text,
                  createdAt: aiMessage.createdAt,
                  user: { _id: AI_USER._id, name: AI_USER.name }
                };
                io.to(msg.matchId).emit("receiveMessage", aiMessageForClient);
              } catch (e) {
                console.error('AI reply error:', e);
              }
            }, 1200); // 1.2s delay for realism
          }
        }
        // --- END AI AUTOREPLY LOGIC ---

      } catch (error) {
        console.error('Error handling sendMessage:', error);
        socket.emit('sendMessageError', { error: 'Failed to send message' });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

module.exports = setupSockets;
