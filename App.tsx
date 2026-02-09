
import React, { useState, useEffect } from 'react';
import { 
  Home, BookOpen, Fingerprint, Compass, Settings, Bell, MapPin, 
  Moon, Sun, List, X, Heart, Star, ChevronLeft, ChevronRight, Sparkles, Globe, Palette,
  Youtube, Facebook, Instagram, Twitter, Share2, Book, Library, Loader2, RotateCcw,
  Languages, Info
} from 'lucide-react';
import PrayerTimesCard from './components/PrayerTimesCard';
import HijriCalendar from './components/HijriCalendar';
import QuranReader from './components/QuranReader';
import TasbihCounter from './components/TasbihCounter';
import QiblaFinder from './components/QiblaFinder';
import DailySupplications from './components/DailySupplications';
import DailyDuasList from './components/DailyDuasList';
import RajabDeeds from './components/RajabDeeds';
import ShaabanDeeds from './components/ShaabanDeeds';
import RamadanDeeds from './components/RamadanDeeds';
import RamadanSupplicationViewer from './components/RamadanSupplicationViewer';
import ZiyaratViewer from './components/ZiyaratViewer';
import NotificationSettings from './components/NotificationSettings';
import KamilAlZiyarat from './components/KamilAlZiyarat';
import MafatihAlJinan from './components/MafatihAlJinan';
import RakaatCounter from './components/RakaatCounter';
import { Tab, Language, PrayerTimes } from './types';
import { translations } from './translations';

