const jpgToPdfFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I upload multiple images at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can upload and merge up to 20 JPG images into one PDF."
        }
      },
      {
        "@type": "Question",
        "name": "Is there any cost for converting images to PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, the JPG to PDF service is completely free on Quick Converter."
        }
      },
      {
        "@type": "Question",
        "name": "Will the image quality be preserved?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the images are embedded at their original quality into the PDF."
        }
      }
    ]
  };
  
  export default jpgToPdfFaqSchema;
  