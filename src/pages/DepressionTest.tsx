import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, Heart, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';

// PHQ-9 questions for depression screening
const questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself"
];

const options = [
  { value: "0", label: "Not at all", score: 0 },
  { value: "1", label: "Several days", score: 1 },
  { value: "2", label: "More than half the days", score: 2 },
  { value: "3", label: "Nearly every day", score: 3 }
];

const getResultInterpretation = (score: number) => {
  if (score >= 0 && score <= 4) {
    return {
      level: "Minimal",
      description: "You may be experiencing minimal depression symptoms. This is within the normal range.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      icon: CheckCircle,
      recommendation: "Continue maintaining good mental health practices like regular exercise, social connections, and adequate sleep."
    };
  } else if (score >= 5 && score <= 9) {
    return {
      level: "Mild",
      description: "You may be experiencing mild depression symptoms. Consider monitoring your mood and seeking support if symptoms persist.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: AlertCircle,
      recommendation: "Consider lifestyle changes, stress management techniques, or speaking with a healthcare provider."
    };
  } else if (score >= 10 && score <= 14) {
    return {
      level: "Moderate",
      description: "You may be experiencing moderate depression symptoms. It's recommended to speak with a mental health professional.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      icon: AlertCircle,
      recommendation: "We recommend consulting with a therapist or your healthcare provider for proper evaluation and support."
    };
  } else if (score >= 15 && score <= 19) {
    return {
      level: "Moderately Severe",
      description: "You may be experiencing moderately severe depression symptoms. Professional help is strongly recommended.",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: AlertCircle,
      recommendation: "Please consider seeking professional help immediately. Contact a mental health provider or your doctor."
    };
  } else {
    return {
      level: "Severe",
      description: "You may be experiencing severe depression symptoms. Immediate professional help is strongly recommended.",
      color: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      icon: AlertCircle,
      recommendation: "Please seek immediate professional help. Contact a mental health crisis line, your doctor, or go to an emergency room if you're having thoughts of self-harm."
    };
  }
};

const DepressionTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const handleAnswer = (questionIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((total, answer) => {
      const option = options.find(opt => opt.value === answer);
      return total + (option?.score || 0);
    }, 0);
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setIsStarted(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const score = calculateScore();
  const result = getResultInterpretation(score);
  const ResultIcon = result.icon;

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary-hover mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="text-center mb-12">
              <Heart className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                Depression Self-Assessment
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Take this confidential self-assessment to better understand your mental health. 
                This tool is based on the PHQ-9, a validated depression screening questionnaire.
              </p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle>Before You Begin</CardTitle>
                <CardDescription>
                  Please read the following important information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Important:</strong> This assessment is not a diagnostic tool and cannot replace professional medical advice. 
                    If you're experiencing thoughts of self-harm, please seek immediate help.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">This test takes approximately 3-5 minutes to complete</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Your responses are completely confidential</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">You'll receive immediate results with recommendations</p>
                  </div>
                </div>

                <div className="bg-accent/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Crisis Resources</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    If you're in crisis or having thoughts of self-harm:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Call 988 (Suicide & Crisis Lifeline)</li>
                    <li>• Text "HELLO" to 741741 (Crisis Text Line)</li>
                    <li>• Go to your nearest emergency room</li>
                  </ul>
                </div>

                <Button 
                  onClick={() => setIsStarted(true)} 
                  className="w-full"
                  size="lg"
                >
                  Start Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary-hover mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Assessment Results</h1>
              <p className="text-lg text-muted-foreground">
                Based on your responses to the PHQ-9 questionnaire
              </p>
            </div>

            <Card className="max-w-2xl mx-auto mb-8">
              <CardContent className="pt-6">
                <div className={`text-center p-6 rounded-lg border-2 ${result.bgColor} ${result.borderColor} mb-6`}>
                  <ResultIcon className={`w-12 h-12 mx-auto mb-4 ${result.color}`} />
                  <h2 className={`text-2xl font-bold mb-2 ${result.color}`}>
                    {result.level} Depression Symptoms
                  </h2>
                  <p className="text-lg mb-2">Score: {score}/27</p>
                  <p className="text-muted-foreground">{result.description}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Recommendation</h3>
                  <p className="text-muted-foreground">{result.recommendation}</p>
                  
                  {score >= 10 && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Next Steps:</strong> Consider reaching out to a mental health professional. 
                        You can find qualified therapists on our platform who specialize in depression treatment.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={restartTest} variant="outline">
                Retake Assessment
              </Button>
              <Button asChild>
                <Link to="/therapists">Find a Therapist</Link>
              </Button>
            </div>

            <Card className="max-w-2xl mx-auto mt-8">
              <CardHeader>
                <CardTitle>Understanding Your Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Score Ranges:</h4>
                  <ul className="space-y-1 text-sm">
                    <li><span className="font-medium">0-4:</span> Minimal depression</li>
                    <li><span className="font-medium">5-9:</span> Mild depression</li>
                    <li><span className="font-medium">10-14:</span> Moderate depression</li>
                    <li><span className="font-medium">15-19:</span> Moderately severe depression</li>
                    <li><span className="font-medium">20-27:</span> Severe depression</li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground">
                  This assessment is based on the Patient Health Questionnaire-9 (PHQ-9), 
                  a validated tool used by healthcare professionals for depression screening.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary-hover mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">
                Question {currentQuestion + 1} of {questions.length}
              </h1>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Over the last 2 weeks, how often have you been bothered by:
              </CardTitle>
              <CardDescription className="text-base font-medium">
                {questions[currentQuestion]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion] || ""}
                onValueChange={(value) => handleAnswer(currentQuestion, value)}
                className="space-y-4"
              >
                {options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`option-${option.value}`} />
                    <Label 
                      htmlFor={`option-${option.value}`} 
                      className="text-base cursor-pointer flex-1 py-2"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion]}
                >
                  {currentQuestion === questions.length - 1 ? 'View Results' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              All responses are confidential and will not be stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepressionTest;