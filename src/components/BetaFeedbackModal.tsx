import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, AlertTriangle, Bug, Lightbulb, Heart, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';

interface BetaFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardGranted?: (bonusPoints: number) => void;
}

export const BetaFeedbackModal: React.FC<BetaFeedbackModalProps> = ({
  isOpen,
  onClose,
  onRewardGranted,
}) => {
  const { language, t, isRtl } = useLanguage();
  const [feedbackType, setFeedbackType] = useState<'bug' | 'suggestion' | 'praise'>('bug');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rewardCode, setRewardCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const generatedCode = `BETA-VIP-${Math.floor(1000 + Math.random() * 9000)}`;
    setRewardCode(generatedCode);
    setIsSubmitted(true);

    if (onRewardGranted) {
      onRewardGranted(150);
    }

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#6366f1'],
      });
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-stone-900 border border-amber-600/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-stone-100 font-cairo"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                {t.betaFeedbackTitle}
              </h3>
              <p className="text-xs text-amber-400 font-medium">
                {language === 'ar' ? 'فترة الاختبار المفتوحة (24 ساعة)' : '24-Hour Public Beta Period'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-stone-800/60 p-3.5 rounded-xl border border-stone-700">
                {t.betaFeedbackSubtitle}
              </p>

              {/* Feedback Type Tabs */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2">
                  {language === 'ar' ? 'نوع المشاركة:' : 'Category:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFeedbackType('bug')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border text-xs font-bold transition-all ${
                      feedbackType === 'bug'
                        ? 'bg-rose-950/60 border-rose-500 text-rose-300 shadow-sm'
                        : 'bg-stone-800/80 border-stone-700 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <Bug className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'خطأ برمجي' : 'Bug Report'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFeedbackType('suggestion')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border text-xs font-bold transition-all ${
                      feedbackType === 'suggestion'
                        ? 'bg-amber-950/60 border-amber-500 text-amber-300 shadow-sm'
                        : 'bg-stone-800/80 border-stone-700 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'اقتراح تصميم' : 'Idea / Design'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFeedbackType('praise')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border text-xs font-bold transition-all ${
                      feedbackType === 'praise'
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-sm'
                        : 'bg-stone-800/80 border-stone-700 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'رأي وتقييم' : 'Review'}</span>
                  </button>
                </div>
              </div>

              {/* Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    {language === 'ar' ? 'اسمك الكريم (اختياري):' : 'Your Name (optional):'}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === 'ar' ? 'مثال: سارة أحمد' : 'e.g. Sarah Adams'}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    {language === 'ar' ? 'رقم الواتساب أو الإيميل (لإرسال الهدية):' : 'WhatsApp / Email for Gift:'}
                  </label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={language === 'ar' ? '010XXXXXXXX أو info@...' : '+20 10...'}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  {language === 'ar' ? 'تفاصيل الملاحظة أو الاقتراح:' : 'Details & Feedback Description:'} <span className="text-amber-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    language === 'ar'
                      ? 'اكتب أي ملاحظة بشأن سرعة التصفح، تجربة التخصيص، موديل هاتف ترغب بإضافته، أو أي تفاصيل...'
                      : 'Tell us about your experience, bug spotted, suggested phone case model, or feature...'
                  }
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl p-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              {/* Perks Note */}
              <div className="flex items-center gap-2 p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-xs text-amber-300">
                <Gift className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  {language === 'ar'
                    ? 'بإرسال ملاحظتك ستحصل فوراً على كود خصم 25% + 150 نقطة ولاء لحسابك!'
                    : 'Submitting feedback grants you an instant 25% OFF VIP voucher + 150 Loyalty Points!'}
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{language === 'ar' ? 'إرسال الملاحظة واستلام الهدية' : 'Submit Feedback & Claim Reward'}</span>
              </button>
            </form>
          ) : (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 animate-scaleIn">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-lg font-bold text-white">
                {language === 'ar' ? 'شكراً لمساهمتك في نجاح الإطلاق التجريبي!' : 'Thank you for your valuable beta feedback!'}
              </h4>
              <p className="text-xs text-stone-300 max-w-sm mx-auto">
                {t.betaFeedbackSuccess}
              </p>

              {/* Reward Code Box */}
              <div className="bg-stone-800/90 border border-amber-500/50 p-4 rounded-xl max-w-xs mx-auto">
                <p className="text-[11px] text-amber-400 font-semibold mb-1">
                  {language === 'ar' ? 'كود الخصم الحصري الخاص بك (25%):' : 'Your Personal 25% Promo Code:'}
                </p>
                <div className="text-base font-black text-white tracking-widest bg-stone-950 py-2 rounded-lg border border-amber-500/30 font-mono select-all">
                  {rewardCode}
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl transition-colors"
              >
                {language === 'ar' ? 'إغلاق ومتابعة التسوق' : 'Close & Continue Shopping'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
