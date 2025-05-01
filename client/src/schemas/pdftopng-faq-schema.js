const pdfToPngFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I convert a multipage PDF into PNGs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Each page will be converted into a separate PNG image and downloaded in a zip file."
        }
      },
      {
        "@type": "Question",
        "name": "Is PDF to PNG conversion free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Quick Converter offers this service free of charge with no sign-up required."
        }
      },
      {
        "@type": "Question",
        "name": "Will the image quality be preserved?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we maintain high resolution when converting PDF pages to PNG."
        }
      }
    ]
  };
  
  export default pdfToPngFaqSchema;
  