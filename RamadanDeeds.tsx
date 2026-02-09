
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Moon, Star, BookOpen, Heart, Sparkles, Sun, Coffee, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface RamadanDeedsProps {
  onBack: () => void;
  lang: Language;
  onViewSupplication: (id: string) => void;
}

const ramadanDeedsData = [
  {
    category: "أعمال عامة",
    items: [
      {
        id: "iftar",
        title: "دعاء الإفطار",
        description: "يستحب أن يقول عند الإفطار: (اَللّـهُمَّ لَكَ صُمْتُ، وَعَلى رِزْقِكَ اَفْطَرْتُ، وَعَلَيْكَ تَوَكَّلْتُ)، ليُعطى ثواب كل من صام ذلك اليوم."
      },
      {
        id: "quran",
        title: "تلاوة القرآن الكريم",
        description: "يستحب الإكثار من تلاوة القرآن، ففي الخبر: (إن لكل شيء ربيعاً، وربيع القرآن هو شهر رمضان). ويستحب ختم القرآن مرة واحدة على الأقل."
      },
      {
        id: "suhoor",
        title: "أدعية السحر",
        description: "وهي أدعية جليلة تُقرأ في وقت السحر، ومن أشهرها دعاء البهاء: (اَللّـهُمَّ اِنّي اَسْاَلُكَ مِنْ بَهائِكَ بِاَبْهاهُ وَكُلُّ بَهائِكَ بَهِيٌّ...) ودعاء أبي حمزة الثمالي."
      }
    ]
  },
  {
    category: "أدعية الليالي",
    items: [
      {
        id: "iftitah",
        title: "دعاء الافتتاح",
        description: "يُستحب قراءة دعاء الافتتاح في كل ليلة من ليالي شهر رمضان: (اَللّـهُمَّ اِنّي اَفْتَتِحُ الثَّناءَ بِحَمْدِكَ، وَاَنْتَ مُسَدِّدٌ لِلصَّوابِ بِمَّنِكَ...).",
        hasFullText: true
      },
      {
        id: "hajj",
        title: "دعاء الحج",
        description: "يُستحب قراءة هذا الدعاء في كل ليلة: (اَللّـهُمَّ ارْزُقْني حَجَّ بَيْتِكَ الْحَرامِ في عامي هذا وَفي كُلِّ عام...).",
        hasFullText: true
      }
    ]
  },
  {
    category: "ليالي القدر",
    items: [
      {
        id: "laylat_qadr",
        title: "أعمال عامة",
        description: "الغسل عند غروب الشمس، الصلاة ركعتين في كل ركعة الحمد والتوحيد (7 مرات)، رفع المصاحف والدعاء بأسماء المعصومين، وزيارة الإمام الحسين (ع)."
      },
      {
        id: "jawshan",
        title: "دعاء الجوشن الكبير",
        description: "يُستحب قراءة دعاء الجوشن الكبير في ليالي القدر، وهو مئة فصل يحتوي على ألف اسم من أسماء الله تعالى.",
        hasFullText: true
      }
    ]
  }
];

const RamadanDeeds: React.FC<RamadanDeedsProps> = ({ onBack, lang, onViewSupplication }) => {
  const t = translations[lang];
  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col dark:bg-slate-950 animate-in fade-in duration-300">
      <header className="bg-emerald-800 text-white p-4 sticky top-0 z-10 flex items-center shadow-md dark:bg-emerald-950">
        <button onClick={onBack} className={`${lang === 'ar' ? 'ml-4' : 'mr-4'} p-1`}>
          <BackIcon />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-xl font-bold quran-text">{t.ramadanDeeds}</h2>
        </div>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-50 dark:bg-slate-900 dark:border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Moon size={120} fill="currentColor" className="text-emerald-900" />
          </div>
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
               <Sparkles size={18} />
               <span className="font-bold text-sm uppercase tracking-widest">شهر ضيافة الله</span>
            </div>
            <h3 className="text-xl font-black text-gray-800 dark:text-slate-100">أعمال وعبادات شهر رمضان</h3>
            <p className="text-xs text-gray-500 leading-relaxed dark:text-slate-400">
              شهر رمضان هو أفضل الشهور عند الله، أنفاسكم فيه تسبيح، ونومكم فيه عبادة. إليك خلاصة الأعمال العبادية لهذا الشهر المبارك.
            </p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {ramadanDeedsData.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`px-6 py-2 rounded-full whitespace-nowrap font-bold text-xs transition-all ${activeCategory === idx ? 'bg-emerald-800 text-white shadow-md dark:bg-emerald-700' : 'bg-white text-gray-400 border border-gray-100 dark:bg-slate-900 dark:border-slate-800'}`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {ramadanDeedsData[activeCategory].items.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white p-5 rounded-[2rem] shadow-sm border border-emerald-50 dark:bg-slate-900 dark:border-slate-800 animate-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <Star size={20} fill="currentColor" />
                  </div>
                  <h4 className="font-black text-emerald-900 dark:text-emerald-400 quran-text text-lg">{item.title}</h4>
                </div>
                {item.hasFullText && (
                  <button 
                    onClick={() => onViewSupplication(item.id)}
                    className="p-2 bg-emerald-800 text-white rounded-xl shadow-sm active:scale-90 transition dark:bg-emerald-700"
                  >
                    <ExternalLink size={16} />
                  </button>
                )}
              </div>
              <p className="quran-text text-xl leading-relaxed text-gray-700 dark:text-slate-200 text-right" dir="rtl">
                {item.description}
              </p>
              {item.hasFullText && (
                <button 
                  onClick={() => onViewSupplication(item.id)}
                  className="mt-4 w-full py-2 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-100 flex items-center justify-center gap-2 hover:bg-emerald-100 transition dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
                >
                  قراءة الدعاء كاملاً
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-emerald-800 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden dark:bg-emerald-950">
          <div className="relative z-10 flex items-center gap-4">
            <div className="p-3 bg-emerald-700 rounded-2xl dark:bg-emerald-900">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest mb-1">المصدر</p>
              <p className="text-xs font-medium leading-relaxed">المعلومات مأخوذة من كتاب مفاتيح الجنان وأعمال الشهور المعتبرة.</p>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-700 rounded-full opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default RamadanDeeds;
