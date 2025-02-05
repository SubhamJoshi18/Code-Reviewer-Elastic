import { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReview = async () => {
    if (code.trim() === "") {
      setReview("Please enter some code for review.");
      return;
    }

    setLoading(true);
    setReview("");
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/review/code", { 
        code 
      });

      setReview(response.data.message || "Review completed successfully.");
    } catch (err : any) {
      setError(err.response?.data?.error || "Failed to fetch review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Code Reviewer</h1>
      <textarea
        className="code-input"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button className="review-btn" onClick={handleReview} disabled={loading}>
        {loading ? "Reviewing..." : "Review Code"}
      </button>
      {review && <p className="review-output">{review}</p>}
      {error && <p className="error-output">{error}</p>}
    </div>
  );
}

export default App;
