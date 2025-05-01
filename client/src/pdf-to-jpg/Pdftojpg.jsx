import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../templates/Navbar.jsx";
import FAQAccordion from "../templates/FAQAccordion.jsx";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config.js";
import "./Pdftojpg.css"; // You can reuse this CSS
import pdfToJpgFaqSchema from "../schemas/pdftojpg-faq-schema.js";
import Footer from "../templates/footer.jsx";


function PdftoJpg() {
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

    let intervalDelay = 500;
    if (file.size < 1 * 1024 * 1024) intervalDelay = 300;
    else if (file.size < 5 * 1024 * 1024) intervalDelay = 500;
    else intervalDelay = 700;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 99) {
          clearInterval(interval);
          return 99;
        }
        return prev + 1;
      });
    }, intervalDelay);

    const res = await fetch(`${API_BASE_URL}/pdf-to-jpg`, {
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
  <title>Convert PDF to JPG Images Online - Free & High Quality | Quick Converter</title>
  <meta
    name="description"
    content="Convert PDF pages into high-quality JPG images instantly. Free online PDF to JPG converter by Quick Converter. Easy, fast, and secure."
  />
  <meta
    name="keywords"
    content="pdf to jpg, convert pdf to images, pdf image converter, free pdf to jpg"
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://quickconverter.pro/pdf-to-jpg" />

  {/* WebApplication Schema */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "PDF to JPG Converter",
      "url": "https://quickconverter.pro/pdf-to-jpg",
      "applicationCategory": "Utility",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    })}
  </script>

  {/* FAQ Schema */}
  <script type="application/ld+json">
    {JSON.stringify(pdfToJpgFaqSchema)}
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
          "name": "PDF to JPG",
          "item": "https://quickconverter.pro/pdf-to-jpg"
        }
      ]
    })}
  </script>
</Helmet>

      <Navbar />

      <div className="compresspdf-container">
        <div className="page-header">
          <h1 className="page-title">Convert PDF to High-Quality JPG Images</h1>
          <p className="page-subtitle">
            Upload your PDF file and instantly convert it into beautiful JPG images. Perfect for sharing, editing, or printing. Free and easy to use — no installation required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="compresspdf-form">
          <div className="upload-section">
            <label className="upload-box">
              <input
                type="file"
                accept=".pdf,application/pdf"
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
              {loading ? "Converting..." : "Convert PDF to JPG"}
            </button>
          </div>

          {loading && (
            <>
              <div className="spinner-container">
                <div className="spinner"></div>
                <p className="spinner-text">Converting file...</p>
              </div>

            </>
          )}
        </form>

        {downloadLink && (
          <a href={downloadLink} download="converted-images.zip" className="download-link">
            ⬇️ Download JPG Images (ZIP)
          </a>
        )}
      </div>
      <div className="tool-intro">
  <h2>Why Convert PDF to JPG?</h2>
  <p>
    Turning your PDF into high-quality JPG images makes it easy to use content for presentations, social media, or printing. Our converter extracts each page as a separate, clear JPG, perfect for flexible sharing and reuse.
  </p>
</div>

      <FAQAccordion
        faqs={[
          {
            question: "Can I convert a multipage PDF into JPGs?",
            answer: "Yes! Each page will be converted into a separate JPG image and downloaded in a zip file."
          },
          {
            question: "Is PDF to JPG conversion free?",
            answer: "Absolutely. Quick Converter offers this service free of charge with no sign-up required."
          },
          {
            question: "Will the quality of my images be good?",
            answer: "Yes, we aim to maintain high resolution when converting PDF pages to JPG images."
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

export default PdftoJpg;
