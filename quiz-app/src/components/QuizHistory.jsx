function QuizHistory({ history }) {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-lg font-bold mb-2">Quiz History</h2>
      <ul className="space-y-2">
        {history.map((quiz, index) => (
          <li
            key={index}
            className="p-2 border rounded-md bg-gray-50 flex justify-between"
          >
            <div>
              <p className="font-semibold">
                {quiz.category || "Any Category"} - {quiz.difficulty || "Any"}
              </p>
              <p className="text-sm text-gray-600">{quiz.date}</p>
            </div>
            <div className="font-bold">
              {quiz.score}/{quiz.total}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizHistory;
