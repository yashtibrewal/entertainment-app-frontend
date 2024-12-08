import React from "react";

const Popup = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div style={overlayStyles}>
      <div style={popupStyles}>
        <button style={closeButtonStyles} onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupStyles = {
  background: "green",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  zIndex: 10000,
  
  position:"relative",
  maxWidth: "90%",
  textAlign: "center",
};

const closeButtonStyles = {
  position: "absolute",
  top: "10px",
  right: "10px",
};

export default Popup;
