import React, { useState, useEffect } from "react";
import { useUser } from "../../context/userContext";
import { FaUsers, FaUserCheck, FaUserClock, FaBoxOpen } from "react-icons/fa";
import { RiLoader4Fill } from "react-icons/ri"; // Loader icon
import axios from "axios";
import Graph from "../analysitGrap/Graph";

const DashboardAdm = () => {
  const { stats: userStats, loading: usersLoading } = useUser();
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const getproductdata = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const userData = JSON.parse(storedUser);
    const token = userData?.token;
    try {
      const { data } = await axios.get(`http://localhost:5000/api/auth/getdata`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(data.data || data || []);
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    getproductdata();
  }, []);

  const overallLoading = usersLoading || productsLoading;

  // --- Loader Component ---
  if (overallLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 pl-10 lg:pl-70">
        <div className="relative">
          <div className="w-20 h-20 border-4  border-pink-500/20 border-t-pink-500 rounded-full animate-spin"></div>
          <RiLoader4Fill className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500  text-3xl" />
        </div>
        <p className="mt-4 text-gray-500 font-bold animate-pulse tracking-widest uppercase text-xs">
          Synchronizing Database...
        </p>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: userStats.total,
      icon: <FaUsers />,
      color: "from-blue-600 to-blue-400",
      shadow: "shadow-blue-200",
    },
    {
      title: "Accepted Users",
      value: userStats.accepted,
      icon: <FaUserCheck />,
      color: "from-green-700 to-emerald-500",
      shadow: "shadow-green-200",
    },
    {
      title: "Pending Users",
      value: userStats.pending,
      icon: <FaUserClock />,
      color: "from-orange-500 to-yellow-400",
      shadow: "shadow-orange-200",
    },
    {
      title: "Total Products",
      value: products?.length || 0,
      icon: <FaBoxOpen />,
      color: "from-purple-600 to-pink-500",
      shadow: "shadow-purple-200",
    },
  ];

  return (
    <div className="pl-10 lg:pl-70 pr-6 pt-15 pb-10 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Admin Insights
        </h1>
        <p className="text-gray-500 mt-1">
          Monitor your platform's growth and user activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`relative group overflow-hidden bg-gradient-to-br ${stat.color} ${stat.shadow} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white text-2xl">
                  {stat.icon}
                </div>
                <div className="text-white/60 text-xs font-bold uppercase tracking-tighter">
                  Live Sync
                </div>
              </div>

              <h2 className="text-white/90 text-sm font-medium uppercase tracking-wider">
                {stat.title}
              </h2>

              <div className="mt-auto">
                <p className="text-white text-4xl font-black mt-1">
                  {stat.value.toLocaleString()}
                </p>
                <div className="w-full bg-black/10 h-1.5 mt-4 rounded-full overflow-hidden">
                  <div className="bg-white h-full rounded-full w-[100%] transition-all duration-1000"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Activity Bar */}
      <div className="mt-12 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800">System Activity</h3>
          <p className="text-sm text-gray-400 font-medium italic">
            All systems are operational
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></div>
          <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">
            Live Tracking
          </span>
        </div>
      </div>

      {/* Graph Section */}
      <Graph
        usersCount={userStats.total}
        productsCount={products?.length || 0}
        pendingCount={userStats.pending}
      />

      {/* Audit Log Bar */}
      <div className="mt-8 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h4 className="font-bold text-gray-800">Operational Integrity</h4>
            <p className="text-xs text-gray-400 font-medium">
              Database sync active. All API endpoints responding (200 OK).
            </p>
          </div>
        </div>
        <button className="px-6 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition-colors">
          View Audit Logs
        </button>
      </div>
    </div>
  );
};

export default DashboardAdm;