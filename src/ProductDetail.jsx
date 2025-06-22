import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const user = localStorage.getItem("username") || "guest";

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === parseInt(id));
        setProduct(found);
      })
      .catch((err) => {
        console.error("Failed to load product", err);
        toast.error("Failed to load product");
      });
  }, [id]);

  const addToCart = () => {
    const cartKey = `cart-${user}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const existingItem = existingCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(existingCart));
    toast.success(`${product.name} added to cart!`);
  };

  if (!product) {
    return (
      <div className="text-center mt-10 text-gray-500">Loading product...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between mb-4">
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ← Back to Home
        </Link>
        <Link
          to="/cart"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          🛒 View Cart
        </Link>
      </div>

      <div className="bg-white shadow-md rounded p-6 text-center">
        <img
          src={product.image}
          alt={product.name}
          className="mx-auto w-64 h-64 object-cover rounded mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-blue-600 font-bold text-xl mb-4">${product.price}</p>

        <button
          onClick={addToCart}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
