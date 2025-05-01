import ac from "../assets/air_conditioner.jpg"
import fridge from "../assets/refrigerator.jpg"
import microwave from "../assets/microwave.jpg"
import WM from "../assets/washing_machine.jpg"
import bedSheets from "../assets/bedsheets.jpg"
import curtains from "../assets/curtains.jpg"
import ironBoard from "../assets/IroningBoard_and_More.jpg"
import homeDecor from "../assets/home_decor.jpg"
import boatHP from "../assets/boat_headphones.jpg"
import boultHP from "../assets/boult_headphones.jpg"
import noiseHP from "../assets/noise_headphones.jpg"
import zebronicsHP from "../assets/zebronics_headphones.jpg"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import EssentialsCart from "./EssentialsCart"
import useEssentialsState from "./EssentialsState"
function Essentials() {
    const navigate = useNavigate()
    const homeAppliances = [
        { id: 1, src: ac, alt: "ac", title: "AirConditioners" },
        { id: 2, src: fridge, alt: "fridge", title: "Fridges" },
        { id: 3, src: microwave, alt: "microwave", title: "Microwaves" },
        { id: 4, src: WM, alt: "washing machine", title: "WashingMachines" }
    ];

    const homeDecorators = [
        { id: 1, src: bedSheets, alt: "bed sheet", title: "BedSheets" },
        { id: 2, src: curtains, alt: "curtains", title: "Curtains" },
        { id: 3, src: ironBoard, alt: "ironBoard", title: "IroningBoards" },
        { id: 4, src: homeDecor, alt: "homeDecor", title: "HomeDecors" }
    ]

    const headPhones = [
        { id: 1, src: boatHP, alt: "boatHP", title: "Headphones" },
        { id: 2, src: boultHP, alt: "boultHP", title: "Headphones" },
        { id: 3, src: noiseHP, alt: "noiseHP", title: "Headphones" },
        { id: 4, src: zebronicsHP, alt: "zebronicsHP", title: "Headphones" }
    ]

    const categories = [
        {
            id: 1,
            title: "Appliances for your home",
            items: homeAppliances
        },
        {
            id: 2,
            title: "Revamp your home in style",
            items: homeDecorators
        },
        {
            id: 3,
            title: "Starting ₹149 | Headphones",
            items: headPhones
        },
    ]


    const { selectedCategoryProducts, setSelectedCategoryProducts } = useEssentialsState()
    const handleItemClick = async (categoryTitle) => {
        try {
            const response = await axios.get("https://ecommercebackendapp-tvhk.onrender.com/products/getProductsByCategory", {
                params: { category: categoryTitle },
            })
    
            if (response.data.products.length > 0) {
                setSelectedCategoryProducts(response.data.products)
    
                // Wait for state update using a short timeout before navigating
                setTimeout(() => {
                    navigate("/essentialsCart", { state: response.data.products })
                }, 100)
            } else {
                console.warn("No products found for category:", categoryTitle)
            }
        } catch (error) {
            console.error("Error fetching products:", error.message)
        }
    };


    useEffect(() => {
        console.log("Updated selectedCategoryProducts:", selectedCategoryProducts)
    }, [selectedCategoryProducts])
    
    return (
        <div className="flex flex-wrap gap-7">
            {categories.map((category) => (
                <div key={category.id} className="bg-white m-7" style={{ width: "400px", height: "450px" }}>
                    <h2 className="text-xl font-bold text-center">{category.title}</h2>
                    <div className="flex flex-wrap">
                        {category.items.map((item) => (
                            <div key={item.id} className="flex flex-col items-center">
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-44 h-44 p-3 rounded-md cursor-pointer"
                                    onClick={() => handleItemClick(item.title)}
                                />
                                <p className="font-semibold">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Essentials
