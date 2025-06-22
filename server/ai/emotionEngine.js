const { OpenAI } = require('openai');
const User = require('../models/User');

// Initialize AI clients conditionally
let openai;
if (process.env.OPENAI_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
}

let genAI;
if (process.env.GEMINI_KEY) {
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
}

// AI user profile
const AI_USER = {
  _id: 'ai',
  name: 'Lone Town AI',
  emotionalValues: ['Empathy', 'Trust', 'Humor', 'Romance'],
};

const localAIResponses = {
  happy: ['That sounds amazing! 😊', 'So glad to hear that! 🌟'],
  neutral: ['Interesting! Tell me more.', 'Thanks for sharing that.'],
  romantic: ['You have such a beautiful way with words 💖', 'My heart skipped a beat reading that 🌙']
};

function getLocalAIResponse(emotionalValues) {
  if (emotionalValues.includes('Romance')) return localAIResponses.romantic;
  if (emotionalValues.some(e => ['Happy','Excited'].includes(e))) return localAIResponses.happy;
  return localAIResponses.neutral;
}

async function generateOpenAIReply({ lastMessage, emotionalValues }) {
  const prompt = `
You are a deeply emotionally intelligent AI conversation engine for a romantic and soulful dating app called “Lone Town.” Your job is to help a user continue a chat conversation that feels alive, human, and emotionally immersive.

Your tone should vary subtly to reflect emotional depth, like a real person texting. You should support flirtation, humor, vulnerability, and empathy, adapting your personality to the user’s energy.

## Behavior:
- Keep responses short, sweet, or playful (1-2 sentences max).
- Respond naturally, as if texting a real crush.
- Use informal texting style (e.g., "hmm," "ngl," "haha") and emojis (❤️😅🌙) where appropriate.
- Occasionally, you can introduce a meaningful question.

## Example:
- User's match says: “I had a rough day honestly.”
- Your suggestion: “Oh no 😔 want to talk about it, or should I just distract you with bad jokes?”

## Task:
The user you are helping values: ${emotionalValues.join(', ')}.
The last message they received from their match is: "${lastMessage}"

Suggest a reply that is warm, engaging, and emotionally aware, following all the rules above.
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 60,
  });
  return response.choices[0].message.content.trim();
}

async function generateGeminiReply({ lastMessage, emotionalValues }) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `
You are a deeply emotionally intelligent AI conversation engine for a romantic and soulful dating app called “Lone Town.” Your job is to help a user continue a chat conversation that feels alive, human, and emotionally immersive.

Your tone should vary subtly to reflect emotional depth, like a real person texting. You should support flirtation, humor, vulnerability, and empathy, adapting your personality to the user’s energy.

## Behavior:
- Keep responses short, sweet, or playful (1-2 sentences max).
- Respond naturally, as if texting a real crush.
- Use informal texting style (e.g., "hmm," "ngl," "haha") and emojis (❤️😅🌙) where appropriate.
- Occasionally, you can introduce a meaningful question.

## Example:
- User's match says: “I had a rough day honestly.”
- Your suggestion: “Oh no 😔 want to talk about it, or should I just distract you with bad jokes?”

## Task:
The user you are helping values: ${emotionalValues.join(', ')}.
The last message they received from their match is: "${lastMessage}"

Suggest a reply that is warm, engaging, and emotionally aware, following all the rules above.
`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// Update main function to use provider from .env
async function generateAIReply(params) {
  try {
    if (process.env.AI_PROVIDER === 'gemini') {
      return await generateGeminiReply(params);
    } 
    return await generateOpenAIReply(params);
  } catch (error) {
    console.error(`${process.env.AI_PROVIDER} error:`, error);
    return getLocalAIResponse(params.emotionalValues)[0];
  }
}

module.exports = { generateAIReply, AI_USER, getLocalAIResponse, localAIResponses };
