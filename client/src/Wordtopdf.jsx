import React, { useState } from "react";
import "./Wordtopdf.css";
import { Link } from "react-router-dom";
import Navbar from "./templates/Navbar.jsx";
import usePageTitle from "./hooks/usePageTitle";
import { API_BASE_URL } from "./config";
import { Helmet } from "react-helmet";

function Wordtopdf() {
    usePageTitle("Word to PDF | Quick Converter");
    const [file, setFile] = useState(null);
    const [downloadLink, setDownloadLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("❌ Please choose a DOCX file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE_URL}/word-to-pdf`, {
            method: "POST",
            body: formData,
        });

        setLoading(false);

        if (!res.ok) {
            setError("❌ Failed to convert file. Please try again.");
            return;
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        setDownloadLink(url);
    };

    return (
        <>
            <Helmet>
                <title>Word to PDF Converter | Quick Converter</title>
                <meta
                    name="description"
                    content="Easily convert Word documents (.doc, .docx) into professional PDFs online. 100% Free and secure with Quick Converter."
                />
                <meta
                    name="keywords"
                    content="word to pdf, convert word to pdf, free pdf converter, online word to pdf tool, quick converter"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.quickconverter.pro/word-to-pdf" />
                <script type="application/ld+json">
                    {`
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Word to PDF Converter",
      "url": "https://quickconverter.pro/word-to-pdf",
      "applicationCategory": "Utility",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
    `}
                </script>
            </Helmet>


            <Navbar />

            <div className="wordpdf-container">
                <h1>Convert Word to PDF</h1>
                <form onSubmit={handleSubmit} className="wordpdf-form">
                    <div className="upload-section">
                        <label className="upload-box">
                            <input
                                type="file"
                                accept=".doc,.docx"
                                onChange={(e) => {
                                    const selectedFile = e.target.files[0];
                                    if (
                                        selectedFile &&
                                        !["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(
                                            selectedFile.type
                                        )
                                    ) {
                                        setError("❌ Only Word (.doc/.docx) files are allowed.");
                                        e.target.value = null;
                                        setFile(null);
                                        return;
                                    }
                                    setFile(selectedFile);
                                    setError("");
                                }}
                                hidden
                            />
                            {file ? (
                                <span className="file-name">✅ {file.name}</span>
                            ) : (
                                <span>📄 Click to upload a Word file</span>
                            )}
                        </label>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" disabled={loading}>
                            {loading ? "Converting..." : "Convert to PDF"}
                        </button>
                    </div>
                    {loading && (
                        <div className="spinner-container">
                            <div className="spinner"></div>
                            <p className="spinner-text">Converting file...</p>
                        </div>
                    )}
                </form>

                {downloadLink && (
                    <a href={downloadLink} download="converted.pdf" className="download-link">
                        ⬇️ Download Converted File
                    </a>
                )}
            </div>
        </>
    );
}

export default Wordtopdf;
