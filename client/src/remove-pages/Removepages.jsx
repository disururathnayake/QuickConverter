import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.js";
import { API_BASE_URL } from "../config.js";
import Navbar from "../templates/Navbar.jsx";
import Footer from "../templates/footer.jsx";
import FAQAccordion from "../templates/FAQAccordion.jsx";
import { Link } from "react-router-dom";
import "./Removepages.css";
import removePagesFaqSchema from "../schemas/remove-pages-faq-schema.js";

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.min.js`;

function Removepages() {
  const [file, setFile] = useState(null);
  const [pdfPages, setPdfPages] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [processingText, setProcessingText] = useState("");
  const fileReaderRef = useRef(null);

  const loadPdfPages = async (arrayBuffer) => {
    setLoadingPreview(true);
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    const pages = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 0.5 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;

      pages.push({ pageNumber: i, imageDataUrl: canvas.toDataURL() });
    }

    setPdfPages(pages);
    setLoadingPreview(false);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    const reader = new FileReader();
    reader.onload = () => {
      loadPdfPages(reader.result);
    };
    reader.readAsArrayBuffer(selected);
  };

  const togglePage = (pageNumber) => {
    setSelectedPages((prev) =>
      prev.includes(pageNumber)
        ? prev.filter((n) => n !== pageNumber)
        : [...prev, pageNumber]
    );
  };

  const handleSubmit = async () => {
    if (!file || selectedPages.length === 0) return;

    setLoading(true);
    setProcessingText("Processing your PDF. Please wait...");
    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("pages", selectedPages.join(","));

    try {
      const res = await fetch(`${API_BASE_URL}/remove-pages`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to remove pages.");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadLink(url);
    } catch (err) {
      alert("❌ Failed to remove pages.");
    } finally {
      setLoading(false);
      setProcessingText("");
    }
  };

  return (
    <>
      <Helmet>
        <title>Remove Pages from PDF - Clean Up Your Files Easily | Quick Converter</title>
        <meta
          name="description"
          content="Delete unwanted pages from your PDF file using Quick Converter's free online tool. Fast, secure, no registration required."
        />
        <meta
          name="keywords"
          content="remove pages from pdf, delete pdf pages, pdf editor, online pdf page remover, quick converter"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://quickconverter.pro/remove-pages" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Remove PDF Pages",
            "url": "https://quickconverter.pro/remove-pages",
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
                "name": "Remove PDF Pages",
                "item": "https://quickconverter.pro/remove-pages"
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(removePagesFaqSchema)}
        </script>
      </Helmet>

      <Navbar />
      <div className="remove-pdf-container">
        <div className="page-header">
          <h1 className="page-title">Remove Pages from PDF</h1>
          <p className="page-subtitle">
            Select pages you want to delete from your PDF and get a cleaner document instantly. Fast, secure, and free.
          </p>
        </div>

        <label className="upload-box">
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          {file ? `✅ ${file.name}` : "📄 Click to upload a PDF file"}
        </label>

        {loadingPreview && (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p className="spinner-text">Loading PDF preview...</p>
          </div>
        )}

        <div className="page-preview-container">
          {pdfPages.map((p) => (
            <div
              key={p.pageNumber}
              className={`page-thumb ${selectedPages.includes(p.pageNumber) ? "selected" : ""}`}
              onClick={() => togglePage(p.pageNumber)}
            >
              <img src={p.imageDataUrl} alt={`Page ${p.pageNumber}`} />
              <span>Page {p.pageNumber}</span>
            </div>
          ))}
        </div>

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Remove Selected Pages"}
        </button>

        {processingText && (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p className="spinner-text"></p>
          </div>
        )}

        <br />
        {downloadLink && (
          <a href={downloadLink} download="removed.pdf" className="download-link">
            ⬇ Download Your File
          </a>
        )}
      </div>

      <div className="tool-intro">
        <h2>Why Remove PDF Pages?</h2>
        <p>
          PDF files often contain unwanted or extra pages. This tool allows you to quickly clean up documents by removing unnecessary pages before sharing or archiving them. All done in your browser — no signup needed.
        </p>
      </div>

      <FAQAccordion
        faqs={[
          {
            question: "Can I remove multiple pages at once?",
            answer: "Yes. Simply click on all the pages you want to remove, then click the 'Remove Selected Pages' button."
          },
          {
            question: "Is this tool free to use?",
            answer: "Yes, Quick Converter's remove pages tool is 100% free with no account required."
          },
          {
            question: "Are my PDF files secure?",
            answer: "Yes. Files are processed in the browser or deleted after processing. We never store your data."
          }
        ]}
      />

      <div className="internal-link-box">
        <p>
          Want to compress your PDF after removing pages?{' '}
          <Link to="/compress-pdf" className="internal-link">
            Try our Compress PDF tool →
          </Link>
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Removepages;
