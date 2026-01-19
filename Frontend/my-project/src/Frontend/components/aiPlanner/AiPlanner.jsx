import { useState } from "react";
import axios from "axios";

function AiPlanner() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [deals, setDeals] = useState([]);
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDeals([]);
    setSummary("");

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
          services: data.services,
        });
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Helper: get vendor price from fields
  const getVendorPrice = (vendor) => {
    switch (vendor.serviceType?.toLowerCase()) {
      case "hall":
        return vendor.hallPricePerHead || 0;
      case "catering":
        return vendor.cateringminPerHead || vendor.cateringmaxPerHead || 0;
      case "dj":
        return vendor.djRate || 0;
      case "photographers":
        return (
          vendor.photographerStartingRange ||
          vendor.photographerexpectedRange ||
          0
        );
      case "decorators":
        return vendor.decoratorminPrice || vendor.decoratormaxPrice || 0;
      case "car":
      case "carrental":
        return vendor.carRentalPrice || 0;
      default:
        return 0;
    }
  };

  // 🔹 Helper: get price color (pink for car)

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center">
        AI Event Planner
      </h1>

      {/*  Prompt Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row lg:flex-row gap-2 mb-8 justify-center"
      >
        <input
          type="text"
          placeholder="e.g. Book catering + hall in Lahore for 150 guests, budget 200000 PKR"
          className="flex-1 border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          {loading ? "Planning..." : "Get Suggestions"}
        </button>
      </form>

      {/* 🔹 AI Summary + Detected Info */}
      {(summary || details.budget) && (
        <div className="mb-6 p-5 border rounded-lg bg-blue-50 shadow">
          <h2 className="font-semibold text-lg mb-2">AI Summary</h2>
          {summary && <p className="text-gray-700 mb-2">{summary}</p>}
          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            {details.location && (
              <p>
                <strong>{details.location}</strong>
              </p>
            )}
            {details.guests && (
              <p>
                <strong>{details.guests} Guests</strong>
              </p>
            )}
            {details.budget && (
              <p>
                <strong>PKR {details.budget}</strong>
              </p>
            )}
            {details.services?.length > 0 && (
              <p>
                Services: <strong>{details.services.join(", ")}</strong>
              </p>
            )}
          </div>
        </div>
      )}

      {/*  Multi-Service Deals */}
      {deals.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Recommended Vendor Combinations
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {deals.map((deal, i) => (
              <div
                key={i}
                className="p-6 border-2 border-blue-100 rounded-3xl shadow-lg bg-white"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-blue-900">
                    Package Option {i + 1}
                  </h3>
                  <span className="text-xl font-extrabold text-green-600 bg-green-50 px-4 py-1 rounded-full border border-green-200">
                    Total: PKR {deal.totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* horizontal scroll or grid for vendors in ONE deal */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {deal.services.map((s, j) => (
                    <div
                      key={j}
                      className="flex flex-col p-4 border rounded-2xl bg-gray-50 hover:bg-pink-50 transition"
                    >
                      {/* Image logic */}
                      {s.vendor?.images?.length > 0 ? (
                        <img
                          src={`http://localhost:5000/${s.vendor.images[0]}`}
                          alt={s.vendor.title}
                          className="w-full h-40 object-cover rounded-xl mb-3"
                        />
                      ) : (
                        <div className="w-full h-40 bg-gray-200 rounded-xl mb-3 flex items-center justify-center text-gray-400">
                          No Image Available
                        </div>
                      )}

                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-800">
                          {s.vendor?.title ||
                            s.vendor?.name ||
                            "Unnamed Vendor"}
                        </h4>
                        <p className="text-sm font-medium text-pink-500 uppercase tracking-wide">
                          {s.service}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          📍{" "}
                          {s.vendor?.city ||
                            s.vendor?.location ||
                            "Location N/A"}
                        </p>
                        <p className="text-lg font-bold text-blue-700 mt-2">
                          PKR {getVendorPrice(s.vendor).toLocaleString()}
                        </p>
                      </div>

                      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>{" "}
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-500 mt-8">
            No vendors to display yet. Enter your event details above.
          </p>
        )
      )}
    </div>
  );
}

export default AiPlanner;
