
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <Heart className="w-16 h-16 mx-auto text-blush-400 animate-gentle-bounce" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Feeling stuck? 🤔
          </h1>
          <p className="text-lg text-gray-600 font-light leading-relaxed px-4">
            This tool helps you take the first step — no pressure, no judgment. ✨
          </p>
        </div>
        
        <Button 
          onClick={onStart}
          size="lg"
          className="bg-gradient-to-r from-blush-400 to-lavender-400 hover:from-blush-500 hover:to-lavender-500 text-white font-medium py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Let's Unblock This 🚀
        </Button>
        
        <p className="text-sm text-gray-500">
          A gentle approach to getting unstuck
        </p>
      </div>
    </div>
  );
}
