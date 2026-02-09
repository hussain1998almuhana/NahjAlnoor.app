
import React from 'react';
import { ArrowLeft, ArrowRight, Share2, Copy, BookOpen, Star } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface RamadanSupplicationViewerProps {
  onBack: () => void;
  lang: Language;
  supplicationId: string;
}

const ramadanSupplicationsData: Record<string, { title: string, content: string }> = {
  "iftitah": {
    title: "دعاء الافتتاح",
    content: `اَللّهُمَّ اِنّي اَفْتَتِحُ الثَّناءَ بِحَمْدِكَ، وَاَنْتَ مُسَدِّدٌ لِلصَّوابِ بِمَّنِكَ، وَاَيْقَنْتُ اَنَّكَ اَنْتَ اَرْحَمُ الرّاحِمينَ في مَوْضِعِ الْعَفْوِ وَالرَّحْمَةِ، وَاَشَدُّ الْمُعاقِبينَ في مَوْضِعِ النَّكالِ وَالنَّقِمَةِ، وَاَعْظَمُ الْمُتَجَبِّرينَ في مَوْضِعِ الْكِبْرِياءِ وَالْعَظَمَةِ. اَللّهُمَّ اَذِنْتَ لي في دُعائِكَ وَمَسْأَلَتِكَ فَاسْمَعْ يا سَميعُ مِدْحَتي، وَاَجِبْ يا رَحيمُ دَعْوَتي، وَاَقِلْ يا غَفُورُ عثْرَتي، فَكَمْ يا اِلهي مِنْ كُرْبَة قَدْ فَرَّجْتَها وَهُمُوم قَدْ كَشَفْتَها، وَعَثْرَة قَدْ اَقَلْتَها، وَرَحْمَة قَدْ نَشَرْتَها، وَحَلْقَةِ بَلاء قَدْ فَكَكْتَها... [يستمر الدعاء الجليل في تمجيد الله والصلاة على النبي وآله وطلب تعجيل الفرج لولي العصر].`
  },
  "hajj": {
    title: "دعاء الحج",
    content: `اَللّهُمَّ ارْزُقْني حَجَّ بَيْتِكَ الْحَرامِ في عامي هذا وَفي كُلِّ عام ما اَبْقَيْتَني في يُسْر مِنْكَ وَعافِيَة، وَسَعَةِ رِزْق، وَلا تُخْلِني مِنْ تِلْكَ الْمواقِفِ الْكَريمَةِ، وَالْمَشاهِدِ الشَّريفَةِ، وَزِيارَةِ قَبْرِ نَبِيِّكَ صَلَواتُكَ عَلَيْهِ وَآلِهِ، وَفي جَميعِ حَوائِجِ الدُّنْيا وَالاْخِرَةِ فَكُنْ لي، اَللّهُمَّ اِنّي اَساَلُكَ فيما تَقْضي وَتُقَدِّرُ مِنَ الاَمْرِ الْمَحْتُومِ في لَيْلَةِ الْقَدْرِ، مِنَ الْقَضاءِ الَّذي لا يُرَدُّ وَلا يُبَدَّلُ، اَنْ تَكْتُبَني مِنْ حُجّاجِ بَيْتِكَ الْحَرامِ، الْمَبْرُورِ حَجُّهُمْ، الْمَشْكُورِ سَعْيُهُمْ، الْمَغْفُورِ ذُنُوبُهُمْ، الْمُكَفَّرِ عَنْهُمْ سَيِّئاتُهُمْ، واجْعَلْ فيما تَقْضي وَتُقَدِّرُ، اَنْ تُطيلَ عُمْري، وَتُوَسِّعَ عَلَيَّ رِزْقي، وَتُؤدِّى عَنّي اَمانَتي وَدَيْني آمينَ رَبَّ الْعالَمينَ.`
  },
  "jawshan": {
    title: "دعاء الجوشن الكبير",
    content: `(1) اَللّهُمَّ اِنّي اَسْأَلُكَ بِاسْمِكَ يا اَللهُ، يا رَحْمنُ، يا رَحيمُ، يا كَريمُ، يا مُقيمُ، يا عَظيمُ، يا قَديمُ، يا عَليمُ، يا حَليمُ، يا حَكيمُ، سُبْحانَكَ يا لا اِلهَ اِلاّ اَنْتَ، الْغَوْثَ الْغَوْثَ خَلِّصْنا مِنَ النّارِ يا رَبِّ. 
(2) يا سَيِّدَ السّاداتِ، يا مُجيبَ الدَّعَواتِ، يا رافِعَ الدَّرَجاتِ، يا وَلِيَّ الْحَسَناتِ، يا غافِرَ الْخَطيئاتِ، يا مُعْطِيَ الْمَسْأَلاتِ، يا قابِلَ التَّوْباتِ، يا سامِعَ الاَْصْواتِ، يا عالِمَ الْخَفِيّاتِ، يا دافِعَ الْبَلِيّاتِ.
(3) يا خَيْرَ الْغافِرينَ، يا خَيْرَ الْفاتِحينَ، يا خَيْرَ النّاصِرينَ، يا خَيْرَ الْحاكِمينَ، يا خَيْرَ الرّازِقينَ، يا خَيْرَ الْوارِثينَ، يا خَيْرَ الْحامِدينَ، يا خَيْرَ الذّاكِرينَ، يا خَيْرَ الْمُنْزِلينَ، يا خَيْرَ الُْمحْسِنينَ... 
[يتكون هذا الدعاء من مئة فصل، يحتوي كل فصل على عشرة أسماء من أسماء الله تعالى، ويُستحب قراءته في ليالي القدر].`
  }
};

