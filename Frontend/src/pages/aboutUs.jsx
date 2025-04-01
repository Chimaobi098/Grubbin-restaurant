import React from "react";
import styles from "../../public/aboutUs.module.css";

const AboutUs = () => {
  return (
    <div className={styles.aboutContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.subtitle}>
          Discover our story and passion for delicious cuisine.
        </p>
      </header>

      <section className={styles.contentSection}>
        <div className={styles.textSection}>
          <h2 className={styles.sectionTitle}>Our Journey</h2>
          <p className={styles.paragraph}>
            Founded on the belief that food is an art, our restaurant has grown
            from humble beginnings to a beloved local hotspot. Our chefs combine
            traditional techniques with modern twists, ensuring every dish is a
            masterpiece.
          </p>
          <p className={styles.paragraph}>
            We are committed to sourcing the finest ingredients, supporting
            local farmers, and creating unforgettable dining experiences. Every
            plate tells a story of dedication, creativity, and a passion for
            great food.
          </p>
        </div>
        <div className={styles.imageSection}>
          <img
            src="https://res.cloudinary.com/ditqlruxn/image/upload/f_auto/q_auto/w_1200/aboutUsImage_wr55ai?_a=BAMAJaFD0"
            alt="Our Restaurant"
            className={styles.aboutImage}
            style={{ border: "none" }}
          />
        </div>
      </section>

      <section className={styles.visionSection}>
        <h2 className={styles.sectionTitle}>Our Vision</h2>
        <p className={styles.paragraph}>
          We envision a world where every meal is a celebration, where food
          brings people together, and where every bite sparks joy. Our mission
          is to create a warm, welcoming space where innovation meets tradition.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
