
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, MapPin, Calendar, Sparkles } from "lucide-react";
import EmotionalSignature from "./EmotionalSignature";

interface DailyMatchProps {
  onStartChat: () => void;
}

const DailyMatch = ({ onStartChat }: DailyMatchProps) => {
  const [isPinned, setIsPinned] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  // Mock match data
  const match = {
    name: "Elena",
    age: 28,
    compatibility: 94,
    distance: "3 miles away",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face",
    emotionalProfile: ["empathy", "depth", "authenticity", "humor"],
    interests: ["Art", "Books", "Hiking", "Cooking"],
    bio: "Looking for someone who believes in the magic of deep conversations and shared silences."
  };

  const handlePin = () => {
    setIsPinned(true);
    setTimeout(() => setShowSignature(true), 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif text-white">Today's Match</h1>
          <p className="text-white/70">
            <Calendar className="w-4 h-4 inline mr-1" />
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Match Card */}
        <Card className={`bg-white/10 backdrop-blur-lg border-white/20 transition-all duration-700 ${
          isPinned ? 'ring-2 ring-pink-400 ring-opacity-60' : ''
        }`}>
          <CardContent className="p-0">
            {/* Profile Image */}
            <div className="relative">
              <img 
                src={match.image} 
                alt={match.name}
                className="w-full h-80 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-lg" />
              
              {/* Compatibility Score */}
              <div className="absolute top-4 right-4">
                <Badge className="bg-pink-500 text-white border-0 text-sm font-bold px-3 py-1">
                  {match.compatibility}% Match
                </Badge>
              </div>

              {/* Basic Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-2xl font-bold text-white mb-1">
                  {match.name}, {match.age}
                </h2>
                <p className="text-white/80 text-sm flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {match.distance}
                </p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6 space-y-4">
              <p className="text-white/90 text-sm leading-relaxed italic">
                "{match.bio}"
              </p>

              {/* Interests */}
              <div>
                <h3 className="text-white font-medium mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {match.interests.map((interest, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-white/10 text-white border-white/20"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                {!isPinned ? (
                  <Button 
                    onClick={handlePin}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-medium py-3 transition-all duration-300 transform hover:scale-105"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Pin Match
                  </Button>
                ) : (
                  <Button 
                    onClick={onStartChat}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-3 transition-all duration-300 transform hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Chatting
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setShowSignature(!showSignature)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Sparkles className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emotional Signature */}
        {showSignature && (
          <div className="animate-fade-in">
            <EmotionalSignature emotions={match.emotionalProfile} />
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center text-white/60 text-sm">
          {isPinned ? (
            <p>💖 Match pinned! You have 24 hours to connect.</p>
          ) : (
            <p>⏰ Pin this match to start your journey together.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyMatch;
