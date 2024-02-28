import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useContext, useState } from "react";

const Pizza = (props) => {
  const [isAdding, setIsAdding] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const { product } = props;
  const addTocart = (e, product) => {
    e.preventDefault();
    let _cart = { ...cart };
    if (!_cart.items) {
      _cart.items = {};
    }
    if (_cart.items[product._id]) {
      _cart.items[product._id] += 1;
    } else {
      _cart.items[product._id] = 1;
    }

    if (!_cart.totalItems) {
      _cart.totalItems = 0;
    }
    _cart.totalItems += 1;
    setCart(_cart);
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };
  return (
    <Link to={`/products/${product._id}`}>
      <div className="p-10 bg-gray-50 w-80  md:w-58 md:p-6 lg:w-60 lg:p-4 ">
        <img src={product.foodImage} alt="pizza" />
        <div className="text-center">
          <h2 className="text-lg font-bold py-2">{product.name}</h2>
          <span className="bg-gray-300 py-1 rounded-full text-sm px-4">
            {product.size}
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold">₹ {product.price}</span>
          <button
            onClick={(e) => {
              addTocart(e, product);
              document.getElementById(product._id).scrollIntoView({
                behavior: "smooth",
              });
            }}
            disabled={isAdding}
            className={`${
              isAdding ? "bg-orange-500" : "bg-yellow-500"
            } py-1 px-4 rounded-full font-bold`}
          >
            ADD{isAdding && "ED!"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Pizza;
