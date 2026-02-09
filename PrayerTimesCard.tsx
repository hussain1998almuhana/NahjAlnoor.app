
import React, { useState, useEffect } from 'react';
import { Clock, Moon, Sparkles } from 'lucide-react';
import { PrayerTimes, Language } from '../types';
import { translations } from '../translations';

interface Props {
  lang: Language;
  showAdhanSection?: boolean;
  showRamadanSection?: boolean;
  onTimesLoad?: (times: PrayerTimes) => void;
  isDarkMode?: boolean;
}

const PrayerTimesCard: React.FC<Props> = ({ lang, showAdhanSection, showRamadanSection, onTimesLoad, isDarkMode }) => {
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const t = translations[lang];

  useEffect(() => {
    initAutoLocation();
  }, []);

  const formatTime12 = (time24?: string) => {
    if (!time24) return '';
    const [hoursStr, minutesStr] = time24.split(':');
    let h = parseInt(hoursStr, 10);
    const m = minutesStr.split(' ')[0];
    const ampm = h >= 12 ? (lang === 'ar' ? 'م' : 'PM') : (lang === 'ar' ? 'ص' : 'AM');
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  };

  const initAutoLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => updateTimesByCoords(pos.coords.latitude, pos.coords.longitude),
        () => updateTimesByCoords(31.9922, 44.3508)
      );
    } else {
      updateTimesByCoords(31.9922, 44.3508);
    }
  };

  const updateTimesByCoords = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=0`);
      const data = await response.json();
      if (data.code === 200) {
        setTimes(data.data.timings);
        if (onTimesLoad) onTimesLoad(data.data.timings);
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  if (loading) return (
    <div className="p-20 text-center space-y-4">
      <div className={`animate-spin h-14 w-14 border-[6px] rounded-full mx-auto ${isDarkMode ? 'border-white/5 border-t-amber-400' : 'border-emerald-100 border-t-emerald-600'}`} />
      <p className={`font-black animate-pulse uppercase tracking-widest text-[10px] ${isDarkMode ? 'text-white/40' : 'text-emerald-900/40'}`}>جاري التحديث...</p>
    </div>
  );

  const prayerItems = [
    { name: t.fajr, time: formatTime12(times?.Fajr), icon: '🌅' },
    { name: t.dhuhr, time: formatTime12(times?.Dhuhr), icon: '☀️' },
    { name: t.asr, time: formatTime12(times?.Asr), icon: '⛅' },
    { name: t.maghrib, time: formatTime12(times?.Maghrib), icon: '🌇' },
    { name: t.isha, time: formatTime12(times?.Isha), icon: '🌙' },
    { name: t.midnight, time: formatTime12(times?.Midnight), icon: '🌌' },
  ];

  return (
    <div className="space-y-4">
      {showRamadanSection && times && (
        <div className={`backdrop-blur-3xl p-6 md:p-8 rounded-[3rem] border m-3 shadow-2xl relative overflow-hidden transition-all ${isDarkMode ? 'bg-amber-400/10 border-amber-400/20 shadow-[0_0_30px_rgba(251,191,36,0.1)]' : 'bg-emerald-50 border-emerald-100 shadow-xl'}`}>
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-amber-500/30 text-amber-100 border-amber-400/30' : 'bg-emerald-600 text-white border-emerald-500'}`}>
                <Moon size={22} fill="currentColor" />
              </div>
              <h3 className={`font-black text-sm tracking-widest uppercase ${isDarkMode ? 'text-amber-100' : 'text-emerald-900'}`}>
                {t.ramadanSection}
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-3 relative z-10">
              {[
                { n: t.imsakTime, t: formatTime12(times?.Imsak) },
                { n: t.suhoorTime, t: formatTime12(times?.Imsak) },
                { n: t.iftarTime, t: formatTime12(times?.Maghrib) }
              ].map((item, idx) => (
                <div key={idx} className={`p-4 rounded-2xl text-center border backdrop-blur-md transition-colors ${isDarkMode ? 'bg-white/5 border-white/5 text-white' : 'bg-white text-emerald-950 border-emerald-100 shadow-sm'}`}>
                  <p className={`text-[9px] font-black mb-1 uppercase tracking-tighter ${isDarkMode ? 'text-amber-200/50' : 'text-emerald-600/50'}`}>{item.n}</p>
                  <p className="text-sm font-black tabular-nums">{item.t}</p>
                </div>
              ))}
            </div>
        </div>
      )}

      <div className="p-6 md:p-8 space-y-10">
        <div className="flex justify-between items-center px-2">
          <div className={`flex items-center gap-5 ${isDarkMode ? 'text-white' : 'text-emerald-950'}`}>
            <div className={`p-4 rounded-[1.8rem] shadow-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-emerald-100 shadow-xl'}`}>
               <Clock size={32} strokeWidth={2.5} className={isDarkMode ? 'text-amber-400' : 'text-emerald-600'} />
            </div>
            <h3 className="font-black text-2xl md:text-4xl tracking-tighter drop-shadow-lg">{t.prayerTimes}</h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {prayerItems.map((prayer, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-between p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] transition-all border relative overflow-hidden ${idx === 3 ? (isDarkMode ? 'bg-amber-400/20 text-white shadow-[0_0_30px_rgba(251,191,36,0.3)] border-amber-400/30' : 'bg-emerald-600 text-white shadow-emerald-700/30 border-emerald-500 shadow-xl') + ' scale-105 z-10' : (isDarkMode ? 'bg-white/5 text-white border-white/5' : 'bg-white text-emerald-950 border-emerald-100 shadow-sm')}`}
            >
              <div className="flex flex-col relative z-10">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 ${idx === 3 ? (isDarkMode ? 'text-amber-200' : 'text-emerald-100') : (isDarkMode ? 'text-white/40' : 'text-emerald-900/40')}`}>{prayer.name}</span>
                <span className="text-lg md:text-2xl font-black tabular-nums drop-shadow-md">{prayer.time}</span>
              </div>
              <span className="text-4xl md:text-5xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] opacity-90 relative z-10">{prayer.icon}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrayerTimesCard;
