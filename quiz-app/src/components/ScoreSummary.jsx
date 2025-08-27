/* eslint-disable react/prop-types */
export default function ScoreSummary({ questions, userAnswers, score, onRestart }) {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">🎉 Quiz Complete!</h1>
      <p className="text-lg text-gray-700 mb-6">
        You scored <span className="font-bold">{score}</span> out of{" "}
        <span className="font-bold">{questions.length}</span>
      </p>

      {/* Answers review */}
      <div className="text-left space-y-4 max-h-80 overflow-y-auto border-t pt-4">
        {questions.map((q, i) => {
          const isCorrect = userAnswers[i] === q.correct_answer;
          return (
            <div
              key={i}
              className={`p-3 rounded-lg ${
                isCorrect ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <p
                className="font-medium mb-2"
                dangerouslySetInnerHTML={{ __html: q.question }}
              />
              <p>
                <span className="font-semibold">Your Answer: </span>
                <span dangerouslySetInnerHTML={{ __html: userAnswers[i] }} />
              </p>
              {!isCorrect && (
                <p>
                  <span className="font-semibold">Correct Answer: </span>
                  <span dangerouslySetInnerHTML={{ __html: q.correct_answer }} />
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Restart button */}
      <button
        onClick={onRestart}
        className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
      >
        🔄 Restart Quiz
      </button>
    </div>
  );
}
