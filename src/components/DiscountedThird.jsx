import carKeychain70 from "../assets/carKeychain70.jpg"
import chair70 from "../assets/chair70.jpg"
import crystalLamp70 from "../assets/crystalLamp70.jpg"
import glucodeMeter70 from "../assets/glucodeMeter70.jpg"
import keychain70 from "../assets/keychain70.jpg"
import toyCycle70 from "../assets/toyCycle70.jpg"
import wallDecor70 from "../assets/wallDecor70.jpg"
import wedgePillows70 from "../assets/wedgePillows70.jpg"
import { useNavigate } from 'react-router-dom';
import React, { useRef } from "react"
import useEssentialsState from "./EssentialsState"
import axios from "axios"
function DiscountedThird()
{
    const scrollRef2 = useRef(null)
    const navigate = useNavigate()
    const discountedUtilitiesSecond = [
        { id: "680fc55606cfb2bb26867d93", src: carKeychain70, alt: "carKeychain70" },
        { id: "680fc55606cfb2bb26867d94", src: chair70, alt: "chair70" },
        { id: "680fc55606cfb2bb26867d95", src: crystalLamp70, alt: "crystalLamp70" },
        { id: "680fc55606cfb2bb26867d96", src: glucodeMeter70, alt: "glucodeMeter70" },
        { id: "680fc55606cfb2bb26867d97", src: keychain70, alt: "keychain70" },
        { id: "680fc55606cfb2bb26867d98", src: toyCycle70, alt: "toyCycle70" },
        { id: "680fc55606cfb2bb26867d99", src: wallDecor70, alt: "wallDecor70" },
        { id: "680fc55606cfb2bb26867d9a", src: wedgePillows70, alt: "wedgePillows70" }
    ]

    const handleScrollLeft2 = () => {
        scrollRef2.current.scrollBy({
            left: -300,
            behavior: "smooth"
        })
    }

    const handleScrollRight2 = () => {
        scrollRef2.current.scrollBy({
            left: 300,
            behavior: "smooth"
        })
    }

    const { selectedCategoryProducts,setSelectedCategoryProducts} = useEssentialsState()

    const handleItemClick = async (categoryTitle) =>{
        try {
            const response = await axios.get(`https://ecommercebackendapp-tvhk.onrender.com/products/getProductById/${categoryTitle}`)
            console.log(response.data.product)
            if (response.data.product) {
                setSelectedCategoryProducts(response.data.product)
    
                // Wait for state update using a short timeout before navigating
                setTimeout(() => {
                    navigate("/productPage", { state: response.data.product });
                }, 100);
            } else {
                console.warn("No products found for category:", categoryTitle);
            }
        } catch (error) {
            console.error("Error fetching products:", error.message);
        }
    }
    return(
        <div className="relative flex items-center overflow-hidden gap-10 bg-white mt-20 p-10 rounded-md">
        <h1 className="absolute top-0 text-2xl font-bold">Up to 70% Off | Exotic Products</h1>
            <button
                className="text-3xl absolute left-0  bg-gray-300 p-3 rounded-full hover:bg-gray-400"
                onClick={handleScrollLeft2}>
                ◀
            </button>

            <div ref={scrollRef2} className="flex gap-10 overflow-x-scroll items-center w-full">
                {discountedUtilitiesSecond.map((item) => (
                    <img
                        key={item.id}
                        src={item.src}
                        alt={item.alt}
                        className="w-50 h-50 rounded-lg shadow-md cursor-pointer"
                        onClick={()=>handleItemClick(item.id)}
                    />
                ))}
            </div>

            <button
                className="text-2xl absolute right-0 bg-gray-300 p-3 rounded-full hover:bg-gray-400"
                onClick={handleScrollRight2}>
                ▶
            </button>
        </div>
    )
}

export default DiscountedThird