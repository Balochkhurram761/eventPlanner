import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validationLogin } from "../../validations/loginSchema";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handlerForm = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const loginForm = async (e) => {
    e.preventDefault();
    try {
      await validationLogin.validate(form, { abortEarly: false });
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          token: response.data.token,
          role: response.data.user.role,
          id: response.data.user.id,
        })
      );

      toast.success("Login successful 🎉", { position: "top-right" });

      if (response.data.user.role === "admin") {
        navigate("/dashboard/admin");
      } else if (response.data.user.role === "vendor") {
        navigate("/dashboard/vendor");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-pink-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              Welcome Back
            </h1>
            <p className="text-gray-500 mt-2">
              Login to continue to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={loginForm} className="flex flex-col gap-6">
            {/* Email */}
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg bg-gray-50 px-3 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your email"
                name="email"
                value={form.email}
                onChange={handlerForm}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg bg-gray-50 px-3 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your password"
                name="password"
                value={form.password}
                onChange={handlerForm}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-lg shadow-md font-medium hover:bg-blue-700 transition-all"
            >
              Login
            </button>
          </form>

          {/* Links */}
          <div className="flex justify-between items-center mt-6 text-sm text-blue-600">
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
            <Link to="/register" className="hover:underline">
              New here? Register
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
