import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    pending: 0,
  });

  const fetchUsers = useCallback(async (searchQuery = "") => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/auth/dashbaoard/admin/getdata?search=${searchQuery}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const fetchedUsers = res.data.data || [];
      setUsers(fetchedUsers);

      // 🔹 Counts calculate karna (Performance optimized)
      const total = fetchedUsers.length;
      const accepted = fetchedUsers.filter(u => u.isApproved === true).length;
      const pending = fetchedUsers.filter(u => u.isApproved === false).length;

      setStats({ total, accepted, pending });

    } catch (error) {
      console.error("Fetch Users Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updatedStatus = async (userId, isApproved) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    try {
      await axios.put(
        `http://localhost:5000/api/auth/updateStatus/${userId}`,
        { isApproved },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // 🔹 UI aur Counts dono ko update karna
      setUsers((prevUsers) => {
        const updated = prevUsers.map((u) => (u._id === userId ? { ...u, isApproved } : u));
        
        // Naye counts update karein
        const accepted = updated.filter(u => u.isApproved === true).length;
        const pending = updated.filter(u => u.isApproved === false).length;
        setStats(prev => ({ ...prev, accepted, pending }));
        
        return updated;
      });

    } catch (error) {
      console.error("Update Status Error:", error);
      alert("Failed to update status");
    }
  };

  return (
    <UserContext.Provider value={{ 
      users, 
      setUsers, 
      fetchUsers, 
      updatedStatus, 
      loading,
      stats //  Stats object (total, accepted, pending)
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);  