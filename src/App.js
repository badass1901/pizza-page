import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import { CartContext } from "./context/CartContext";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";

const App = () => {
  const [cart, setCart] = useState({});
  //fetch from local storage
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    setCart(JSON.parse(cart));
  }, []);

  //save to local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Router>
        <CartContext.Provider value={{ cart, setCart }}>
          <Navigation />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/products" element={<Products />} exact />
            <Route path="/cart" element={<Cart />} exact />
            <Route path="/products/:id" element={<SingleProduct />} />
          </Routes>
        </CartContext.Provider>
      </Router>
    </>
  );
};

export default App;
