
import React, { useState } from 'react';

interface SearchHeroProps {
  onSearch: (topic: string) => void;
  isLoading: boolean;
}

const SearchHero: React.FC<SearchHeroProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSearch(input.trim());
    }
  };

  const suggestions = ["الثقوب السوداء", "الذكاء الاصطناعي", "تاريخ الحضارة الأندلسية", "فيزياء الكم", "تغير المناخ"];

  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-slate-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
          <svg aria-hidden="true" className="h-full w-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M.5 40V.5H40" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
          استكشف المعرفة بأبعاد <span className="text-indigo-600">جديدة</span>
        </h2>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          أدخل أي موضوع علمي أو تاريخي، وسيقوم محركنا الذكي بإنشاء موسوعة كاملة مفصلة من أجلك في ثوانٍ.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="مثلاً: الثقوب السوداء في الكون..."
            className="w-full pl-32 pr-6 py-5 bg-white border border-slate-200 rounded-2xl shadow-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 text-lg transition-all outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute left-2 top-2 bottom-2 px-8 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'توليد'
            )}
          </button>
        </form>

        <div className="flex flex-wrap justify-center gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setInput(s)}
              className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
