/* eslint-disable react/prop-types */
export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}) {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 max-w-xl w-full text-center">
      {/* Question counter */}
      <p className="text-gray-600 mb-4 font-medium">
        Question {questionNumber} / {totalQuestions}
      </p>

      {/* Question text */}
      <h2
        className="text-lg font-semibold text-gray-800 mb-6"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />

      {/* Answer buttons */}
      <div className="grid gap-3">
        {question.answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => onAnswer(answer)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
}
