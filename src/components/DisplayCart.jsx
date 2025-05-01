import { useCart } from "./CartContext";

function DisplayCart() {
    const { cartItems, removeFromCart, clearCart } = useCart()
    const calculateSum = () => {
        return cartItems.reduce((total, item) => total + item.price, 0)
    };

    const onPurchase = () => {
        if (cartItems.length > 0) {
            alert("Product purchased!")
            clearCart()
        } else {
            alert("Cart is empty. Add items before buying!")
        }
    };


    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
            ) : (
                <div className="p-10 bg-white">
                    {cartItems.map((item, index) => (
                        <div key={index} className="flex gap-8 border-b p-4 items-center">
                            <img src={item.image} alt="" className="w-[100px] h-[150px]" />
                            <div>
                                <h1 className="text-xl font-bold">{item.name}</h1>
                                <h2 className="text-lg font-semibold">₹{item.price}</h2>
                            </div>
                            <button
                                onClick={() => removeFromCart(index)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            >
                                ❌ Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex gap-7 ">
                <h1 className="font-semibold">Total Bill: ₹{calculateSum()}</h1>
                <button className="items-center text-center bg-yellow-600 rounded-md w-28 " onClick={onPurchase}>Buy Now</button>
            </div>

        </div>
    );
}

export default DisplayCart;