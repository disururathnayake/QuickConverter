import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Navbar from "./templates/Navbar";
import "./Mergepdf.css";
import usePageTitle from "./hooks/usePageTitle";
import { API_BASE_URL } from "./config";

function Mergepdf() {
    usePageTitle("Merge PDF Files | Quick Converter");
    const [files, setFiles] = useState([]);
    const [downloadLink, setDownloadLink] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 10) {
            setError("❌ You can upload up to 10 PDF files.");
            return;
        }

        const allPdf = selectedFiles.every(file => file.type === "application/pdf");
        if (!allPdf) {
            setError("❌ Only PDF files are allowed.");
            return;
        }

        setFiles(selectedFiles);
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

        setLoading(false);

        if (!res.ok) {
            setError("❌ Failed to merge PDF files. Please try again.");
            return;
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        setDownloadLink(url);
    };

    return (
        <>
            <Navbar />
            <div className="mergepdf-container">
                <h1>Merge PDF Documents</h1>
                <form onSubmit={handleSubmit} className="mergepdf-form">
                    <div className="upload-section">
                        <label className="upload-box">
                            <input
                                type="file"
                                accept="application/pdf"
                                multiple
                                onChange={handleFileChange}
                                hidden
                            />
                            📄 Click to upload PDF files (Max 10)
                        </label>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" disabled={loading}>
                            {loading ? "Merging..." : "Merge PDFs"}
                        </button>
                    </div>
                    {loading && (
                        <div className="spinner-container">
                            <div className="spinner"></div>
                            <p className="spinner-text">Merging files...</p>
                        </div>
                    )}

                    {downloadLink && (
                        <a href={downloadLink} download="merged.pdf" className="download-link">
                            ⬇️ Download Merged PDF
                        </a>
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
        </>
    );
}

export default Mergepdf;
