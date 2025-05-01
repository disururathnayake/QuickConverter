const pdfToTxtFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does it extract all the text from the PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it extracts all visible text from each page of the PDF."
        }
      },
      {
        "@type": "Question",
        "name": "Is the PDF to TXT conversion free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it's completely free to use without any registration."
        }
      },
      {
        "@type": "Question",
        "name": "Can I convert scanned PDFs to TXT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Currently, our tool does not support OCR for scanned documents."
        }
      }
    ]
  };
  
  export default pdfToTxtFaqSchema;
  