import React from "react";
import { useUser } from "../../context/userContext";

const DashboardAdm = () => {
  const { users } = useUser();

  const totalProducts = 45;
  const acceptedUsers =
    users?.filter((u) => u.isApproved === true)?.length || 0;
  const pendingUsers =
    users?.filter((u) => u.isApproved === false)?.length || 0;
  const totalUsers = users?.length || 0;

  const stats = [
    { title: "Total Users", value: totalUsers, color: "bg-blue-600" },
    { title: "Accepted Users", value: acceptedUsers, color: "bg-green-800" },
    { title: "Pending Users", value: pendingUsers, color: "bg-yellow-400" },
    { title: "Total Products", value: totalProducts, color: "bg-green-600" },
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

export default DashboardAdm;
