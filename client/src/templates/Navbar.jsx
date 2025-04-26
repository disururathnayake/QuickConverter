import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // optional for separate nav styles

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="nav-brand-link">Quick Converter</Link>
      </div>
      <div className="nav-links">
        <Link to="/pdf-to-word">PDF to Word</Link>
        <Link to="/word-to-pdf">Word to PDF</Link>
        <Link to="/merge-pdf">Merge PDF</Link>
        <Link to="/split-pdf">Split PDF</Link>
        <Link to="/compress-pdf">Compress PDF</Link>
      </div>
    </nav>
  );
}

export default Navbar;
