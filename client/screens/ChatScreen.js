import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { useState, useEffect, useCallback } from 'react';
import { Button, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import socket from '../services/socket';
import axios from 'axios';

// IMPORTANT: Make sure this URL matches your backend server address
const API_URL = 'http://10.0.2.2:5000/api';

const ChatScreen = ({ matchId, user }) => {
  const [messages, setMessages] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_URL}/messages/${matchId}`);
        setMessages(res.data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };
    fetchMessages();
  }, [matchId]);

  // Setup socket listeners
  useEffect(() => {
    socket.emit('joinMatch', { matchId, userId: user._id });

    socket.on('receiveMessage', (msg) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, [msg]));
    });

    socket.on('connect_error', (err) => {
      console.log('Socket connection error:', err.message);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('connect_error');
      // Consider if you want to disconnect on screen leave
      // socket.disconnect(); 
    };
  }, [matchId, user._id]);

  const onSend = useCallback((newMessages = []) => {
    const messageToSend = {
      matchId,
      sender: user._id,
      text: newMessages[0].text,
      createdAt: new Date(),
    };
    socket.emit('sendMessage', messageToSend);
    setAiSuggestion(''); // Clear old suggestion on send
  }, [matchId, user._id]);

  const getAISuggestion = async () => {
    if (loadingSuggestion || messages.length === 0) return;
    setLoadingSuggestion(true);
    try {
      const res = await axios.post(`${API_URL}/ai/suggest-reply`, {
        lastMessage: messages[0]?.text,
        emotionalValues: user.emotionalValues,
      });
      setAiSuggestion(res.data.suggestion);
    } catch (error) {
      console.error('Failed to get AI suggestion:', error);
      setAiSuggestion('Could not get a suggestion. Try again.');
    } finally {
      setLoadingSuggestion(false);
    }
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: user._id }}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: { backgroundColor: '#e8eaf6' }, // Partner's messages
              right: { backgroundColor: '#ffe0e9' }, // User's messages
            }}
          />
        )}
      />
      <View style={styles.suggestionContainer}>
        {loadingSuggestion ? (
          <ActivityIndicator size="small" color="#ffb6c1" />
        ) : aiSuggestion ? (
          <Text style={styles.suggestionText}>💡 Try: {aiSuggestion}</Text>
        ) : null}
        <Button title="Lovable AI Suggestion 💖" onPress={getAISuggestion} disabled={loadingSuggestion || messages.length === 0} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  suggestionContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  suggestionText: {
    textAlign: 'center',
    paddingBottom: 10,
    color: '#555',
  },
});

export default ChatScreen;
