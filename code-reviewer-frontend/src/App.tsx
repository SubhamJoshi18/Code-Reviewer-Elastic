import { useState } from "react";
import './index.css'

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");

  const handleReview = () => {
    if (code.trim() === "") {
      setReview("Please enter some code for review.");
      return;
    }
    setReview("Your code looks good! No major issues found.");
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
      <button className="review-btn" onClick={handleReview}>
        Review Code
      </button>
      {review && <p className="review-output">{review}</p>}
    </div>
  );
}

export default App;
