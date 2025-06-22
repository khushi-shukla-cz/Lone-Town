const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// @route   GET /api/messages/:matchId
// @desc    Get all messages for a match
// @access  Public (should be Private in a real app)
router.get('/:matchId', async (req, res) => {
    try {
        const messages = await Message.find({ matchId: req.params.matchId })
            .populate('sender', 'name') // Optionally populate sender info
            .sort({ createdAt: -1 }); // Sort by most recent

        // Map messages to the format expected by GiftedChat
        const formattedMessages = messages.map(msg => ({
            _id: msg._id,
            text: msg.text,
            createdAt: msg.createdAt,
            user: {
                _id: msg.sender._id,
                name: msg.sender.name,
            }
        }));

        res.json(formattedMessages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
