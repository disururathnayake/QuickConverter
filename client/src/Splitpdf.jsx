import React, { useState } from "react";
import Navbar from "./templates/Navbar";
import "./Splitpdf.css";
import usePageTitle from "./hooks/usePageTitle";
import { API_BASE_URL } from "./config";
import { Helmet } from "react-helmet";

function Splitpdf() {
  usePageTitle("Split PDF | Quick Converter");

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
        <title>Split PDF Pages | Quick Converter</title>
        <meta name="description" content="Split selected pages from your PDF document with ease. Quick, simple and free PDF splitting." />
        <meta name="keywords" content="split pdf, extract pdf pages, pdf splitter, free pdf tool, quick converter" />
      </Helmet>

      <Navbar />

      <div className="app-container">
        <h1>Split PDF</h1>

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
    </>
  );
}

export default Splitpdf;
