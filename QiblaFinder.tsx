
import React, { useState, useEffect, useRef } from 'react';
import { Compass, Navigation, AlertCircle, ShieldCheck, CheckCircle2, Info } from 'lucide-react';
import { calculateQibla, getCurrentPosition, calculateMagneticDeclination } from '../services/locationService';
import { Language } from '../types';
import { translations } from '../translations';

interface QiblaFinderProps {
  onBack: () => void;
  lang: Language;
}

const QiblaFinder: React.FC<QiblaFinderProps> = ({ onBack, lang }) => {
  const [qiblaDir, setQiblaDir] = useState<number | null>(null);
  const [declination, setDeclination] = useState(0);
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [isAligned, setIsAligned] = useState(false);
  const t = translations[lang];
  const headingRef = useRef(0);

  useEffect(() => {
    const initQibla = async () => {
      try {
        const pos = await getCurrentPosition();
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        
        const angle = calculateQibla(lat, lng);
        const magDecl = calculateMagneticDeclination(lat, lng);
        
        setQiblaDir(angle);
        setDeclination(magDecl);
        setLoading(false);
      } catch (err) {
        setError(t.locationError);
        setLoading(false);
      }
    };
    
    initQibla();
    
    const setupListeners = () => {
      if ('ondeviceorientationabsolute' in window) {
        (window as any).addEventListener('deviceorientationabsolute', handleOrientation as any);
      } else if ('ondeviceorientation' in window) {
        (window as any).addEventListener('deviceorientation', handleOrientation as any);
      }
    };

    if (typeof (DeviceOrientationEvent as any).requestPermission !== 'function') {
      setPermissionGranted(true);
      setupListeners();
    }
    
    return () => {
      (window as any).removeEventListener('deviceorientationabsolute', handleOrientation as any);
      (window as any).removeEventListener('deviceorientation', handleOrientation as any);
    };
  }, []);

  const handleOrientation = (e: DeviceOrientationEvent) => {
    let heading = 0;
    let isTrueNorth = false;

    if ((e as any).webkitCompassHeading) {
      heading = (e as any).webkitCompassHeading;
      isTrueNorth = true;
    } else if (e.absolute && e.alpha !== null) {
      heading = 360 - e.alpha;
      isTrueNorth = true;
    } else if (e.alpha !== null) {
      // إذا لم يكن التوجه مطلقاً، نضيف الانحراف المغناطيسي للموقع
      heading = (360 - e.alpha) + declination;
      isTrueNorth = false;
    }

    setDeviceHeading(heading);
    headingRef.current = heading;

    if (qiblaDir !== null) {
      const diff = Math.abs(((qiblaDir - heading + 540) % 360) - 180);
      const isNowAligned = diff < 5;
      setIsAligned(isNowAligned);
      if (isNowAligned && !isAligned && 'vibrate' in navigator) navigator.vibrate(20);
    }
  };

  const requestPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          setPermissionGranted(true);
          (window as any).addEventListener('deviceorientation', handleOrientation as any);
        } else {
          setError(t.locationError);
          setPermissionGranted(false);
        }
      } catch (err) { setError(t.locationError); }
    }
  };

  const needleAngle = qiblaDir !== null ? (qiblaDir - deviceHeading) : 0;

  return (
    <div className="min-h-screen p-6 flex flex-col items-center animate-in fade-in duration-700">
      <div className="w-full flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-white drop-shadow-lg">{t.qiblaTitle}</h2>
        <button onClick={onBack} className="text-amber-100 font-bold bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 active:scale-95 transition-all">{t.back}</button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center mt-32 space-y-6">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white"></div>
          <p className="text-white/60 font-black uppercase tracking-widest text-xs">{t.locating}</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/20 backdrop-blur-xl p-8 rounded-[3rem] border border-red-500/30 text-center space-y-4 mt-10 shadow-2xl">
          <AlertCircle className="mx-auto text-red-400" size={48} />
          <p className="text-white font-black">{error}</p>
        </div>
      ) : permissionGranted === false || permissionGranted === null ? (
        <div className="flex flex-col items-center mt-20 space-y-10 text-center px-6">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center text-amber-200 shadow-2xl border border-white/10">
            <Compass size={48} />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white drop-shadow-md">{t.enableCompass}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{t.compassReason}</p>
          </div>
          <button 
            onClick={requestPermission}
            className="bg-emerald-600 text-white px-10 py-4 rounded-[2rem] font-black shadow-2xl active:scale-95 transition-all flex items-center gap-3"
          >
            <ShieldCheck size={24} />
            {t.enableSensors}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full space-y-12 mt-4">
          <div className="text-center h-10">
             {isAligned ? (
               <div className="flex items-center justify-center gap-3 text-emerald-400 animate-pulse bg-emerald-400/10 px-6 py-2 rounded-full border border-emerald-400/20">
                 <CheckCircle2 size={24} />
                 <span className="font-black tracking-tight drop-shadow-md">{t.alignedWithQibla}</span>
               </div>
             ) : (
               <div className="flex items-center justify-center gap-2 text-white/40">
                 <Info size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">تصحيح الشمال الحقيقي مفعل</span>
               </div>
             )}
          </div>

          <div className="relative w-80 h-80">
            {/* الخلفية المتوهجة عند المحاذاة */}
            <div className={`absolute inset-0 rounded-full blur-[40px] transition-all duration-1000 ${isAligned ? 'bg-emerald-500/30 scale-110' : 'bg-transparent'}`}></div>
            
            <div className={`absolute inset-0 border-[12px] rounded-full shadow-2xl bg-white/5 backdrop-blur-md transition-all duration-500 ${isAligned ? 'border-emerald-500/50 scale-105 shadow-emerald-500/20' : 'border-white/10'}`}></div>
            
            {/* سهم الكعبة المتحرك */}
            <div className="absolute inset-0 pointer-events-none" style={{ transform: `rotate(${needleAngle}deg)`, transition: 'transform 0.15s cubic-bezier(0.1, 0, 0.3, 1)' }}>
               <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className={`w-14 h-16 bg-emerald-950/80 backdrop-blur-xl rounded-2xl border-2 shadow-2xl flex flex-col items-center justify-center transition-all ${isAligned ? 'border-amber-400 scale-125 shadow-amber-500/40' : 'border-emerald-500/40'}`}>
                     <Navigation size={28} className={isAligned ? 'text-amber-400' : 'text-white'} fill="currentColor" />
                  </div>
                  <div className={`w-1 h-10 mt-1 transition-colors ${isAligned ? 'bg-amber-400' : 'bg-emerald-500/40'}`}></div>
               </div>
            </div>

            {/* درجات البوصلة والجهات الأصلية */}
            <div className="absolute inset-10 border border-white/10 rounded-full flex items-center justify-center" style={{ transform: `rotate(${-deviceHeading}deg)`, transition: 'transform 0.15s cubic-bezier(0.1, 0, 0.3, 1)' }}>
              <span className="absolute top-2 font-black text-red-500 text-base drop-shadow-lg">N</span>
              <span className="absolute bottom-2 font-black text-white/40 text-sm">S</span>
              <span className="absolute left-2 font-black text-white/40 text-sm">W</span>
              <span className="absolute right-2 font-black text-white/40 text-sm">E</span>
              
              {/* علامات الدرجات */}
              {[...Array(12)].map((_, i) => (
                <div key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 30}deg)` }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-white/10"></div>
                </div>
              ))}
            </div>

            {/* المركز */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-20 h-20 bg-emerald-950/60 backdrop-blur-3xl rounded-full shadow-2xl border-4 flex flex-col items-center justify-center z-10 transition-all ${isAligned ? 'border-amber-400 bg-emerald-900/40' : 'border-white/10'}`}>
                <span className="text-white font-black text-xs">🕋</span>
                <div className={`w-1.5 h-1.5 rounded-full mt-1 ${isAligned ? 'bg-amber-400 animate-ping' : 'bg-white/20'}`}></div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-7xl font-black text-white tabular-nums drop-shadow-2xl">
                {Math.round((needleAngle + 360) % 360)}°
              </span>
              <span className="text-amber-200 font-black text-2xl drop-shadow-lg">{t.degree}</span>
            </div>
            <p className="text-white/40 text-xs font-black uppercase tracking-[0.4em]">{t.qiblaAngle}</p>
          </div>

          <div className="w-full max-w-sm space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-xl border border-white/5 text-center">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">زاوية القبلة</p>
                <span className="text-2xl font-black text-amber-200 tabular-nums">{Math.round(qiblaDir || 0)}°</span>
              </div>
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-xl border border-white/5 text-center">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">تصحيح الموقع</p>
                <span className="text-2xl font-black text-emerald-400 tabular-nums">{declination.toFixed(1)}°</span>
              </div>
            </div>
            
            <div className="bg-emerald-950/40 backdrop-blur-2xl text-white p-7 rounded-[3rem] shadow-2xl relative overflow-hidden border border-white/5">
               <div className="relative z-10 flex items-center gap-5">
                 <AlertCircle className="text-emerald-400 shrink-0" size={32} />
                 <p className="text-xs leading-relaxed font-bold text-white/70">
                   {t.compassNote} 
                   <br />
                   <span className="text-amber-200/50 block mt-1">يتم احتساب الانحراف المغناطيسي (Magnetic Declination) تلقائياً بناءً على إحداثيات موقعك لضمان توجيه دقيق للشمال الحقيقي.</span>
                 </p>
               </div>
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mb-16 -mr-16 blur-2xl"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QiblaFinder;
