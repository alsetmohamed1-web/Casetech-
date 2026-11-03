import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  QrCode,
  Download,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Tag
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { OFFICIAL_CONTACT_INFO } from '../data/branding';
import { Product } from '../types';

export interface QuickShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  customDesignImageUrl?: string;
  promoCode?: string;
}

export const QuickShareModal: React.FC<QuickShareModalProps> = ({
  isOpen,
  onClose,
  product,
  customDesignImageUrl,
  promoCode = 'Dody15',
}) => {
  const { language, isRtl } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://casetech.eg';
  const itemTitle = (language === 'ar' ? product?.nameAr : product?.nameEn) || product?.nameAr || 'كفرات هواتف ذكية ومحافظ جلدية مخصصة بالاسم';
  const itemPrice = product?.price || 229;

  const defaultShareText = `🔥 شوف الكفر الفاخر ده من منصة «كيستيك - CaseTech»!
🛡️ حماية مدرعة عسكرية + ماج سيف قوي وتخصيص كامل لاسمك بالخط العربي أو فن UV ياباني 3D.
📦 والأجمل؟ حق المعاينة والفحص بنفسك مع مندوب بوسطة قبل ما تدفع أي جنيه!
🎁 استخدم كود الخصم الحصري: ${promoCode} للحصول على 15% خصم فوري وشحن مجاني عند طلب قطعتين.
رابط الموقع والطلب المباشر: ${currentUrl}`;

  const encodedText = encodeURIComponent(defaultShareText);
  const encodedUrl = encodeURIComponent(currentUrl);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(defaultShareText);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: itemTitle,
          text: defaultShareText,
          url: currentUrl,
        });
      } catch {
        // User cancelled or unsupported
      }
    } else {
      handleCopyLink();
    }
  };

  // QR Code URL using quick chart or svg
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl)}&color=090D16&bgcolor=FFFFFF`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden text-stone-100 flex flex-col my-4 max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 bg-gradient-to-r from-stone-950 via-cyan-950/40 to-stone-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-md">
              <Share2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>المشاركة السريعة وواتساب (Quick Spread)</span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                شارك الكفر والعرض مع أصدقائك بضغطة واحدة
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          
          {/* Target Item Summary Preview */}
          <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 flex items-center gap-3">
            {customDesignImageUrl || product?.image ? (
              <img
                src={customDesignImageUrl || product?.image}
                alt={itemTitle}
                className="w-14 h-14 rounded-xl object-cover border border-amber-500/30 shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-amber-400 font-bold block">
                كفر كيستيك المدرع · كود: {promoCode} (-15%)
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                {itemTitle}
              </h4>
              <p className="text-[11px] text-stone-400 truncate mt-0.5">
                معاينة مجانية قبل الدفع مع شركة بوسطة
              </p>
            </div>
          </div>

          {/* 1-Click WhatsApp Direct Share (Primary CTA) */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodedText}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-600/25 active:scale-95 transition-all"
          >
            <MessageCircle className="w-5 h-5 text-white" />
            <span>مشاركة مباشرة عبر الواتساب (WhatsApp 1-Click) 💬</span>
          </a>

          {/* Social Channels Share Grid */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-400 block">
              أو اختر منصة التواصل المفضلة:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-blue-950/50 hover:bg-blue-900/60 border border-blue-500/40 text-blue-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <span>فيسبوك 📘</span>
              </a>

              {/* Telegram */}
              <a
                href={`https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(itemTitle)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-sky-950/50 hover:bg-sky-900/60 border border-sky-500/40 text-sky-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <span>تيليجرام ✈️</span>
              </a>

              {/* Twitter / X */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodedText}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-700 text-stone-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <span>إكس / تويتر 𝕏</span>
              </a>

              {/* Native Device Share */}
              <button
                type="button"
                onClick={handleNativeShare}
                className="p-2.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/40 text-purple-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <span>مشاركة الهاتف 📲</span>
              </button>
            </div>
          </div>

          {/* Quick Copy Link Bar */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-400 block">
              رابط المشاركة المباشر:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-300 font-mono focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-stone-700 shrink-0"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-400" />
                    <span>نسخ الرابط</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QR Code Toggle & Modal Preview */}
          <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowQrCode(!showQrCode)}
              className="text-xs font-bold text-cyan-300 hover:text-cyan-200 flex items-center gap-1.5 transition-colors"
            >
              <QrCode className="w-4 h-4 text-cyan-400" />
              <span>{showQrCode ? 'إخفاء رمز QR ✕' : 'إظهار رمز الـ QR للمسح بالكاميرا 🔳'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyCaption}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedCaption ? 'تم نسخ النص الترويجي!' : 'نسخ النص الإعلاني كاملاً'}</span>
            </button>
          </div>

          {/* QR Code Render Box */}
          {showQrCode && (
            <div className="p-4 rounded-2xl bg-white text-stone-950 text-center space-y-2 animate-in zoom-in-95 duration-200">
              <div className="inline-block p-2 rounded-xl bg-white border border-stone-300 shadow">
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="w-40 h-40 mx-auto"
                />
              </div>
              <p className="text-xs font-extrabold text-stone-800">
                وجّه كاميرا هاتفك للمسح وفتح صفحة الكفر والعرض مباشرة 📲
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>رابط موثق مع كود الخصم (Dody15) تلقائياً</span>
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
