import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("username") || "guest";
  const cartKey = `cart-${user}`;

  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCart(stored);
  }, []);

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      toast.error("Please fill out all fields.");
      return;
    }

    const summary = {
      customer: form,
      items: cart,
      total: getTotal(),
      timestamp: new Date().toISOString()
    };

    localStorage.setItem(`order-summary-${user}`, JSON.stringify(summary));
    toast.success("Order placed!");
    localStorage.removeItem(cartKey);
    navigate("/thank-you"); // ✅ Correct path
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">🛒 Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <div className="text-lg font-bold text-green-700">
          Total: ${getTotal()}
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
