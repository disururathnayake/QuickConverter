import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "../templates/Navbar";
import Footer from "../templates/footer.jsx";
import "./Blog.css";

import MergeJpgToPdfPost from "./content/merge-jpg-to-pdf";


const blogContent = {
  "merge-jpg-to-pdf": {
    title: "Merge JPG to PDF Online – The Easiest Way to Combine Images",
    description:
      "Convert JPG images to a single PDF online with Quick Converter. Supports multiple uploads, drag-and-drop, reordering, secure processing, and original quality preservation.",
    component: <MergeJpgToPdfPost />,
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
        <link rel="canonical" href={`https://quickconverter.pro/blog/${slug}`} />
      </Helmet>
      <Navbar />
      {post.component}
      <Footer />
    </>
  );
}

export default BlogPost;
