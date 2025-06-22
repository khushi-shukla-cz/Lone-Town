🌆 Lone Town
Lone Town is a full-stack, cross-platform relationship platform focused on emotional intelligence, daily curated matchmaking, and AI-assisted conversations. Built with modern technologies and a modular architecture, it delivers immersive and meaningful user experiences across web and mobile.

🧩 Architecture Overview
The project is split into three core modules:

client/ – Mobile App  
Tech Stack: React Native (Expo), JavaScript  
Platform: Android, iOS, and Web

Features:
- Real-time messaging with Socket.IO
- Emotion-aware AI chat suggestions
- Intuitive and cinematic mobile UI

match/ – Web App  
Tech Stack: React, TypeScript, Vite, Tailwind CSS, shadcn/ui  
Purpose: Rich interface for onboarding, matchmaking, chat, and emotional profiling

Features:
- Emotion signature onboarding test
- Daily match delivery with compatibility scores (demonstration logic)
- Real-time AI-enhanced chat
- Elegant and responsive UI

server/ – Backend API & AI Services  
Tech Stack: Node.js, Express, MongoDB, Socket.IO, OpenAI / Gemini  
Purpose: Core API, data persistence, authentication, matchmaking (demo), emotional analysis

Features:
- RESTful API for messages and AI suggestions (user/match endpoints are not fully implemented)
- Real-time WebSocket infrastructure
- Emotionally intelligent AI prompts via OpenAI or Gemini
- Robust error handling & MongoDB resilience

✨ Core Features
- Emotionally Intelligent Conversations:  
  AI-generated, context-aware suggestions shaped by each user's emotional profile.
- Daily Matchmaking:  
  One emotionally compatible match per day (demonstration), with deep profiles and unlockable interactions.
- Emotional Signature Test:  
  An onboarding experience that personalizes matchmaking and chat suggestions.
- Real-Time Messaging:  
  Live chat with match progress tracking. (Text chat only; no voice/video implemented.)
- Cross-Platform Experience:  
  Fully responsive and available on mobile (via Expo) and web.

🚀 Getting Started

### Prerequisites
- Node.js & npm [Install Guide]
- MongoDB (local or cloud)
- (Optional) OpenAI / Google Gemini API keys

### Installation
Clone the repo:
```sh
git clone https://github.com/khushi-shukla-cz/Lone-Town
cd lone-town
```

Install dependencies:
```sh
cd client && npm install
cd ../match && npm install
cd ../server && npm install
```

Set up environment variables:
Inside server/.env:
```sh
MONGO_URI=<your_mongodb_connection>
OPENAI_KEY=<your_openai_key>
GEMINI_KEY=<your_google_generative_ai_key>
AI_PROVIDER=openai  # or gemini
PORT=5000
```

Run the apps:

Backend:
```sh
cd server
npm run dev
```

Web App:
```sh
cd ../match
npm run dev
```

Mobile App:
```sh
cd ../client
npm start
```
Follow Expo CLI instructions to launch on device/emulator/browser.

🌍 Deployment
- Web & Backend: Deploy to platforms like Vercel, Render, AWS, or Heroku.
- Mobile App: Publish via Expo, Play Store, and App Store.
- Custom Domain: Point your domain to the deployed frontend and configure CORS/HTTPS for the backend.

🛠️ Tech Stack
| Layer     | Technologies                                      |
|-----------|---------------------------------------------------|
| Frontend  | React, React Native, TypeScript, Vite, Tailwind CSS |
| Backend   | Node.js, Express, MongoDB, Socket.IO              |
| AI/ML     | OpenAI, Google Gemini (Generative AI)             |
| Deployment| Expo, Vercel, Render, AWS, Heroku                 |

🤝 Contributing
We welcome contributions!
- Fork the repository
- Create a feature branch
- Make your changes
- Submit a pull request with a clear description
- For large features, please open an issue first for discussion.

📄 License
This project is licensed under the MIT License.

For detailed implementation, refer to the respective module directories and inline documentation.