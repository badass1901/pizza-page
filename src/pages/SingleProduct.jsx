import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Products from "./Products";
import { CartContext } from "../context/CartContext";
import { data } from "../data/data";

const SingleProduct = () => {
  const pizzaData = data;
  const [product, setProduct] = useState({});
  const [spinner, setSpinner] = useState(false);
  const params = useParams();
  const history = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const { cart, setCart } = useContext(CartContext);
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

  useEffect(() => {
        setSpinner(true);
        
        setProduct(pizzaData[params.id]);
    setSpinner(false);
  }, [params.id, pizzaData]);
  

  return (
    <div className="container mx-auto mt-12 px-4 flex flex-col items-center">
      <button
        onClick={() => {
          history(-1);
        }}
        className="mb-12 font-bold bg-gray-200 py-2 px-4 rounded-full"
      >
        <i className="fa fa-arrow-left"></i> Back
      </button>

      <span className="text-center">{spinner && <Spinner />}</span>
      <div className="flex flex-col md:flex-row justify-evenly w-full items-center mb-16">
        <img src={product.image} alt="pizza" />
        <div className="mt-10 md:mt-0 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <div className="text-md">{product.size}</div>
          <div className="font-bold text-xl mt-2">Rs: {product.price}</div>
          <button
            onClick={(e) => {
              addTocart(e, product);
            }}
            disabled={isAdding}
            className={`${
              isAdding ? "  bg-orange-500" : "bg-yellow-500"
            } mt-10 py-3 text-xl px-12 rounded-full font-bold`}
          >
            Add to cart
          </button>
        </div>
      </div>

      <hr className=" my-16 text-center w-full" />

      <Products />
    </div>
  );
};

export default SingleProduct;
