import React, { useState } from 'react';
import { Sliders, Plus, Star, CheckCircle, MessageSquare, Shield, Zap, Sparkles, Check, Share2, Bell, Palette, Scale } from 'lucide-react';
import { Product, Currency } from '../types';
import { CURRENCIES } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

export interface ShapeVariant {
  id: string;
  nameAr: string;
  nameEn: string;
  badgeAr: string;
  badgeEn: string;
  icon: string;
  priceDelta: number;
  highlightColor: string;
}

export const CASE_SHAPES: ShapeVariant[] = [
  {
    id: 'armor',
    nameAr: 'درع مصفح 3D',
    nameEn: 'Armor Shield 3D',
    badgeAr: 'حماية صدمات 3m',
    badgeEn: '3m Drop Shield',
    icon: '🛡️',
    priceDelta: 0,
    highlightColor: 'border-cyan-500/80 text-cyan-400 bg-cyan-950/40',
  },
  {
    id: 'magsafe',
    nameAr: 'ماج سيف كريستال',
    nameEn: 'MagSafe Crystal',
    badgeAr: 'مغناطيس N52 قوي',
    badgeEn: 'Strong N52 MagSafe',
    icon: '⚡',
    priceDelta: 15,
    highlightColor: 'border-violet-500/80 text-violet-400 bg-violet-950/40',
  },
  {
    id: 'carbon',
    nameAr: 'كاربون مطفي',
    nameEn: 'Matte Carbon',
    badgeAr: 'مانع للبصمات والخدش',
    badgeEn: 'Anti-Fingerprint',
    icon: '🖤',
    priceDelta: 10,
    highlightColor: 'border-stone-500/80 text-stone-300 bg-stone-900',
  },
  {
    id: 'hologram',
    nameAr: 'هولوغرام عاكس',
    nameEn: 'Holographic Neon',
    badgeAr: 'تأثير إضاءة ديناميكي',
    badgeEn: 'Light Shift Prism',
    icon: '🔮',
    priceDelta: 20,
    highlightColor: 'border-amber-500/80 text-amber-400 bg-amber-950/40',
  },
];

export const WALLET_SHAPES: ShapeVariant[] = [
  {
    id: 'cognac',
    nameAr: 'جلد كستنائي كلاسيك',
    nameEn: 'Vintage Cognac',
    badgeAr: 'طبيعي 100%',
    badgeEn: '100% Genuine',
    icon: '🍂',
    priceDelta: 0,
    highlightColor: 'border-amber-600/80 text-amber-400 bg-amber-950/40',
  },
  {
    id: 'obsidian',
    nameAr: 'أسود كربون مطفي',
    nameEn: 'Obsidian Matte',
    badgeAr: 'مقاوم للماء',
    badgeEn: 'Water Resistant',
    icon: '🖤',
    priceDelta: 0,
    highlightColor: 'border-stone-500/80 text-stone-300 bg-stone-900',
  },
  {
    id: 'gold-foil',
    nameAr: 'مذهب 24k فاخر',
    nameEn: '24k Gold Engraved',
    badgeAr: 'حفر حراري مذهب',
    badgeEn: '24k Hot Foil Stamp',
    icon: '⚜️',
    priceDelta: 25,
    highlightColor: 'border-yellow-500/80 text-yellow-400 bg-yellow-950/40',
  },
];

