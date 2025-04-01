import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../public/OrderConfirmation.module.css";
import { AuthContext } from "../../context/authContext";

const OrderConfirmation = () => {
  const { cart, setCart } = useContext(AuthContext);
  const [orderItems, setOrderItems] = useState([]);
  const navigate = useNavigate();

  // Generate a random 6-digit order number (between 100000 and 999999)
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  // Calculate total price before clearing the cart
  const totalPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Estimated delivery: always 35 minutes from current time
  const now = new Date();
  now.setMinutes(now.getMinutes() + 35);
  const formattedDate = now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  useEffect(() => {
    // Save cart items for display
    setOrderItems(cart);
    // Clear the cart
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  }, []);

  return (
    <div className={styles.confirmationContainer}>
      <h2 className={styles.title}>Order Confirmed!</h2>
      <div className={styles.orderBox}>
        <p className={styles.orderNumber}>
          Order Number: <strong>{orderNumber}</strong>
        </p>
        <p className={styles.estimatedTime}>
          Estimated Delivery: <strong>{formattedDate}</strong>
        </p>
        <h3 className={styles.itemsTitle}>Items Ordered:</h3>
        <ul className={styles.itemsList}>
          {orderItems.map((item, index) => (
            <li key={index} className={styles.itemRow}>
              <span>{item.name}</span>
              <span>(x{item.quantity})</span>
            </li>
          ))}
        </ul>
        <p className={styles.totalPrice}>
          Total Price:{" "}
          <strong>
            ${(totalPrice > 100 ? totalPrice : totalPrice + 5).toFixed(2)}
          </strong>
        </p>
      </div>
      <button onClick={() => navigate("/")} className={styles.homeBtn}>
        Go Home
      </button>
    </div>
  );
};

export default OrderConfirmation;
