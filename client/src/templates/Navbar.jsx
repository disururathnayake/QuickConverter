// Navbar.jsx (Fixed dropdown hover issue)
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="nav-brand-link">Quick Converter</Link>
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>☰</div>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <div className="dropdown">
          <div className="dropdown-toggle" onClick={(e) => { e.stopPropagation(); scrollToSection("basic-pdf-operations"); }}>
            <span className="dropdown-title">Basic PDF Operations</span>
          </div>
          <div className="dropdown-content">
            <Link to="/merge-pdf" onClick={() => setIsOpen(false)}>Merge PDF</Link>
            <Link to="/split-pdf" onClick={() => setIsOpen(false)}>Split PDF</Link>
            <Link to="/compress-pdf" onClick={() => setIsOpen(false)}>Compress PDF</Link>
            <Link to="/remove-pages" onClick={() => setIsOpen(false)}>Remove Pages</Link>
          </div>
        </div>

        <div className="dropdown">
          <div className="dropdown-toggle" onClick={(e) => { e.stopPropagation(); scrollToSection("ai-tools"); }}>
            <span className="dropdown-title">AI Tools</span>
          </div>
          <div className="dropdown-content">
            <Link to="/summarize-pdf" onClick={() => setIsOpen(false)}>Summarize PDF</Link>
          </div>
        </div>

        <div className="dropdown">
          <div className="dropdown-toggle" onClick={(e) => { e.stopPropagation(); scrollToSection("convert-to-pdf"); }}>
            <span className="dropdown-title">Convert to PDF</span>
          </div>
          <div className="dropdown-content">
            <Link to="/word-to-pdf" onClick={() => setIsOpen(false)}>Word to PDF</Link>
            <Link to="/jpg-to-pdf" onClick={() => setIsOpen(false)}>JPG to PDF</Link>
          </div>
        </div>

        <div className="dropdown">
          <div className="dropdown-toggle" onClick={(e) => { e.stopPropagation(); scrollToSection("convert-from-pdf"); }}>
            <span className="dropdown-title">Convert from PDF</span>
          </div>
          <div className="dropdown-content">
            <Link to="/pdf-to-word" onClick={() => setIsOpen(false)}>PDF to Word</Link>
            <Link to="/pdf-to-jpg" onClick={() => setIsOpen(false)}>PDF to JPG</Link>
            <Link to="/pdf-to-txt" onClick={() => setIsOpen(false)}>PDF to TXT</Link>
            <Link to="/pdf-to-png" onClick={() => setIsOpen(false)}>PDF to PNG</Link>
          </div>
        </div>

        <Link to="/blog" style={{ textDecoration: "none" }} className="dropdown-title" >Our Blog</Link>
      </div>
    </nav>
  );
}

export default Navbar;