import React, { useEffect, useState } from "react";
import './LoaderSpinner.css'
import { useNavigate } from "react-router";
import Content from "./content";


const LoaderSpinner = () => {

  const [countdown, setCountdown] = useState(3);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      // Countdown function
      const timer = setInterval(() => {
          setCountdown((prev) => {
              if (prev === 1) {
                  clearInterval(timer);
                  setShowContent(true);  
              }
              return prev - 1;
          });
      }, 1000);

      return () => clearInterval(timer);  
  }, [navigate]);

  if (showContent) {
    return <Content />; 
  }
 
  return (
    <div className="spinnerdiv">
        <span className="spinnercontent">FlixHub</span>
    </div>
  );
};

export default LoaderSpinner;
