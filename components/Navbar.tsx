
import React from 'react';
import { ViewType } from '../types';

interface NavbarProps {
  onNavChange: (view: ViewType) => void;
  currentView: ViewType;
}

const Navbar: React.FC<NavbarProps> = ({ onNavChange, currentView }) => {
  const navItems = [
    { label: '首页', id: 'HOME' as ViewType },
    { label: '产品中心', id: 'PRODUCTS' as ViewType },
    { label: '技术支持', id: 'SUPPORT' as ViewType },
    { label: '工程案例', id: 'CASES' as ViewType },
    { label: '关于我们', id: 'ABOUT' as ViewType },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavChange('HOME')}
          >
            <div className="bg-primary-500 p-2 rounded-lg text-white shadow-lg shadow-primary-500/30">
              <span className="material-symbols-outlined block text-[24px]">science</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">思源实验空间</h1>
              <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">LabDesign Pro</p>
            </div>
          </div>
          
          <nav className="hidden xl:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavChange(item.id)}
                className={`text-sm font-bold transition-all relative py-2 ${
                  currentView === item.id 
                    ? 'text-primary-500' 
                    : 'text-slate-600 hover:text-primary-500'
                }`}
              >
                {item.label}
                {currentView === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px] pointer-events-none">search</span>
            <input 
              className="w-64 h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none" 
              placeholder="搜索实验台、通风柜..." 
              type="text"
            />
          </div>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 h-11 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary-500/20 active:scale-95">
            <span className="material-symbols-outlined text-[18px]">contact_support</span>
            立即询价
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
