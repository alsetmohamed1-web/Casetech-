import React, { useState } from 'react';
import {
  X,
  Palette,
  Sparkles,
  Sun,
  Moon,
  Clock,
  Layers,
  Check,
  Smartphone,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Flame,
  Award,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { OFFICIAL_CONTACT_INFO } from '../data/branding';
import { Currency } from '../types';
import { CURRENCIES } from '../data/products';

export interface LeatherColorSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStudio?: (type: 'case' | 'wallet', colorId?: string) => void;
  onAddToCart?: (itemType: 'case' | 'wallet', colorName: string, price: number) => void;
  onApplyToCustomizer?: (config?: any) => void;
  currency?: Currency;
  initialType?: 'wallet' | 'case';
}

export interface LeatherVariety {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  origin: string;
  baseHex: string;
  patinaTones: {
    day0: string; // brand new
    day30: string; // 1 month
    day180: string; // 6 months
    day730: string; // 2 years
  };
  grainTexture: 'smooth' | 'pebbled' | 'vintage_pull_up' | 'waxed_matte';
  recommendedFoil: 'gold' | 'silver' | 'blind';
}

export const LEATHER_VARIETIES: LeatherVariety[] = [
  {
    id: 'camel_cognac',
    nameAr: 'الجملي الكلاسيكي (Camel Cognac)',
    nameEn: 'Camel Cognac Veg-Tan',
    descriptionAr: 'جلد طبيعي مدبوغ نباتياً بالكامل (Full Grain Veg-Tan)، يكتسب مع الاستخدام عتامة كهرمانية دافئة ولمعاناً لا يقاوم.',
    origin: 'دباغة نباتية مصرية وإيطالية فاخرة',
    baseHex: '#B46B38',
    patinaTones: {
      day0: '#C67D4B',
      day30: '#B46B38',
      day180: '#945326',
      day730: '#6E3A18',
    },
    grainTexture: 'vintage_pull_up',
    recommendedFoil: 'gold',
  },
  {
    id: 'vintage_espresso',
    nameAr: 'بني إسبريسو معتق (Vintage Espresso)',
    nameEn: 'Vintage Espresso Brown',
    descriptionAr: 'لون القهوة المركزة مع مسامات طبيعية عميقة، يتحمل الاحتكاك والاستخدام الشاق لسنوات طويلة.',
    origin: 'جلد بقري حبّة كاملة مدبوغ بمستخلصات لحاء الشجر',
    baseHex: '#4A2E1B',
    patinaTones: {
      day0: '#5C3A24',
      day30: '#4A2E1B',
      day180: '#382112',
      day730: '#26150A',
    },
    grainTexture: 'pebbled',
    recommendedFoil: 'gold',
  },
  {
    id: 'obsidian_black',
    nameAr: 'أسود أوبسيديان ملكي (Obsidian Black)',
    nameEn: 'Obsidian Matte Black',
    descriptionAr: 'أسود مطفي فاحم ومهيب، لا يعكس الضوء بشكل مزعج ومقاوم لزيوت اليد والماء والأوساخ.',
    origin: 'جلد عالي الكثافة مع لمسة نهائية غير لامعة',
    baseHex: '#18181B',
    patinaTones: {
      day0: '#27272A',
      day30: '#18181B',
      day180: '#121214',
      day730: '#09090B',
    },
    grainTexture: 'waxed_matte',
    recommendedFoil: 'silver',
  },
  {
    id: 'burgundy_wine',
    nameAr: 'عنابي بوردو ياقوتي (Burgundy Bordeaux)',
    nameEn: 'Burgundy Bordeaux Wine',
    descriptionAr: 'نبيذي أحمر عميق مستوحى من ألوان القصور الملكية القديمة، يضفي هيبة استثنائية لأصحاب الذوق الرفيع.',
    origin: 'دباغة يدوية بأصباغ نباتية حمراء طبيعية',
    baseHex: '#581825',
    patinaTones: {
      day0: '#732232',
      day30: '#581825',
      day180: '#45111C',
      day730: '#2E0911',
    },
    grainTexture: 'smooth',
    recommendedFoil: 'gold',
  },
  {
    id: 'emerald_forest',
    nameAr: 'أخضر إمبراطوري (Imperial Forest Green)',
    nameEn: 'Imperial Forest Green',
    descriptionAr: 'درجة زمردية داكنة ونادرة في إكسسوارات الهواتف، تمتزج بشكل ساحر مع الحفر المذهب عيار 24.',
    origin: 'جلد فاخر مشمع بمزيج زيوت حماية طبيعية',
    baseHex: '#143828',
    patinaTones: {
      day0: '#1D4F39',
      day30: '#143828',
      day180: '#0F2B1E',
      day730: '#091A12',
    },
    grainTexture: 'smooth',
    recommendedFoil: 'gold',
  },
  {
    id: 'navy_sovereign',
    nameAr: 'كحلي سيادي (Sovereign Navy)',
    nameEn: 'Sovereign Sovereign Navy Blue',
    descriptionAr: 'أزرق داكن رسمي يعكس الانضباط والأناقة المؤسسية، مثالي لرجال الأعمال والمهندسين.',
    origin: 'طبقة علوية مشدودة ومصقولة يدوياً بالحجر',
    baseHex: '#172554',
    patinaTones: {
      day0: '#1E3A8A',
      day30: '#172554',
      day180: '#111C40',
      day730: '#0B1126',
    },
    grainTexture: 'pebbled',
    recommendedFoil: 'silver',
  },
];

