import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "../templates/Navbar";
import Footer from "../templates/footer.jsx";
import "./Blog.css";

import MergeJpgToPdfPost from "./content/merge-jpg-to-pdf";
import BestPdfConvertersPost from "./content/best-pdf-converters.jsx";


const blogContent = {
  "merge-jpg-to-pdf": {
    title: "Merge JPG to PDF Online – The Easiest Way to Combine Images",
    description:
      "Convert JPG images to a single PDF online with Quick Converter. Supports multiple uploads, drag-and-drop, reordering, secure processing, and original quality preservation.",
      image: "https://quickconverter.pro/assets/step-by-step-guide-merge-jpg-to-pdf.webp",
    component: <MergeJpgToPdfPost />,
  },
  "best-pdf-converters": {
    title: "The Best Free Online PDF Converters in 2025 (Ranked & Reviewed)",
    description: "Explore the top free PDF converters for 2025 and discover why Quick Converter is your best choice. Fast, secure, and packed with essential tools.",
    image: "https://quickconverter.pro/assets/best-pdf-converters-2025.webp",
    component: <BestPdfConvertersPost />,
  },
  // Future posts can go here...
};

function BlogPost() {
  const { slug } = useParams();
  const post = blogContent[slug];

  if (!post) {
    return <p>Sorry, this blog post doesn't exist.</p>;
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Quick Converter</title>
        <meta name="description" content={post.description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://quickconverter.pro/blog/${slug}`} />
        <script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.title,
  "description": post.description,
  "image": post.image,
  "author": {
    "@type": "Organization",
    "name": "Quick Converter"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Quick Converter",
    "url": "https://quickconverter.pro"
  },
  "url": `https://quickconverter.pro/blog/${slug}`,
  "mainEntityOfPage": `https://quickconverter.pro/blog/${slug}`
})}
</script>

      </Helmet>
      <Navbar />
      {post.component}
      <Footer />
    </>
  );
}

export default BlogPost;
