import React from "react";
import {
  FiTrendingUp,
  FiPieChart,
  FiTarget,
  FiAward,
  FiZap,
  FiArrowRight,
} from "react-icons/fi";
import { GiStairsGoal } from "react-icons/gi";

const StrategicBusinessPlanning = () => {
  const strategies = [
    {
      title: "Market Expansion",
      desc: "Analyze high-demand zones for your services and scale operations.",
      icon: <FiTrendingUp className="text-emerald-400" />,
      stats: "24% Growth Potential",
      color: "border-emerald-500/30",
      glow: "group-hover:shadow-emerald-500/20",
    },
    {
      title: "Pricing Optimization",
      desc: "Competitive price benchmarking against top-rated vendors in your city.",
      icon: <FiPieChart className="text-yellow-400" />,
      stats: "Optimized for Winter",
      color: "border-yellow-500/30",
      glow: "group-hover:shadow-yellow-500/20",
    },
    {
      title: "Customer Conversion",
      desc: "Convert more inquiries into confirmed bookings with AI insights.",
      icon: <FiTarget className="text-indigo-400" />,
      stats: "85% Conversion Aim",
      color: "border-indigo-500/30",
      glow: "group-hover:shadow-indigo-500/20",
    },
  ];

  return (
    <div className=" bg-[#020617] pl-10 lg:pl-80  pr-10 pt-30 py-10  w-full h-full   text-white">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-yellow-500 font-bold tracking-[0.2em] text-xs uppercase">
            <FiZap /> Intelligence Dashboard
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Strategic{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
              Planning
            </span>
          </h1>
          <p className="text-slate-400 max-w-md">
            Advanced roadmap to scale your vendor business and dominate the
            local market.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-500 transition-all transform hover:scale-105 active:scale-95 shadow-xl">
          Download PDF Report <FiArrowRight />
        </button>
      </div>

      {/* --- Top 3 Strategy Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {strategies.map((item, index) => (
          <div
            key={index}
            className={`group relative bg-slate-900/40 backdrop-blur-xl border ${item.color} p-8 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 shadow-2xl ${item.glow}`}
          >
            <div className="text-4xl mb-6 bg-slate-800/50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-xl font-extrabold mb-3 group-hover:text-yellow-500 transition-colors">
              {item.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {item.desc}
            </p>
            <div className="text-[10px] font-bold tracking-widest uppercase text-slate-500 border-t border-slate-800 pt-4">
              Current Status: <span className="text-white">{item.stats}</span>
            </div>
          </div>
        ))}
      </div>

      {/* --- Performance Roadmap Section (Heavy Design) --- */}
      <div className="bg-gradient-to-r from-indigo-900/20 via-slate-900 to-black border border-slate-800 rounded-[3rem] p-8 md:p-12 overflow-hidden relative">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <GiStairsGoal className="text-yellow-500 text-4xl" />
              Vendor Growth Roadmap
            </h2>
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  label: "Profile Perfection",
                  detail: "Adding 10+ HD Portfolio images.",
                },
                {
                  step: "02",
                  label: "Market Resonance",
                  detail: "Setting competitive seasonal pricing.",
                },
                {
                  step: "03",
                  label: "Elite Status",
                  detail: "Maintaining 4.8+ rating for 3 months.",
                },
              ].map((step, i) => (
                <div key={i} className="flex gap-6 group">
                  <span className="text-4xl font-black text-slate-800 group-hover:text-yellow-500/20 transition-colors italic">
                    {step.step}
                  </span>
                  <div>
                    <h4 className="font-bold text-lg text-white">
                      {step.label}
                    </h4>
                    <p className="text-slate-500 text-sm">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Badge Component */}
          <div className="flex justify-center">
            <div className="relative w-64 h-64 flex items-center justify-center bg-yellow-500/10 rounded-full border border-yellow-500/20 shadow-[0_0_100px_rgba(234,179,8,0.1)]">
              <div className="text-center animate-pulse">
                <FiAward className="text-7xl text-yellow-500 mx-auto mb-2" />
                <p className="font-black text-2xl">ELITE</p>
                <p className="text-[10px] tracking-[0.3em] text-yellow-500 uppercase font-bold">
                  Vendor Tier
                </p>
              </div>
              {/* Decorative Rings */}
              <div className="absolute inset-0 border-2 border-dashed border-yellow-500/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
            </div>
          </div>
        </div>

        {/* Abstract Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 blur-[120px] -z-0"></div>
      </div>
      
    </div>
  );
};

export default StrategicBusinessPlanning;
