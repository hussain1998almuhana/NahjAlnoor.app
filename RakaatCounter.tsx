
import React, { useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Play, CheckCircle2, Moon, Fingerprint } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  onBack: () => void;
  lang: Language;
  isDarkMode?: boolean;
}

const RakaatCounter: React.FC<Props> = ({ onBack, lang, isDarkMode }) => {
  const [rakaat, setRakaat] = useState(0);
  const [sajda, setSajda] = useState(0);
  const [targetRakaat, setTargetRakaat] = useState<2 | 3 | 4>(4);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const t = translations[lang];
  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;

  const handleSajda = useCallback(() => {
    if (!isActive || isFinished) return;

    // اهتزاز للتأكيد على اللمس
    if ('vibrate' in navigator) navigator.vibrate(60);

    setSajda(prevSajda => {
      const newSajda = prevSajda + 1;
      if (newSajda === 2) {
        setRakaat(prevRakaat => {
          const newRakaat = prevRakaat + 1;
          if (newRakaat === targetRakaat) {
            setIsFinished(true);
            if ('vibrate' in navigator) navigator.vibrate([200, 100, 200, 100, 200]);
          }
          return newRakaat;
        });
        return 0; // تصفير السجدات للركعة القادمة
      }
      return newSajda;
    });
  }, [isActive, isFinished, targetRakaat]);

  const reset = () => {
    setRakaat(0);
    setSajda(0);
    setIsActive(false);
    setIsFinished(false);
  };

  // وضع الصلاة النشط (شاشة سوداء بالكامل)
  if (isActive) {
    return (
      <div 
        className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-between py-20 px-6 select-none touch-none overflow-hidden"
        onClick={handleSajda}
      >
        {isFinished ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-10 animate-in zoom-in duration-500">
            <div className="w-48 h-48 bg-emerald-500/10 rounded-full flex items-center justify-center border-2 border-emerald-500 animate-pulse">
               <CheckCircle2 size={100} className="text-emerald-500" />
            </div>
            <h2 className="text-4xl font-black text-white text-center leading-tight">{t.prayerFinished}</h2>
            <button 
              onClick={(e) => { e.stopPropagation(); reset(); }}
              className="px-16 py-5 bg-emerald-600 text-white rounded-full font-black text-2xl shadow-2xl active:scale-95 transition-all"
            >
              {t.back}
            </button>
          </div>
        ) : (
          <>
            <div className="text-center">
               <span className="text-white/20 text-sm font-black uppercase tracking-[0.5em]">{t.rakaat}</span>
               <div className="text-[18rem] font-black text-white leading-none tabular-nums drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                 {rakaat + 1}
               </div>
            </div>

            <div className="flex flex-col items-center gap-12 w-full">
              {/* مؤشرات السجود */}
              <div className="flex gap-6">
                {[1, 2].map(s => (
                  <div 
                    key={s} 
                    className={`w-24 h-5 rounded-full transition-all duration-300 ${sajda >= s ? 'bg-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.6)]' : 'bg-white/5 border border-white/10'}`} 
                  />
                ))}
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-white/30 text-xs font-bold animate-pulse">
                  {t.placePhoneOnTurbah}
                </p>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsActive(false); }}
                  className="px-8 py-3 rounded-full text-white/10 text-[10px] font-bold border border-white/5"
                >
                  إلغاء الصلاة
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 pb-40 space-y-10 animate-in slide-in-from-bottom-10 duration-700 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className={`p-4 rounded-3xl shadow-xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-emerald-100'}`}>
             <RotateCcw size={32} className={isDarkMode ? 'text-amber-400' : 'text-emerald-600'} />
           </div>
           <div>
             <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-emerald-950'}`}>{t.rakaatCounter}</h2>
             <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">تجنب السهو أثناء السجود</p>
           </div>
        </div>
        <button onClick={onBack} className={`font-bold px-6 py-2 rounded-full border active:scale-95 transition-all ${isDarkMode ? 'text-amber-100 bg-white/10 border-white/10' : 'text-emerald-700 bg-white border-emerald-100 shadow-md'}`}>{t.back}</button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className={`p-10 rounded-[3rem] border backdrop-blur-3xl text-center space-y-10 transition-all ${isDarkMode ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-white border-emerald-100 shadow-xl'}`}>
           <div className="space-y-4">
             <h3 className={`text-xl font-black ${isDarkMode ? 'text-white/60' : 'text-emerald-900/60'}`}>{t.selectPrayer}</h3>
             <div className="flex justify-center gap-4">
                {[2, 3, 4].map(val => (
                  <button
                    key={val}
                    onClick={() => setTargetRakaat(val as 2 | 3 | 4)}
                    className={`w-20 h-20 rounded-3xl font-black text-3xl transition-all border flex items-center justify-center ${targetRakaat === val ? (isDarkMode ? 'bg-amber-400 text-black border-amber-300 scale-110 shadow-lg' : 'bg-emerald-600 text-white border-emerald-500 scale-110 shadow-xl') : (isDarkMode ? 'bg-white/5 text-white border-white/10' : 'bg-emerald-50 text-emerald-900 border-emerald-100')}`}
                  >
                    {val}
                  </button>
                ))}
             </div>
             <p className={`text-sm font-bold ${isDarkMode ? 'text-amber-200' : 'text-emerald-700'}`}>
                {targetRakaat === 2 ? t.fajrPrayer : targetRakaat === 3 ? t.maghribPrayer : t.quadPrayer}
             </p>
           </div>

           <button 
              onClick={() => setIsActive(true)}
              className={`w-full py-6 rounded-[2.5rem] flex items-center justify-center gap-4 font-black text-2xl shadow-2xl active:scale-95 transition-all ${isDarkMode ? 'bg-amber-400 text-black' : 'bg-emerald-600 text-white'}`}
            >
              <Play fill="currentColor" size={28} />
              {t.startPrayer}
            </button>
        </div>

        <div className={`p-8 rounded-[2.5rem] border flex items-start gap-5 transition-all ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-emerald-50 border-emerald-100'}`}>
          <div className="p-3 bg-white/10 rounded-2xl">
            <Fingerprint className={isDarkMode ? 'text-amber-400' : 'text-emerald-600'} size={24} />
          </div>
          <div className="flex-1">
            <h4 className={`font-black text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-emerald-900'}`}>طريقة العمل</h4>
            <p className={`text-xs font-medium leading-relaxed ${isDarkMode ? 'text-white/40' : 'text-emerald-900/40'}`}>
              ضع الهاتف تحت التربة، وعند السجود المس الشاشة بجبهتك. سيقوم التطبيق بحساب السجدات والركعات تلقائياً مع تنبيهك بالاهتزاز.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RakaatCounter;
