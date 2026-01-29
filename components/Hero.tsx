
import React from 'react';

interface HeroProps {
  onShowProducts: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShowProducts }) => {
  return (
    <section className="relative w-full h-[80vh] flex items-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0 z-0 opacity-40">
        <div 
          className="w-full h-full bg-cover bg-center scale-105 animate-pulse-slow"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjvuLveSKuklVHKHXdAqdwk7BnZYYyQt9fleghsce6P4lhoCYnFicETTiJcmESUvb6hnC9Xkht8VjhAAyupXuyTknjNBiHygLzgKpJW8WJdJgGQSt4ZVTIoR65Ud2zi49d-Nbcj3jmINNVRFtSXzkAVCjeqegrYP6ZKO8qRv6ofyOupShaqucjpSucy30ghmhQZxTkl86jSiVfo7XjZ5Xdx_mF-_HbqWLzcTzD31Ak4bCTq643GEoXtjqJ2pHPCYTXhQ69WnCcMAc")' }}
        ></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent z-10" />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-20 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-[10px] font-bold tracking-[0.2em] mb-8 uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Lab Infrastructure Expert
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight text-white">
            一站式实验室<br /><span className="text-primary-500">构建专家</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-xl">
            精密、耐用、人体工学，为科研空间赋能。提供符合国际标准的整体实验室空间规划与高端家具定制。
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-10 py-5 rounded-2xl text-base font-bold flex items-center justify-center gap-3 transition-all shadow-2xl shadow-primary-500/30 active:scale-95">
              获取规划方案
              <span className="material-symbols-outlined">analytics</span>
            </button>
            <button 
              onClick={onShowProducts}
              className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-10 py-5 rounded-2xl text-base font-bold transition-all active:scale-95"
            >
              查看产品系列
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 20s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;
