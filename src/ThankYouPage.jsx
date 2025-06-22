import { Link } from "react-router-dom";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-green-50 p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 Thank You for Your Purchase!</h1>
      <p className="text-lg text-gray-700 mb-6">Your order has been placed successfully.</p>
      <p className="text-xl text-green-800 font-semibold mb-8">🌿 Stay healthy till then!!!</p>
      <Link
        to="/shop"
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
      >
        🛒 Continue Shopping
      </Link>
    </div>
  );
}
