import React, { useContext, useEffect, useState } from "react";
import styles from "../../public/orderHistory.module.css";
import API from "../../api";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const { setLoading } = useContext(AuthContext);

  useEffect(() => {
    // console.log("Order history useEffect: setLoading(true)");

    setLoading(true);
    API.get("/api/orders", { withCredentials: true })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        // console.log(
        //   "Order history useEffect: setLoading(false) -- after fetch"
        // );

        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.orderHistoryContainer}>
      <div
        style={{
          display: "flex",
          gap: "4px",
          justifyContent: "center",
        }}
      >
        <IoIosArrowBack
          fontSize={32}
          className={styles.backBtn}
          onClick={() => navigate(-1)}
        />
        <h2 className={styles.title}>Order History</h2>
      </div>

      {orders.length === 0 ? (
        <p className={styles.emptyText}>No orders found.</p>
      ) : (
        <div className={styles.orderList}>
          {orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <h3 className={styles.orderNumber}>Order #{order.id}</h3>
                <span className={styles.orderStatus}>
                  {order.status.toUpperCase()}
                </span>
              </div>
              <p className={styles.orderDate}>
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </p>
              <div className={styles.itemList}>
                {order.items.map((item) => (
                  <div key={item.id} className={styles.itemRow}>
                    <span className={styles.itemName}>
                      {item.name} ({item.quantity})
                    </span>
                    <span className={styles.itemPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className={styles.orderFooter}>
                <p className={styles.totalAmount}>
                  Total: <strong>${order.totalAmount}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
