import React from "react";
import { FiCamera, FiSave, FiCpu, FiGlobe, FiShield } from "react-icons/fi";

const VendorSettings = () => {
  return (
    <div className="w-full min-h-screen p-4 md:p-10 text-white selection:bg-red-600">
      {/* HEADER SECTION */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
        <div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none opacity-20 absolute -top-4 -left-2 pointer-events-none select-none">CONFIG</h1>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase relative z-10">
            VENDOR <span className="text-red-600">CORE</span>
          </h1>
          <p className="mt-2 text-slate-500 text-xs font-black uppercase tracking-[0.5em] flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
            System Customization Interface
          </p>
        </div>
        <button className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all duration-500 shadow-2xl">
          <FiSave className="text-lg group-hover:rotate-12 transition-transform" />
          Synchronize Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* --- LEFT: AVATAR & IDENTITY --- */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-600/5 blur-[100px] group-hover:bg-red-600/10 transition-all"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative">
                <div className="w-48 h-48 rounded-[2.5rem] overflow-hidden border-2 border-white/10 group-hover:border-red-600/50 transition-all duration-700 rotate-3 group-hover:rotate-0 shadow-2xl">
                  <img src="https://api.dicebear.com/7.x/big-ears-neutral/svg?seed=Felix" alt="avatar" className="w-full h-full object-cover" />
                </div>
                <button className="absolute -bottom-4 -right-4 bg-red-600 p-4 rounded-2xl border-4 border-[#020617] hover:scale-110 transition-all shadow-xl">
                  <FiCamera className="text-white text-xl" />
                </button>
              </div>
              
              <div className="text-center mt-10">
                <h2 className="text-2xl font-black italic tracking-tight">ELITE PHOTOGRAPHY</h2>
                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">Tier: Diamond Vendor</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-black border border-white/5 rounded-[2.5rem] p-8">
            <h3 className="flex items-center gap-3 font-black uppercase text-xs tracking-widest mb-6 italic text-red-600">
                <FiCpu /> System Hardware
            </h3>
            <div className="space-y-4">
                {["Auto-Optimization", "Cloud Storage", "Priority Indexing"].map((tech) => (
                    <div key={tech} className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-white/5 pb-2">
                        {tech} <span className="text-white">Active</span>
                    </div>
                ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT: DATA INPUTS --- */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-10">
                <FiGlobe className="text-red-600 text-3xl" />
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Operational Parameters</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] pl-2">Brand Signature</label>
                <input type="text" className="w-full bg-black/50 border border-white/5 rounded-2xl py-5 px-6 outline-none focus:border-red-600 transition-all font-bold text-sm" placeholder="Brand Name" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] pl-2">Neural Email</label>
                <input type="email" className="w-full bg-black/50 border border-white/5 rounded-2xl py-5 px-6 outline-none focus:border-red-600 transition-all font-bold text-sm" placeholder="vendor@network.com" />
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] pl-2">Business Manifesto</label>
                <textarea rows="5" className="w-full bg-black/50 border border-white/5 rounded-[2rem] py-5 px-6 outline-none focus:border-red-600 transition-all font-bold text-sm resize-none" placeholder="Enter your business bio..."></textarea>
              </div>
            </div>
          </div>

          <div className="bg-red-600/5 border border-red-600/20 rounded-[3rem] p-10 flex items-center justify-between group cursor-pointer hover:bg-red-600/10 transition-all">
            <div className="flex items-center gap-6">
                <FiShield className="text-4xl text-red-600" />
                <div>
                    <h4 className="text-xl font-black italic uppercase tracking-tight">Security Matrix</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Update 2FA and Access Keys</p>
                </div>
            </div>
            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-black group-hover:translate-x-2 transition-transform">→</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VendorSettings;