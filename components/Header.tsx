
import React from 'react';

const Header: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={onReset}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900 hidden sm:block">الموسوعة العلمية الذكية</h1>
        </div>
        
        <nav className="flex items-center gap-4">
          <button 
            onClick={onReset}
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            بحث جديد
          </button>
          <div className="h-4 w-px bg-slate-200"></div>
          <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full font-bold">بواسطة Gemini</span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
