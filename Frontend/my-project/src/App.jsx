import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Frontend/layout/Layout";
import Home from "./Frontend/pages/Home";
import Register from "./Frontend/components/register/Register";
import Login from "./Frontend/components/login/Login";
import DashboardAdmin from "./Dashboard/admin/pages/DashboardAmin";
import LayoutDashboard from "./Dashboard/admin/layout/Layout";
import AllUser from "./Dashboard/admin/pages/AllUser";
import ProtectedRoute from "./Frontend/components/protectedRoute/ProtectedRoute";
import DashboardVendor from "./Dashboard/vendor/pages/DashboardVendor";
import LayoutDashboardVd from "./Dashboard/vendor/layout/LayoutVendor";
import VendorProduct from "./Dashboard/vendor/pages/VendorProduct";
import ProductUI from "./Frontend/components/ProductUi/ProductUi";
import ProductUiDesc from "./Frontend/components/ProductUiDesc/ProductUiDesc";
import BookEvent1 from "./Frontend/components/bookEvent/BookEvent1";
const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:serviceType/:venue/:id" element={<ProductUiDesc />} />
        <Route path="/:serviceType/:id" element={<ProductUiDesc />} />
        <Route path="/:serviceType/:venue" element={<ProductUI />} />
        <Route path="/:serviceType" element={<ProductUI />} />
        <Route path="/bookevent" element={<BookEvent1 />} />

        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<LayoutDashboard />}>
          <Route path="/dashboard/admin" element={<DashboardAdmin />} />
          <Route path="/admin/users" element={<AllUser />} />
        </Route>
      </Route>
      {/* vendor protected routes */}

      <Route element={<ProtectedRoute allowedRoles={["vendor"]} />}>
        <Route element={<LayoutDashboardVd />}>
          <Route path="/dashboard/vendor" element={<DashboardVendor />} />
          <Route path="/vendor/products" element={<VendorProduct />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
