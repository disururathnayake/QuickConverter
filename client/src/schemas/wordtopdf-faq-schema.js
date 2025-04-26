const wordToPdfFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which Word file formats are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support both .doc and .docx file formats for conversion to PDF."
        }
      },
      {
        "@type": "Question",
        "name": "Can I upload multiple Word documents together?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Currently, you can upload and convert one Word document at a time for best quality."
        }
      },
      {
        "@type": "Question",
        "name": "Is Word to PDF conversion free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our Word to PDF converter is completely free with no account needed."
        }
      }
    ]
  };
  
  export default wordToPdfFaqSchema;
  