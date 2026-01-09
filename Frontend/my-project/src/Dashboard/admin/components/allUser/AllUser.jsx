import React, { useEffect } from "react";
import axios from "axios";
import { useSearch } from "../../context/SearchContext";
import { useUser } from "../../context/userContext";
import { FaCheck, FaClock, FaExternalLinkAlt, FaFileAlt } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";

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
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [searchQuery, setUsers]);

  const updatedstatus = async ({ userId, isApproved }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    try {
      await axios.put(
        `http://localhost:5000/api/auth/updateStatus/${userId}`,
        { isApproved },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === userId ? { ...u, isApproved } : u))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-800">
            User Management
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({users.length} Total)
            </span>
          </h1>
        </div>

        {/* --- DESKTOP TABLE (Hidden on Mobile) --- */}
        <div className="hidden md:block bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">User Details</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Links Verify</th>
                <th className="px-6 py-4 text-left">Email Verifiy</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-blue-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        user.role === "vendor"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-y-1">
                    {user.reelPageLink ? (
                      <a
                        href={user.reelPageLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center text-pink-600 text-xs hover:underline"
                      >
                        <FaExternalLinkAlt className="mr-1" size={10} /> Reel
                        Page
                      </a>
                    ) : (
                      <span className="text-[10px] text-gray-400 border border-gray-200 px-3 py-1 rounded-full italic">
                        No Reel
                      </span>
                    )}
                    {user.registrationLetter ? (
                      <a
                        href={`http://localhost:5000/${user.registrationLetter}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center text-blue-600 text-xs hover:underline"
                      >
                        <FaFileAlt className="mr-1" size={10} /> Document
                      </a>
                    ) : (
                      <span className="text-[10px] text-red-400 border border-red-100 bg-red-50 px-3 py-1 rounded-full italic">
                        No Document
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.isEmailVerified ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        Not Verified
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusSelect user={user} updatedstatus={updatedstatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- MOBILE CARDS (Visible only on Mobile) --- */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white p-5 rounded-xl shadow-md border-l-4 border-pink-500"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{user.name}</h3>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded">
                  {user.role}
                </span>
              </div>

              <div className="flex gap-3 mb-4">
                {user.reelPageLink && (
                  <a
                    href={user.reelPageLink}
                    className="text-xs text-pink-600 flex items-center gap-1 border border-pink-200 px-2 py-1 rounded"
                  >
                    Reel <FaExternalLinkAlt size={10} />
                  </a>
                )}
                {user.registrationLetter && (
                  <a
                    href={`http://localhost:5000/${user.registrationLetter}`}
                    className="text-xs text-blue-600 flex items-center gap-1 border border-blue-200 px-2 py-1 rounded"
                  >
                    Doc <FaFileAlt size={10} />
                  </a>
                )}
              </div>
              <div className="my-2" >
                {user.isEmailVerified ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    Not Verified
                  </span>
                )}
              </div>

              <StatusSelect
                user={user}
                updatedstatus={updatedstatus}
                fullWidth={true}
              />
            </div>
          ))}
        </div>

        {users.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl mt-4 text-gray-400">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Status Dropdown Component
const StatusSelect = ({ user, updatedstatus, fullWidth }) => (
  <div className={`relative ${fullWidth ? "w-full" : "w-32 mx-auto"}`}>
    <select
      value={user.isApproved ? "accepted" : "pending"}
      onChange={(e) =>
        updatedstatus({
          userId: user._id,
          isApproved: e.target.value === "accepted",
        })
      }
      className={`w-full text-xs font-bold py-2 px-3 rounded-lg appearance-none cursor-pointer border-2 transition-all ${
        user.isApproved
          ? "bg-green-50 border-green-200 text-green-700"
          : "bg-yellow-50 border-yellow-200 text-yellow-700"
      }`}
    >
      <option value="accepted">Accepted</option>
      <option value="pending">Pending</option>
    </select>
    <div className="absolute right-2 top-2.5 pointer-events-none">
      {user.isApproved ? <FaCheck size={12} /> : <FaClock size={12} />}
    </div>
  </div>
);

export default User;
