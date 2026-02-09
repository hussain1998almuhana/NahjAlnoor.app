
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sun, Search, Calendar } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface DailyDuasListProps {
  onBack: () => void;
  onSelectDay: (index: number) => void;
  lang: Language;
}

const DailyDuasList: React.FC<DailyDuasListProps> = ({ onBack, onSelectDay, lang }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const t = translations[lang];
  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;

  const days = [
    { name: t.saturday, icon: "🌙", color: "bg-slate-100 text-slate-700" },
    { name: t.sunday, icon: "☀️", color: "bg-amber-100 text-amber-700" },
    { name: t.monday, icon: "🌿", color: "bg-emerald-100 text-emerald-700" },
    { name: t.tuesday, icon: "🌸", color: "bg-rose-100 text-rose-700" },
    { name: t.wednesday, icon: "🌊", color: "bg-blue-100 text-blue-700" },
    { name: t.thursday, icon: "🕯️", color: "bg-indigo-100 text-indigo-700" },
    { name: t.friday, icon: "✨", color: "bg-emerald-100 text-emerald-700" },
  ];

  const filteredDays = days.map((day, index) => ({ ...day, index }))
    .filter(day => day.name.includes(searchTerm));

  return (
    <div className="p-4 space-y-4 pb-24 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
           <Sun className="text-amber-500" size={24} />
           <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-400">{t.dailyDuas}</h2>
        </div>
        <button onClick={onBack} className="text-emerald-700 font-medium bg-emerald-50 px-4 py-1 rounded-full dark:bg-emerald-900/30 dark:text-emerald-400">{t.back}</button>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-50 mb-6 dark:bg-slate-900 dark:border-slate-800">
        <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed text-center">
          {lang === 'ar' ? 'مجموعة الأذكار والأدعية المخصصة لكل يوم من أيام الأسبوع لزيادة الارتباط الروحي.' : 'A collection of supplications and dhikr dedicated to each day of the week.'}
        </p>
      </div>

      <div className="relative mb-6">
        <Search className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-3 text-gray-400`} size={18} />
        <input 
          type="text" 
          placeholder={lang === 'ar' ? 'ابحث عن يوم...' : 'Search for a day...'}
          className={`w-full bg-white ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 rounded-2xl border border-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filteredDays.map((day) => (
          <button 
            key={day.index} 
            onClick={() => onSelectDay(day.index)}
            className="w-full bg-white p-5 rounded-3xl shadow-sm border border-emerald-50 flex items-center justify-between hover:bg-emerald-50 transition active:scale-[0.98] dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${day.color} rounded-2xl flex items-center justify-center text-xl shadow-sm dark:bg-opacity-20`}>
                {day.icon}
              </div>
              <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                <h4 className="font-bold text-gray-800 dark:text-slate-100 text-lg">{day.name}</h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{t.dailyDuas}</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center dark:bg-slate-800">
               <BackIcon size={16} className="text-emerald-700 dark:text-emerald-400" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DailyDuasList;
