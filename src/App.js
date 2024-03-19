import React, { useContext } from "react";
import NavbarLoggedIn from "./components/NavbarLoggedIn";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Upload from "./components/Upload";
import SearchResult from "./components/SearchResult";
import SignupForm from "./components/SignUp";
import SignInForm from "./components/SignIn";
import { UserContext } from "./Context/UserContext";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";

const App = () => {
  const { isAuthenticated} = useContext(UserContext);

  return (
    <div>
      {!isAuthenticated && <NavbarLoggedIn />}
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignInForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/search/:param" element={<SearchResult />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/logout" element={<Navigate to="/" />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  );
};

export default App;
