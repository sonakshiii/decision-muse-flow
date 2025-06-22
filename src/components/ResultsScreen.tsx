
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sparkles, Rocket, RotateCcw } from "lucide-react";

interface FormData {
  stuckOn: string;
  barriers: string[];
  values: string[];
}

interface ResultsScreenProps {
  formData: FormData;
  onReset: () => void;
}

export function ResultsScreen({ formData, onReset }: ResultsScreenProps) {
  const generateInsights = () => {
    // Simple logic to generate personalized insights based on form data
    const hasFearsBarriers = formData.barriers.some(b => 
      b.includes('Fear of failure') || b.includes('Fear of judgment')
    );
    
    const hasOverthinking = formData.barriers.some(b => 
      b.includes('Overthinking') || b.includes('Perfectionism')
    );
    
    const valuesGrowthCreativity = formData.values.some(v => 
      v.includes('Growth') || v.includes('Creativity')
    );

    let whyStuck = "You're experiencing a natural part of growth - that tension between where you are and where you want to be.";
    let reframe = "This isn't a problem to solve, it's an invitation to trust yourself.";
    let firstStep = "Take 10 minutes today to do the smallest possible version of what you want to do.";

    if (hasFearsBarriers) {
      whyStuck = "Fear is showing up because this matters to you. It's your mind's way of protecting something precious.";
      reframe = "Fear isn't a stop sign - it's a compass pointing toward what's important to you.";
    }

    if (hasOverthinking) {
      reframe = "Your brain is trying to solve everything at once. What if you only had to figure out the very next step?";
      firstStep = "Set a timer for 5 minutes and just begin - don't aim to finish, just start.";
    }

    if (valuesGrowthCreativity) {
      firstStep = "Create something imperfect today. Growth happens in the messy middle, not the polished end.";
    }

    return { whyStuck, reframe, firstStep };
  };

  const insights = generateInsights();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Here's what I see ✨
          </h1>
          <p className="text-gray-600 text-lg">
            For: "{formData.stuckOn}"
          </p>
        </div>

        <div className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blush-100 p-3 rounded-full">
                  <Brain className="w-6 h-6 text-blush-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    🧠 Why You're Stuck
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {insights.whyStuck}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-mint-100 p-3 rounded-full">
                  <Sparkles className="w-6 h-6 text-mint-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    ✨ Reframe It
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {insights.reframe}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-lavender-100 p-3 rounded-full">
                  <Rocket className="w-6 h-6 text-lavender-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    🚀 Your First Step
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {insights.firstStep}
                  </p>
                  <div className="bg-gradient-to-r from-mint-50 to-blush-50 p-4 rounded-xl border border-mint-200">
                    <p className="text-sm text-gray-600 italic">
                      Remember: Progress over perfection. You've got this! 💪
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <Button
            onClick={onReset}
            variant="outline"
            className="bg-white/50 hover:bg-white/80 border-gray-200 text-gray-700 rounded-full px-8 py-3"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          <p className="text-sm text-gray-500">
            Made with care 💜
          </p>
        </div>
      </div>
    </div>
  );
}
