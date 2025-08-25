// src/components/QuizHistory.jsx
function QuizHistory({ history, onBack }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">📜 Quiz History</h2>
        {history.length === 0 ? (
          <p className="text-gray-600 text-center">No history yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {history.map((quiz, index) => (
              <li key={index} className="py-3">
                <p className="font-semibold">
                  {quiz.score}/{quiz.total} correct
                </p>
                <p className="text-sm text-gray-600">
                  Category: {quiz.category || "Any"} | Difficulty:{" "}
                  {quiz.difficulty || "Any"} | {quiz.amount} Qs
                </p>
                <p className="text-xs text-gray-500">📅 {quiz.date}</p>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={onBack}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

export default QuizHistory;
