import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizStart from './components/QuizStart';
import Quiz from './components/Quiz';
import Results from './components/Results';
import History from './components/History';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<QuizStart />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;