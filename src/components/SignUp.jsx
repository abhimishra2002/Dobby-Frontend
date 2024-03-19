import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("https://dobby-backend-0zy3.onrender.com/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      });

      if (!response.ok) {
        toast.error("SignUp failed");
        throw new Error("Sign up failed");
      }
      setLoading(false);
      toast.success("Signed Up successfully!");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.error("Signup error:", error.message);
    }
  };
  useEffect(() => {
    if (loading) {
      toast.dismiss();
      toast.info("Connecting to backend...", {
        autoClose: false,
        
      });
    }
  }, [loading]);

  const handleSignin = () => {
    navigate("/login");
  };

  return (
    <>
      <ToastContainer />
      <div className="form-container">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit">Sign Up</button>
            <button type="button" onClick={handleSignin}>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupForm;
