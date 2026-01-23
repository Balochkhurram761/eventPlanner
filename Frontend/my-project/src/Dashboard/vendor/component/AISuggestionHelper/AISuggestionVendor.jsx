import React from "react";
import { 
  FiZap, FiInfo, FiTrendingUp, FiStar, 
  FiCamera, FiMessageCircle, FiEdit 
} from "react-icons/fi";
import { BsMagic } from "react-icons/bs";

const AIAssistantHelp = () => {
  const suggestions = [
    {
      id: 1,
      title: "Improve Visual Appeal",
      desc: "Your product 'Modern Stage Decor' has low clicks. AI suggests uploading 3 more high-resolution images of previous events.",
      icon: <FiCamera className="text-pink-500" />,
      impact: "High Impact",
      action: "Upload Photos",
      color: "border-pink-500/30"
    },
    {
      id: 2,
      title: "Pricing Strategy",
      desc: "Compared to top-rated vendors in Lahore, your pricing is 15% higher. Consider a seasonal discount to attract more clients.",
      icon: <FiTrendingUp className="text-yellow-500" />,
      impact: "Medium Impact",
      action: "Adjust Pricing",
      color: "border-yellow-500/30"
    },
    {
      id: 3,
      title: "Review Engagement",
      desc: "You have 5 unanswered reviews. AI noticed that fast replies increase booking chances by 40%.",
      icon: <FiMessageCircle className="text-blue-500" />,
      impact: "Critical",
      action: "Reply Now",
      color: "border-blue-500/30"
    }
  ];

  return (
    <div className="bg-[#020617] pl-10 lg:pl-80  pr-10 pt-30 py-10 p-6 text-white min-h-screen">
      {/* --- AI Header --- */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-red-900/20 to-slate-900 border border-white/10 p-8 rounded-[2.5rem] mb-10 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-red-500 font-bold tracking-widest text-xs uppercase">
              <BsMagic className="animate-pulse" /> AI Business Consultant
            </div>
            <h1 className="text-3xl md:text-4xl font-black italic">
              Smart <span className="text-red-600 underline decoration-white/20">Growth</span> Insights
            </h1>
            <p className="text-slate-400 max-w-md text-sm">
              Our AI has analyzed your profile. Here are personalized tips to dominate the wedding market.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-red-600/20 rounded-full flex items-center justify-center border border-red-500/30 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
               <FiZap size={40} className="text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* --- AI Suggestions Grid --- */}
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <FiInfo className="text-red-500" /> Recommendations for You
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suggestions.map((item) => (
          <div 
            key={item.id} 
            className={`group bg-slate-900/40 border ${item.color} p-6 rounded-3xl transition-all duration-300 hover:bg-slate-900/60 hover:-translate-y-2`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-slate-800 rounded-2xl group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="text-[10px] font-black uppercase px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400">
                {item.impact}
              </span>
            </div>
            
            <h3 className="text-lg font-bold mb-2 group-hover:text-red-500 transition-colors">
              {item.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {item.desc}
            </p>

            <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-600 hover:border-red-600 transition-all">
              {item.action}
            </button>
          </div>
        ))}
      </div>

      {/* --- Detailed Quality Score --- */}
      <div className="mt-12  grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[2rem]">
          <h3 className="text-xl font-bold mb-6">Product Quality Score</h3>
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * 75) / 100} className="text-red-600" />
              </svg>
              <span className="absolute text-3xl font-black">75%</span>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-gray-300 italic">"You're doing better than 60% of vendors!"</p>
              <p className="text-sm text-gray-500">Complete your profile to reach 100% and get the 'Elite' badge.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600/10 to-transparent border border-white/5 p-8 rounded-[2rem] flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-2">Need Custom Advice?</h3>
          <p className="text-gray-400 text-sm mb-6">Chat with our AI Business Coach for a detailed strategy.</p>
          <button className="flex items-center justify-center gap-2 bg-red-600 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">
            <BsMagic /> Start AI Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantHelp;