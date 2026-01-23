import { useState } from "react";
import axios from "axios";
import {
  FaMagic,
  FaMapMarkerAlt,
  FaUsers,
  FaWallet,
  FaServicestack,
  FaArrowRight,
  FaRegImage,
} from "react-icons/fa";

function AiPlanner() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [deals, setDeals] = useState([]);
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/deals", {
        prompt,
      });
      const data = res.data;
      if (data.success) {
        setDeals(data.deals || []);
        setSummary(data.ai_summary || "");
        setDetails({
          budget: data.budget,
          guests: data.guests,
          location: data.location,
          services: data.services || [],
        });
      }
    } catch (err) {
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const getVendorPrice = (vendor) => {
    if (!vendor) return 0;
    const g = details.guests || 1;
    const type = vendor.serviceType?.toLowerCase();
    if (type === "hall") return (vendor.hallPricePerHead || 0) * g;
    if (type === "catering") return (vendor.cateringminPerHead || 0) * g;
    if (type === "dj") return vendor.djRate || 0;
    if (type === "photographers") return vendor.photographerStartingRange || 0;
    if (type === "carrental") return vendor.carRentalPrice || 0;
    if (type === "decorators") return vendor.decoratorminPrice || 0;
    return 0;
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header & Form */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 flex items-center justify-center gap-3">
          <FaMagic className="text-pink-500" /> AI Event Planner
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto flex gap-3 mb-12"
      >
        <input
          className="flex-1 p-4 rounded-2xl border-2 border-pink-100 focus:border-pink-500 outline-none"
          placeholder="e.g. Wedding in Lahore, 100 guests, budget 100000, dj, car, photographers"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="bg-pink-600 text-white px-8 rounded-2xl font-bold hover:bg-pink-700 transition-all">
          {loading ? "Planning..." : "Get Deals"}
        </button>
      </form>

      {/* Results Section */}
      {deals.length > 0 && (
        <div className="space-y-12">
          {deals.map((deal, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-gray-800 tracking-tight">
                  Package Option {i + 1}
                </h3>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">
                    Total Budget Used
                  </p>
                  <p className="text-3xl font-black text-pink-600">
                    PKR {deal.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {deal.services.map((s, j) => (
                  <div
                    key={j}
                    className="border border-gray-100 rounded-3xl overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="h-40 bg-gray-200 relative">
                      {s.vendor?.images?.[0] ? (
                        <img
                          src={`http://localhost:5000/${s.vendor.images[0]}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <FaRegImage size={30} />
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold text-pink-600 uppercase">
                        {s.service}
                      </div>
                    </div>

                    <div className="p-5">
                      <h4 className="font-bold text-gray-800 mb-1">
                        {s.vendor?.title}
                      </h4>
                      <p className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                        <FaMapMarkerAlt /> {s.vendor?.city}
                      </p>

                      <div className="pt-3 border-t border-gray-50 flex justify-between items-end">
                        <div>
                          {s.service?.toLowerCase() === "hall" ||
                          s.service?.toLowerCase() === "catering" ? (
                            <>
                              <p className="text-[10px] text-pink-500 font-bold">
                                PKR{" "}
                                {(s.service?.toLowerCase() === "catering"
                                  ? s.vendor?.cateringminPerHead
                                  : s.vendor?.hallPricePerHead
                                ).toLocaleString()}{" "}
                                × {details.guests}
                              </p>
                              <p className="text-lg font-black text-gray-900">
                                PKR {getVendorPrice(s.vendor).toLocaleString()}
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">
                                Fixed Rate
                              </p>
                              <p className="text-lg font-black text-gray-900">
                                PKR {getVendorPrice(s.vendor).toLocaleString()}
                              </p>
                            </>
                          )}
                        </div>
                        <div className="p-2 bg-pink-50 text-pink-600 rounded-xl">
                          <FaArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AiPlanner;
