const QuestionCard = ({ question, questionNumber, totalQuestions, onAnswer }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl w-full">
      <h2 className="text-lg font-semibold mb-4">
        Question {questionNumber} of {totalQuestions}
      </h2>
      <p
        className="mb-4 text-gray-800"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />
      <div className="space-y-2">
        {question.answers.map((ans, idx) => (
          <button
            key={idx}
            className="w-full bg-gray-200 hover:bg-gray-300 text-left p-2 rounded-lg"
            onClick={() => onAnswer(ans)}
            dangerouslySetInnerHTML={{ __html: ans }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
