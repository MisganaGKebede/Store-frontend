import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  // ✅ Redirect to /shop if user already entered site
  useEffect(() => {
    if (localStorage.getItem("enteredSite") === "true") {
      navigate("/shop");
    }
  }, []);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold mb-6 text-green-800">🍓 Welcome to Organic Market</h1>
      <p className="text-xl text-gray-700 mb-6 max-w-xl">
        Discover fresh, organic produce delivered straight to your door. Healthy eating starts here!
      </p>

      <div className="flex gap-4 mb-6">
        <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
          Login
        </Link>
        <Link to="/signup" className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700">
          Create Account
        </Link>
      </div>

      <Link to="/shop" className="text-green-700 underline font-medium hover:text-green-900">
        👉 Shop Now
      </Link>
    </div>
  );
}
