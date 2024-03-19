import React, { useState } from 'react';
import './NavbarIn.css';
import { FaBars, FaTimes,} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavbarLoggedIn = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };


  const handleSignUp = () => {
    
    navigate('/signup'); 
  };
  
  const handleLogIn = () => {
    navigate('/login'); 
  };

  const handleHome = () => {
    navigate('/');
  };


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo" onClick={handleHome}>Home</div>
      </div>
      <div className="navbar-right">
        <button className="nav-link" onClick={handleSignUp}>SignUp</button>
        <button className="nav-link" onClick={handleLogIn}>LogIn</button>
      </div>
      <button className="drawer-toggle" onClick={toggleDrawer}>
        {showDrawer ? <FaTimes /> : <FaBars />}
      </button>
      {showDrawer && (
        <div className="drawer">
          <button className="drawer-link" onClick={handleSignUp}>SignUp</button>
          <button className="drawer-link" onClick={handleLogIn}>LogIn</button>
        </div>
      )}
    </nav>
  );
};

export default NavbarLoggedIn;