// صور المراقد المقدسة المحدثة
const BG_DARK = "https://images.unsplash.com/photo-1590076215667-875d45336102?q=80&w=2000&auto=format&fit=crop"; 
const BG_LIGHT = "https://images.unsplash.com/photo-1510421251302-3c4832560824?q=80&w=2000&auto=format&fit=crop"; 
const BG_QIBLA = "https://images.unsplash.com/photo-1614589201383-71a2a4726569?q=80&w=800&auto=format&fit=crop"; 

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [lang, setLang] = useState<Language>('ar');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') !== 'light');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const [showAdhan, setShowAdhan] = useState(() => localStorage.getItem('show_adhan') !== 'false');
  const [showRamadan, setShowRamadan] = useState(() => localStorage.getItem('show_ramadan') === 'true');
  const [currentSubView, setCurrentSubView] = useState<'none' | 'dua' | 'duas-list' | 'ziyarat' | 'notifications' | 'rajab-deeds' | 'shaaban-deeds' | 'ramadan-deeds' | 'ramadan-dua' | 'developer-accounts' | 'kamil-ziyarat' | 'mafatih' | 'rakaat-counter'>('none');
  const [isDuaMenuOpen, setIsDuaMenuOpen] = useState(false);
  const [selectedDayDua, setSelectedDayDua] = useState<number | null>(null);
  const [selectedRamadanDuaId, setSelectedRamadanDuaId] = useState<string | null>(null);

  const t = translations[lang];

  useEffect(() => {
    // محاكاة شاشة تحميل الـ Splash Screen الخاصة بالـ APK
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleLanguage = () => setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  const toggleTheme = () => setIsDarkMode(prev => !prev);

  if (isInitialLoading) {
    return (
      <div className="fixed inset-0 z-[1000] bg-emerald-900 flex flex-col items-center justify-center animate-out fade-out duration-500">
        <div className="relative">
          <div className="w-32 h-32 bg-white/10 rounded-[3rem] backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl animate-pulse">
            <Moon size={64} className="text-amber-400" fill="currentColor" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-amber-400 p-2 rounded-2xl shadow-lg">
             <Sparkles size={24} className="text-emerald-900" />
          </div>
        </div>
        <h1 className="mt-8 text-4xl font-black text-white drop-shadow-lg">نهج النور</h1>
        <p className="mt-2 text-emerald-200/60 font-bold uppercase tracking-widest text-xs">تطبيقك الإسلامي الشامل</p>
        <div className="mt-12 flex items-center gap-3">
           <Loader2 className="animate-spin text-amber-400" size={24} />
           <span className="text-white/40 text-[10px] font-black tracking-widest uppercase">جاري تهيئة البيانات...</span>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (currentSubView === 'developer-accounts') {
      return (
        <div className="p-6 md:p-12 pb-40 space-y-10 animate-in slide-in-from-bottom-12 duration-800 min-h-screen">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-3xl md:text-5xl font-black drop-shadow-xl flex items-center gap-4 ${isDarkMode ? 'text-white' : 'text-emerald-950'}`}>
              {t.developerAccounts}
              <Share2 size={32} className={isDarkMode ? 'text-amber-400' : 'text-emerald-600'} />
            </h2>
            <button onClick={() => setCurrentSubView('none')} className={`font-bold backdrop-blur-md px-6 py-2 rounded-full border active:scale-95 transition-all ${isDarkMode ? 'text-amber-100 bg-white/10 border-white/10 shadow-lg' : 'text-emerald-700 bg-white border-emerald-100 shadow-md'}`}>{t.back}</button>
          </div>
          
          <div className="grid gap-6">
            <SocialLink icon={<Youtube />} label={t.youtube} url="https://youtube.com/channel/UCAK96Utx_8jzdbrTb4Ef9sQ?si=erFY-7SVxqWx9Frk" color="bg-red-500/20 text-red-500" isDarkMode={isDarkMode} />
            <SocialLink icon={<Facebook />} label={t.facebook} url="https://www.facebook.com/share/1FXhoAcEhQ/" color="bg-blue-600/20 text-blue-500" isDarkMode={isDarkMode} />
            <SocialLink icon={<Instagram />} label={t.instagram} url="https://www.instagram.com/hu_ex?igsh=MW1mZGJhMThhMHNodQ==" color="bg-pink-500/20 text-pink-500" isDarkMode={isDarkMode} />
            <SocialLink icon={<Twitter />} label={t.twitter} url="https://x.com/AlMuhanna_98_" color="bg-slate-400/20 text-slate-100" isDarkMode={isDarkMode} />
          </div>

          <div className={`mt-10 p-8 rounded-[3rem] border backdrop-blur-3xl text-center space-y-4 transition-all ${isDarkMode ? 'bg-black/20 border-white/10 text-white' : 'bg-white/60 border-white text-emerald-950'}`}>
             <p className="text-sm font-bold opacity-60 uppercase tracking-widest">{t.appDeveloper}</p>
             <h3 className="text-3xl font-black text-amber-400 drop-shadow-lg">{t.developerName}</h3>
             <p className="text-[10px] font-black opacity-40">{t.version}</p>
          </div>
        </div>
      );
    }
    if (currentSubView === 'mafatih') {
      return <MafatihAlJinan lang={lang} onBack={() => setCurrentSubView('none')} />;
    }
    if (currentSubView === 'rakaat-counter') {
      return <RakaatCounter lang={lang} onBack={() => setCurrentSubView('none')} isDarkMode={isDarkMode} />;
    }
    if (currentSubView === 'kamil-ziyarat') {
      return <KamilAlZiyarat lang={lang} onBack={() => setCurrentSubView('none')} />;
    }
    if (currentSubView === 'ramadan-dua' && selectedRamadanDuaId) {
      return <RamadanSupplicationViewer lang={lang} supplicationId={selectedRamadanDuaId} onBack={() => setCurrentSubView('ramadan-deeds')} />;
    }
    if (currentSubView === 'ramadan-deeds') {
      return <RamadanDeeds lang={lang} onBack={() => setCurrentSubView('none')} onViewSupplication={(id) => { setSelectedRamadanDuaId(id); setCurrentSubView('ramadan-dua'); }} />;
    }
    if (currentSubView === 'rajab-deeds') {
      return <RajabDeeds lang={lang} onBack={() => setCurrentSubView('none')} />;
    }
    if (currentSubView === 'shaaban-deeds') {
      return <ShaabanDeeds lang={lang} onBack={() => setCurrentSubView('none')} />;
    }
    if (currentSubView === 'duas-list') {
      return <DailyDuasList lang={lang} onSelectDay={(idx) => { setSelectedDayDua(idx); setCurrentSubView('dua'); }} onBack={() => setCurrentSubView('none')} />;
    }
    if (currentSubView === 'dua' && selectedDayDua !== null) {
      return <DailySupplications lang={lang} dayIndex={selectedDayDua} onBack={() => setCurrentSubView('duas-list')} />;
    }
    if (currentSubView === 'ziyarat') {
      return <ZiyaratViewer lang={lang} onBack={() => setCurrentSubView('none')} />;
    }
    if (currentSubView === 'notifications') {
      return <NotificationSettings lang={lang} onBack={() => setCurrentSubView('none')} />;
    }

    switch (activeTab) {
      case Tab.Home:
        return (
          <div className="flex flex-col min-h-screen pb-40 animate-in fade-in duration-1000">
            <header className={`${isDarkMode ? 'bg-black/10 text-white border-white/5' : 'bg-white/10 text-emerald-950 border-white/20'} backdrop-blur-3xl p-6 md:p-10 pt-16 md:pt-24 rounded-b-[4rem] border-b relative overflow-hidden transition-all duration-700`}>
              <div className="flex justify-between items-center mb-8 relative z-10">
                <div className="flex flex-col">
                  <h1 className={`text-3xl md:text-5xl font-black tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-amber-200 drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]' : 'text-emerald-900 drop-shadow-md'}`}>
                    {t.appName}
                    <Sparkles className={isDarkMode ? 'text-amber-400 animate-pulse' : 'text-emerald-500'} size={24} />
                  </h1>
                  <div className={`flex items-center gap-1.5 text-xs font-bold mt-2 px-3 py-1 rounded-full w-fit backdrop-blur-md border ${isDarkMode ? 'text-white/70 bg-white/5 border-white/10' : 'text-emerald-900/70 bg-white/40 border-emerald-200'}`}>
                     <MapPin size={14} className={isDarkMode ? 'text-amber-400' : 'text-emerald-600'} />
                     <span>{t.currentLocation}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={toggleTheme} className={`p-4 rounded-3xl backdrop-blur-xl border transition-all active:scale-90 ${isDarkMode ? 'bg-white/5 text-amber-300 border-white/10 shadow-[0_0_15px_rgba(251,191,36,0.3)]' : 'bg-white/40 text-emerald-700 border-white shadow-xl'}`}>
                    {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                  </button>
                  <button onClick={() => setIsDuaMenuOpen(true)} className={`p-4 rounded-3xl backdrop-blur-xl border transition-all active:scale-90 ${isDarkMode ? 'bg-white/5 text-white border-white/10' : 'bg-white/40 text-emerald-900 border-white shadow-xl'}`}>
                    <List size={24} strokeWidth={3} />
                  </button>
                </div>
              </div>
              
              <div className="text-center py-6 relative z-10">
                <p className={`text-7xl md:text-9xl font-black tracking-tighter tabular-nums drop-shadow-2xl ${isDarkMode ? 'text-white' : 'text-emerald-950'}`}>
                  {currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                </p>
                <div className={`mt-8 inline-block px-10 py-4 rounded-full border backdrop-blur-2xl shadow-2xl transition-all ${isDarkMode ? 'bg-black/10 border-white/10 text-amber-100' : 'bg-white/40 border-white text-emerald-900'}`}>
                  <HijriCalendar lang={lang} isDarkMode={isDarkMode} />
                </div>
              </div>
            </header>

            <main className="flex-1 px-4 md:px-10 pt-10 space-y-10">
              <div className={`backdrop-blur-3xl rounded-[3.5rem] p-1 shadow-2xl border transition-all duration-700 ${isDarkMode ? 'bg-black/10 border-white/5' : 'bg-white/40 border-white/60'}`}>
                <PrayerTimesCard lang={lang} showAdhanSection={showAdhan} showRamadanSection={showRamadan} onTimesLoad={(times) => setPrayerTimes(times)} isDarkMode={isDarkMode} />
              </div>
              
              <div className="grid grid-cols-2 gap-6 md:gap-10">
                <ServiceCardSimple 
                  onClick={() => setActiveTab(Tab.Quran)} 
                  icon={<BookOpen />} 
                  label={t.quranTitle} 
                  isDarkMode={isDarkMode} 
                  accentColor="text-amber-400" 
                />
                <ServiceCardSimple 
                  onClick={() => setActiveTab(Tab.Tasbih)} 
                  icon={<Fingerprint />} 
                  label={t.tasbih} 
                  isDarkMode={isDarkMode} 
                  accentColor="text-emerald-400" 
                />
              </div>

              <button 
                 onClick={() => setActiveTab(Tab.Qibla)}
                 className="relative group w-full h-40 md:h-52 rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/10 transition-all active:scale-95"
              >
                 <img src={BG_QIBLA} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className={`absolute inset-0 backdrop-blur-[2px] transition-colors ${isDarkMode ? 'bg-black/60 group-hover:bg-black/40' : 'bg-emerald-900/40 group-hover:bg-emerald-900/30'}`} />
                 <div className="relative z-10 flex items-center justify-between px-10 md:px-16 h-full">
                   <div className="flex items-center gap-6 md:gap-10">
                     <div className={`w-16 h-16 md:w-20 md:h-20 backdrop-blur-xl rounded-3xl flex items-center justify-center border transition-all ${isDarkMode ? 'bg-white/10 border-white/20' : 'bg-white/20 border-white/40'}`}>
                        <Compass size={36} className={isDarkMode ? 'text-amber-200' : 'text-white'} strokeWidth={2.5} />
                     </div>
                     <span className={`font-black text-2xl md:text-4xl drop-shadow-lg text-white`}>{t.qiblaTitle}</span>
                   </div>
                   <ChevronLeft className={`w-10 h-10 ${lang === 'ar' ? '' : 'rotate-180'} text-amber-300`} strokeWidth={3} />
                 </div>
              </button>
            </main>

            {isDuaMenuOpen && (
              <div className="fixed inset-0 z-[200] flex animate-in fade-in duration-500">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsDuaMenuOpen(false)} />
                <div className={`relative w-[85%] max-w-[400px] backdrop-blur-3xl shadow-2xl flex flex-col h-full animate-in ${lang === 'ar' ? 'slide-in-from-right' : 'slide-in-from-left'} duration-600 border-x transition-colors ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-white/90 border-emerald-100'}`}>
                  <header className={`p-8 flex items-center justify-between border-b ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-emerald-50 border-emerald-100 text-emerald-950'}`}>
                    <div className="flex items-center gap-5">
                      <List size={30} className={isDarkMode ? 'text-amber-300' : 'text-emerald-600'} strokeWidth={3} />
                      <h2 className="text-2xl font-black">{t.more}</h2>
                    </div>
                    <button onClick={() => setIsDuaMenuOpen(false)} className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-emerald-100'}`}><X size={26} /></button>
                  </header>
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 pt-10">
                     <MenuBtn isDarkMode={isDarkMode} icon={<RotateCcw />} title={t.rakaatCounter} onClick={() => { setCurrentSubView('rakaat-counter'); setIsDuaMenuOpen(false); }} color={isDarkMode ? "bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "bg-emerald-100 text-emerald-800"} />
                     <MenuBtn isDarkMode={isDarkMode} icon={<Library />} title={t.mafatihAlJinan} onClick={() => { setCurrentSubView('mafatih'); setIsDuaMenuOpen(false); }} color={isDarkMode ? "bg-amber-500/20 text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]" : "bg-amber-100 text-amber-700"} />
                     <MenuBtn isDarkMode={isDarkMode} icon={<Sun />} title={t.dailyDuas} onClick={() => { setCurrentSubView('duas-list'); setIsDuaMenuOpen(false); }} color={isDarkMode ? "bg-amber-400/20 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.2)]" : "bg-amber-100 text-amber-700"} />
                     <MenuBtn isDarkMode={isDarkMode} icon={<Moon />} title={t.ramadanDeeds} onClick={() => { setCurrentSubView('ramadan-deeds'); setIsDuaMenuOpen(false); }} color={isDarkMode ? "bg-emerald-400/20 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.2)]" : "bg-emerald-100 text-emerald-700"} />
                     <MenuBtn isDarkMode={isDarkMode} icon={<Star />} title={t.rajabDeeds} onClick={() => { setCurrentSubView('rajab-deeds'); setIsDuaMenuOpen(false); }} color={isDarkMode ? "bg-blue-400/20 text-blue-300 shadow-[0_0_15px_rgba(96,165,250,0.2)]" : "bg-blue-100 text-blue-700"} />
                     <MenuBtn isDarkMode={isDarkMode} icon={<Sparkles />} title={t.shaabanDeeds} onClick={() => { setCurrentSubView('shaaban-deeds'); setIsDuaMenuOpen(false); }} color={isDarkMode ? "bg-purple-400/20 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]" : "bg-purple-100 text-purple-700"} />
                     <MenuBtn isDarkMode={isDarkMode} icon={<Book />} title={t.kamilAlZiyarat} onClick={() => { setCurrentSubView('kamil-ziyarat'); setIsDuaMenuOpen(false); }} color={isDarkMode ? "bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "bg-emerald-100 text-emerald-800"} />
                     <MenuBtn isDarkMode={isDarkMode} icon={<Heart />} title={t.ziyaratTitle} onClick={() => { setCurrentSubView('ziyarat'); setIsDuaMenuOpen(false); }} color={isDarkMode ? "bg-rose-400/20 text-rose-300 shadow-[0_0_15px_rgba(251,113,133,0.2)]" : "bg-rose-100 text-rose-700"} />
                     <div className={`pt-8 mt-4 border-t ${isDarkMode ? 'border-white/5' : 'border-emerald-100'}`}>
                        <MenuBtn isDarkMode={isDarkMode} icon={<Share2 />} title={t.developerAccounts} onClick={() => { setCurrentSubView('developer-accounts'); setIsDuaMenuOpen(false); }} color={isDarkMode ? "bg-amber-500/20 text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]" : "bg-amber-100 text-amber-700"} />
                        <MenuBtn isDarkMode={isDarkMode} icon={<Settings />} title={t.settingsTitle} onClick={() => { setActiveTab(Tab.Settings); setIsDuaMenuOpen(false); }} color={isDarkMode ? "bg-white/5 text-white/50" : "bg-slate-100 text-slate-500"} />
                     </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case Tab.Quran:
        return <QuranReader lang={lang} onBack={() => setActiveTab(Tab.Home)} />;
      case Tab.Tasbih:
        return <TasbihCounter lang={lang} onBack={() => setActiveTab(Tab.Home)} isDarkMode={isDarkMode} />;
      case Tab.Qibla:
        return <QiblaFinder lang={lang} onBack={() => setActiveTab(Tab.Home)} />;
      case Tab.Settings:
        return (
          <div className="p-6 md:p-12 pb-40 space-y-10 animate-in slide-in-from-bottom-12 duration-800 min-h-screen">
            <h2 className={`text-3xl md:text-5xl font-black drop-shadow-xl flex items-center gap-4 ${isDarkMode ? 'text-white' : 'text-emerald-950'}`}>
              {t.settingsTitle}
              <Settings size={32} className={isDarkMode ? 'text-amber-400' : 'text-emerald-600'} />
            </h2>
            <section className="space-y-6">
              <div className={`backdrop-blur-3xl rounded-[3rem] shadow-2xl border p-2 divide-y transition-colors duration-700 ${isDarkMode ? 'bg-black/20 border-white/5 divide-white/5' : 'bg-white border-emerald-100 divide-emerald-50'}`}>
                <button onClick={() => setCurrentSubView('notifications')} className={`w-full p-6 md:p-10 flex justify-between items-center rounded-[2rem] transition-all hover:bg-white/5 ${isDarkMode ? 'text-white' : 'text-emerald-950'}`}>
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-white/5 text-amber-400' : 'bg-emerald-50 text-emerald-600'}`}><Bell size={24} /></div>
                    <span className="font-black text-lg md:text-2xl">{t.notificationSettings}</span>
                  </div>
                  <ChevronRight size={28} className={`${lang === 'ar' ? 'rotate-180' : ''} opacity-30`}/>
                </button>
                <button onClick={toggleLanguage} className={`w-full p-6 md:p-10 flex justify-between items-center rounded-[2rem] transition-all hover:bg-white/5 ${isDarkMode ? 'text-white' : 'text-emerald-950'}`}>
                   <div className="flex items-center gap-5">
                     <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-white/5 text-amber-400' : 'bg-emerald-50 text-emerald-600'}`}><Globe size={24} /></div>
                     <span className="font-black text-lg md:text-2xl">{t.language}</span>
                   </div>
                   <span className={`font-black px-5 py-2 rounded-full border ${isDarkMode ? 'text-amber-400 bg-white/5 border-white/10' : 'text-emerald-700 bg-emerald-50 border-emerald-100'}`}>{lang === 'ar' ? 'English' : 'العربية'}</span>
                </button>
                <div className={`w-full p-6 md:p-10 flex justify-between items-center rounded-[2rem] ${isDarkMode ? 'text-white' : 'text-emerald-950'}`}>
                   <div className="flex items-center gap-5">
                     <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-white/5 text-amber-400' : 'bg-emerald-50 text-emerald-600'}`}><Palette size={24} /></div>
                     <span className="font-black text-lg md:text-2xl">{t.darkMode}</span>
                   </div>
                   <button onClick={toggleTheme} className={`w-14 h-8 rounded-full relative transition-all ${isDarkMode ? 'bg-amber-400' : 'bg-slate-200'}`}>
                      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${isDarkMode ? (lang === 'ar' ? 'left-1' : 'right-1') : (lang === 'ar' ? 'right-1' : 'left-1')}`} />
                   </button>
                </div>
                <button onClick={() => setCurrentSubView('developer-accounts')} className={`w-full p-6 md:p-10 flex justify-between items-center rounded-[2rem] transition-all hover:bg-white/5 ${isDarkMode ? 'text-white' : 'text-emerald-950'}`}>
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-white/5 text-amber-400' : 'bg-emerald-50 text-emerald-600'}`}><Share2 size={24} /></div>
                    <span className="font-black text-lg md:text-2xl">{t.developerAccounts}</span>
                  </div>
                  <ChevronRight size={28} className={`${lang === 'ar' ? 'rotate-180' : ''} opacity-30`}/>
                </button>
              </div>
            </section>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto min-h-screen relative overflow-hidden flex flex-col transition-colors duration-1000 ${isDarkMode ? 'bg-black' : 'bg-emerald-50'} ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000">
        <img src={isDarkMode ? BG_DARK : BG_LIGHT} alt="Shrine Background" className="w-full h-full object-cover scale-105 blur-[1px]" />
        <div className={`absolute inset-0 transition-colors duration-1000 ${isDarkMode ? 'bg-black/50' : 'bg-white/10'}`} />
      </div>

      <div className="flex-1 overflow-y-auto relative z-10 scroll-smooth">
        {renderContent()}
      </div>

      <nav className={`fixed bottom-0 left-0 right-0 max-w-4xl mx-auto backdrop-blur-3xl border-t flex justify-around items-center py-6 md:py-8 px-4 md:px-10 z-50 rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] transition-colors duration-700 ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-white/80 border-emerald-100'}`}>
        <NavButton active={activeTab === Tab.Home} isDarkMode={isDarkMode} onClick={() => { setActiveTab(Tab.Home); setCurrentSubView('none'); }} icon={<Home className="w-7 h-7 md:w-9 md:h-9" />} label={t.home} />
        <NavButton active={activeTab === Tab.Quran} isDarkMode={isDarkMode} onClick={() => { setActiveTab(Tab.Quran); setCurrentSubView('none'); }} icon={<BookOpen className="w-7 h-7 md:w-9 md:h-9" />} label={t.quran} />
        <NavButton active={activeTab === Tab.Tasbih} isDarkMode={isDarkMode} onClick={() => { setActiveTab(Tab.Tasbih); setCurrentSubView('none'); }} icon={<Fingerprint className="w-7 h-7 md:w-9 md:h-9" />} label={t.tasbih} />
        <NavButton active={activeTab === Tab.Settings} isDarkMode={isDarkMode} onClick={() => { setActiveTab(Tab.Settings); setCurrentSubView('none'); }} icon={<Settings className="w-7 h-7 md:w-9 md:h-9" />} label={t.more} />
      </nav>
    </div>
  );
};

const SocialLink = ({ icon, label, url, color, isDarkMode }: any) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className={`w-full p-6 rounded-[2.5rem] flex items-center gap-6 backdrop-blur-3xl border transition-all hover:scale-[1.02] active:scale-95 shadow-xl group ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-emerald-100'}`}>
    <div className={`w-16 h-16 ${color} rounded-3xl flex items-center justify-center shadow-lg shrink-0 border border-white/5 group-hover:rotate-6 transition-transform`}>
      {React.cloneElement(icon as React.ReactElement, { size: 32, strokeWidth: 2.5 })}
    </div>
    <div className="flex-1 text-right">
      <span className={`text-xl font-black block leading-tight ${isDarkMode ? 'text-white' : 'text-emerald-950'}`}>{label}</span>
      <span className={`text-xs opacity-40 font-bold tracking-tighter block mt-1`}>{url.replace('https://', '').split('/')[0]}</span>
    </div>
    <ChevronLeft size={24} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-[-4px] transition-all" />
  </a>
);

const ServiceCardSimple = ({ onClick, icon, label, isDarkMode, accentColor }: any) => (
  <button onClick={onClick} className={`h-40 md:h-52 rounded-[3.5rem] flex flex-col items-center justify-center space-y-4 shadow-2xl border transition-all active:scale-95 backdrop-blur-3xl ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/40 border-white'}`}>
    <div className={`w-16 h-16 md:w-20 md:h-20 backdrop-blur-xl rounded-3xl flex items-center justify-center border transition-all ${isDarkMode ? 'bg-white/10 border-white/20' : 'bg-white/50 border-white'} ${accentColor}`}>
      {React.cloneElement(icon as React.ReactElement, { size: 36 })}
    </div>
    <span className={`font-black text-lg md:text-2xl drop-shadow-md text-center px-4 ${isDarkMode ? 'text-white' : 'text-emerald-950'}`}>{label}</span>
  </button>
);

const MenuBtn = ({ icon, title, onClick, color, isDarkMode }: any) => (
  <button onClick={onClick} className={`w-full p-6 rounded-[2.5rem] flex items-center gap-5 transition-all border shadow-xl group hover:bg-white/10 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-emerald-100'}`}>
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center shadow-lg shrink-0 border border-white/5 group-hover:rotate-12 transition-transform`}>
      {React.cloneElement(icon as React.ReactElement, { className: "w-7 h-7", strokeWidth: 3 })}
    </div>
    <div className="text-right flex-1">
      <span className={`text-lg font-black block leading-tight ${isDarkMode ? 'text-white' : 'text-emerald-950'}`}>{title}</span>
    </div>
    <ChevronLeft size={20} className="opacity-20" />
  </button>
);

const NavButton: React.FC<{ active: boolean, isDarkMode: boolean, onClick: () => void, icon: React.ReactNode, label: string }> = ({ active, isDarkMode, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-2 md:gap-3 flex-1 transition-all duration-500 ${active ? (isDarkMode ? 'text-amber-400' : 'text-emerald-700') + ' scale-110' : (isDarkMode ? 'text-white/40' : 'text-emerald-300') + ' hover:opacity-80'}`}>
    <div className={`p-3 md:p-4 rounded-[1.8rem] transition-all duration-500 relative ${active ? (isDarkMode ? 'bg-white/5 border-white/10 shadow-[0_0_20px_rgba(251,191,36,0.3)]' : 'bg-emerald-50 border-emerald-100 shadow-xl') + ' border' : ''}`}>
      {icon}
      {active && <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,1)]' : 'bg-emerald-600'}`}></div>}
    </div>
    <span className={`text-[10px] md:text-xs font-black tracking-tight ${active ? 'opacity-100' : 'opacity-40'}`}>{label}</span>
  </button>
);

export default App;
