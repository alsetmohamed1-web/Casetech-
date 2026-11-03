import React, { useState, useMemo } from 'react';
import { X, Check, RefreshCw, Upload, Eye, Search, Smartphone, Sparkles, Filter } from 'lucide-react';
import { CustomizationState, PhoneModel, Currency, CaseFinish, FoilType, FontStyle, PhoneBrand } from '../types';
import { PHONE_MODELS, LEATHER_COLORS, CASE_COLORS, PATTERNS, PRODUCTS, CURRENCIES } from '../data/products';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (customization: CustomizationState, quantity: number) => void;
  currency: Currency;
  initialType?: 'case' | 'wallet';
  initialProductId?: string;
  initialUploadedImageUrl?: string;
  onOpenAiStudio?: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  currency,
  initialType = 'case',
  initialProductId,
  initialUploadedImageUrl,
  onOpenAiStudio,
}) => {
  if (!isOpen) return null;

  const currencyConfig = CURRENCIES[currency] || CURRENCIES.USD;

  // Selected item type
  const [itemType, setItemType] = useState<'case' | 'wallet'>(initialType);

  // Phone brand & model selection state
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('all');
  const [phoneSearchQuery, setPhoneSearchQuery] = useState<string>('');
  const [selectedPhone, setSelectedPhone] = useState<PhoneModel>(PHONE_MODELS[0]);
  const [caseFinish, setCaseFinish] = useState<CaseFinish>('tough');
  const [caseColor, setCaseColor] = useState<string>(CASE_COLORS[0].hex);

  // 3D & Lifestyle Environment State (Competitor-beating visual showcase)
  const [angleView, setAngleView] = useState<'flat' | '3d-angle' | 'isometric'>('3d-angle');
  const [lifestyleEnv, setLifestyleEnv] = useState<'studio' | 'gaming-rgb' | 'luxury-office' | 'cafe-streetwear'>('studio');

  // Leather wallet state
  const [leatherColor, setLeatherColor] = useState<string>(LEATHER_COLORS[0].id);
  const [walletType, setWalletType] = useState<'bifold' | 'cardholder'>('bifold');

  // Customization elements
  const [customText, setCustomText] = useState<string>('محمد الخالد');
  const [fontStyle, setFontStyle] = useState<FontStyle>('diwani');
  const [foilType, setFoilType] = useState<FoilType>('gold');
  const [position, setPosition] = useState<'bottom-right' | 'center' | 'bottom-center' | 'spine'>('center');
  const [fontSize, setFontSize] = useState<number>(26);
  const [patternId, setPatternId] = useState<string>('islamic-geo');
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(initialUploadedImageUrl || null);

  React.useEffect(() => {
    if (initialUploadedImageUrl) {
      setUploadedLogo(initialUploadedImageUrl);
    }
  }, [initialUploadedImageUrl]);

  // Base pricing
  const baseProduct = PRODUCTS.find((p) =>
    itemType === 'case' ? p.category === 'cases' : p.category === 'wallets'
  ) || PRODUCTS[0];

  const customizationCost = foilType === 'gold' || foilType === 'silver' ? 3.0 : 0;
  const totalPriceUSD = baseProduct.price + customizationCost;
  const formattedPrice = (totalPriceUSD * currencyConfig.rateFromUSD).toFixed(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedLogo(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveToCart = () => {
    const customization: CustomizationState = {
      itemType,
      productId: initialProductId || baseProduct.id,
      phoneModelId: itemType === 'case' ? selectedPhone.id : undefined,
      caseFinish: itemType === 'case' ? caseFinish : undefined,
      caseBaseColor: itemType === 'case' ? caseColor : undefined,
      leatherColorId: itemType === 'wallet' ? leatherColor : undefined,
      customText: customText.trim(),
      fontStyle,
      foilType,
      position,
      fontSize,
      patternId: patternId !== 'none' ? patternId : undefined,
      uploadedImageUrl: uploadedLogo || undefined,
    };

    onAddToCart(customization, 1);
    onClose();
  };

  // Font family helper
  const getFontFamilyClass = (style: FontStyle) => {
    switch (style) {
      case 'diwani':
        return 'font-calligraphy';
      case 'ruqaa':
        return 'font-ruqaa';
      case 'thuluth':
        return 'font-calligraphy';
      case 'kufic':
        return 'font-bold';
      case 'serif':
        return 'font-serif';
      case 'sans':
      default:
        return 'font-latin font-bold';
    }
  };

  // Foil styling helper
  const getFoilStyles = () => {
    switch (foilType) {
      case 'gold':
        return {
          background: 'linear-gradient(135deg, #fef08a 0%, #ca8a04 40%, #eab308 70%, #fef9c3 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6)) drop-shadow(0 0 6px rgba(234,179,8,0.4))',
        };
      case 'silver':
        return {
          background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 40%, #cbd5e1 70%, #ffffff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6)) drop-shadow(0 0 5px rgba(255,255,255,0.4))',
        };
      case 'blind':
        return {
          color: 'rgba(0, 0, 0, 0.45)',
          textShadow: '0 1px 1px rgba(255,255,255,0.15), 0 -1px 1px rgba(0,0,0,0.7)',
        };
      case 'white':
        return {
          color: '#ffffff',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))',
        };
      case 'black':
        return {
          color: '#0f172a',
          filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.2))',
        };
      case 'neon-green':
        return {
          color: '#22c55e',
          textShadow: '0 0 10px #22c55e, 0 0 20px #16a34a, 0 0 35px #15803d',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))',
        };
      case 'cyber-pink':
        return {
          color: '#f43f5e',
          textShadow: '0 0 10px #f43f5e, 0 0 20px #e11d48, 0 0 35px #be123c',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))',
        };
    }
  };

  const activeLeather = LEATHER_COLORS.find((l) => l.id === leatherColor) || LEATHER_COLORS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-auto text-stone-100 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/70">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold">
              ★
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                استوديو التخصيص والمحاكاة الحية
              </h2>
              <p className="text-xs text-stone-400">
                صمم قطعتك المخصصة وعاين المظهر النهائي قبل الإرسال الفوري للمصنع
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2 Columns (Preview Canvas + Controls) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          
          {/* Left Canvas: Live Realistic Mockup Visualizer with 3D & Lifestyle */}
          <div className={`lg:col-span-6 p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-l transition-all duration-500 relative ${
            lifestyleEnv === 'gaming-rgb'
              ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-950 via-stone-950 to-cyan-950 border-fuchsia-900/30'
              : lifestyleEnv === 'luxury-office'
              ? 'bg-gradient-to-b from-stone-950 via-stone-900 to-amber-950/20 border-amber-900/30'
              : lifestyleEnv === 'cafe-streetwear'
              ? 'bg-gradient-to-br from-stone-950 via-stone-900 to-orange-950/25 border-orange-900/20'
              : 'bg-gradient-to-b from-stone-950 to-stone-900 border-stone-800'
          }`}>
            
            {/* Top Switcher for Product Type */}
            <div className="w-full max-w-xs mb-3 flex p-1 bg-stone-900/90 border border-stone-800 rounded-xl">
              <button
                onClick={() => setItemType('case')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  itemType === 'case'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                كفر هاتف ذكي
              </button>
              <button
                onClick={() => setItemType('wallet')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  itemType === 'wallet'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                محفظة جلد طبيعي
              </button>
            </div>

            {/* 3D & Lifestyle Environment Selectors */}
            <div className="w-full max-w-sm mb-4 space-y-1.5">
              {/* Angle View Selector */}
              <div className="flex items-center justify-between gap-1 p-1 bg-stone-900/90 rounded-xl border border-stone-800 text-[11px] font-semibold">
                <span className="text-stone-400 px-2 shrink-0">الزاوية:</span>
                {[
                  { id: '3d-angle', label: '🔄 3D مجسم مائل' },
                  { id: 'flat', label: '📱 مسطح مباشر' },
                  { id: 'isometric', label: '📐 إمالة الكاميرا' },
                ].map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAngleView(a.id as any)}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      angleView === a.id ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>

              {/* Lifestyle Environment Selector */}
              <div className="flex items-center justify-between gap-1 p-1 bg-stone-900/90 rounded-xl border border-stone-800 text-[10px] font-semibold overflow-x-auto">
                <span className="text-stone-400 px-1.5 shrink-0">البيئة:</span>
                {[
                  { id: 'studio', label: '📸 استوديو فاخر' },
                  { id: 'gaming-rgb', label: '🎮 سيت أب جيمنج' },
                  { id: 'luxury-office', label: '💼 مكتب رخام' },
                  { id: 'cafe-streetwear', label: '☕ كافيه وستريت' },
                ].map((env) => (
                  <button
                    key={env.id}
                    onClick={() => setLifestyleEnv(env.id as any)}
                    className={`px-2 py-1 rounded-lg transition-colors shrink-0 ${
                      lifestyleEnv === env.id ? 'bg-emerald-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {env.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Phone / Wallet Rendering Area */}
            <div className="relative w-64 h-[440px] flex items-center justify-center">
              
              {itemType === 'case' ? (
                /* SMARTPHONE CASE LIVE MOCKUP */
                <div
                  className="relative w-56 h-[400px] rounded-[42px] p-2.5 transition-all duration-300 shadow-2xl border-[3px]"
                  style={{
                    backgroundColor: caseColor,
                    borderColor: caseFinish === 'tough' ? '#475569' : '#334155',
                    boxShadow:
                      lifestyleEnv === 'gaming-rgb'
                        ? '0 25px 50px -10px rgba(217, 70, 239, 0.4), 0 0 35px rgba(6, 182, 212, 0.3), inset 0 0 12px rgba(0,0,0,0.5)'
                        : '0 25px 50px -12px rgba(0, 0, 0, 0.75), inset 0 0 12px rgba(0,0,0,0.4)',
                    transform:
                      angleView === '3d-angle'
                        ? 'perspective(1000px) rotateY(-18deg) rotateX(10deg)'
                        : angleView === 'isometric'
                        ? 'perspective(1000px) rotateY(16deg) rotateX(-12deg)'
                        : 'none',
                    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease',
                  }}
                >
                  {/* Outer edge bumper highlight */}
                  <div className="absolute inset-0 rounded-[40px] border border-white/10 pointer-events-none"></div>

                  {/* Camera module cutout */}
                  <div className="absolute top-3.5 left-3.5 z-20">
                    {/* iPhone Pro (3 lenses + flash) */}
                    {selectedPhone.cameraLayout === 'iphone-pro' && (
                      <div className="w-18 h-20 bg-stone-950/95 rounded-[22px] p-1.5 border border-stone-700/80 shadow-xl flex flex-col justify-between">
                        <div className="flex justify-between">
                          <div className="w-5.5 h-5.5 rounded-full bg-stone-900 border-2 border-stone-600 shadow-inner flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-900/80 ring-1 ring-cyan-400/50"></div>
                          </div>
                          <div className="w-5.5 h-5.5 rounded-full bg-stone-900 border-2 border-stone-600 shadow-inner flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-900/80 ring-1 ring-cyan-400/50"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="w-5.5 h-5.5 rounded-full bg-stone-900 border-2 border-stone-600 shadow-inner flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-900/80 ring-1 ring-cyan-400/50"></div>
                          </div>
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-100/90 shadow-sm"></div>
                        </div>
                      </div>
                    )}

                    {/* iPhone Base (2 diagonal/vertical lenses) */}
                    {selectedPhone.cameraLayout === 'iphone-base' && (
                      <div className="w-10 h-19 bg-stone-950/95 rounded-2xl p-1.5 border border-stone-700/80 shadow-xl flex flex-col justify-between items-center">
                        <div className="w-5.5 h-5.5 rounded-full bg-stone-900 border-2 border-stone-600 shadow-inner flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-blue-900/80 ring-1 ring-cyan-400/50"></div>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-200"></div>
                        <div className="w-5.5 h-5.5 rounded-full bg-stone-900 border-2 border-stone-600 shadow-inner flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-blue-900/80 ring-1 ring-cyan-400/50"></div>
                        </div>
                      </div>
                    )}

                    {/* Samsung Vertical (S26, S25, S24, A55, Reno) */}
                    {selectedPhone.cameraLayout === 'samsung-vertical' && (
                      <div className="w-9 flex flex-col gap-1.5 p-1 bg-stone-950/40 rounded-2xl border border-stone-800/40 backdrop-blur-xs">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-6.5 h-6.5 rounded-full bg-stone-950 border-2 border-stone-600 shadow-md flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-950 ring-1 ring-cyan-400/60"></div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Samsung Fold / Flip */}
                    {selectedPhone.cameraLayout === 'samsung-fold' && (
                      <div className="w-8 flex flex-col gap-1.5 p-1 bg-stone-950/90 rounded-2xl border border-stone-700 shadow-lg">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-5.5 h-5.5 rounded-full bg-stone-900 border border-stone-600 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-cyan-500/80"></div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Google Pixel Visor */}
                    {selectedPhone.cameraLayout === 'pixel-visor' && (
                      <div className="w-48 -ml-1.5 h-9 bg-stone-950 rounded-xl border border-stone-700 shadow-lg flex items-center px-4 gap-3">
                        <div className="w-5 h-5 rounded-full bg-stone-900 border border-stone-600 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-stone-900 border border-stone-600 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-amber-300 ml-auto shadow-[0_0_6px_#fde047]"></div>
                      </div>
                    )}

                    {/* Xiaomi & Honor Circular Module (Leica / Falcon Ring) */}
                    {selectedPhone.cameraLayout === 'xiaomi-circle' && (
                      <div className="w-22 h-22 -mt-1 ml-10 bg-stone-950 rounded-full border-2 border-amber-500/70 p-1.5 shadow-2xl flex items-center justify-center relative">
                        <div className="w-full h-full rounded-full border border-stone-700 bg-stone-900/90 flex flex-wrap items-center justify-center gap-1.5 p-1">
                          <div className="w-4 h-4 rounded-full bg-stone-950 border border-stone-600 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-cyan-400/80"></div>
                          </div>
                          <div className="w-4 h-4 rounded-full bg-stone-950 border border-stone-600 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-cyan-400/80"></div>
                          </div>
                          <div className="w-4 h-4 rounded-full bg-stone-950 border border-stone-600 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-cyan-400/80"></div>
                          </div>
                          <div className="w-4 h-4 rounded-full bg-stone-950 border border-stone-600 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-cyan-400/80"></div>
                          </div>
                        </div>
                        <span className="absolute text-[7px] text-amber-400 font-mono font-bold tracking-tighter">LEICA</span>
                      </div>
                    )}

                    {/* OnePlus Corner Circle Module */}
                    {selectedPhone.cameraLayout === 'oneplus-corner-circle' && (
                      <div className="w-18 h-18 -ml-3 bg-stone-950 rounded-full border-2 border-stone-700 p-1 shadow-2xl flex items-center justify-center relative">
                        <div className="w-full h-full rounded-full bg-stone-900 flex flex-wrap items-center justify-center gap-1 p-1">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-4 h-4 rounded-full bg-stone-950 border border-stone-600 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Huawei Triangular Sculpted Module (Pura 70) */}
                    {selectedPhone.cameraLayout === 'huawei-triangular' && (
                      <div className="w-16 h-18 bg-stone-950/95 rounded-[20px] p-2 border-2 border-amber-500/40 shadow-xl flex flex-col justify-between items-center">
                        <div className="w-7 h-7 rounded-full bg-stone-900 border-2 border-amber-400 flex items-center justify-center shadow-md">
                          <div className="w-3.5 h-3.5 rounded-full bg-cyan-900 ring-1 ring-cyan-400"></div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-4 h-4 rounded-full bg-stone-900 border border-stone-600"></div>
                          <div className="w-4 h-4 rounded-full bg-stone-900 border border-stone-600"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* MagSafe Ring Option */}
                  {caseFinish === 'magsafe' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-28 h-28 rounded-full border-2 border-white/25 flex flex-col items-center justify-end">
                        <div className="w-1.5 h-6 bg-white/25 rounded-full mb-2"></div>
                      </div>
                    </div>
                  )}

                  {/* Decorative Pattern Background */}
                  {patternId === 'islamic-geo' && (
                    <div className="absolute inset-x-4 bottom-6 top-28 opacity-15 pointer-events-none flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-white">
                        <path d="M50 0 L61 38 L100 38 L68 61 L80 100 L50 76 L20 100 L32 61 L0 38 L39 38 Z" />
                      </svg>
                    </div>
                  )}

                  {patternId === 'falcon' && (
                    <div className="absolute inset-x-8 bottom-12 top-32 opacity-20 pointer-events-none flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-28 h-28 stroke-current text-amber-300 fill-none" strokeWidth="1">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                  )}

                  {/* Uploaded User Logo / Artwork */}
                  {uploadedLogo && (
                    <div className="absolute inset-x-0 bottom-24 flex justify-center z-10 pointer-events-none">
                      <img src={uploadedLogo} alt="Artwork" className="max-w-[90px] max-h-[90px] object-contain drop-shadow-md" />
                    </div>
                  )}

                  {/* Custom Engraved/Printed Text */}
                  {customText.trim() && (
                    <div
                      className={`absolute inset-x-3 z-20 flex px-2 text-center transition-all ${
                        position === 'center'
                          ? 'top-1/2 -translate-y-1/2 justify-center'
                          : position === 'bottom-right'
                          ? 'bottom-8 justify-end'
                          : position === 'spine'
                          ? 'top-1/2 -translate-y-1/2 -rotate-90 justify-center'
                          : 'bottom-8 justify-center'
                      }`}
                    >
                      <span
                        className={`${getFontFamilyClass(fontStyle)} transition-all tracking-wide`}
                        style={{
                          fontSize: `${fontSize}px`,
                          ...getFoilStyles(),
                        }}
                      >
                        {customText}
                      </span>
                    </div>
                  )}

                  {/* Subtle lower brand mark */}
                  <div className="absolute bottom-2 inset-x-0 text-center">
                    <span className="text-[8px] font-latin tracking-widest text-white/30 uppercase">
                      NAQSH PRINT STUDIO
                    </span>
                  </div>
                </div>
              ) : (
                /* LEATHER WALLET LIVE MOCKUP */
                <div
                  className="relative w-64 h-72 rounded-2xl p-4 transition-all duration-300 shadow-2xl border border-stone-800"
                  style={{
                    backgroundColor: activeLeather.hex,
                    boxShadow: '0 25px 45px -10px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(0,0,0,0.5)',
                    transform:
                      angleView === '3d-angle'
                        ? 'perspective(1000px) rotateY(-18deg) rotateX(10deg)'
                        : angleView === 'isometric'
                        ? 'perspective(1000px) rotateY(16deg) rotateX(-12deg)'
                        : 'none',
                    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease',
                  }}
                >
                  {/* Perimeter Realistic Hand-Stitching */}
                  <div
                    className="absolute inset-2 rounded-xl border border-dashed pointer-events-none opacity-80"
                    style={{ borderColor: activeLeather.stitchHex }}
                  ></div>

                  {/* Wallet Fold or Card Slots Accent */}
                  {walletType === 'bifold' ? (
                    <div className="absolute inset-y-0 right-1/2 w-[1px] bg-black/40 shadow-[0_0_8px_rgba(0,0,0,0.6)]"></div>
                  ) : (
                    <div className="absolute top-4 inset-x-5 space-y-2 pointer-events-none opacity-40">
                      <div className="h-4 border-b border-black/50"></div>
                      <div className="h-4 border-b border-black/50"></div>
                      <div className="h-4 border-b border-black/50"></div>
                    </div>
                  )}

                  {/* Uploaded User Logo / Artwork */}
                  {uploadedLogo && (
                    <div className="absolute inset-x-0 top-16 flex justify-center z-10 pointer-events-none">
                      <img src={uploadedLogo} alt="Debossed Logo" className="max-w-[70px] max-h-[70px] object-contain opacity-70 filter brightness-90" />
                    </div>
                  )}

                  {/* Personalized Monogram / Text Debossing */}
                  {customText.trim() && (
                    <div
                      className={`absolute z-20 flex px-4 transition-all ${
                        position === 'center'
                          ? 'inset-x-0 top-1/2 -translate-y-1/2 justify-center'
                          : position === 'bottom-right'
                          ? 'bottom-6 right-6 justify-end'
                          : position === 'spine'
                          ? 'left-6 top-1/2 -translate-y-1/2 justify-start'
                          : 'bottom-6 inset-x-0 justify-center'
                      }`}
                    >
                      <span
                        className={`${getFontFamilyClass(fontStyle)} transition-all tracking-wider`}
                        style={{
                          fontSize: `${fontSize}px`,
                          ...getFoilStyles(),
                        }}
                      >
                        {customText}
                      </span>
                    </div>
                  )}

                  {/* Stamp of Origin */}
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[8px] font-latin tracking-widest text-white/30 uppercase">
                      GENUINE FULL-GRAIN LEATHER
                    </span>
                  </div>
                </div>
              )}

            </div>

            {/* Spec details tag below canvas */}
            <div className="mt-4 flex items-center gap-3 text-xs text-stone-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <Eye className="w-3.5 h-3.5" />
                معاينة حية للمنتج المطبوع
              </span>
              <span aria-hidden="true">·</span>
              <span>دقة طباعة ليزرية 1200 DPI</span>
            </div>

          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-6 p-6 space-y-6 overflow-y-auto">
            
            {/* 1. Phone Model or Leather Color Selection */}
            {itemType === 'case' ? (
              <div className="space-y-4">
                {/* Brand & Model Cascading Dropdown Selectors */}
                <div className="space-y-3 p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-white flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-cyan-400" />
                      <span>تحديد الموديل حسب العلامة التجارية (Phone Model):</span>
                    </label>
                    <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      40+ موديل مدعوم
                    </span>
                  </div>

                  {/* 1. Brand Selection Dropdown (قائمة منسدلة لاختيار الماركة) */}
                  <div className="space-y-1">
                    <span className="text-[11px] text-stone-400 font-semibold block">
                      1. اختر العلامة التجارية (Brand):
                    </span>
                    <select
                      value={selectedBrandFilter}
                      onChange={(e) => {
                        const newBrand = e.target.value;
                        setSelectedBrandFilter(newBrand);
                        // Auto-select the first phone model belonging to the selected brand
                        const brandPhones = PHONE_MODELS.filter((p) =>
                          newBrand === 'all' ? true : p.brand.toLowerCase() === newBrand.toLowerCase()
                        );
                        if (brandPhones.length > 0) {
                          setSelectedPhone(brandPhones[0]);
                        }
                      }}
                      className="w-full bg-stone-800/90 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-bold focus:outline-none focus:border-cyan-400 cursor-pointer shadow-inner"
                    >
                      <option value="all">🌐 جميع الماركات العالمية (All Brands - 40+ موديل)</option>
                      <option value="Apple">🍏 أبل - Apple iPhone (14 موديل متاح)</option>
                      <option value="Samsung">📱 سامسونج - Samsung Galaxy (15 موديل متاح)</option>
                      <option value="Xiaomi">⚡ شاومي وريدمي وبوكو - Xiaomi & Redmi & POCO (10 موديلات)</option>
                      <option value="Google">🔍 جوجل - Google Pixel (6 موديلات)</option>
                      <option value="OnePlus">🔴 وان بلس - OnePlus (4 موديلات)</option>
                      <option value="Honor">🦅 هونر - Honor (4 موديلات)</option>
                      <option value="Huawei">🌺 هواوي - Huawei (4 موديلات)</option>
                      <option value="Oppo">🟢 أوبو - Oppo (2 موديل)</option>
                      <option value="Realme">🟡 ريلمي - Realme (3 موديلات)</option>
                    </select>
                  </div>

                  {/* 2. Model Selection Dropdown (قائمة منسدلة لاختيار الموديل بناءً على الماركة المختارة) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-stone-400 font-semibold block">
                        2. اختر الموديل المطلوب (Model):
                      </span>
                      <span className="text-[10px] text-cyan-400 font-mono">
                        {PHONE_MODELS.filter((p) =>
                          selectedBrandFilter === 'all'
                            ? true
                            : p.brand.toLowerCase() === selectedBrandFilter.toLowerCase()
                        ).length} موديلات متاحة
                      </span>
                    </div>

                    <select
                      value={selectedPhone.id}
                      onChange={(e) => {
                        const found = PHONE_MODELS.find((m) => m.id === e.target.value);
                        if (found) setSelectedPhone(found);
                      }}
                      className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-bold focus:outline-none focus:border-amber-500 cursor-pointer shadow-inner"
                    >
                      {PHONE_MODELS.filter((p) => {
                        const matchesBrand =
                          selectedBrandFilter === 'all' ||
                          p.brand.toLowerCase() === selectedBrandFilter.toLowerCase();
                        const query = phoneSearchQuery.trim().toLowerCase();
                        const matchesQuery =
                          !query ||
                          p.name.toLowerCase().includes(query) ||
                          p.brand.toLowerCase().includes(query);
                        return matchesBrand && matchesQuery;
                      }).map((model) => (
                        <option key={model.id} value={model.id} className="bg-stone-900 text-white font-semibold">
                          {model.name} — ({model.brand}) {model.popularInEgypt ? '🔥 الأكثر طلباً' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quick Search Helper for Power Users */}
                  <div className="relative pt-1">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-3.5 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="بحث فوري سريع برقم الموديل (مثال: A55, S24, 16 Pro, Poco)..."
                      value={phoneSearchQuery}
                      onChange={(e) => setPhoneSearchQuery(e.target.value)}
                      className="w-full bg-stone-900/80 border border-stone-800 rounded-lg pr-8 pl-7 py-1.5 text-[11px] text-stone-200 placeholder-stone-500 focus:outline-none focus:border-cyan-400"
                    />
                    {phoneSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setPhoneSearchQuery('')}
                        className="absolute left-2 top-3 text-stone-400 hover:text-white text-xs px-1"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Active Selected Phone Quick Confirmation Badge */}
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-700 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xs font-bold">
                        ✓
                      </div>
                      <div>
                        <span className="font-extrabold text-white block text-xs">{selectedPhone.name}</span>
                        <span className="text-[10px] text-stone-400">
                          الماركة: <strong className="text-cyan-300">{selectedPhone.brand}</strong> · قصّة الكاميرا: <span className="font-mono text-stone-400">{selectedPhone.cameraLayout}</span>
                        </span>
                      </div>
                    </div>
                    {selectedPhone.popularInEgypt && (
                      <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold shrink-0">
                        الأكثر مبيعاً 🔥
                      </span>
                    )}
                  </div>
                </div>

                {/* Case Finish */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-2">
                    نوع وخامة الكفر:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setCaseFinish('tough')}
                      className={`p-2.5 rounded-xl border text-right transition-colors ${
                        caseFinish === 'tough'
                          ? 'border-amber-500 bg-amber-500/10 text-white font-bold'
                          : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:text-white'
                      }`}
                    >
                      <span className="block font-semibold">صدمات مصفح (Tough Armor)</span>
                      <span className="text-[10px] text-stone-400">حماية عسكرية مزدوجة الطبقات</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCaseFinish('magsafe')}
                      className={`p-2.5 rounded-xl border text-right transition-colors ${
                        caseFinish === 'magsafe'
                          ? 'border-amber-500 bg-amber-500/10 text-white font-bold'
                          : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:text-white'
                      }`}
                    >
                      <span className="block font-semibold">ماج سيف بلوري (MagSafe)</span>
                      <span className="text-[10px] text-stone-400">مغناطيس مدمج وشحن لاسلكي</span>
                    </button>
                  </div>
                </div>

                {/* Case Base Color Swatches */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-2">
                    لون خلفية الكفر:
                  </label>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {CASE_COLORS.map((col) => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => setCaseColor(col.hex)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${
                          caseColor === col.hex ? 'scale-115 border-amber-400 shadow-md ring-2 ring-amber-400/30' : 'border-stone-700 hover:scale-105'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.nameAr}
                        aria-label={col.nameAr}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Leather Wallet Type */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-2">
                    شكل المحفظة:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setWalletType('bifold')}
                      className={`p-2.5 rounded-xl border text-right transition-colors ${
                        walletType === 'bifold'
                          ? 'border-amber-500 bg-amber-500/10 text-white font-bold'
                          : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:text-white'
                      }`}
                    >
                      <span className="block font-semibold">محفظة كلاسيكية ثنائية الطي</span>
                      <span className="text-[10px] text-stone-400">تتسع للنقود و 8 بطاقات</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWalletType('cardholder')}
                      className={`p-2.5 rounded-xl border text-right transition-colors ${
                        walletType === 'cardholder'
                          ? 'border-amber-500 bg-amber-500/10 text-white font-bold'
                          : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:text-white'
                      }`}
                    >
                      <span className="block font-semibold">حامل بطاقات بمشبك نقود</span>
                      <span className="text-[10px] text-stone-400">مدمج ونحيف للجيب الأمامي</span>
                    </button>
                  </div>
                </div>

                {/* Leather Color Options */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-2">
                    لون الجلد الطبيعي المدبوغ:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {LEATHER_COLORS.map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => setLeatherColor(l.id)}
                        className={`p-2 rounded-xl border flex items-center gap-2.5 text-xs text-right transition-colors ${
                          leatherColor === l.id
                            ? 'border-amber-500 bg-amber-500/10 text-white font-bold'
                            : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:text-white'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-stone-600 shrink-0"
                          style={{ backgroundColor: l.hex }}
                        />
                        <span className="truncate">{l.nameAr}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. Custom Text & Personalization Input */}
            <div className="pt-2 border-t border-stone-800 space-y-3">
              <label className="block text-xs font-semibold text-stone-300">
                الاسم أو النص المخصص للطباعة / الحفر:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="مثال: محمد، عبد العزيز، أو حروف أولى..."
                  maxLength={30}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
                <span className="absolute left-3 top-2.5 text-[11px] text-stone-400 tabular-nums">
                  {customText.length}/30
                </span>
              </div>
            </div>

            {/* 3. Calligraphy & Typography Style */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-300">
                نوع الخط (الخط العربي أو اللاتيني):
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {[
                  { id: 'diwani', name: 'الخط الديواني', class: 'font-calligraphy' },
                  { id: 'ruqaa', name: 'خط الرقعة الملكي', class: 'font-ruqaa' },
                  { id: 'thuluth', name: 'خط الثلث الجلي', class: 'font-calligraphy' },
                  { id: 'kufic', name: 'الكوفي الحديث', class: 'font-bold' },
                  { id: 'serif', name: 'إنجليزي كلاسيك', class: 'font-serif' },
                  { id: 'sans', name: 'إنجليزي مينيمال', class: 'font-latin' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFontStyle(f.id as FontStyle)}
                    className={`py-2 px-2 rounded-lg border text-center transition-colors ${
                      fontStyle === f.id
                        ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-semibold'
                        : 'border-stone-800 bg-stone-800/40 text-stone-400 hover:text-white'
                    }`}
                  >
                    <span className={`block text-xs truncate ${f.class}`}>{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Foil Finish / Stamping Method */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-300">
                طريقة النقش واللون (Foil & Stamping):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'gold', name: 'رقائق ذهب 24K بارزة', hint: 'Gold Foil' },
                  { id: 'silver', name: 'فضة ميتاليك براقة', hint: 'Silver Foil' },
                  { id: 'neon-green', name: 'أخضر نيون فوسفوري ⚡', hint: 'Neon Lime' },
                  { id: 'cyber-pink', name: 'فوشيا سايبر متوهج 💥', hint: 'Cyber Magenta' },
                  { id: 'white', name: 'أبيض صريح UV بارز', hint: 'Pure White UV' },
                  { id: 'blind', name: 'حفر غائر بدون لون', hint: 'Blind Deboss' },
                ].map((foil) => (
                  <button
                    key={foil.id}
                    type="button"
                    onClick={() => setFoilType(foil.id as FoilType)}
                    className={`p-2 rounded-xl border text-center transition-colors ${
                      foilType === foil.id
                        ? 'border-amber-500 bg-amber-500/20 text-white font-bold ring-1 ring-amber-500/50'
                        : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:text-white'
                    }`}
                  >
                    <span className="block text-xs">{foil.name}</span>
                    <span className="text-[10px] text-stone-400">{foil.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Position & Size */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  موضع النقش:
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value as any)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="center">في المنتصف (Center)</option>
                  <option value="bottom-right">الزاوية السفلية (Bottom Corner)</option>
                  <option value="bottom-center">أسفل المنتصف (Bottom Center)</option>
                  <option value="spine">شريط عمودي جانبي (Spine)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  حجم الخط ({fontSize}px):
                </label>
                <input
                  type="range"
                  min="16"
                  max="44"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-amber-500 mt-2"
                />
              </div>
            </div>

            {/* 6. Pattern, AI Concept Art or Custom Image Upload */}
            {itemType === 'case' && (
              <div className="pt-2 border-t border-stone-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-semibold text-stone-300">
                    إضافة نقش زخرفي أو فن AI أو شعارك:
                  </label>
                  <div className="flex items-center gap-2">
                    {onOpenAiStudio && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenAiStudio();
                        }}
                        className="text-xs font-bold text-cyan-300 hover:text-white flex items-center gap-1 bg-cyan-950/70 hover:bg-cyan-900/80 px-2.5 py-1 rounded-xl border border-cyan-500/50 shadow-sm transition-all"
                        title="توليد صور وكونسبت آرت بالذكاء الاصطناعي وتطبيقها على الكفر"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                        <span>توليد فن AI 🎨</span>
                      </button>
                    )}

                    <label className="cursor-pointer text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-stone-800 hover:bg-stone-750 px-2.5 py-1 rounded-xl border border-stone-700 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>ارفع صورة</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                {uploadedLogo && (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-stone-950/80 border border-stone-800 text-xs">
                    <div className="flex items-center gap-2">
                      <img src={uploadedLogo} alt="Selected Art" className="w-8 h-8 rounded-lg object-cover border border-amber-500/40" />
                      <span className="text-[11px] text-amber-300 font-bold">تم تطبيق العمل الفني على الكفر بنجاح</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadedLogo(null)}
                      className="text-stone-400 hover:text-rose-400 text-[10px] font-bold"
                    >
                      إزالة ✕
                    </button>
                  </div>
                )}

                <div className="flex gap-2">
                  {PATTERNS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPatternId(p.id)}
                      className={`flex-1 py-1.5 px-2 rounded-lg border text-center text-xs transition-colors ${
                        patternId === p.id
                          ? 'border-amber-500 bg-amber-500/15 text-white font-semibold'
                          : 'border-stone-800 bg-stone-800/40 text-stone-400 hover:text-white'
                      }`}
                    >
                      {p.nameAr}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price & Submit Action */}
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-4">
              <div>
                <span className="block text-xs text-stone-400">إجمالي القطعة مع التخصيص:</span>
                <span className="text-xl font-extrabold text-amber-400 tabular-nums">
                  {formattedPrice} {currencyConfig.symbolAr}
                </span>
                <span className="text-[10px] text-stone-400 block">شحن مباشر وسريع من المصنع</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveToCart}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 text-sm whitespace-nowrap active:scale-[0.98]"
                >
                  إضافة لعربة التسوق
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
