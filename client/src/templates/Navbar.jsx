import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="nav-brand-link">Quick Converter</Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/pdf-to-word" onClick={toggleMenu}>PDF to Word</Link>
        <Link to="/word-to-pdf" onClick={toggleMenu}>Word to PDF</Link>
        <Link to="/merge-pdf" onClick={toggleMenu}>Merge PDF</Link>
        <Link to="/split-pdf" onClick={toggleMenu}>Split PDF</Link>
        <Link to="/compress-pdf" onClick={toggleMenu}>Compress PDF</Link>
        <Link to="/summarize-pdf" className="ai-highlight" onClick={toggleMenu}>
          Summarize PDF <span className="ai-icon" data-tooltip="Powered by AI">✨</span>
        </Link>
        <Link to="/pdf-to-jpg" onClick={toggleMenu}>PDF to JPG</Link>
        <Link to="/jpg-to-pdf" onClick={toggleMenu}>JPG to PDF</Link>
      </div>
    </nav>
  );
}

export default Navbar;
