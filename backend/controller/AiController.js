import dotenv from "dotenv";
import Vendor from "../model/vendor.js";
dotenv.config();

async function localSummary(prompt) {
  try {
    const resp = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt: `Summarize this event booking request in 2-3 lines:\n${prompt}`,
        stream: false,
      }),
    });
    const data = await resp.json();
    return data?.response?.trim() || null;
  } catch (err) {
    console.error("Ollama AI call failed:", err.message);
    return null;
  }
}

function getVendorPrice(vendor, guests = 1) {
  let price = 0;
  switch (vendor.serviceType?.toLowerCase() || vendor.service?.toLowerCase()) {
    case "hall":
      price = vendor.hallPricePerHead || 0;
      break;
    case "catering":
      price = vendor.cateringminPerHead || vendor.cateringmaxPerHead || 0;
      break;
    case "dj":
      price = vendor.djRate || 0;
      break;
    case "photographers":
      price =
        vendor.photographerStartingRange ||
        vendor.photographerexpectedRange ||
        0;
      break;
    case "decorators":
      price = vendor.decoratorminPrice || vendor.decoratormaxPrice || 0;
      break;
    case "car":
    case "carrental":
      price = vendor.carRentalPrice || 0;
      break;
    default:
      price = 0;
  }
  return ["hall", "catering"].includes(vendor.serviceType?.toLowerCase())
    ? price * guests
    : price;
}

function parsePrompt(prompt) {
  const text = prompt.toLowerCase();
  let budget = 0,
    guests = 0;
  const services = [];

  const budgetMatch = text.match(/(\d{3,})\s*(pkr|rs|rupees)?/);
  if (budgetMatch) budget = parseInt(budgetMatch[1]);

  const guestsMatch = text.match(/(\d+)\s*(guest|log|people|persons|invitees)/);
  if (guestsMatch) guests = parseInt(guestsMatch[1]);

  if (text.includes("catering")) services.push("catering");
  if (text.includes("dj")) services.push("dj");
  if (text.includes("photo")) services.push("photographers");
  if (text.includes("hall") || text.includes("venue")) services.push("hall");
  if (text.includes("car")) services.push("carrental");
  if (text.includes("decor")) services.push("decorators");

  return { budget, guests, services };
}

export const generateDeals = async (req, res) => {
  try {
    let { prompt, budget, guests, services } = req.body;

    //  Parse Prompt if user sends text
    if (prompt) {
      const parsed = parsePrompt(prompt);
      budget = budget || parsed.budget;
      guests = guests || parsed.guests || 1;
      services = services?.length ? services : parsed.services;
    }

    if (!budget || !services?.length) {
      return res
        .status(400)
        .json({ success: false, message: "Budget or services missing." });
    }

    const location = "Lahore";
    const serviceRegex = services.map((s) => new RegExp(s, "i"));
    const locationRegex = new RegExp(location, "i");

    const vendors = await Vendor.find({
      $and: [
        {
          $or: [
            { serviceType: { $in: serviceRegex } },
            { service: { $in: serviceRegex } },
          ],
        },
        { $or: [{ location: locationRegex }, { city: locationRegex }] },
      ],
    })
      .populate("user", "name email")
      .lean();

    if (!vendors.length) {
      return res.status(404).json({
        success: false,
        message: "No vendors found in Lahore for selected services.",
      });
    }

    
    // Single-service request  show all vendors under budget directly
    if (services.length === 1) {
      const serviceType = services[0].toLowerCase();

      const filteredVendors = vendors.filter((v) => {
        const price = getVendorPrice(v, guests);
        return price <= budget;
      });

      const ai_summary = prompt ? await localSummary(prompt) : null;

      return res.status(200).json({
        success: true,
        budget,
        guests,
        location,
        services,
        totalVendorsFound: filteredVendors.length,
        deals: [{ services: filteredVendors }], // for frontend consistency
        ai_summary,
      });
    }

    //  Multi-service (combine vendors logically)
    const vendorGroups = {};
    for (const v of vendors) {
      const key = v.user?._id?.toString() || v._id.toString();
      if (!vendorGroups[key])
        vendorGroups[key] = { business: v.user, services: [], total: 0 };

      vendorGroups[key].services.push(v);
      vendorGroups[key].total += getVendorPrice(v, guests);
    }

    //  Filter only within budget
    const sortedGroups = Object.values(vendorGroups).sort(
      (a, b) => a.total - b.total
    );
    const topDeals = sortedGroups.filter((g) => g.total <= budget).slice(0, 10);

    const ai_summary = prompt ? await localSummary(prompt) : null;

    res.status(200).json({
      success: true,
      budget,
      guests,
      location,
      services,
      totalVendorsFound: vendors.length,
      deals: topDeals,
      ai_summary,
    });
  } catch (err) {
    console.error("generateDeals Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
