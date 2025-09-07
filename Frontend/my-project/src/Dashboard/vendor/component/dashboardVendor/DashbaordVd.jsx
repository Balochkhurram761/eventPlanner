import React from "react";
import { useProduct } from "../context/ProductContext";
// Agar tumhare paas order aur product ka context hai to wahan se data le lo
// yahan example ke liye maine dummy numbers rakhe hain

const DashboardVd = () => {
  const { products } = useProduct();

  const totalProducts = 120;
  const totalOrders = 300;
  const pendingOrders = 75;
  const acceptedOrders = 200;

  // Users stats

  const stats = [
    { title: "Total Products", value: products.length, color: "bg-green-600" },
    { title: "Total Orders", value: totalOrders, color: "bg-indigo-600" },
    { title: "Pending Orders", value: pendingOrders, color: "bg-orange-500" },
    { title: "Accepted Orders", value: acceptedOrders, color: "bg-teal-600" },
    {
      title: "Total Halls",
      value: products.filter((p) => p.serviceType === "hall").length,
      color: "bg-red-500",
    },
    {
      title: "Total catering",
      value: products.filter((p) => p.serviceType === "catering").length,
      color: "bg-green-300",
    },
    {
      title: "Total Dj",
      value: products.filter((p) => p.serviceType === "dj").length,
      color: "bg-gray-500",
    },
    {
      title: "Total Photographers",
      value: products.filter((p) => p.serviceType === "photographers").length,
      color: "bg-yellow-500",
    },
    {
      title: "Total Decorators",
      value: products.filter((p) => p.serviceType === "decorators").length,
      color: "bg-yellow-300",
    },
    {
      title: "Total CarRental",
      value: products.filter((p) => p.serviceType === "carRental").length,
      color: "bg-pink-600",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`${stat.color} text-white h-[200px] rounded-lg shadow-lg p-6 flex flex-col justify-center items-center`}
          >
            <h2 className="text-xl font-semibold">{stat.title}</h2>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardVd;
