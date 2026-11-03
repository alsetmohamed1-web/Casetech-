import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Copy, Check, MessageSquarePlus, Gift, ChevronUp, ChevronDown, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PublicBetaBannerProps {
  onOpenFeedback: () => void;
  onOpenLoyalty: () => void;
  onApplyCode?: (code: string) => void;
}

export const PublicBetaBanner: React.FC<PublicBetaBannerProps> = ({
  onOpenFeedback,
  onOpenLoyalty,
  onApplyCode,
}) => {
  const { language, t, isRtl } = useLanguage();
  const [copiedCode, setCopiedCode] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // 24-Hour countdown timer persisted or default to 23h 48m 15s
  const [timeLeft, setTimeLeft] = useState(() => {
    try {
      const storedEnd = localStorage.getItem('naqsh_beta_timer_end');
      const now = Date.now();
      if (storedEnd) {
        const diff = Math.max(0, Math.floor((parseInt(storedEnd, 10) - now) / 1000));
        if (diff > 0) return diff;
      }
      // Set to 24 hours from now
      const newEnd = now + 24 * 60 * 60 * 1000;
      localStorage.setItem('naqsh_beta_timer_end', newEnd.toString());
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

  const handleCopyCode = () => {
    navigator.clipboard.writeText('BETA24');
    setCopiedCode(true);
    if (onApplyCode) {
      onApplyCode('BETA24');
    }
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div
      className="relative bg-gradient-to-r from-stone-950 via-amber-950/90 to-stone-950 border-b border-amber-600/50 text-stone-100 text-xs shadow-lg transition-all"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2.5">
          
          {/* Badge & Notice */}
          <div className="flex items-center gap-2.5 text-center sm:text-start flex-wrap justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 text-[11px] shadow-sm animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>{t.betaBadge}</span>
            </span>

            <span className="font-semibold text-stone-200 text-xs">
              {t.betaBannerTitle}
            </span>
          </div>

          {/* Countdown & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap justify-center">
            {/* Live 24-Hour Timer */}
            <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-lg border border-amber-500/30 font-mono text-xs">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="text-stone-400 text-[10px]">
                {language === 'ar' ? 'متبقي:' : 'Left:'}
              </span>
              <div className="flex items-center gap-1 font-bold text-amber-300 tabular-nums">
                <span className="bg-stone-900 px-1 py-0.5 rounded text-[11px]">{String(hours).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-stone-900 px-1 py-0.5 rounded text-[11px]">{String(minutes).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-stone-900 px-1 py-0.5 rounded text-[11px]">{String(seconds).padStart(2, '0')}</span>
              </div>
            </div>

            {/* BETA24 Coupon Copy */}
            <button
              onClick={handleCopyCode}
              title={language === 'ar' ? 'انسخ كود خصم 20% للبيتا' : 'Copy 20% Beta Code'}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-transform active:scale-95 shadow-sm"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : 'BETA24 (-20%)'}</span>
            </button>

            {/* Loyalty & Gifts Shortcut */}
            <button
              onClick={onOpenLoyalty}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-white border border-stone-700 text-xs font-bold transition-colors"
            >
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'ar' ? 'نقاط الولاء والترشيح 👑' : 'Loyalty & Referral 👑'}</span>
            </button>

            {/* Beta Feedback Link */}
            <button
              onClick={onOpenFeedback}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800/80 transition-colors text-xs font-medium"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{t.betaFeedbackBtn}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
