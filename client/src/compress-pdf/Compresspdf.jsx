import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../templates/Navbar.jsx";
import FAQAccordion from "../templates/FAQAccordion.jsx";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config.js";
import "./Compresspdf.css";
import compressPdfFaqSchema from "../schemas/compresspdf-faq-schema.js";
import Footer from "../templates/footer.jsx";

function Compresspdf() {
  const [file, setFile] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState("default");
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("❌ Please upload a PDF to compress.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("compressionLevel", compressionLevel);

    setLoading(true);
    setProgress(0);
    setError("");

    let intervalDelay = 600;
    if (file.size < 1 * 1024 * 1024) intervalDelay = 350;
    else if (file.size < 5 * 1024 * 1024) intervalDelay = 500;
    else if (file.size < 15 * 1024 * 1024) intervalDelay = 700;
    else intervalDelay = 900;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) {
          clearInterval(interval);
          return 99;
        }
        return prev + 1;
      });
    }, intervalDelay);

    const res = await fetch(`${API_BASE_URL}/compress-pdf`, {
      method: "POST",
      body: formData,
    });

    clearInterval(interval);
    setLoading(false);

    if (!res.ok) {
      setError("❌ Failed to compress file. Please try again.");
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
        <title>Compress PDF Files Online - Reduce Size Fast | Quick Converter</title>
        <meta
          name="description"
          content="Easily reduce the size of your PDF files with Quick Converter. Fast, free, and secure online PDF compression."
        />
        <meta
          name="keywords"
          content="compress pdf, reduce pdf size, pdf compression tool, free pdf compressor, quick converter"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://quickconverter.pro/compress-pdf" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Compress PDF Files",
            "url": "https://quickconverter.pro/compress-pdf",
            "applicationCategory": "Utility",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(compressPdfFaqSchema)}
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
                "item": "https://quickconverter.pro/",
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Compress PDF",
                "item": "https://quickconverter.pro/compress-pdf",
              },
            ],
          })}
        </script>
      </Helmet>

      <Navbar />

      <div className="mergepdf-container">
        <div className="page-header">
          <h1 className="page-title">Compress and Shrink PDF Files Online Instantly</h1>
          <p className="page-subtitle">
            Quickly compress PDF files online with Quick Converter. Our free tool helps you shrink
            large PDFs without losing quality, optimize PDF files for faster uploads, and reduce
            file sizes for email or web sharing. No signup or installation needed — just upload,
            compress, and download!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mergepdf-form">
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

            <select
              className="compression-select"
              value={compressionLevel}
              onChange={(e) => setCompressionLevel(e.target.value)}
            >
              <option value="default">Auto</option>
              <option value="minimal">Minimal</option>
              <option value="maximum">Maximum</option>
            </select>


            {error && <p className="error-message">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Compressing..." : "Compress & Optimize PDF"}
            </button>
          </div>

          {loading && (
            <>
              <div className="spinner-container">
                <div className="spinner"></div>
                <p className="spinner-text">Compressing file...</p>
              </div>

              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                <p className="progress-text">{progress}%</p>
              </div>
            </>
          )}
        </form>

        {downloadLink && (
          <a href={downloadLink} download="compressed.pdf" className="download-link">
            ⬇️ Download Compressed File
          </a>
        )}
      </div>

      <div className="tool-intro">
        <h2>Why Compress PDF Files?</h2>
        <p>
          Large PDF files can be slow to upload and share. Compressing PDFs reduces file size
          without losing quality, making them faster to email, upload, and store. Our tool helps you
          optimize documents for easy sharing while keeping them crisp and clear.
        </p>
      </div>

      <FAQAccordion
        faqs={[
          {
            question: "Can I compress multiple PDFs at once?",
            answer: "Currently, you can compress one PDF at a time for best performance and quality.",
          },
          {
            question: "Is PDF compression free?",
            answer: "Yes, our PDF compression tool is completely free and does not require any sign-up.",
          },
          {
            question: "Will my PDF lose quality after compression?",
            answer: "We optimize your PDF file size while maintaining good readability and visual quality.",
          },
        ]}
      />

      <div className="internal-link-box">
        <p>
          Need to split your PDF after compression?{" "}
          <Link to="/split-pdf" className="internal-link">
            Try our Split PDF tool →
          </Link>
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Compresspdf;
