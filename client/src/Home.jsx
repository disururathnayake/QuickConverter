import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import pdfToWordImage from "./assets/pdf-to-word.png";
import wordtopdf from "./assets/word-to-pdf.png";
import mergepdf from "./assets/merge-pdf.png";
import splitpdf from "./assets/split-pdf.png";
import compresspdf from "./assets/compress-pdf.png";
import summarizepdf from "./assets/summarize-pdf.png";
import Navbar from "./templates/Navbar.jsx";
import usePageTitle from "./hooks/usePageTitle";
import { Helmet } from "react-helmet";
import FAQAccordion from "./templates/FAQAccordion";
import homeFaqSchema from "./schemas/home-faqs-schema.js"

function Home() {
  
  const tools = [
    {
      name: "PDF to Word Converter",
      description: "Easily convert PDF files into fully editable Word documents for free.",
      image: pdfToWordImage,
      href: "/pdf-to-word",
      alt: "PDF to Word Converter Icon",
    },
    {
      name: "Word to PDF Converter",
      description: "Quickly turn your Word documents into high-quality PDFs with one click.",
      image: wordtopdf,
      href: "/word-to-pdf",
      alt: "Word to PDF Converter Icon",
    },
    {
      name: "Merge PDF Files",
      description: "Combine multiple PDFs into a single organized PDF file easily.",
      image: mergepdf,
      href: "/merge-pdf",
      alt: "Merge PDF Files Icon",
    },
    {
      name: "Split PDF Pages",
      description: "Split a large PDF into smaller files or extract specific pages for free.",
      image: splitpdf,
      href: "/split-pdf",
      alt: "Split PDF Pages Icon",
    },
    {
      name: "Compress PDF Files",
      description: "Compress your PDF file size quickly and easily for free.",
      image: compresspdf, // Import a new image like compress-pdf.png
      href: "/compress-pdf",
      alt: "Compress PDF Files Icon",
    },
    {
      name: "Summarize PDF with AI",
      description: "Summarize PDF files automatically using powerful AI. Download concise summaries in seconds.",
      image: summarizepdf,
      href: "/summarize-pdf",
      alt: "Summarize PDF with AI Icon",
    },
  ];

  return (
    <div className="main-container">
      <Helmet>
        <title>Quick Converter | Free Online PDF Conversion Tools</title>
        <meta
          name="description"
          content="Quick Converter offers free and fast online PDF tools: Convert PDFs to Word, Word to PDFs, Merge, Split, Compress, and Summarize PDFs with AI. No signup needed!"
        />
        <meta
          name="keywords"
          content="free pdf converter, pdf to word, word to pdf, merge pdf, split pdf, compress pdf, summarize pdf, ai pdf summarizer, online pdf tools, quick converter"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://quickconverter.pro/" />
        <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Disuru Rathnayake",
      "url": "https://quickconverter.pro"
    })}
  </script>

  {/* WebSite Schema */}
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
  <h1>Quick Converter – Fast and Free PDF Conversion Tools</h1>
  <p>Convert, Merge, Split, Compress, and Summarize PDFs and more with our easy-to-use tools. 100% Free, No Signup Needed!</p>
</header>

<h2 className="tools-heading">Our Popular Free PDF Tools</h2>

<section className="tools-grid">
  {tools.map((tool, index) => (
    <Link to={tool.href} className="tool-card-link" key={index}>
      <div className="tool-card image-style">
        <img src={tool.image} alt={tool.name} className="tool-image" />
        <h2>{tool.name}</h2>
        <p>{tool.description}</p>
      </div>
    </Link>
  ))}
</section>
<FAQAccordion
    faqs={[
      {
        question: "Is Quick Converter free to use?",
        answer: "Yes, Quick Converter is completely free to use. No signup or installation needed."
      },
      {
        question: "Will my uploaded files be safe?",
        answer: "Absolutely. We respect your privacy. Your uploaded files are automatically deleted after the conversion process."
      },
      {
        question: "Are there any limits on file size?",
        answer: "We recommend uploading PDF files smaller than 100MB for the best speed and performance."
      },
      {
        question: "Can I use Quick Converter on mobile devices?",
        answer: "Yes! Our website is fully responsive and works smoothly on smartphones, tablets, and desktops."
      }
    ]}
  />

    </div>
  );
}

export default Home;
