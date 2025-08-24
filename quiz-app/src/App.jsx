import { useState, useEffect } from "react";
import QuizStart from "./components/QuizStart";
import QuestionCard from "./components/QuestionCard";
import ScoreSummary from "./components/ScoreSummary";

function App() {
  const [quizSettings, setQuizSettings] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  // Fetch questions once settings are chosen
  useEffect(() => {
    if (!quizSettings) return;

    setLoading(true);
    const { category, difficulty, amount } = quizSettings;

    let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.results.map((q) => {
          const answers = [...q.incorrect_answers];
          const randomIndex = Math.floor(Math.random() * (answers.length + 1));
          answers.splice(randomIndex, 0, q.correct_answer);
          return { ...q, answers };
        });
        setQuestions(formatted);
      })
      .catch((err) => console.error("Error fetching questions:", err))
      .finally(() => setLoading(false));
  }, [quizSettings]);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentIndex];

    if (answer === currentQuestion.correct_answer) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => [...prev, answer]);
    setCurrentIndex((prev) => prev + 1);
  };

  const restartQuiz = () => {
    setQuizSettings(null);
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setUserAnswers([]);
  };

  // Show Start Screen
  if (!quizSettings) return <QuizStart onStart={setQuizSettings} />;

  // Show Loading
  if (loading) return <div className="text-center text-xl">Loading...</div>;

  // Show Questions
  if (currentIndex < questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <QuestionCard
          question={questions[currentIndex]}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      </div>
    );
  }

  // Show Final Summary
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <ScoreSummary
        questions={questions}
        userAnswers={userAnswers}
        score={score}
        onRestart={restartQuiz}
      />
    </div>
  );
}

export default App;
