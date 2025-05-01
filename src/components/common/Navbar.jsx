import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import auth from "../../config/firebase"
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useCart } from "../CartContext"
import axios from "axios"
function Navbar() {
    const navigate = useNavigate()
    const { cartItems } = useCart()
    const [log, setlog] = useState(false)
    const [searchInput, setSearchInput] = useState()
    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                setlog(true)
                console.log("User Logged In")
            }
            else {
                setlog(false)
                console.log("User logged out")
            }
        })
    }, [])

    function logout() {
        signOut(auth)
    }

    function GoHome() {
        navigate("/")
    }

    function GotoCart() {
        navigate("/cart")
    }

    const handleSearch = async () => {
        if (!searchInput.trim()) return;

        try {
            const response = await axios.get(`https://ecommercebackendapp-tvhk.onrender.com/products/searchProducts?name=${searchInput}`)
            const products = response.data.products
            console.log("Fetched Products:", products)

            if (products.length > 0) {
                navigate("/essentialsCart", { state: products })
            } else {
                alert("No matching products found.")
            }
        } catch (error) {
            console.error("Search error:", error)
        }
    };

    return (
        <div className='bg-black h-16 flex gap-10 items-center px-4'>
            <h1 className="text-2xl text-white py-3 font-bold cursor-pointer" onClick={GoHome}>RoCart18</h1>

            {/* Search Bar Wrapper */}
            <div className="relative flex items-center w-[60%]">
                <input
                    className="h-10 w-full rounded-md pl-4 pr-10"
                    placeholder="Search for your favourite items here"
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                />
                <span className="absolute right-3 text-gray-500 text-lg cursor-pointer" onClick={handleSearch}>🔍</span> {/* Search Icon */}
            </div>

            {/* Right Side Links & Cart */}
            <div className="flex gap-14">
                <Link className="text-white font-bold text-xl" to={"/about"}>About</Link>
                {
                    log ?
                        <button className='bg-red-900 rounded-md font-bold w-20 hidden md:block text-white' onClick={logout}>
                            Logout
                        </button> :
                        <button className='bg-red-400 rounded-md w-24 h-7 hidden md:block text-white font-bold' onClick={() => navigate("/login")}>
                            Login
                        </button>
                }
                <h1 className="text-xl text-white font-bold cursor-pointer" onClick={GotoCart}>Cart: {cartItems.length}</h1>
            </div>
        </div>
    )
}

export default Navbar