import React, { useEffect, useState } from "react";
import styles from "../../public/menu.module.css";
import MenuCard from "../../components/menuCard";
import API from "../../api";

const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    API.get("/api/menu", { withCredentials: true })
      .then((response) => {
        setMenu(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.menuContainer}>
      <header className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Our Menu</h1>
        <p className={styles.heroSubtitle}>
          Savor the flavors of our exquisite dishes
        </p>
      </header>
      <div className={styles.menuGrid}>
        {menu.map((item) => (
          <MenuCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
