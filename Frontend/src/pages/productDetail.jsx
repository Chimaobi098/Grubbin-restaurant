import React, { useContext, useEffect, useState } from "react";
import styles from "../../public/productDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api";
import { AuthContext } from "../../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import { IoIosArrowBack } from "react-icons/io";

const ProductDetail = () => {
  const notify = () => toast("Added succesfully"); //toast

  const { setLoading } = useContext(AuthContext);

  const navigate = useNavigate();
  const [item, setItem] = useState({});
  const { menuid } = useParams();
  const { cart, setCart } = useContext(AuthContext);

  // Counter state for the quantity of items.
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    console.log("Product detail useEffect: setLoading(true)");

    setLoading(true);

    API.get(`/api/menu/${menuid}`)
      .then((response) => {
        setItem(response.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log("Profile useEffect: setLoading(false) -- after fetch");
        setLoading(false);
      });
  }, [menuid]);

  const increment = () => setQuantity((prev) => (prev < 9 ? prev + 1 : prev));
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const reviews = [
    {
      id: 1,
      user: "John Doe",
      comment: "Amazing flavor, totally worth it!",
      rating: 5,
    },
    {
      id: 2,
      user: "Jane Smith",
      comment: "Delicious, but I would love a bit more spice.",
      rating: 4,
    },
  ];

  function addToCart() {
    const newProduct = {
      ...item,
      quantity: quantity,
    };

    const productIndex = cart.findIndex((product) => product.id === item.id);

    if (productIndex !== -1) {
      const updatedCart = [...cart];

      updatedCart[productIndex] = {
        ...updatedCart[productIndex],
        quantity: updatedCart[productIndex].quantity + quantity,
      };

      setCart(updatedCart);
    } else {
      setCart((cart) => [...cart, newProduct]);
    }
  }

  return (
    <div className={styles.productDetailContainer}>
      {/* Product Image Section */}
      <IoIosArrowBack
        fontSize={32}
        className={styles.backBtn}
        onClick={() => navigate(-1)}
      />
      <div className={styles.imageSection}>
        <img src={item.imageUrl} alt={name} className={styles.productImage} />
      </div>
      {/* Product Information Section */}
      <div className={styles.infoSection}>
        <h1 className={styles.productName}>{item.name}</h1>
        <p className={styles.productPrice}>${item.price}</p>
        <p className={styles.productDescription}>{item.description}</p>
        {/* Counter Section */}
        <div className={styles.counterSection}>
          <button className={styles.counterBtn} onClick={decrement}>
            -
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button className={styles.counterBtn} onClick={increment}>
            +
          </button>
        </div>
        <div className={styles.productDetailBtn}>
          <button
            className={styles.addToCartBtn}
            onClick={() => {
              addToCart();
              notify();
            }}
          >
            Add to Cart
          </button>
          <ToastContainer autoClose={2500} />
        </div>

        {/* Reviews Section */}
        <div className={styles.reviewsSection}>
          <h2 className={styles.sectionTitle}>Reviews</h2>
          {reviews.length ? (
            reviews.map((review) => (
              <div key={review.id} className={styles.reviewItem}>
                <p className={styles.reviewUser}>{review.user}</p>
                <p className={styles.reviewComment}>"{review.comment}"</p>
                <p className={styles.reviewRating}>
                  Rating: {review.rating} / 5
                </p>
              </div>
            ))
          ) : (
            <p className={styles.noReviews}>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
