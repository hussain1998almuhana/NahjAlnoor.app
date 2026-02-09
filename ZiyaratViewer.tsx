
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, Search, BookOpen } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface ZiyaratViewerProps {
  onBack: () => void;
  lang: Language;
}

const ziyaratData = [
  {
    id: 1,
    title: "زيارة عاشوراء",
    content: "اَلسَّلامُ عَلَيْكَ يا اَبا عَبْدِاللهِ، اَلسَّلامُ عَلَيْكَ يَا بْنَ رَسُولِ اللهِ، اَلسَّلامُ عَلَيْكَ يَا بْنَ اَميرِ الْمُؤْمِنينَ وَابْنَ سَيِّدِ الْوَصِيّينَ، اَلسَّلامُ عَلَيْكَ يَا بْنَ فاطِمَةَ سَيِّدَةِ نِساءِ الْعالَمينَ، اَلسَّلامُ عَلَيْكَ يا ثارَ اللهِ وَابْنَ ثارِهِ وَالْوِتْرَ الْمَوْتُورَ..."
  },
  {
    id: 2,
    title: "زيارة أمين الله",
    content: "اَلسَّلامُ عَلَيْكَ يا اَمينَ اللهِ في اَرْضِهِ، وَحُجَّتَهُ عَلى عِبادِهِ، اَلسَّلامُ عَلَيْكَ يا اَميرَ الْمُؤْمِنينَ، اَشْهَدُ اَنَّكَ جاهَدْتَ فِي اللهِ حَقَّ جِهادِهِ، وَعَمِلْتَ بِكِتابِهِ، وَاتَّبَعْتَ سُنَنَ نَبِيِّهِ صَلَّى اللهُ عَلَيْهِ وَآلِهِ..."
  },
  {
    id: 3,
    title: "زيارة آل يس",
    content: "سَلامٌ عَلى آلِ يس، اَلسَّلامُ عَلَيْكَ يا داعِيَ اللهِ وَرَبّانِيَّ آياتِهِ، اَلسَّلامُ عَلَيْكَ يا بابَ اللهِ وَدَيّانَ دينِهِ، اَلسَّلامُ عَلَيْكَ يا خَليفَةَ اللهِ وَناصِرَ حَقِّهِ، اَلسَّلامُ عَلَيْكَ يا حُجَّةَ اللهِ وَدَليلَ اِرادَتِهِ..."
  },
  {
    id: 4,
    title: "زيارة وارث",
    content: "اَلسَّلامُ عَلَيْكَ يا وارِثَ آدَمَ صَفْوَةِ اللهِ، اَلسَّلامُ عَلَيْكَ يا وارِثَ نُوحٍ نَبِيِّ اللهِ، اَلسَّلامُ عَلَيْكَ يا وارِثَ اِبْراهيمَ خَليلِ اللهِ، اَلسَّلامُ عَلَيْكَ يا وارِثَ مُوسى كَليمِ اللهِ، اَلسَّلامُ عَلَيْكَ يا وارِثَ عيسى رُوحِ اللهِ..."
  },
  {
    id: 5,
    title: "زيارة الجامعة الكبيرة",
    content: "اَلسَّلامُ عَلَيْكُمْ يا اَهْلَ بَيْتِ النُّبُوَّةِ، وَمَوْضِعَ الرِّسالَةِ، وَمُخْتَلَفَ الْمَلائِكَةِ، وَمَهْبِطَ الْوَحْيِ، وَمَعْدِنَ الرَّحْمَةِ، وَخُزّانَ الْعِلْمِ، وَمُنْتَهَى الْحِلْمِ، وَاُصُولَ الْكَرَمِ، وَقادَةَ الاُمَمِ، وَاَوْلِياءَ النِّعَمِ..."
  }
];

const ZiyaratViewer: React.FC<ZiyaratViewerProps> = ({ onBack, lang }) => {
  const [selectedZiyarat, setSelectedZiyarat] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const t = translations[lang];
  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;

  const filtered = ziyaratData.filter(z => 
    z.title.includes(searchTerm) || z.content.includes(searchTerm)
  );

  if (selectedZiyarat !== null) {
    const item = ziyaratData.find(z => z.id === selectedZiyarat);
    return (
      <div className="bg-white min-h-screen flex flex-col dark:bg-slate-950 animate-in fade-in duration-300">
        <header className="bg-emerald-800 text-white p-4 sticky top-0 z-10 flex items-center shadow-md dark:bg-emerald-950">
          <button onClick={() => setSelectedZiyarat(null)} className={`${lang === 'ar' ? 'ml-4' : 'mr-4'} p-1`}>
            <BackIcon />
          </button>
          <div className="flex-1 text-center">
            <h2 className="text-xl font-bold quran-text">{item?.title}</h2>
          </div>
          <div className="w-10"></div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-24">
          <div className="bg-white p-6 rounded-3xl border border-emerald-50 dark:bg-slate-900 dark:border-slate-800 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-2 h-20 bg-emerald-500 rounded-bl-full opacity-30"></div>
             <p className="quran-text text-2xl leading-relaxed text-right text-gray-800 dark:text-slate-100 selection:bg-emerald-100" dir="rtl">
               {item?.content}
             </p>
             <div className="mt-10 pt-6 border-t border-gray-50 dark:border-slate-800 flex justify-center">
               <Heart className="text-red-500 opacity-20" size={24} fill="currentColor" />
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 pb-24 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
           <Heart className="text-emerald-700 dark:text-emerald-400" fill="currentColor" size={24} />
           <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-400">{t.ziyaratTitle}</h2>
        </div>
        <button onClick={onBack} className="text-emerald-700 font-medium bg-emerald-50 px-4 py-1 rounded-full dark:bg-emerald-900/30 dark:text-emerald-400">{t.back}</button>
      </div>

      <div className="relative">
        <Search className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-3 text-gray-400`} size={18} />
        <input 
          type="text" 
          placeholder={lang === 'ar' ? 'ابحث عن زيارة...' : 'Search for Ziyarat...'}
          className={`w-full bg-white ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 rounded-2xl border border-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-3">
        {filtered.map((ziyarat) => (
          <button 
            key={ziyarat.id} 
            onClick={() => setSelectedZiyarat(ziyarat.id)}
            className="w-full bg-white p-5 rounded-3xl shadow-sm border border-emerald-50 flex items-center justify-between hover:bg-emerald-50 transition active:scale-[0.98] dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-800 font-bold dark:bg-emerald-900/30 dark:text-emerald-400">
                <BookOpen size={20} />
              </div>
              <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                <h4 className="font-bold text-gray-800 dark:text-slate-100 quran-text text-lg leading-tight">{ziyarat.title}</h4>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center dark:bg-slate-800">
               <ArrowLeft size={16} className={`${lang === 'ar' ? '' : 'rotate-180'} text-emerald-700 dark:text-emerald-400`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ZiyaratViewer;
