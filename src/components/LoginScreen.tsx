
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, Sparkles } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your authentication system
    console.log("Auth attempt:", { email, password, name });
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-pink-400/20">
                <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
              </div>
            </div>
            <CardTitle className="text-2xl font-serif text-white">
              {isLogin ? "Welcome Back" : "Join Lone Town"}
            </CardTitle>
            <p className="text-white/70">
              {isLogin 
                ? "Your soulmate is waiting" 
                : "Where hearts find their match"
              }
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/80">Name</Label>
                  <div className="relative">
                    <Sparkles className="absolute left-3 top-3 w-4 h-4 text-pink-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your beautiful name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-pink-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-pink-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 transition-all duration-300 transform hover:scale-105"
              >
                {isLogin ? "Enter Your Heart's Home" : "Begin Your Journey"}
              </Button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-pink-400 hover:text-pink-300 transition-colors"
              >
                {isLogin 
                  ? "New to Lone Town? Create your story" 
                  : "Already have an account? Welcome back"
                }
              </button>
            </div>

            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-white/60 text-sm">
                💖 One match. One day. One chance at magic. 💖
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginScreen;
