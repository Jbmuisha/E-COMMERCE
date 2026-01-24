"use client";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { useTranslation } from "@/context/Translation"; 

export default function Contact() {
  const { t } = useTranslation();
  return (
    <main className="contact-page">
      <section className="contact-section">
        <div className="contact-container">

          {/* LEFT SIDE */}
          <div className="contact-info">
            <h1>{t("contact.title")}</h1>
            <p>
              {t("contact.description")}
            </p>

            <div className="info-block-grid">
              <div className="info-block">
                <h4>{t("contact.email")}</h4>
                <span>info@DPf243.io</span>
              </div>

              <div className="info-block">
                <h4>{t("contact.phone")}</h4>
                <span>321-221-2231</span>
              </div>
            </div>

            <div className="support-grid">
              <div>
                <h5>{t("contact.customerSupport.title")}</h5>
                <p>{t("contact.customerSupport.description")}</p>
              </div>
              <div>
                <h5>{t("contact.feedback.title")}</h5>
                <p>{t("contact.feedback.description")}</p>
              </div>
              <div>
                <h5>{t("contact.mediaInquiries.title")}</h5>
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
            <h3>{t("contact.form.title")}</h3>
            <p>{t("contact.form.subtitle")}</p>

            <form>
              <div className="form-row">
                <input type="text" placeholder={t("contact.form.firstNamePlaceholder")} />
                <input type="text" placeholder={t("contact.form.lastNamePlaceholder")} />
              </div>

              <input type="email" placeholder={t("contact.form.emailPlaceholder")} />
              <input type="tel" placeholder={t("contact.form.phonePlaceholder")} />
              <textarea placeholder={t("contact.form.helpPlaceholder")} rows={4}></textarea>

              <button type="submit">{t("contact.form.submitButton")}</button>

              <small>
                {t("contact.form.agreementText")}
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
