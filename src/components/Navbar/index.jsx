import React, { useEffect, useState } from "react";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { SiWindows11 } from "react-icons/si";
import { RiFilmFill } from "react-icons/ri";
import { PiTelevision } from "react-icons/pi";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import styles from './Navbar.module.css';

const Navbar = () => {

  const { state } = useAuth()
  const user = state.user
  const [initial, setInitial] = useState('');

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  useEffect(() => {
    // console.log('user', user);
    if (user && user.name && user.name.length) {
      setInitial(user.name.substr(0, 1).toUpperCase());
    }
  }, [user])

  return (
    
    <div className="flex sm:flex sm:flex-row flex-col md:flex-col justify-between items-center bg-[#182828] sm:ml-0 md:ml-5 sm:px-7 py-10 rounded-xl w-full sm:w-screen md:w-16 h-14 md:h-[calc(100vh-5rem)] nav-container">
      {/* logo container */}
      <div className="logo-container">
        <MovieCreationIcon className="w-[40px] h-[40px] text-userHover" />
      </div>

      {/* icon container */}
      <div className="flex sm:flex sm:flex-row flex-col md:flex-col md:items-center gap-6 md:gap-6 icon-container">
        {/* Home Icon Link */}
        <Link to="/" className="group">
          <SiWindows11 className={styles.navbarLinkItem} />
        </Link>

        {/* Movies Icon Link */}
        <Link to="/movies" className="group">
          <RiFilmFill className={styles.navbarLinkItem} />
        </Link>

        {/* Serial or TV Icon Link */}
        <Link to="/tv-series" className="group">
          <PiTelevision className={styles.navbarLinkItem} />
        </Link>

        {/* Bookmark Icon Link */}
        <Link to="/bookmark" className="group">
          <FaBookmark className={styles.navbarLinkItem} />
        </Link>
      </div>

      {/* avatar container */}
      <div className="avatar-container">
        <Avatar sx={{ bgcolor: deepOrange[500] }} className="w-[40px] h-[40px]"
        onClick={togglePopup} style={{ position: "relative", zIndex: 1 }}
        >
          {initial}
        </Avatar>
      </div>
      <div>


      {/* Popup Component */}
      {isPopupOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            width:"350px",
            height:"250px",
            transform: "translate(-50%, -50%)",
            background: "#3b0873",
         
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000, // Ensure it's on top
          }}
        >
      <center>
      <Avatar sx={{ bgcolor: deepOrange[500] }} className="w-[40px] h-[40px] "
      onClick={togglePopup} style={{ position: "relative", zIndex: 1 }}
      >
        {initial}
      </Avatar>
      </center>
         <center> <p className="mt-3">{user.name}</p></center>
        <div className="items-center mt-12">
        <button className="bg-red-900 px-2 py-2 w-24 m-2 text-center justify-center items-center rounded-lg float-start" onClick={togglePopup}>Close</button>
        <Link to={'/logout'} className="bg-red-950 px-2 py-2 w-24 m-2 text-center justify-center items-center rounded-lg float-end">Log Out</Link>
        </div>
        </div>
      )}

      {/* Overlay */}
      {isPopupOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 999, // Ensure it covers the background
          }}
          onClick={togglePopup} // Close popup when clicking on overlay
        ></div>
      )}
    </div>
 
    </div>
  );
};

export default Navbar;
