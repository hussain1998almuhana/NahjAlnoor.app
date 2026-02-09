
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Moon, Star, BookOpen, Heart, Sparkles, Sun } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface ShaabanDeedsProps {
  onBack: () => void;
  lang: Language;
}

const shaabanDeedsData = [
  {
    category: "أعمال عامة",
    items: [
      {
        title: "الاستغفار اليومي",
        description: "أن يستغفر الله في كل يوم سبعين مرّة قائلاً: (اَسْتَغْفِرُ اللهَ وَاَسْأَلُهُ التَّوْبَةَ). وأيضاً أن يقول: (اَسْتَغْفِرُ اللهَ الَّذي لا اِلـهَ اِلاّ هُوَ الرَّحْمنُ الرَّحيمُ الْحَيُّ الْقَيُّومُ وَاَتُوبُ اِلَيْهِ) سبعين مرّة."
      },
      {
        title: "الصدقة",
        description: "التصدّق في هذا الشهر ولو بنصف تمرة لِيحرّم الله جسده على النّار. فعن الصادق (عليه السلام) في فضل صوم شعبان قال: ما من عمل أفضل فيه من الصدقة والاستغفار."
      },
      {
        title: "الصلوات الشعبانية",
        description: "أن يقرأ عند الزوال من كلّ يوم من أيّام شعبان وفي ليلة النّصف منه هذه الصّلوات المرويّة عن السّجاد (عليه السلام): (اَللّـهُمَّ صَلِّ عَلى مُحَمَّد وَآلِ مُحَمَّد شَجَرَةِ النُّبُوَّةِ، وَمَوْضِعِ الرِّسالَةِ...)."
      },
      {
        title: "المناجاة الشعبانية",
        description: "وهي مناجاة جليلة القدر، رواها ابن خالويه عن أمير المؤمنين (عليه السلام) والأئمة من ولده، وهي من مفاخر التراث الروحي الشيعي."
      }
    ]
  },
  {
    category: "أيام مباركة",
    items: [
      {
        title: "3 شعبان (ولادة الإمام الحسين)",
        description: "يوم ولادة سيد الشهداء (عليه السلام)، ويستحب فيه الصوم، والدعاء المروي: (اَللّـهُمَّ اِنّي اَسْاَلُكَ بِحَقِّ الْمَوْلُودِ في هذَا الْيَوْمِ، الْمَوْعُودِ بِشَهادَتِهِ قَبْلَ اْستِهْلالِهِ وَوِلادَتِهِ...)."
      },
      {
        title: "4 شعبان (ولادة الإمام العباس)",
        description: "يوم ولادة قمر بني هاشم وساقي عطاشى كربلاء، ذكرت الروايات: إنّ اُمّ البنين رأت أمير المؤمنين (عليه ‌السلام) في بعض الأيّام أجلس أبا الفضل (عليه ‌السلام) على فخذه، وشمّر عن ساعديه، وقبَّلهما وبكى، فأدهشها الحال؛ لأنّها لم تكنْ تعهد صبيّاً بتلك الشمائل العلويّة ينظر إليه أبوه ويبكي من دون سبب ظاهر، ولمّا أوقفها أمير المؤمنين (عليه ‌السلام) على غامض القضاء وما يجري على يديه من القطع في نصرة الحسين (عليه ‌السلام) بكت وأعولت وشاركها مَن في الدار في الزفرة الحسرة، غير أن سيد الأوصياء بشّرها بمكانة ولدها العزيز عند الله جلّ شأنه، وأنه يعوضه عن يديه بجناحين يطير بهما مع الملائكة في الجنة كما جعل لجعفر بن أبي طالب. كما روي عن الإمام السجاد (ع): (إنَّ للعباس عند الله تبارك وتعالى منزلة يغبطه عليها جميع الشهداء يوم القيامة)."
      },
      {
        title: "5 شعبان (ولادة الإمام السجاد)",
        description: "يوم ولادة سيد الساجدين وزين العابدين الإمام علي بن الحسين (عليهما السلام)، وهو صاحب الصحيفة السجادية ومنبع الزهد والتقوى والعبادة."
      },
      {
        title: "11 شعبان (ولادة علي الأكبر)",
        description: "يوم ولادة علي الأكبر بن الحسين (عليه السلام)، الذي قال فيه أبوه الحسين (ع): (اللهم اشهد فقد برز إليهم غلام أشبه الناس خَلقاً وخُلقاً ومنطقاً برسولك، وكنا إذا اشتقنا إلى رؤية نبيك نظرنا إليه)."
      },
      {
        title: "15 شعبان (ليلة النصف)",
        description: "وهي ليلة عظيمة جداً، فيها وُلد الإمام المهدي (عج)، ويستحب فيها الغسل، وإحياؤها بالصلاة والدعاء، وزيارة الإمام الحسين (عليه السلام) وهي من أكد الأعمال فيها."
      },
      {
        title: "الأيام الثلاثة الأخيرة",
        description: "يستحب صيام الأيام الثلاثة الأخيرة من شعبان ووصلها بشهر رمضان، فقد روي أن من فعل ذلك كتب الله له صيام شهرين متتابعين."
      }
    ]
  }
];

