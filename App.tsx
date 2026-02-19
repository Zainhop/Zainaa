
import React, { useState, useCallback, useEffect } from 'react';
import { EncyclopediaState, ArticleOutline, ArticleContent } from './types';
import { generateEncyclopediaOutline, generateArticleDetail, generateArticleImage } from './services/geminiService';
import Header from './components/Header';
import SearchHero from './components/SearchHero';
import ArticleCard from './components/ArticleCard';
import ArticleView from './components/ArticleView';

const App: React.FC = () => {
  const [state, setState] = useState<EncyclopediaState>({
    topic: '',
    outlines: [],
    selectedArticleId: null,
    currentArticleContent: null,
    loading: false,
    generatingArticle: false,
    error: null,
  });

  const handleSearch = async (topic: string) => {
    setState(prev => ({ ...prev, loading: true, topic, error: null, outlines: [], selectedArticleId: null, currentArticleContent: null }));
    try {
      const outlines = await generateEncyclopediaOutline(topic);
      setState(prev => ({ ...prev, loading: false, outlines }));
      
      // Auto-load the first article
      if (outlines.length > 0) {
        handleArticleSelect(outlines[0]);
      }
    } catch (error: any) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
    }
  };

  const handleArticleSelect = async (outline: ArticleOutline) => {
    setState(prev => ({ 
      ...prev, 
      selectedArticleId: outline.id, 
      generatingArticle: true,
      currentArticleContent: null 
    }));

    try {
      const [content, imageUrl] = await Promise.all([
        generateArticleDetail(state.topic, outline),
        generateArticleImage(outline.title)
      ]);

      setState(prev => ({ 
        ...prev, 
        generatingArticle: false, 
        currentArticleContent: { ...content, imageUrl } 
      }));
    } catch (error: any) {
      setState(prev => ({ ...prev, generatingArticle: false, error: error.message }));
    }
  };

  const handleReset = () => {
    setState({
      topic: '',
      outlines: [],
      selectedArticleId: null,
      currentArticleContent: null,
      loading: false,
      generatingArticle: false,
      error: null,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onReset={handleReset} />

      <main className="flex-1 overflow-x-hidden">
        {!state.topic ? (
          <SearchHero onSearch={handleSearch} isLoading={state.loading} />
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-2">
                <button 
                  onClick={handleReset}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-3xl font-bold text-slate-900">
                  موسوعة: <span className="text-indigo-600">{state.topic}</span>
                </h2>
              </div>
              <p className="text-slate-500 mr-12">اختر أحد الأقسام أدناه لاستكشاف الموضوع بالتفصيل.</p>
            </div>

            {state.error && (
              <div className="bg-red-50 border-r-4 border-red-500 p-4 mb-8 text-red-700">
                <p className="font-bold">حدث خطأ</p>
                <p>{state.error}</p>
                <button 
                  onClick={() => handleSearch(state.topic)}
                  className="mt-2 text-sm font-bold underline"
                >
                  إعادة المحاولة
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sidebar Articles List */}
              <div className="lg:col-span-4 space-y-4">
                {state.loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-32 bg-slate-100 rounded-2xl animate-pulse"></div>
                  ))
                ) : (
                  state.outlines.map((outline) => (
                    <ArticleCard
                      key={outline.id}
                      outline={outline}
                      isSelected={state.selectedArticleId === outline.id}
                      onClick={() => handleArticleSelect(outline)}
                    />
                  ))
                )}
              </div>

              {/* Main Content View */}
              <div className="lg:col-span-8">
                {state.currentArticleContent ? (
                  <ArticleView 
                    content={state.currentArticleContent} 
                    isLoading={state.generatingArticle} 
                  />
                ) : state.generatingArticle ? (
                  <ArticleView content={{} as any} isLoading={true} />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm min-h-[400px]">
                    <div className="w-20 h-20 bg-indigo-50 text-indigo-400 rounded-full flex items-center justify-center mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">اختر فصلاً للبدء</h3>
                    <p className="text-slate-500">تم تقسيم موضوعك إلى عدة محاور علمية، انقر على أحدها في القائمة الجانبية للعرض.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-4">الموسوعة العلمية الذكية - مدعومة بالذكاء الاصطناعي</p>
          <p className="text-xs opacity-50">جميع الحقوق محفوظة &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
