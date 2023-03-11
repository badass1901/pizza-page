import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const [spinner, setSpinner] = useState(false);
  const params = useParams();
  const history = useNavigate();
  useEffect(() => {
    setSpinner(true);
    fetch(`https://star-spark-pasta.glitch.me/api/products/${params.id}`)
      .then((response) => response.json())
      .then((product) => {
        setSpinner(false);
        setProduct(product);
      });
  }, [params.id]);

  return (
    <div className="container mx-auto mt-12 px-4">
      <button
        onClick={() => {
          history(-1);
        }}
        className="mb-12 font-bold"
      >
        Back
      </button>

      <span className="text-center">{spinner && <Spinner />}</span>
      <div className="flex">
        <img src={product.image} alt="pizza" />
        <div className="ml-12">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="text-md">{product.size}</div>
          <div className="font-bold mt-2">Rs: {product.price}</div>
          <button className="bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
