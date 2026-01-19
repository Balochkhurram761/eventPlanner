import dotenv from "dotenv";
import Vendor from "../model/vendor.js";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
  safetySettings,
});

async function aiParsePrompt(prompt) {
  const aiPrompt = `Extract event data from: "${prompt}". 
  Return ONLY JSON: {"budget": number, "guests": number, "city": "string", "services": []}. 
  Map services to: hall, catering, dj, photographers, decorators, carrental.`;

  try {
    const result = await model.generateContent(aiPrompt);
    const response = await result.response;

    if (!response || !response.text) {
      console.log("AI blocked the content or failed to generate.");
      return { budget: 0, guests: 0, city: "", services: [] };
    }

    let text = response
      .text()
      .replace(/```json|```/g, "")
      .trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Critical Error:", error.message);
    return { budget: 0, guests: 0, city: "", services: [] };
  }
}

// -------------------- 2. Price Calculation --------------------
function getVendorPrice(vendor, guests) {
  let price = 0;
  const type = (vendor.serviceType || vendor.service || "").toLowerCase();
  const g = guests || 1;

  switch (type) {
    case "hall":
      price = (vendor.hallPricePerHead || 0) * g;
      break;
    case "catering":
      price = (vendor.cateringminPerHead || vendor.cateringmaxPerHead || 0) * g;
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
    case "carrental":
      price = vendor.carRentalPrice || 0;
      break;
    default:
      price = 0;
  }
  return price;
}

// -------------------- 4. Main Export Function --------------------
export const generateDeals = async (req, res) => {
  try {
    const { prompt: userPrompt } = req.body;
    const parsed = await aiParsePrompt(userPrompt);
    const { budget, guests, city, services } = parsed;

    // 1. Database se potential vendors fetch karein
    const vendors = await Vendor.find({
      serviceType: { $in: services.map((s) => new RegExp(s, "i")) },
      city: new RegExp(city, "i"),
    }).lean();

    // 2. Vendors ka data AI ke liye compress karein (taaki token kam use hon)
    const vendorContext = vendors.map((v) => ({
      id: v._id,
      name: v.title,
      type: v.serviceType,
      price: getVendorPrice(v, guests),
    }));

    // 3. AI ko kahein ke wo deals generate kare
    const aiDealPrompt = `
      User Budget: ${budget} PKR
      Guests: ${guests}
      Required Services: ${services.join(", ")}
      
      Available Vendors: ${JSON.stringify(vendorContext)}

      Task: Create 3 distinct "Deal Packages". 
      - Each package must include one vendor for each required service.
      - Total price must be under ${budget}.
      - Return ONLY a JSON array: [{"total": 120000, "vendorIds": ["id1", "id2"], "reason": "Why this deal?"}]
    `;
    //  Kaunse vendors ek package me fit ho sakte hain
    //Total budget ke andar kaise deals banaye jaaye
    const aiResult = await model.generateContent(aiDealPrompt);
    const aiDealsRaw = aiResult.response
      .text()
      .replace(/```json|```/g, "")
      .trim();
    const aiGeneratedDeals = JSON.parse(aiDealsRaw);

    // 4. AI ke diye gaye IDs ko wapis database objects se map karein
    const finalDeals = aiGeneratedDeals.map((deal) => ({
      totalPrice: deal.total,
      ai_reason: deal.reason,
      services: deal.vendorIds.map((id) => {
        const v = vendors.find((vend) => vend._id.toString() === id);
        return { service: v.serviceType, vendor: v };
      }),
    }));

    res.status(200).json({
      success: true,
      deals: finalDeals,
      ai_summary:
        "AI has hand-picked these bundles based on your specific budget constraints.",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "AI deal generation failed." });
  }
};
