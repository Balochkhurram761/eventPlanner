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

function getVendorPrice(vendor, guests) {
  let price = 0;
  switch (vendor.serviceType?.toLowerCase() || vendor.service?.toLowerCase()) {
    case "hall":
      price = vendor.hallPricePerHead || 0;
      return price * guests;
    case "catering":
      price = vendor.cateringminPerHead || vendor.cateringmaxPerHead || 0;
      break;
    case "dj":
      price = vendor.djRate || 0;
      break;
    case "photographers":
      price = vendor.photographerStartingRange || 0;
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
    guests = 0,
    city = "";
  const services = [];

  // ---- Budget ----
  const budgetMatch = text.match(/(\d{3,})\s*(pkr|rs|rupees)?/);
  if (budgetMatch) budget = parseInt(budgetMatch[1]);

  // ---- Guests ----
  const guestsMatch = text.match(
    /(\d+)\s*(guest|guests|log|people|persons|invitees)/i
  );
  if (guestsMatch) guests = parseInt(guestsMatch[1]);
  if (!guests && text.includes("guest")) {
    const fallback = text.match(/guest[s]?\s*([0-9]+)/);
    if (fallback) guests = parseInt(fallback[1]);
  }

  // ---- Services ----
  if (text.includes("catering")) services.push("catering");
  if (text.includes("dj")) services.push("dj");
  if (text.includes("photo")) services.push("photographers");
  if (text.includes("hall") || text.includes("venue")) services.push("hall");
  if (text.includes("car")) services.push("carrental");
  if (text.includes("decor")) services.push("decorators");

  // ---- City ----
  if (text.includes("lahore")) city = "Lahore";
  else if (text.includes("karachi")) city = "Karachi";
  else if (text.includes("islamabad")) city = "Islamabad";

  return { budget, guests, services, city };
}

export const generateDeals = async (req, res) => {
  try {
    let { prompt, budget, guests, services, city } = req.body;
    let parsed = {};

    // Parse prompt if provided
    if (prompt) {
      parsed = parsePrompt(prompt);
      budget = budget || parsed.budget;
      guests = guests || parsed.guests || 1;
      services = services?.length ? services : parsed.services;
      city = city || parsed.city;
    }

    if (!budget || !services?.length) {
      return res
        .status(400)
        .json({ success: false, message: "Budget or services missing." });
    }

    if (!city) {
      return res.status(400).json({
        success: false,
        message:
          "Please specify the city (Lahore, Karachi, Islamabad) in your request.",
      });
    }

    const locationRegex = new RegExp(city, "i");
    const serviceRegex = services.map((s) => new RegExp(s, "i"));

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
        message: `No vendors found in ${city} for selected services.`,
      });
    }

    // Single-service request
    if (services.length === 1) {
      const filteredVendors = vendors.filter(
        (v) => getVendorPrice(v, guests) <= budget
      );

      if (filteredVendors.length === 0) {
        return res.status(200).json({
          success: false,
          message: `No vendors available within your budget of PKR ${budget}. Please consider increasing your budget.`,
          budget,
          guests,
          location: city,
          services,
        });
      }

      const ai_summary = prompt ? await localSummary(prompt) : null;

      return res.status(200).json({
        success: true,
        budget,
        guests,
        location: city,
        services,
        totalVendorsFound: filteredVendors.length,
        deals: [{ services: filteredVendors }],
        ai_summary,
      });
    }

    // Multi-service combination
    const vendorGroups = {};
    for (const v of vendors) {
      const key = v.user?._id?.toString() || v._id.toString();
      if (!vendorGroups[key])
        vendorGroups[key] = { business: v.user, services: [], total: 0 };
      vendorGroups[key].services.push(v);
      vendorGroups[key].total += getVendorPrice(v, guests);
    }

    const topDeals = Object.values(vendorGroups)
      .filter((g) => g.total <= budget)
      .sort((a, b) => a.total - b.total);

    if (topDeals.length === 0) {
      return res.status(200).json({
        success: false,
        message: `No vendor combinations fit within your budget of PKR ${budget}. Please consider increasing your budget.`,
        budget,
        guests,
        location: city,
        services,
      });
    }

    const ai_summary = prompt ? await localSummary(prompt) : null;

    res.status(200).json({
      success: true,
      budget,
      guests,
      location: city,
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
