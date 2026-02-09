
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  lang: Language;
  isDarkMode?: boolean;
}

const HijriCalendar: React.FC<Props> = ({ lang, isDarkMode }) => {
  const t = translations[lang];
  
  const hijriFormatter = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SA-u-ca-islamic-umalqura' : 'en-US-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  const gregorianFormatter = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const hijriDate = hijriFormatter.format(new Date());
  const gregorianDate = gregorianFormatter.format(new Date());

  return (
    <div className="flex flex-col items-center opacity-100">
      <p className={`text-xl md:text-3xl font-black tabular-nums drop-shadow-xl transition-colors ${isDarkMode ? 'text-amber-100' : 'text-emerald-900'}`}>{hijriDate}</p>
      <p className={`text-xs md:text-sm font-bold tabular-nums tracking-wide mt-1.5 drop-shadow-md transition-colors ${isDarkMode ? 'text-white/60' : 'text-emerald-900/40'}`}>{gregorianDate} {t.gregorianDate}</p>
    </div>
  );
};

export default HijriCalendar;
