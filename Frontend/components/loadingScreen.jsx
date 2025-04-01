import React from "react";
import styles from "../public/loadingScreen.module.css";

const LoadingScreen = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default LoadingScreen;
