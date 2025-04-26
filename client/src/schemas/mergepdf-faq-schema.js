const mergePdfFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many PDFs can I merge at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can merge up to 10 PDF files at a time for best performance and speed."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a size limit for PDF merging?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Each individual file should be under 100MB for smooth processing."
        }
      },
      {
        "@type": "Question",
        "name": "Are my files safe after merging?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all uploaded files are processed securely and automatically deleted after merging."
        }
      }
    ]
  };
  
  export default mergePdfFaqSchema;
  