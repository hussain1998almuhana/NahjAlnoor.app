
import React, { useState, useEffect } from 'react';
import { RotateCcw, Fingerprint, Plus, Trophy } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface TasbihCounterProps {
  onBack: () => void;
  lang: Language;
  isDarkMode?: boolean;
}

const TasbihCounter: React.FC<TasbihCounterProps> = ({ onBack, lang, isDarkMode }) => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customVal, setCustomVal] = useState("");
  const [isVibrate, setIsVibrate] = useState(true);
  
  const t = translations[lang];
  const progress = Math.min((count / target) * 100, 100);
  const isGoalReached = count >= target && target > 0;

  useEffect(() => {
    if (isGoalReached && count === target) {
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  }, [count, target, isGoalReached]);

  const increment = () => {
    setCount(prev => prev + 1);
    if (isVibrate && 'vibrate' in navigator) navigator.vibrate(50);
  };

  const reset = () => {
    setCount(0);
    if (isVibrate && 'vibrate' in navigator) navigator.vibrate(100);
  };

  const handleCustomGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customVal);
    if (!isNaN(val) && val > 0) {
      setTarget(val);
      setCount(0);
      setShowCustomInput(false);
    }
  };

  return (
    <div className={`min-h-screen p-6 flex flex-col items-center animate-in fade-in duration-700 ${isDarkMode ? 'text-white' : 'text-emerald-950'}`}>
      <div className="w-full flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black drop-shadow-lg">{t.tasbihTitle}</h2>
        <button onClick={onBack} className={`font-bold backdrop-blur-md px-6 py-2 rounded-full border active:scale-95 transition-all ${isDarkMode ? 'text-amber-100 bg-white/10 border-white/10 shadow-lg' : 'text-emerald-700 bg-white border-emerald-100 shadow-md'}`}>{t.back}</button>
      </div>

      <div className="w-full max-w-sm space-y-6 mb-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {[33, 99, 100].map(targetVal => (
            <button 
              key={targetVal}
              onClick={() => { setTarget(targetVal); reset(); setShowCustomInput(false); }}
              className={`px-8 py-3 rounded-2xl font-black transition-all tabular-nums shadow-xl border ${target === targetVal && !showCustomInput ? (isDarkMode ? 'bg-amber-400 text-black border-amber-300 scale-105 shadow-[0_0_20px_rgba(251,191,36,0.4)]' : 'bg-emerald-600 text-white border-emerald-500 scale-105') : (isDarkMode ? 'bg-white/5 text-white border-white/10' : 'bg-white text-emerald-950 border-emerald-100')}`}
            >
              {targetVal}
            </button>
          ))}
          <button onClick={() => setShowCustomInput(!showCustomInput)} className={`p-3 px-6 rounded-2xl font-black transition-all flex items-center gap-2 border ${showCustomInput ? (isDarkMode ? 'bg-amber-400 text-black border-amber-300' : 'bg-emerald-600 text-white border-emerald-500') : (isDarkMode ? 'bg-white/5 text-white border-white/10' : 'bg-white text-emerald-950 border-emerald-100')}`}>
            <Plus size={18} />
            <span className="text-xs uppercase tracking-widest">{t.customGoal}</span>
          </button>
        </div>

        {showCustomInput && (
          <form onSubmit={handleCustomGoalSubmit} className="flex gap-3 animate-in slide-in-from-top-4 duration-500">
            <input 
              type="number" 
              className={`flex-1 backdrop-blur-xl border rounded-2xl px-5 py-4 font-black tabular-nums outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/20 text-white focus:ring-2 focus:ring-amber-400' : 'bg-white border-emerald-100 text-emerald-900 focus:ring-2 focus:ring-emerald-600'}`}
              placeholder={t.setGoal}
              value={customVal}
              onChange={(e) => setCustomVal(e.target.value)}
              autoFocus
            />
            <button type="submit" className={`px-8 py-4 rounded-2xl font-black shadow-lg transition-all ${isDarkMode ? 'bg-amber-400 text-black hover:bg-amber-300' : 'bg-emerald-600 text-white hover:bg-emerald-500'}`}>{t.save}</button>
          </form>
        )}

        <div className="space-y-2 px-2">
          <div className={`flex justify-between text-[11px] font-black uppercase tracking-[0.2em] drop-shadow-md ${isDarkMode ? 'text-amber-200' : 'text-emerald-900'}`}>
            <span>{Math.round(progress)}%</span>
            <span className="tabular-nums">{count} / {target}</span>
          </div>
          <div className={`h-3 w-full rounded-full overflow-hidden border p-0.5 shadow-inner backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-emerald-100/50 border-emerald-200'}`}>
            <div 
              className={`h-full transition-all duration-500 rounded-full ${isGoalReached ? (isDarkMode ? 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.6)]' : 'bg-amber-500') : (isDarkMode ? 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)]' : 'bg-emerald-600')}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="relative mt-4">
        {isGoalReached && (
          <div className={`absolute -top-16 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-2 rounded-full shadow-2xl animate-bounce z-10 border transition-all ${isDarkMode ? 'bg-amber-400 text-black border-amber-200 shadow-amber-500/50' : 'bg-amber-500 text-white border-amber-300'}`}>
            <Trophy size={20} />
            <span className="text-sm font-black">{t.goalReached}</span>
          </div>
        )}
        <div className={`absolute inset-0 rounded-full blur-[60px] opacity-30 transition-all duration-1000 ${isGoalReached ? (isDarkMode ? 'bg-amber-400' : 'bg-amber-500') : (isDarkMode ? 'bg-emerald-400' : 'bg-emerald-400')}`}></div>
        <button 
          onClick={increment}
          className={`relative w-72 h-72 backdrop-blur-3xl rounded-full shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center border-8 transition-all duration-300 active:scale-90 ${isDarkMode ? (isGoalReached ? 'border-amber-400/30 bg-white/10' : 'border-white/10 bg-white/5') : (isGoalReached ? 'border-amber-400/30 bg-white/80' : 'border-emerald-100/40 bg-white/60')}`}
        >
          <span className={`text-8xl font-black tabular-nums transition-all duration-500 drop-shadow-2xl ${isGoalReached ? (isDarkMode ? 'text-amber-400' : 'text-amber-600') : (isDarkMode ? 'text-white' : 'text-emerald-900')}`}>{count}</span>
          <span className={`text-[10px] mt-4 font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white/50' : 'text-emerald-900/40'}`}>{t.pressToTasbih}</span>
          
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-4">
            <circle cx="128" cy="128" r="120" fill="none" stroke="currentColor" strokeWidth="2" className={isDarkMode ? "text-white/5" : "text-emerald-900/5"} />
            <circle 
              cx="128" cy="128" r="120" fill="none" stroke="currentColor" strokeWidth="12" 
              strokeDasharray="753.98" strokeDashoffset={753.98 - (753.98 * progress) / 100}
              strokeLinecap="round" className={`transition-all duration-700 ${isGoalReached ? 'text-amber-400' : 'text-amber-500'} ${isDarkMode ? 'drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : ''}`}
            />
          </svg>
        </button>
      </div>

      <div className="mt-16 w-full max-w-sm space-y-6">
        <button onClick={reset} className={`w-full backdrop-blur-xl py-5 rounded-[2.5rem] shadow-xl border flex items-center justify-center gap-4 hover:bg-white/10 transition-all active:scale-[0.98] ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-emerald-100 text-emerald-700'}`}>
          <RotateCcw size={24} className="opacity-40" />
          <span className="font-black text-lg">{t.resetCounter}</span>
        </button>

        <div className={`backdrop-blur-2xl p-8 rounded-[3rem] shadow-2xl relative overflow-hidden border transition-all ${isDarkMode ? 'bg-black/40 text-white border-white/5' : 'bg-emerald-600 text-white border-emerald-500'}`}>
          <div className="relative z-10 flex justify-between items-center">
            <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isDarkMode ? 'text-amber-300/60' : 'text-white/60'}`}>{t.totalTasbih}</p>
              <p className="text-3xl font-black tabular-nums drop-shadow-lg">{count}</p>
            </div>
            <div className={`p-4 rounded-[1.5rem] shadow-inner ${isDarkMode ? 'bg-white/10 text-amber-400' : 'bg-white/20 text-white'}`}>
              <Fingerprint size={32} />
            </div>
          </div>
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 blur-2xl ${isDarkMode ? 'bg-amber-400/10' : 'bg-white/10'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default TasbihCounter;
