
import React from 'react';
import { ArticleContent } from '../types';

interface ArticleViewProps {
  content: ArticleContent;
  isLoading: boolean;
}

const ArticleView: React.FC<ArticleViewProps> = ({ content, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-200 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-3/4 mb-8"></div>
        <div className="aspect-video bg-slate-100 rounded-2xl mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-2/3"></div>
        </div>
        <div className="mt-12 space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/4"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-slate-200">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-8 leading-tight serif-font">
        {content.title}
      </h1>

      {content.imageUrl && (
        <div className="mb-10 rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200">
          <img src={content.imageUrl} alt={content.title} className="w-full h-auto object-cover" />
        </div>
      )}

      <div className="prose prose-slate prose-lg max-w-none">
        {content.sections.map((section, idx) => (
          <div key={idx} className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-r-4 border-indigo-600 pr-4">
              {section.heading}
            </h2>
            <div className="text-slate-600 leading-relaxed text-justify serif-font text-xl whitespace-pre-wrap">
              {section.content}
            </div>
          </div>
        ))}
      </div>

      <div className="my-12 p-8 bg-slate-50 rounded-2xl border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          حقائق سريعة
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.facts.map((fact, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-700 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                {idx + 1}
              </span>
              <span className="text-sm font-medium">{fact}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-100">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">الخاتمة</h3>
        <p className="text-slate-600 italic leading-relaxed text-lg serif-font">
          {content.conclusion}
        </p>
      </div>
    </article>
  );
};

export default ArticleView;
