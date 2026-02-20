import { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Coffee, Sparkles } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    value: string;
  }[];
}

interface CoffeeRecommendation {
  name: string;
  roast: string;
  notes: string;
  description: string;
  price: number;
  match: number;
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'How do you typically drink your coffee?',
    options: [
      { text: 'Black, no additions', value: 'black' },
      { text: 'With milk or cream', value: 'milk' },
      { text: 'With sugar or sweetener', value: 'sweet' },
      { text: 'As espresso or cappuccino', value: 'espresso' },
    ],
  },
  {
    id: 2,
    question: 'What flavor profile appeals to you most?',
    options: [
      { text: 'Bright and fruity', value: 'fruity' },
      { text: 'Smooth and balanced', value: 'balanced' },
      { text: 'Bold and intense', value: 'bold' },
      { text: 'Sweet and chocolatey', value: 'chocolate' },
    ],
  },
  {
    id: 3,
    question: 'What brewing method do you use most?',
    options: [
      { text: 'Pour over / Drip', value: 'pourover' },
      { text: 'French Press', value: 'french' },
      { text: 'Espresso machine', value: 'espresso' },
      { text: 'Cold brew', value: 'cold' },
    ],
  },
  {
    id: 4,
    question: 'How adventurous are you with coffee?',
    options: [
      { text: 'I love trying unique origins', value: 'adventurous' },
      { text: 'I prefer classic favorites', value: 'classic' },
      { text: 'Somewhere in between', value: 'moderate' },
      { text: 'I want the most popular choice', value: 'popular' },
    ],
  },
];

interface CoffeeQuizProps {
  onComplete?: (recommendation: CoffeeRecommendation) => void;
}

export function CoffeeQuiz({ onComplete }: CoffeeQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState(1);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate recommendation
      const recommendation = calculateRecommendation(answers);
      setShowResults(true);
      if (onComplete) {
        onComplete(recommendation);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateRecommendation = (answers: Record<number, string>): CoffeeRecommendation => {
    const profiles = {
      fruity: ['Ethiopian Yirgacheffe', 'light', 'Floral notes', 'Bright and fruity with hints of blueberry and jasmine.', 18],
      balanced: ['Colombian Supremo', 'medium', 'Balanced', 'Smooth and well-balanced with caramel sweetness.', 16],
      bold: ['Sumatra Mandheling', 'dark', 'Bold', 'Full-bodied and earthy with chocolate undertones.', 20],
      adventurous: ['Kenyan AA', 'light', 'Bright', 'Complex fruit flavors with wine-like acidity.', 22],
      classic: ['Brazilian Santos', 'dark', 'Nutty', 'Low acidity with chocolate and nut flavors.', 15],
    };

    // Simple recommendation logic based on answers
    const answerValues = Object.values(answers);
    
    if (answerValues.includes('fruity') || answerValues.includes('adventurous')) {
      const [name, roast, notes, description, price] = profiles.adventurous;
      return { name, roast, notes, description, price, match: 95 };
    } else if (answerValues.includes('bold') || answerValues.includes('espresso')) {
      const [name, roast, notes, description, price] = profiles.bold;
      return { name, roast, notes, description, price, match: 92 };
    } else if (answerValues.includes('balanced') || answerValues.includes('moderate')) {
      const [name, roast, notes, description, price] = profiles.balanced;
      return { name, roast, notes, description, price, match: 90 };
    } else {
      const [name, roast, notes, description, price] = profiles.classic;
      return { name, roast, notes, description, price, match: 88 };
    }
  };

  const recommendation = showResults ? calculateRecommendation(answers) : null;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="max-w-2xl mx-auto">
      {!showResults ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <Coffee className="w-6 h-6 text-[var(--caramel)]" />
              <h3 className="text-[var(--espresso)]">Find Your Perfect Coffee</h3>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-[var(--cream)] rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-[var(--caramel)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-sm text-[var(--muted-foreground)] mt-2">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </CardHeader>

          <CardContent className="min-h-[300px] relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentQuestion}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="absolute inset-0 px-6"
              >
                <h4 className="mb-6 text-[var(--espresso)]">
                  {questions[currentQuestion].question}
                </h4>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        answers[currentQuestion] === option.value
                          ? 'bg-[var(--caramel)] text-[var(--white)] shadow-md'
                          : 'bg-[var(--cream)] text-[var(--espresso)] hover:bg-[var(--muted)] border border-[var(--border)]'
                      }`}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
            >
              {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-16 h-16 bg-[var(--caramel)] rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Sparkles className="w-8 h-8 text-[var(--white)]" />
              </motion.div>
              <h3 className="mb-2 text-[var(--espresso)]">Your Perfect Match!</h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-3xl font-bold text-[var(--caramel)]">
                  {recommendation?.match}%
                </span>
                <span className="text-[var(--muted-foreground)]">Match</span>
              </div>
            </CardHeader>

            <CardContent>
              <div className={`h-48 bg-gradient-to-br ${
                recommendation?.roast === 'light' ? 'from-[var(--caramel)] to-[var(--espresso)]' :
                recommendation?.roast === 'medium' ? 'from-[var(--forest)] to-[var(--espresso)]' :
                'from-[#8B6F47] to-[var(--espresso)]'
              } rounded-xl mb-6 relative overflow-hidden`}>
                <Badge variant="bestseller" className="absolute top-4 left-4">
                  Recommended
                </Badge>
              </div>

              <h4 className="mb-2 text-[var(--espresso)]">{recommendation?.name}</h4>
              <p className="text-sm text-[var(--muted-foreground)] mb-4 capitalize">
                {recommendation?.roast} roast • {recommendation?.notes}
              </p>
              <p className="text-sm mb-4">{recommendation?.description}</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold text-[var(--espresso)]">
                  ${recommendation?.price}
                </span>
                <span className="text-sm text-[var(--muted-foreground)]">/ 12oz bag</span>
              </div>
            </CardContent>

            <CardFooter className="flex gap-3">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResults(false);
                }}
              >
                Retake Quiz
              </Button>
              <Button variant="primary" className="flex-1">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  );
}