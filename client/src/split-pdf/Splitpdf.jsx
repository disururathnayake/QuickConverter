import React, { useState } from "react";
import Navbar from "../templates/Navbar.jsx";
import "./Splitpdf.css";
import usePageTitle from "../hooks/usePageTitle.js";
import { API_BASE_URL } from "../config.js";
import { Helmet } from "react-helmet";
import splitGuideImg from "../assets/split-guide.webp";
import { Link } from "react-router-dom";
import FAQAccordion from "../templates/FAQAccordion.jsx";
import splitPdfFaqSchema from "../schemas/splitpdf-faq-schema.js";
import Footer from "../templates/footer.jsx";

function Splitpdf() {

  const [file, setFile] = useState(null);
  const [pageInput, setPageInput] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !pageInput) {
      setError("❌ Please upload a file and specify pages.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("pages", pageInput);

    setLoading(true);
    setError("");

    const res = await fetch(`${API_BASE_URL}/split-pdf`, {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (!res.ok) {
      setError("❌ Failed to split PDF. Please try again.");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    setDownloadLink(url);
  };

  return (
    <>
      <Helmet>
        <title>Split PDF Pages - Extract and Download Instantly | Quick Converter</title>

        <meta
          name="description"
          content="Split large PDF files into smaller parts or extract pages with Quick Converter. Fast, free, and easy to use."
        />
        <meta
          name="keywords"
          content="split pdf, extract pdf pages, pdf splitter, online pdf tools, quick converter"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://quickconverter.pro/split-pdf" />
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Split PDF Pages",
      "url": "https://quickconverter.pro/split-pdf",
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
        <script type="application/ld+json">{JSON.stringify(splitPdfFaqSchema)}</script>

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
                "name": "Split PDF",
                "item": "https://quickconverter.pro/split-pdf"
              }
            ]
          })}
        </script>
      </Helmet>


      <Navbar />

      <div className="app-container">
        <h1>Split PDF</h1>
        <p className="page-subtitle">
          Easily split PDF files online with Quick Converter. Our free tool lets you extract specific pages or divide large PDFs into smaller parts for faster sharing, better organization, and simplified document management. No signup needed — just upload, select pages, and split!
        </p>
        <br></br>
        <form onSubmit={handleSubmit} className="upload-form">
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
              <p>{file ? `✅ ${file.name}` : "📄 Click to Upload your file"}</p>
            </label>

            <input
              type="text"
              className="page-input"
              placeholder="Pages to extract (e.g. 1,3,5-7)"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
            />

            {error && <p className="error-message">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Splitting..." : "Split PDF"}
            </button>
          </div>

          {loading && (
            <div className="spinner-container">
              <div className="spinner"></div>
              <p className="spinner-text">Splitting file...</p>
            </div>
          )}
        </form>

        {downloadLink && (
          <a href={downloadLink} download="split.pdf" className="download-link">
            ⬇️ Download Split PDF
          </a>
        )}
      </div>

      <section className="guide-section">
        <h2 className="guide-heading">How to Split a PDF File</h2>
        <div className="guide-content">
          <div className="guide-steps">
            <div className="step">
              <span className="step-icon">📤</span>
              <p>
                <strong>Upload:</strong> Select a PDF file from your device (up to 100MB).
              </p>
            </div>

            <div className="step">
              <span className="step-icon">✂️</span>
              <p>
                <strong>Select Pages:</strong> Enter pages to extract (e.g. 1, 3, 5-7).
              </p>
            </div>

            <div className="step">
              <span className="step-icon">📥</span>
              <p>
                <strong>Split:</strong> Click "Split PDF" to download the selected pages.
              </p>
            </div>
          </div>

          <div className="guide-image">
            <img src={splitGuideImg} alt="Split PDF guide illustration" />
          </div>
        </div>
      </section>
      <div className="tool-intro">
        <h2>Why Split PDF Files?</h2>
        <p>
          Sometimes you don't need an entire PDF, just specific pages. Our PDF splitter lets you quickly extract only the sections you need, saving time and reducing file size. Perfect for editing, sharing, or reusing parts of larger documents.
        </p>
      </div>

      <FAQAccordion
        faqs={[
          {
            question: "Can I split multiple pages at once?",
            answer: "Yes, you can select multiple pages or page ranges like 2-4,6,8-10 to split."
          },
          {
            question: "Will splitting a PDF change the original file?",
            answer: "No, your original file remains unchanged. You download a new file with selected pages."
          },
          {
            question: "Is there a maximum file size for splitting?",
            answer: "We recommend uploading PDFs smaller than 100MB for best performance."
          }
        ]}
      />

      <div className="internal-link-box">
        <p>
          Want to combine your PDFs after splitting?{" "}
          <Link to="/merge-pdf" className="internal-link">Try our Merge PDF tool →</Link>
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Splitpdf;
