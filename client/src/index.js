import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PdfToWord from "./pdf-to-word/Pdftoword.jsx";
import Wordtopdf from "./word-to-pdf/Wordtopdf.jsx";
import Mergepdf from "./merge-pdf/Mergepdf.jsx";
import Splitpdf from "./split-pdf/Splitpdf.jsx";
import ScrollToTop from "./ScrollToTop";
import Compresspdf from "./compress-pdf/Compresspdf.jsx";
import Summarizepdf from "./summarize-pdf/Summarizepdf.jsx";
import Pdftojpg from "./pdf-to-jpg/Pdftojpg.jsx";
import Jpgtopdf from "./jpg-to-pdf/Jpgtopdf.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import TermsOfService from "./TermsOfService.jsx";
import Removepages from "./remove-pages/Removepages.jsx";
import { Analytics } from "@vercel/analytics/react";

import "./pdf-to-word/Pdftoword.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <ScrollToTop />
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

    </Routes>
    <Analytics />
  </BrowserRouter>
);
