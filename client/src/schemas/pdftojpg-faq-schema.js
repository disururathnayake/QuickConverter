const pdfToJpgFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I convert a multipage PDF into JPGs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Each page will be converted into a separate JPG image and downloaded in a zip file."
        }
      },
      {
        "@type": "Question",
        "name": "Is PDF to JPG conversion free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Quick Converter offers this service free of charge with no sign-up required."
        }
      },
      {
        "@type": "Question",
        "name": "Will the quality of my images be good?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we aim to maintain high resolution when converting PDF pages to JPG images."
        }
      }
    ]
  };
  
  export default pdfToJpgFaqSchema;
  