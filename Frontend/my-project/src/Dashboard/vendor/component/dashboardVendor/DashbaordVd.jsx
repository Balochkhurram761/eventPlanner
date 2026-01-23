import React from "react";
import { useProduct } from "../context/ProductContext";
import {
  FaBox,
  FaClipboardList,
  FaHourglassHalf,
  FaCheckCircle,
  FaHotel,
  FaUtensils,
  FaMusic,
  FaCamera,
  FaPalette,
  FaCar,
  FaArrowUp,
} from "react-icons/fa";
import Graph from "../../../admin/components/analysitGrap/Graph";
const DashboardVd = () => {
  const { products, loading } = useProduct();

  const orderStats = [
    {
      title: "Total Orders",
      value: 300,
      growth: "+12%",
      icon: <FaClipboardList />,
      color: "from-indigo-600 to-violet-600",
    },
    {
      title: "Pending Orders",
      value: 75,
      growth: "5 Active",
      icon: <FaHourglassHalf />,
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "Accepted Orders",
      value: 225,
      growth: "90% Rate",
      icon: <FaCheckCircle />,
      color: "from-emerald-500 to-teal-600",
    },
  ];

  const serviceCategories = [
    {
      type: "hall",
      title: "Halls",
      icon: <FaHotel />,
      color: "from-rose-500 to-red-600",
    },
    {
      type: "catering",
      title: "Catering",
      icon: <FaUtensils />,
      color: "from-green-500 to-emerald-600",
    },
    {
      type: "dj",
      title: "DJ / Music",
      icon: <FaMusic />,
      color: "from-slate-700 to-black",
    },
    {
      type: "photographers",
      title: "Photography",
      icon: <FaCamera />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      type: "decorators",
      title: "Decorators",
      icon: <FaPalette />,
      color: "from-violet-500 to-purple-600",
    },
    {
      type: "carRental",
      title: "Car Rentals",
      icon: <FaCar />,
      color: "from-fuchsia-500 to-pink-600",
    },
  ];

  return (
    <div className="  bg-[#F8FAFC] pl-10 lg:pl-80  pr-10 pt-27 py-10 min-h-screen font-sans selection:bg-indigo-100">
      {/* --- HEADER SECTION --- */}
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
            Vendor <span className="text-indigo-600">Dashboard</span>
          </h1>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Real-time analytics for your business growth.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600 font-bold text-sm">
            Jan 2026
          </div>
          <button className="bg-slate-900 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            Download Report
          </button>
        </div>
      </div>

      {/* --- STATS CARDS */}
      <div className="grid grid-cols-1  md:grid-cols-3 -z-0 gap-8 mb-12">
        {orderStats.map((stat, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden bg-gradient-to-br ${stat.color} rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 transition-all duration-500 hover:scale-[1.02] hover:rotate-1`}
          >
            {/* Background Decorative Shapes */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
            <div className="absolute top-0 right-0 p-8">
              <div className="bg-white/20 backdrop-blur-xl p-4 rounded-3xl text-3xl group-hover:rotate-12 transition-transform">
                {stat.icon}
              </div>
            </div>

            <div className="relative z-5">
              <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                {stat.growth}
              </span>
              <p className="text-white/70 text-sm font-bold mt-6 uppercase tracking-wider">
                {stat.title}
              </p>
              <h2 className="text-6xl font-black mt-2 tracking-tighter italic">
                {loading ? "..." : stat.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        <div className="lg:col-span-3 bg-white rounded-[3rem] p-8 shadow-xl shadow-slate-100 border border-slate-50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">
              Sales Performance
            </h3>
            <select className="bg-slate-50 border-none rounded-xl text-xs font-bold p-2 outline-none cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <Graph
            usersCount={300}
            productsCount={products.length}
            pendingCount={75}
          />
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-8 text-white flex flex-col justify-between overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[80px]"></div>
          <div>
            <h3 className="text-xl font-bold mb-2">Live Status</h3>
            <p className="text-slate-400 text-sm">
              System is operational and secure.
            </p>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5"
              >
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></div>
                <div className="text-xs">
                  <p className="font-bold">New Booking #{2400 + i}</p>
                  <p className="text-slate-500">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- SERVICE BREAKDOWN (MODERN TILES) --- */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8 px-4">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-sm">
              <FaBox />
            </div>
            Inventory Distribution
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {serviceCategories.map((cat, index) => {
            const count = products.filter(
              (p) => p.serviceType === cat.type
            ).length;
            return (
              <div
                key={index}
                className="group bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-slate-200 group-hover:scale-110 group-hover:-rotate-6 transition-all`}
                >
                  {cat.icon}
                </div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  {cat.title}
                </h4>
                <p className="text-3xl font-black text-slate-800">{count}</p>
                <div className="mt-4 w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-2/3"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- CTA BANNER --- */}
      <div className="mt-20 relative overflow-hidden bg-indigo-600 rounded-[3.5rem] p-12 text-white shadow-2xl shadow-indigo-300">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h2 className="text-4xl font-black mb-4">
              Scale Your Business Faster.
            </h2>
            <p className="text-indigo-100 text-lg max-w-xl font-medium">
              Add premium descriptions and high-quality images to your services
              to increase booking chances by 40%.
            </p>
          </div>
          <button className="group bg-white text-indigo-600 px-10 py-5 rounded-3xl font-black text-lg hover:bg-slate-100 transition-all shadow-2xl flex items-center gap-3">
            Create New Service
            <FaArrowUp className="rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardVd;
