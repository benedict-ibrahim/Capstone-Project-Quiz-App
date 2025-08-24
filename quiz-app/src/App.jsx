import { useState } from "react";
import QuizStart from "./components/QuizStart";

function App() {
  const [quizSettings, setQuizSettings] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!quizSettings ? (
        <QuizStart onStart={setQuizSettings} />
      ) : (
        <div>
          {/* Placeholder – will show quiz questions here later */}
          <h2 className="text-2xl font-bold">Quiz starting soon...</h2>
          <pre>{JSON.stringify(quizSettings, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
