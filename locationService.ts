
export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  });
};

export const calculateQibla = (lat: number, lng: number): number => {
  const mLat = 21.4225 * (Math.PI / 180);
  const mLng = 39.8262 * (Math.PI / 180);
  const pLat = lat * (Math.PI / 180);
  const pLng = lng * (Math.PI / 180);

  const y = Math.sin(mLng - pLng);
  const x = Math.cos(pLat) * Math.tan(mLat) - Math.sin(pLat) * Math.cos(mLng - pLng);
  let qibla = Math.atan2(y, x) * (180 / Math.PI);
  return (qibla + 360) % 360;
};

/**
 * تقريب مبسط للانحراف المغناطيسي (Magnetic Declination)
 * يساعد في تحويل الشمال المغناطيسي إلى شمال حقيقي لتحسين دقة القبلة.
 * هذا النموذج يعتمد على تقريب رياضي للموقع الجغرافي.
 */
export const calculateMagneticDeclination = (lat: number, lng: number): number => {
  // نموذج تقريبي بسيط جداً يعتمد على خطوط الطول والعرض
  // في التطبيقات الاحترافية يستخدم نموذج WMM (World Magnetic Model)
  // هنا نستخدم تقريب خطي للمناطق العربية والشرق الأوسط بشكل أساسي
  const declination = (lng - 30) * 0.1 + (lat - 25) * 0.05;
  return declination;
};
