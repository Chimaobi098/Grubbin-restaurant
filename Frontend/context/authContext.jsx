import { createContext, useEffect, useState } from "react";
import API from "../api";

export const AuthContext = createContext();

const cartLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

export const AuthProvider = ({ children }) => {
  const [cart, setCart] = useState(cartLocalStorage);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    const fetchUser = async () => {
      try {
        const response = await API.post("/auth/me", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error checking auth:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [cart]);

  const logout = async () => {
    try {
      const response = await API.get("auth/logout", { withCredentials: true });
      console.log(response.data.message);
      setUser(null);
    } catch (error) {
      console.log("Logout failed ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, setUser, setLoading, logout, cart, setCart }}
    >
      {children}
    </AuthContext.Provider>
  );
};
