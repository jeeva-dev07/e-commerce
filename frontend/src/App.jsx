import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminProducts from "./pages/admin/AdminProducts";
import ProductForm from "./pages/admin/ProductForm";
import AdminOrders from "./pages/admin/AdminOrders";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route path="/" element={<Home />} />

        <Route
          path="/products/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= USER PROTECTED ================= */}

        <Route element={<ProtectedRoute />}>
          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />
        </Route>

        {/* ================= ADMIN PROTECTED ================= */}

        <Route element={<AdminRoute />}>

          <Route
            path="/admin/products"
            element={<AdminProducts />}
          />

          <Route
            path="/admin/products/add"
            element={<ProductForm />}
          />

          <Route
            path="/admin/products/edit/:id"
            element={<ProductForm />}
          />

          <Route
            path="/admin/orders"
            element={<AdminOrders />}
          />

        </Route>

      </Routes>
    </>
  );
}

export default App;
