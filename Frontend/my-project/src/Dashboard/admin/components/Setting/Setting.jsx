import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCamera,
  FiBriefcase,
  FiInstagram,
  FiSave,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";
import { RiLoader4Fill, RiShieldFlashLine } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import { useSearch } from "../../context/SearchContext";

const AdminSettings = ({}) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user] = useState(storedUser);
  const token = storedUser?.token;
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { preview, setPreview } = useSearch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    vendorContactNo: "",
    businessAddress: "",
    reelPageLink: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/auth/vendor/getvendordata/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (res.data.success) {
          setFormData(res.data.data);
          if (res.data.data.image?.[0]) {
            setPreview(`http://localhost:5000/${res.data.data.image[0]}`);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    };
    if (user?.id) fetchVendorData();
  }, [user.id, token]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (profileImage) data.append("image", profileImage);

      const res = await axios.put(
        `http://localhost:5000/api/auth/vendor/putvendordata/${user.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.data.success) alert("Profile Synced! ");
    } catch (err) {
      alert("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  if (isFetching)
    return (
      <div className="h-screen flex items-center justify-center bg-[#020617]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin"></div>
          <RiLoader4Fill className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500 text-3xl" />
        </div>
      </div>
    );

  return (
    <div className="min-h-screen z-0  pl-10 lg:pl-80 pt-26  bg-[#020617] text-slate-200 py-12 px-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent">
              Admin HUB
            </h1>
            <div className="flex items-center gap-2 text-pink-500 font-bold tracking-widest text-xs uppercase">
              <RiShieldFlashLine className="text-lg" /> Core Account
              Synchronization
            </div>
          </div>
          
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* LEFT: Profile Bento Box */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="relative group/img">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-blue-600 rounded-[2.5rem] blur opacity-30 group-hover/img:opacity-100 transition duration-500"></div>
                  <img
                    src={preview}
                    className="relative w-44 h-44 rounded-[2.2rem] object-cover border-2 border-white/10 transition-transform duration-500 group-hover/img:scale-[1.02]"
                    alt="Logo"
                  />
                  <label className="absolute -bottom-3 -right-3 bg-pink-600 text-white p-4 rounded-2xl cursor-pointer hover:bg-white hover:text-pink-600 transition-all shadow-2xl scale-90 group-hover/img:scale-100">
                    <FiCamera size={22} />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                </div>

                <h2 className="mt-8 text-2xl font-black text-white text-center">
                  {formData.businessName || "UNNAMED CORP"}
                </h2>
                <span className="mt-2 px-3 py-1 bg-white/5 rounded-full text-[10px] font-black tracking-[0.2em] text-slate-400 border border-white/5 uppercase">
                  Node: {user?.id?.slice(-8)}
                </span>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="grid grid-cols-2 gap-4">
              <StatBox
                label="Reliability"
                value="99.2%"
                color="text-green-400"
              />
              <StatBox
                label="Verification"
                value="Level 4"
                color="text-blue-400"
              />
            </div>
          </div>

          {/* RIGHT: High-Tech Form Card */}
          <div className="lg:col-span-8">
            <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[3.5rem] p-8 md:p-14 shadow-2xl relative">
              <div className="flex items-center gap-4 mb-12">
                <div className="p-4 bg-pink-600/10 rounded-2xl border border-pink-500/20">
                  <FiShield className="text-3xl text-pink-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    Business Intel
                  </h3>
                  <p className="text-slate-500 text-sm font-medium">
                    Update your global metadata
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <HeavyInput
                  label="Owner Identity"
                  icon={<FiUser />}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <HeavyInput
                  label="System Mail"
                  icon={<FiMail />}
                  name="email"
                  value={formData.email}
                  disabled
                />
                <HeavyInput
                  label="Enterprise Name"
                  icon={<FiBriefcase />}
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                />
                <HeavyInput
                  label="Telecom"
                  icon={<FiPhone />}
                  name="vendorContactNo"
                  value={formData.vendorContactNo}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-12 space-y-10">
                <HeavyInput
                  label="Social Architecture (Instagram)"
                  icon={<FiInstagram />}
                  name="reelPageLink"
                  value={formData.reelPageLink}
                  onChange={handleChange}
                  placeholder="https://..."
                />

                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                    <FiMapPin className="text-pink-500" /> Operational Base
                  </label>
                  <textarea
                    name="businessAddress"
                    value={formData.businessAddress || ""}
                    onChange={handleChange}
                    rows="3"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-6 text-white font-bold focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all placeholder:text-slate-700 resize-none"
                    placeholder="Physical location coordinates..."
                  />
                </div>
              </div>

              <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3 text-slate-500">
                  <FiCheckCircle className="text-pink-500 text-xl" />
                  <span className="text-xs font-bold tracking-tight">
                    Data integrity protected by AES-256
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full md:w-auto overflow-hidden rounded-2xl bg-white px-12 py-5 transition-all duration-300 active:scale-95 disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-500 transition-all group-hover:scale-105"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    {loading ? (
                      <RiLoader4Fill className="animate-spin text-2xl text-white" />
                    ) : (
                      <FiSave className="text-xl text-white" />
                    )}
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-white">
                      Commit Changes
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- HEAVY UI COMPONENTS ---

const StatBox = ({ label, value, color }) => (
  <div className="bg-white/[0.02] border border-white/10 p-5 rounded-[2rem] text-center">
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className={`text-xl font-black ${color} tracking-tighter`}>{value}</p>
  </div>
);

const HeavyInput = ({ label, icon, disabled, ...props }) => (
  <div className="flex flex-col gap-3 group">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2 transition-colors group-focus-within:text-pink-500 px-1">
      {React.cloneElement(icon, { className: "text-lg" })} {label}
    </label>
    <div className="relative">
      <input
        {...props}
        disabled={disabled}
        className={`w-full bg-white/[0.03] border-b-2 border-white/5 rounded-t-xl px-2 py-4 text-white font-bold outline-none transition-all duration-500
          ${disabled ? "opacity-30 cursor-not-allowed" : "focus:bg-white/5 focus:border-pink-500 focus:shadow-[0_10px_30px_-15px_rgba(236,72,153,0.3)]"}
        `}
      />
    </div>
  </div>
);

export default AdminSettings;
