import React, { useContext, useState } from "react";
import "./NavbarIn.css";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 
import { UserContext } from "../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const { logout } = useContext(UserContext);
  const [showDrawer, setShowDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search Query:", searchQuery);
    navigate(`/search/${searchQuery}`);
  };

  const handleSignOut = () => {
    Cookies.remove("token");

    logout();

    toast.success('Signed Out successfully!');

    navigate("/");
  };

  const handleUpload = () => {
    navigate("/upload");
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <>
    <ToastContainer />
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo" onClick={handleHome}>Home</div>
        </div>
        <div className="navbar-right">
          <button className="nav-link" onClick={handleSignOut}>
            Sign Out
          </button>
          <button className="nav-link" onClick={handleUpload}>
            Upload
          </button>
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
        </div>
        <button className="drawer-toggle" onClick={toggleDrawer}>
          {showDrawer ? <FaTimes /> : <FaBars />}
        </button>
        {showDrawer && (
          <div className="drawer">
            <button className="drawer-link" onClick={handleSignOut}>
              Sign Out
            </button>
            <button className="drawer-link" onClick={handleUpload}>
              Upload
            </button>
            <form className="drawer-search-form" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <FaSearch />
              </button>
            </form>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
