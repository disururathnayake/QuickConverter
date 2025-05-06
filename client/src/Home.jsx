import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Navbar from "./templates/Navbar.jsx";
import Footer from "./templates/footer.jsx";
import { Helmet } from "react-helmet";
import FAQAccordion from "./templates/FAQAccordion";
import homeFaqSchema from "./schemas/home-faqs-schema.js";

// Import icons
import pdfToWordImage from "./assets/pdf-to-word.webp";
import wordtopdf from "./assets/word-to-pdf.webp";
import mergepdf from "./assets/merge-pdf.webp";
import splitpdf from "./assets/split-pdf.webp";
import compresspdf from "./assets/compress-pdf.webp";
import summarizepdf from "./assets/summarize-pdf.webp";
import jpgtopdf from "./assets/jpg-to-pdf.webp";
import pdftojpg from "./assets/pdf-to-jpg.webp";
import removepages from "./assets/remove-pages.webp";
import pdftopng from "./assets/pdf-to-png.webp";
import pdftotxt from "./assets/pdf-to-txt.webp";
import editpdf from "./assets/edit-pdf.webp";


function Home() {
  const categorizedTools = {
    "Basic PDF Operations": [
      {
        name: "Merge PDF",
        description: "Combine multiple PDFs into a single file easily.",
        image: mergepdf,
        href: "/merge-pdf",
        alt: "Merge PDF Icon",
      },
      {
        name: "Split PDF",
        description: "Extract specific pages from your PDF or divide it into parts.",
        image: splitpdf,
        href: "/split-pdf",
        alt: "Split PDF Icon",
      },
      {
        name: "Compress PDF",
        description: "Shrink your PDF size without losing quality.",
        image: compresspdf,
        href: "/compress-pdf",
        alt: "Compress PDF Icon",
      },
      {
        name: "Remove Pages",
        description: "Easily delete unwanted pages from your PDF file online. Fast, free, and secure.",
        image: removepages,
        href: "/remove-pages",
        alt: "Remove Pages from PDF Icon",
      },
      {
        name: "Edit PDF",
        description: "Write, highlight, sign, and edit PDF documents online. No watermark, no signup.",
        image: editpdf,
        href: "/edit-pdf",
        alt: "Edit PDF Icon",
      }
    ],

    "Convert to PDF": [
      {
        name: "Word to PDF",
        description: "Convert Word documents to high-quality PDFs.",
        image: wordtopdf,
        href: "/word-to-pdf",
        alt: "Word to PDF Icon",
      },
      {
        name: "JPG to PDF",
        description: "Merge JPG images into a single PDF file.",
        image: jpgtopdf,
        href: "/jpg-to-pdf",
        alt: "JPG to PDF Icon",
      },
    ],
    "Convert from PDF": [
      {
        name: "PDF to Word",
        description: "Turn PDF files into fully editable Word documents.",
        image: pdfToWordImage,
        href: "/pdf-to-word",
        alt: "PDF to Word Icon",
      },
      {
        name: "PDF to JPG",
        description: "Convert PDF pages into high-quality JPG images.",
        image: pdftojpg,
        href: "/pdf-to-jpg",
        alt: "PDF to JPG Icon",
      },
      {
        name: "PDF to PNG",
        description: "Convert PDF pages into high-quality PNG images. 100% free.",
        image: pdftopng,
        href: "/pdf-to-png",
        alt: "PDF to PNG Icon",
      },
      {
        name: "PDF to TXT",
        description: "Extract raw text from any PDF — fast, free, and accurate.",
        image: pdftotxt,
        href: "/pdf-to-txt",
        alt: "PDF to TXT Icon",
      },
    ],
    "AI Tools": [
      {
        name: "Summarize PDF ✨",
        description: "Summarize PDF content using advanced AI.",
        image: summarizepdf,
        href: "/summarize-pdf",
        alt: "Summarize PDF Icon",
      },
    ],
  };

  return (
    <div className="main-container">
      <Helmet>
        <title>Quick Converter | Free Online PDF Tools</title>
        <meta
          name="description"
          content="Convert, compress, merge, split, edit, and summarize PDF files online for free with Quick Converter."
        />
        <meta
          name="keywords"
          content="pdf to word, word to pdf, merge pdf, compress pdf, split pdf, unlock pdf, summarize pdf, edit pdf, pdf editor"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://quickconverter.pro/" />
        <link rel="preload" as="image" href="/assets/logo.webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://quickconverter.pro",
            "name": "Quick Converter"
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(homeFaqSchema)}
        </script>
      </Helmet>

      <Navbar />

      <header className="hero">
        <h1>Quick Converter – Free PDF Tools</h1>
        <p>Convert, Compress, Merge, Split, and Summarize PDFs in one place. 100% Free, No Signup!</p>
      </header>

      {Object.entries(categorizedTools).map(([category, tools]) => (
        <section className="tool-section" key={category}>
          <h2 id={category.toLowerCase().replace(/ /g, "-")} className="tools-heading">
            {category}
          </h2>
          <div className="tools-grid">
            {tools.map((tool, index) => (
              <Link to={tool.href} className="tool-card-link" key={index}>
                <div className="tool-card image-style">
                  <img src={tool.image} alt={tool.alt} className="tool-image" loading="lazy" />
                  <h3>{tool.name}</h3>
                  <p>{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <FAQAccordion
        faqs={[
          {
            question: "Is Quick Converter free to use?",
            answer: "Yes, all tools on Quick Converter are completely free to use without registration."
          },
          {
            question: "Are my files secure?",
            answer: "Yes. Files are automatically deleted after processing and never stored."
          },
          {
            question: "Can I use it on mobile?",
            answer: "Absolutely! The site is fully responsive and mobile-friendly."
          }
        ]}
      />

<div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "24px", margin: "40px 0" }}>
  {/* Product Hunt Badge */}
  <a
    href="https://www.producthunt.com/posts/quick-converter?utm_source=badge-featured&utm_medium=badge&utm_campaign=quick-converter"
    target="_blank"
    rel="noopener noreferrer"
    style={{ display: "inline-block" }}
  >
    <img
      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=960678&theme=light"
      alt="Quick Converter on Product Hunt"
      style={{ height: "50px" }}
    />
  </a>

  {/* X (Twitter) Badge Styled Like a Button */}
  <a
    href="https://x.com/quickconverter"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-flex",
      alignItems: "center",
      backgroundColor: "#f3f4f6",
      padding: "8px 16px",
      borderRadius: "999px",
      textDecoration: "none",
      color: "#000",
      fontWeight: "500",
      fontSize: "15px",
      boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
      gap: "8px"
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1200 1227" fill="none">
      <path fill="black" d="M1120 0H894L585 426L269 0H0L441 576L0 1227H326L658 756L1006 1227H1200L744 640L1120 0Z"/>
    </svg>
    Follow us on X
  </a>
</div>


      <Footer />
    </div>
  );
}

export default Home;
