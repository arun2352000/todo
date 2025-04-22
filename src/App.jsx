import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import FormComponent from "./components/FormComponent";
import FetchComponent from "./components/FetchComponent";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <Router>
      <Navbar token={token} /> {/* No need to pass handleLogout */}
      <Routes>
        {!token ? (
          <>
            <Route path="/signin" element={<SignIn setToken={setToken} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/signin" />} />
          </>
        ) : (
          <>
            <Route path="/todos" element={<><FormComponent /><FetchComponent /></>} />
            <Route path="*" element={<Navigate to="/todos" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;