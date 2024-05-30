// context/CartContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]); // Tambahkan state untuk checkout

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.productId !== productId));
  };

  const removeAllFromCart = () => {
    setCart([]);
  };

  const setItemsForCheckout = (items) => {
    setCheckoutItems(items); // Fungsi untuk menyetel item checkout
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, removeAllFromCart, checkoutItems, setItemsForCheckout }}>
      {children}
    </CartContext.Provider>
  );
};
