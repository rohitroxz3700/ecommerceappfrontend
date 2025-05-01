import { createContext, useState, useContext } from "react";

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartCount, setCartCount] = useState(0)
    const [cartItems, setCartItems] = useState([])
    const removeFromCart = (index) => {
        setCartItems((prevItems) => prevItems.filter((_, i) => i !== index))
    };

    const clearCart = () => {
        setCartItems([])
    };


    const addToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product])
        setCartCount((prev) => prev + 1)
    }

    return (
        <CartContext.Provider value={{ cartCount, setCartCount, cartItems, addToCart ,removeFromCart,clearCart  }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext)
}