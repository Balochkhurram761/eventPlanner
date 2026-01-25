import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiZap, FiInfo, FiTrendingUp, FiCamera, FiMessageCircle } from "react-icons/fi";
import { BsMagic } from "react-icons/bs";

const AIAssistantHelp = () => {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState(null);

  const iconMap = {
    visual: <FiCamera className="text-pink-500" />,
    pricing: <FiTrendingUp className="text-yellow-500" />,
    engagement: <FiMessageCircle className="text-blue-500" />,
  };

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        const res = await axios.get("http://localhost:5000/api/auth/business-insights", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(" API RAW DATA:", res.data);

        const rawData = res.data;
        // Map any possible AI response format to our clean structure
        const cleanData = {
          score: rawData.score || rawData.qualityScore || 0,
          summary: rawData.summary || (typeof rawData.analysis === 'string' ? rawData.analysis : "Business Analysis complete."),
          suggestions: rawData.suggestions || rawData.actionableTips || []
        };

        setInsights(cleanData);
      } catch (err) {
        console.error(" Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) return (
    <div className="min-h-screen  bg-[#020617] flex flex-col items-center justify-center text-white">
      <BsMagic className="text-red-600 animate-spin mb-4" size={50} />
      <p className="font-black animate-pulse tracking-widest text-xs uppercase">AI Analyzing Portfolio...</p>
    </div>
  );

  if (!insights || !insights.suggestions || insights.suggestions.length === 0) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white p-6 text-center">
        <FiInfo size={40} className="text-gray-600 mb-4" />
        <h2 className="text-xl font-bold">No Insights Yet</h2>
        <p className="text-gray-400 mt-2">Add more products to get AI business tips.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#020617] z-0 pl-10 lg:pl-80 pr-10 pt-30 py-10 p-6 text-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-red-900/20 to-slate-900 border border-white/10 p-8 rounded-[2.5rem] mb-10 relative">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-red-500 font-bold tracking-widest text-xs uppercase">
              <BsMagic className="animate-pulse" /> AI Business Consultant
            </div>
            <h1 className="text-3xl md:text-4xl font-black italic uppercase">
              Smart <span className="text-red-600 underline">Growth</span> Insights
            </h1>
            <p className="text-slate-400 max-w-md text-sm">{insights.summary}</p>
          </div>
          <div className="w-24 h-24 z-0 bg-red-600/20 rounded-full flex items-center justify-center border border-red-500/30">
            <FiZap size={40} className="text-red-500" />
          </div>
        </div>
      </div>

      {/* Suggestions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.suggestions.map((item, index) => {
          // Handle both string and object formats
          const isString = typeof item === "string";
          const title = isString ? `Insight #${index + 1}` : (item.title || item.tip || "Strategy Tip");
          const desc = isString ? item : (item.desc || item.rationale || "");
          const type = isString ? "default" : item.type;

          return (
            <div key={index} className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl hover:-translate-y-2 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-slate-800 rounded-2xl">
                    {iconMap[type] || <FiZap className="text-red-500" />}
                  </div>
                  <span className="text-[10px] font-black uppercase px-3 py-1 bg-red-600/20 rounded-full text-red-500">
                    {item.impact || "High"}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">{desc}</p>
              </div>
              <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-red-600 transition-all">
                {item.action || "Implement Now"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Score Section */}
      <div className="mt-12 bg-slate-900/50 border border-white/5 p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="58" stroke="#1e293b" strokeWidth="8" fill="transparent" />
            <circle
              cx="64" cy="64" r="58" stroke="#dc2626" strokeWidth="8" fill="transparent"
              strokeDasharray={364.4}
              strokeDashoffset={364.4 - (364.4 * (insights.score || 0)) / 100}
              className="transition-all duration-1000"
            />
          </svg>
          <span className="absolute text-3xl font-black">{insights.score}%</span>
        </div>
        <div>
          <h3 className="text-xl font-bold italic">Product Quality Score</h3>
          <p className="text-sm text-gray-500 mt-2">AI analysis based on pricing, portfolio images, and current market trends in Pakistan.</p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantHelp;