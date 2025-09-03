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
const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
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
    </Routes>
  );
};

export default App;
