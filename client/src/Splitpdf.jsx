import React, { useState } from "react";
import Navbar from "./templates/Navbar";
import "./Splitpdf.css";
import usePageTitle from "./hooks/usePageTitle";

function Splitpdf() {
    usePageTitle("Split PDF | Quick Converter");
    const [file, setFile] = useState(null);
    const [pageInput, setPageInput] = useState("");
    const [downloadLink, setDownloadLink] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type !== "application/pdf") {
            setError("❌ Only PDF files are allowed.");
            return;
        }
        setFile(selectedFile);
        setError("");
    };

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
            <Navbar />
            <div className="splitpdf-container">
                <h1>Split PDF</h1>
                <form onSubmit={handleSubmit} className="splitpdf-form">
                    <label className="upload-box">
                        <input type="file" accept="application/pdf" onChange={handleFileChange} hidden />
                        📄 Click to upload a PDF file
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

                    {downloadLink && (
                        <a href={downloadLink} download="split.pdf" className="download-link">
                            ⬇️ Download Split PDF
                        </a>
                    )}
                </form>
            </div>
        </>
    );
}

export default Splitpdf;
