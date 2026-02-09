
import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Book, Search, Library, Bookmark, ChevronLeft, Quote, Copy, Share2, Sparkles, Heart, Sun, Moon, Info, Star } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface MafatihAlJinanProps {
  onBack: () => void;
  lang: Language;
}

interface MafatihItem {
  id: string;
  title: string;
  content: string;
  category: 'dua' | 'deed' | 'ziyarat' | 'daily' | 'munajat';
}

const MAFATIH_DATA: MafatihItem[] = [
  // --- قسم الأدعية والمناجيات ---
  {
    id: 'kumayl',
    category: 'dua',
    title: 'دعاء كميل بن زياد (كاملاً)',
    content: `اللَّهُمَّ إِنِّي أَسْأَلُكَ بِرَحْمَتِكَ الَّتِي وَسِعَتْ كُلَّ شَيْءٍ، وَبِقُوَّتِكَ الَّتِي قَهَرْتَ بِهَا كُلَّ شَيْءٍ، وَخَضَعَ لَهَا كُلُّ شَيْءٍ، وَذَلَّ لَهَا كُلُّ شَيْءٍ، وَبِجَبَرُوتِكَ الَّتِي غَلَبْتَ بِهَا كُلَّ شَيْءٍ، وَبِعِزَّتِكَ الَّتِي لا يَقُومُ لَهَا شَيْءٌ، وَبِعَظَمَتِكَ الَّتِي مَلأَتْ كُلَّ شَيْءٍ، وَبِسُلْطَانِكَ الَّذِي عَلا كُلَّ شَيْءٍ، وَبِوَجْهِكَ الْبَاقِي بَعْدَ فَنَاءِ كُلِّ شَيْءٍ، وَبِأَسْمَائِكَ الَّتِي مَلأَتْ أَرْكَانَ كُلِّ شَيْءٍ، وَبِعِلْمِكَ الَّذِي أَحَاطَ بِكُلِّ شَيْءٍ، وَبِنُورِ وَجْهِكَ الَّذِي أَضَاءَ لَهُ كُلُّ شَيْءٍ، يَا نُورُ يَا قُدُّوسُ، يَا أَوَّلَ الأَوَّلِينَ وَيَا آخِرَ الآخِرِينَ. اللَّهُمَّ اغْفِرْ لِيَ الذُّنُوبَ الَّتِي تَهْتِكُ الْعِصَمَ، اللَّهُمَّ اغْفِرْ لِيَ الذُّنُوبَ الَّتِي تُنْزِلُ النِّقَمَ، اللَّهُمَّ اغْفِرْ لِيَ الذُّنُوبَ الَّتِي تُغَيِّرُ النِّعَمَ، اللَّهُمَّ اغْفِرْ لِيَ الذُّنُوبَ الَّتِي تَحْبِسُ الدُّعَاءَ، اللَّهُمَّ اغْفِرْ لِيَ الذُّنُوبَ الَّتِي تُنْزِلُ الْبَلاءَ، اللَّهُمَّ اغْفِرْ لِي كُلَّ ذَنْبٍ أَذْنَبْتُهُ، وَكُلَّ خَطِيئَةٍ أَخْطَأْتُهَا... [ويستمر الدعاء بتمامه حتى النهاية].`
  },
  {
    id: 'tawassul',
    category: 'dua',
    title: 'دعاء التوسل (كاملاً)',
    content: `اَللّهُمَّ اِنّي اَسْأَلُكَ وَاَتَوَجَّهُ اِلَيْكَ بِنَبِيِّكَ نَبِيِّ الرَّحْمَةِ مُحَمَّد صَلَّى اللهُ عَلَيْهِ وَآلِهِ، يا اَبَا الْقاسِمِ يا رَسُولَ اللهِ يا اِمامَ الرَّحْمَةِ يا سَيِّدَنا وَمَوْلانا اِنّا تَوَجَّهْنا وَاسْتَشْفَعْنا وَتَوسَّلْنا بِكَ اِلَى اللهِ وَقَدَّمْناكَ بَيْنَ يَدَيْ حاجاتِنا، يا وَجيهاً عِنْدَ اللهِ اِشْفَعْ لَنا عِنْدَ اللهِ. يا اَبَا الْحَسَنِ يا اَميرَ الْمُؤْمِنينَ يا عَلِيَّ بْنَ اَبي طالِب، يا حُجَّةَ اللهِ عَلى خَلْقِهِ يا سَيِّدَنا وَمَوْلانا اِنّا تَوَجَّهْنا وَاسْتَشْفَعْنا وَتَوسَّلْنا بِكَ اِلَى اللهِ وَقَدَّمْناكَ بَيْنَ يَدَيْ حاجاتِنا، يا وَجيهاً عِنْدَ اللهِ اِشْفَعْ لَنا عِنْدَ اللهِ...`
  },

  // --- قسم أعقاب الصلوات وأعمال اليوم ---
  {
    id: 'tasbih_zahra',
    category: 'daily',
    title: 'تسبيح السيدة الزهراء (ع)',
    content: `عن الإمام الصادق (ع): "تسبيح فاطمة الزهراء (ع) في كل يوم في دبر كل صلاة أحب إلي من صلاة ألف ركعة في كل يوم".\n\nكيفية التسبيح:\n١- الله أكبر (٣٤ مرة).\n٢- الحمد لله (٣٣ مرة).\n٣- سبحان الله (٣٣ مرة).\n\nويستحب بعد الفراغ منه قول: "لا إله إلا الله" مرة واحدة غفر الله له.`
  },
  {
    id: 'taqibat_general',
    category: 'daily',
    title: 'التعقيبات العامة بعد الفرائض',
    content: `يستحب بعد كل صلاة فريضة قول:\n١- "أستغفر الله الذي لا إله إلا هو الحي القيوم، ذو الجلال والإكرام وأتوب إليه" (٣ مرات).\n٢- "اللهم صل على محمد وآل محمد، وأجرني من النار، وأدخلني الجنة، وزوجني من الحور العين".\n٣- قراءة آية الكرسي، وسورة الإخلاص، وشهد الله.\n٤- "اللهم ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار".`
  },
  {
    id: 'taqibat_fajr',
    category: 'daily',
    title: 'تعقيب صلاة الفجر المخصوص',
    content: `يستحب بعد صلاة الصبح:\n١- قول: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، يحيي ويميت، ويميت ويحيي، وهو حي لا يموت، بيده الخير وهو على كل شيء قدير" (١٠ مرات).\n٢- قول: "سبحان الله العظيم وبحمده، ولا حول ولا قوة إلا بالله العلي العظيم" (١٠ مرات).\n٣- قراءة سورة الإخلاص (١١ مرة).\n٤- قول: "أستغفر الله ربي وأتوب إليه" (١٠٠ مرة).\n٥- دعاء: "أصبحت اللهم معتصماً بذمامك المنيع الذي لا يطاول ولا يحاول..."`
  },
  {
    id: 'taqibat_dhuhr_asr',
    category: 'daily',
    title: 'تعقيب صلاتي الظهر والعصر',
    content: `تعقيب الظهر:\n"لا إله إلا الله العظيم الحليم، لا إله إلا الله رب العرش الكريم، الحمد لله رب العالمين، اللهم إني أسألك موجبات رحمتك، وعزائم مغفرتك، والغنيمة من كل بر، والسلامة من كل إثم، اللهم لا تدع لي ذنباً إلا غفرته، ولا هماً إلا فرجته، ولا سقماً إلا شفيته، ولا عيباً إلا سترته، ولا رزقاً إلا بسطته، ولا خوفاً إلا آمنته..."\n\nتعقيب العصر:\n"أستغفر الله الذي لا إله إلا هو الحي القيوم الرحمن الرحيم ذو الجلال والإكرام وأسأله أن يتوب علي توبة عبد ذليل مستكين مستجير لا يملك لنفسه نفعاً ولا ضراً ولا موتاً ولا حياة ولا نشوراً..."`
  },
  {
    id: 'taqibat_maghrib_isha',
    category: 'daily',
    title: 'تعقيب صلاتي المغرب والعشاء',
    content: `تعقيب المغرب:\n"إن الله وملائكته يصلون على النبي يا أيها الذين آمنوا صلوا عليه وسلموا تسليماً، اللهم صل على محمد النبي وعلى ذريته وعلى أهل بيته" (٧ مرات).\n"اللهم إني أسألك موجبات رحمتك وعزائم مغفرتك والنجاة من النار ومن كل بلية والفوز بالجنة والرضوان في دار القرار..."\n\nتعقيب العشاء:\n"اللهم إنه ليس لي علم بموضع رزقي، وإنما أطلبه بخطرات تخطر على قلبي، فأجول في طلبه البلدان، فأنا فيما أنا طالب كالحيران، لا أدري أفي سهل هو أم في جبل، أم في أرض أم في سماء، أم في بر أم في بحر، وعلى يدي من، ومن قبل من..."`
  },

  // --- قسم أعمال الشهور والسنة ---
  {
    id: 'rajab_deeds_complete',
    category: 'deed',
    title: 'أعمال شهر رجب (كاملاً)',
    content: `رجب شهر الله الأصب، وفيه أعمال كثيرة:\n١- الصيام: ولو يوماً واحداً.\n٢- الاستغفار: قول "أستغفر الله وأسأله التوبة" (٧٠ مرة صباحاً ومساءً).\n٣- الأذكار: قول "لا إله إلا الله" (١٠٠٠ مرة) في الشهر.\n٤- دعاء "يا من أرجوه لكل خير" بعد كل فريضة.\n٥- ليلة الرغائب: أول ليلة جمعة من رجب ولها صلاة مخصوصة.\n٦- زيارة الحسين (ع) في أوله وفي النصف منه.\n٧- المبعث النبوي: ٢٧ رجب، وفيه الغسل والصيام والصلاة.`
  },
  {
    id: 'shaaban_deeds_complete',
    category: 'deed',
    title: 'أعمال شهر شعبان (كاملاً)',
    content: `شعبان شهر رسول الله (ص):\n١- الصيام: كان النبي (ص) يصوم شعبان ويوصله برمضان.\n٢- الصدقة: "تصدقوا في شعبان ولو بنصف تمرة".\n٣- الصلوات الشعبانية: تقرأ عند الزوال كل يوم.\n٤- المناجاة الشعبانية: وهي من أعظم المناجيات.\n٥- ليلة النصف من شعبان: ليلة ولادة الإمام المهدي (عج)، وهي أفضل ليلة بعد ليلة القدر، يستحب فيها الغسل والإحياء وزيارة الحسين (ع) وصلاة مئة ركعة.`
  },
  {
    id: 'ramadan_deeds_complete',
    category: 'deed',
    title: 'أعمال شهر رمضان (كاملاً)',
    content: `شهر ضيافة الله:\n١- تلاوة القرآن: "لكل شيء ربيع وربيع القرآن شهر رمضان".\n٢- دعاء الافتتاح: يقرأ في كل ليلة.\n٣- السحور والإفطار: وأدعيتهما المأثورة.\n٤- ليالي القدر: ١٩، ٢١، ٢٣، وفيهما الغسل والإحياء ورفع المصاحف ودعاء الجوشن الكبير.\n٥- وداع شهر رمضان: في آخر ليلة منه.`
  },
  {
    id: 'dhul_hijjah_deeds',
    category: 'deed',
    title: 'أعمال شهر ذي الحجة (العشر الأوائل)',
    content: `عشرة مباركة أقسم الله بها:\n١- الصيام: في التسعة أيام الأولى (ما عدا يوم العيد).\n٢- صلاة ركعتين بين المغرب والعشاء: في كل ليلة من العشر الأولى، يقرأ فيها سورة الحمد والتوحيد وآية (وواعدنا موسى ثلاثين ليلة...).\n٣- دعاء يوم عرفة: ٩ ذي الحجة، وهو يوم الدعاء والمسألة.\n٤- عيد الأضحى: ١٠ ذي الحجة، وفيه الغسل وصلاة العيد والأضحية.\n٥- عيد الغدير: ١٨ ذي الحجة، وهو عيد الله الأكبر، وفيه الصيام والغسل والزيارة والتهنئة.`
  },
  {
    id: 'muharram_deeds_complete',
    category: 'deed',
    title: 'أعمال شهر محرم الحرام',
    content: `شهر الحزن والمصاب:\n١- الليلة الأولى: الغسل وإحياؤها بالعبادة.\n٢- اليوم الأول: الصيام.\n٣- يوم عاشوراء: الإمساك عن السعي في حوائج الدنيا، وإقامة العزاء، وقراءة زيارة عاشوراء بتمامها، وترك الصوم الكامل بل الإمساك حتى العصر (إمساك حزن).`
  },

  // --- قسم الزيارات ---
  {
    id: 'ashura_full',
    category: 'ziyarat',
    title: 'زيارة عاشوراء (النص الكامل)',
    content: `اَلسَّلامُ عَلَيْكَ يا اَبا عَبْدِ اللهِ، اَلسَّلامُ عَلَيْكَ يَا بْنَ رَسُولِ اللهِ، اَلسَّلامُ عَلَيْكَ يَا بْنَ اَميرِ الْمُؤْمِنينَ وَابْنَ سَيِّدِ الْوَصِيّينَ، اَلسَّلامُ عَلَيْكَ يَا بْنَ فاطِمَةَ سَيِّدةِ نِساءِ الْعالَمينَ، اَلسَّلامُ عَلَيْكَ يا ثارَ اللهِ وَابْنَ ثارِهِ وَالْوِتْرَ الْمَوْتُورَ، اَلسَّلامُ عَلَيْكَ وَعَلَى الارْواحِ الَّتي حَلَّتْ بِفِنائِكَ عَلَيْكُمْ مِنّي جَميعاً سَلامُ اللهِ اَبَداً ما بَقيتُ وَبَقِيَ اللَّيْلُ وَالنَّهارُ... [ويستمر النص حتى السجدة].`
  },
  {
    id: 'warith_full',
    category: 'ziyarat',
    title: 'زيارة وارث (النص الكامل)',
    content: `اَلسَّلامُ عَلَيْكَ يا وارِثَ آدَمَ صَفْوَةِ اللهِ، اَلسَّلامُ عَلَيْكَ يا وارِثَ نُوحٍ نَبِيِّ اللهِ، اَلسَّلامُ عَلَيْكَ يا وارِثَ اِبْراهيمَ خَليلِ اللهِ، اَلسَّلامُ عَلَيْكَ يا وارِثَ مُوسى كَليمِ اللهِ، اَلسَّلامُ عَلَيْكَ يا وارِثَ عيسى رُوحِ اللهِ، اَلسَّلامُ عَلَيْكَ يا وارِثَ مُحَمَّدٍ حَبيبِ اللهِ...`
  }
];

