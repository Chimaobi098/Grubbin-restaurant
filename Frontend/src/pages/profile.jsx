import React, { useContext, useEffect, useState } from "react";
import styles from "../../public/profile.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import API from "../../api";
import OrderHistory from "./orderHistory";

const Profile = () => {
  const navigate = useNavigate();
  const [person, setPerson] = useState("");
  const [orders, setOrders] = useState([]);
  const { logout, setLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, ordersRes] = await Promise.all([
          API.get("/api/profile", { withCredentials: true }),
          API.get("/api/orders", { withCredentials: true }),
        ]);
        setPerson(profileRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formattedDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Placeholder data
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Flavor Street, Tasteville",
    city: "Foodie City",
    state: "Gastronomy",
    favoriteDish: "Margherita Pizza",
    ordersCount: 12,
    joinedDate: "January 2023",
  };

  //FAVOURITE DISH LOGIC
  const productTotals = orders.reduce((acc, order) => {
    order.items.forEach((item) => {
      // If this productId hasn't been seen before, initialize it with 0
      if (!acc[item.name]) {
        acc[item.name] = 0;
      }
      acc[item.name] += item.quantity;
    });
    return acc;
  }, {});

  const favoriteProduct = Object.entries(productTotals).reduce(
    (max, [name, quantity]) =>
      quantity > max.quantity ? { name, quantity } : max,
    { name: null, quantity: 0 }
  );

  //TOTAL MONEY SPENT LOGIC
  const userTotalSpent = orders.reduce((acc, order) => {
    return (acc += parseInt(order.totalAmount));
  }, 0);

  //Average Order Value
  const averageOrderValue =
    orders.length > 0 ? userTotalSpent / orders.length : 0;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.profileContainer}>
      {/* Header / Hero */}
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>My Profile</h1>
        <p className={styles.headerSubtitle}>
          Welcome back, {person.firstname}! Ready for your next delicious meal?
        </p>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </header>
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Column: Profile Card */}
        <div className={styles.profileCard}>
          <h2 className={styles.userName}>
            {person.firstname} {person.lastname}
          </h2>
          <p className={styles.userEmail}>{person.email}</p>

          <div className={styles.profileDetails}>
            <p>
              <strong>Phone:</strong> {person.phone}
            </p>
            <p>
              <strong>Address:</strong> {person.address}, {person.city},{" "}
              {person.state}
            </p>
            <p>
              <strong>Joined:</strong> {formattedDate}
            </p>
          </div>
        </div>

        {/* Right Column: Additional Info / Stats */}
        <div className={styles.extraInfo}>
          <div className={styles.statsCard}>
            <h3 className={styles.statsTitle}>Profile Stats</h3>
            <div className={styles.statsRow}>
              <p className={styles.statsLabel}>Total Orders:</p>
              <p className={styles.statsValue}>{orders.length}</p>
            </div>
            <div className={styles.statsRow}>
              <p className={styles.statsLabel}>Favorite Dish:</p>
              <p className={styles.statsValue}>{favoriteProduct.name}</p>
            </div>
            <div className={styles.statsRow}>
              <p className={styles.statsLabel}>Total spent:</p>
              <p className={styles.statsValue}>${userTotalSpent}</p>
            </div>
            <div className={styles.statsRow}>
              <p className={styles.statsLabel}>Average Per Order:</p>
              <p className={styles.statsValue}>
                ${averageOrderValue.toFixed(2)}
              </p>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <Link to="order-history" className={styles.orderHistoryBtn}>
              View Order History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
