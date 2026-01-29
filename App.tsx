
import React, { useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import { ViewType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('PRODUCTS');
  const [activeCategory, setActiveCategory] = useState<string>('全部');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavChange={setCurrentView} currentView={currentView} />
      
      <main className="flex-grow">
        {currentView === 'HOME' ? (
          <Hero onShowProducts={() => setCurrentView('PRODUCTS')} />
        ) : (
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row">
            <Sidebar 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
            <div className="flex-1 bg-slate-50/50 p-6 lg:p-10">
              <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 whitespace-nowrap">应用领域:</span>
                  {['全部类型', '生物实验室', '化学实验室', '物理实验室'].map((area) => (
                    <button 
                      key={area}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                        area === '全部类型' 
                          ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                          : 'text-slate-600 hover:bg-white border border-transparent hover:border-slate-200'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-500 whitespace-nowrap">
                  <span>显示 1-12 之 48 个产品</span>
                  <div className="w-px h-4 bg-slate-300"></div>
                  <button className="flex items-center gap-1 hover:text-primary-500 transition-colors">
                    综合推荐
                    <span className="material-symbols-outlined text-[16px]">expand_more</span>
                  </button>
                </div>
              </div>
              
              <ProductGrid activeCategory={activeCategory} />
              
              {/* Pagination */}
              <div className="mt-16 flex items-center justify-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 hover:border-primary-500 hover:text-primary-500 transition-all shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">west</span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-900 text-white font-bold shadow-lg shadow-slate-900/20">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-transparent hover:border-slate-200 text-slate-600 font-bold transition-all">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-transparent hover:border-slate-200 text-slate-600 font-bold transition-all">3</button>
                <span className="px-2 text-slate-400">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-transparent hover:border-slate-200 text-slate-600 font-bold transition-all">10</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 hover:border-primary-500 hover:text-primary-500 transition-all shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">east</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <SpeedInsights />
    </div>
  );
};

export default App;
