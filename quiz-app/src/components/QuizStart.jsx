import { useState, useEffect } from "react";

const QuizStart = ({ onStart }) => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    category: "",
    difficulty: "easy",
    amount: 5,
  });

  // Fetch categories from Open Trivia API
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories || []))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(form);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
      <h1 className="text-2xl font-bold mb-4">Start a Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Any Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block mb-1 font-medium">Difficulty</label>
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Number of questions */}
        <div>
          <label className="block mb-1 font-medium">Number of Questions</label>
          <input
            type="number"
            name="amount"
            min="1"
            max="20"
            value={form.amount}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizStart;