export const STITCHING_THREADS = [
  { id: 'waxed_gold', nameAr: 'خيط ذهبي شمعي (Amber Waxed)', hex: '#D97706', descriptionAr: 'خياطة بارزة مشدودة يدوياً' },
  { id: 'contrasting_cream', nameAr: 'كريمي عاجي متباين (Ivory Stitch)', hex: '#FEF3C7', descriptionAr: 'طابع إيطالي كلاسيكي مميز' },
  { id: 'stealth_black', nameAr: 'أسود متخفي (Stealth Black)', hex: '#27272A', descriptionAr: 'أناقة مينيماليست موحدة' },
  { id: 'crimson_red', nameAr: 'أحمر ياقوتي (Crimson)', hex: '#DC2626', descriptionAr: 'لمسة سبورت وتحدٍ لافتة' },
];

export const FOIL_OPTIONS = [
  { id: 'gold_24k', nameAr: 'ذهب عيار 24K بارز 3D', hex: '#EAB308', glow: 'rgba(234, 179, 8, 0.4)' },
  { id: 'silver_925', nameAr: 'فضة ملكية 925 عاكسة', hex: '#E2E8F0', glow: 'rgba(226, 232, 240, 0.4)' },
  { id: 'blind_deboss', nameAr: 'حفر غائر بدون لون (Blind Deboss)', hex: '#1C1917', glow: 'none' },
  { id: 'neon_cyan', nameAr: 'سيان تكنولوجي نيون', hex: '#06B6D4', glow: 'rgba(6, 182, 212, 0.4)' },
];

