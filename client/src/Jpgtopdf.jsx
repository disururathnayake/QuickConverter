import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "./templates/Navbar.jsx";
import FAQAccordion from "./templates/FAQAccordion.jsx";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "./config";
import "./Jpgtopdf.css";
import jpgToPdfFaqSchema from "./schemas/jpgtopdf-faq-schema.js";

function JpgToPdf() {
  const [files, setFiles] = useState([]);
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) {
      setError("❌ Please upload at least one JPG image.");
      return;
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

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
    }, 400);

    const res = await fetch(`${API_BASE_URL}/jpg-to-pdf`, {
      method: "POST",
      body: formData,
    });

    clearInterval(interval);
    setLoading(false);

    if (!res.ok) {
      setError("❌ Failed to create PDF. Please try again.");
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
        <title>Convert JPG Images to PDF Fast & Free | Quick Converter</title>
        <meta
          name="description"
          content="Merge your JPG images into a professional PDF file instantly. 100% free, no signup needed. Start converting now!"
        />
        <meta
          name="keywords"
          content="jpg to pdf, merge images to pdf, image to pdf converter, free jpg to pdf"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://quickconverter.pro/jpg-to-pdf" />

        <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "JPG to PDF Converter",
      "url": "https://quickconverter.pro/jpg-to-pdf",
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
          "name": "JPG to PDF",
          "item": "https://quickconverter.pro/jpg-to-pdf"
        }
      ]
    })}
  </script>

  <script type="application/ld+json">
  {JSON.stringify(jpgToPdfFaqSchema)}
</script>
      </Helmet>

      <Navbar />

      <div className="compresspdf-container">
        <div className="page-header">
          <h1 className="page-title">Convert JPG Images to PDF Instantly - Free & Secure</h1>
          <p className="page-subtitle">
            Easily combine your JPG images into a professional-looking PDF file. Free to use, no sign-up required. Upload multiple images and get your PDF instantly!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="compresspdf-form">
          <div className="upload-section">
            <label className="upload-box">
              <input
                type="file"
                accept="image/jpeg,image/jpg"
                multiple
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files);
                  const invalid = selectedFiles.some(file => !file.type.startsWith("image/"));
                  if (invalid) {
                    setError("❌ Only JPG images are allowed.");
                    e.target.value = null;
                    setFiles([]);
                    return;
                  }
                  setFiles(selectedFiles);
                  setError("");
                }}
                hidden
              />
              {files.length ? (
                <span className="file-name">✅ {files.length} file(s) selected</span>
              ) : (
                <span>🖼️ Click to upload JPG images</span>
              )}
            </label>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Converting..." : "Merge JPGs to PDF"}
            </button>
          </div>

          {loading && (
            <>
              <div className="spinner-container">
                <div className="spinner"></div>
                <p className="spinner-text">Creating PDF...</p>
              </div>

             
            </>
          )}
        </form>

        {downloadLink && (
          <a href={downloadLink} download="merged.pdf" className="download-link">
            ⬇️ Download Merged PDF
          </a>
        )}
      </div>

      <FAQAccordion
        faqs={[
          {
            question: "Can I upload multiple images at once?",
            answer: "Yes! You can upload and merge up to 20 JPG images into one PDF."
          },
          {
            question: "Is there any cost for converting images to PDF?",
            answer: "No, the JPG to PDF service is completely free on Quick Converter."
          },
          {
            question: "Will the image quality be preserved?",
            answer: "Yes, the images are embedded at their original quality into the PDF."
          }
        ]}
      />

      <div className="internal-link-box">
        <p>
          Want to convert PDF back to JPGs? {" "}
          <Link to="/pdf-to-jpg" className="internal-link">Try PDF to JPG tool →</Link>
        </p>
      </div>
    </>
  );
}

export default JpgToPdf;
