import { useState } from "react";
import Fader from './components/Fader/Fader';
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const textArray = ["No advice.", "No judgment.", "No history saved.", "Just a space to say what you can’t say anywhere else."];
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Submitting email:", email);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      console.log("Raw response:", res);
      const data = await res.json();
      console.log("Parsed response:", data);

      if (res.ok) {
        setMessage(data.message || 'Thanks, you’re on the list!');
        setSubmitted(true);
        setLoading(false);
      } else {
        setMessage(data.message || 'Something went wrong. Try again?');
        setLoading(false);
      }
    } catch (err) {
      console.error("Submission error:", err);

      if (err.code === 11000) {
        setMessage('This email is already on the waitlist.');
      } else {
        setMessage('Could not connect to the server.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Michael is listening.</h1>
      <p>
        <Fader textArray={textArray} />
      </p>
      {!submitted && (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Join the Waitlist</button>
        </form>
      )}
      {loading && (
        <p className="loading-text">Thinking<span className="dots">.</span></p>
      )}
      {message && <p className="thank-you">{message}</p>}
    </div>
  );
}

export default App;