import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../templates/Navbar.jsx";
import Footer from "../templates/footer.jsx";
import FAQAccordion from "../templates/FAQAccordion.jsx";
import "./Editpdf.css";
import { Link } from "react-router-dom";

function Editpdf() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [emailError, setEmailError] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile || selectedFile.type !== "application/pdf") {
            setError("❌ Only PDF files are allowed.");
            return;
        }
        setFile(selectedFile);
        setError("");
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setSubmitted(false);
            setEmailError("❌ Please enter a valid email address.");
            return;
        }

        setEmailError(""); // clear previous error if any
        setSubmitted(true);
        setEmail("");

        try {
            await fetch("https://script.google.com/macros/s/AKfycbwYClXIS9-qD_-c7k1hBJ-PKkF5lv6Hgv1jxX9njswwLU8Pes3QYrb9bw_7AOE1wN99ZA/exec", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `email=${encodeURIComponent(email)}`
            });
        } catch (err) {
            console.error("Error submitting email:", err);
            setSubmitted(false);
        }
    };


    return (
        <>
            <Helmet>
                <title>Edit PDF Online Free – No Watermark | Quick Converter</title>
                <meta
                    name="description"
                    content="Use our free online PDF editor to write, draw, highlight, and sign PDFs with ease. No watermark, no signup needed."
                />
                <meta
                    name="keywords"
                    content="edit pdf online, free pdf editor, online pdf editor, write on pdf, sign pdf, modify pdf free"
                />
                <link rel="canonical" href="https://quickconverter.pro/edit-pdf" />
                <meta name="robots" content="index, follow" />
            </Helmet>

            <Navbar />

            <div className="edit-pdf-container">
                <h1>Edit PDF Online for Free</h1>
                <p className="page-subtitle">
                    Our online PDF editor is coming soon! You'll be able to add text, highlight, sign, and edit PDF documents without watermark — right in your browser.
                </p>

                <div className="coming-soon-note">
                    <strong>⚠️ This feature is currently under development.</strong>
                    <p>Want to be notified when it launches? Join our waitlist below.</p>
                </div>

                <form onSubmit={handleEmailSubmit} className="email-form">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Notify Me</button>
                    {emailError && <p className="error-message">{emailError}</p>}
                    {submitted && <p className="success-message">✅ You’ll be notified when we launch!</p>}
                </form>

                <div className="file-placeholder">
                    <input type="file" accept="application/pdf" disabled onChange={handleFileChange} />
                    <p className="disabled-note">PDF upload will be enabled once the feature is live.</p>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>

            <FAQAccordion
                faqs={[
                    {
                        question: "What editing features will be available?",
                        answer: "You'll be able to add text, draw, highlight, sign, and save PDFs — all in your browser."
                    },
                    {
                        question: "Will it be free?",
                        answer: "Yes, editing will be free and without watermark."
                    },
                    {
                        question: "Can I edit PDFs on mobile?",
                        answer: "Yes, the editor will be mobile-friendly."
                    }
                ]}
            />

            <div className="internal-link-box">
                <p>
                    Want to merge multiple images into a single PDF? Try our {" "}
                    <Link to="/jpg-to-pdf" className="internal-link">
                        JPG to PDF converter
                    </Link>{" "}
                    — the easiest way to convert JPG images into a professional-quality PDF file.
                </p>
            </div>

            <Footer />
        </>
    );
}

export default Editpdf;
