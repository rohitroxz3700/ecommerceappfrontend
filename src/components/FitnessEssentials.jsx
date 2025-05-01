import handgrip from "../assets/handgrip.jpg"
import resistance from "../assets/resistance_bands.jpg"
import wheyShaker from "../assets/whey_shaker.jpg"
import wristWrap from "../assets/wrist_wrap.jpg"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import useEssentialsState from "./EssentialsState";
function FitnessEssentials() {
    const navigate = useNavigate()
    const fitnessEssentials = [
        { id: "680e68e006cfb2bb26867d7d", src: handgrip, alt: "handgrip" },
        { id: "680e6a2c06cfb2bb26867d7f", src: resistance, alt: "resistance" },
        { id: "680e6c7306cfb2bb26867d81", src: wheyShaker, alt: "wheyShaker" },
        { id: "6810e5b5c9a3487898b17eb6", src: wristWrap, alt: "wristWrap" }
    ]

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

    return (
        <div className="bg-white w-96 m-7">
            <h1 className="text-xl font-bold text-center">Best Sellers in Sports, Fitness & Outdoors</h1>
            <div className="flex flex-wrap">
                {fitnessEssentials.map((item) => (
                    <img
                        key={item.id}
                        src={item.src}
                        alt={item.alt}
                        className="w-44 h-44 p-3 rounded-md cursor-pointer"
                        onClick={()=>handleItemClick(item.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default FitnessEssentials