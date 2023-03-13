import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Navigation = () => {
  const { cart } = useContext(CartContext);
  const cartStyle = {
    background: "#f59e0d",
    display: "flex",
    borderRadius: "50px",
    padding: "6px 12px",
  };
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/">
          <img style={{ height: 45 }} src="/images/logo.png" alt="logo" />
        </Link>
        <ul className="flex items-center font-bold">
          <li className="ml-6">
            <Link to="/">Home</Link>
          </li>
          <li className="ml-6">
            <Link to="/products">Products</Link>
          </li>
          <li className="ml-6">
            <Link to="/cart">
              <div style={cartStyle}>
                <span className="font-bold">
                  {cart.totalItems ? cart.totalItems : 0}
                </span>
                <img className="ml-2 " src="/images/cart.png" alt="cart" />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
