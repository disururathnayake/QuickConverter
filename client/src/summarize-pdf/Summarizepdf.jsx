import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../templates/Navbar.jsx";
import FAQAccordion from "../templates/FAQAccordion.jsx";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config.js";
import summarizepdfFaqSchema from "../schemas/summarizepdf-faq-schema.js"; 
import "./Summarizepdf.css";
import Footer from "../templates/footer.jsx";

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
  
    // Check file size client-side (approximation)
    const maxFileSize = 6 * 1024 * 1024; // ~6MB (since 5000+ words PDFs are usually over this)
    if (file.size > maxFileSize) {
      setError("❌ The uploaded PDF seems too large. Please upload a document with fewer than 5000 words.");
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
  
      if (res.status === 413) {
        throw new Error("❌ Your PDF exceeds the allowed word limit (5000 words). Please upload a smaller file.");
      }
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
      setError(err.message || "❌ An error occurred while summarizing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>AI PDF Summarizer Online - Summarize PDF Files Fast | Quick Converter</title>
        <meta
          name="description"
          content="Use Quick Converter's AI-powered PDF summarizer to extract key points from your documents. Summarize PDFs online for free and download concise summaries in PDF or DOCX format."
        />
        <meta
          name="keywords"
          content="ai pdf summarizer, summarize pdf with ai, summarize pdf online, quick converter, ai summarize documents"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://quickconverter.pro/summarize-pdf" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Quick Converter - AI PDF Summarizer",
          "url": "https://quickconverter.pro/summarize-pdf",
          "applicationCategory": "Utility",
          "operatingSystem": "All",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        })}</script>

        <script type="application/ld+json">{JSON.stringify({
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
              "name": "AI PDF Summarizer",
              "item": "https://quickconverter.pro/summarize-pdf"
            }
          ]
        })}</script>
        
        <script type="application/ld+json">{JSON.stringify(summarizepdfFaqSchema)}</script>
      </Helmet>

      <Navbar />

      <div className="compresspdf-container">
        <div className="page-header">
          <h1 className="page-title">Summarize Your PDF with AI Instantly</h1>
          <p className="page-subtitle">
            Upload your PDF and let our AI summarize key points into a concise document. Download the summary as a PDF or DOCX — ideal for study notes, reports, or business use.
          </p>
        </div>

        <form onSubmit={handleSummarize} className="compresspdf-form">
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

            

            <div className="options-container">
  <div className="option-group">
    <label className="option-label">Format</label>
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

  <div className="option-group">
    <label className="option-label">File Type</label>
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
</div>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">✅ Summary created and downloaded successfully!</p>}

            <button type="submit" disabled={loading} className="styled-button">
              {loading ? "Summarizing..." : "Summarize and Download"}
            </button>
            <p className="upload-note">
            ℹ️ Note: We only summarize PDFs with up to <strong>5000 words</strong> to ensure fast, accurate results. 
    </p>
          </div>

          {loading && (
            <div className="spinner-container">
              <div className="spinner"></div>
              <p className="spinner-text">Summarizing file... Please wait.</p>
            </div>
          )}
        </form>
      </div>

      <div className="tool-intro">
  <h2>Why Use an AI PDF Summarizer?</h2>
  <p>
    Summarizing a long PDF manually can take hours. Our AI PDF summarizer makes it fast and easy by highlighting key points automatically. Whether you're reviewing study materials, reports, or business documents, getting quick summaries saves valuable time and boosts productivity.
  </p>
</div>

      <FAQAccordion
  faqs={[
    {
      question: "Is the AI PDF Summarizer free to use?",
      answer: "Yes! Quick Converter's AI PDF summarizer is 100% free. You can summarize as many PDFs as you like without any signup or hidden charges."
    },
    {
      question: "Can I summarize large PDF documents?",
      answer: "You can summarize PDFs with up to 5000 words. This keeps the process fast, accurate, and efficient for all users."
    },
    {
      question: "Why is there a 5000-word limit on summarization?",
      answer: "To ensure fast results and maintain high accuracy, we currently limit uploads to documents containing 5000 words or fewer. This also helps us keep the service completely free!"
    },
    {
      question: "Are my uploaded files safe and secure?",
      answer: "Absolutely. Your uploaded files are processed securely and automatically deleted after the summarization is complete. Your privacy is our priority."
    }
  ]}
/>

      <div className="internal-link-box">
        <p>
          Need to compress your PDF instead?{" "}
          <Link to="/compress-pdf" className="internal-link">Try our Compress PDF tool →</Link>
        </p>
      </div>
      <Footer />
    </>
    
  );
}

export default Summarizepdf;
