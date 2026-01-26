import { useState } from "react";
import axios from "axios";
import {
  FaMagic, FaMapMarkerAlt, FaRegImage, FaExclamationCircle,
  FaWallet, FaArrowRight, FaCrown, FaCheckCircle, FaUserFriends
} from "react-icons/fa";

function AiPlanner() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [deals, setDeals] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [guests, setGuests] = useState(1);

  const getPriceDetails = (vendor, guestCount) => {
    if (!vendor) return { perHead: 0, total: 0, isPerHead: false };
    const type = (vendor.serviceType || "").toLowerCase();
    const g = guestCount || 1;

    let perHead = 0;
    let total = 0;
    let isPerHead = false;

    if (type === "hall") {
      perHead = vendor.hallPricePerHead || 0;
      total = perHead * g;
      isPerHead = true;
    } else if (type === "catering") {
      perHead = vendor.cateringminPerHead || 0;
      total = perHead * g;
      isPerHead = true;
    } else {
      // Fixed Price items
      total = vendor.djRate || vendor.photographerStartingRange || vendor.decoratorminPrice || vendor.carRentalPrice || 0;
      isPerHead = false;
    }

    return { perHead, total, isPerHead };
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/deals", { prompt });
      if (res.data?.success) {
        setDeals(res.data.deals || []);
        setGuests(res.data.guests || 1);
      } else {
        setErrorMsg(res.data?.message || "No matching vendors found.");
      }
    } catch (err) {
      setErrorMsg("Backend connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-pink-500/30">
      
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-600/10 blur-[120px]"></div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-24 pb-12 px-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
          <FaCrown className="text-yellow-500 text-xs" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">AI Wedding Architect</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter">
          Instant <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">Event Planning</span>
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base">Enter your requirements and let AI build the perfect vendor bundle for you.</p>
      </div>

      {/* Search Input */}
      <div className="max-w-2xl mx-auto px-6 mb-20 relative z-10">
        <div className="flex bg-slate-900/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl focus-within:border-pink-500/50 transition-all">
          <input
            className="flex-1 bg-transparent px-4 py-3 outline-none text-white placeholder:text-slate-600"
            placeholder="e.g. 200 guests, 1 Million budget in Karachi"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button 
            onClick={handleSubmit}
            className="bg-pink-600 hover:bg-pink-500 px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
          >
            {loading ? "..." : <><FaMagic /> Plan</>}
          </button>
        </div>
      </div>

      {/* Results Container */}
      <div className="max-w-6xl mx-auto px-6 pb-24 z-10 relative">
        {deals.map((deal, i) => (
          <div key={i} className="mb-20">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="bg-pink-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">#{i+1}</span>
                Recommended Bundle
              </h2>
              <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
                <span className="text-[10px] uppercase text-slate-500 font-bold block">Total Est. Budget</span>
                <span className="text-2xl font-black text-pink-500">PKR {deal.totalPrice?.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deal.services?.map((s, idx) => {
                const { perHead, total, isPerHead } = getPriceDetails(s.vendor, guests);
                return (
                  <div key={idx} className="bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden hover:translate-y-[-5px] transition-all duration-300">
                    <div className="h-40 relative">
                      {s.vendor?.images?.[0] ? (
                        <img src={`http://localhost:5000/${s.vendor.images[0]}`} className="w-full h-full object-cover" alt="" />
                      ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center"><FaRegImage className="opacity-20 text-3xl"/></div>
                      )}
                      <div className="absolute top-3 left-3 bg-pink-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-tighter">
                        {s.service}
                      </div>
                    </div>

                    <div className="p-5">
                      <h4 className="font-bold text-lg mb-1 truncate">{s.vendor?.title}</h4>
                      <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                        <FaMapMarkerAlt className="text-pink-500" /> {s.vendor?.city}
                      </p>

                      {/* Pricing Logic Container */}
                      <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                        {isPerHead ? (
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-400 font-medium uppercase">
                              <span>Per Head × Guests</span>
                              <span>Subtotal</span>
                            </div>
                            <div className="flex justify-between items-end">
                              <span className="text-sm text-slate-300">
                                {perHead.toLocaleString()} × {guests}
                              </span>
                              <span className="text-xl font-black text-white">
                                <span className="text-xs text-pink-500 mr-1">Rs.</span>
                                {total.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-400 font-medium uppercase">Fixed Rate</span>
                            <span className="text-xl font-black text-white">
                               <span className="text-xs text-pink-500 mr-1">Rs.</span>
                               {total.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Loader & Errors */}
      {loading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-pink-500 font-black tracking-widest text-xs uppercase">AI Architect is Building...</p>
        </div>
      )}

      {errorMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-full flex items-center gap-2 z-50 animate-bounce">
          <FaExclamationCircle /> {errorMsg}
        </div>
      )}
    </div>
  );
}

export default AiPlanner;