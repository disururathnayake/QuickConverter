import React, { useState } from "react";
import "./Pdftoword.css";
import { Link } from "react-router-dom";
import Navbar from "../templates/Navbar.jsx";
import { API_BASE_URL } from "../config.js";
import { Helmet } from "react-helmet";
import pdfToWordFaqSchema from "../schemas/pdftoword-faq-schema.js";
import FAQAccordion from "../templates/FAQAccordion.jsx";
import Footer from "../templates/footer.jsx";


function Pdftoword() {

  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("❌ Please choose a PDF file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    setError("");

    const res = await fetch(`${API_BASE_URL}/pdf-to-word`, {
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
      <title>Free PDF to Word Converter - Edit PDF Files Easily | Quick Converter</title>
        <meta
          name="description"
          content="Convert your PDF files into editable Word documents for free with Quick Converter. No sign-up, no hassle."
        />
        <meta
          name="keywords"
          content="pdf to word, convert pdf to word, free pdf converter, online pdf to word tool, quick converter"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://quickconverter.pro/pdf-to-word" />
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "PDF to Word Converter",
      "url": "https://quickconverter.pro/pdf-to-word",
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
        <script type="application/ld+json">{JSON.stringify(pdfToWordFaqSchema)}</script>

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
      "name": "PDF to Word",
      "item": "https://quickconverter.pro/pdf-to-word"
    }
  ]
})}
</script>
      </Helmet>
      <Navbar />

      <div className="app-container">

        <h1>Convert PDF to Word</h1>
        <form onSubmit={handleSubmit} className="upload-form">
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
                <span>📁 Click to upload a PDF file</span>
              )}
            </label>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Converting..." : "Convert to Word"}
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
          <a href={downloadLink} download="converted.docx" className="download-link">
            ⬇️ Download Converted File
          </a>
        )}
      </div>
      <div className="tool-intro">
  <h2>Why Convert PDF to Word?</h2>
  <p>
    Editing a PDF directly can be difficult. By converting a PDF into an editable Word document, you can easily update text, adjust formatting, and make changes. Our tool offers a fast and accurate way to unlock your PDF files for easy editing.
  </p>
</div>

      <FAQAccordion
  faqs={[
    {
      question: "Can I convert scanned PDFs to Word?",
      answer: "Currently, we only support text-based PDFs. Scanned images require OCR, which is not yet available."
    },
    {
      question: "Will the formatting stay the same after conversion?",
      answer: "We aim to preserve original formatting like fonts, images, and layout as much as possible."
    },
    {
      question: "Is PDF to Word conversion free?",
      answer: "Yes, our PDF to Word tool is completely free with no sign-up needed."
    }
  ]}
/>

      <div className="internal-link-box">
  <p>
    Need to turn your Word file back into PDF?{" "}
    <Link to="/word-to-pdf" className="internal-link">Use our Word to PDF tool →</Link>
  </p>
</div>
<Footer />
    </>
  );
}

export default Pdftoword;
