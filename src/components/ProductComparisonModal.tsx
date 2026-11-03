import React from 'react';
import {
  X,
  Scale,
  Sparkles,
  Shield,
  Zap,
  Sliders,
  Plus,
  Star,
  Check,
  Truck,
  Layers,
  Smartphone,
  Eye,
  Trash2,
} from 'lucide-react';
import { Product, Currency } from '../types';
import { CURRENCIES } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

export interface ProductComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onCustomize: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onRemoveFromCompare: (productId: string) => void;
  onClearAll: () => void;
}

export const ProductComparisonModal: React.FC<ProductComparisonModalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onCustomize,
  onQuickAdd,
  onRemoveFromCompare,
  onClearAll,
}) => {
  const { language, isRtl } = useLanguage();
  const currencyConfig = CURRENCIES[currency] || CURRENCIES.USD;
  const isDecimalCurrency = currency === 'USD' || currency === 'EUR' || currency === 'GBP';
  const currencySymbol = language === 'ar' ? currencyConfig.symbolAr : currencyConfig.symbolEn;

  if (!isOpen) return null;

  // Comparison Matrix Specifications
  const getSpecsForProduct = (p: Product) => {
    const isCase = p.category === 'cases';
    return {
      categoryLabel: isCase
        ? language === 'ar' ? 'كفر حماية تكنولوجي للهاتف' : 'Tech Protective Phone Case'
        : language === 'ar' ? 'محفظة جلد طبيعي أصلية' : 'Genuine Leather Wallet',
      themeBadge: language === 'ar' ? (p.themeNameAr || p.tagAr) : (p.theme || p.tagEn || p.tagAr),
      material: isCase
        ? language === 'ar'
          ? 'TPU هجين صلب ممتص للصدمات + بولي كربونات ألماني مع حواف سيليكونية'
          : 'Shockproof Hybrid TPU + German Polycarbonate with silicon grip'
        : language === 'ar'
          ? 'جلد بقري وجملي طبيعي 100% مدبوغ نباتياً بحرفية يدوية مصرية'
          : '100% Vegetable-tanned Egyptian genuine leather',
      printType: isCase
        ? language === 'ar'
          ? 'طباعة يابانية بالأشعة فوق البنفسجية UV ناتئة 3D مقاومة للخدش والتلاشي مدى الحياة'
          : 'Japanese 3D Tactile UV cured print, lifetime scratch and fade resistant'
        : language === 'ar'
          ? 'حفر حراري مذهب بورق ذهب 24k أصلي أو ختم ليزر بارز مخصص'
          : '24K gold hot-stamped foil or deep laser debossing',
      dropProtection: isCase
        ? language === 'ar'
          ? 'مقاومة سقوط حتى 3.5 أمتار (معايير الجيش الأمريكي MIL-STD-810G)'
          : 'Up to 3.5m / 12ft Military Drop Protection (MIL-STD-810G)'
        : language === 'ar'
          ? 'هيكل مدعم بحواف مزدوجة مبطنة ومقاومة للاهتراء اليومي'
          : 'Reinforced dual-stitched edge durability',
      magsafeSupport: isCase
        ? language === 'ar'
          ? 'مغناطيس N52 نيوديميوم فائق الشدة متوافق بالكامل مع MagSafe و Qi2'
          : 'Ultra-strong N52 Neodymium magnet array (MagSafe & Qi2 compatible)'
        : language === 'ar'
          ? 'حماية بطاقات RFID مدمجة مانعة للسرقة الإلكترونية'
          : 'Integrated RFID blocking anti-theft shield',
      cameraBezel: isCase
        ? language === 'ar'
          ? 'إطار مرتفع 1.5 مم يحمي عدسات الكاميرا من الاحتكاك بالأسطح'
          : '1.5mm raised camera bezel protection'
        : language === 'ar'
          ? 'جيب محكم لـ 8 بطاقات وبطاقة هوية مع قفل مغناطيسي آمن'
          : '8 card slots + cash slot with secure magnetic closure',
      customization: isCase
        ? language === 'ar'
          ? 'طباعة الاسم بالخط العربي (ديواني، كوفي، رقعة، ثلث) أو رفع صورتك الخاصة'
          : 'Custom Arabic calligraphy (Diwani, Kufic, Ruqah) or your custom photo'
        : language === 'ar'
          ? 'حفر الاسم أو الحروف الأولى بذهب 24k أو فضة أو حفر أسود غائر'
          : '24K gold foil or deep debossed initials and custom typography',
      warrantyAndDelivery: language === 'ar'
        ? 'ضمان استبدال فوري 14 يوماً + شحن بوسطة / SMSA لباب بيتك (2-4 أيام)'
        : '14-Day Free Exchange Guarantee + 2-4 Days Express Dispatch',
    };
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-6xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden text-stone-100 flex flex-col my-4 max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 bg-gradient-to-r from-stone-950 via-cyan-950/40 to-stone-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{language === 'ar' ? 'أداة المقارنة الذكية للمواصفات والأسعار' : 'Smart Product Comparison Matrix'}</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold">
                  {language === 'ar' ? `${products.length} من أصل 3 منتجات` : `${products.length} of 3 selected`}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white">
                {language === 'ar'
                  ? 'مقارنة دقيقة جنباً إلى جنب للمتانة، الماج سيف، وخيارات التخصيص'
                  : 'Side-by-Side Comparison: Specs, Protection & Customization'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {products.length > 0 && (
              <button
                onClick={onClearAll}
                className="px-3 py-1.5 rounded-xl text-stone-400 hover:text-red-400 hover:bg-stone-800 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                title={language === 'ar' ? 'مسح التحديد' : 'Clear All'}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'ar' ? 'تفريغ المقارنة' : 'Clear All'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              title="إغلاق المقارنة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {products.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-stone-800/80 text-stone-500 flex items-center justify-center mx-auto">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-stone-300">
                {language === 'ar' ? 'لم تقم بتحديد أي منتجات للمقارنة بعد' : 'No products selected for comparison'}
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                {language === 'ar'
                  ? 'انقر على خانة "مقارنة ⚖️" الموجودة على أي كفر أو محفظة في المتجر لإضافتها للمقارنة جنباً إلى جنب (حتى 3 منتجات).'
                  : 'Click the "Compare ⚖️" checkbox on any product card in the catalog to add it here (up to 3 products).'}
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-amber-500 text-stone-950 font-bold rounded-xl text-xs hover:opacity-90 transition-opacity"
              >
                {language === 'ar' ? 'تصفح منتجات المتجر الآن' : 'Browse Catalog Now'}
              </button>
            </div>
          ) : (
            <div>
              {/* Responsive Grid Table */}
              <div className="overflow-x-auto pb-2">
                <div
                  className="min-w-[680px] grid gap-4"
                  style={{
                    gridTemplateColumns: `200px repeat(${products.length}, minmax(220px, 1fr))`,
                  }}
                >
                  {/* Column Header / Feature Label spacer */}
                  <div className="p-3 bg-stone-950/60 rounded-2xl border border-stone-800 flex flex-col justify-end">
                    <span className="text-xs font-black text-cyan-400">
                      {language === 'ar' ? 'المواصفات والمعايير' : 'Specs & Features'}
                    </span>
                    <span className="text-[10px] text-stone-500">
                      {language === 'ar' ? 'فحص شامل قبل الشراء' : 'Full inspection before order'}
                    </span>
                  </div>

                  {/* Product Cards Top Row */}
                  {products.map((p) => {
                    const priceFormatted = (p.price * currencyConfig.rateFromUSD).toFixed(
                      isDecimalCurrency ? 2 : 0
                    );
                    const costFormatted = ((p.factoryCost || p.price * 0.55) * currencyConfig.rateFromUSD).toFixed(
                      isDecimalCurrency ? 2 : 0
                    );
                    const profitFormatted = ((p.price - (p.factoryCost || p.price * 0.55)) * currencyConfig.rateFromUSD).toFixed(
                      isDecimalCurrency ? 2 : 0
                    );
                    const pName = language === 'ar' ? p.nameAr : p.nameEn;

                    return (
                      <div
                        key={p.id}
                        className="p-4 rounded-2xl bg-gradient-to-b from-stone-850 to-stone-950 border border-stone-800 flex flex-col justify-between relative group hover:border-cyan-500/50 transition-all shadow-lg"
                      >
                        {/* Remove Button */}
                        <button
                          onClick={() => onRemoveFromCompare(p.id)}
                          className="absolute top-2.5 right-2.5 p-1 rounded-lg bg-stone-900/80 text-stone-400 hover:text-red-400 hover:bg-stone-800 transition-colors z-10"
                          title={language === 'ar' ? 'إزالة من المقارنة' : 'Remove from compare'}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <div>
                          {/* Image */}
                          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-900 mb-3 border border-stone-800">
                            <img
                              src={p.image}
                              alt={pName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Title */}
                          <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 mb-1.5">
                            {pName}
                          </h4>

                          {/* Price */}
                          <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-base font-black text-amber-400 tabular-nums">
                              {priceFormatted} {currencySymbol}
                            </span>
                          </div>

                          {/* Dropship Profit & Margin */}
                          <div className="p-1.5 rounded-lg bg-stone-900/90 border border-stone-800 text-[10px] flex items-center justify-between text-stone-400 mb-3">
                            <span>
                              {language === 'ar' ? 'التكلفة:' : 'Cost:'}{' '}
                              <strong className="text-stone-300">{costFormatted}</strong>
                            </span>
                            <span className="text-emerald-400 font-bold">
                              {language === 'ar' ? 'ربحك:' : 'Profit:'} +{profitFormatted} {currencySymbol}
                            </span>
                          </div>
                        </div>

                        {/* Direct Action Buttons */}
                        <div className="space-y-1.5 pt-2 border-t border-stone-800/80">
                          <button
                            onClick={() => {
                              onCustomize(p);
                              onClose();
                            }}
                            className="w-full py-2 bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-stone-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition-transform active:scale-95 cursor-pointer"
                          >
                            <Sliders className="w-3.5 h-3.5" />
                            <span>{language === 'ar' ? 'تخصيص ومعاينة حية' : 'Customize'}</span>
                          </button>

                          <button
                            onClick={() => {
                              onQuickAdd(p);
                              onClose();
                            }}
                            className="w-full py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors border border-stone-700 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{language === 'ar' ? 'إضافة سريعة للسلة' : 'Quick Add'}</span>
                          </button>

                          <a
                            href={`https://wa.me/201026541234?text=${encodeURIComponent(`السلام عليكم، قارنت المنتجات وأود طلب: ${p.nameAr} بسعر ${priceFormatted} ${currencySymbol} مع كود Dody15 والمعاينة قبل الدفع`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-bold rounded-xl text-[11px] flex items-center justify-center gap-1.5 border border-emerald-500/40 transition-colors"
                          >
                            <span>💬 طلب واتساب (01026541234)</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}

                  {/* 1. Category & Subculture Theme */}
                  <div className="p-3 bg-stone-950/40 rounded-xl border border-stone-800/80 text-xs font-bold text-stone-300 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{language === 'ar' ? 'القسم والستايل الفني' : 'Category & Style'}</span>
                  </div>
                  {products.map((p) => {
                    const specs = getSpecsForProduct(p);
                    return (
                      <div
                        key={`theme-${p.id}`}
                        className="p-3 bg-stone-900/60 rounded-xl border border-stone-800/80 text-xs"
                      >
                        <span className="font-bold text-cyan-300 block mb-0.5">{specs.themeBadge}</span>
                        <span className="text-[11px] text-stone-400">{specs.categoryLabel}</span>
                      </div>
                    );
                  })}

                  {/* 2. Drop Protection & Impact Rating */}
                  <div className="p-3 bg-stone-950/40 rounded-xl border border-stone-800/80 text-xs font-bold text-stone-300 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{language === 'ar' ? 'مقاومة الصدمات والسقوط' : 'Drop Protection'}</span>
                  </div>
                  {products.map((p) => {
                    const specs = getSpecsForProduct(p);
                    return (
                      <div
                        key={`drop-${p.id}`}
                        className="p-3 bg-stone-900/60 rounded-xl border border-stone-800/80 text-xs text-stone-300"
                      >
                        <span className="text-emerald-400 font-bold block mb-1">
                          {p.category === 'cases' ? '🛡️ MIL-STD-810G (3.5m)' : '💎 خياطة مدعمة'}
                        </span>
                        <p className="text-[11px] text-stone-400 leading-relaxed">{specs.dropProtection}</p>
                      </div>
                    );
                  })}

                  {/* 3. MagSafe & Wireless / Anti-theft */}
                  <div className="p-3 bg-stone-950/40 rounded-xl border border-stone-800/80 text-xs font-bold text-stone-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-violet-400 shrink-0" />
                    <span>{language === 'ar' ? 'ماج سيف والمغناطيس' : 'MagSafe & Shield'}</span>
                  </div>
                  {products.map((p) => {
                    const specs = getSpecsForProduct(p);
                    return (
                      <div
                        key={`magsafe-${p.id}`}
                        className="p-3 bg-stone-900/60 rounded-xl border border-stone-800/80 text-xs text-stone-300"
                      >
                        <span className="text-violet-400 font-bold block mb-1">
                          {p.category === 'cases' ? '⚡ مغناطيس N52 فائق القوة' : '🔒 RFID Anti-theft'}
                        </span>
                        <p className="text-[11px] text-stone-400 leading-relaxed">{specs.magsafeSupport}</p>
                      </div>
                    );
                  })}

                  {/* 4. Materials & Surface Texture */}
                  <div className="p-3 bg-stone-950/40 rounded-xl border border-stone-800/80 text-xs font-bold text-stone-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{language === 'ar' ? 'الخامات والطباعة اليابانية' : 'Materials & 3D Print'}</span>
                  </div>
                  {products.map((p) => {
                    const specs = getSpecsForProduct(p);
                    return (
                      <div
                        key={`mat-${p.id}`}
                        className="p-3 bg-stone-900/60 rounded-xl border border-stone-800/80 text-xs text-stone-300 space-y-1.5"
                      >
                        <p className="text-[11px] text-stone-300 font-semibold">{specs.material}</p>
                        <p className="text-[10px] text-amber-300/90 bg-stone-950/60 p-2 rounded-lg border border-stone-800">
                          {specs.printType}
                        </p>
                      </div>
                    );
                  })}

                  {/* 5. Customization Options (Arabic Calligraphy, Gold Foil) */}
                  <div className="p-3 bg-stone-950/40 rounded-xl border border-stone-800/80 text-xs font-bold text-stone-300 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{language === 'ar' ? 'خيارات التخصيص والاسم' : 'Personalization'}</span>
                  </div>
                  {products.map((p) => {
                    const specs = getSpecsForProduct(p);
                    return (
                      <div
                        key={`custom-${p.id}`}
                        className="p-3 bg-stone-900/60 rounded-xl border border-stone-800/80 text-xs text-stone-300"
                      >
                        <span className="text-cyan-400 font-bold block mb-1">
                          ✒️ {language === 'ar' ? 'حفر مخصص مجاني' : 'Free Custom Engraving'}
                        </span>
                        <p className="text-[11px] text-stone-400 leading-relaxed">{specs.customization}</p>
                      </div>
                    );
                  })}

                  {/* 6. Camera Bezel Protection & Enclosure */}
                  <div className="p-3 bg-stone-950/40 rounded-xl border border-stone-800/80 text-xs font-bold text-stone-300 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{language === 'ar' ? 'حماية الكاميرا والعدسات' : 'Camera Guard'}</span>
                  </div>
                  {products.map((p) => {
                    const specs = getSpecsForProduct(p);
                    return (
                      <div
                        key={`bezel-${p.id}`}
                        className="p-3 bg-stone-900/60 rounded-xl border border-stone-800/80 text-xs text-stone-300"
                      >
                        <p className="text-[11px] text-stone-400 leading-relaxed">{specs.cameraBezel}</p>
                      </div>
                    );
                  })}

                  {/* 7. Warranty & Express Delivery */}
                  <div className="p-3 bg-stone-950/40 rounded-xl border border-stone-800/80 text-xs font-bold text-stone-300 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{language === 'ar' ? 'الضمان والشحن' : 'Warranty & Delivery'}</span>
                  </div>
                  {products.map((p) => {
                    const specs = getSpecsForProduct(p);
                    return (
                      <div
                        key={`warranty-${p.id}`}
                        className="p-3 bg-stone-900/60 rounded-xl border border-stone-800/80 text-xs text-stone-300"
                      >
                        <p className="text-[11px] text-emerald-400/90 font-medium">{specs.warrantyAndDelivery}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick Advice */}
              <div className="mt-4 p-3 bg-stone-950/70 rounded-2xl border border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>
                    {language === 'ar'
                      ? 'جميع الكفرات والمحافظ مشمولة بضمان استبدال فوري 14 يوماً وشحن بوسطة لباب بيتك مع فحص مجاني قبل الاستلام.'
                      : 'All products include a 14-day replacement warranty and door-to-door express delivery with inspection.'}
                  </span>
                </span>
                <span className="font-mono text-[11px] text-amber-400">
                  {language === 'ar' ? 'كود خصم إضافي: Dody15' : 'Promo code: Dody15'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