interface ProductCardProps {
  product: Product;
  currency: Currency;
  onCustomize: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onViewReviews?: (product: Product) => void;
  onShareProduct?: (product: Product) => void;
  onPriceAlert?: (product: Product) => void;
  onSimulateLeather?: (product: Product) => void;
  isSelectedForCompare?: boolean;
  onToggleCompare?: (product: Product) => void;
  isCompareDisabled?: boolean;
  showDropshipMargins?: boolean;
  density?: 'standard' | 'compact';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onCustomize,
  onQuickAdd,
  onViewReviews,
  onShareProduct,
  onPriceAlert,
  onSimulateLeather,
  isSelectedForCompare = false,
  onToggleCompare,
  isCompareDisabled = false,
  showDropshipMargins = true,
  density = 'standard',
}) => {
  const { language, t, isRtl } = useLanguage();
  const currencyConfig = CURRENCIES[currency] || CURRENCIES.USD;
  const currencySymbol = language === 'ar' ? currencyConfig.symbolAr : currencyConfig.symbolEn;

  const shapeList = product.category === 'wallets' ? WALLET_SHAPES : CASE_SHAPES;
  const [selectedShapeId, setSelectedShapeId] = useState<string>(shapeList[0].id);

  const currentShape = shapeList.find((s) => s.id === selectedShapeId) || shapeList[0];
  const finalPrice = product.price + currentShape.priceDelta;

  const retailPrice = (finalPrice * currencyConfig.rateFromUSD).toFixed(0);
  const factoryCost = (product.factoryCost * currencyConfig.rateFromUSD).toFixed(0);
  const profitMargin = (finalPrice - product.factoryCost) * currencyConfig.rateFromUSD;
  const profitMarginPercent = Math.round(((finalPrice - product.factoryCost) / finalPrice) * 100);

  const reviews = product.reviews || [];
  const reviewsCount = product.reviewsCount || reviews.length;
  const topReview = reviews[0];
  const avgRating = product.rating || 4.9;

  const productName = language === 'ar' ? product.nameAr : (product.nameEn || product.nameAr);
  const productDesc = language === 'ar' ? product.descriptionAr : (product.descriptionEn || product.descriptionAr);
  const productTag = language === 'ar' ? product.tagAr : (product.tagEn || product.tagAr);
  const productTheme = language === 'ar'
    ? (product.themeNameAr || (product.category === 'cases' ? 'كفرات ذكية' : 'مصنوعات جلدية'))
    : (product.theme || (product.category === 'cases' ? 'Smart Cases' : 'Leather Goods'));

  const handleCustomAction = () => {
    // Pass product with chosen shape configuration
    onCustomize({
      ...product,
      price: finalPrice,
      tagAr: `${product.tagAr} · ${currentShape.nameAr}`,
      tagEn: `${product.tagEn} · ${currentShape.nameEn}`,
    });
  };

  const handleQuickAddAction = () => {
    onQuickAdd({
      ...product,
      price: finalPrice,
      tagAr: `${product.tagAr} · ${currentShape.nameAr}`,
      tagEn: `${product.tagEn} · ${currentShape.nameEn}`,
    });
  };

  const isCompact = density === 'compact';

  return (
    <div className={`group relative bg-stone-900/90 rounded-2xl border transition-all duration-300 flex flex-col ${
      isSelectedForCompare
        ? 'border-cyan-400 ring-2 ring-cyan-400/60 shadow-xl shadow-cyan-950/50 scale-[1.01]'
        : 'border-stone-800 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-950/20 hover:-translate-y-0.5'
    } ${isCompact ? 'text-xs' : ''}`}>
      
      {/* Product Image Slot */}
      <div className={`relative ${isCompact ? 'aspect-[5/4]' : 'aspect-[4/3]'} bg-stone-950 overflow-hidden`}>
        <img
          src={product.image}
          alt={productName}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quiet 1-line tag */}
        <div className={`absolute top-2.5 ${isRtl ? 'right-2.5' : 'left-2.5'} z-10 text-[11px] font-semibold text-stone-200 bg-stone-900/85 backdrop-blur-md px-2 py-0.5 rounded-md border border-stone-700/60 shadow`}>
          {productTag}
        </div>

        {/* Selected Shape Floating Indicator */}
        <div className={`absolute top-2.5 ${isRtl ? 'left-2.5' : 'right-2.5'} z-10 text-[10px] font-bold px-2 py-0.5 rounded-full border shadow flex items-center gap-1 backdrop-blur-md transition-all ${currentShape.highlightColor}`}>
          <span>{currentShape.icon}</span>
          <span>{language === 'ar' ? currentShape.badgeAr : currentShape.badgeEn}</span>
        </div>

        {/* Compare Products Checkbox Button (High z-index to guarantee instant clicking) */}
        {onToggleCompare && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleCompare(product);
            }}
            disabled={isCompareDisabled}
            className={`absolute bottom-2.5 ${isRtl ? 'right-2.5' : 'left-2.5'} z-30 px-2.5 py-1.5 rounded-xl text-[11px] font-bold border backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg cursor-pointer ${
              isSelectedForCompare
                ? 'bg-cyan-500 text-stone-950 border-cyan-300 ring-2 ring-cyan-400/80 shadow-cyan-900/80 font-black scale-105'
                : isCompareDisabled
                ? 'bg-stone-900/90 text-stone-500 border-stone-800 opacity-60 cursor-not-allowed'
                : 'bg-stone-900/90 text-stone-200 border-stone-700 hover:border-cyan-400 hover:text-white hover:bg-stone-850'
            }`}
            title={
              isCompareDisabled
                ? language === 'ar' ? 'الحد الأقصى 3 منتجات للمقارنة' : 'Max 3 items to compare'
                : isSelectedForCompare
                ? language === 'ar' ? 'محدد للمقارنة (اضغط للإلغاء)' : 'Selected for comparison'
                : language === 'ar' ? 'اختر لمقارنة المواصفات والأسعار ⚖️' : 'Select to compare side-by-side ⚖️'
            }
          >
            <span
              className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                isSelectedForCompare
                  ? 'bg-stone-950 border-stone-950 text-cyan-300'
                  : 'border-stone-400 bg-stone-800/90'
              }`}
            >
              {isSelectedForCompare ? <Check className="w-3 h-3 stroke-[3]" /> : null}
            </span>
            <span>
              {isSelectedForCompare
                ? (language === 'ar' ? 'محدد للمقارنة ✓' : 'Comparing ✓')
                : (language === 'ar' ? 'مقارنة ⚖️' : 'Compare ⚖️')}
            </span>
          </button>
        )}

        {/* Quick Action Overlay on hover (pointer-events-none on backdrop so it won't block bottom checkbox) */}
        <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3 pointer-events-none">
          <button
            onClick={handleCustomAction}
            className="pointer-events-auto px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-stone-950 text-xs font-black rounded-xl shadow-lg flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'تخصيص ومعاينة حية' : 'Customize & Preview'}</span>
          </button>
        </div>
      </div>

      {/* Card Content & Hierarchy */}
      <div className={`${isCompact ? 'p-3.5' : 'p-4 sm:p-5'} flex-1 flex flex-col justify-between`}>
        
        <div>
          {/* Category & Lead Time unboxed metadata */}
          <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mb-1.5">
            <span className="text-cyan-400 font-semibold">{productTheme}</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="text-emerald-400">{language === 'ar' ? '3D بارز' : '3D Tactile'}</span>
          </div>

          {/* Product Name */}
          <h3 className={`font-bold text-stone-100 group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1 ${
            isCompact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
          }`}>
            {productName}
          </h3>

          {/* Rating Stars & Count Bar */}
          <div className="flex items-center justify-between text-xs mb-2.5">
            <div className="flex items-center gap-1">
              <div className="flex items-center text-amber-400">
                <Star className="w-3 h-3 fill-amber-400" />
              </div>
              <span className="font-bold text-white tabular-nums text-xs">
                {avgRating.toFixed(1)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onViewReviews && onViewReviews(product)}
              className="text-stone-400 hover:text-cyan-400 transition-colors text-[10px] sm:text-[11px] flex items-center gap-1 cursor-pointer"
            >
              <MessageSquare className="w-3 h-3 text-cyan-400" />
              <span>{reviewsCount} {language === 'ar' ? 'تقييم' : 'reviews'}</span>
            </button>
          </div>

          {/* MULTI-SHAPE SWATCH BAR IN THE SAME LINE (عرض أشكال متعددة في نفس السطر) */}
          <div className="my-2 p-1.5 bg-stone-950/70 rounded-xl border border-stone-800/90">
            <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1 px-1">
              <span className="font-medium text-stone-300 flex items-center gap-1">
                <span>{language === 'ar' ? 'اختر الشكل والخامة في نفس السطر:' : 'Choose shape in same line:'}</span>
              </span>
              <span className="text-cyan-400 font-mono font-bold text-[9px]">
                {language === 'ar' ? currentShape.nameAr : currentShape.nameEn}
              </span>
            </div>

            {/* Shape Buttons in 1 Line */}
            <div className="grid grid-cols-4 gap-1">
              {shapeList.map((shape) => {
                const isSelected = selectedShapeId === shape.id;
                return (
                  <button
                    key={shape.id}
                    onClick={() => setSelectedShapeId(shape.id)}
                    className={`py-1 px-1 rounded-lg text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 border ${
                      isSelected
                        ? `${shape.highlightColor} border-current font-black scale-102 shadow-sm`
                        : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-white hover:bg-stone-800'
                    }`}
                    title={language === 'ar' ? `${shape.nameAr} - ${shape.badgeAr}` : shape.nameEn}
                  >
                    <span className="text-xs">{shape.icon}</span>
                    <span className="text-[9px] truncate max-w-full leading-tight">
                      {language === 'ar' ? shape.nameAr.split(' ')[0] : shape.nameEn.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compatible Devices Indicator */}
          {product.category === 'cases' && (
            <div className="my-1.5 px-2 py-1 rounded-lg bg-stone-950/80 border border-stone-800/80 text-[10px] text-stone-300 flex items-center justify-between">
              <span className="flex items-center gap-1 text-cyan-400 font-bold">
                <span>📱</span>
                <span>{language === 'ar' ? 'الموديلات المدعومة:' : 'Supported:'}</span>
              </span>
              <span className="text-amber-400 font-mono font-bold truncate max-w-[180px]">
                {language === 'ar' ? 'آبل · سامسونج · شاومي · بكسل (40+ موديل)' : 'Apple · Samsung · Xiaomi · Pixel'}
              </span>
            </div>
          )}

          {/* Description (Omitted in compact mode to preserve speed scan) */}
          {!isCompact && (
            <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-3">
              {productDesc}
            </p>
          )}

          {/* Customer Reviews Snippet */}
          {!isCompact && topReview && (
            <div
              onClick={() => onViewReviews && onViewReviews(product)}
              className="bg-stone-950/60 rounded-xl p-2.5 border border-stone-800/70 mb-3 cursor-pointer hover:border-cyan-500/40 transition-colors group/rev"
            >
              <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1">
                <span className="flex items-center gap-1 text-stone-300 font-semibold truncate">
                  <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                  {topReview.author}
                </span>
                <span className="text-[9px] text-stone-500 shrink-0">{topReview.date}</span>
              </div>
              <p className="text-[10px] text-stone-300 line-clamp-1 italic group-hover/rev:text-cyan-200 transition-colors">
                &ldquo;{topReview.comment}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Pricing & Dropship Profit Breakdown */}
        <div className="pt-2.5 border-t border-stone-800">
          
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-[10px] text-stone-400 block">{t.cardBasePrice}:</span>
              <span className="text-base sm:text-lg font-black text-white tabular-nums tracking-tight">
                {retailPrice} <span className="text-xs font-bold text-amber-400">{currencySymbol}</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Quick Share Button */}
              {onShareProduct && (
                <button
                  type="button"
                  onClick={() => onShareProduct(product)}
                  className="p-1.5 bg-stone-800 hover:bg-cyan-950/60 text-stone-400 hover:text-cyan-300 rounded-lg border border-stone-700 transition-colors cursor-pointer"
                  title="مشاركة سريعة عبر الواتساب والسوشيال"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Price Alert Bell */}
              {onPriceAlert && (
                <button
                  type="button"
                  onClick={() => onPriceAlert(product)}
                  className="p-1.5 bg-stone-800 hover:bg-red-950/60 text-stone-400 hover:text-red-300 rounded-lg border border-stone-700 transition-colors cursor-pointer"
                  title="تنبيه انخفاض السعر بالواتساب"
                >
                  <Bell className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Leather Simulator Button (for wallets or leather cases) */}
              {onSimulateLeather && product.category === 'wallets' && (
                <button
                  type="button"
                  onClick={() => onSimulateLeather(product)}
                  className="p-1.5 bg-stone-800 hover:bg-amber-950/60 text-stone-400 hover:text-amber-300 rounded-lg border border-stone-700 transition-colors cursor-pointer"
                  title="محاكي ألوان وعتامة الجلد"
                >
                  <Palette className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Compare Button */}
              {onToggleCompare && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleCompare(product);
                  }}
                  disabled={isCompareDisabled}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isSelectedForCompare
                      ? 'bg-cyan-500 text-stone-950 border-cyan-400 shadow-sm'
                      : isCompareDisabled
                      ? 'bg-stone-900 text-stone-600 border-stone-800 opacity-50 cursor-not-allowed'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-cyan-300 border-stone-700'
                  }`}
                  title={
                    isCompareDisabled
                      ? language === 'ar' ? 'الحد الأقصى 3 منتجات' : 'Max 3 products'
                      : isSelectedForCompare
                      ? language === 'ar' ? 'إلغاء المقارنة' : 'Remove compare'
                      : language === 'ar' ? 'مقارنة المواصفات' : 'Compare Specs'
                  }
                >
                  <Scale className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={handleCustomAction}
                className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg border border-stone-700 transition-colors flex items-center gap-1 cursor-pointer"
                title={language === 'ar' ? 'تخصيص بالاسم والشكل' : 'Customize shape & name'}
              >
                <Sliders className="w-3 h-3 text-cyan-400" />
                <span className="hidden sm:inline">{language === 'ar' ? 'تخصيص' : 'Customize'}</span>
              </button>

              <button
                onClick={handleQuickAddAction}
                className="px-2.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black rounded-lg transition-all flex items-center justify-center gap-1 shrink-0 shadow-md active:scale-95 cursor-pointer text-xs"
                aria-label={language === 'ar' ? 'إضافة سريعة للسلة' : 'Quick add to cart'}
                title={language === 'ar' ? 'إضافة سريعة للشكل المختار' : 'Quick add selected shape'}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'شراء' : 'Add'}</span>
              </button>
            </div>
          </div>

          {/* Transparent Dropship Merchant Margin */}
          {showDropshipMargins && !isCompact && (
            <div className="bg-stone-950/70 rounded-lg p-1.5 border border-stone-800/80 text-[10px] flex items-center justify-between text-stone-400">
              <span>
                {language === 'ar' ? 'المصنع:' : 'Cost:'} <strong className="text-stone-300 tabular-nums">{factoryCost} {currencySymbol}</strong>
              </span>
              <span className="text-emerald-400 font-semibold tabular-nums">
                {language === 'ar' ? 'ربحك:' : 'Profit:'} +{profitMargin.toFixed(0)} {currencySymbol} ({profitMarginPercent}%)
              </span>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
