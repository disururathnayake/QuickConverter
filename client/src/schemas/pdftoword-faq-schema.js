const pdfToWordFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I convert scanned PDFs to Word?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Currently, we only support text-based PDFs. Scanned images require OCR, which is not yet available."
        }
      },
      {
        "@type": "Question",
        "name": "Will the formatting stay the same after conversion?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We aim to preserve original formatting like fonts, images, and layout as much as possible."
        }
      },
      {
        "@type": "Question",
        "name": "Is PDF to Word conversion free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our PDF to Word tool is completely free with no sign-up needed."
        }
      }
    ]
  };
  
  export default pdfToWordFaqSchema;
  