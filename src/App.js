import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";
import Home from "./components/Home";
import EssentialsCart from "./components/EssentialsCart";
import Essentials from "./components/Essentials";
import ProductPage from "./components/ProductPage";
import { CartProvider } from "./components/CartContext";
import DisplayCart from "./components/DisplayCart";
function App() {
  return (
    <CartProvider> 
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/essentialsCart" element={<EssentialsCart />} />
          <Route path="/productPage" element={<ProductPage />} />
          <Route path="/cart" element={<DisplayCart />}/>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;