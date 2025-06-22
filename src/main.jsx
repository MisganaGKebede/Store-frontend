import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx"; // ✅ used as the shop page
import ProductDetail from "./ProductDetail.jsx";
import CartPage from "./CartPage.jsx";
import CheckoutPage from "./CheckoutPage.jsx";
import ThankYouPage from "./ThankYouPage.jsx";
import Loginpage from "./Loginpage.jsx";
import SignupPage from "./SignupPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import { AuthProvider } from "./AuthContext";
import LandingPage from "./LandingPage.jsx"; // ✅ newly added

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* ✅ Landing route */}
          <Route path="/shop" element={<App />} />      {/* ✅ Shop/products route */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
