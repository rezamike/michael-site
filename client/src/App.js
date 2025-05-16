import { useState } from "react";
import Fader from './components/Fader/Fader';
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const textArray = ["No advice.", "No judgment.", "No history.", "Just a space to say what you can’t say anywhere else."];
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
  
    const data = await res.json();
    if (res.ok) setMessage(data.message || 'Thanks, you’re on the list!');
    else setMessage(data.message || 'Something went wrong. Try again?');
  };

  return (
    <div className="container">
      <h1>Michael is listening.</h1>
      <p>
        <Fader textArray={textArray} />
      </p>
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
      {message && <p className="thank-you">{message}</p>}
    </div>
  );
}

export default App;
