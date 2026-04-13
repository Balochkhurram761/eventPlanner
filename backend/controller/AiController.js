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

// ... (aiParsePrompt aur getVendorPrice same rahengi)

export const generateDeals = async (req, res) => {
  try {
    const { prompt: userPrompt } = req.body;

    const parsed = await aiParsePrompt(userPrompt);
    const { budget = 0, guests = 0, city = "", services = [] } = parsed || {};

    if (!city || city.trim() === "") {
      return res.status(200).json({
        success: false,
        message: "Please enter a location to see deals.",
      });
    }

    // Step 2: Fetch Vendors and Shuffle
    const vendors = await Vendor.aggregate([
      {
        $match: {
          serviceType: { $in: services.map((s) => new RegExp(s, "i")) },
          city: new RegExp(city, "i"),
        },
      },
      { $sample: { size: 60 } }, 
    ]);

    if (!vendors || vendors.length === 0) {
      return res.status(200).json({
        success: false,
        message: `No vendors found in ${city}.`,
      });
    }

    const vendorContext = vendors.map((v) => ({
      id: v._id,
      name: v.title,
      type: v.serviceType.toLowerCase(),
      price: getVendorPrice(v, guests),
    }));

    // Step 3: AI Prompt with STRICT Budget Rules
    const aiDealPrompt = `
      STRICT BUDGET LIMIT: ${budget} PKR
      GUESTS: ${guests}
      REQUIRED SERVICES: ${services.join(", ")}
      AVAILABLE VENDORS: ${JSON.stringify(vendorContext)}
      
      INSTRUCTIONS:
      1. Create 3 different packages.
      2. Each package MUST include all ${services.length} services.
      3. CRITICAL: The sum of vendor prices in each package MUST NOT EXCEED ${budget} PKR.
      4. Avoid repeating the same vendor combinations across packages.
      5. If the budget is too tight, pick the cheapest options available.
      
      Return ONLY JSON: {"packages": [{"total": number, "vendorIds": ["id1", "id2"], "reason": "string"}]}`;

    const dealResult = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a precise event cost calculator. Never exceed the user's budget.",
        },
        { role: "user", content: aiDealPrompt },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7, 
      response_format: { type: "json_object" },
    });

    const rawData = JSON.parse(dealResult.choices[0].message.content);  //string hota hai, lekin JSON format mein.
    const aiGeneratedDeals = rawData.packages || [];

    // Step 4: Strict Final Validation ai vendor check real vendor match
    const finalDeals = aiGeneratedDeals
      .map((deal) => {
        const selectedVendors = (deal.vendorIds || [])
          .map((id) => vendors.find((v) => v._id.toString() === id.toString()))
          .filter(Boolean);

        // Calculate actual price again to double check AI
        const realTotal = selectedVendors.reduce(
          (sum, v) => sum + getVendorPrice(v, guests),
          0,
        );

        // Check if all requested services are present
        const selectedTypes = selectedVendors.map((v) =>
          v.serviceType.toLowerCase(),
        );
        const hasAllServices = services.every((s) =>
          selectedTypes.includes(s.toLowerCase()),
        );

        return {
          totalPrice: realTotal,
          services: selectedVendors.map((v) => ({
            service: v.serviceType,
            vendor: v,
          })),
          // Strict Rule: Budget aur Services dono match hone chahiye
          isValid:
            realTotal <= budget &&
            hasAllServices &&
            selectedVendors.length === services.length,
        };
      })
      .filter((d) => d.isValid)
      .sort((a, b) => a.totalPrice - b.totalPrice); // Sabse sasta package pehle dikhayein

    if (finalDeals.length === 0) {
      return res.status(200).json({
        success: false,
        message: `We couldn't find a combination of ${services.length} services within ${budget} PKR. Try increasing your budget or reducing services.`,
      });
    }

    res.status(200).json({
      success: true,
      deals: finalDeals.slice(0, 3), // Top 3 valid deals
      guests: guests,
    });
  } catch (err) {
    console.error("GROQ ERROR:", err.message);
    res
      .status(500)
      .json({ success: false, message: "AI error: " + err.message });
  }
};
