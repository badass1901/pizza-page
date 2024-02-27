import { useEffect, useState } from "react";

import Pizza from "../components/Pizza";
import Spinner from "../components/Spinner";
// import { data } from "../data/data";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [spinner, setSpinner] = useState(false);
  // const pizzaData = data;
  useEffect(() => {
    setSpinner(true);
    fetch("/api/v1/food/get-foods/")
      .then((response) => response.json())
      .then((products) => {
        setSpinner(false);
        setProducts(products.data);
      });
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="text-center text-3xl my-8">In Our Kitchen</h1>
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
