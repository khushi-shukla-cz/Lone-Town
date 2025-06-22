
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star, Moon, Sun } from "lucide-react";

interface EmotionTestProps {
  onComplete: () => void;
}

const emotionQuestions = [
  {
    question: "When you're feeling overwhelmed, what brings you the most comfort?",
    options: [
      { text: "A quiet evening with someone special", value: "intimacy", icon: Heart },
      { text: "Deep conversation under the stars", value: "depth", icon: Star },
      { text: "Peaceful solitude to reflect", value: "introspection", icon: Moon },
      { text: "Adventure and new experiences", value: "spontaneity", icon: Sun }
    ]
  },
  {
    question: "What does vulnerability mean to you in a relationship?",
    options: [
      { text: "Sharing your deepest fears and dreams", value: "emotional_openness", icon: Heart },
      { text: "Being completely authentic", value: "authenticity", icon: Star },
      { text: "Trusting someone with your heart", value: "trust", icon: Moon },
      { text: "Growing together through challenges", value: "growth", icon: Sun }
    ]
  },
  {
    question: "How do you prefer to show love?",
    options: [
      { text: "Through gentle touch and presence", value: "physical_affection", icon: Heart },
      { text: "With thoughtful words and gestures", value: "verbal_affection", icon: Star },
      { text: "By creating meaningful memories", value: "quality_time", icon: Moon },
      { text: "Through acts of service and care", value: "acts_of_service", icon: Sun }
    ]
  },
  {
    question: "What draws you most to someone?",
    options: [
      { text: "Their emotional intelligence and empathy", value: "empathy", icon: Heart },
      { text: "Their sense of humor and playfulness", value: "humor", icon: Star },
      { text: "Their wisdom and depth of thinking", value: "wisdom", icon: Moon },
      { text: "Their passion and zest for life", value: "passion", icon: Sun }
    ]
  }
];

const EmotionTest = ({ onComplete }: EmotionTestProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswer = (value: string) => {
    setIsAnimating(true);
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    setTimeout(() => {
      if (currentQuestion < emotionQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setIsAnimating(false);
      } else {
        // Store emotional profile
        localStorage.setItem('emotionalProfile', JSON.stringify(newAnswers));
        onComplete();
      }
    }, 800);
  };

  const question = emotionQuestions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            {emotionQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  index <= currentQuestion 
                    ? 'bg-pink-400 shadow-lg shadow-pink-400/50' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-white/70 text-sm">
            Question {currentQuestion + 1} of {emotionQuestions.length}
          </p>
        </div>

        <Card className={`bg-white/10 backdrop-blur-lg border-white/20 transition-all duration-800 ${
          isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
        }`}>
          <CardContent className="p-8">
            <h2 className="text-2xl font-serif text-white text-center mb-8 leading-relaxed">
              {question.question}
            </h2>
            
            <div className="space-y-4">
              {question.options.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full h-auto p-6 text-left justify-start bg-white/5 hover:bg-white/20 border border-white/10 hover:border-pink-400/50 transition-all duration-300 group"
                    onClick={() => handleAnswer(option.value)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-pink-400/20 group-hover:bg-pink-400/30 transition-colors">
                        <IconComponent className="w-5 h-5 text-pink-400" />
                      </div>
                      <span className="text-white text-lg font-medium">
                        {option.text}
                      </span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-white/60 text-sm italic">
            ✨ Discovering your emotional essence ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmotionTest;