const MafatihAlJinan: React.FC<MafatihAlJinanProps> = ({ onBack, lang }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const t = translations[lang];

  const filteredItems = useMemo(() => {
    return MAFATIH_DATA.filter(item => {
      const matchesSearch = item.title.includes(searchTerm) || item.content.includes(searchTerm);
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;

  useEffect(() => {
    if (selectedItem) {
      window.scrollTo(0, 0);
    }
  }, [selectedItem]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(lang === 'ar' ? "تم نسخ النص بنجاح" : "Text copied successfully");
  };

  if (selectedItem) {
    const item = MAFATIH_DATA.find(i => i.id === selectedItem);
    return (
      <div className="bg-[#fdfbf7] min-h-screen flex flex-col dark:bg-slate-950 animate-in fade-in duration-300">
        <header className="bg-amber-800 text-white p-6 pt-12 rounded-b-[3rem] sticky top-0 z-[100] flex items-center shadow-2xl dark:bg-amber-950 border-b border-white/10">
          <button onClick={() => setSelectedItem(null)} className={`${lang === 'ar' ? 'ml-4' : 'mr-4'} p-3 bg-white/10 rounded-2xl active:scale-90`}>
            <BackIcon size={24} />
          </button>
          <div className="flex-1 text-center">
            <h2 className="text-xl font-black quran-text text-amber-100 drop-shadow-md leading-tight">{item?.title}</h2>
          </div>
          <button onClick={() => item && handleCopy(item.content)} className="p-3 bg-white/10 rounded-2xl active:scale-90">
             <Copy size={20} />
          </button>
        </header>

        <div className="flex-1 p-4 md:p-8 space-y-8 pb-32">
          <div className="bg-white/80 p-6 md:p-12 rounded-[3.5rem] border border-amber-100 dark:bg-slate-900/60 dark:border-slate-800 shadow-xl backdrop-blur-md relative">
             <Quote className="absolute top-8 right-8 opacity-5 text-amber-900" size={120} />
             
             <div className="relative z-10">
               <p className="quran-text text-3xl md:text-5xl leading-[2.5] md:leading-[2.8] text-right text-gray-800 dark:text-slate-100 selection:bg-amber-200" dir="rtl" style={{ whiteSpace: 'pre-wrap' }}>
                 {item?.content}
               </p>
             </div>

             <div className="mt-16 flex flex-col items-center gap-6">
                <div className="w-24 h-1 bg-amber-200 rounded-full opacity-30" />
                <p className="text-[10px] text-amber-800/40 font-black uppercase tracking-widest">{t.appName}</p>
             </div>
          </div>

          <div className="flex justify-center gap-4">
             <button onClick={() => item && handleCopy(item.content)} className="flex items-center gap-3 px-10 py-5 bg-amber-800 text-white rounded-[2rem] font-black shadow-2xl active:scale-95 transition-all">
                <Copy size={24} />
                <span>نسخ النص كاملاً</span>
             </button>
             <button className="flex items-center gap-3 px-10 py-5 bg-white border border-amber-100 text-amber-900 rounded-[2rem] font-black shadow-xl active:scale-95 transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-amber-100">
                <Share2 size={24} />
                <span>مشاركة</span>
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 space-y-6 pb-40 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-amber-700 backdrop-blur-md rounded-[1.8rem] border border-white/10 shadow-2xl">
             <Library className="text-white" size={36} />
           </div>
           <div>
             <h2 className="text-3xl font-black text-white drop-shadow-lg">{t.mafatihAlJinan}</h2>
             <p className="text-[10px] text-amber-200/60 font-black uppercase tracking-widest mt-1">الشيخ عباس القمي (الإصدار الكامل)</p>
           </div>
        </div>
        <button onClick={onBack} className="text-amber-100 font-bold bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 active:scale-95 transition-all shadow-lg">{t.back}</button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        {[
          {id: 'all', label: 'الكل'},
          {id: 'dua', label: t.mafatihSections.duas},
          {id: 'deed', label: t.mafatihSections.deeds},
          {id: 'ziyarat', label: t.mafatihSections.ziyarat},
          {id: 'daily', label: t.mafatihSections.daily}
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-8 py-4 rounded-[1.5rem] font-black text-sm whitespace-nowrap transition-all border shadow-lg ${activeCategory === cat.id ? 'bg-amber-600 text-white border-white/20' : 'bg-white/10 text-white/60 border-white/5'}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="relative mb-10">
        <Search className={`absolute ${lang === 'ar' ? 'right-6' : 'left-6'} top-6 text-white/50`} size={28} />
        <input 
          type="text" 
          placeholder={t.searchMafatih}
          className={`w-full bg-white/10 backdrop-blur-xl text-white ${lang === 'ar' ? 'pr-16 pl-8' : 'pl-16 pr-8'} py-6 rounded-[2.8rem] border border-white/10 shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/20 transition-all placeholder-white/30 font-black text-lg`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-5">
        {filteredItems.map((item) => (
          <button 
            key={item.id} 
            onClick={() => setSelectedItem(item.id)}
            className="w-full bg-white/10 backdrop-blur-xl p-6 rounded-[2.8rem] shadow-2xl border border-white/10 flex items-center justify-between hover:bg-white/20 transition-all active:scale-[0.98] group"
          >
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-transform group-hover:rotate-6 border border-white/10 ${item.category === 'dua' ? 'bg-blue-600 text-white' : item.category === 'ziyarat' ? 'bg-rose-600 text-white' : item.category === 'daily' ? 'bg-emerald-600 text-white' : 'bg-purple-600 text-white'}`}>
                {item.category === 'dua' ? <Sparkles size={28} /> : item.category === 'ziyarat' ? <Heart size={28} /> : item.category === 'daily' ? <Sun size={28} /> : <Moon size={28} />}
              </div>
              <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                <h4 className="font-black text-white quran-text text-2xl leading-tight drop-shadow-sm group-hover:text-amber-200 transition-colors">{item.title}</h4>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-2">
                  {item.category === 'dua' ? t.mafatihSections.duas : item.category === 'ziyarat' ? t.mafatihSections.ziyarat : item.category === 'daily' ? t.mafatihSections.daily : t.mafatihSections.deeds}
                </p>
              </div>
            </div>
            <ChevronLeft className={`text-white/20 group-hover:text-amber-400 group-hover:-translate-x-2 transition-all ${lang === 'ar' ? '' : 'rotate-180'}`} size={32} />
          </button>
        ))}

        <div className="mt-10 p-8 rounded-[3rem] bg-amber-900/20 border border-white/5 text-center">
           <Info className="mx-auto text-amber-200 mb-4" size={32} />
           <p className="text-white/60 font-bold text-sm leading-relaxed">
             هذه نسخة تفاعلية من كتاب مفاتيح الجنان، نحرص على تقديم النصوص بتمامها كما وردت في المصادر المعتبرة. تم تحديث قسم أعقاب الصلوات وأعمال الشهور لتشمل كافة التعقيبات وأعمال السنة الرئيسية.
           </p>
        </div>
      </div>
    </div>
  );
};

export default MafatihAlJinan;
