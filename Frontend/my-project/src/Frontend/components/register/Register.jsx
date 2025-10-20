// src/pages/auth/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { RegisterValidation } from "../../validations/registerSchema";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [role, setRole] = useState("vendor");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "vendor",
      noOfGuests: "",
      coupleContactNo: "",
      weddingDate: "",
      businessName: "",
      vendorContactNo: "",
      businessAddress: "",
    },
    validationSchema: RegisterValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const res = await axios.post(
          "http://localhost:5000/api/auth/registerform",
          values
        );
        if (res.data.success) {
          toast.success(res.data.message || "Registration successful 🎉");
          resetForm();
        } else {
          toast.error(res.data.message || "Something went wrong ❌");
        }
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.message || "Server error ❌");
        } else {
          toast.error("Error: " + err.message);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    formik.setFieldValue("role", newRole);
    if (newRole === "vendor") {
      formik.setFieldValue("noOfGuests", "");
      formik.setFieldValue("coupleContactNo", "");
      formik.setFieldValue("weddingDate", "");
    } else {
      formik.setFieldValue("vendorContactNo", "");
      formik.setFieldValue("businessAddress", "");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br  from-pink-50 to-blue-50">
        <div className="w-[90%] sm:w-[420px] bg-white shadow-lg rounded-2xl my-5 p-8">
          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="font-heading text-3xl font-bold text-gray-800">
              Create an Account ✨
            </h1>
            <p className="text-gray-500 font-body text-[15px] mt-2">
              Join as <span className="text-pink-600 font-medium">Vendor</span>{" "}
              or <span className="text-blue-600 font-medium">Couple</span>.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
            {/* Role Selector */}
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => handleRoleChange("vendor")}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  role === "vendor"
                    ? "bg-pink-600 text-white border-pink-600 shadow"
                    : "bg-gray-50 text-gray-600 border-gray-300"
                }`}
              >
                I'm a Vendor
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange("couple")}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  role === "couple"
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-gray-50 text-gray-600 border-gray-300"
                }`}
              >
                I'm a Couple
              </button>
            </div>

            {/* Name / Business Name */}

            <input
              type="text"
              name="name"
              placeholder="Full Name*"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="border border-gray-300 w-full outline-none rounded-lg bg-gray-50 py-3 px-4"
            />
            {formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
            {role === "vendor" && (
              <>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Business Name*"
                  value={formik.values.businessName}
                  onChange={formik.handleChange}
                  className="border border-gray-300 w-full outline-none rounded-lg bg-gray-50 py-3 px-4"
                />
                {formik.errors.businessName && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.businessName}
                  </p>
                )}
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address*"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="border border-gray-300 w-full outline-none rounded-lg bg-gray-50 py-3 px-4"
            />
            {formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password*"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="border border-gray-300 w-full outline-none rounded-lg bg-gray-50 py-3 px-4"
            />
            {formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}

            {/* Vendor Fields */}
            {role === "vendor" && (
              <>
                <input
                  type="text"
                  name="vendorContactNo"
                  placeholder="Vendor Contact Number*"
                  value={formik.values.vendorContactNo}
                  onChange={formik.handleChange}
                  className="border border-gray-300 w-full outline-none rounded-lg bg-gray-50 py-3 px-4"
                />
                {formik.errors.vendorContactNo && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.vendorContactNo}
                  </p>
                )}

                <input
                  type="text"
                  name="businessAddress"
                  placeholder="Business Address*"
                  value={formik.values.businessAddress}
                  onChange={formik.handleChange}
                  className="border border-gray-300 w-full outline-none rounded-lg bg-gray-50 py-3 px-4"
                />
                {formik.errors.businessAddress && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.businessAddress}
                  </p>
                )}
              </>
            )}

            {/* Couple Fields */}
            {role === "couple" && (
              <>
                <input
                  type="number"
                  name="noOfGuests"
                  placeholder="Number of Guests*"
                  value={formik.values.noOfGuests}
                  onChange={formik.handleChange}
                  className="border border-gray-300 w-full outline-none rounded-lg bg-gray-50 py-3 px-4"
                />
                {formik.errors.noOfGuests && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.noOfGuests}
                  </p>
                )}

                <input
                  type="text"
                  name="coupleContactNo"
                  placeholder="Contact Number*"
                  value={formik.values.coupleContactNo}
                  onChange={formik.handleChange}
                  className="border border-gray-300 w-full outline-none rounded-lg bg-gray-50 py-3 px-4"
                />
                {formik.errors.coupleContactNo && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.coupleContactNo}
                  </p>
                )}

                <input
                  type="date"
                  name="weddingDate"
                  value={formik.values.weddingDate}
                  onChange={formik.handleChange}
                  className="border border-gray-300 w-full outline-none rounded-lg bg-gray-50 py-3 px-4"
                />
                {formik.errors.weddingDate && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.weddingDate}
                  </p>
                )}
              </>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium py-3 rounded-lg shadow hover:from-pink-600 hover:to-pink-700 transition-all cursor-pointer "
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            {/* Link */}
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
