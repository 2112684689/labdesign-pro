
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-20 border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary-500 p-2 rounded-lg text-white">
              <span className="material-symbols-outlined block text-[24px]">science</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white uppercase">思源实验空间</h2>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            专注科研空间环境建设，提供从规划、设计、制造到安装的全流程专业化服务。
          </p>
          <div className="flex gap-4">
            {['hub', 'alternate_email', 'phone_in_talk'].map((icon) => (
              <button key={icon} className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-500 transition-all border border-slate-800">
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-10">产品系列</h3>
          <ul className="text-sm space-y-4">
            <li><a className="hover:text-primary-500 transition-colors" href="#">全钢实验台系列</a></li>
            <li><a className="hover:text-primary-500 transition-colors" href="#">通风柜排放系统</a></li>
            <li><a className="hover:text-primary-500 transition-colors" href="#">试剂存储管理系统</a></li>
            <li><a className="hover:text-primary-500 transition-colors" href="#">洁净室配套设施</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-10">服务支持</h3>
          <ul className="text-sm space-y-4">
            <li><a className="hover:text-primary-500 transition-colors" href="#">3D 数字化空间规划</a></li>
            <li><a className="hover:text-primary-500 transition-colors" href="#">旧实验室改造方案</a></li>
            <li><a className="hover:text-primary-500 transition-colors" href="#">实验室安全检测维保</a></li>
            <li><a className="hover:text-primary-500 transition-colors" href="#">材质性能白皮书</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-10">联系总部</h3>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-primary-500 text-[20px] shrink-0 mt-0.5">distance</span>
              <p className="text-sm leading-relaxed">上海市浦东新区张江高科园区智造科研基地 128 号</p>
            </div>
            <div className="flex gap-4 items-center">
              <span className="material-symbols-outlined text-primary-500 text-[20px] shrink-0">support_agent</span>
              <p className="text-lg text-white font-bold tracking-tight">400-820-XXXX</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mt-20 pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-slate-500">© 2024 思源实验室家具基础设施. 沪ICP备XXXXXXXX号</p>
        <div className="flex gap-10 text-xs font-bold text-slate-500">
          <a className="hover:text-white transition-colors" href="#">隐私政策</a>
          <a className="hover:text-white transition-colors" href="#">使用条款</a>
          <a className="hover:text-white transition-colors" href="#">站点地图</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
