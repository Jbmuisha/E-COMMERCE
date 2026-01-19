"use client";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Contact() {
  return (
    <main className="contact-page">
      <section className="contact-section">
        <div className="contact-container">

          {/* LEFT SIDE */}
          <div className="contact-info">
            <h1>Contact Us</h1>
            <p>
              Welcome to our world of exquisite fragrances. Contact us to explore our
              exclusive perfume collection, place orders online, or receive personalized
              recommendations to find the perfect scent. Our team is always ready to assist
              you with any questions about our products, shipping, or gift options.
            </p>

            <div className="info-block-grid">
              <div className="info-block">
                <h4>Email</h4>
                <span>info@DPf243.io</span>
              </div>

              <div className="info-block">
                <h4>Phone</h4>
                <span>321-221-2231</span>
              </div>
            </div>

            <div className="support-grid">
              <div>
                <h5>Customer Support</h5>
                <p>Our perfume experts are available 24/7 to help you choose your perfect fragrance or assist with your order.</p>
              </div>
              <div>
                <h5>Feedback</h5>
                <p>We value your feedback to improve our fragrance collection and your shopping experience.</p>
              </div>
              <div>
                <h5>Media Inquiries</h5>
                <div className="media-icons">
                  <a href="#" title="Facebook" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF />
                  </a>
                  <a href="#" title="Twitter" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                  <a href="#" title="Instagram" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                  <a href="#" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn />
                  </a>
                  <a href="#" title="YouTube" target="_blank" rel="noopener noreferrer">
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="contact-form-card">
            <h3>Get in Touch</h3>
            <p>You can reach us anytime</p>

            <form>
              <div className="form-row">
                <input type="text" placeholder="First name" />
                <input type="text" placeholder="Last name" />
              </div>

              <input type="email" placeholder="Your email" />
              <input type="tel" placeholder="Phone number" />
              <textarea placeholder="How can we help?" rows={4}></textarea>

              <button type="submit">Submit</button>

              <small>
                By contacting us, you agree to our Terms of Service and Privacy Policy
              </small>
            </form>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section">
  <div className="faq-container">
    <h2>Frequently Asked Questions</h2>

    <div className="faq-grid">
      {[
        {
          question: "What is the shipping time for your perfumes?",
          answer: "Standard shipping usually takes 3–5 business days. Express shipping is available for 1–2 business days."
        },
        {
          question: "Can I return or exchange a perfume?",
          answer: "Yes, you can return or exchange unopened perfumes within 14 days of delivery. For opened perfumes, please contact customer support."
        },
        {
          question: "Do you provide fragrance recommendations?",
          answer: "Absolutely! Contact our experts via email or the form, and they’ll help you find the perfect scent based on your preferences."
        },
        {
          question: "Are your perfumes authentic?",
          answer: "Yes, all perfumes are 100% authentic and sourced directly from the official brands."
        }
      ].map((faq, index) => (
        <details key={index} className="faq-item">
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  </div>
</section>

    </main>
  );
}
