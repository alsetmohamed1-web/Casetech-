import React, { useState, useEffect } from 'react';
import {
  X,
  Bell,
  Sparkles,
  TrendingDown,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Send,
  Smartphone,
  ExternalLink,
  ChevronRight,
  Flame,
  Check,
  Zap,
  Tag,
  AlertTriangle,
  Timer
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { OFFICIAL_CONTACT_INFO } from '../data/branding';
import { PHONE_MODELS } from '../data/products';
import { Currency } from '../types';

export interface PriceDropAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPromoAndCheckout?: (promoCode: string) => void;
  onApplyDealToCheckout?: (deal?: any) => void;
  currency?: Currency;
  initialSelectedDevice?: string;
  initialDevice?: string;
}

interface ActiveFlashDeal {
  id: string;
  titleAr: string;
  titleEn: string;
  category: 'case' | 'wallet';
  originalPriceEGP: number;
  dealPriceEGP: number;
  discountPercentage: number;
  timeLeftHours: number;
  initialSecondsRemaining: number;
  remainingUnits: number;
  deviceLabel: string;
}

const ACTIVE_FLASH_DEALS: ActiveFlashDeal[] = [
  {
    id: 'deal-urgent-anime',
    titleAr: 'ماج سيف أساطير الأنمي 3D (لوفي نيكا وجوجو نيون)',
    titleEn: 'Anime Legends Luffy Nika & Gojo 3D UV Case',
    category: 'case',
    originalPriceEGP: 330,
    dealPriceEGP: 235,
    discountPercentage: 29,
    timeLeftHours: 0.3,
    initialSecondsRemaining: 3600 * 0 + 60 * 18 + 45, // 00:18:45 -> Ultra urgent red!
    remainingUnits: 1,
    deviceLabel: 'آيفون وسامسونج (آخر قطعة)',
  },
  {
    id: 'deal-3',
    titleAr: 'كفر سامسونج ألترا كاربون فايبر ضد الصدمات',
    titleEn: 'Galaxy S25 / S24 Ultra Carbon Tactical Case',
    category: 'case',
    originalPriceEGP: 310,
    dealPriceEGP: 235,
    discountPercentage: 24,
    timeLeftHours: 0.8,
    initialSecondsRemaining: 3600 * 0 + 60 * 48 + 22, // 00:48:22 -> Expiring very soon in red!
    remainingUnits: 2,
    deviceLabel: 'سامسونج S25 & S24 & S23 Ultra',
  },
  {
    id: 'deal-1',
    titleAr: 'كفر الآيفون المدرع ماج سيف + حلقة معدنية مذهبة',
    titleEn: 'iPhone 16 / 15 Pro Max Armor MagSafe Case',
    category: 'case',
    originalPriceEGP: 320,
    dealPriceEGP: 229,
    discountPercentage: 28,
    timeLeftHours: 1.5,
    initialSecondsRemaining: 3600 * 1 + 60 * 35 + 40, // 01:35:40 -> Expiring soon in red!
    remainingUnits: 3,
    deviceLabel: 'سلسلة آيفون 16 & 15',
  },
  {
    id: 'deal-2',
    titleAr: 'محفظة الجلد الطبيعي الجملي المحفورة بالاسم',
    titleEn: 'Handmade Genuine Camel Cognac Leather Wallet',
    category: 'wallet',
    originalPriceEGP: 290,
    dealPriceEGP: 210,
    discountPercentage: 27,
    timeLeftHours: 4.8,
    initialSecondsRemaining: 3600 * 4 + 60 * 50 + 15, // 04:50:15
    remainingUnits: 6,
    deviceLabel: 'جميع الموديلات',
  },
];

