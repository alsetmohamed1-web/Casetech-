import React, { useState, useEffect } from 'react';
import {
  Crown,
  Camera,
  Brain,
  Gift,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Sparkles,
  Phone,
  Clock,
  X,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { OFFICIAL_CONTACT_INFO } from '../data/branding';

interface SideLoyaltyQuickDockProps {
  onOpenLoyalty: () => void;
  onOpenMediaUpload: () => void;
  onOpenAiStudio: () => void;
  onOpenFeedback: () => void;
  onApplyCode?: (code: string) => void;
}

export const SideLoyaltyQuickDock: React.FC<SideLoyaltyQuickDockProps> = ({
  onOpenLoyalty,
  onOpenMediaUpload,
  onOpenAiStudio,
  onOpenFeedback,
  onApplyCode,
}) => {
  const { language, isRtl } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // 24-Hour countdown timer
  const [timeLeft, setTimeLeft] = useState(() => {
    try {
      const storedEnd = localStorage.getItem('casetech_beta_timer_end');
      const now = Date.now();
      if (storedEnd) {
        const diff = Math.max(0, Math.floor((parseInt(storedEnd, 10) - now) / 1000));
        if (diff > 0) return diff;
      }
      const newEnd = now + 24 * 60 * 60 * 1000;
      localStorage.setItem('casetech_beta_timer_end', newEnd.toString());
      return 24 * 60 * 60;
    } catch {
      return 23 * 3600 + 47 * 60 + 35;
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const handleCopyBetaCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('BETA24');
    setCopiedCode(true);
    if (onApplyCode) {
      onApplyCode('BETA24');
    }
    setTimeout(() => setCopiedCode(false), 2200);
  };

  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsExpanded(false);
    }, 450);
    setHoverTimeout(timeout);
  };

  return (
    <aside
      aria-label={language === 'ar' ? 'شريط الأدوات السريعة ونقاط الولاء' : 'Quick Loyalty & Tools Dock'}
      className={`fixed top-1/2 -translate-y-1/2 ${
        isRtl ? 'right-0' : 'left-0'
      } z-40 transition-all duration-300 pointer-events-auto select-none`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative flex items-center">
        
        {/* COLLAPSED TAB BUTTON (Shown on screen edge when docked) */}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className={`group relative flex flex-col items-center gap-1.5 py-3.5 px-2.5 bg-gradient-to-b from-stone-900 via-stone-950 to-amber-950 text-amber-400 border border-amber-500/50 shadow-2xl shadow-amber-900/40 backdrop-blur-xl ${
              isRtl ? 'rounded-l-2xl border-r-0' : 'rounded-r-2xl border-l-0'
            } hover:bg-stone-900 transition-all hover:scale-105 active:scale-95 cursor-pointer`}
            title={language === 'ar' ? 'اقترب لفتح نقاط الولاء، الكاميرا والذكاء الاصطناعي' : 'Hover to open Loyalty, Camera & AI tools'}
          >
            {/* Pulsing Glow Ring */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping opacity-75"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full"></span>

            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/40 group-hover:rotate-12 transition-transform shadow-inner">
              <Crown className="w-4 h-4 text-amber-300" />
            </div>

            <div className="text-[10px] font-black tracking-tight text-white writing-mode-vertical py-1 flex flex-col items-center gap-0.5">
              <span className="text-amber-400">نقاط</span>
              <span className="text-stone-300">ومزايا</span>
            </div>

            <span className="text-[9px] font-mono font-bold bg-amber-500/30 text-amber-300 px-1 py-0.5 rounded border border-amber-400/40">
              VIP
            </span>
          </button>
        )}

        {/* EXPANDED LUXURY DOCK (Reveals on hover / approach) */}
        {isExpanded && (
          <div
            className={`flex flex-col gap-2.5 p-3.5 bg-gradient-to-b from-stone-900/98 via-slate-950/98 to-stone-950/98 border border-amber-500/40 shadow-2xl shadow-amber-950/50 backdrop-blur-2xl text-stone-100 ${
              isRtl ? 'rounded-l-3xl border-r-0' : 'rounded-r-3xl border-l-0'
            } w-72 sm:w-80 animate-in fade-in ${
              isRtl ? 'slide-in-from-right-4' : 'slide-in-from-left-4'
            } duration-200 ring-1 ring-white/10`}
          >
            {/* Header / Dismiss */}
            <div className="flex items-center justify-between pb-2.5 border-b border-stone-800/80">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-bold shadow-md">
                  <Crown className="w-4 h-4 text-stone-950" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-amber-300">
                    {language === 'ar' ? 'المركز السريع للولاء والأدوات' : 'Loyalty & Quick Tools Hub'}
                  </h4>
                  <p className="text-[10px] text-stone-400">
                    {language === 'ar' ? 'وصول فوري دون حجب المنتجات' : 'Instant access without blocking view'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                title={language === 'ar' ? 'تصغير للشريط' : 'Minimize Dock'}
              >
                {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

            {/* 24-Hour Beta Countdown & Promo Code Banner */}
            <div className="bg-gradient-to-r from-amber-950/60 via-stone-900 to-amber-950/60 p-2.5 rounded-2xl border border-amber-500/30 flex items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-bold">
                  <Clock className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>{language === 'ar' ? 'عرض البيتا (20% خصم)' : 'Beta Offer (20% OFF)'}</span>
                </div>
                <div className="text-[11px] font-mono font-bold text-amber-400 tabular-nums">
                  {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
              </div>

              <button
                onClick={handleCopyBetaCode}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-[11px] transition-transform active:scale-95 shadow-sm shrink-0"
                title="نسخ كود BETA24 وتطبيقه"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-stone-950" />
                    <span>تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>BETA24</span>
                  </>
                )}
              </button>
            </div>

            {/* Action Buttons Suite */}
            <div className="space-y-1.5">
              {/* 1. LOYALTY & REWARDS */}
              <button
                onClick={() => {
                  setIsExpanded(false);
                  onOpenLoyalty();
                }}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-stone-950/70 hover:bg-amber-500/10 border border-amber-500/20 hover:border-amber-400/50 transition-all text-start group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30 group-hover:scale-110 transition-transform">
                    <Gift className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-200 group-hover:text-amber-300 flex items-center gap-1">
                      <span>{language === 'ar' ? 'رصيد نقاط الولاء والمكافآت' : 'Loyalty Points Balance'}</span>
                      <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300 font-mono">250 pt</span>
                    </div>
                    <div className="text-[10px] text-stone-400">
                      {language === 'ar' ? 'كاش باك وخصومات حصرية للأعضاء' : 'Cashback & exclusive VIP perks'}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-amber-400/80 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-transform">
                  ←
                </span>
              </button>

              {/* 2. CAMERA & MEDIA UPLOAD */}
              <button
                onClick={() => {
                  setIsExpanded(false);
                  onOpenMediaUpload();
                }}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-stone-950/70 hover:bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-400/50 transition-all text-start group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-500/30 group-hover:scale-110 transition-transform">
                    <Camera className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-200 group-hover:text-cyan-300 flex items-center gap-1">
                      <span>{language === 'ar' ? 'الكاميرا ورفع الصور للطباعة' : 'Camera & Photo Upload'}</span>
                      <span className="text-[9px] px-1 rounded bg-cyan-500/20 text-cyan-300">1200 DPI</span>
                    </div>
                    <div className="text-[10px] text-stone-400">
                      {language === 'ar' ? 'ارفع صورتك أو تصميمك لطباعة UV بارزة' : 'Upload photo or design for UV print'}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-cyan-400/80 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-transform">
                  ←
                </span>
              </button>

              {/* 3. AI STUDIO & ASSET GENERATION */}
              <button
                onClick={() => {
                  setIsExpanded(false);
                  onOpenAiStudio();
                }}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-stone-950/70 hover:bg-purple-500/10 border border-purple-500/20 hover:border-purple-400/50 transition-all text-start group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30 group-hover:scale-110 transition-transform">
                    <Brain className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-200 group-hover:text-purple-300 flex items-center gap-1">
                      <span>{language === 'ar' ? 'استوديو الذكاء الاصطناعي والتفكير' : 'AI Studio & High-Thinking'}</span>
                      <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                    </div>
                    <div className="text-[10px] text-stone-400">
                      {language === 'ar' ? 'توليد خلفيات وتصاميم أنمي وخيال' : 'Generate anime concepts & visuals'}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-purple-400/80 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-transform">
                  ←
                </span>
              </button>

              {/* 4. DIRECT WHATSAPP HOTLINES */}
              <a
                href={`https://wa.me/${OFFICIAL_CONTACT_INFO.whatsapp}?text=${encodeURIComponent('السلام عليكم، بتواصل معكم لطلب كفر مخصص من كيستيك')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-2 rounded-xl bg-stone-950/70 hover:bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-400/50 transition-all text-start group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-200 group-hover:text-emerald-300 flex items-center gap-1">
                      <span>{language === 'ar' ? 'الواتساب والمبيعات المباشرة' : 'Direct WhatsApp & Sales'}</span>
                      <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300 font-mono">24/7</span>
                    </div>
                    <div className="text-[10px] text-stone-400 font-mono">
                      {OFFICIAL_CONTACT_INFO.phoneDisplay} | {OFFICIAL_CONTACT_INFO.secondaryPhoneDisplay}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400/80 group-hover:text-emerald-300" />
              </a>
            </div>

            {/* Footer Quick Beta Feedback */}
            <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
              <button
                onClick={() => {
                  setIsExpanded(false);
                  onOpenFeedback();
                }}
                className="hover:text-amber-300 transition-colors flex items-center gap-1 text-[10px]"
              >
                <MessageSquare className="w-3 h-3 text-amber-400" />
                <span>{language === 'ar' ? 'رأيك يهمنا في البيتا' : 'Give Feedback'}</span>
              </button>

              <span className="text-[10px] text-stone-500">
                {language === 'ar' ? 'معاينة قبل الدفع 🛡️' : 'Inspect before pay 🛡️'}
              </span>
            </div>

          </div>
        )}

      </div>
    </aside>
  );
};
