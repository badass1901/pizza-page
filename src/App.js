import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import { CartContext } from "./context/CartContext";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import { getCart, storeCart } from "./helpers";

const App = () => {
  const [cart, setCart] = useState({});
  //fetch from local storage
  useEffect(() => {
    getCart().then((cart) => {
      setCart(JSON.parse(cart));
    });
  }, []);

  //save to local storage
  useEffect(() => {
    storeCart(cart);
  }, [cart]);

  return (
    <div className="parent">
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
    </div>
  );
};

export default App;
