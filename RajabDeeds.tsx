
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Moon, Star, BookOpen, Heart, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface RajabDeedsProps {
  onBack: () => void;
  lang: Language;
}

const rajabDeedsData = [
  {
    category: "أعمال عامة",
    items: [
      {
        title: "الاستغفار",
        description: "أن يقول في كلّ يوم سبعين مرّة صباحاً وسبعين مرّة مساءً: اَسْتَغْفِرُ اللهَ وَاَتُوبُ اِلَيْهِ، فإذا تمّت السبعون مرّة رفع يديه وقال: اَللّهُمَّ اغْفِرْ لي وَتُبْ عَلَيَّ."
      },
      {
        title: "دعاء يا مَنْ اَرْجُوهُ لِكُلِّ خَيْر",
        description: "يُستحبّ في كلّ يوم من رجب أن يُدعى بهذا الدّعاء: يا مَنْ اَرْجُوهُ لِكُلِّ خَيْر، وَآمَنُ سَخَطَهُ عِنْدَ كُلِّ شَرٍّ، يا مَنْ يُعْطِي الْكَثيرَ بِالْقَليلِ، يا مَنْ يُعْطي مَنْ سَأَلَهُ يا مَنْ يُعْطي مَنْ لَمْ يَسْأَلْهُ وَمَنْ لَمْ يَعْرِفْهُ تَحَنُّناً مِنْهُ وَرَحْمَةً..."
      },
      {
        title: "الاستغفار (ألف مرة)",
        description: "أن يستغفر الله تعالى في هذا الشهر ألف مرّة لِيغفر الله له، روي أنّ مَن قال في رجب: اَسْتَغْفِرُ اللهَ ذَا الْجَلالِ وَالاْكْرامِ مِنْ جَميعِ الذُّنُوبِ وَالآثامِ، غفر الله له."
      }
    ]
  },
  {
    category: "أعمال الأيام الخاصة",
    items: [
      {
        title: "الليلة الأولى",
        description: "وهي ليلة شريفة، ويستحب فيها الغسل، وإحياؤها بالعبادة، وزيارة الحسين (عليه السلام)."
      },
      {
        title: "اليوم الأول",
        description: "وهو يوم شريف، ويستحب فيه الصيام، فقد روي أن نوحاً (عليه السلام) ركب السفينة في هذا اليوم فأمر مَن معه بالصيام، وزيارة الحسين (عليه السلام)."
      },
      {
        title: "ليلة الرغائب",
        description: "وهي أول ليلة جمعة من شهر رجب، ولها فضل كبير، ويستحب فيها صيام يوم الخميس الذي يسبقها ثم صلاة اثنتي عشرة ركعة بين صلاتي المغرب والعشاء."
      },
      {
        title: "المبعث النبوي (27 رجب)",
        description: "وهو من الأعياد العظيمة، ويستحب فيه الغسل، والصيام، والإكثار من الصلاة على محمد وآل محمد، وزيارة النبي (صلى الله عليه وآله) وأمير المؤمنين (عليه السلام)."
      }
    ]
  }
];

const RajabDeeds: React.FC<RajabDeedsProps> = ({ onBack, lang }) => {
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
          <h2 className="text-xl font-bold quran-text">{t.rajabDeeds}</h2>
        </div>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-50 dark:bg-slate-900 dark:border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Moon size={120} fill="currentColor" className="text-emerald-900" />
          </div>
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
               <Sparkles size={18} />
               <span className="font-bold text-sm uppercase tracking-widest">شهر الله الأصب</span>
            </div>
            <h3 className="text-xl font-black text-gray-800 dark:text-slate-100">أعمال وعبادات شهر رجب</h3>
            <p className="text-xs text-gray-500 leading-relaxed dark:text-slate-400">
              رجب هو شهر عظيم من أشهر العبادة، ويُسمى "الأصب" لأن رحمة الله تصب فيه على عباده صباً. إليك أهم الأعمال الواردة في مفاتيح الجنان وغيرها من الكتب المعتبرة.
            </p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {rajabDeedsData.map((cat, idx) => (
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
          {rajabDeedsData[activeCategory].items.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white p-5 rounded-[2rem] shadow-sm border border-emerald-50 dark:bg-slate-900 dark:border-slate-800 animate-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <Star size={20} fill="currentColor" />
                </div>
                <h4 className="font-black text-emerald-900 dark:text-emerald-400 quran-text text-lg">{item.title}</h4>
              </div>
              <p className="quran-text text-xl leading-relaxed text-gray-700 dark:text-slate-200 text-right" dir="rtl">
                {item.description}
              </p>
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
              <p className="text-xs font-medium leading-relaxed">المعلومات مأخوذة من كتاب مفاتيح الجنان للشيخ عباس القمي (قده).</p>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-700 rounded-full opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default RajabDeeds;
