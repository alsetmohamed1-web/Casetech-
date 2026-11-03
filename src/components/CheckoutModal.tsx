import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  Truck,
  ShieldCheck,
  CreditCard,
  Banknote,
  ArrowRight,
  Copy,
  Check,
  Smartphone,
  Zap,
  Globe,
  Upload,
  Tag,
  Percent,
  Trash2,
  Ticket,
  Sparkles,
  AlertCircle,
  MessageCircle,
  Phone,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Currency, Order, PaymentMethod, PaymentDetails, PromoCode } from '../types';
import { CURRENCIES, PAYMENT_GATEWAYS, PROMO_CODES } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { OFFICIAL_CONTACT_INFO } from '../data/branding';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onOrderPlaced: (order: Order) => void;
  onClearCart: () => void;
  initialPromoCode?: string;
}


const COUNTRIES = [
  {
    name: 'الولايات المتحدة الأمريكية (United States 🇺🇸)',
    nameEn: 'United States',
    code: 'US',
    region: 'international',
    dialCode: '+1',
    phonePlaceholder: '+1 (555) 234-5678',
    cities: ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Detroit / Dearborn, MI', 'Miami, FL', 'Dallas, TX', 'San Francisco, CA', 'Other US City'],
    courierOptions: [
      { id: 'dhl_express', name: 'DHL Express Worldwide (2-4 Days)', feeUSD: 12.0, freeThresholdUSD: 55.0 },
      { id: 'local_pod', name: 'US Local Hub Dispatch - Dallas TX (3-5 Days)', feeUSD: 6.0, freeThresholdUSD: 40.0 },
    ],
  },
  {
    name: 'المملكة المتحدة (United Kingdom 🇬🇧)',
    nameEn: 'United Kingdom',
    code: 'GB',
    region: 'international',
    dialCode: '+44',
    phonePlaceholder: '+44 7911 123456',
    cities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool', 'Edinburgh', 'Other UK City'],
    courierOptions: [
      { id: 'dhl_express', name: 'DHL Express UK (2-3 Days)', feeUSD: 11.0, freeThresholdUSD: 50.0 },
      { id: 'local_pod', name: 'UK Local Hub Dispatch - London (3-4 Days)', feeUSD: 5.5, freeThresholdUSD: 38.0 },
    ],
  },
  {
    name: 'ألمانيا والاتحاد الأوروبي (Germany & EU 🇩🇪)',
    nameEn: 'Germany',
    code: 'DE',
    region: 'international',
    dialCode: '+49',
    phonePlaceholder: '+49 151 12345678',
    cities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne', 'Stuttgart', 'Düsseldorf', 'Other EU City'],
    courierOptions: [
      { id: 'dhl_express', name: 'DHL Express EU Priority (2-4 Days)', feeUSD: 12.0, freeThresholdUSD: 55.0 },
      { id: 'local_pod', name: 'EU Hub Dispatch - Frankfurt (3-5 Days)', feeUSD: 6.0, freeThresholdUSD: 40.0 },
    ],
  },
  {
    name: 'فرنسا (France 🇫🇷)',
    nameEn: 'France',
    code: 'FR',
    region: 'international',
    dialCode: '+33',
    phonePlaceholder: '+33 6 12 34 56 78',
    cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Other France City'],
    courierOptions: [
      { id: 'dhl_express', name: 'DHL Express France (2-4 Days)', feeUSD: 12.0, freeThresholdUSD: 55.0 },
      { id: 'local_pod', name: 'EU Hub Dispatch (3-5 Days)', feeUSD: 6.0, freeThresholdUSD: 40.0 },
    ],
  },
  {
    name: 'كندا (Canada 🇨🇦)',
    nameEn: 'Canada',
    code: 'CA',
    region: 'international',
    dialCode: '+1',
    phonePlaceholder: '+1 (416) 123-4567',
    cities: ['Toronto, ON', 'Montreal, QC', 'Vancouver, BC', 'Calgary, AB', 'Ottawa, ON', 'Edmonton, AB', 'Other Canada City'],
    courierOptions: [
      { id: 'dhl_express', name: 'DHL Express Canada (2-4 Days)', feeUSD: 13.0, freeThresholdUSD: 58.0 },
      { id: 'local_pod', name: 'North America Hub Dispatch (3-5 Days)', feeUSD: 7.0, freeThresholdUSD: 45.0 },
    ],
  },
  {
    name: 'المملكة العربية السعودية (KSA 🇸🇦)',
    nameEn: 'Saudi Arabia',
    code: 'SA',
    region: 'gcc',
    dialCode: '+966',
    phonePlaceholder: '+966 50 123 4567',
    cities: ['الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'الدمام', 'الخبر', 'أبها', 'تبوك', 'بريدة', 'أخرى'],
    courierOptions: [
      { id: 'smsa', name: 'سمسا إكسبريس SMSA Express (3-5 أيام)', feeUSD: 4.0, freeThresholdUSD: 30.0 },
      { id: 'aramex', name: 'أرامكس الخليج Aramex Priority (3 أيام)', feeUSD: 6.0, freeThresholdUSD: 40.0 },
    ],
  },
  {
    name: 'الإمارات العربية المتحدة (UAE 🇦🇪)',
    nameEn: 'United Arab Emirates',
    code: 'AE',
    region: 'gcc',
    dialCode: '+971',
    phonePlaceholder: '+971 50 123 4567',
    cities: ['دبي', 'أبوظبي', 'الشارقة', 'عجمان', 'رأس الخيمة', 'العين', 'الفجيرة', 'أخرى'],
    courierOptions: [
      { id: 'aramex', name: 'أرامكس إكسبريس (2-3 أيام)', feeUSD: 4.0, freeThresholdUSD: 30.0 },
    ],
  },
  {
    name: 'دولة الكويت (Kuwait 🇰🇼)',
    nameEn: 'Kuwait',
    code: 'KW',
    region: 'gcc',
    dialCode: '+965',
    phonePlaceholder: '+965 9123 4567',
    cities: ['مدينة الكويت', 'حولي', 'الأحمدي', 'الفروانية', 'الجهراء', 'مبارك الكبير', 'أخرى'],
    courierOptions: [
      { id: 'aramex', name: 'أرامكس الخليج (3-4 أيام)', feeUSD: 4.5, freeThresholdUSD: 32.0 },
    ],
  },
  {
    name: 'دولة قطر (Qatar 🇶🇦)',
    nameEn: 'Qatar',
    code: 'QA',
    region: 'gcc',
    dialCode: '+974',
    phonePlaceholder: '+974 5512 3456',
    cities: ['الدوحة', 'الريان', 'الوكرة', 'الخور', 'أم صلال', 'أخرى'],
    courierOptions: [
      { id: 'aramex', name: 'أرامكس الخليج (3-4 أيام)', feeUSD: 4.5, freeThresholdUSD: 32.0 },
    ],
  },
  {
    name: 'مصر (Egypt 🇪🇬)',
    nameEn: 'Egypt',
    code: 'EG',
    region: 'egypt',
    dialCode: '+20',
    phonePlaceholder: '010 1234 5678',
    cities: ['القاهرة', 'الجيزة', 'الإسكندرية', 'المنصورة', 'طنطا', 'الزقازيق', 'بورسعيد', 'أسيوط', 'سوهاج', 'أخرى'],
    courierOptions: [
      { id: 'bosta_vip', name: 'بوسطة إكسبريس VIP (24-48 ساعة - معاينة قبل الدفع)', feeUSD: 1.6, freeThresholdUSD: 20.0 },
    ],
  },
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onOrderPlaced,
  onClearCart,
  initialPromoCode,
}) => {
  if (!isOpen) return null;

  const { language, t, isRtl } = useLanguage();
  const currencyConfig = CURRENCIES[currency] || CURRENCIES.USD;
  const currencySymbol = language === 'ar' ? currencyConfig.symbolAr : currencyConfig.symbolEn;

  const itemsSubtotalUSD = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const factoryCostUSD = items.reduce((sum, item) => sum + item.product.factoryCost * item.quantity, 0);

  // Promo Code State
  const defaultPromo = initialPromoCode
    ? PROMO_CODES.find((p) => p.code.toUpperCase() === initialPromoCode.toUpperCase()) || null
    : null;

  const [promoCodeInput, setPromoCodeInput] = useState(defaultPromo ? defaultPromo.code : '');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(defaultPromo);
  const [promoFeedback, setPromoFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    defaultPromo
      ? {
          type: 'success',
          message:
            language === 'ar'
              ? `تم تطبيق الكود ${defaultPromo.code} بنجاح! خصم ${defaultPromo.discountPercent}%`
              : `Code ${defaultPromo.code} applied! ${defaultPromo.discountPercent}% OFF`,
        }
      : null
  );

  const [showSparkleToast, setShowSparkleToast] = useState<{
    code: string;
    discount: number;
    savedAmount: string;
  } | null>(null);

  // Form & Country states
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  const currentCountry = COUNTRIES[selectedCountryIndex] || COUNTRIES[0];
  const [selectedCourierId, setSelectedCourierId] = useState<string>(
    currentCountry.courierOptions[0]?.id || 'dhl_express'
  );

  const activeCourier =
    currentCountry.courierOptions.find((c) => c.id === selectedCourierId) ||
    currentCountry.courierOptions[0];

  // Free shipping check: if subtotal exceeds freeThresholdUSD or items count >= 2
  const isFreeShipping = itemsSubtotalUSD >= (activeCourier?.freeThresholdUSD || 50) || items.length >= 2;
  const shippingFeeUSD = isFreeShipping ? 0 : (activeCourier?.feeUSD || 6.0);

  // Discount applies strictly to products subtotal as requested
  const discountAmountUSD = appliedPromo
    ? itemsSubtotalUSD * (appliedPromo.discountPercent / 100)
    : 0;

  const discountedItemsUSD = Math.max(0, itemsSubtotalUSD - discountAmountUSD);
  const finalTotalUSD = discountedItemsUSD + shippingFeeUSD;
  const originalTotalUSD = itemsSubtotalUSD + shippingFeeUSD;

  // Formatted amounts in current currency (2 decimals for USD, EUR, GBP)
  const isDecimalCurrency = currency === 'USD' || currency === 'EUR' || currency === 'GBP';
  const itemsSubtotalFormatted = (itemsSubtotalUSD * currencyConfig.rateFromUSD).toFixed(isDecimalCurrency ? 2 : 0);
  const discountAmountFormatted = (discountAmountUSD * currencyConfig.rateFromUSD).toFixed(isDecimalCurrency ? 2 : 0);
  const shippingFeeFormatted = (shippingFeeUSD * currencyConfig.rateFromUSD).toFixed(isDecimalCurrency ? 2 : 0);
  const finalTotalFormatted = (finalTotalUSD * currencyConfig.rateFromUSD).toFixed(isDecimalCurrency ? 2 : 0);
  const originalTotalFormatted = (originalTotalUSD * currencyConfig.rateFromUSD).toFixed(isDecimalCurrency ? 2 : 0);

  const [selectedCity, setSelectedCity] = useState(COUNTRIES[0].cities[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Payment states (default based on country region)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    COUNTRIES[0].region === 'international' ? 'apple_pay' : COUNTRIES[0].region === 'gcc' ? 'card' : 'cod'
  );
  const [walletSenderPhone, setWalletSenderPhone] = useState('');
  const [instapayRef, setInstapayRef] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [copiedData, setCopiedData] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedData(label);
    setTimeout(() => setCopiedData(null), 2000);
  };

  // Trigger Confetti & Sparkles celebration on promo code application
  const triggerCelebrationConfetti = (code: string, discount: number, savedValFormatted: string) => {
    setShowSparkleToast({
      code,
      discount,
      savedAmount: savedValFormatted,
    });

    setTimeout(() => {
      setShowSparkleToast(null);
    }, 4500);

    try {
      // 1. Center burst with sparkling colors
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6, x: 0.5 },
        colors: ['#f59e0b', '#10b981', '#06b6d4', '#ec4899', '#fbbf24', '#ffffff'],
        ticks: 220,
        gravity: 0.85,
        scalar: 1.1,
      });

      // 2. Left side cannon burst
      setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 60,
          origin: { x: 0.15, y: 0.65 },
          colors: ['#ffd700', '#10b981', '#38bdf8'],
          ticks: 180,
        });
      }, 160);

      // 3. Right side cannon burst
      setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 60,
          origin: { x: 0.85, y: 0.65 },
          colors: ['#ffd700', '#f43f5e', '#a855f7'],
          ticks: 180,
        });
      }, 320);
    } catch {
      // ignore
    }
  };

  // Promo & Referral Code Handlers
  const handleApplyPromo = (codeToApply?: string) => {
    const raw = (codeToApply !== undefined ? codeToApply : promoCodeInput).trim();
    if (!raw) {
      setPromoFeedback({
        type: 'error',
        message: language === 'ar' ? 'يرجى إدخال كود الخصم أولاً' : 'Please enter a promo code first',
      });
      return;
    }

    const match = PROMO_CODES.find(
      (p) => p.code.toUpperCase() === raw.toUpperCase()
    );

    if (match) {
      setAppliedPromo(match);
      setPromoCodeInput(match.code);
      const savedUSD = itemsSubtotalUSD * (match.discountPercent / 100);
      const savedFormatted = (savedUSD * currencyConfig.rateFromUSD).toFixed(isDecimalCurrency ? 2 : 0);
      
      setPromoFeedback({
        type: 'success',
        message:
          language === 'ar'
            ? `تم تطبيق كود الخصم (${match.code}) بنجاح! خصم ${match.discountPercent}% فوري على إجمالي قيمة المنتجات.`
            : `Promo code (${match.code}) applied! Instant ${match.discountPercent}% discount on products subtotal.`,
      });

      triggerCelebrationConfetti(match.code, match.discountPercent, `${savedFormatted} ${currencyConfig.symbolAr}`);
    } else if (raw.toUpperCase().startsWith('NAQSH-') || raw.toUpperCase().startsWith('REF-') || raw.toUpperCase().startsWith('VIP-') || raw.toUpperCase().startsWith('BETA-')) {
      // Dynamic referral code or beta feedback reward code!
      const discount = raw.toUpperCase().includes('VIP-') || raw.toUpperCase().includes('BETA-') ? 25 : 15;
      const customPromo: PromoCode = {
        code: raw.toUpperCase(),
        discountPercent: discount,
        description: language === 'ar' ? `كود ترشيح أصدقاء مشترك (${discount}% خصم لكليكما)` : `Dual referral code (${discount}% discount)`,
        badgeLabel: `${raw.toUpperCase()} (-${discount}%)`,
      };
      setAppliedPromo(customPromo);
      setPromoCodeInput(customPromo.code);
      const savedUSD = itemsSubtotalUSD * (discount / 100);
      const savedFormatted = (savedUSD * currencyConfig.rateFromUSD).toFixed(isDecimalCurrency ? 2 : 0);

      setPromoFeedback({
        type: 'success',
        message:
          language === 'ar'
            ? `تم تطبيق كود الترشيح المشترك (${raw.toUpperCase()})! حصلت على خصم ${discount}% إضافي + سيتم إضافة 100 ج.م رصيد لصاحب الدعوة عند استلام الطلب 🎉`
            : `Dual referral code (${raw.toUpperCase()}) applied! You get ${discount}% extra discount + your friend earns 100 EGP credit 🎉`,
      });

      triggerCelebrationConfetti(customPromo.code, discount, `${savedFormatted} ${currencyConfig.symbolAr}`);
    } else {
      setPromoFeedback({
        type: 'error',
        message:
          language === 'ar'
            ? 'كود الخصم غير صحيح أو غير موجود. الأكواد النشطة: BETA24 (20%)، FRIEND15 (15%)، Dody15 (15%)، mody (10%).'
            : 'Invalid promo code. Active codes: BETA24 (20%), FRIEND15 (15%), Dody15 (15%), mody (10%).',
      });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCodeInput('');
    setPromoFeedback(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !streetAddress) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const isInternational = currentCountry.region === 'international';
      const orderNumber = isInternational
        ? `US-CT-${Math.floor(10000 + Math.random() * 90000)}`
        : `NQ-${Math.floor(10000 + Math.random() * 90000)}`;

      const trackingNumber = isInternational
        ? `DHL-${currentCountry.code}-${Math.floor(10000000 + Math.random() * 90000000)}`
        : currentCountry.code === 'EG'
        ? `BST-${Math.floor(10000000 + Math.random() * 90000000)}`
        : `SMSA-${Math.floor(10000000 + Math.random() * 90000000)}`;

      const factoryDispatchId = isInternational
        ? `HUB-${currentCountry.code}-${Math.floor(1000 + Math.random() * 9000)}`
        : `FAC-${Math.floor(1000 + Math.random() * 9000)}`;

      const courierName = activeCourier ? activeCourier.name : (isInternational ? 'DHL Express Worldwide' : 'Bosta Express');
      const dropshipProfit = (discountedItemsUSD - factoryCostUSD) * currencyConfig.rateFromUSD;

      const paymentDetails: PaymentDetails = {
        method: paymentMethod,
        walletNumber: walletSenderPhone || undefined,
        transactionRef: instapayRef || undefined,
        isPaid: paymentMethod !== 'cod',
      };

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        createdAt: 'الآن',
        customerName,
        customerPhone,
        customerEmail: customerEmail || `${customerPhone}@customer.casetech`,
        address: {
          country: currentCountry.name,
          city: selectedCity,
          street: streetAddress,
          notes,
        },
        items: [...items],
        subtotal: itemsSubtotalUSD,
        shippingFee: shippingFeeUSD,
        total: finalTotalUSD,
        discountCode: appliedPromo?.code,
        discountPercent: appliedPromo?.discountPercent,
        discountAmount: discountAmountUSD,
        paymentMethod,
        paymentDetails,
        status: 'in_production',
        trackingNumber,
        courierName,
        factoryDispatchId,
        dropshipProfit,
        notesFromMerchant: `طريقة الدفع: ${paymentMethod} · الشحن: ${courierName}${appliedPromo ? ` · كود الخصم: ${appliedPromo.code} (${appliedPromo.discountPercent}%)` : ''}`,
        notifications: [
          {
            id: `notif-${Date.now()}`,
            orderId: `ord-${Date.now()}`,
            type: 'whatsapp',
            recipient: customerPhone,
            sentAt: 'الآن',
            content: `شكراً أستاذ/ة ${customerName}! تم استلام طلبك رقم ${orderNumber} بنجاح${appliedPromo ? ` (بخصم ${appliedPromo.discountPercent}% عبر كود ${appliedPromo.code})` : ''}، وجاري تجهيز ملف الطباعة والحفر بالليزر وإرساله للمصنع فوراً.`,
            status: 'sent',
          },
        ],
      };

      setPlacedOrder(newOrder);
      onOrderPlaced(newOrder);
      onClearCart();
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // ignore
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-auto text-stone-100 max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/80">
          <div className="flex items-center gap-2.5">
            <Truck className="w-5 h-5 text-amber-500" />
            <div>
              <h2 className="text-base font-bold text-white">
                {placedOrder ? 'تم تأكيد طلبك بنجاح' : 'إتمام الطلب وبوابات الدفع الآمنة'}
              </h2>
              <p className="text-[11px] text-stone-400">
                {placedOrder ? 'تم تفعيل التتبع اللحظي وإشعار الواتساب' : 'دفع محلي وعالمي مشفر مع توصيل مباشر من المصنع'}
              </p>
            </div>
          </div>
          {!placedOrder && (
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {placedOrder ? (
            /* SUCCESS VIEW */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">تم استلام وتأكيد طلبك بنجاح!</h3>
                <p className="text-xs text-stone-300 mt-1 max-w-md mx-auto">
                  تم إرسال إشعار فوري عبر الواتساب والرسائل القصيرة إلى هاتفك، وتم إحالة التصميم لخط الإنتاج الليزري في المصنع.
                </p>
              </div>

              {/* Order Info Summary */}
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 max-w-md mx-auto text-right space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <span className="text-xs text-stone-400">رقم الطلب:</span>
                  <span className="text-sm font-bold text-amber-400 tabular-nums">
                    {placedOrder.orderNumber}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <span className="text-xs text-stone-400">بوليصة الشحن والتتبع:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-stone-200">
                      {placedOrder.trackingNumber}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(placedOrder.trackingNumber);
                        setCopiedTracking(true);
                        setTimeout(() => setCopiedTracking(false), 2000);
                      }}
                      className="p-1 text-stone-400 hover:text-amber-400"
                    >
                      {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <span className="text-xs text-stone-400">شركة الشحن والتوصيل:</span>
                  <span className="text-xs font-semibold text-stone-300">
                    {placedOrder.courierName}
                  </span>
                </div>

                {placedOrder.discountCode && (
                  <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-emerald-400">
                    <span className="text-xs">كود الخصم المطبق ({placedOrder.discountCode}):</span>
                    <span className="text-xs font-bold font-mono">
                      -{(placedOrder.discountAmount! * currencyConfig.rateFromUSD).toFixed(0)} {currencyConfig.symbolAr} ({placedOrder.discountPercent}% خصم)
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <span className="text-xs text-stone-400">تكلفة الشحن والتوصيل:</span>
                  <span className="text-xs font-semibold text-stone-300">
                    {(placedOrder.shippingFee * currencyConfig.rateFromUSD).toFixed(0)} {currencyConfig.symbolAr}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-400">المبلغ الإجمالي المستحق:</span>
                  <span className="text-base font-bold text-white tabular-nums">
                    {(placedOrder.total * currencyConfig.rateFromUSD).toFixed(0)} {currencyConfig.symbolAr}
                    {placedOrder.paymentMethod === 'cod' ? (
                      <span className="text-xs font-normal text-amber-400 mr-2">(نقداً عند الاستلام)</span>
                    ) : (
                      <span className="text-xs font-normal text-emerald-400 mr-2">(مدفوع بالكامل)</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Direct Print Shop & WhatsApp Dispatch Card (From owner's phone) */}
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl max-w-md mx-auto text-start space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <h4 className="text-xs font-bold text-emerald-300">
                    {language === 'ar' ? 'تأكيد مباشر وتوجيه للمطبعة عبر الواتساب' : 'Direct Print Shop & WhatsApp Dispatch'}
                  </h4>
                </div>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  {language === 'ar'
                    ? `تم ربط طلبك برقم المبيعات والمطبعة المعتمد (${OFFICIAL_CONTACT_INFO.phoneDisplay}) لمتابعة واستكمال خط سير رحلة الطلب حتى وصوله ليدك ومفاجأتك بالتغليف الفاخر والهدايا والعروض والمعاينة قبل الاستلام!`
                    : `Direct order communication linked with CaseTech print shop line (${OFFICIAL_CONTACT_INFO.phoneDisplay}) for instant production & luxury unboxing.`}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <a
                    href={`https://wa.me/${OFFICIAL_CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
                      `السلام عليكم، قمت بعمل طلب جديد برقم: ${placedOrder.orderNumber}
الاسم: ${customerName}
الهاتف: ${customerPhone}
العنوان: ${selectedCity} - ${streetAddress}
المنتجات: ${placedOrder.items.map(it => `${it.product.nameAr} (${it.customization?.phoneModelId || 'كفر'} - نقش: "${it.customization?.customText || 'بدون'}")`).join(', ')}
الإجمالي: ${(placedOrder.total * currencyConfig.rateFromUSD).toFixed(0)} ${currencyConfig.symbolAr}
بوليصة التتبع بوسطة: ${placedOrder.trackingNumber}
يرجى توجيه الطلب للمطبعة والتغليف الملكي الفاخر مع كارت الضمان والهدايا.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black rounded-xl text-xs transition-colors shadow-lg shadow-emerald-900/30"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{language === 'ar' ? `تأكيد الطلب للواتساب (${OFFICIAL_CONTACT_INFO.phoneDisplay})` : `Confirm on WhatsApp`}</span>
                  </a>
                  <a
                    href={`tel:${OFFICIAL_CONTACT_INFO.phone}`}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-stone-900 hover:bg-stone-800 text-stone-300 font-bold rounded-xl text-xs border border-stone-700"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{OFFICIAL_CONTACT_INFO.phoneDisplay}</span>
                  </a>
                </div>
                <div className="text-[10px] text-stone-400 flex items-center justify-between pt-1 border-t border-stone-800/80">
                  <span>خط إضافي للتأكيد والاستفسار:</span>
                  <span className="font-mono text-stone-300 font-bold">{OFFICIAL_CONTACT_INFO.secondaryPhoneDisplay}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-sm transition-colors cursor-pointer"
                >
                  العودة لتصفح المتجر
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM */
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              {/* Floating Sparkle / Confetti Positive Reinforcement Banner */}
              {showSparkleToast && (
                <div className="sticky top-0 z-40 p-4 rounded-2xl bg-gradient-to-r from-amber-500/25 via-emerald-500/30 to-amber-500/25 border-2 border-amber-400/90 shadow-2xl shadow-amber-500/30 backdrop-blur-md animate-in zoom-in-95 slide-in-from-top-4 duration-300">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-200 text-stone-950 flex items-center justify-center font-bold text-lg shadow-lg shrink-0 animate-bounce">
                        ✨
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-white flex items-center gap-1">
                            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                            <span>{language === 'ar' ? 'تم تفعيل كود الخصم بنجاح!' : 'Promo Code Successfully Applied!'}</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/50 text-[10px] font-mono font-black animate-pulse">
                            -{showSparkleToast.discount}% OFF
                          </span>
                        </div>
                        <p className="text-[11px] text-amber-200/90 mt-0.5">
                          {language === 'ar'
                            ? `كود (${showSparkleToast.code}) خفّض إجمالي طلبك بمقدار ${showSparkleToast.savedAmount} فوري!`
                            : `Code (${showSparkleToast.code}) saved you ${showSparkleToast.savedAmount} instantly!`}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowSparkleToast(null)}
                      className="p-1.5 rounded-lg text-amber-200 hover:text-white hover:bg-amber-400/20 transition-colors shrink-0"
                      title="إغلاق"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Order Items Bar with Discount */}
              <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-stone-300 font-semibold">
                    إجمالي ({items.length}) منتجات بالطلب:
                  </span>
                  {appliedPromo && (
                    <span className="bg-emerald-950/80 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>خصم {appliedPromo.discountPercent}% مفعل</span>
                    </span>
                  )}
                </div>
                
                <div className="text-left">
                  {appliedPromo && (
                    <span className="text-stone-500 line-through text-[11px] block tabular-nums">
                      {originalTotalFormatted} {currencyConfig.symbolAr}
                    </span>
                  )}
                  <span className="text-base font-bold text-amber-400 tabular-nums">
                    {finalTotalFormatted} {currencyConfig.symbolAr}
                  </span>
                </div>
              </div>

              {/* 1. Customer Shipping Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-stone-300 border-b border-stone-800 pb-2">
                  1. معلومات المستلم والعنوان
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="مثال: أحمد عبد الله الهاشمي"
                      className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      رقم الهاتف / الواتساب للإشعارات والتسليم *
                    </label>
                    <div className="flex rounded-xl overflow-hidden border border-stone-700 bg-stone-800 focus-within:border-amber-500">
                      <span className="px-3 py-2 bg-stone-900 border-e border-stone-700 text-xs font-mono font-bold text-amber-400 flex items-center">
                        {currentCountry.dialCode}
                      </span>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder={currentCountry.phonePlaceholder}
                        className="w-full bg-transparent px-3 py-2 text-sm text-white focus:outline-none placeholder-stone-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      دولة الشحن والتوصيل (Shipping Country):
                    </label>
                    <select
                      value={selectedCountryIndex}
                      onChange={(e) => {
                        const idx = Number(e.target.value);
                        setSelectedCountryIndex(idx);
                        const c = COUNTRIES[idx];
                        setSelectedCity(c.cities[0]);
                        if (c.courierOptions && c.courierOptions.length > 0) {
                          setSelectedCourierId(c.courierOptions[0].id);
                        }
                        if (c.region === 'international') {
                          setPaymentMethod('apple_pay');
                        } else if (c.region === 'gcc') {
                          setPaymentMethod('card');
                        } else {
                          setPaymentMethod('cod');
                        }
                      }}
                      className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      {COUNTRIES.map((c, i) => (
                        <option key={c.code} value={i}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      المدينة / المحافظة (City / State):
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      {currentCountry.cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Shipping Courier Selector for selected country */}
                {currentCountry.courierOptions && currentCountry.courierOptions.length > 0 && (
                  <div className="p-3.5 bg-stone-950/80 rounded-2xl border border-stone-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-200 flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-amber-400" />
                        <span>شركة الشحن والتوصيل المعتمدة:</span>
                      </span>
                      {isFreeShipping ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                          🎉 شحن دولي مجاني مؤهل
                        </span>
                      ) : (
                        <span className="text-[10px] text-stone-400">
                          شحن مجاني للطلبات فوق ${(activeCourier?.freeThresholdUSD || 50).toFixed(0)} أو قطعتين
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentCountry.courierOptions.map((opt) => {
                        const isSelected = selectedCourierId === opt.id;
                        const optFeeFormatted = isFreeShipping
                          ? (language === 'ar' ? 'شحن مجاني 0' : 'FREE $0')
                          : `${(opt.feeUSD * currencyConfig.rateFromUSD).toFixed(isDecimalCurrency ? 2 : 0)} ${currencySymbol}`;

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedCourierId(opt.id)}
                            className={`p-2.5 rounded-xl border text-start transition-all flex items-center justify-between gap-2 cursor-pointer ${
                              isSelected
                                ? 'bg-amber-500/15 border-amber-500 text-white font-bold ring-1 ring-amber-500/50'
                                : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:border-stone-700'
                            }`}
                          >
                            <div className="text-xs">
                              <span className="block font-bold">{opt.name}</span>
                              <span className="text-[10px] text-stone-400">
                                {opt.id === 'dhl_express'
                                  ? '✈️ شحن جوي سريع 2-4 أيام مع تتبع لحظي'
                                  : opt.id === 'local_pod'
                                  ? '📦 مركز تصنيع محلي بدون جمارك 3-5 أيام'
                                  : opt.id === 'bosta_vip'
                                  ? '🚚 بوسطة 24-48 ساعة مع معاينة قبل الدفع'
                                  : '🚚 شحن سريع مع تتبع'}
                              </span>
                            </div>
                            <span className={`text-xs font-mono font-black shrink-0 ${isFreeShipping ? 'text-emerald-400' : 'text-amber-400'}`}>
                              {optFeeFormatted}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    العنوان التفصيلي والرمز البريدي (Street Address & Postal Code) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder={
                      currentCountry.region === 'international'
                        ? 'e.g. 742 Evergreen Terrace, Apt 4B, Springfield, ZIP: 97477'
                        : 'مثال: شارع مصطفى النحاس، عمارة 15، شقة 4، أو الحي والشارع ورقم البناية'
                    }
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* 2. Promotional Discount Code (كود الخصم الترويجي) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <h3 className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-amber-400" />
                    <span>2. كود الخصم الترويجي (Promo Code)</span>
                  </h3>
                  <span className="text-[10px] text-amber-400/90 font-medium">
                    خصم على قيمة المنتجات
                  </span>
                </div>

                {/* Input & Apply Button */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Ticket className="w-4 h-4 text-stone-500 absolute right-3.5 top-3" />
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => {
                        setPromoCodeInput(e.target.value);
                        if (promoFeedback) setPromoFeedback(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleApplyPromo();
                        }
                      }}
                      placeholder="أدخل كود الخصم (مثل Dody15 أو mody أو NAQSH20)..."
                      className="w-full bg-stone-800 border border-stone-700 rounded-xl pr-10 pl-3 py-2.5 text-xs text-white uppercase placeholder:capitalize placeholder-stone-500 font-mono tracking-wider focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleApplyPromo()}
                    className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs rounded-xl transition-all shadow-sm shrink-0 active:scale-95 cursor-pointer"
                  >
                    تطبيق الكود
                  </button>
                </div>

                {/* Feedback Alert */}
                {promoFeedback && (
                  <div
                    className={`p-2.5 rounded-xl text-xs flex items-center justify-between gap-2 border ${
                      promoFeedback.type === 'success'
                        ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300'
                        : 'bg-red-950/50 border-red-800/70 text-red-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {promoFeedback.type === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                      <span>{promoFeedback.message}</span>
                    </div>

                    {appliedPromo && (
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        className="text-[11px] text-red-400 hover:text-red-300 underline font-semibold shrink-0 cursor-pointer"
                      >
                        إلغاء الخصم
                      </button>
                    )}
                  </div>
                )}

                {/* Suggested Available Promo Codes */}
                <div className="pt-1">
                  <span className="text-[11px] text-stone-400 block mb-1.5 font-medium">
                    أكواد ترويجية متاحة بنقرة واحدة:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {PROMO_CODES.map((promo) => {
                      const isCurrent = appliedPromo?.code.toUpperCase() === promo.code.toUpperCase();
                      return (
                        <button
                          key={promo.code}
                          type="button"
                          onClick={() => handleApplyPromo(promo.code)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border flex items-center gap-1.5 cursor-pointer ${
                            isCurrent
                              ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm shadow-emerald-900/50 ring-1 ring-emerald-400'
                              : 'bg-stone-800/90 hover:bg-stone-800 text-stone-300 hover:text-white border-stone-700 hover:border-amber-500/50'
                          }`}
                        >
                          <Percent className="w-3 h-3 text-amber-400" />
                          <span>{promo.badgeLabel}</span>
                          {isCurrent && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Applied Summary Banner */}
                {appliedPromo && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl flex items-center justify-between text-xs text-stone-200">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono text-xs">
                        %{appliedPromo.discountPercent}
                      </span>
                      <div>
                        <span className="font-bold text-white block">
                          كود {appliedPromo.code} مفعّل بنجاح
                        </span>
                        <span className="text-[11px] text-emerald-400">
                          وفرت {discountAmountFormatted} {currencyConfig.symbolAr} على إجمالي المنتجات
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-red-400 text-[11px] rounded-lg border border-stone-800 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>إلغاء</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 3. Comprehensive Payment Gateways */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <h3 className="text-xs font-bold text-stone-300">
                    3. اختر طريقة الدفع (محلياً أو دولياً)
                  </h3>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>تشفير آمن 256-bit</span>
                  </span>
                </div>

                {/* Gateway Selector Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {/* INTERNATIONAL GATEWAYS (USA, UK, EU, Canada) */}
                  {currentCountry.region === 'international' ? (
                    <>
                      {/* Apple Pay */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('apple_pay')}
                        className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                          paymentMethod === 'apple_pay'
                            ? 'border-white bg-white/10 text-white font-bold ring-2 ring-white/50'
                            : 'border-stone-800 bg-stone-800/60 text-stone-300 hover:text-white'
                        }`}
                      >
                        <span className="text-base font-black text-white block mb-0.5">Pay</span>
                        <span className="block text-xs font-bold">Apple Pay</span>
                        <span className="text-[10px] text-stone-400 font-normal">One-Touch Biometric</span>
                      </button>

                      {/* Google Pay */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('google_pay')}
                        className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                          paymentMethod === 'google_pay'
                            ? 'border-cyan-400 bg-cyan-500/15 text-white font-bold ring-2 ring-cyan-400/50'
                            : 'border-stone-800 bg-stone-800/60 text-stone-300 hover:text-white'
                        }`}
                      >
                        <span className="text-base font-bold text-cyan-400 block mb-0.5">G Pay</span>
                        <span className="block text-xs font-bold">Google Pay</span>
                        <span className="text-[10px] text-stone-400 font-normal">Instant 1-Click</span>
                      </button>

                      {/* Credit Card (Stripe Global) */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                          paymentMethod === 'card'
                            ? 'border-blue-500 bg-blue-500/15 text-white font-bold ring-2 ring-blue-500/50'
                            : 'border-stone-800 bg-stone-800/60 text-stone-300 hover:text-white'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-blue-400 mb-1" />
                        <span className="block text-xs font-bold">Credit / Debit Card</span>
                        <span className="text-[10px] text-blue-300 font-normal">Visa, MC, Amex (Stripe)</span>
                      </button>

                      {/* PayPal Express */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                          paymentMethod === 'paypal'
                            ? 'border-indigo-400 bg-indigo-500/15 text-white font-bold ring-2 ring-indigo-400/50'
                            : 'border-stone-800 bg-stone-800/60 text-stone-300 hover:text-white'
                        }`}
                      >
                        <span className="text-xs font-black text-indigo-300 block mb-0.5">PayPal</span>
                        <span className="block text-xs font-bold">PayPal Express</span>
                        <span className="text-[10px] text-stone-400 font-normal">Buyer Protection</span>
                      </button>

                      {/* Klarna Pay in 4 */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('klarna')}
                        className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                          paymentMethod === 'klarna'
                            ? 'border-pink-500 bg-pink-500/15 text-white font-bold ring-2 ring-pink-500/50'
                            : 'border-stone-800 bg-stone-800/60 text-stone-300 hover:text-white'
                        }`}
                      >
                        <span className="text-xs font-black text-pink-400 block mb-0.5">Klarna.</span>
                        <span className="block text-xs font-bold">Pay in 4</span>
                        <span className="text-[10px] text-pink-300 font-normal">Interest-free</span>
                      </button>
                    </>
                  ) : currentCountry.region === 'gcc' ? (
                    <>
                      {/* بطاقات مدى وفيزا */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                          paymentMethod === 'card'
                            ? 'border-blue-500 bg-blue-500/15 text-white font-bold'
                            : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:text-white'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-emerald-400 mb-1" />
                        <span className="block text-xs">مدى / فيزا / ماستركارد</span>
                        <span className="text-[10px] text-emerald-300 font-normal">دفع إلكتروني آمن</span>
                      </button>

                      {/* Apple Pay */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('apple_pay')}
                        className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                          paymentMethod === 'apple_pay'
                            ? 'border-white bg-white/10 text-white font-bold'
                            : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:text-white'
                        }`}
                      >
                        <span className="text-sm font-black text-white block mb-0.5">Pay</span>
                        <span className="block text-xs">Apple Pay</span>
                        <span className="text-[10px] text-stone-400 font-normal">دفع فوري بالبصمة</span>
                      </button>

                      {/* الدفع عند الاستلام */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                          paymentMethod === 'cod'
                            ? 'border-amber-500 bg-amber-500/15 text-white font-bold'
                            : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:text-white'
                        }`}
                      >
                        <Banknote className="w-4 h-4 text-amber-500 mb-1" />
                        <span className="block text-xs">الدفع عند الاستلام (COD)</span>
                        <span className="text-[10px] text-stone-400 font-normal">مع سمسا إكسبريس</span>
                      </button>

                      {/* PayPal */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                          paymentMethod === 'paypal'
                            ? 'border-indigo-400 bg-indigo-500/15 text-white font-bold'
                            : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:text-white'
                        }`}
                      >
                        <span className="text-xs font-black text-indigo-300 block mb-0.5">PayPal</span>
                        <span className="block text-xs">بايبال</span>
                        <span className="text-[10px] text-stone-400 font-normal">حماية المشتري</span>
                      </button>
                    </>
                  ) : (
                    <>
                      {/* الدفع عند الاستلام */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                          paymentMethod === 'cod'
                            ? 'border-amber-500 bg-amber-500/15 text-white font-bold'
                            : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:text-white'
                        }`}
                      >
                        <Banknote className="w-4 h-4 text-amber-500 mb-1" />
                        <span className="block text-xs">الدفع عند الاستلام (COD)</span>
                        <span className="text-[10px] text-stone-400 font-normal">عاين وادفع لبوسطة</span>
                      </button>

                      {/* إنستاباي InstaPay */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('instapay')}
                        className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                          paymentMethod === 'instapay'
                            ? 'border-amber-500 bg-amber-500/15 text-white font-bold'
                            : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:text-white'
                        }`}
                      >
                        <Zap className="w-4 h-4 text-purple-400 mb-1" />
                        <span className="block text-xs">إنستاباي (InstaPay)</span>
                        <span className="text-[10px] text-purple-300 font-normal">تحويل لحظي مصري</span>
                      </button>

                      {/* فودافون كاش */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('vodafone_cash')}
                        className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                          paymentMethod === 'vodafone_cash'
                            ? 'border-red-500 bg-red-500/15 text-white font-bold'
                            : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:text-white'
                        }`}
                      >
                        <Smartphone className="w-4 h-4 text-red-400 mb-1" />
                        <span className="block text-xs">فودافون كاش</span>
                        <span className="text-[10px] text-red-300 font-normal">محفظة المحمول</span>
                      </button>

                      {/* اتصالات كاش */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('etisalat_cash')}
                        className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                          paymentMethod === 'etisalat_cash'
                            ? 'border-emerald-500 bg-emerald-500/15 text-white font-bold'
                            : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:text-white'
                        }`}
                      >
                        <Smartphone className="w-4 h-4 text-emerald-400 mb-1" />
                        <span className="block text-xs">اتصالات كاش</span>
                        <span className="text-[10px] text-emerald-300 font-normal">محفظة e&</span>
                      </button>

                      {/* أورانج كاش */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('orange_cash')}
                        className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                          paymentMethod === 'orange_cash'
                            ? 'border-orange-500 bg-orange-500/15 text-white font-bold'
                            : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:text-white'
                        }`}
                      >
                        <Smartphone className="w-4 h-4 text-orange-400 mb-1" />
                        <span className="block text-xs">أورانج كاش</span>
                        <span className="text-[10px] text-orange-300 font-normal">محفظة Orange</span>
                      </button>

                      {/* فيزا وماستركارد ومدى */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                          paymentMethod === 'card'
                            ? 'border-blue-500 bg-blue-500/15 text-white font-bold'
                            : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:text-white'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-blue-400 mb-1" />
                        <span className="block text-xs">فيزا / ماستركارد</span>
                        <span className="text-[10px] text-blue-300 font-normal">دفع مباشر بالبطاقة</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Specific Gateway Details Form */}
                {paymentMethod === 'instapay' && (
                  <div className="p-4 bg-purple-950/30 border border-purple-800/50 rounded-xl space-y-3">
                    <p className="text-xs text-purple-200">
                      يرجى تحويل مبلغ <strong className="text-white tabular-nums">{finalTotalFormatted} {currencyConfig.symbolAr}</strong> عبر تطبيق إنستاباي إلى العنوان التالي:
                    </p>

                    <div className="flex items-center justify-between bg-stone-900 p-2.5 rounded-lg border border-purple-700/50">
                      <div>
                        <span className="text-[11px] text-stone-400 block">عنوان الدفع اللحظي (IPA):</span>
                        <span className="text-xs font-mono font-bold text-purple-300">naqsh.store@instapay</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyText('naqsh.store@instapay', 'ipa')}
                        className="p-1.5 bg-purple-900/60 hover:bg-purple-800 text-purple-200 rounded text-xs flex items-center gap-1"
                      >
                        {copiedData === 'ipa' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>نسخ</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        الرقم المرجعي للتحويل (Reference / Transaction ID) *
                      </label>
                      <input
                        type="text"
                        required
                        value={instapayRef}
                        onChange={(e) => setInstapayRef(e.target.value)}
                        placeholder="مثال: REF-983018274 أو آخر 6 أرقام من إيصال التحويل"
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>
                )}

                {(paymentMethod === 'vodafone_cash' || paymentMethod === 'etisalat_cash' || paymentMethod === 'orange_cash') && (
                  <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl space-y-3">
                    <p className="text-xs text-stone-300">
                      قم بتحويل <strong className="text-amber-400 tabular-nums">{finalTotalFormatted} {currencyConfig.symbolAr}</strong> إلى رقم المحفظة المعتمد لمتجر نقش:
                    </p>

                    <div className="flex items-center justify-between bg-stone-900 p-2.5 rounded-lg border border-stone-700">
                      <div>
                        <span className="text-[11px] text-stone-400 block">
                          رقم محفظة {paymentMethod === 'vodafone_cash' ? 'فودافون كاش' : paymentMethod === 'etisalat_cash' ? 'اتصالات كاش' : 'أورانج كاش'}:
                        </span>
                        <span className="text-sm font-mono font-bold text-amber-400">
                          {paymentMethod === 'vodafone_cash'
                            ? PAYMENT_GATEWAYS.vodafone_cash.walletNumber
                            : paymentMethod === 'etisalat_cash'
                            ? PAYMENT_GATEWAYS.etisalat_cash.walletNumber
                            : PAYMENT_GATEWAYS.orange_cash.walletNumber}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyText(
                            paymentMethod === 'vodafone_cash'
                              ? PAYMENT_GATEWAYS.vodafone_cash.walletNumber
                              : paymentMethod === 'etisalat_cash'
                              ? PAYMENT_GATEWAYS.etisalat_cash.walletNumber
                              : PAYMENT_GATEWAYS.orange_cash.walletNumber,
                            'wallet'
                          )
                        }
                        className="p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-xs flex items-center gap-1"
                      >
                        {copiedData === 'wallet' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>نسخ الرقم</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        رقم الهاتف الذي قمت بالتحويل منه لتأكيد الإيداع *
                      </label>
                      <input
                        type="tel"
                        required
                        value={walletSenderPhone}
                        onChange={(e) => setWalletSenderPhone(e.target.value)}
                        placeholder="أدخل رقم محفظتك التي أرسلت منها المبلغ"
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                )}

                {/* Apple Pay One-Touch Details */}
                {paymentMethod === 'apple_pay' && (
                  <div className="p-4 bg-gradient-to-b from-stone-900 to-black border border-stone-700 rounded-2xl space-y-3 text-center">
                    <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center mx-auto shadow-lg font-black text-xl">
                      
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">Apple Pay 1-Touch Express</h4>
                      <p className="text-xs text-stone-300 mt-0.5">
                        {language === 'ar'
                          ? 'تفويض دفع فوري مشفر بنقرة واحدة عبر Face ID أو Touch ID بدون إدخال أرقام بطاقتك.'
                          : 'Encrypted one-touch authorization with Face ID or Touch ID. Zero manual card entry.'}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs flex items-center justify-between">
                      <span className="text-stone-400">الإجمالي المعتمد للشحن السريع:</span>
                      <span className="font-mono font-bold text-emerald-400 text-sm">
                        {finalTotalFormatted} {currencySymbol}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>تأكيد بيومتري فوري وتشفير أمني 256-bit</span>
                    </div>
                  </div>
                )}

                {/* Google Pay Details */}
                {paymentMethod === 'google_pay' && (
                  <div className="p-4 bg-gradient-to-b from-stone-900 to-slate-950 border border-cyan-800/50 rounded-2xl space-y-3 text-center">
                    <div className="w-12 h-12 bg-slate-900 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg font-black text-base border border-cyan-500/40">
                      G Pay
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">Google Pay Express</h4>
                      <p className="text-xs text-stone-300 mt-0.5">
                        {language === 'ar'
                          ? 'الدفع المباشر عبر حساب جوجل وبطاقتك المحفوظة بأعلى معايير الأمان العالمية.'
                          : 'Fast, secure checkout using your saved Google Account payment methods.'}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                      <span className="text-stone-400">المبلغ الإجمالي:</span>
                      <span className="font-mono font-bold text-cyan-300 text-sm">
                        {finalTotalFormatted} {currencySymbol}
                      </span>
                    </div>
                  </div>
                )}

                {/* PayPal Express Details */}
                {paymentMethod === 'paypal' && (
                  <div className="p-4 bg-gradient-to-b from-stone-900 to-indigo-950/40 border border-indigo-700/50 rounded-2xl space-y-3 text-center">
                    <div className="w-12 h-12 bg-indigo-900/60 text-indigo-300 rounded-2xl flex items-center justify-center mx-auto shadow-lg font-black text-sm border border-indigo-500/40">
                      PayPal
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">PayPal Buyer Protection</h4>
                      <p className="text-xs text-stone-300 mt-0.5">
                        {language === 'ar'
                          ? 'دفع عالمي آمن بالكامل مع ضمان استرداد الأموال بنسبة 100% وحماية المشتري لمدة 180 يوماً.'
                          : '100% protected international payment with 180-day PayPal Buyer Guarantee.'}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-stone-950 border border-indigo-950 text-xs flex items-center justify-between">
                      <span className="text-stone-400">القيمة الإجمالية:</span>
                      <span className="font-mono font-bold text-indigo-300 text-sm">
                        {finalTotalFormatted} {currencySymbol}
                      </span>
                    </div>
                  </div>
                )}

                {/* Klarna Pay in 4 Details */}
                {paymentMethod === 'klarna' && (
                  <div className="p-4 bg-gradient-to-b from-stone-900 to-pink-950/30 border border-pink-700/50 rounded-2xl space-y-3 text-center">
                    <div className="w-12 h-12 bg-pink-950 text-pink-300 rounded-2xl flex items-center justify-center mx-auto shadow-lg font-black text-sm border border-pink-500/40">
                      Klarna.
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">قسّم المبلغ على 4 دفعات بدون فوائد (Pay in 4)</h4>
                      <p className="text-xs text-stone-300 mt-0.5">
                        {language === 'ar'
                          ? `ادفع اليوم فقط ${(Number(finalTotalFormatted) / 4).toFixed(isDecimalCurrency ? 2 : 0)} ${currencySymbol} والباقي على 3 دفعات كل أسبوعين بدون أي فوائد!`
                          : `Pay only ${(Number(finalTotalFormatted) / 4).toFixed(isDecimalCurrency ? 2 : 0)} ${currencySymbol} today. 4 interest-free installments every 2 weeks.`}
                      </p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                      <div className="p-2 bg-pink-950/40 rounded-lg border border-pink-800/40">
                        <span className="text-[10px] text-pink-300 block">اليوم</span>
                        <span className="text-xs font-bold text-white font-mono">25%</span>
                      </div>
                      <div className="p-2 bg-stone-900 rounded-lg border border-stone-800">
                        <span className="text-[10px] text-stone-400 block">أسبوع 2</span>
                        <span className="text-xs font-bold text-stone-300 font-mono">25%</span>
                      </div>
                      <div className="p-2 bg-stone-900 rounded-lg border border-stone-800">
                        <span className="text-[10px] text-stone-400 block">أسبوع 4</span>
                        <span className="text-xs font-bold text-stone-300 font-mono">25%</span>
                      </div>
                      <div className="p-2 bg-stone-900 rounded-lg border border-stone-800">
                        <span className="text-[10px] text-stone-400 block">أسبوع 6</span>
                        <span className="text-xs font-bold text-stone-300 font-mono">25%</span>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">اسم صاحب البطاقة *</label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="AS PRINTED ON CARD"
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">رقم البطاقة (16 رقم) *</label>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4111 2222 3333 4444"
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">تاريخ الانتهاء (MM/YY) *</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="12/28"
                          className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">رمز الأمان CVV *</label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="123"
                          className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* الدفع عند الاستلام - وثيقة وإشعار مسؤولية التاجر والتوصيل الرسمية */}
                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-gradient-to-r from-amber-950/30 via-stone-900 to-amber-950/20 border border-amber-500/50 rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>{language === 'ar' ? 'ضمان مسؤولية الدفع والتوصيل الرسمية من «نَقْش» 🛡️' : 'Official NAQSH COD & Delivery Guarantee 🛡️'}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                        {language === 'ar' ? 'معاينة قبل الدفع' : 'Inspect Before Paying'}
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-300 leading-relaxed">
                      {language === 'ar'
                        ? 'مؤسسة «نَقْش» للتجارة والتصنيع هي المسؤول القانوني والتنفيذي المباشر عن شحنتك حتى باب منزلك عبر شركة بوسطة إكسبريس (Bosta VIP). لن تدفع أي مليم الآن؛ يحق لك فتح العلبة وفحص الكفر أو المحفظة والتأكد من مطابقة الاسم والنقش البارز أمام المندوب قبل دفع الجنيه.'
                        : 'NAQSH is the verified legal and operational Merchant of Record. Zero prepayment required. You are fully entitled to open and inspect the case or wallet in front of the courier before handing over payment.'}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-[10px] text-stone-400 border-t border-stone-800 flex-wrap">
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>{language === 'ar' ? 'فحص مجاني أمام المندوب' : 'Free inspection before COD'}</span>
                      </span>
                      <span>•</span>
                      <span>{language === 'ar' ? 'سجل تجاري: 248910' : 'Reg: 248910'}</span>
                      <span>•</span>
                      <span>{language === 'ar' ? 'بطاقة ضريبية: 619-340-882' : 'Tax: 619-340-882'}</span>
                      <span>•</span>
                      <span>{language === 'ar' ? 'استبدال فوري مجاني 14 يوماً' : '14-Day Free Exchange'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Detailed Invoice Breakdown */}
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-stone-400">
                  <span>قيمة المنتجات ({items.length}):</span>
                  <span className="text-stone-200 font-semibold tabular-nums">
                    {itemsSubtotalFormatted} {currencyConfig.symbolAr}
                  </span>
                </div>

                {appliedPromo && (
                  <div className="flex items-center justify-between text-emerald-400 font-semibold bg-emerald-950/40 px-2.5 py-1.5 rounded-lg border border-emerald-800/40">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-400" />
                      <span>كود الخصم ({appliedPromo.code} - خصم {appliedPromo.discountPercent}%):</span>
                    </span>
                    <span className="tabular-nums font-mono font-bold text-emerald-300">
                      - {discountAmountFormatted} {currencyConfig.symbolAr}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-stone-400">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-stone-400" />
                    <span>تكلفة الشحن والتوصيل (بوسطة):</span>
                  </span>
                  <span className="text-stone-300 font-semibold tabular-nums">
                    {shippingFeeFormatted} {currencyConfig.symbolAr}
                  </span>
                </div>

                <div className="border-t border-stone-800 pt-2.5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">الإجمالي النهائي المستحق:</span>
                    <span className="text-[10px] text-stone-500">
                      {paymentMethod === 'cod' ? 'شامل التحصيل عند الاستلام' : 'شامل الضريبة والشحن'}
                    </span>
                  </div>

                  <div className="text-left">
                    {appliedPromo && (
                      <span className="text-xs text-stone-500 line-through block tabular-nums">
                        {originalTotalFormatted} {currencyConfig.symbolAr}
                      </span>
                    )}
                    <span className="text-lg font-bold text-amber-400 tabular-nums">
                      {finalTotalFormatted} {currencyConfig.symbolAr}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 text-sm flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>جاري معالجة الدفع وإرسال مواصفات الطباعة للمصنع...</span>
                  ) : (
                    <>
                      <span>
                        تأكيد الطلب ودفع ({finalTotalFormatted} {currencyConfig.symbolAr})
                      </span>
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
