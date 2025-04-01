import React, { useContext, useState } from "react";
import styles from "../../public/login.module.css";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await API.post(
        "/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      // console.log(response);
      setUser(response.data.user);
      navigate("/");
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* Left side with heading and form */}
      <div className={styles.leftSection}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>
          Log in to continue enjoying your finger-lickin&apos; favorites.
        </p>
        {error && <p className="error-message">{error}</p>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              name="email"
              type="email"
              className={styles.input}
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              name="password"
              type="password"
              className={styles.input}
              placeholder="Enter your password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Log In
          </button>
        </form>

        <p className={styles.footerText}>
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>

      <div className={styles.rightSection}></div>
    </div>
  );
};

export default Login;
