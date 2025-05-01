import toothpic1 from "../assets/toothpic_dispenser1.jpg"
import toothpic2 from "../assets/toothpic_dispenser2.jpg"
import toothpic3 from "../assets/toothpic_dispenser3.jpg"
import veggieChopper1 from "../assets/veggies_chopper.jpg"
import veggieChopper2 from "../assets/veggies_chopper2.jpg"
import veggieChopper3 from "../assets/veggies_chopper3.jpg"
import axios from "axios"
import useEssentialsState from "./EssentialsState"
import { useNavigate } from "react-router-dom"

function DiscountedSecond() {
    const navigate = useNavigate()
    const toothpicHolders = [
        { id: "680e71f306cfb2bb26867d85", src: toothpic1, alt: "toothpic1" },
        { id: "680e728406cfb2bb26867d87", src: toothpic2, alt: "toothpic2" },
        { id: "680e730006cfb2bb26867d89", src: toothpic3, alt: "toothpic3" }
    ]

    const veggieChoppers = [
        { id: "680e73d406cfb2bb26867d8b", src: veggieChopper1, alt: "veggieChopper1" },
        { id: "680e743a06cfb2bb26867d8d", src: veggieChopper2, alt: "veggieChopper2" },
        { id: "680faea706cfb2bb26867d91", src: veggieChopper3, alt: "veggieChopper3" }
    ]

    const categoriesSecond = [
        {
            id: 1,
            title: "Up to 60% off|Trending products",
            items: toothpicHolders
        },
        {
            id: 2,
            title: "Veggies",
            items: veggieChoppers
        }
    ]

    const { selectedCategoryProducts, setSelectedCategoryProducts } = useEssentialsState();
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
        <div className="flex flex-wrap gap-7">
            {categoriesSecond.map((category, index) => (
                <div className="bg-white w-96 m-7" style={{ height: "400px" }}>
                    <h2 className="text-xl font-bold text-center">{category.title}</h2>
                    <div className="flex gap-4 flex-wrap">
                        {category.items.map((item) => (
                            <>
                                <img key={item.id} src={item.src} alt={item.alt} className="w-44 h-44 p-3 cursor-pointer"  
                                onClick={() => handleItemClick(item.id)}/>
                            </>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DiscountedSecond