import React, { useState } from "react";
import styles from "../../public/signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api";

const Signup = () => {
  const navigate = useNavigate();
  const [person, setPerson] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    address: "",
    city: "",
    state: "",
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState({});

  function handleChange(e) {
    setPerson((person) => ({ ...person, [e.target.name]: e.target.value }));
  }

  const submitFormData = async (e) => {
    e.preventDefault();
    setValidationError({});

    try {
      const response = await API.post("/auth/signup", person, {
        withCredentials: true,
      });
      console.log("User created successfully", response.data);
      navigate("/login");
    } catch (err) {
      if (err.response?.data?.errors) {
        // ✅ If backend sends validation errors, store them
        setValidationError(err.response.data.errors);
      } else if (err.response?.data?.error) {
        // ✅ If it's a general error
        setValidationError({ general: err.response.data.error });
      } else {
        // ✅ Handle unexpected errors
        setValidationError({
          general: "Something went wrong. Please try again.",
        });
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.leftSection}></div>

      <div className={styles.rightSection}>
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>
          Join us and explore a wide variety of delicacies to soothe your taste
          buds!
        </p>

        {validationError?.general && (
          <span className="error-message">{validationError.general}</span>
        )}

        <form className={styles.form} onSubmit={submitFormData}>
          {/* First Name */}
          <div className={styles.formGroup}>
            <label htmlFor="firstname" className={styles.label}>
              First Name
            </label>
            <input
              name="firstname"
              type="text"
              className={styles.input}
              placeholder="Enter your first name"
              required
              minLength={2}
              value={person.firstname}
              onChange={handleChange}
            />
            {validationError?.firstname && (
              <p className="error-message">{validationError.firstname}</p>
            )}
          </div>

          {/* Last Name */}
          <div className={styles.formGroup}>
            <label htmlFor="lastname" className={styles.label}>
              Last Name
            </label>
            <input
              name="lastname"
              type="text"
              className={styles.input}
              placeholder="Enter your last name"
              required
              minLength={2}
              value={person.lastname}
              onChange={handleChange}
            />
            {validationError?.lastname && (
              <p className="error-message">{validationError.lastname}</p>
            )}
          </div>

          {/* Phone */}
          <div className={styles.formGroup}>
            <label htmlFor="phonenumber" className={styles.label}>
              Phone Number
            </label>
            <input
              name="phonenumber"
              type="tel"
              className={styles.input}
              placeholder="+2348066711681"
              required
              value={person.phonenumber}
              onChange={handleChange}
            />
            {validationError?.phonenumber && (
              <p className="error-message">{validationError.phonenumber}</p>
            )}
          </div>

          {/* Address */}
          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>
              Address
            </label>
            <input
              name="address"
              type="text"
              className={styles.input}
              placeholder="123 Main St"
              required
              value={person.address}
              onChange={handleChange}
            />
            {validationError?.address && (
              <p className="error-message">{validationError.address}</p>
            )}
          </div>

          {/* City */}
          <div className={styles.formGroup}>
            <label htmlFor="city" className={styles.label}>
              City
            </label>
            <input
              name="city"
              type="text"
              className={styles.input}
              placeholder="Enter your city"
              required
              value={person.city}
              onChange={handleChange}
            />
            {validationError?.city && (
              <p className="error-message">{validationError.city}</p>
            )}
          </div>

          {/* State */}
          <div className={styles.formGroup}>
            <label htmlFor="state" className={styles.label}>
              State
            </label>
            <input
              name="state"
              type="text"
              className={styles.input}
              placeholder="Enter your state"
              required
              value={person.state}
              onChange={handleChange}
            />
            {validationError?.state && (
              <p className="error-message">{validationError.state}</p>
            )}
          </div>

          {/* Email */}
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
              value={person.email}
              onChange={handleChange}
            />
            {validationError?.email && (
              <p className="error-message">{validationError.email}</p>
            )}
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              name="password"
              type="password"
              className={styles.input}
              placeholder="Create a password"
              required
              minLength={8}
              value={person.password}
              onChange={handleChange}
            />
            {validationError?.password && (
              <p className="error-message">{validationError.password}</p>
            )}
          </div>

          <button type="submit" className={styles.submitBtn}>
            Sign Up
          </button>
        </form>

        <p className={styles.footerText}>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
