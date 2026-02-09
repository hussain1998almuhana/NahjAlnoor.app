
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, ArrowRight, Bell, Volume2, Clock, CheckCircle2, 
  Play, ShieldAlert, Smartphone, VolumeX, User, Loader2, 
  Square, BellRing, ChevronDown, ChevronUp, Minus, Plus, Info
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface NotificationSettingsProps {
  onBack: () => void;
  lang: Language;
}

interface PrayerNotificationConfig {
  enabled: boolean;
  offset: number; // minutes relative to prayer time (-60 to 60)
  sound: 'none' | 'maytham' | 'osama' | 'abather' | 'amer' | 'bassem' | 'beep';
}

const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ onBack, lang }) => {
  const t = translations[lang];
  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;

  const [configs, setConfigs] = useState<Record<string, PrayerNotificationConfig>>(() => {
    const saved = localStorage.getItem('prayer_notifications_final_v5');
    if (saved) return JSON.parse(saved);
    
    return PRAYERS.reduce((acc, p) => ({
      ...acc,
      [p]: { enabled: true, offset: 0, sound: 'osama' }
    }), {});
  });

  const [activePrayer, setActivePrayer] = useState<typeof PRAYERS[number] | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(
    'Notification' in window ? Notification.permission : 'denied'
  );
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    localStorage.setItem('prayer_notifications_final_v5', JSON.stringify(configs));
  }, [configs]);

  const requestSystemPermission = async () => {
    if (!('Notification' in window)) return;
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
  };

  const updateConfig = (prayer: string, key: keyof PrayerNotificationConfig, value: any) => {
    setConfigs(prev => ({
      ...prev,
      [prayer]: { ...prev[prayer], [key]: value }
    }));
    if ('vibrate' in navigator) navigator.vibrate(10);
  };

  const previewSound = (sound: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); 
    if (sound === 'none') return;

    // إيقاف أي صوت يعمل حالياً بشكل كامل وتفريغ الذاكرة
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
      audioRef.current.load();
      audioRef.current = null;
    }

    // إذا كان الصوت المطلوب هو نفسه الذي يعمل حالياً، نكتفي بالإيقاف
    if (currentlyPlaying === sound) {
      setCurrentlyPlaying(null);
      setIsLoadingAudio(null);
      return;
    }

    // روابط مباشرة من أرشيفات صوتية سريعة (Direct Links)
    const SOUND_URLS: Record<string, string> = {
      maytham: 'https://ia801007.us.archive.org/1/items/AdanCollection/Maytham_Al_Tamar.mp3',
      osama: 'https://ia801007.us.archive.org/1/items/AdanCollection/Osama_Al_Karbalai.mp3',
      abather: 'https://ia600205.us.archive.org/21/items/Abather-Adhan/Abather-Adhan.mp3',
      amer: 'https://ia801007.us.archive.org/1/items/AdanCollection/Amer_Al_Kazemi.mp3',
      bassem: 'https://ia903104.us.archive.org/28/items/shia-adhan-collection/Basim_Al-Karbalai.mp3',
      beep: 'https://actions.google.com/sounds/v1/alarms/beep_short.ogg'
    };

    const url = SOUND_URLS[sound];

    if (url) {
        setIsLoadingAudio(sound);
        setCurrentlyPlaying(sound);

        const audio = new Audio();
        audio.src = url;
        audio.preload = "auto";
        audio.crossOrigin = "anonymous";
        audioRef.current = audio;

        // التحقق من بدء التشغيل الحقيقي
        audio.addEventListener('playing', () => {
          setIsLoadingAudio(null);
        });

        audio.addEventListener('ended', () => {
          setCurrentlyPlaying(null);
          setIsLoadingAudio(null);
        });

        audio.addEventListener('error', (e) => {
          console.error("Audio Load Error Details:", audio.error);
          setIsLoadingAudio(null);
          setCurrentlyPlaying(null);
          alert("خطأ: تعذر الوصول للملف الصوتي. يرجى محاولة الضغط مرة أخرى أو التحقق من اتصالك بالإنترنت.");
        });

        // تنفيذ التشغيل مع معالجة سياسات المتصفح الصارمة
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn("Playback blocked by browser policy. Interaction required.", error);
            // في حال تم حظر التشغيل التلقائي، نقوم بتحديث الحالة ليعرف المستخدم
            setIsLoadingAudio(null);
            setCurrentlyPlaying(null);
          });
        }
    }
  };

  const getPrayerName = (p: string) => {
    switch (p) {
        case 'Fajr': return t.fajr;
        case 'Dhuhr': return t.dhuhr;
        case 'Asr': return t.asr;
        case 'Maghrib': return t.maghrib;
        case 'Isha': return t.isha;
        default: return p;
    }
  };

  const formatOffset = (offset: number) => {
    if (offset === 0) return t.atTime;
    const abs = Math.abs(offset);
    return offset < 0 ? `${abs} ${t.minsBefore}` : `${abs} ${t.minsAfter}`;
  };

  const getSoundLabel = (s: string) => {
    switch(s) {
      case 'maytham': return t.maythamAdhan;
      case 'osama': return t.osamaAdhan;
      case 'abather': return t.abatherAdhan;
      case 'amer': return t.amerAdhan;
      case 'bassem': return t.bassemAdhan;
      case 'beep': return t.shortBeep;
      default: return t.noneSound;
    }
  };

  return (
    <div className="min-h-screen flex flex-col animate-in fade-in duration-500 bg-emerald-50/30 dark:bg-slate-950">
      <header className="bg-white/80 backdrop-blur-xl text-emerald-900 p-6 pt-12 rounded-b-[3.5rem] sticky top-0 z-50 flex items-center border-b border-emerald-100 shadow-xl dark:bg-slate-900/80 dark:border-white/5 dark:text-white">
        <button onClick={onBack} className={`${lang === 'ar' ? 'ml-4' : 'mr-4'} p-3 bg-emerald-50 rounded-2xl active:scale-90 border border-emerald-100 dark:bg-white/5 dark:border-white/10`}>
          <BackIcon size={24} className="text-emerald-700 dark:text-amber-400" />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-xl font-black">{t.notificationSettings}</h2>
        </div>
        <div className="w-12"></div>
      </header>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-40">
        <div className="bg-emerald-600 rounded-[3rem] p-7 shadow-2xl border-4 border-white dark:border-white/5 relative overflow-hidden group">
            <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-2xl shadow-inner group-hover:rotate-12 transition-transform">
                        <Smartphone size={28} className="text-amber-200" />
                    </div>
                    <div>
                        <h3 className="font-black text-white text-lg leading-tight">{t.systemNotifications}</h3>
                        <p className="text-[10px] text-emerald-100/70 font-bold uppercase tracking-wider mt-1">{t.systemNotificationsDesc}</p>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-5 rounded-[2rem] border border-white/20">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 text-white">
                            {notificationPermission === 'granted' ? 
                                <CheckCircle2 size={20} className="text-amber-300" /> : 
                                <ShieldAlert size={20} className="text-amber-200" />
                            }
                            <span className="text-xs font-black">
                                {notificationPermission === 'granted' ? t.permissionGranted : t.grantPermission}
                            </span>
                        </div>
                        {notificationPermission !== 'granted' && (
                            <button 
                                onClick={requestSystemPermission}
                                className="bg-amber-400 text-emerald-900 px-5 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg active:scale-95 transition-all"
                            >
                                {t.grantPermission}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
        </div>

        <div className="space-y-4">
          {PRAYERS.map((prayer) => (
            <div key={prayer} className={`bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-xl border overflow-hidden transition-all duration-500 dark:bg-slate-900/60 ${activePrayer === prayer ? 'border-emerald-500/50 scale-[1.02]' : 'border-transparent'}`}>
              <button 
                  onClick={() => setActivePrayer(activePrayer === prayer ? null : prayer)}
                  className="w-full p-6 flex items-center justify-between"
              >
                  <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl shadow-inner transition-all ${configs[prayer].enabled ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-300 dark:bg-slate-800'}`}>
                          <Bell size={24} />
                      </div>
                      <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                          <p className={`text-lg font-black leading-tight ${configs[prayer].enabled ? 'text-emerald-900 dark:text-white' : 'text-slate-400'}`}>{getPrayerName(prayer)}</p>
                          <p className="text-[10px] text-emerald-600/50 font-black uppercase tracking-widest mt-1 dark:text-amber-200/40">
                              {formatOffset(configs[prayer].offset)} • {getSoundLabel(configs[prayer].sound)}
                          </p>
                      </div>
                  </div>
                  <div className="flex items-center gap-3">
                      {configs[prayer].enabled && <div className="p-1 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/20"><CheckCircle2 size={12} className="text-white" /></div>}
                      <div className="p-2 bg-emerald-50 rounded-full text-emerald-400 dark:bg-white/5">
                        {activePrayer === prayer ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                  </div>
              </button>

              {activePrayer === prayer && (
                  <div className="px-6 pb-10 space-y-8 animate-in slide-in-from-top-3 duration-300 border-t border-emerald-50 dark:border-white/5 pt-6">
                      <div className="flex justify-between items-center bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 dark:bg-white/5 dark:border-white/10">
                          <div className="flex items-center gap-3">
                            <Bell className="text-emerald-600 dark:text-amber-400" size={20} />
                            <span className="text-sm font-black text-emerald-900 dark:text-white">{t.enableNotification}</span>
                          </div>
                          <button 
                              onClick={() => updateConfig(prayer, 'enabled', !configs[prayer].enabled)}
                              className={`w-14 h-8 rounded-full relative transition-all duration-500 ${configs[prayer].enabled ? 'bg-emerald-600' : 'bg-slate-300'}`}
                          >
                              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-500 ${configs[prayer].enabled ? (lang === 'ar' ? 'left-1' : 'right-1') : (lang === 'ar' ? 'right-1' : 'left-1')}`}></div>
                          </button>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3 px-1 text-emerald-700 dark:text-amber-400">
                          <Clock size={20} />
                          <span className="text-xs font-black uppercase tracking-widest">{t.alertOffset}</span>
                        </div>
                        <div className="bg-white p-6 rounded-[2rem] border border-emerald-50 shadow-inner flex items-center justify-between gap-6 dark:bg-slate-800 dark:border-white/5">
                           <button 
                             onClick={() => updateConfig(prayer, 'offset', Math.max(-60, configs[prayer].offset - 5))}
                             className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 hover:bg-emerald-100 dark:bg-white/5 dark:text-white"
                           >
                             <Minus size={20} />
                           </button>
                           <div className="text-center">
                              <span className="text-2xl font-black text-emerald-900 dark:text-white tabular-nums">{formatOffset(configs[prayer].offset)}</span>
                           </div>
                           <button 
                             onClick={() => updateConfig(prayer, 'offset', Math.min(60, configs[prayer].offset + 5))}
                             className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 hover:bg-emerald-100 dark:bg-white/5 dark:text-white"
                           >
                             <Plus size={20} />
                           </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                          <div className="flex items-center gap-3 px-1 text-emerald-700 dark:text-amber-400">
                              <Volume2 size={20} />
                              <span className="text-xs font-black uppercase tracking-widest">{t.sound}</span>
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                              {(['none', 'maytham', 'osama', 'abather', 'amer', 'bassem', 'beep'] as const).map((s) => (
                                  <button 
                                      key={s}
                                      onClick={() => updateConfig(prayer, 'sound', s)}
                                      className={`p-5 rounded-[1.8rem] text-sm font-black transition-all border flex items-center justify-between group ${configs[prayer].sound === s ? 'bg-emerald-600 text-white border-transparent shadow-lg' : 'bg-white text-emerald-900/60 border-emerald-50 dark:bg-slate-800 dark:text-white/60 dark:border-white/5'}`}
                                  >
                                      <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-xl transition-colors ${configs[prayer].sound === s ? 'bg-white/20' : 'bg-emerald-50 dark:bg-white/5'}`}>
                                          {s === 'none' ? <VolumeX size={18} /> : s === 'beep' ? <Volume2 size={18} /> : <User size={18} />}
                                        </div>
                                        <span>{getSoundLabel(s)}</span>
                                      </div>
                                      
                                      {s !== 'none' && (
                                        <div 
                                          onClick={(e) => previewSound(s, e)}
                                          className={`p-3 rounded-full transition-all ${currentlyPlaying === s ? 'bg-white text-emerald-600 scale-110' : 'bg-emerald-50 text-emerald-600 dark:bg-white/5 dark:text-white'}`}
                                        >
                                          {isLoadingAudio === s ? (
                                            <Loader2 size={16} className="animate-spin" />
                                          ) : currentlyPlaying === s ? (
                                            <Square size={16} fill="currentColor" />
                                          ) : (
                                            <Play size={16} fill="currentColor" className={lang === 'ar' ? 'rotate-180' : ''} />
                                          )}
                                        </div>
                                      )}
                                  </button>
                              ))}
                          </div>
                          <button 
                              onClick={() => previewSound(configs[prayer].sound)}
                              className="w-full py-5 bg-emerald-800 text-white rounded-[2rem] text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl active:scale-[0.98] transition-all hover:bg-emerald-700"
                          >
                              <BellRing size={18} />
                              {t.testNotification}
                          </button>
                      </div>
                  </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-8 rounded-[3rem] bg-emerald-950/5 border border-emerald-100 text-center dark:bg-white/5 dark:border-white/5">
           <Info className="mx-auto text-emerald-600 mb-4 dark:text-amber-400" size={32} />
           <p className="text-emerald-900/60 font-bold text-xs leading-relaxed dark:text-white/40">
             تم تحديث قائمة الأصوات وإصلاح مشاكل التشغيل. تأكد من اتصال الإنترنت لسماع المعاينة، وسيتم التشغيل فوراً بمجرد الضغط.
           </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
