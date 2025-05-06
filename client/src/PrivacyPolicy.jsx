// PrivacyPolicy.jsx
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "./templates/Navbar.jsx";
import Footer from "./templates/footer.jsx";
import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Quick Converter</title>
        <meta name="description" content="Read Quick Converter's privacy policy to understand how we protect your data and ensure user confidentiality." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://quickconverter.pro/privacy-policy" />
      </Helmet>

      <Navbar />

      <div className="privacy-container">
        <h1>Privacy Policy</h1>
        <p>Effective Date: {new Date().getFullYear()}</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Quick Converter. We are committed to protecting your privacy and ensuring transparency about how we handle your information. This Privacy Policy explains what information we collect and how we use it.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>
            Quick Converter does not collect personal information such as names, addresses, or payment details. Files uploaded for conversion are processed securely and automatically deleted after completion.
          </p>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>
            We use your uploaded files only for the intended purpose of file conversion. We do not store, share, or sell any files or personal data.
          </p>
        </section>

        <section>
          <h2>4. Cookies and Analytics</h2>
          <p>
            We may use cookies to enhance user experience and Google Analytics to understand site performance. These tools collect anonymized data such as pages visited and session duration.
          </p>
        </section>

        <section>
          <h2>5. Third-Party Links</h2>
          <p>
            Our website may contain links to external sites. We are not responsible for the privacy practices of other websites.
          </p>
        </section>

        <section>
          <h2>6. Security</h2>
          <p>
            We take reasonable measures to secure your data and ensure that uploaded files are protected during processing.
          </p>
        </section>

        <section>
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
          </p>
        </section>

        <section>
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at support@quickconverter.pro.
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default PrivacyPolicy;
