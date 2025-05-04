import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { Analytics } from "@vercel/analytics/react";

import "./pdf-to-word/Pdftoword.css";
import "./word-to-pdf/Wordtopdf.css";
import "./merge-pdf/Mergepdf.css";
import "./compress-pdf/Compresspdf.css";
import "./jpg-to-pdf/Jpgtopdf.css";
import "./pdf-to-jpg/Pdftojpg.css";
import "./pdf-to-png/Pdftopng.css";
import "./pdf-to-txt/Pdftotxt.css";
import "./remove-pages/Removepages.css";
import "./summarize-pdf/Summarizepdf.css";
import "./split-pdf/Splitpdf.css";


// Lazy-loaded routes
const Home = React.lazy(() => import("./Home"));
const PdfToWord = React.lazy(() => import("./pdf-to-word/Pdftoword.jsx"));
const Wordtopdf = React.lazy(() => import("./word-to-pdf/Wordtopdf.jsx"));
const Mergepdf = React.lazy(() => import("./merge-pdf/Mergepdf.jsx"));
const Splitpdf = React.lazy(() => import("./split-pdf/Splitpdf.jsx"));
const Compresspdf = React.lazy(() => import("./compress-pdf/Compresspdf.jsx"));
const Summarizepdf = React.lazy(() => import("./summarize-pdf/Summarizepdf.jsx"));
const Pdftojpg = React.lazy(() => import("./pdf-to-jpg/Pdftojpg.jsx"));
const Jpgtopdf = React.lazy(() => import("./jpg-to-pdf/Jpgtopdf.jsx"));
const PrivacyPolicy = React.lazy(() => import("./PrivacyPolicy.jsx"));
const TermsOfService = React.lazy(() => import("./TermsOfService.jsx"));
const Removepages = React.lazy(() => import("./remove-pages/Removepages.jsx"));
const PdfToPng = React.lazy(() => import("./pdf-to-png/Pdftopng.jsx"));
const PdfToTxt = React.lazy(() => import("./pdf-to-txt/Pdftotxt.jsx"));
const BlogHome = React.lazy(() => import("./blog/BlogHome.jsx"));
const BlogPost = React.lazy(() => import("./blog/BlogPost.jsx"));

import LoadingSpinner from "./LoadingSpinner";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <React.Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pdf-to-word" element={<PdfToWord />} />
        <Route path="/word-to-pdf" element={<Wordtopdf />} />
        <Route path="/merge-pdf" element={<Mergepdf />} />
        <Route path="/split-pdf" element={<Splitpdf />} />
        <Route path="/compress-pdf" element={<Compresspdf />} />
        <Route path="/summarize-pdf" element={<Summarizepdf />} />
        <Route path="/pdf-to-jpg" element={<Pdftojpg />} />
        <Route path="/jpg-to-pdf" element={<Jpgtopdf />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/remove-pages" element={<Removepages />} />
        <Route path="/pdf-to-png" element={<PdfToPng />} />
        <Route path="/pdf-to-txt" element={<PdfToTxt />} />
        <Route path="/blog" element={<BlogHome />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </React.Suspense>
    <Analytics />
  </BrowserRouter>
);
