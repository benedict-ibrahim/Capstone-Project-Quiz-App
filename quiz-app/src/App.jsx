import { useState, useEffect } from "react";
import QuizStart from "./components/QuizStart";
import QuestionCard from "./components/QuestionCard";
import ScoreSummary from "./components/ScoreSummary";
import QuizHistory from "./components/QuizHistory";

function App() {
  const [quizSettings, setQuizSettings] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizHistory, setQuizHistory] = useState(() => {
    const saved = localStorage.getItem("quizHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [viewHistory, setViewHistory] = useState(false); // toggle between start & history

  // Save history to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
  }, [quizHistory]);

  // Fetch questions once settings are chosen
  useEffect(() => {
    if (!quizSettings) return;

    setLoading(true);
    setError(null);
    const { category, difficulty, amount } = quizSettings;

    let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!data.results || data.results.length === 0) {
          setError("⚠️ No questions available. Try different settings.");
          return;
        }

        const formatted = data.results.map((q) => {
          const answers = [...q.incorrect_answers];
          const randomIndex = Math.floor(Math.random() * (answers.length + 1));
          answers.splice(randomIndex, 0, q.correct_answer);
          return { ...q, answers };
        });
        setQuestions(formatted);
      })
      .catch(() => {
        setError("❌ Failed to fetch questions. Please check your connection.");
      })
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
    setError(null);
  };

  // Save results into history when quiz ends
  const finishQuiz = () => {
    const newEntry = {
      score,
      total: questions.length,
      category: quizSettings.category,
      difficulty: quizSettings.difficulty,
      amount: quizSettings.amount,
      date: new Date().toLocaleString(),
    };
    setQuizHistory((prev) => [newEntry, ...prev]);
  };

  // Show Start Screen
  if (!quizSettings) {
    if (viewHistory) {
      return <QuizHistory history={quizHistory} onBack={() => setViewHistory(false)} />;
    }
    return <QuizStart onStart={setQuizSettings} onViewHistory={() => setViewHistory(true)} />;
  }

  // Show Loading
  if (loading) return <div className="text-center text-xl">Loading...</div>;

  // Show Error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-md text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button
            onClick={restartQuiz}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

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
  finishQuiz(); // save score
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
