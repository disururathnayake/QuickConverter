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
  // Add more posts here as needed
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
            <article key={post.slug} className="blog-card">
              <h2 className="blog-title">{post.title}</h2>
              <p className="blog-excerpt">{post.excerpt}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="read-more"
                aria-label={`Read more about ${post.title}`}
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default BlogHome;
