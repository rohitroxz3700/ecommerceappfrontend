import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../config/firebase";
import { useCart } from "./CartContext";

function ProductPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const items = location.state || {}; // Ensure it's an object
    console.log(items);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating); // Full stars
        const halfStar = rating % 1 === 0.5 ? "½" : ""; // Half star if applicable
        return "★".repeat(fullStars) + halfStar;
    };

    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (loggedInUser) => {
            setUser(loggedInUser);
        });
    }, []);

    const { cartCount, setCartCount, addToCart } = useCart(); // Avoid duplicate calls

    const handleAddToCart = () => {
        if (user) {
            setCartCount((prev) => prev + 1); // Functional update for safety
            addToCart(items);
            navigate("/cart")
        } else {
            navigate("/login");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Selected Essentials</h2>
            <div className="p-20 bg-white flex gap-12">
                <img src={items.image} alt="" className="w-[300px] h-[500px]" />
                <div className="flex-col">
                    <h1 className="text-3xl font-bold">{items.name}</h1>
                    <h1 className="text-yellow-500 text-2xl">{renderStars(items.rating)}</h1>
                    <h1 className="text-2xl font-semibold mt-4">₹{items.price}</h1>
                    <h2 className="text-xl font-serif font-medium mt-10">{items.description}</h2>
                    <button 
                        className="bg-yellow-300 rounded-lg mt-7 w-60 h-16 font-bold text-2xl" 
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;