import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


export default function App() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { username, logout } = useAuth();

  useEffect(() => {
    // ✅ Mark that user has entered the site
    localStorage.setItem("enteredSite", "true");

    fetch("https://store-backend-36zr.onrender.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("❌ Failed to fetch products", err));
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("enteredSite"); // Optional: remove entry flag
    navigate("/"); // Takes back to landing
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">🍓 Organic Market</h1>
          {username ? (
            <span className="text-gray-600">Hi, {username}</span>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Login
            </Link>
          )}
        </div>

        <div className="flex gap-3 items-center">
          <Link
            to="/cart"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            🛒 View Cart
          </Link>
          {username && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Products</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="bg-white p-4 shadow rounded hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <p className="text-blue-600 font-semibold">${product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
