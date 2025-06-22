
import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { QuestionForm } from "@/components/QuestionForm";
import { ResultsScreen } from "@/components/ResultsScreen";

type Screen = 'welcome' | 'form' | 'results';

interface FormData {
  stuckOn: string;
  barriers: string[];
  values: string[];
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleStart = () => {
    setCurrentScreen('form');
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setCurrentScreen('results');
  };

  const handleReset = () => {
    setFormData(null);
    setCurrentScreen('welcome');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}
      
      {currentScreen === 'form' && (
        <QuestionForm onSubmit={handleFormSubmit} onBack={handleBackToWelcome} />
      )}
      
      {currentScreen === 'results' && formData && (
        <ResultsScreen formData={formData} onReset={handleReset} />
      )}
    </div>
  );
};

export default Index;
