import React, { useState } from "react";
import "./Pdftoword.css";
import { Link } from "react-router-dom";
import Navbar from "./templates/Navbar.jsx";
import usePageTitle from "./hooks/usePageTitle";
import { API_BASE_URL } from "./config";

function Pdftoword() {
  usePageTitle("PDF to Word | Quick Converter");
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
    </>
  );
}

export default Pdftoword;
