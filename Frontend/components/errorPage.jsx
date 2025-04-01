import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../public/errorPage.module.css";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorMessage}>Page Not Found</h2>
        <p className={styles.errorDescription}>
          Oops! We couldn't find the dish you're looking for.
        </p>
        <button className={styles.homeBtn} onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