const RamadanSupplicationViewer: React.FC<RamadanSupplicationViewerProps> = ({ onBack, lang, supplicationId }) => {
  const t = translations[lang];
  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  const dua = ramadanSupplicationsData[supplicationId] || { title: "دعاء", content: "النص غير متوفر" };

  const handleCopy = () => {
    navigator.clipboard.writeText(dua.content);
    alert(lang === 'ar' ? "تم نسخ نص الدعاء" : "Dua text copied");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: dua.title, text: dua.content });
      } catch (err) {
        console.error("Sharing failed", err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col dark:bg-slate-950 animate-in fade-in duration-300">
      <header className="bg-emerald-800 text-white p-4 sticky top-0 z-10 flex items-center shadow-md dark:bg-emerald-950">
        <button onClick={onBack} className={`${lang === 'ar' ? 'ml-4' : 'mr-4'} p-1 active:scale-90 transition`}>
          <BackIcon />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-xl font-bold quran-text">{dua.title}</h2>
        </div>
        <div className="flex gap-2">
            <button onClick={handleShare} className="p-2 hover:bg-emerald-700 rounded-full transition dark:hover:bg-emerald-900">
                <Share2 size={20} />
            </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-24">
        <div className="flex justify-center">
           <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-emerald-600">
             <BookOpen size={32} className="opacity-20" />
           </div>
        </div>
        
        <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-50 dark:bg-slate-900 dark:border-slate-800 shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16"></div>
           
           <div className="flex items-center gap-2 mb-6 text-emerald-700 dark:text-emerald-400">
              <Star size={16} fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">شهر رمضان المبارك</span>
           </div>

           <p className="quran-text text-2xl leading-[2.4] text-right text-gray-800 dark:text-slate-100 selection:bg-emerald-100" dir="rtl">
             {dua.content}
           </p>

           <div className="mt-12 pt-8 border-t border-gray-50 dark:border-slate-800 flex flex-col items-center gap-6">
             <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-8 py-3 bg-emerald-800 text-white rounded-2xl text-sm font-bold shadow-lg hover:bg-emerald-700 transition dark:bg-emerald-700"
             >
                <Copy size={16} />
                {lang === 'ar' ? 'نسخ النص كاملاً' : 'Copy Full Text'}
             </button>
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t.appName}</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RamadanSupplicationViewer;
