import cooler30 from "../assets/cooler30.jpg"
import cuteLight30 from "../assets/cute_light30.jpg"
import fan30 from "../assets/fan30.jpg"
import lantern30 from "../assets/lantern30.jpg"
import nightingale30 from "../assets/nightingale30.jpg"
import nightLight30 from "../assets/nightLight30.jpg"
import waterPure30 from "../assets/water_purfier30.jpg"
import tablefan30 from "../assets/tablefan30.jpg"
import React, { useRef , useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import useEssentialsState from "./EssentialsState"

function DiscountedFirst() {
    const scrollRef1 = useRef(null)
    const navigate = useNavigate()
    const discountedUtilities = [
        { id: "680e5f6c2e8f34bb590fcf28", src: cooler30, alt: "cooler30" },
        { id: "680e5f6c2e8f34bb590fcf29", src: cuteLight30, alt: "cuteLight30" },
        { id: "680e5f6c2e8f34bb590fcf2a", src: fan30, alt: "fan30" },
        { id: "680e5f6c2e8f34bb590fcf2b", src: lantern30, alt: "lantern30" },
        { id: "680e5f6c2e8f34bb590fcf2c", src: nightingale30, alt: "nightingale30" },
        { id: "680e5f6c2e8f34bb590fcf2e", src: tablefan30, alt: "tablefan30" },
        { id: "680e5f6c2e8f34bb590fcf2f", src: waterPure30, alt: "waterPure30" },
        { id: "680e5f6c2e8f34bb590fcf2d", src: nightLight30, alt: "nightLight30" }
    ]

    const handleScrollLeft1 = () => {
        scrollRef1.current.scrollBy({
            left: -300,
            behavior: "smooth"
        })
    }

    const handleScrollRight1 = () => {
        scrollRef1.current.scrollBy({
            left: 300,
            behavior: "smooth"
        })
    }

    const { selectedCategoryProducts, setSelectedCategoryProducts } = useEssentialsState()
    const handleItemClick = async (categoryTitle) => {
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
    };

    // useEffect(() => {
    //         console.log("Updated selectedCategoryProducts:", selectedCategoryProducts);
    //     }, [selectedCategoryProducts]);

    return (
        <div className="relative flex items-center overflow-hidden gap-20 bg-white mt-20 pt-12 pb-4 pl-5 rounded-md">
                <h1 className="absolute top-0 text-2xl font-bold">Up to 30% Off | Power & Comfort Essentials for Your Home</h1>
                <button
                    className="text-2xl absolute left-0  bg-gray-300 p-3 rounded-full hover:bg-gray-400"
                    onClick={handleScrollLeft1}>
                    ◀
                </button>

                <div ref={scrollRef1} className="flex gap-10 overflow-x-scroll items-center w-full">
                    {discountedUtilities.map((item) => (
                        <img
                            key={item.id}
                            src={item.src}
                            alt={item.alt}
                            className="w-60 h-50 rounded-lg shadow-md cursor-pointer"
                            onClick={() => handleItemClick(item.id)}
                        />
                    ))}
                </div>

                <button
                    className="text-2xl absolute right-0 bg-gray-300 p-3 rounded-full hover:bg-gray-400"
                    onClick={handleScrollRight1}>
                    ▶
                </button>
            </div>
    )
}

export default DiscountedFirst