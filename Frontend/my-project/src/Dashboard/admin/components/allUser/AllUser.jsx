import React, { useEffect } from "react";
import axios from "axios";
import { useSearch } from "../../context/SearchContext";
import { useUser } from "../../context/userContext";

const User = () => {
  const { users, setUsers } = useUser();
  const { searchQuery } = useSearch();
  useEffect(() => {
    const fetchUsers = async () => {
      const user = JSON.parse(localStorage.getItem(`user`));
      const token = user?.token;

      try {
        const res = await axios.get(
          `http://localhost:5000/api/auth/dashbaoard/admin/getdata?search=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [searchQuery]);
  const updatedstatus = async ({ userId, isApproved }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    try {
      await axios.put(
        `http://localhost:5000/api/auth/updateStatus/${userId}`,
        { isApproved }, // sending updated status
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === userId ? { ...u, isApproved } : u))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.role}</td>
                <td className="py-3 px-6">
                  <select
                    value={user.isApproved ? "accepted" : "pending"}
                    onChange={(e) =>
                      updatedstatus({
                        userId: user._id,
                        isApproved: e.target.value === "accepted",
                      })
                    }
                    className={`px-4 py-2 rounded-lg focus:outline-none ${
                      user.isApproved
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    <option value="accepted">Accepted</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
