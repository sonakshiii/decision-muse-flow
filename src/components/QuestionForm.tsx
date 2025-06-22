
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface FormData {
  stuckOn: string;
  barriers: string[];
  values: string[];
}

interface QuestionFormProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

const barriers = [
  "Fear of failure 😰",
  "Fear of judgment 👀", 
  "Overthinking 🌪️",
  "Imposter syndrome 🎭",
  "Perfectionism ✨",
  "I don't know where to start 🤷‍♀️"
];

const values = [
  "Growth 🌱",
  "Creativity 🎨", 
  "Self-trust 💪",
  "Freedom 🕊️",
  "Stability 🏠",
  "Expression 💬"
];

export function QuestionForm({ onSubmit, onBack }: QuestionFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    stuckOn: "",
    barriers: [],
    values: []
  });

  const handleBarrierChange = (barrier: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      barriers: checked 
        ? [...prev.barriers, barrier]
        : prev.barriers.filter(b => b !== barrier)
    }));
  };

  const handleValueChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      values: checked
        ? [...prev.values, value]
        : prev.values.filter(v => v !== value)
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.stuckOn.trim().length > 0;
      case 2: return formData.barriers.length > 0;
      case 3: return formData.values.length > 0;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  step <= currentStep 
                    ? 'bg-gradient-to-r from-blush-400 to-lavender-400' 
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-500">
            Step {currentStep} of 3
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 animate-slide-in-up">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-gray-800">
                  What are you stuck on? 🤔
                </h2>
                <p className="text-gray-600">
                  Be as specific or as vague as you want
                </p>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="stuck-on" className="text-gray-700 font-medium">
                  I want to...
                </Label>
                <Input
                  id="stuck-on"
                  value={formData.stuckOn}
                  onChange={(e) => setFormData(prev => ({ ...prev, stuckOn: e.target.value }))}
                  placeholder="start a podcast but I'm scared..."
                  className="text-lg p-4 rounded-2xl border-gray-200 focus:border-blush-300 focus:ring-blush-200"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-gray-800">
                  What's holding you back? 🚧
                </h2>
                <p className="text-gray-600">
                  Select all that apply
                </p>
              </div>
              
              <div className="space-y-4">
                {barriers.map((barrier) => (
                  <div key={barrier} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blush-50/50 transition-colors">
                    <Checkbox
                      id={barrier}
                      checked={formData.barriers.includes(barrier)}
                      onCheckedChange={(checked) => handleBarrierChange(barrier, checked as boolean)}
                      className="border-2 border-blush-300 data-[state=checked]:bg-blush-400"
                    />
                    <Label htmlFor={barrier} className="text-gray-700 cursor-pointer flex-1">
                      {barrier}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-gray-800">
                  What matters most to you right now? 💫
                </h2>
                <p className="text-gray-600">
                  Choose what resonates with you
                </p>
              </div>
              
              <div className="space-y-4">
                {values.map((value) => (
                  <div key={value} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-lavender-50/50 transition-colors">
                    <Checkbox
                      id={value}
                      checked={formData.values.includes(value)}
                      onCheckedChange={(checked) => handleValueChange(value, checked as boolean)}
                      className="border-2 border-lavender-300 data-[state=checked]:bg-lavender-400"
                    />
                    <Label htmlFor={value} className="text-gray-700 cursor-pointer flex-1">
                      {value}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-mint-400 to-blush-400 hover:from-mint-500 hover:to-blush-500 text-white font-medium rounded-full px-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 3 ? 'Unblock Me' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
