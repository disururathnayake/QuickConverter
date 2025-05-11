import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "../templates/Navbar";
import Footer from "../templates/footer.jsx";
import "./Blog.css";


const blogPosts = [
  {
    slug: "merge-jpg-to-pdf",
    title: "Merge JPG to PDF Online – The Easiest Way to Combine Images",
    excerpt:
      "Convert multiple JPG images into a single PDF instantly with Quick Converter. Free, secure, no signup required – optimized for high-quality merging.",
  },
  {
    slug: "best-pdf-converters",
    title: "The Best Free Online PDF Converters in 2025 (Ranked & Reviewed)",
    excerpt: "Explore the top free PDF converters for 2025 and discover why Quick Converter is your best choice. Fast, secure, and packed with essential tools.",
  },
  
];

function BlogHome() {
  return (
    <>
      <Helmet>
        <title>Quick Converter Blog | PDF & JPG Conversion Tips</title>
        <meta
          name="description"
          content="Read expert tips and guides on converting PDF, merging JPG to PDF, splitting PDFs, and more with Quick Converter's free tools."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://quickconverter.pro/blog" />
      </Helmet>

      <Navbar />

      <main className="blog-home">
        <h1 className="blog-heading">Quick Converter Blog</h1>
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <Link
              to={`/blog/${post.slug}`}
              className="blog-card-link"
              key={post.slug}
            >
              <article className="blog-card">
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <span className="read-more">Read More →</span>
              </article>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default BlogHome;
