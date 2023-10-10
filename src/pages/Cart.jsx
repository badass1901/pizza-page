import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import {data} from "../data";

const Cart = () => {
  let total = 0;
  const [productsC, setProductsC] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  const [priceFetchedC, setPriceFetchedC] = useState(false);

  // useEffect(() => {
  //   if (!cart.items) {
  //     return;
  //   }
  //   if (priceFetchedC) {
  //     return;
  //   }
  //   fetch("https://star-spark-pasta.glitch.me/api/products/cart-items", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ ids: Object.keys(cart.items) }),
  //   })
  //     .then((res) => res.json())
  //     .then((products) => {
  //       setProductsC(products);
  //       setPriceFetchedC(true);
  //     });
  // }, [cart, priceFetchedC]);

  useEffect(()=>{
      if (!cart.items) {
      return;
    }
    if (priceFetchedC) {
      return;
    }
      setProductsC(products);
        setPriceFetchedC(true);
  },[cart, priceFetchedC])

  const getQty = (productId) => {
    return cart.items[productId];
  };
  const increment = (productId) => {
    const oldQty = cart.items[productId];
    const _cart = { ...cart };
    _cart.items[productId] = oldQty + 1;
    _cart.totalItems += 1;
    setCart(_cart);
  };
  const decrement = (productId) => {
    const oldQty = cart.items[productId];
    if (oldQty === 1) {
      return;
    }
    const _cart = { ...cart };
    _cart.items[productId] = oldQty - 1;
    _cart.totalItems -= 1;
    setCart(_cart);
  };
  const deleteItem = (productId) => {
    const _cart = { ...cart };
    const qty = _cart.items[productId];
    delete _cart.items[productId];
    _cart.totalItems -= qty;
    setCart(_cart);
    setProductsC(productsC.filter((item) => item._id !== productId));
  };
  const getSum = (productId, price) => {
    const sum = price * getQty(productId);
    total += sum;
    return sum;
  };
  const handleOrder = () => {
    alert("Order placed successfully");
    setProductsC([]);
    setCart({});
  };

  return !productsC.length ? (
    <div className="flex flex-col justify-center items-center h-96">
      <h2 className="text-center text-3xl">Cart is EMPTY...</h2>
      <span>
        <img className="pizzaSpin" src="/images/pizza-2.png" alt="pizza" />
      </span>
      <em className="text-center text-xl">Add something to eat...</em>
    </div>
  ) : (
    <div className="container mx-auto lg:w-1/2 w-full font pb-24 px-4 ">
      <h1 className="my-12 font-bold">Cart items</h1>
      <ul>
        {productsC.map((item) => {
          return (
            <li className="mb-12" key={item._id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img className="h-16" src={item.image} alt="pizza" />
                  <span className="font-bold ml-4 w-48">{item.name}</span>
                </div>
                <div className="flex flex-col md:flex-row items-center">
                  <button
                    onClick={() => {
                      decrement(item._id);
                    }}
                    className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                  <b className="px-2">{getQty(item._id)}</b>
                  <button
                    onClick={() => {
                      increment(item._id);
                    }}
                    className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
                <span className="font-bold w-16 mx-4">
                  ₹{getSum(item._id, item.price)}
                </span>
                <button
                  onClick={() => {
                    deleteItem(item._id);
                  }}
                  className="bg-red-500 px-4 py-2 rounded-full leading-none text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <hr className="my-6" />
      <div className="text-right font-semibold">
        <span className="font-bold">Grand Total</span> ₹ {total}
      </div>
      <div className="text-right mt-6">
        <button
          onClick={handleOrder}
          className="bg-yellow-500 font-bold px-4 py-2 rounded-full leading-none"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
