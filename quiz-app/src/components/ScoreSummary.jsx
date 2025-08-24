const ScoreSummary = ({ questions, userAnswers, score, onRestart }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full">
      <h2 className="text-2xl font-bold mb-4">Quiz Finished!</h2>
      <p className="text-lg mb-6">
        You scored <span className="font-bold">{score}</span> out of{" "}
        {questions.length}
      </p>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {questions.map((q, index) => (
          <div
            key={index}
            className="border rounded-lg p-3 bg-gray-50"
          >
            <p
              className="font-medium"
              dangerouslySetInnerHTML={{ __html: q.question }}
            />
            <p
              className={`mt-1 ${
                userAnswers[index] === q.correct_answer
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              Your Answer:{" "}
              <span
                dangerouslySetInnerHTML={{ __html: userAnswers[index] }}
              />
            </p>
            {userAnswers[index] !== q.correct_answer && (
              <p className="text-blue-600">
                Correct Answer:{" "}
                <span
                  dangerouslySetInnerHTML={{ __html: q.correct_answer }}
                />
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        onClick={onRestart}
      >
        Take another quiz
      </button>
    </div>
  );
};

export default ScoreSummary;
