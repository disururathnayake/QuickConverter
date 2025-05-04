import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../templates/Navbar.jsx";
import FAQAccordion from "../templates/FAQAccordion.jsx";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config.js";
import "./Pdftotxt.css";
import Footer from "../templates/footer.jsx";
import pdfToTxtSchema from "../schemas/pdftotxt-faq-schema.js";

function Pdftotxt() {
  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("❌ Please upload a PDF to convert.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setProgress(0);
    setError("");

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 99) {
          clearInterval(interval);
          return 99;
        }
        return prev + 1;
      });
    }, 500);

    const res = await fetch(`${API_BASE_URL}/pdf-to-txt`, {
      method: "POST",
      body: formData,
    });

    clearInterval(interval);
    setLoading(false);

    if (!res.ok) {
      setError("❌ Failed to convert file. Please try again.");
      setProgress(0);
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    setDownloadLink(url);
    setProgress(100);
  };

  return (
    <>
      <Helmet>
        <title>Convert PDF to Text File Online - Free & Accurate | Quick Converter</title>
        <meta
          name="description"
          content="Extract plain text from any PDF file instantly. Quick Converter offers free and easy PDF to TXT conversion online."
        />
        <meta
          name="keywords"
          content="pdf to txt, extract text from pdf, free pdf text converter"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://quickconverter.pro/pdf-to-txt" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "PDF to TXT Converter",
            "url": "https://quickconverter.pro/pdf-to-txt",
            "applicationCategory": "Utility",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>

        <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://quickconverter.pro/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Convert PDF to Text File",
        "item": "https://quickconverter.pro/pdf-to-txt"
      }
    ]
  })}
</script>
<script type="application/ld+json">
                  {JSON.stringify(pdfToTxtSchema)}
                </script>
      </Helmet>

      <Navbar />

      <div className="mergepdf-container">
        <div className="page-header">
          <h1 className="page-title">Convert PDF to Text File (TXT)</h1>
          <p className="page-subtitle">
            Upload your PDF file and extract clean, plain text instantly. Great for reading, editing, or reusing content.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mergepdf-form">
          <div className="upload-section">
            <label className="upload-box">
              <input
                type="file"
                accept=".pdf,application/pdf"
                hidden
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  if (selectedFile && selectedFile.type !== "application/pdf") {
                    setError("❌ Only PDF files are allowed.");
                    e.target.value = null;
                    setFile(null);
                    return;
                  }
                  setFile(selectedFile);
                  setError("");
                }}
              />
              {file ? (
                <span className="file-name">✅ {file.name}</span>
              ) : (
                <span>📄 Click to upload a PDF file</span>
              )}
            </label>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Converting..." : "Convert PDF to TXT"}
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
          <a href={downloadLink} download="converted.txt" className="download-link">
            ⬇️ Download TXT File
          </a>
        )}
      </div>

      <div className="tool-intro">
        <h2>Why Convert PDF to TXT?</h2>
        <p>
          Converting your PDF to TXT helps you access the raw text content for editing, analysis, or repurposing. It’s lightweight and easy to read.
        </p>
      </div>

      <FAQAccordion
        faqs={[
          {
            question: "Does it extract all the text from the PDF?",
            answer: "Yes, it extracts all visible text from each page of the PDF."
          },
          {
            question: "Is the PDF to TXT conversion free?",
            answer: "Yes, it's completely free to use without any registration."
          },
          {
            question: "Can I convert scanned PDFs to TXT?",
            answer: "Currently, our tool does not support OCR for scanned documents."
          }
        ]}
      />

<div className="internal-link-box">
  <p>Looking to convert your PDF into high-quality images? <Link to="/pdf-to-png" className="internal-link">Use our free PDF to PNG converter →</Link></p>
</div>
      <Footer />
    </>
  );
}

export default Pdftotxt;
