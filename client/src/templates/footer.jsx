// Footer.jsx (Redesigned - Categorized)
import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import logo from "../assets/logo.webp";

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-grid">
                <div className="footer-brand">
                    <img src={logo} alt="Quick Converter Logo" />
                    
                </div>

                <div className="footer-section">
                    <h3>Basic PDF Operations</h3>
                    <Link to="/merge-pdf">Merge PDF</Link>
                    <Link to="/split-pdf">Split PDF</Link>
                    <Link to="/compress-pdf">Compress PDF</Link>
                    <Link to="/remove-pages">Remove Pages</Link>
                </div>

                <div className="footer-section">
                    <h3>Convert to PDF</h3>
                    <Link to="/word-to-pdf">Word to PDF</Link>
                    <Link to="/jpg-to-pdf">JPG to PDF</Link>
                </div>

                <div className="footer-section">
                    <h3>Convert from PDF</h3>
                    <Link to="/pdf-to-word">PDF to Word</Link>
                    <Link to="/pdf-to-jpg">PDF to JPG</Link>
                    <Link to="/pdf-to-txt">PDF to TXT</Link>
                    <Link to="/pdf-to-png">PDF to PNG</Link>
                </div>

                <div className="footer-section">
                    <h3>AI Tools</h3>
                    <Link to="/summarize-pdf">Summarize PDF</Link>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-policies">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms-of-service">Terms of Service</Link>
                </div>
                <p className="footer-copy">© {new Date().getFullYear()} Quick Converter. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;