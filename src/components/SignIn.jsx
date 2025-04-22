import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://todo-backend-627a.onrender.com/api/user/signIn", { email, password });

      localStorage.setItem("token", response.data.token); // Store JWT
      setToken(response.data.token); // Update state
      navigate("/todos"); // Redirect after login
    } catch (error) {
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;