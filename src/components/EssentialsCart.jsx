import { useLocation } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import useEssentialsState from "./EssentialsState"
import { useState , useEffect } from "react"
import auth from "../config/firebase"
import { useCart } from "./CartContext"
import { onAuthStateChanged } from "firebase/auth"
function EssentialsCart() {
    const location = useLocation();
    const navigate = useNavigate()
  //  const items = location.state || []
  const items = Array.isArray(location.state) ? location.state : []
    console.log("Items:"+items)
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating); // Full stars
        const halfStar = rating % 1 === 0.5 ? "½" : "" // Half star if applicable
        return "★".repeat(fullStars) + halfStar
    }
    
    const { selectedCategoryProducts, setSelectedCategoryProducts } = useEssentialsState()
    const handleItemClick = async (categoryTitle) =>{
        try {
            const response = await axios.get(`https://ecommercebackendapp-tvhk.onrender.com/products/getProductById/${categoryTitle}`)
            console.log(response.data.product)
            if (response.data.product) {
                setSelectedCategoryProducts(response.data.product)
    
                // Wait for state update using a short timeout before navigating
                setTimeout(() => {
                    navigate("/productPage", { state: response.data.product })
                }, 100);
            } else {
                console.warn("No products found for category:", categoryTitle)
            }
        } catch (error) {
            console.error("Error fetching products:", error.message)
        }
    }

    const [user, setUser] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, (loggedInUser) => {
            setUser(loggedInUser);
        });
    }, []);

    const { cartCount, setCartCount, addToCart } = useCart()

    const handleAddToCart = (item) => {
        if (user) {
            setCartCount((prev) => prev + 1); // ✅ Increment count
            addToCart(item); // ✅ Only add the clicked item
            navigate("/cart")
        } else {
            navigate("/login")
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Selected Essentials</h2>
            <div className="grid grid-cols-4 gap-5 justify-items-center">
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-10 shadow-lg rounded-md flex flex-col w-[450px] h-[550px]"
                        >
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-56 h-56 object-cover rounded-md mt-0 cursor-pointer"
                                onClick={()=>handleItemClick(item._id)}
                            />
                            <h1 className="text-lg font-semibold">{item.name}</h1>
                            <h1 className="text-yellow-500">{renderStars(item.rating)}</h1>
                            <h2 className="text-md font-bold text-gray-600">₹{item.price}</h2>
                            <button className="bg-yellow-300 rounded-md w-32 font-bold" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <p className="text-red-500 text-center col-span-4">No items selected.</p>
                )}
            </div>
        </div>
    );
}

export default EssentialsCart;