import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Currency } from '../types';
import { CURRENCIES } from '../data/products';

interface SocialProofTickerProps {
  currency: Currency;
  onOpenProduct?: (productId: string) => void;
}

interface PurchaseNotification {
  id: string;
  customerName: string;
  city: string;
  productName: string;
  timeAgo: string;
  deviceModel: string;
  customText?: string;
  avatarText: string;
}

const MOCK_NOTIFICATIONS: PurchaseNotification[] = [
  {
    id: 'n1',
    customerName: 'مروان الشريف',
    city: 'القاهرة - مصر الجديدة',
    productName: 'كفر السيليكون ماج سيف المقاوم للصدمات',
    timeAgo: 'منذ 3 دقائق',
    deviceModel: 'iPhone 15 Pro Max',
    customText: 'مروان | M',
    avatarText: 'م',
  },
  {
    id: 'n2',
    customerName: 'سارة عبد الله',
    city: 'الرياض - حي النرجس',
    productName: 'محفظة النقود الجلدية الإيطالية المنقوشة',
    timeAgo: 'منذ 7 دقائق',
    deviceModel: 'جلد كلاسيكي عسلي',
    customText: 'S.A 👑',
    avatarText: 'س',
  },
  {
    id: 'n3',
    customerName: 'كريم ممدوح',
    city: 'الإسكندرية - سموحة',
    productName: 'كفر أنيمي أوف وايت بطباعة UV بارزة',
    timeAgo: 'منذ 12 دقيقة',
    deviceModel: 'Samsung Galaxy S24 Ultra',
    customText: 'KAREEM',
    avatarText: 'ك',
  },
  {
    id: 'n4',
    customerName: 'نورهان فؤاد',
    city: 'المنصورة - حي الجامعة',
    productName: 'كفر الخط العربي الأندلسي بالذهب البارز',
    timeAgo: 'منذ 18 دقيقة',
    deviceModel: 'iPhone 14 Pro',
    customText: 'نورهان',
    avatarText: 'ن',
  },
  {
    id: 'n5',
    customerName: 'عمر القحطاني',
    city: 'جدة - حي الشاطئ',
    productName: 'حامل بطاقات ونقود ميني مع تقنية MagSafe',
    timeAgo: 'منذ 24 دقيقة',
    deviceModel: 'جلد أسود كربوني',
    customText: 'AL-QAHTANI',
    avatarText: 'ع',
  },
  {
    id: 'n6',
    customerName: 'ياسين أحمد',
    city: 'الجيزة - الشيخ زايد',
    productName: 'كفر أساطير كرة القدم مع نقش رقم التيشيرت',
    timeAgo: 'منذ نصف ساعة',
    deviceModel: 'iPhone 13',
    customText: 'YASSIN 10',
    avatarText: 'ي',
  },
];

export const SocialProofTicker: React.FC<SocialProofTickerProps> = ({ currency }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show initial notification after 3.5 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    // Rotate every 12 seconds
    const intervalTimer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % MOCK_NOTIFICATIONS.length);
        setIsVisible(true);
      }, 800);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = MOCK_NOTIFICATIONS[currentIndex];

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 max-w-sm w-full transition-all duration-500 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 pointer-events-none scale-95'
      }`}
    >
      <div className="relative bg-stone-900/95 backdrop-blur-md border border-amber-500/30 rounded-2xl p-3.5 shadow-2xl text-stone-100 flex items-start gap-3 ring-1 ring-white/10">
        
        {/* Glow accent */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping opacity-75"></div>

        {/* Customer Avatar */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-stone-950 font-bold flex items-center justify-center shrink-0 shadow-md text-sm border border-amber-300">
          {current.avatarText}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-xs font-bold text-white truncate">{current.customerName}</span>
              <span className="text-[10px] text-stone-400 truncate">({current.city})</span>
            </div>
            <span className="text-[10px] text-amber-400 font-medium shrink-0 bg-amber-500/10 px-1.5 py-0.5 rounded">
              {current.timeAgo}
            </span>
          </div>

          <p className="text-xs text-stone-200 line-clamp-1 font-medium">
            اشترى للتو: <span className="text-amber-300">{current.productName}</span>
          </p>

          <div className="mt-1 flex items-center gap-2 text-[10px] text-stone-400">
            <span className="bg-stone-800 px-1.5 py-0.5 rounded border border-stone-700/80 text-stone-300">
              {current.deviceModel}
            </span>
            {current.customText && (
              <span className="text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40">
                نقش: &ldquo;{current.customText}&rdquo;
              </span>
            )}
            <span className="flex items-center gap-0.5 text-emerald-400 mr-auto font-medium">
              <CheckCircle2 className="w-3 h-3" />
              مؤكد
            </span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors shrink-0"
          title="إغلاق الإشعار"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};
