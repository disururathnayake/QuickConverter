const splitPdfFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I split multiple pages at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can select multiple pages or page ranges like 2-4,6,8-10 to split."
        }
      },
      {
        "@type": "Question",
        "name": "Will splitting a PDF change the original file?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, your original file remains unchanged. You download a new file with selected pages."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a maximum file size for splitting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend uploading PDFs smaller than 100MB for best performance."
        }
      }
    ]
  };
  
  export default splitPdfFaqSchema;
  