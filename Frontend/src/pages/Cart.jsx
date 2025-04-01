import React, { useContext, useEffect } from "react";
import styles from "../../public/cart.module.css";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { CiTrash } from "react-icons/ci";

const CartPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(AuthContext);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function checkout() {
    if (cart.length < 1) {
      return;
    }
    onClose();
    navigate("/checkout");
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>Your Cart</h2>
        <div className={styles.cartContent}>
          {cart.length ? (
            cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={styles.cartItemImage}
                />
                <div className={styles.cartItemDetails}>
                  <p className={styles.cartItemName}>{item.name}</p>
                  <p className={styles.cartItemQuantity}>
                    Qty: {item.quantity}
                  </p>
                  <p className={styles.cartItemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  className={styles.deleteBtn}
                  onClick={() => {
                    const updatedCart = cart.filter(
                      (product) => product.id !== item.id
                    );
                    setCart(updatedCart);
                  }}
                  title="Remove Item"
                >
                  <CiTrash color="black" />
                </button>
              </div>
            ))
          ) : (
            <p className={styles.emptyMessage}>Your cart is empty.</p>
          )}
        </div>
        <div className={styles.totalSection}>
          <p className={styles.totalText}>Total: ${totalAmount.toFixed(2)}</p>
          <button className={styles.checkoutBtn} onClick={checkout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
