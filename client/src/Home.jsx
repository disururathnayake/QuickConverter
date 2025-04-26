import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import pdfToWordImage from "./assets/pdf-to-word.png";
import wordtopdf from "./assets/word-to-pdf.png";
import mergepdf from "./assets/merge-pdf.png";
import splitpdf from "./assets/split-pdf.png";
import Navbar from "./templates/Navbar.jsx";
import usePageTitle from "./hooks/usePageTitle";
import { Helmet } from "react-helmet";

function Home() {
  
  const tools = [
    {
      name: "PDF to Word Converter",
      description: "Easily convert PDF files into fully editable Word documents for free.",
      image: pdfToWordImage,
      href: "/pdf-to-word",
      alt: "PDF to Word Conversion Tool Preview",
    },
    {
      name: "Word to PDF Converter",
      description: "Quickly turn your Word documents into high-quality PDFs with one click.",
      image: wordtopdf,
      href: "/word-to-pdf",
      alt: "Word to PDF Conversion Tool Preview",
    },
    {
      name: "Merge PDF Files",
      description: "Combine multiple PDFs into a single organized PDF file easily.",
      image: mergepdf,
      href: "/merge-pdf",
      alt: "Merge PDF Files Tool Preview",
    },
    {
      name: "Split PDF Pages",
      description: "Split a large PDF into smaller files or extract specific pages for free.",
      image: splitpdf,
      href: "/split-pdf",
      alt: "Split PDF Pages Tool Preview",
    },
  ];

  return (
    <div className="main-container">
      <Helmet>
        <title>Quick Converter | Free Online PDF Conversion Tools</title>
        <meta
          name="description"
          content="Quick Converter offers fast and free PDF tools like PDF to Word, Word to PDF, Merge PDF, and Split PDF. No signup required. Easy and secure."
        />
        <meta
          name="keywords"
          content="free pdf converter, pdf to word, word to pdf, merge pdf, split pdf, quick converter, online pdf tools"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.quickconverter.pro/" />
      </Helmet>
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
