
import { useState } from "react";
import EmotionTest from "@/components/EmotionTest";
import LoginScreen from "@/components/LoginScreen";
import DailyMatch from "@/components/DailyMatch";
import ChatScreen from "@/components/ChatScreen";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'emotion' | 'login' | 'match' | 'chat'>('emotion');
  const [emotionTestCompleted, setEmotionTestCompleted] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleEmotionTestComplete = () => {
    setEmotionTestCompleted(true);
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    setUserLoggedIn(true);
    setCurrentScreen('match');
  };

  const handleStartChat = () => {
    setCurrentScreen('chat');
  };

  const handleBackToMatch = () => {
    setCurrentScreen('match');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Romantic background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white font-serif">Lone Town</h1>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentScreen('emotion')}
              className="text-white hover:bg-white/20"
            >
              Test
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentScreen('login')}
              className="text-white hover:bg-white/20"
            >
              Login
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentScreen('match')}
              className="text-white hover:bg-white/20"
            >
              Match
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentScreen('chat')}
              className="text-white hover:bg-white/20"
            >
              Chat
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {currentScreen === 'emotion' && (
          <EmotionTest onComplete={handleEmotionTestComplete} />
        )}
        {currentScreen === 'login' && (
          <LoginScreen onLogin={handleLogin} />
        )}
        {currentScreen === 'match' && (
          <DailyMatch onStartChat={handleStartChat} />
        )}
        {currentScreen === 'chat' && (
          <ChatScreen onBack={handleBackToMatch} />
        )}
      </div>
    </div>
  );
};

export default Index;
