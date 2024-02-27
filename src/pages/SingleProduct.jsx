import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Products from "./Products";
import { CartContext } from "../context/CartContext";

const SingleProduct = () => {
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
    fetch(
      `https://profileserver.shashwatsagar.me:443/api/v1/food/get-foods/${params.id}`
    )
      .then((response) => response.json())
      .then((product) => {
        setSpinner(false);
        setProduct(product.data);
      });
  }, [params.id]);

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
      <div
        id={product.id}
        className=" flex flex-col md:flex-row justify-evenly w-full items-center mb-16"
      >
        <img src={product.foodImage} alt="pizza" />
        <div className="mt-10 md:mt-0 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

          <div className="text-md">{product.description}</div>
          <div className="text-sm bg-gray-100 rounded-sm my-3 px-3 py-1">
            {product.size ? product.size.toUpperCase() : product.size}
          </div>
          <div className="font-bold text-2xl mt-2">Rs: {product.price}</div>
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
