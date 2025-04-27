import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "./templates/Navbar.jsx";
import FAQAccordion from "./templates/FAQAccordion.jsx";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "./config";
import "./Summarizepdf.css"; // We'll update CSS too

function Summarizepdf() {
  const [file, setFile] = useState(null);
  const [summaryFormat, setSummaryFormat] = useState("bullet");
  const [fileType, setFileType] = useState("pdf");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSummarize = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("❌ Please upload a PDF to summarize.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("format", summaryFormat);
    formData.append("fileType", fileType);

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`${API_BASE_URL}/summarize-pdf`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to summarize PDF");
      }

      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = fileType === "pdf" ? "summary.pdf" : "summary.docx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("❌ An error occurred while summarizing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Summarize PDF Files Online | Quick Converter</title>
        <meta
          name="description"
          content="Use AI to quickly summarize PDF files and download the summary as a PDF or DOCX file. Free, fast, and secure tool by Quick Converter."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.quickconverter.pro/summarize-pdf" />
      </Helmet>

      <Navbar />

      <div className="compresspdf-container">
        <div className="page-header">
          <h1 className="page-title">Summarize PDF and Download Instantly</h1>
          <p className="page-subtitle">
            Upload your PDF and let our AI create a clear, concise summary. Instantly download it as a PDF or DOCX file for study, business, or personal use.
          </p>
        </div>

        <form onSubmit={handleSummarize} className="compresspdf-form">
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

            {/* Summary Format Selection */}
            <div className="button-group">
              <label className="button-group-label">Summary Format:</label>
              <div className="button-options">
                <button
                  type="button"
                  className={summaryFormat === "bullet" ? "option-button active" : "option-button"}
                  onClick={() => setSummaryFormat("bullet")}
                >
                  Bullet Points
                </button>
                <button
                  type="button"
                  className={summaryFormat === "paragraph" ? "option-button active" : "option-button"}
                  onClick={() => setSummaryFormat("paragraph")}
                >
                  Paragraph
                </button>
              </div>
            </div>

            {/* File Type Selection */}
            <div className="button-group">
              <label className="button-group-label">File Type:</label>
              <div className="button-options">
                <button
                  type="button"
                  className={fileType === "pdf" ? "option-button active" : "option-button"}
                  onClick={() => setFileType("pdf")}
                >
                  PDF
                </button>
                <button
                  type="button"
                  className={fileType === "docx" ? "option-button active" : "option-button"}
                  onClick={() => setFileType("docx")}
                >
                  DOCX
                </button>
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">✅ Summary created and downloaded successfully!</p>}

            <button type="submit" disabled={loading} className="styled-button">
              {loading ? "Summarizing..." : "Summarize and Download"}
            </button>
          </div>

          {loading && (
            <div className="spinner-container">
              <div className="spinner"></div>
              <p className="spinner-text">Summarizing file... Please wait.</p>
            </div>
          )}
        </form>
      </div>

      <FAQAccordion
        faqs={[
          {
            question: "Is summarizing a PDF free?",
            answer: "Yes! Our summarizer is completely free and powered by AI. No signup needed.",
          },
          {
            question: "What types of PDFs can I summarize?",
            answer: "You can summarize reports, contracts, books, research papers, or any text-heavy PDF.",
          },
          {
            question: "Is my uploaded PDF secure?",
            answer: "Absolutely! Your file is processed securely and deleted automatically after summarization.",
          },
        ]}
      />

      <div className="internal-link-box">
        <p>
          Need to compress your PDF?{" "}
          <Link to="/compress-pdf" className="internal-link">Try our Compress PDF tool →</Link>
        </p>
      </div>
    </>
  );
}

export default Summarizepdf;
