import React, { useContext, useState } from "react";
import styles from "../../public/checkout.module.css";
import { AuthContext } from "../../context/authContext";
import { PaystackButton, usePaystackPayment } from "react-paystack";
import API from "../../api";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { user, cart } = useContext(AuthContext);

  //FORM

  const [validationError, setValidationError] = useState({});

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

  function handleChange(e) {
    setPerson((person) => ({ ...person, [e.target.name]: e.target.value }));
  }

  //cart logic
  const totalItemsInCart = cart.reduce((accumulator, item) => {
    return (accumulator += item.quantity);
  }, 0);
  const totalAmount = cart.reduce((accumulator, item) => {
    return (accumulator += item.quantity * item.price);
  }, 0);

  //PAY STACK

  const paystackConfig = {
    email: user?.email || person.email,
    amount: Math.round(totalAmount * 1555 * 100), //amount * exchange rate * amount in kobo
    metadata: {
      name: user?.firstname || person.firstname,
      phone: user?.phonenumber || person.phonenumber,
    },
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  //   Payment callbacks
  const onSuccess = (ref) => {
    console.log("Payment Success", ref);
    navigate("/order-confirmation");
  };

  const onClose = () => {
    console.log("Payment Closed");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError({});

    try {
      const response = await API.post("/auth/signup", person, {
        withCredentials: true,
      });
      console.log("User created successfully", response.data);
      //   setAccountCreated(true);
      //   initializePayment();
      initializePayment({ onSuccess, onClose });
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

  //estimated date is always 45 minutes from current time
  const now = new Date();
  now.setMinutes(now.getMinutes() + 45);
  const formattedDate = now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // Example summary data
  const orderSummary = {
    subtotal: totalAmount,
    shipping: totalAmount > 100 ? 0 : 5,
    total: totalAmount + (totalAmount > 100 ? 0 : 5), // Dynamically calculate total
    items: cart,
  };

  const createOrder = async () => {
    try {
      const response = await API.post("/api/orders", {
        totalAmount: totalAmount,
        status: "COMPLETED",
        items: cart,
      });
      console.log(response.data);
    } catch (err) {
      console.error("Error encountered", err);
    }
  };

  return (
    //   {user ? }
    <div className={styles.checkoutContainer}>
      {!user && (
        <div className={styles.shippingSection}>
          <h2 className={styles.sectionHeading}>Checkout</h2>
          <p className={styles.accountNotice}>
            👤 Create an Account to Continue – Your details will be saved for
            future orders.
          </p>

          {validationError?.general && (
            <span className="error-message">{validationError.general}</span>
          )}
          <form onSubmit={handleSubmit} className={styles.shippingForm}>
            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="email">
                Email <span className={styles.required}>*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                value={person.email}
                onChange={handleChange}
                placeholder="e.g. john@example.com"
              />
              {validationError?.email && (
                <p className="error-message">{validationError.email}</p>
              )}
            </div>

            {/* Password */}
            <div className={styles.formGroup}>
              <label htmlFor="password">
                Password <span className={styles.required}>*</span>
              </label>
              <input
                name="password"
                type="password"
                required
                value={person.password}
                onChange={handleChange}
                placeholder="Enter a secure password"
              />
              {validationError?.password && (
                <p className="error-message">{validationError.password}</p>
              )}
            </div>

            {/* First Name */}
            <div className={styles.formGroup}>
              <label htmlFor="firstname">
                First Name <span className={styles.required}>*</span>
              </label>
              <input
                name="firstname"
                type="text"
                required
                value={person.firstname}
                onChange={handleChange}
                placeholder="e.g. John"
              />
              {validationError?.firstname && (
                <p className="error-message">{validationError.firstname}</p>
              )}
            </div>

            {/* Last Name */}
            <div className={styles.formGroup}>
              <label htmlFor="lastname">
                Last Name <span className={styles.required}>*</span>
              </label>
              <input
                name="lastname"
                type="text"
                required
                value={person.lastname}
                onChange={handleChange}
                placeholder="e.g. Doe"
              />
              {validationError?.lastname && (
                <p className="error-message">{validationError.lastname}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className={styles.formGroup}>
              <label htmlFor="phonenumber">
                Phone Number <span className={styles.required}>*</span>
              </label>
              <input
                name="phonenumber"
                type="tel"
                required
                value={person.phonenumber}
                onChange={handleChange}
                placeholder="e.g. (555) 123-4567"
              />
              {validationError?.phonenumber && (
                <p className="error-message">{validationError.phonenumber}</p>
              )}
            </div>

            {/* Address */}
            <div className={styles.formGroup}>
              <label htmlFor="address">
                Address <span className={styles.required}>*</span>
              </label>
              <input
                name="address"
                type="text"
                required
                value={person.address}
                onChange={handleChange}
                placeholder="e.g. 123 Flavor St."
              />
              {validationError?.address && (
                <p className="error-message">{validationError.address}</p>
              )}
            </div>

            {/* City */}
            <div className={styles.formGroup}>
              <label htmlFor="city">
                City <span className={styles.required}>*</span>
              </label>
              <input
                name="city"
                type="text"
                required
                value={person.city}
                onChange={handleChange}
                placeholder="e.g. Foodie City"
              />
              {validationError?.city && (
                <p className="error-message">{validationError.city}</p>
              )}
            </div>

            {/* State */}
            <div className={styles.formGroup}>
              <label htmlFor="state">
                State <span className={styles.required}>*</span>
              </label>
              <input
                name="state"
                type="text"
                required
                value={person.state}
                onChange={handleChange}
                placeholder="e.g. Gastronomy"
              />
              {validationError?.state && (
                <p className="error-message">{validationError.state}</p>
              )}
            </div>

            <button type="submit" className={styles.submitBtn}>
              Continue to Payment
            </button>
          </form>
        </div>
      )}

      {/* RIGHT COLUMN: Order Summary */}
      <div className={styles.summarySection}>
        <h2 className={styles.sectionHeading}>checkout - summary</h2>
        <span>*Free delivery on orders above $100</span>
        <div className={styles.summaryBox}>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>$ {orderSummary.subtotal.toFixed(2)}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Delivery</span>
            <span>$ {orderSummary.shipping.toFixed(2)}</span>
          </div>
          <hr className={styles.divider} />
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total</span>
            <span>$ {orderSummary.total.toFixed(2)}</span>
          </div>
        </div>

        <div className={styles.arrivesInfo}>
          Arrives by <strong>{formattedDate}</strong>
        </div>

        <div className={styles.itemsInCart}>
          <h3 className={styles.inCartTitle}>
            IN YOUR CART ({totalItemsInCart} ITEMS)
          </h3>
          {orderSummary.items.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <p className={styles.cartItemName}>
                {item.name} (x{item.quantity})
              </p>
              <p className={styles.cartItemPrice}>
                $ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <p className={styles.shippingNote}>
          We deliver every day, including weekends and public holidays.
        </p>
        {user && (
          <button
            className={styles.submitBtn}
            onClick={() => {
              createOrder(), initializePayment({ onSuccess, onClose });
            }}
          >
            Continue to Payment
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
