// TermsOfService.jsx
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "./templates/Navbar.jsx";
import Footer from "./templates/footer.jsx";
import "./TermsOfService.css";


function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Quick Converter</title>
        <meta name="description" content="Read Quick Converter's Terms of Service to understand your rights and responsibilities while using our free PDF tools." />
        <link rel="canonical" href="https://quickconverter.pro/terms-of-service" />
      </Helmet>

      <Navbar />

      <div className="terms-container">
        <h1>Terms of Service</h1>
        <p>Effective Date: {new Date().getFullYear()}</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By using Quick Converter, you agree to be bound by these Terms of Service. If you do not agree, you may not use our services.
          </p>
        </section>

        <section>
          <h2>2. Services Provided</h2>
          <p>
            Quick Converter provides free online tools for PDF conversion, merging, splitting, compressing, and summarizing. We reserve the right to modify or discontinue services at any time.
          </p>
        </section>

        <section>
          <h2>3. User Responsibilities</h2>
          <p>
            You agree to use Quick Converter legally and ethically. You must not upload malicious files or violate any laws through the use of our services.
          </p>
        </section>

        <section>
          <h2>4. File Handling</h2>
          <p>
            Uploaded files are processed securely and automatically deleted after conversion. We do not store your files or share them with third parties.
          </p>
        </section>

        <section>
          <h2>5. Intellectual Property</h2>
          <p>
            All trademarks, logos, and service marks displayed on Quick Converter are the property of their respective owners. You may not use them without prior written permission.
          </p>
        </section>

        <section>
          <h2>6. Limitation of Liability</h2>
          <p>
            Quick Converter is provided "as is" without warranties of any kind. We are not liable for any damages arising from the use or inability to use our services.
          </p>
        </section>

        <section>
          <h2>7. Changes to Terms</h2>
          <p>
            We may revise these Terms of Service at any time. Continued use of Quick Converter means you accept any updates or changes.
          </p>
        </section>

        <section>
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@quickconverter.pro.
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default TermsOfService;
