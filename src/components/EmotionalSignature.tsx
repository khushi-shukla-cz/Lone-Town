
import { Heart, Sparkles, Moon, Sun, Star, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmotionalSignatureProps {
  emotions: string[];
}

const emotionIcons = {
  empathy: Heart,
  depth: Moon,
  authenticity: Star,
  humor: Sun,
  passion: Zap,
  introspection: Moon,
  spontaneity: Sparkles,
  wisdom: Star,
  trust: Heart,
  growth: Sparkles
};

const emotionColors = {
  empathy: "text-pink-400",
  depth: "text-blue-400",
  authenticity: "text-purple-400",
  humor: "text-yellow-400",
  passion: "text-red-400",
  introspection: "text-indigo-400",
  spontaneity: "text-green-400",
  wisdom: "text-amber-400",
  trust: "text-teal-400",
  growth: "text-emerald-400"
};

const EmotionalSignature = ({ emotions }: EmotionalSignatureProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-white font-serif">Emotional Signature</CardTitle>
        <p className="text-white/70 text-sm">Your hearts align in these beautiful ways</p>
      </CardHeader>
      
      <CardContent>
        <div className="relative">
          {/* Central heart */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                <Heart className="w-8 h-8 text-white" fill="currentColor" />
              </div>
              
              {/* Orbiting emotions */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                {emotions.map((emotion, index) => {
                  const IconComponent = emotionIcons[emotion as keyof typeof emotionIcons] || Heart;
                  const colorClass = emotionColors[emotion as keyof typeof emotionColors] || "text-white";
                  const angle = (index * 360) / emotions.length;
                  const radius = 50;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  return (
                    <div
                      key={emotion}
                      className="absolute w-8 h-8 flex items-center justify-center"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                        left: '50%',
                        top: '50%',
                        marginLeft: '-16px',
                        marginTop: '-16px'
                      }}
                    >
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <IconComponent className={`w-4 h-4 ${colorClass}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Emotion labels */}
          <div className="text-center space-y-2">
            <h3 className="text-white font-medium mb-3">Shared Emotional Values</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {emotions.map((emotion) => (
                <span 
                  key={emotion}
                  className="px-3 py-1 bg-white/10 rounded-full text-white/90 text-sm capitalize border border-white/20"
                >
                  {emotion.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-white/60 text-sm italic">
              "Your emotional universe aligns here ✨"
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionalSignature;
