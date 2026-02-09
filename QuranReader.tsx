
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Search, Book, Bookmark, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { Surah, Ayah, Language } from '../types';
import { translations } from '../translations';

interface QuranReaderProps {
  onBack: () => void;
  lang: Language;
  isDarkMode?: boolean;
}

interface SavedBookmark {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  text: string;
}

const QuranReader: React.FC<QuranReaderProps> = ({ onBack, lang, isDarkMode }) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarks, setBookmarks] = useState<SavedBookmark[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  
  const t = translations[lang];

  useEffect(() => {
    fetchSurahs();
    const saved = localStorage.getItem('quran_bookmarks');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quran_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const fetchSurahs = async () => {
    try {
      const res = await fetch('https://api.alquran.cloud/v1/surah');
      const data = await res.json();
      setSurahs(data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const loadSurah = async (surah: Surah) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}`);
      const data = await res.json();
      setAyahs(data.data.ayahs);
      setSelectedSurah(surah);
      setLoading(false);
      setShowBookmarksOnly(false);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleAyahBookmark = (ayah: Ayah, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedSurah) return;
    const isSaved = bookmarks.some(b => b.surahNumber === selectedSurah.number && b.ayahNumber === ayah.numberInSurah);
    if (isSaved) {
      setBookmarks(prev => prev.filter(b => !(b.surahNumber === selectedSurah.number && b.ayahNumber === ayah.numberInSurah)));
    } else {
      setBookmarks(prev => [...prev, {
        surahNumber: selectedSurah.number,
        surahName: lang === 'ar' ? selectedSurah.name : selectedSurah.englishName,
        ayahNumber: ayah.numberInSurah,
        text: ayah.text
      }]);
    }
  };

  const isAyahBookmarked = (ayahNumber: number) => {
    if (!selectedSurah) return false;
    return bookmarks.some(b => b.surahNumber === selectedSurah.number && b.ayahNumber === ayahNumber);
  };

  const deleteBookmark = (surahNumber: number, ayahNumber: number) => {
    setBookmarks(prev => prev.filter(b => !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber)));
  };

  const goToBookmarkedSurah = (surahNum: number) => {
    const surah = surahs.find(s => s.number === surahNum);
    if (surah) {
      loadSurah(surah);
    }
  };

  const filteredSurahs = surahs.filter(s => 
    s.name.includes(searchTerm) || 
    s.englishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;

  if (selectedSurah) {
    return (
      <div className="min-h-screen flex flex-col animate-in fade-in duration-500 pb-20">
        <header className={`${isDarkMode ? 'bg-emerald-950/80 border-white/5' : 'bg-emerald-900/40 border-emerald-100'} backdrop-blur-xl text-white p-6 pt-12 rounded-b-[3.5rem] sticky top-0 z-50 flex items-center border-b shadow-2xl`}>
          <button onClick={() => setSelectedSurah(null)} className={`${lang === 'ar' ? 'ml-4' : 'mr-4'} p-2 bg-white/10 rounded-2xl active:scale-90`}>
            <BackIcon size={24} />
          </button>
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-black text-amber-200 drop-shadow-lg quran-text">{lang === 'ar' ? selectedSurah.name : selectedSurah.englishName}</h2>
            <p className="text-[10px] opacity-70 font-bold uppercase tracking-widest">{selectedSurah.numberOfAyahs} {t.ayahs}</p>
          </div>
          <div className="w-12"></div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
          {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
            <div className="text-center py-10 bg-white/10 backdrop-blur-md rounded-[3rem] border border-white/10 mb-8">
              <p className="quran-text text-4xl text-white leading-relaxed drop-shadow-xl">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          )}
          
          {loading ? (
             <div className="flex justify-center p-20"><Loader2 className="animate-spin text-white" size={40} /></div>
          ) : (
            ayahs.map((ayah) => (
              <div 
                key={ayah.number} 
                className={`group relative rounded-[2.5rem] p-6 border shadow-xl transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/20 border-white/20 backdrop-blur-xl'}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black tabular-nums shadow-lg ${isDarkMode ? 'bg-amber-400 text-black' : 'bg-emerald-900 text-amber-200'}`}>
                    {ayah.numberInSurah}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => toggleAyahBookmark(ayah, e)}
                      className={`p-3 rounded-2xl transition-all ${isAyahBookmarked(ayah.numberInSurah) ? 'bg-amber-500 text-white shadow-lg' : 'bg-white/10 text-white'}`}
                    >
                      <Bookmark size={20} fill={isAyahBookmarked(ayah.numberInSurah) ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
                <p className="quran-text text-3xl md:text-4xl leading-[2.2] text-right text-white drop-shadow-md select-text" dir="rtl">
                  {ayah.text}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 space-y-6 pb-32 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-3xl font-black drop-shadow-lg ${isDarkMode ? 'text-white' : 'text-emerald-950'}`}>{t.quranTitle}</h2>
        <button onClick={onBack} className={`font-bold backdrop-blur-md px-6 py-2 rounded-full border active:scale-95 ${isDarkMode ? 'text-amber-100 bg-white/10 border-white/10' : 'text-emerald-700 bg-white border-emerald-100 shadow-md'}`}>{t.back}</button>
      </div>

      <div className={`flex p-1.5 rounded-[2rem] border shadow-xl mb-4 transition-colors ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white/40 border-emerald-100'}`}>
        <button 
          onClick={() => setShowBookmarksOnly(false)}
          className={`flex-1 py-3 rounded-[1.5rem] text-sm font-black transition-all ${!showBookmarksOnly ? (isDarkMode ? 'bg-amber-400 text-black shadow-lg' : 'bg-emerald-600 text-white shadow-lg') : 'text-white/50'}`}
        >
          {t.allSurahs}
        </button>
        <button 
          onClick={() => setShowBookmarksOnly(true)}
          className={`flex-1 py-3 rounded-[1.5rem] text-sm font-black flex items-center justify-center gap-2 transition-all ${showBookmarksOnly ? (isDarkMode ? 'bg-amber-400 text-black shadow-lg' : 'bg-emerald-600 text-white shadow-lg') : 'text-white/50'}`}
        >
          <Bookmark size={16} fill={showBookmarksOnly ? "currentColor" : "none"} />
          {t.bookmarks}
          {bookmarks.length > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${isDarkMode ? 'bg-black text-amber-400' : 'bg-white text-emerald-600'}`}>
              {bookmarks.length}
            </span>
          )}
        </button>
      </div>

      {!showBookmarksOnly && (
        <div className="relative mb-6">
          <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-4 text-white/50`} size={20} />
          <input 
            type="text" 
            placeholder={t.searchSurah}
            className={`w-full backdrop-blur-xl text-white ${lang === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 rounded-[2rem] border shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder-white/30 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/20 border-white/20'}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div className="space-y-4">
        {showBookmarksOnly ? (
          bookmarks.length === 0 ? (
            <div className="py-24 text-center space-y-6">
              <Bookmark size={60} className="mx-auto text-white/20" />
              <p className="text-white/50 font-black text-lg">{t.noBookmarks}</p>
            </div>
          ) : (
            bookmarks.map((bookmark, idx) => (
              <div 
                key={`${bookmark.surahNumber}-${bookmark.ayahNumber}`}
                className={`p-6 rounded-[2.5rem] shadow-xl border space-y-4 animate-in slide-in-from-bottom-4 duration-500 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/40 border-white/20 backdrop-blur-xl'}`}
              >
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <button onClick={() => goToBookmarkedSurah(bookmark.surahNumber)} className="flex items-center gap-3 text-amber-200">
                    <Book size={20} />
                    <span className="font-black text-lg quran-text">{bookmark.surahName}</span>
                    <span className="text-[10px] bg-white/10 px-3 py-1 rounded-full">{bookmark.ayahNumber}</span>
                  </button>
                  <button onClick={() => deleteBookmark(bookmark.surahNumber, bookmark.ayahNumber)} className="p-2 text-white/30 hover:text-red-400 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
                <p className="quran-text text-2xl leading-relaxed text-right text-white drop-shadow-sm select-text" dir="rtl">
                  {bookmark.text}
                </p>
              </div>
            ))
          )
        ) : (
          filteredSurahs.map((surah) => (
            <button 
              key={surah.number} 
              onClick={() => loadSurah(surah)}
              className={`w-full p-5 rounded-[2rem] shadow-xl border flex items-center justify-between transition-all active:scale-[0.98] ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/20 border-white/20 hover:bg-white/30 backdrop-blur-xl'}`}
            >
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black shadow-lg ${isDarkMode ? 'bg-amber-400 text-black' : 'bg-emerald-900 text-amber-200'}`}>
                  {surah.number}
                </div>
                <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                  <h4 className="font-black text-white quran-text text-xl leading-tight">{lang === 'ar' ? surah.name : surah.englishName}</h4>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">{surah.englishName} • {surah.revelationType === 'Meccan' ? t.meccan : t.medinan}</p>
                </div>
              </div>
              <Book className="text-white/20" size={24} />
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default QuranReader;