export const PriceDropAlertsModal: React.FC<PriceDropAlertsModalProps> = ({
  isOpen,
  onClose,
  onApplyPromoAndCheckout,
  onApplyDealToCheckout,
  currency = 'EGP',
  initialSelectedDevice,
  initialDevice,
}) => {
  const { language, isRtl } = useLanguage();
  const effectiveInitialDevice = initialDevice || initialSelectedDevice;
  const [selectedDevice, setSelectedDevice] = useState<string>(effectiveInitialDevice || PHONE_MODELS[0].name);
  const [targetPrice, setTargetPrice] = useState<number>(220);
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');
  const [alertType, setAlertType] = useState<'whatsapp' | 'instant_browser'>('whatsapp');
  const [isAlertSaved, setIsAlertSaved] = useState<boolean>(false);
  const [testNotificationTriggered, setTestNotificationTriggered] = useState<boolean>(false);

  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  // Dynamic countdown timer ticking every 1 second
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  // Find shortest remaining seconds among active deals for the global urgent banner
  const shortestSecs = Math.min(
    ...ACTIVE_FLASH_DEALS.map((d) => Math.max(0, d.initialSecondsRemaining - secondsElapsed))
  );
  const globalMins = Math.floor((shortestSecs % 3600) / 60);
  const globalSecs = shortestSecs % 60;
  const globalTimeString = `00:${String(globalMins).padStart(2, '0')}:${String(globalSecs).padStart(2, '0')}`;

  const handleSaveAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAlertSaved(true);
    setTimeout(() => {
      setTestNotificationTriggered(true);
    }, 900);
  };

  const handleClaimDeal = (deal: ActiveFlashDeal) => {
    onClose();
    if (onApplyDealToCheckout) {
      onApplyDealToCheckout(deal);
    } else if (onApplyPromoAndCheckout) {
      onApplyPromoAndCheckout('Dody15');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden text-stone-100 flex flex-col my-4 max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 bg-gradient-to-r from-stone-950 via-red-950/50 to-stone-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400 shadow-lg shadow-red-500/30">
              <Bell className="w-6 h-6 animate-bounce" style={{ animationDuration: '2.5s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-red-400" />
                  رادار وتنبيهات انخفاض الأسعار اللحظية (Real-time Price Tracker)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-600/30 text-red-300 font-mono font-bold animate-pulse border border-red-500/40">
                  تحديث فوري ⚡
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white">
                تنبيهات العروض الخاطفة وإشعارات الواتساب عند انخفاض السعر
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            title="إغلاق التنبيهات"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Urgent Red Countdown Alert Banner (سقوط العروض القريبة باللون الأحمر) */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-950 via-rose-950/80 to-stone-950 border-2 border-red-500/80 shadow-xl shadow-red-950/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs animate-pulse">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow font-black text-sm">
                🚨
              </span>
              <div>
                <h4 className="font-black text-white sm:text-sm flex items-center gap-2">
                  <span>تنبيه عاجل: خصومات ستنتهي صلاحيتها قريباً جداً!</span>
                  <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
                    محددة باللون الأحمر ⚠️
                  </span>
                </h4>
                <p className="text-red-200 text-[11px] mt-0.5">
                  المنتجات المحددة بإطار أحمر وعداد ينبض ستعود لسعرها الأصلي فور وصول العداد إلى الصفر.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 bg-stone-950/90 px-3 py-1.5 rounded-xl border border-red-500/60 shadow">
              <Clock className="w-4 h-4 text-red-400 animate-spin" style={{ animationDuration: '4s' }} />
              <div className="text-end">
                <span className="text-[10px] text-red-300 block font-bold leading-none">أقرب عرض ينتهي خلال:</span>
                <span className="font-mono font-black text-red-400 text-sm tracking-widest">{globalTimeString}</span>
              </div>
            </div>
          </div>

          {/* Active Live Flash Deals Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-extrabold text-white">
                  عروض التخفيض اللحظية النشطة الآن (Limited Flash Deals):
                </h3>
              </div>
              <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>كود إضافي: Dody15 (-15%)</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {ACTIVE_FLASH_DEALS.map((deal) => {
                const remainingSecs = Math.max(0, deal.initialSecondsRemaining - secondsElapsed);
                const hrs = Math.floor(remainingSecs / 3600);
                const mins = Math.floor((remainingSecs % 3600) / 60);
                const secs = remainingSecs % 60;
                const isExpiringSoon = hrs < 2; // Deals expiring in less than 2 hours are highlighted in red!
                const timeString = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
                const percentElapsed = Math.min(
                  98,
                  Math.max(12, Math.round(((deal.initialSecondsRemaining - remainingSecs) / deal.initialSecondsRemaining) * 100))
                );

                return (
                  <div
                    key={deal.id}
                    className={`p-4 rounded-2xl transition-all flex flex-col justify-between group shadow-lg relative overflow-hidden ${
                      isExpiringSoon
                        ? 'bg-gradient-to-b from-red-950/85 via-stone-900 to-stone-950 border-2 border-red-500/90 ring-2 ring-red-500/40 shadow-red-950/80 shadow-2xl'
                        : 'bg-gradient-to-b from-stone-850 to-stone-950 border border-stone-800 hover:border-amber-500/50'
                    }`}
                  >
                    {/* Top Status & Discount Badges */}
                    <div className="flex items-center justify-between mb-2">
                      {isExpiringSoon ? (
                        <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-mono font-black text-[10px] flex items-center gap-1 shadow-md shadow-red-900/60 animate-pulse">
                          <Flame className="w-3 h-3 text-yellow-300 animate-bounce" />
                          <span>{language === 'ar' ? 'ينتهي قريباً جداً ⚠️' : 'Expiring Soon ⚠️'}</span>
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-400 font-bold">
                          {deal.deviceLabel}
                        </span>
                      )}

                      <span
                        className={`px-2 py-0.5 rounded-full font-mono font-black text-[10px] shadow ${
                          isExpiringSoon
                            ? 'bg-red-500 text-white border border-red-400 ring-1 ring-red-400/50 animate-pulse'
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        -{deal.discountPercentage}%
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {isExpiringSoon && (
                        <span className="text-[10px] text-red-300/80 font-bold block">
                          {deal.deviceLabel}
                        </span>
                      )}

                      <h4 className={`text-xs sm:text-sm font-bold transition-colors line-clamp-2 ${
                        isExpiringSoon ? 'text-white group-hover:text-red-200' : 'text-white group-hover:text-amber-300'
                      }`}>
                        {deal.titleAr}
                      </h4>

                      {/* Price Comparison */}
                      <div className="flex items-baseline gap-2 pt-0.5">
                        <span className={`text-lg font-black ${isExpiringSoon ? 'text-red-400' : 'text-emerald-400'}`}>
                          {deal.dealPriceEGP} ج.م
                        </span>
                        <span className="text-xs text-stone-500 line-through">
                          {deal.originalPriceEGP} ج.م
                        </span>
                      </div>

                      {/* Dynamic Countdown Timer Display */}
                      <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        isExpiringSoon
                          ? 'bg-red-950/90 border-red-500/80 text-red-200 shadow-inner'
                          : 'bg-stone-950/80 border-stone-800 text-stone-300'
                      }`}>
                        <div className="flex items-center gap-1 text-[11px] font-bold">
                          <Clock className={`w-3.5 h-3.5 ${isExpiringSoon ? 'text-red-400 animate-spin' : 'text-amber-400'}`} style={{ animationDuration: '6s' }} />
                          <span className={isExpiringSoon ? 'text-red-300 font-extrabold' : 'text-stone-400'}>
                            {language === 'ar' ? 'الوقت المتبقي:' : 'Time Left:'}
                          </span>
                        </div>
                        <div className={`font-mono font-black text-xs sm:text-sm tracking-wider px-2 py-0.5 rounded-lg border flex items-center gap-1 ${
                          isExpiringSoon
                            ? 'bg-stone-950 text-red-300 border-red-600 animate-pulse ring-1 ring-red-500/50'
                            : 'bg-stone-900 text-amber-400 border-stone-700'
                        }`}>
                          <span>{timeString}</span>
                          <span className="text-[10px]">⏱️</span>
                        </div>
                      </div>

                      {/* Expiring Progress Bar */}
                      {isExpiringSoon && (
                        <div className="space-y-1 pt-0.5">
                          <div className="flex items-center justify-between text-[10px] text-red-300 font-bold">
                            <span className="flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-red-400" />
                              <span>{language === 'ar' ? 'أوشك العرض على النفاذ' : 'Window ending soon'}</span>
                            </span>
                            <span className="font-mono text-red-400">{percentElapsed}%</span>
                          </div>
                          <div className="w-full bg-stone-950 h-1.5 rounded-full overflow-hidden border border-red-900/50">
                            <div
                              className="bg-gradient-to-r from-red-600 via-rose-500 to-red-400 h-full rounded-full transition-all duration-1000 animate-pulse"
                              style={{ width: `${percentElapsed}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1 border-t border-stone-800/80">
                        <span className={`flex items-center gap-1 ${isExpiringSoon ? 'text-red-300 font-semibold' : 'text-amber-400'}`}>
                          <Timer className="w-3 h-3" />
                          <span>{isExpiringSoon ? 'عرض محدود للغاية' : `خصم خاطف`}</span>
                        </span>
                        <span className={`font-bold ${isExpiringSoon ? 'text-red-400 bg-red-950/80 px-2 py-0.5 rounded-md border border-red-800' : 'text-red-400'}`}>
                          متبقي {deal.remainingUnits} قطع
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleClaimDeal(deal)}
                      className={`w-full mt-3 py-2.5 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer ${
                        isExpiringSoon
                          ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/40 ring-2 ring-red-400/50 animate-pulse'
                          : 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-yellow-300" />
                      <span>
                        {isExpiringSoon
                          ? (language === 'ar' ? 'اقتنص الخصم قبل انتهاء العداد ⚡' : 'Claim Before Timer Expires ⚡')
                          : (language === 'ar' ? 'اطلب بالسعر المخفض الآن' : 'Claim Flash Deal Now')}
                      </span>
                    </button>

                    <a
                      href={`https://wa.me/201026541234?text=${encodeURIComponent(`السلام عليكم، أود حجز العرض الخاطف: ${deal.titleAr} بسعر ${deal.dealPriceEGP} ج.م قبل انتهاء عداد الخصم!`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full mt-1.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 border transition-colors ${
                        isExpiringSoon
                          ? 'bg-red-950/80 hover:bg-red-900/80 text-red-200 border-red-600/60'
                          : 'bg-stone-900 hover:bg-stone-850 text-stone-300 border-stone-800'
                      }`}
                    >
                      <span>حجز فوري عبر واتساب 01026541234 💬</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Price Alert Creator Form */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-cyan-400" />
                  <span>اضبط تنبيه سعر مخصص لموديل هاتفك (Set Price Target Alert)</span>
                </h4>
                <p className="text-xs text-stone-400 mt-0.5">
                  أخبرنا بالموديل والسعر الذي تريده، وسيرسل لك روبوت واتساب المبيعات رسالة فورية بمجرد توفر الخصم!
                </p>
              </div>

              <span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-bold font-mono">
                واتساب تلقائي 🤖
              </span>
            </div>

            <form onSubmit={handleSaveAlert} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Device Selection */}
                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1.5">
                    1. موديل الهاتف أو المحفظة:
                  </label>
                  <select
                    value={selectedDevice}
                    onChange={(e) => setSelectedDevice(e.target.value)}
                    className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="محفظة جلد طبيعي أصلية">محفظة جلد طبيعي مذهب</option>
                    {PHONE_MODELS.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.brand})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Target Price */}
                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1.5">
                    2. نبّهني عندما يصل السعر إلى:
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={targetPrice}
                      onChange={(e) => setTargetPrice(Number(e.target.value))}
                      min={150}
                      max={400}
                      className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
                    />
                    <span className="absolute left-3 top-2 text-xs text-stone-400 font-bold">
                      ج.م
                    </span>
                  </div>
                </div>

                {/* 3. WhatsApp Number */}
                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1.5">
                    3. رقم هاتفك / واتساب لإرسال الإشعار:
                  </label>
                  <input
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="مثال: 01026541234 أو 01508881456"
                    required
                    className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>لا نرسل رسائل مزعجة إطلاقاً، فقط التنبيه عند وصول السعر المطلوب.</span>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-stone-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
                >
                  <Bell className="w-4 h-4 text-stone-950" />
                  <span>تفعيل تنبيه الواتساب اللحظي 🔔</span>
                </button>
              </div>
            </form>

            {/* Success Feedback Card */}
            {isAlertSaved && (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>تم تفعيل الرادار وتنبيه السعر بنجاح لموديل: {selectedDevice}!</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 font-mono">
                    الهدف: {targetPrice} ج.م
                  </span>
                </div>
                <p className="text-[11px] text-emerald-100/90 leading-relaxed">
                  سيتولى بوت واتساب كيستيك المعتمد ({OFFICIAL_CONTACT_INFO.whatsappDisplay}) إرسال رسالة فورية لك برابط الشراء وخصم فوري أول ما يهبط السعر.
                </p>

                {/* Instant Simulation Preview */}
                {testNotificationTriggered && (
                  <div className="mt-2 p-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-cyan-400 font-bold">
                      <span>محاكاة وصول إشعار الواتساب الآن 🟢</span>
                      <span className="font-mono">من: بوت كيستيك الرسمي</span>
                    </div>
                    <p className="font-mono text-[11px] text-stone-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      &ldquo;أهلاً بك! انخفض سعر كفر {selectedDevice} الآن إلى {targetPrice} ج.م فقط! 🎁 استخدم كود: Dody15 للشحن السريع مع بوسطة والحصول على معاينة مجانية قبل الدفع.&rdquo;
                    </p>
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => {
                          onClose();
                          onApplyPromoAndCheckout?.('Dody15');
                        }}
                        className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-lg text-xs font-bold"
                      >
                        اطلب الكفر الآن بالخصم ⚡
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>بوت المبيعات الرسمي موثق على رقم: {OFFICIAL_CONTACT_INFO.whatsappDisplay}</span>
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg font-bold"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
