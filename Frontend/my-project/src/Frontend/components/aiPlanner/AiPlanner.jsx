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
  const getPriceColor = (vendor) => {
    if (
      vendor.serviceType?.toLowerCase() === "car" ||
      vendor.service?.toLowerCase() === "carrental"
    ) {
      return "text-pink-600 font-bold";
    }
    return "text-green-600 font-semibold";
  };

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
          <div className="grid sm:grid-cols-1 lg:grid-cols-1 gap-6">
            {deals.map((deal, i) => (
              <div
                key={i}
                className="p-4 border rounded-2xl shadow-md bg-white hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold mb-2">
                  Total Price: PKR {deal.totalPrice}
                </h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {deal.services.map((s, j) => (
                    <div
                      key={j}
                      className="p-3 border rounded-xl shadow-sm bg-pink-100"
                    >
                      {s.vendor.images?.length > 0 ? (
                        <img
                          src={`http://localhost:5000/${s.vendor.images[0]}`}
                          alt={s.vendor.title || "Vendor"}
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-200 rounded-lg mb-2 flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}

                      <h4 className="text-md font-semibold mb-1">
                        {s.vendor.title || s.vendor.venue || "Unnamed Vendor"}
                      </h4>
                      <p className="text-sm text-gray-600 capitalize">
                        {s.service}
                      </p>
                      <p className={`${getPriceColor(s.vendor)} mt-1`}>
                        PKR {getVendorPrice(s.vendor)}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        {s.vendor.city || "Unknown Location"}
                      </p>

                      <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                        Book Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
