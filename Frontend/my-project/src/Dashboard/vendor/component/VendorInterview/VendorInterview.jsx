import React from "react";
import {
  FiVideo,
  FiMic,
  FiCheckCircle,
  FiStar,
  FiAlertCircle,
  FiPlayCircle,
  FiLayers,
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";
import { FaHandshake, FaYoutube } from "react-icons/fa";

const VendorInterviewModule = () => {
  const professionalTips = [
    {
      title: "CORPORATE ETIQUETTE",
      desc: "MAINTAIN HIGHEST STANDARDS OF PROFESSIONALISM. IN THE PREMIUM SECTOR, CHARACTER IS YOUR BRAND EQUITY.",
      icon: <FiStar className="text-yellow-600" />,
    },
    {
      title: "ULTRA-HD PORTFOLIO",
      desc: "PRESENT VISUAL ASSETS ON 4K DISPLAYS. HIGH-FIDELITY SAMPLES ARE CRITICAL FOR HIGH-TICKET CONVERSIONS.",
      icon: <FiVideo className="text-blue-500" />,
    },
    {
      title: "PRICE OPTIMIZATION",
      desc: "IMPLEMENT DYNAMIC PRICING STRATEGIES. ALWAYS RETAIN A STRATEGIC MARGIN FOR VALUE-BASED NEGOTIATIONS.",
      icon: <FaHandshake className="text-emerald-600" />,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600">
      <div className="pt-25 pb-5 px-15  w-full max-w-[1600px] mx-auto">
        {/* --- ELITE HEADER SECTION --- */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-8 border-b-2 border-slate-900 pb-10">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
              VENDOR{" "}
              <span className="text-red-600 underline decoration-white/10">
                SUCCESS
              </span>{" "}
              ACADEMY
            </h1>
            <p className="mt-2 text-slate-500 text-xs font-bold uppercase tracking-[0.5em]">
              Official Business Intelligence & Training Portal
            </p>
          </div>

          <div className="flex items-center gap-4 bg-gradient-to-r from-red-600 to-red-800 px-10 py-5 rounded-2xl shadow-[0_10px_40px_rgba(220,38,38,0.3)] hover:scale-105 transition-transform cursor-pointer">
            <a
              target="_blank"
              href="https://www.youtube.com/embed/o3PGzsd7GyI?si=EPJxvRmDOg0lHGur"
              className="flex items-center gap-2.5"
            >
              <FaYoutube className="text-3xl animate-pulse" />
              <div className="flex flex-col">
                <span className="font-black uppercase text-lg leading-none">
                  WEDDING BAZAR
                </span>
                <span className="text-[10px] font-bold opacity-70 tracking-widest uppercase">
                  Certified Content
                </span>
              </div>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* --- LEFT: PRIMARY INTEL & VIDEO --- */}
          <div className="lg:col-span-2 space-y-12">
            {/* MAIN PLAYER BOX */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-md">
              <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/60">
                <div className="flex items-center gap-3">
                  <FiActivity className="text-red-600 animate-spin" />
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                    STREAM: OPERATIONAL GROWTH STRATEGY
                  </span>
                </div>
                <FiTrendingUp className="text-slate-500" />
              </div>

              {/* VIDEO FRAME WRAPPER */}
              <div className="relative w-full aspect-video bg-black shadow-inner border-y border-slate-800">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/DyOTV85dv6I?modestbranding=1&rel=0"
                  title="Vendor Intelligence Story"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* TOPIC GRID */}
              <div className="p-8">
                <h4 className="font-black mb-8 uppercase text-xl italic flex items-center gap-3 border-l-4 border-red-600 pl-4">
                  <FiMic className="text-red-600" /> MASTERCLASS MODULES
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Market Share Acquisition",
                    "Consumer Behavioral Analysis",
                    "High-Ticket Conversion Pitch",
                    "Advanced Revenue Negotiation",
                    "Institutional Brand Equity",
                    "Digital Ecosystem Integration",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-[11px] font-black uppercase tracking-widest flex items-center gap-4 group hover:border-red-600/50 transition-all cursor-crosshair"
                    >
                      <span className="text-red-600 opacity-40 group-hover:opacity-100 italic">
                        0{i + 1}
                      </span>
                      <span className="text-slate-400 group-hover:text-white">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* TRAINING PLAYLIST */}
          </div>

          {/* --- RIGHT: STRATEGIC CONTROLS --- */}
          <div className="space-y-10">
            {/* SECRETS CARD */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-black p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <FiAlertCircle className="absolute -right-12 -top-12 text-[20rem] opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
              <h3 className="font-black uppercase text-3xl mb-10 tracking-tighter italic border-b-4 border-black inline-block pb-1">
                EXECUTIVE SECRETS
              </h3>

              {professionalTips.map((tip, i) => (
                <div key={i} className="mb-10 last:mb-0 relative z-10">
                  <div className="flex items-center gap-4 font-black text-lg tracking-tighter mb-2">
                    <span className="bg-black text-yellow-500 p-2 rounded-xl shadow-lg">
                      {tip.icon}
                    </span>
                    {tip.title}
                  </div>
                  <p className="text-[11px] font-bold uppercase leading-relaxed text-black/70 pl-14">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* PROTOCOL CHECKLIST */}
            <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-600/10 blur-[60px]"></div>
              <h3 className="font-black uppercase mb-10 text-xl tracking-widest italic border-l-4 border-red-600 pl-4">
                DAILY PROTOCOLS
              </h3>

              {[
                "EXECUTIVE ATTIRE CODE",
                "ASSET PORTFOLIO SYNC",
                "MARKET-COMPETITIVE PRICING",
                "LEGAL COMPLIANCE DOCUMENTS",
                "ULTRA-FAST RESPONSE MATRIX",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 text-[10px] font-black uppercase mb-6 tracking-widest text-slate-500 hover:text-white transition-colors cursor-default group"
                >
                  <FiCheckCircle className="text-emerald-500 text-2xl group-hover:scale-125 transition-transform" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorInterviewModule;
