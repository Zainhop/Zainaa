
import React from 'react';
import { ArticleOutline } from '../types';

interface ArticleCardProps {
  outline: ArticleOutline;
  isSelected: boolean;
  onClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ outline, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`group cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
        isSelected 
          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 translate-x-1' 
          : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
          isSelected ? 'bg-indigo-500/50 text-white' : 'bg-slate-100 text-slate-500'
        }`}>
          {outline.category}
        </span>
      </div>
      <h3 className={`text-xl font-bold mb-2 leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
        {outline.title}
      </h3>
      <p className={`text-sm line-clamp-2 ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
        {outline.summary}
      </p>
      
      <div className="mt-4 flex items-center gap-2">
        <span className={`text-sm font-bold flex items-center gap-1 ${isSelected ? 'text-white' : 'text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity'}`}>
          قراءة المقال
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default ArticleCard;
