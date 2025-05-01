import React, { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Navbar from "../templates/Navbar.jsx";
import FAQAccordion from "../templates/FAQAccordion.jsx";
import "./Mergepdf.css";
import usePageTitle from "../hooks/usePageTitle.js";
import { API_BASE_URL } from "../config.js";
import { Helmet } from "react-helmet";
import mergeGuideImg from "../assets/merge-guide.webp";
import { Link } from "react-router-dom";
import mergePdfFaqSchema from "../schemas/mergepdf-faq-schema.js";
import Footer from "../templates/footer.jsx";

function Mergepdf() {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length + files.length > 10) {
            setError("❌ You can upload up to 10 PDF files.");
            return;
        }

        const allPdf = selectedFiles.every(file => file.type === "application/pdf");
        if (!allPdf) {
            setError("❌ Only PDF files are allowed.");
            return;
        }

        setFiles(prev => [...prev, ...selectedFiles]);
        setError("");
    };

    const handleDelete = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reordered = Array.from(files);
        const [moved] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, moved);
        setFiles(reordered);
    };

    const handleDropUpload = (e) => {
        e.preventDefault();
        setIsDraggingOver(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        const validPDFs = droppedFiles.filter(file => file.type === "application/pdf");

        if (files.length + validPDFs.length > 10) {
            setError("❌ You can upload up to 10 PDF files.");
            return;
        }

        setFiles(prev => [...prev, ...validPDFs]);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (files.length < 2) {
            setError("❌ Please upload at least 2 PDF files.");
            return;
        }

        const formData = new FormData();
        files.forEach(file => formData.append("files", file));

        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE_URL}/merge-pdf`, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            setError("❌ Failed to merge PDF files. Please try again.");
            setLoading(false);
            return;
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "merged.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => window.URL.revokeObjectURL(url), 1000);

        setLoading(false);
        setFiles([]);
    };

    return (
        <>
            <Helmet>
                <title>Merge PDF Files Online for Free - Quick Converter</title>
                <meta
                    name="description"
                    content="Easily merge multiple PDF documents into a single file. Simple, fast, and free."
                />
                <meta
                    name="keywords"
                    content="merge pdf, combine pdf, quick converter, online pdf tool"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://quickconverter.pro/merge-pdf" />
                <script type="application/ld+json">
                    {`
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Merge PDF Files",
      "url": "https://quickconverter.pro/merge-pdf",
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

                <script type="application/ld+json">
                    {JSON.stringify(mergePdfFaqSchema)}
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
                                "name": "Merge PDF",
                                "item": "https://quickconverter.pro/merge-pdf"
                            }
                        ]
                    })}
                </script>
            </Helmet>
            <Navbar />
            <div className="mergepdf-container">
                <h1>Merge PDF Documents</h1>
                <p className="page-subtitle">
                    Easily merge multiple PDF files into one with Quick Converter. Our free online tool lets you combine PDFs quickly, maintain original formatting, and streamline your documents for sharing or archiving. No sign-up required — just upload, arrange, and merge!
                </p>
                <br></br>
                <form onSubmit={handleSubmit} className="mergepdf-form">
                    <div
                        className={`upload-box ${isDraggingOver ? "dragging" : ""}`}
                        onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
                        onDragLeave={() => setIsDraggingOver(false)}
                        onDrop={handleDropUpload}
                        onClick={() => fileInputRef.current.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="application/pdf"
                            multiple
                            onChange={handleFileChange}
                            hidden
                        />
                        {files.length > 0 ? (
                            <span className="file-name">✅ {files.length} file(s) selected</span>
                        ) : (
                            <span>📄 Click or Drag & Drop up to 10 PDF files</span>
                        )}
                    </div>
                    <br></br>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Merging..." : "Merge & Download"}
                    </button>

                    {loading && (
                        <div className="spinner-container">
                            <div className="spinner"></div>
                            <p className="spinner-text">Merging files...</p>
                        </div>
                    )}
                </form>

                <br></br>

                {/* File List */}
                {files.length > 0 && (
                    <div className="file-list">
                        <h3>Uploaded Files</h3>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="files">
                                {(provided) => (
                                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                                        {files.map((file, index) => (
                                            <Draggable key={file.name + index} draggableId={file.name + index} index={index}>
                                                {(provided) => (
                                                    <li
                                                        className="file-row"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <span>{file.name}</span>
                                                        <button type="button" onClick={() => handleDelete(index)}>🗑️</button>
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                )}

            </div>

            <section className="guide-section">
                <h2 className="guide-heading">How to Merge PDF Files</h2>
                <div className="guide-content">
                    <div className="guide-steps">


                        <div className="step">
                            <span className="step-icon">📤</span>
                            <p><strong>Upload:</strong> Select up to 10 PDF files from your device.</p>
                        </div>

                        <div className="step">
                            <span className="step-icon">⬇️</span>
                            <p><strong>Reorder:</strong> Drag and drop files to arrange them.</p>
                        </div>

                        <div className="step">
                            <span className="step-icon">📥</span>
                            <p><strong>Merge:</strong> Click “Merge & Download” to combine and download.</p>
                        </div>
                    </div>


                    <div className="guide-image">
                        <img src={mergeGuideImg} alt="Merging PDF Illustration" />
                    </div>
                </div>
            </section>
            <div className="tool-intro">
                <h2>Why Merge Multiple PDFs?</h2>
                <p>
                    Combining multiple PDFs into one organized document simplifies sharing and reading. Whether it's contracts, reports, or study materials, merging your files into a single PDF helps keep your information neat, accessible, and professional.
                </p>
            </div>

            <FAQAccordion
                faqs={[
                    {
                        question: "How many PDFs can I merge at once?",
                        answer: "You can merge up to 10 PDF files at a time for best performance and speed."
                    },
                    {
                        question: "Is there a size limit for PDF merging?",
                        answer: "Each individual file should be under 100MB for smooth processing."
                    },
                    {
                        question: "Are my files safe after merging?",
                        answer: "Yes, all uploaded files are processed securely and automatically deleted after merging."
                    }
                ]}
            />

            <div className="internal-link-box">
                <p>
                    Need to Remove pages after merging?{" "}
                    <Link to="/remove-pages" className="internal-link">Try our PDF Page Remover Tool →</Link>
                </p>
            </div>
            <Footer />
        </>
    );
}

export default Mergepdf;