const ShaabanDeeds: React.FC<ShaabanDeedsProps> = ({ onBack, lang }) => {
  const t = translations[lang];
  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col dark:bg-slate-950 animate-in fade-in duration-300">
      <header className="bg-blue-800 text-white p-4 sticky top-0 z-10 flex items-center shadow-md dark:bg-blue-950">
        <button onClick={onBack} className={`${lang === 'ar' ? 'ml-4' : 'mr-4'} p-1`}>
          <BackIcon />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-xl font-bold quran-text">{t.shaabanDeeds}</h2>
        </div>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-blue-50 dark:bg-slate-900 dark:border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sun size={120} fill="currentColor" className="text-blue-900" />
          </div>
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
               <Sparkles size={18} />
               <span className="font-bold text-sm uppercase tracking-widest">شهر رسول الله (ص)</span>
            </div>
            <h3 className="text-xl font-black text-gray-800 dark:text-slate-100">أعمال وعبادات شهر شعبان</h3>
            <p className="text-xs text-gray-500 leading-relaxed dark:text-slate-400">
              شعبان هو شهر منسوب لرسول الله (ص)، وكان يقول: (شعبان شهري، ورحم الله من أعانني على شهري). تضاعف فيه الحسنات وتكفر فيه السيئات.
            </p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {shaabanDeedsData.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`px-6 py-2 rounded-full whitespace-nowrap font-bold text-xs transition-all ${activeCategory === idx ? 'bg-blue-800 text-white shadow-md dark:bg-blue-700' : 'bg-white text-gray-400 border border-gray-100 dark:bg-slate-900 dark:border-slate-800'}`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {shaabanDeedsData[activeCategory].items.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white p-5 rounded-[2rem] shadow-sm border border-blue-50 dark:bg-slate-900 dark:border-slate-800 animate-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  <Star size={20} fill="currentColor" />
                </div>
                <h4 className="font-black text-blue-900 dark:text-blue-400 quran-text text-lg">{item.title}</h4>
              </div>
              <p className="quran-text text-xl leading-relaxed text-gray-700 dark:text-slate-200 text-right" dir="rtl">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-blue-800 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden dark:bg-blue-950">
          <div className="relative z-10 flex items-center gap-4">
            <div className="p-3 bg-blue-700 rounded-2xl dark:bg-blue-900">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-1">المصدر</p>
              <p className="text-xs font-medium leading-relaxed">المعلومات مأخوذة من كتاب مفاتيح الجنان للشيخ عباس القمي (قده).</p>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-700 rounded-full opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default ShaabanDeeds;
