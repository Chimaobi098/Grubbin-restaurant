import React, { useState } from "react";
import styles from "../../public/contactUs.module.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to your backend)
    // Reset form (optional)
    setFormData({ fullname: "", email: "", subject: "", message: "" });
  };

  return (
    <div className={styles.contactContainer}>
      <header className={styles.heroSection}>
        <h1 className={styles.title}>Get in Touch</h1>
        <p className={styles.subtitle}>We’d love to hear from you!</p>
      </header>

      <div className={styles.content}>
        <div className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>Contact Information</h2>
          <p className={styles.infoText}>
            <strong>Address:</strong> 123 Foodie Lane, Flavor Town, FT 45678
          </p>
          <p className={styles.infoText}>
            <strong>Phone:</strong> (555) 123-4567
          </p>
          <p className={styles.infoText}>
            <strong>Email:</strong> info@yourrestaurant.com
          </p>
          <p className={styles.infoText}>
            <strong>Hours:</strong> Mon - Sun: 11 AM - 10 PM
          </p>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Send Us a Message</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="fullname" className={styles.label}>
                Full Name
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                className={styles.input}
                placeholder="Your Name"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={styles.input}
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.label}>
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                className={styles.input}
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className={styles.textarea}
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
