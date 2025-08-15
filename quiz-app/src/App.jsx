import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import QuizStart from './pages/QuizStart';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import History from './pages/History';
import NotFound from './pages/NotFound'; // We'll create this later

function App() {
  return (
    <Router>
      <Layout> {/* Wrap all routes in a common layout */}
        <Routes>
          <Route path="/" element={<QuizStart />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<NotFound />} /> {/* Catch unmatched routes */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;