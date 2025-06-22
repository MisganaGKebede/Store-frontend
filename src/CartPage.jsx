import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const CartPage = () => {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const user = localStorage.getItem("username") || "guest";

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(`cart-${user}`)) || [];
    setCart(storedCart);
  }, [location.pathname]);

  const updateQuantity = (index, change) => {
    const updated = [...cart];
    updated[index].quantity += change;
    if (updated[index].quantity <= 0) updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem(`cart-${user}`, JSON.stringify(updated));
  };

  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem(`cart-${user}`, JSON.stringify(updated));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(`cart-${user}`);
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between mb-4">
        <Link
          to="/shop"
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          ← Back to Home
        </Link>
        <button
          onClick={clearCart}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Clear Cart
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-600">Qty: {item.quantity || 1}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    ➖
                  </button>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    ➕
                  </button>
                  <button
                    onClick={() => removeItem(index)}
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
              <p className="text-blue-600 font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="text-right mt-6 text-xl font-bold text-green-700">
            Total: ${getTotal()}
          </div>
          <Link
            to="/checkout"
            className="block mt-6 text-center bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            🧾 Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
