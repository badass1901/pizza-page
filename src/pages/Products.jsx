import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

import Pizza from "../components/Pizza";
import Spinner from "../components/Spinner";

const Products = () => {
  // const { name } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    setSpinner(true);
    fetch("https://star-spark-pasta.glitch.me/api/products")
      .then((response) => response.json())
      .then((products) => {
        setSpinner(false);
        setProducts(products);
      });
  }, []);
  return (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="text-center text-lg font-bold my-8">Product</h1>
      <span>{spinner && <Spinner />}</span>
      <div className="grid grid-cols-1 my-8 gap-24 md:grid-cols-2 lg:grid-cols-4 justify-center items-center ">
        {products.map((product) => (
          <Pizza key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
