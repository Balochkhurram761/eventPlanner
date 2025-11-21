import { useState } from "react";
import axios from "axios";

function AiPlanner() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVendors([]);
    setSummary("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/deals", {
        prompt,
      });

      const data = res.data;
      if (data.success) {
        // Flatten out all vendor services into a single array of vendor cards
        const allVendors = data.deals.flatMap((d) => d.services);
        setVendors(allVendors);
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

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center">
         AI Event Planner
      </h1>

      {/*  Prompt Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-8 justify-center">
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
          <h2 className="font-semibold text-lg mb-2"> AI Summary</h2>
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

      {/*  Vendor Cards */}
      {vendors.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
             Recommended Vendors
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((v, i) => (
              <div
                key={i}
                className="p-4 border rounded-2xl shadow-md bg-white hover:shadow-lg transition"
              >
                {/* Vendor Image */}
                {v.images?.length > 0 ? (
                  <img
                    src={`http://localhost:5000/${v.images[0]}`}
                    alt={v.title || "Vendor"}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                {/* Vendor Info */}
                <h3 className="text-lg font-bold capitalize mb-1">
                  {v.title || v.venue || "Unnamed Vendor"}
                </h3>
                <p className="text-sm text-gray-600 capitalize">
                  {v.serviceType}
                </p>
                <p className="text-green-600 font-semibold mt-1">
                  PKR {getVendorPrice(v)}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                   {v.city || "Unknown Location"}
                </p>

                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                  Book Now
                </button>
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
