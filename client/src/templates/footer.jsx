// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-links">
                    <Link to="/pdf-to-word" className="footer-link">PDF to Word</Link>
                    <Link to="/word-to-pdf" className="footer-link">Word to PDF</Link>
                    <Link to="/merge-pdf" className="footer-link">Merge PDF</Link>
                    <Link to="/split-pdf" className="footer-link">Split PDF</Link>
                    <Link to="/compress-pdf" className="footer-link">Compress PDF</Link>
                    <Link to="/summarize-pdf" className="footer-link">Summarize PDF</Link>
                    <Link to="/pdf-to-jpg" className="footer-link">PDF to JPG</Link>
                    <Link to="/jpg-to-pdf" className="footer-link">JPG to PDF</Link>
                </div>

                <div className="footer-policies">
                    <Link to="/privacy-policy" className="footer-policy-link">Privacy Policy</Link>
                    <Link to="/terms-of-service" className="footer-policy-link">Terms of Service</Link>
                </div>

                <p className="footer-copy">
                    © {new Date().getFullYear()} Quick Converter. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
