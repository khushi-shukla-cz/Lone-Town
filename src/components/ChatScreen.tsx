
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Heart, Video, Clock, Sparkles } from "lucide-react";

interface ChatScreenProps {
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'match';
  timestamp: Date;
}

const ChatScreen = ({ onBack }: ChatScreenProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I loved reading about your interest in art. What kind of art speaks to your soul?",
      sender: 'match',
      timestamp: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: '2',
      text: "Hello Elena! I'm drawn to impressionist paintings - there's something about the way they capture fleeting moments that feels so real to me. What about you?",
      sender: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 25)
    },
    {
      id: '3',
      text: "That's beautiful! I feel the same way about photography - capturing those perfect imperfect moments. Do you have a favorite impressionist artist?",
      sender: 'match',
      timestamp: new Date(Date.now() - 1000 * 60 * 20)
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(47);
  const [timeLeft, setTimeLeft] = useState("41h 23m");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage("");
    setMessageCount(messageCount + 1);

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate response (in real app, this would come from the other user)
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const progressPercentage = (messageCount / 100) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-medium">E</span>
              </div>
              <div>
                <h2 className="text-white font-medium">Elena</h2>
                <p className="text-white/60 text-sm">Active now</p>
              </div>
            </div>
          </div>

          <div className="text-right">
            <Badge className="bg-purple-500 text-white border-0">
              94% Match
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Banner */}
      <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-b border-white/10 p-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-sm text-white/90 mb-2">
            <span className="flex items-center">
              <Heart className="w-4 h-4 mr-1 text-pink-400" />
              {messageCount}/100 messages
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-blue-400" />
              {timeLeft} left
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-center text-white/70 text-xs mt-2">
            {100 - messageCount} messages until video unlock! 💖
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'bg-white/10 backdrop-blur-lg text-white border border-white/20'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-white/50'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/10 backdrop-blur-lg text-white border border-white/20 px-4 py-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white/10 backdrop-blur-lg border-t border-white/20 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Emotional prompt */}
          <div className="mb-3 text-center">
            <p className="text-white/60 text-sm flex items-center justify-center">
              <Sparkles className="w-3 h-3 mr-1" />
              Try: "What's a memory that always makes you smile?"
            </p>
          </div>

          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your heart..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-12"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-2"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
