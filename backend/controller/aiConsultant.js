import Vendor from "../model/vendor.js";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const getBusinessInsights = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id; 
    const vendorProducts = await Vendor.find({ user: userId });

    if (!vendorProducts || vendorProducts.length === 0) {
      return res.status(404).json({ error: "No products found to analyze." });
    }

    const businessData = vendorProducts.map((p) => ({
      title: p.title,
      type: p.serviceType,
      city: p.city,
      imageCount: p.images?.length || 0,
      price: p.hallPricePerHead || p.djRate || p.photographerStartingRange || p.carRentalPrice || p.decoratorminPrice
    }));

    const aiPrompt = `
      You are a Wedding Industry Expert in Pakistan. Analyze this vendor's portfolio:
      DATA: ${JSON.stringify(businessData)}
      
      Instructions:
      1. Provide a quality score (0-100) and 3 tips.
      2. LANGUAGE: Use very simple "WhatsApp style" Roman Urdu. 
         - AVOID difficult words like "tajziya", "hikmat-e-amli", "ta'aluqat".
         - USE simple words like "mashwara", "tareeka", "kaam", "customer".
      3. CONSISTENCY: Be direct and factual based on the data provided so the advice doesn't change randomly.
      
      Return ONLY valid JSON:
      {
        "score": number,
        "summary": "Asan Roman Urdu summary",
        "suggestions": [
          { 
            "title": "Short Asan Title", 
            "desc": "Simple 1-line description in Roman Urdu", 
            "type": "visual|pricing|engagement", 
            "impact": "High", 
            "action": "Asan Button Text (e.g., Theek Karen)" 
          }
        ]
      }
    `;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: aiPrompt }],
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" },
      temperature: 0, // <--- Is se AI har baar different jawab nahi dega, consistent rahega.
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content);
    res.json(aiResponse);

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};