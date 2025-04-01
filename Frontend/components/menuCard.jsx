import { useNavigate } from "react-router-dom";
import styles from "../public/menu.module.css";

const MenuCard = ({ id, name, description, price, image }) => {
  const navigate = useNavigate();

  const viewProduct = () => {
    navigate(`/menu/${id}`);
  };

  return (
    <div className={styles.menuCard} onClick={viewProduct}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.menuImage} />
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.itemName}>{name}</h2>
        <p className={styles.itemDescription}>{description}</p>
        <p className={styles.itemPrice}>{price}</p>
        <button className={styles.orderBtn}>Order Now</button>
      </div>
    </div>
  );
};

export default MenuCard;
