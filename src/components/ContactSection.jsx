import { motion } from "framer-motion";
import { useState } from "react";
import { profile } from "../data/portfolio";

export function ContactSection({ isActive }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="contact-section">
      <motion.div
        className="contact-card"
        initial={{ opacity: 0, y: 26 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <p className="eyebrow">contact channel</p>
        <h2>Let’s Build Something Precise</h2>

        <p className="section-text">
          This portfolio does not collect private data. Communication is handled through direct links,
          so visitors can choose email or GitHub without being trapped inside a decorative form.
        </p>

        <div className="contact-actions">
          <a className="primary-btn" href={`mailto:${profile.email}`}>
            Email Me
          </a>

          <a className="secondary-btn" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>

          <button className="secondary-btn" onClick={copyEmail}>
            {copied ? "Copied" : "Copy Email"}
          </button>
        </div>

        <div className="trust-box">
          <div>
            <span>DATA</span>
            <strong>No form storage</strong>
          </div>
          <div>
            <span>CONTACT</span>
            <strong>Direct communication</strong>
          </div>
          <div>
            <span>VALUE</span>
            <strong>Project clarity</strong>
          </div>
        </div>
      </motion.div>
    </div>
  );
}