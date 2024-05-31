// context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    // Load cart from cookies on mount
    const savedCart = Cookies.get('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to cookies whenever it changes
    Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
  }, [cart]);

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
    setCheckoutItems(items);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, removeAllFromCart, checkoutItems, setItemsForCheckout }}>
      {children}
    </CartContext.Provider>
  );
};
