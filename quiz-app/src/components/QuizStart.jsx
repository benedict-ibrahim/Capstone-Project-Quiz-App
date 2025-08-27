import { useState, useEffect } from "react";

export default function QuizStart({ onStart }) {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [amount, setAmount] = useState(5);

  // Fetch categories on mount
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    onStart({
      category, // this is ID
      difficulty,
      amount,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          🎯 Start Your Quiz
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Select */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Select */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Number of Questions
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            🚀 Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
}
