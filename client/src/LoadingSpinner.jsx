import React from "react";

export default function LoadingSpinner() {
  return (
    <div style={overlayStyle}>
      <div style={spinnerStyle}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const spinnerStyle = {
  width: "80px",
  height: "80px",
  border: "10px solid #e0e0e0",
  borderTop: "10px solid #007bff",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};
