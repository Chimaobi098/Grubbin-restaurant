import React, { useState, useRef, useEffect } from "react";
import styles from "../public/FeatureSection.module.css";
import { FaUtensils, FaMotorcycle, FaSmile } from "react-icons/fa";

const features = [
  {
    icon: <FaUtensils className={styles.icon} />,
    title: "Deliciously Crafted",
    text: "Every meal is made with love, passion, and the finest ingredients.",
  },
  {
    icon: <FaMotorcycle className={styles.icon} />,
    title: "Super Fast Delivery",
    text: "Hot & fresh meals delivered to your doorstep in record time!",
  },
  {
    icon: <FaSmile className={styles.icon} />,
    title: "Satisfaction Guaranteed",
    text: "We promise every bite will leave you craving for more.",
  },
];

const FeatureSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once it's visible (optional)
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.4, // Adjust how much of the section is in view before triggering
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.featureSection} ${isVisible ? styles.fadeIn : ""}`}
    >
      <h2 className={styles.heading}>
        Why <span className={styles.highlight}>Grubbin'?</span>
      </h2>
      <div className={styles.features}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <div className={styles.iconWrapper}>{feature.icon}</div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureText}>{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
