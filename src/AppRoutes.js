import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute allowedRoles={[0]} />}>
          <Route path="/user/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={[1]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={[1]} />}>
          <Route path="/create/category" element={<AddCategory />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={[1]} />}>
          <Route path="/create/product" element={<AddProduct />} />
        </Route>

        <Route path="/product/:productId" exact Component={Product} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
