import dotenv from "dotenv";
import Vendor from "../model/vendor.js";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function aiParsePrompt(prompt) {
  const aiPrompt = `Extract event data from: "${prompt}". 
  Return ONLY JSON: {"budget": number, "guests": number, "city": "string", "services": []}. 
  Map services to: hall, catering, dj, photographers, decorators, carrental.`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: aiPrompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    return JSON.parse(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error("Extraction Error:", error.message);
    return { budget: 0, guests: 0, city: "", services: [] };
  }
}

function getVendorPrice(vendor, guests) {
  let price = 0;
  const type = (vendor.serviceType || vendor.service || "").toLowerCase();
  const g = guests || 1;

  switch (type) {
    case "hall":
      price = (vendor.hallPricePerHead || 0) * g;
      break;
    case "catering":
      price = (vendor.cateringminPerHead || 0) * g;
      break;
    case "dj":
      price = vendor.djRate || 0;
      break;
    case "photographers":
      price = vendor.photographerStartingRange || 0;
      break;
    case "decorators":
      price = vendor.decoratorminPrice || 0;
      break;
    case "carrental":
      price = vendor.carRentalPrice || 0;
      break;
    default:
      price = 0;
  }
  return price;
}

export const generateDeals = async (req, res) => {
  try {
    const { prompt: userPrompt } = req.body;
    const parsed = await aiParsePrompt(userPrompt);
    const { budget = 0, guests = 0, city = "", services = [] } = parsed || {};

    // 1. Database se sirf wahi vendors nikalein jo user ne maange hain
    const vendors = await Vendor.find({
      serviceType: { $in: services.map((s) => new RegExp(s, "i")) },
      city: new RegExp(city, "i"),
    }).lean();

    if (vendors.length === 0) {
      return res
        .status(200)
        .json({
          success: true,
          deals: [],
          budget,
          guests,
          location: city,
          services,
        });
    }

    const vendorContext = vendors.map((v) => ({
      id: v._id,
      name: v.title,
      type: v.serviceType,
      price: getVendorPrice(v, guests), // Yeh total price calculate karta hai (Rate * Guests)
    }));

    // 2. AI ko STRICT instruction dena
   const aiDealPrompt = `
      USER BUDGET: ${budget} PKR (STRICT LIMIT)
      GUESTS: ${guests}
      REQUIRED SERVICES: ${services.join(", ")}
      
      VENDORS DATA: ${JSON.stringify(vendorContext)}

      TASK:
      - Create 3 distinct packages.
      - Each package MUST contain EXACTLY ${services.length} vendors (one for each required service).
      - TOTAL PRICE of all vendors in a package MUST be <= ${budget}.
      - DO NOT skip any service. If a service cannot fit in budget, find the cheapest possible combination.
      - If it's impossible to fit ALL requested services under ${budget}, return an empty array [] instead of incomplete deals.

      Return ONLY JSON: {"packages": [{"total": number, "vendorIds": ["id1", "id2", "id3"], "reason": "string"}]}
    `;

    const dealResult = await groq.chat.completions.create({
      messages: [{ role: "user", content: aiDealPrompt }],
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" },
    });

    let rawData = JSON.parse(dealResult.choices[0].message.content);
    let aiGeneratedDeals = rawData.packages || [];

    // 3. Final Check: Code level par budget aur service filter
   const finalDeals = aiGeneratedDeals
      .map((deal) => {
        const selectedVendors = (deal.vendorIds || [])
          .map((id) => {
            const v = vendors.find((vend) => vend._id.toString() === id.toString());
            return v ? { service: v.serviceType, vendor: v } : null;
          })
          .filter(Boolean);

        const realTotal = selectedVendors.reduce(
          (sum, item) => sum + getVendorPrice(item.vendor, guests),
          0,
        );

        return {
          totalPrice: realTotal,
          ai_reason: deal.reason,
          services: selectedVendors,
          serviceCount: selectedVendors.length // Count check karne ke liye
        };
      })
      // FIX: Budget bhi sahi ho OR services ki quantity bhi poori ho
      .filter((deal) => 
        deal.totalPrice > 0 && 
        deal.totalPrice <= budget && 
        deal.services.length === services.length // Sirf wahi deal dikhao jis mein sab services hon
      )
      

    res.status(200).json({
      success: true,
      deals: finalDeals,
      budget,
      guests,
      location: city,
      services,
      ai_summary:
        finalDeals.length > 0
          ? `Found ${finalDeals.length} options within your ${budget} budget.`
          : `Sorry, we couldn't find a combination within ${budget} PKR for these services.`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "AI generation failed" });
  }
};
