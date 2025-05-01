import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../templates/Navbar.jsx";
import FAQAccordion from "../templates/FAQAccordion.jsx";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config.js";
import "./Pdftopng.css";
import Footer from "../templates/footer.jsx";
import pdfToPngFaqSchema from "../schemas/pdftopng-faq-schema.js";

function Pdftopng() {
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
      setProgress((prev) => {
        if (prev >= 99) {
          clearInterval(interval);
          return 99;
        }
        return prev + 1;
      });
    }, 500);

    const res = await fetch(`${API_BASE_URL}/pdf-to-png`, {
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
        <title>Convert PDF to PNG Images Online - Free & High Quality | Quick Converter</title>
        <meta
          name="description"
          content="Convert PDF pages into high-quality PNG images instantly. Free online PDF to PNG converter by Quick Converter. Easy, fast, and secure."
        />
        <meta
          name="keywords"
          content="pdf to png, convert pdf to png images, high quality png"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://quickconverter.pro/pdf-to-png" />

        {/* WebApplication Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "PDF to PNG Converter",
            "url": "https://quickconverter.pro/pdf-to-png",
            "applicationCategory": "Utility",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>

        {/* BreadcrumbList Schema */}
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
                "name": "Convert PDF to PNG Images",
                "item": "https://quickconverter.pro/pdf-to-png"
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
                  {JSON.stringify(pdfToPngFaqSchema)}
                </script>
      </Helmet>

      <Navbar />

      <div className="compresspdf-container">
        <div className="page-header">
          <h1 className="page-title">Convert PDF to PNG Images</h1>
          <p className="page-subtitle">
            Upload your PDF file and instantly convert it into beautiful PNG images. Perfect for sharing, editing, or printing. Free and easy to use — no installation required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="compresspdf-form">
          <div className="upload-section">
            <label className="upload-box">
              <input
                type="file"
                accept="application/pdf"
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
                hidden
              />
              {file ? (
                <span className="file-name">✅ {file.name}</span>
              ) : (
                <span>📄 Click to upload a PDF file</span>
              )}
            </label>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Converting..." : "Convert PDF to PNG"}
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
          <a href={downloadLink} download="converted-images.zip" className="download-link">
            ⬇️ Download PNG Images (ZIP)
          </a>
        )}
      </div>

      <div className="tool-intro">
        <h2>Why Convert PDF to PNG?</h2>
        <p>
          Turning your PDF into high-quality PNG images makes it easy to use content for presentations, social media, or printing. Each page becomes a separate, clear PNG.
        </p>
      </div>

      <FAQAccordion
        faqs={[
          {
            question: "Can I convert a multipage PDF into PNGs?",
            answer: "Yes! Each page will be converted into a separate PNG image and downloaded in a zip file."
          },
          {
            question: "Is PDF to PNG conversion free?",
            answer: "Absolutely. Quick Converter offers this service free of charge with no sign-up required."
          },
          {
            question: "Will the image quality be preserved?",
            answer: "Yes, we maintain high resolution when converting PDF pages to PNG."
          }
        ]}
      />

      <div className="internal-link-box">
        <p>Want more free tools? <Link to="/" className="internal-link">Explore Quick Converter →</Link></p>
      </div>

      <Footer />
    </>
  );
}

export default Pdftopng;
