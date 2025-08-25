import { useEffect, useState } from "react";

function QuizStart({ onStart }) {
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState({
    category: "",
    difficulty: "",
    amount: 5,
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch quiz categories
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(settings);
  };

  // Filter categories by search term
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-4">Start Quiz</h1>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={settings.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Any Category</option>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>No categories found</option>
            )}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block mb-1 font-medium">Difficulty</label>
          <select
            name="difficulty"
            value={settings.difficulty}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Any</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Number of Questions */}
        <div>
          <label className="block mb-1 font-medium">Number of Questions</label>
          <input
            type="number"
            name="amount"
            min="1"
            max="20"
            value={settings.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
}

export default QuizStart;
