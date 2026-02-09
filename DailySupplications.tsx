
import React from 'react';
import { ArrowLeft, ArrowRight, Heart, Share2, Copy } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface DailySupplicationsProps {
  onBack: () => void;
  lang: Language;
  dayIndex: number;
}

const DailySupplications: React.FC<DailySupplicationsProps> = ({ onBack, lang, dayIndex }) => {
  const t = translations[lang];
  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  
  // نفترض وجود البيانات في مكان ما، سنستخدم مثالاً واحداً للاختصار
  const dua = {
    title: t.dailyDuas,
    content: "اَلْحَمْدُ للهِ الَّذى لَمْ يُشْهِدْ اَحَداً حينَ فَطَرَ السَّمواتِ وَالاَرْضَ، وَلاَ اتَّخَذَ مُعيناً حينَ بَرَأَ النَّسَماتِ..."
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(dua.content);
    alert(lang === 'ar' ? "تم نسخ النص بنجاح" : "Text copied successfully");
  };

  return (
    <div className="min-h-screen flex flex-col animate-in fade-in duration-500">
      <header className="bg-emerald-950/40 backdrop-blur-xl text-white p-6 pt-12 rounded-b-[3.5rem] sticky top-0 z-50 flex items-center border-b border-white/20 shadow-2xl">
        <button onClick={onBack} className={`${lang === 'ar' ? 'ml-4' : 'mr-4'} p-2 bg-white/10 rounded-2xl active:scale-90`}>
          <BackIcon size={24} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-2xl font-black text-amber-200 drop-shadow-lg quran-text">{dua.title}</h2>
        </div>
        <div className="flex gap-2">
            <button onClick={handleCopy} className="p-2 bg-white/10 rounded-2xl active:scale-90">
                <Copy size={20} />
            </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-10 pb-32">
        <div className="bg-white/20 backdrop-blur-2xl rounded-[3.5rem] p-8 border border-white/30 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden">
           <p className="quran-text text-3xl leading-[2.4] text-right text-white drop-shadow-xl" dir="rtl">
             {dua.content}
           </p>
           <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center gap-4">
             <button onClick={handleCopy} className="bg-amber-500 text-white px-10 py-4 rounded-[2rem] font-black shadow-2xl active:scale-95 transition-all flex items-center gap-3">
                <Copy size={20} />
                {lang === 'ar' ? 'نسخ الدعاء' : 'Copy Dua'}
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DailySupplications;
