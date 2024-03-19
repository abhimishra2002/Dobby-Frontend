import React, { useContext, useEffect, useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("https://dobby-backend-0zy3.onrender.com/api/user/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      setLoading(false)
      if (!response.ok) {
        toast.error("Error SignIn failed");
        throw new Error("Sign In failed");
      }
      const data = await response.json();
      const token = data.user.token;
      login(data.user);
      Cookies.set("token", token);
      navigate("/");
      toast.success("Signed in successfully!");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };
  useEffect(() => {
    if (loading) {
      toast.dismiss(); 
      toast.info('Connecting to backend...', { autoClose: false });
    }
  }, [loading]);

  return (
    <>
      <ToastContainer />
      <div className="form-container">
        <h2>SignIn</h2>
        <form onSubmit={handleSignin}>
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
            <button type="submit">Sign In</button>
            <button type="button" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
