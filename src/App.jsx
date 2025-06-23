import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Home() {
  const [products, setProducts] = useState([]); // ✅ define state
  const user = localStorage.getItem("username") || "guest";

  useEffect(() => {
    fetch("https://store-backend-36zr.onrender.com/products") // ✅ make sure this matches your backend URL
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data); // ✅ set products safely
        } else {
          toast.error("Invalid data received from backend");
          console.error("Data is not an array:", data);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Failed to load products");
      });
  }, []);

  const addToCart = (product) => {
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Organic Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded shadow p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/300x300?text=Image+Not+Found")
              }
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-green-600 font-bold mb-2">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
