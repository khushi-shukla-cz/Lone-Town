const express = require('express');
const router = express.Router();

const responses = {
  Happy: ['That sounds wonderful! 😊', 'So happy for you! 🌟'],
  Romantic: ['You have such a beautiful soul 💖', 'I feel our connection growing 🌙'],
  Default: ['Tell me more about that!', 'Interesting!']
};

router.post('/suggest-reply', (req, res) => {
  const { emotionalValues = [] } = req.body;
  
  const type = emotionalValues.includes('Happy') ? 'Happy' :
              emotionalValues.includes('Romantic') ? 'Romantic' : 'Default';
  
  const reply = responses[type][Math.floor(Math.random() * responses[type].length)];
  res.json({ response: reply });
});

module.exports = router;