export const LeatherColorSimulatorModal: React.FC<LeatherColorSimulatorModalProps> = ({
  isOpen,
  onClose,
  onOpenStudio,
  onAddToCart,
  onApplyToCustomizer,
  currency = 'EGP',
  initialType = 'wallet',
}) => {
  const { language, isRtl } = useLanguage();
  const [productType, setProductType] = useState<'wallet' | 'case'>(initialType);
  const [selectedLeather, setSelectedLeather] = useState<LeatherVariety>(LEATHER_VARIETIES[0]);
  const [patinaStage, setPatinaStage] = useState<'day0' | 'day30' | 'day180' | 'day730'>('day30');
  const [selectedThread, setSelectedThread] = useState(STITCHING_THREADS[0]);
  const [selectedFoil, setSelectedFoil] = useState(FOIL_OPTIONS[0]);
  const [lightingMode, setLightingMode] = useState<'studio' | 'sunset' | 'office'>('studio');
  const [customInitials, setCustomInitials] = useState<string>('محمد الخالد');

  if (!isOpen) return null;

  const currencyConfig = CURRENCIES[currency] || CURRENCIES.EGP;
  const basePriceEGP = productType === 'wallet' ? 245 : 290;
  const convertedPrice = (basePriceEGP * currencyConfig.rateFromUSD * (currency === 'EGP' ? 1 : 0.02)).toFixed(0);

  const activeColorHex = selectedLeather.patinaTones[patinaStage];

  // Dynamic Lighting overlay styles
  const getLightingStyles = () => {
    switch (lightingMode) {
      case 'sunset':
        return 'from-amber-500/20 via-transparent to-orange-950/40 shadow-amber-900/40';
      case 'office':
        return 'from-blue-500/15 via-transparent to-stone-950/60 shadow-blue-950/40';
      case 'studio':
      default:
        return 'from-white/15 via-transparent to-black/60 shadow-black/60';
    }
  };

  const handleApplyToStudio = () => {
    onClose();
    if (onOpenStudio) {
      onOpenStudio(productType, selectedLeather.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden text-stone-100 flex flex-col my-4 max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 bg-gradient-to-r from-stone-950 via-amber-950/40 to-stone-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/20">
              <Palette className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  محاكي ألوان وعتامة الجلد الطبيعي الحي (3D Patina Simulator)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                  جلد طبيعي 100%
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white">
                محاكي الخامات وتأثير الزمن على دباغة الجلد والحفر المذهب
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            title="إغلاق المحاكي"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Type Switcher Bar */}
        <div className="bg-stone-950/90 border-b border-stone-800 px-6 py-2.5 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-bold">نوع القطعة المراد محاكاتها:</span>
            <div className="flex bg-stone-900 p-1 rounded-xl border border-stone-800 text-xs font-bold">
              <button
                onClick={() => setProductType('wallet')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  productType === 'wallet'
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                محفظة جلد طبيعي أصلية
              </button>
              <button
                onClick={() => setProductType('case')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  productType === 'case'
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                كفر هاتف بظهر جلد طبيعي
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-400">إضاءة المعاينة:</span>
            <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-lg border border-stone-800">
              <button
                onClick={() => setLightingMode('studio')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${lightingMode === 'studio' ? 'bg-stone-700 text-white' : 'text-stone-400'}`}
              >
                استوديو 💡
              </button>
              <button
                onClick={() => setLightingMode('sunset')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${lightingMode === 'sunset' ? 'bg-amber-600 text-white' : 'text-stone-400'}`}
              >
                غروب 🌅
              </button>
              <button
                onClick={() => setLightingMode('office')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${lightingMode === 'office' ? 'bg-blue-600 text-white' : 'text-stone-400'}`}
              >
                مكتب 🏢
              </button>
            </div>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Visual 3D Leather Card Mockup */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* The Leather Canvas / Preview */}
            <div className={`relative w-full aspect-[4/3] rounded-3xl p-6 overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-500 border border-stone-800 ${getLightingStyles()}`}
              style={{
                backgroundColor: activeColorHex,
                backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.12) 0%, transparent 60%), linear-gradient(135deg, rgba(0,0,0,0.2) 0%, transparent 80%)`,
              }}
            >
              {/* Natural Grain & Microtexture Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
                style={{
                  backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                  backgroundSize: selectedLeather.grainTexture === 'pebbled' ? '5px 5px' : '3px 3px',
                }}
              />

              {/* Hand-Stitched Perimeter (خياطة يدوية دقيقة) */}
              <div 
                className="absolute inset-3 rounded-2xl pointer-events-none border-2 border-dashed transition-colors duration-300"
                style={{ borderColor: selectedThread.hex }}
              />

              {/* Top Branding Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                  <span>{selectedLeather.nameAr}</span>
                  <span className="text-[10px] text-amber-300">({selectedLeather.origin})</span>
                </div>

                <div className="px-2.5 py-1 rounded-full bg-black/50 text-[11px] font-mono font-bold text-amber-300 border border-amber-500/30">
                  {patinaStage === 'day0' && 'اليوم الأول (جديد تماماً)'}
                  {patinaStage === 'day30' && 'بعد شهر (بداية النعومة)'}
                  {patinaStage === 'day180' && 'بعد 6 أشهر (عتامة غنية)'}
                  {patinaStage === 'day730' && 'بعد سنتين (تحفة معتقة)'}
                </div>
              </div>

              {/* Center Stamped Calligraphy / Name with Foil */}
              <div className="relative z-10 text-center my-auto py-4">
                <div 
                  className="font-calligraphy text-2xl sm:text-3xl font-extrabold tracking-wide transition-all"
                  style={{
                    color: selectedFoil.hex,
                    textShadow: selectedFoil.glow !== 'none' ? `0 0 15px ${selectedFoil.glow}, 0 2px 4px rgba(0,0,0,0.8)` : '0 2px 4px rgba(0,0,0,0.9)',
                  }}
                >
                  {customInitials || 'محمد الخالد'}
                </div>
                <div className="text-[11px] font-serif tracking-widest text-white/70 uppercase mt-1">
                  CASETECH CRAFTSMANSHIP · EST. 2024
                </div>
              </div>

              {/* Bottom Details Bar on Preview */}
              <div className="relative z-10 flex items-center justify-between text-[11px] text-white/80 bg-black/40 p-2.5 rounded-xl backdrop-blur-md border border-white/10">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  خياطة شمعية ألمانية مانعة للتمزق
                </span>
                <span className="font-mono text-amber-400 font-bold">
                  {basePriceEGP} ج.م
                </span>
              </div>
            </div>

            {/* Patina Age Slider Control */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Clock className="w-4 h-4" />
                  <span>محاكاة عمر الجلد ودرجة العتامة الطبيعية (Patina Evolution):</span>
                </span>
                <span className="text-stone-400 font-mono text-[11px]">
                  كلما زاد الاستخدام ازداد الجلد جمالاً
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 pt-1">
                {(['day0', 'day30', 'day180', 'day730'] as const).map((stage) => {
                  const labels = {
                    day0: '0 يوم (جديد)',
                    day30: 'شهر واحد',
                    day180: '6 أشهر',
                    day730: 'سنتان 🌟',
                  };
                  return (
                    <button
                      key={stage}
                      onClick={() => setPatinaStage(stage)}
                      className={`py-2 px-2 rounded-xl text-center text-xs font-bold transition-all border ${
                        patinaStage === stage
                          ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md scale-102'
                          : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
                      }`}
                    >
                      <div className="text-[11px]">{labels[stage]}</div>
                      <div 
                        className="w-4 h-4 rounded-full mx-auto mt-1 border border-black/40"
                        style={{ backgroundColor: selectedLeather.patinaTones[stage] }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Customization & Leather Palette Selection */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* 1. Leather Color Selection Grid */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-stone-300 block">
                1. اختر نوع ولون الجلد الطبيعي:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {LEATHER_VARIETIES.map((variety) => {
                  const isSelected = variety.id === selectedLeather.id;
                  return (
                    <button
                      key={variety.id}
                      onClick={() => setSelectedLeather(variety)}
                      className={`p-3 rounded-2xl border text-start transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-950/30 text-white shadow-md ring-1 ring-amber-500/50'
                          : 'border-stone-800 bg-stone-950 hover:border-stone-700 text-stone-300'
                      }`}
                    >
                      <div 
                        className="w-7 h-7 rounded-full shrink-0 border-2 border-stone-600 shadow mt-0.5"
                        style={{ backgroundColor: variety.baseHex }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold truncate flex items-center justify-between">
                          <span>{variety.nameAr}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                        </div>
                        <p className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">
                          {variety.origin}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Stitching Thread Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-300 block">
                2. لون خيط الخياطة الشمعية الألمانية:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {STITCHING_THREADS.map((thread) => {
                  const isSelected = thread.id === selectedThread.id;
                  return (
                    <button
                      key={thread.id}
                      onClick={() => setSelectedThread(thread)}
                      className={`p-2.5 rounded-xl border text-start transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'border-amber-500 bg-stone-850 text-white'
                          : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-white'
                      }`}
                    >
                      <span 
                        className="w-4 h-4 rounded-full border border-stone-600 shrink-0"
                        style={{ backgroundColor: thread.hex }}
                      />
                      <span className="text-xs font-bold truncate">{thread.nameAr}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Hot Foil / Deboss Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-300 block">
                3. نوع الحفر والدمغ الحراري (Foil & Deboss):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {FOIL_OPTIONS.map((foil) => {
                  const isSelected = foil.id === selectedFoil.id;
                  return (
                    <button
                      key={foil.id}
                      onClick={() => setSelectedFoil(foil)}
                      className={`p-2.5 rounded-xl border text-start transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'border-amber-500 bg-stone-850 text-white'
                          : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-white'
                      }`}
                    >
                      <span 
                        className="w-4 h-4 rounded-full border border-stone-600 shrink-0"
                        style={{ backgroundColor: foil.hex }}
                      />
                      <span className="text-xs font-bold truncate">{foil.nameAr}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Text Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-300 block">
                4. الاسم أو الحروف المراد حفرها على الجلد:
              </label>
              <input
                type="text"
                value={customInitials}
                onChange={(e) => setCustomInitials(e.target.value)}
                placeholder="اكتب اسمك هنا..."
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Actions Bar */}
            <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-stone-400 block">إجمالي السعر مع الحفر والمعاينة:</span>
                <span className="text-base font-black text-amber-400">
                  {basePriceEGP} {language === 'ar' ? 'ج.م فقط' : 'EGP'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleApplyToStudio}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>تطبيق هذا اللون في استوديو التخصيص ✏️</span>
                </button>

                <a
                  href={`https://wa.me/${OFFICIAL_CONTACT_INFO.whatsapp}?text=${encodeURIComponent(`السلام عليكم، عايز استفسر عن طلب محفظة/كفر بجلد: ${selectedLeather.nameAr} مع خيط ${selectedThread.nameAr}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <span>واتساب 💬</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ضمان استرجاع وفحص الجلد الطبيعي مع مندوب بوسطة قبل سداد أي مبلغ</span>
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
