
import React, { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
}

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        setCategories(data.categories);
      } catch (err) {
        setError('Failed to load categories. Please try again later.');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const categoryIcons: Record<string, string> = {
    '全钢实验台': 'table_chart',
    '通风柜系统': 'air_purifier',
    '药品存储柜': 'kitchen',
    '配套设施': 'architecture',
  };

  const materials = ['实芯理化板', '环氧树脂板', '全钢结构', 'PP抗强腐蚀'];

  return (
    <aside className="w-full lg:w-80 shrink-0 bg-white border-r border-slate-200 p-8">
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">产品目录分类</h2>
          <div className="flex flex-col gap-2">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="text-slate-500">Loading categories...</div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-40">
                <div className="text-rose-500">{error}</div>
              </div>
            ) : (
              categories.map((cat) => (
                <div key={cat.name} className="flex flex-col gap-1">
                  <button 
                    onClick={() => onCategoryChange(cat.name)}
                    className={`w-full flex items-center justify-between py-3 px-4 rounded-xl transition-all ${
                      activeCategory === cat.name 
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20 font-bold' 
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-[20px] ${activeCategory === cat.name ? 'text-white' : 'text-slate-400'}`}>
                        {categoryIcons[cat.name] || 'category'}
                      </span>
                      <span className="text-sm">{cat.name}</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-300 text-[18px]">chevron_right</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">按材质筛选</h2>
          <div className="flex flex-wrap gap-2">
            {materials.map((m) => (
              <button 
                key={m}
                className="px-4 py-2 bg-white rounded-lg text-xs font-bold text-slate-600 border border-slate-200 hover:border-primary-500 hover:text-primary-500 transition-all shadow-sm"
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 p-6 rounded-2xl bg-primary-50 border border-primary-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
          <p className="text-[10px] font-bold text-primary-500 uppercase tracking-widest mb-3">专业服务</p>
          <h3 className="text-base font-bold text-slate-800 leading-tight mb-4">
            实验室整体规划<br />免费三维方案设计
          </h3>
          <button className="w-full bg-white border border-slate-200 text-slate-900 py-3 rounded-xl text-xs font-bold hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all shadow-sm relative z-10">
            立即预约
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
