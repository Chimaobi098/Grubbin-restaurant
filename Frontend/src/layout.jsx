import {
  NavLink,
  Outlet,
  Link,
  useNavigate,
  ScrollRestoration,
} from "react-router-dom";
import styles from "../public/layout.module.css";
import { BsBag } from "react-icons/bs";
import { FaRegUser, FaGithub } from "react-icons/fa";
import { IoMenuOutline } from "react-icons/io5";

import { useContext, useState } from "react";
import CartPopup from "./pages/Cart";
import LoadingScreen from "../components/loadingScreen";
import { AuthContext } from "../context/authContext";

const Layout = () => {
  const { loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isCartOpen, setCartOpen] = useState(false);
  const { cart, user } = useContext(AuthContext);
  const totalItemsInCart =
    cart.length > 0
      ? cart.reduce((accumulator, item) => {
          return (accumulator += item.quantity);
        }, 0)
      : 0;

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  //mobile menu
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  }

  return (
    <>
      <ScrollRestoration />
      <div className={styles.mainBodyContainer}>
        {loading && <LoadingScreen />}

        <header className={styles.header}>
          <div className={styles.companyDetails}>
            <img
              src="https://res.cloudinary.com/ditqlruxn/image/upload/f_auto/q_auto/Logomark_ygmp6c?_a=BAMAJaFD0"
              alt="Logo"
            />
            Grubbin
          </div>
          <div>
            <ul className={styles.navLinks}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? `${styles.links} ${styles.active}` : styles.links
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    isActive ? `${styles.links} ${styles.active}` : styles.links
                  }
                >
                  Menu
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? `${styles.links} ${styles.active}` : styles.links
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? `${styles.links} ${styles.active}` : styles.links
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <div className={styles.navButtons}>
            {user ? (
              <div className={styles.profileBtn}>
                <FaRegUser
                  style={{ cursor: "pointer", marginLeft: "150px" }}
                  fontSize={28}
                  onClick={() => {
                    navigate("/profile");
                  }}
                />
              </div>
            ) : (
              <div className={styles.authBtns}>
                <Link className="secondary-btn" to="/login">
                  Log in
                </Link>
                <Link className="primary-btn" to="/signup">
                  Sign up
                </Link>
              </div>
            )}

            <div style={{}}>
              <div className={styles.cartContainer}>
                <button className={styles.cartBtn} onClick={openCart}>
                  <BsBag fontSize={32} color="black" />
                </button>
                <span className={styles.cartBadge}>{totalItemsInCart}</span>
              </div>
              <IoMenuOutline
                fontSize={32}
                className={styles.hamburgerMenu}
                onClick={() => setMenuOpen(!menuOpen)}
              />
            </div>
          </div>
        </header>
        <main style={{ minHeight: "100vh", marginTop: "4rem" }}>
          {isCartOpen && (
            <CartPopup
              isOpen={isCartOpen}
              onClose={closeCart}
              // cartItems={cart}
            />
          )}

          <Outlet />
          {menuOpen && (
            <div className={styles.mobileOverlay} onClick={handleOverlayClick}>
              <nav className={styles.mobileMenu}>
                <ul>
                  <li onClick={closeMenu}>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? `${styles.mobileActive}` : styles.mobileLink
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li onClick={closeMenu}>
                    <NavLink
                      to="/menu"
                      className={({ isActive }) =>
                        isActive ? `${styles.mobileActive}` : styles.mobileLink
                      }
                    >
                      Menu
                    </NavLink>
                  </li>
                  <li onClick={closeMenu}>
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        isActive ? `${styles.mobileActive}` : styles.mobileLink
                      }
                    >
                      About
                    </NavLink>
                  </li>
                  <li onClick={closeMenu}>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        isActive ? `${styles.mobileActive}` : styles.mobileLink
                      }
                    >
                      Contact
                    </NavLink>
                  </li>
                  {user ? (
                    <li onClick={closeMenu}>
                      <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                          isActive
                            ? `${styles.mobileActive}`
                            : styles.mobileLink
                        }
                      >
                        Profile
                      </NavLink>
                    </li>
                  ) : (
                    <>
                      <li onClick={closeMenu}>
                        <NavLink
                          to="/login"
                          className={({ isActive }) =>
                            isActive
                              ? `${styles.mobileActive}`
                              : styles.mobileLink
                          }
                        >
                          Log in
                        </NavLink>
                      </li>
                      <li onClick={closeMenu}>
                        <NavLink
                          to="/signup"
                          className={({ isActive }) =>
                            isActive
                              ? `${styles.mobileActive}`
                              : styles.mobileLink
                          }
                        >
                          Sign up
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          )}
        </main>
      </div>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          {" "}
          Developed by{" "}
          <Link
            style={{ color: "var(--primary-red)" }}
            to="https://github.com/Chimaobi098"
          >
            @Chimaobi098 <FaGithub />
          </Link>
        </p>
      </footer>
    </>
  );
};

export default Layout;
