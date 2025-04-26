import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PdfToWord from "./Pdftoword.jsx";
import Wordtopdf from "./Wordtopdf.jsx";
import Mergepdf from "./Mergepdf.jsx";
import Splitpdf from "./Splitpdf.jsx";
import ScrollToTop from "./ScrollToTop";
import "./Pdftoword.css";


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
    </Routes>
  </BrowserRouter>
);
