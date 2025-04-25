import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import pdfToWordImage from "./assets/pdf-to-word.png";
import wordtopdf from "./assets/word-to-pdf.png";
import mergepdf from "./assets/merge-pdf.png";
import splitpdf from "./assets/split-pdf.png";
import Navbar from "./templates/Navbar.jsx";
import usePageTitle from "./hooks/usePageTitle";

function Home() {
  usePageTitle("Quick Converter");
  const tools = [
    {
      name: "PDF to Word",
      description: "Convert PDF files into editable Word documents.",
      image: pdfToWordImage,
      href: "/pdf-to-word",
    },
    {
      name: "Word to PDF",
      description: "Convert Word files into PDF documents.",
      image: wordtopdf,
      href: "/word-to-pdf",
    },
    {
      name: "Merge PDF",
      description: "Combine multiple PDF files into a single PDF File.",
      image: mergepdf,
      href: "/merge-pdf",
    },
    {
      name: "Split PDF",
      description: "Convert PDF files into editable Word documents.",
      image: splitpdf,
      href: "/split-pdf",
    },
   
  ];

  return (
    <div className="main-container">
      <Navbar />

      <header className="hero">
        <h1>All-in-One PDF Tools</h1>
        <p>Merge, split, compress, and convert your PDFs with ease.</p>
      </header>

      <section className="tools-grid">
        {tools.map((tool, index) => (
          <div className="tool-card image-style" key={index}>
            <img src={tool.image} alt={tool.name} className="tool-image" style={{ width: "128px", height: "128px", objectFit: "contain" }} />
            <h2>{tool.name}</h2>
            <p>{tool.description}</p>
            <Link to={tool.href} className="tool-link">
              Open Tool →
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
