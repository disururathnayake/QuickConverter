const compressPdfFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I compress multiple PDFs at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Currently, you can compress one PDF at a time for best performance and quality."
        }
      },
      {
        "@type": "Question",
        "name": "Is PDF compression free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our PDF compression tool is completely free and does not require any sign-up."
        }
      },
      {
        "@type": "Question",
        "name": "Will my PDF lose quality after compression?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We optimize your PDF file size while maintaining good readability and visual quality."
        }
      }
    ]
  };
  
  export default compressPdfFaqSchema;
  