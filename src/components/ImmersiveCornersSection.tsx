import React, { useState } from 'react';
import {
  Sparkles,
  Flame,
  ArrowRight,
  ArrowLeft,
  Sliders,
  Eye,
  Volume2,
  VolumeX,
  Shield,
  Zap,
  Star,
  Check,
  ShoppingBag,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Product, Currency } from '../types';
import { CURRENCIES } from '../data/products';

interface ImmersiveCornersSectionProps {
  onOpenStudioForNiche: (theme: string, image?: string) => void;
  onFilterCatalogByNiche: (category: string) => void;
  onQuickAddProduct: (product: Product) => void;
  products: Product[];
  currency: Currency;
}

interface CornerAmbiance {
  id: string;
  tagAr: string;
  tagEn: string;
  nameAr: string;
  nameEn: string;
  heroHeadlineAr: string;
  heroHeadlineEn: string;
  subheadlineAr: string;
  subheadlineEn: string;
  emoji: string;
  bgGradient: string;
  glowColor: string;
  accentBorder: string;
  badgeTextColor: string;
  japaneseKanji?: string;
  featuredImage: string;
  deviceMockup: string;
  samplePriceEGP: number;
  catalogCategory: string;
  atmosphereSpecsAr: string[];
  atmosphereSpecsEn: string[];
}

export const CORNERS: CornerAmbiance[] = [
  {
    id: 'anime',
    tagAr: 'عالم الأنمي والمانجا الياباني الأسطوري ⚔️',
    tagEn: 'Mythic Anime & Manga Cyber Realm ⚔️',
    nameAr: 'كورنر الأنمي | لوفي جير 5، جوجو، زورو وإيتاتشي 3D',
    nameEn: 'Anime Realm | Gear 5 Luffy, Gojo, Zoro & Itachi 3D',
    heroHeadlineAr: 'أساطير الأنمي والمانجا ببروز 3D حقيقي وصواعق نيون يابانية',
    heroHeadlineEn: 'Legendary anime icons in tactile 3D relief & electric neon aura',
    subheadlineAr: 'طباعة يابانية UV بارزة الملمس مع هالات إله الشمس نيكا، العيون الست لجوجو، سوسانو إيتاتشي، وسيوف زورو الثلاثة.',
    subheadlineEn: 'Tactile raised Japanese UV gloss featuring JoyBoy Luffy Gear 5, Gojo Six Eyes, Itachi Susanoo, and Zoro Enma Haki flames.',
    emoji: '⚔️',
    bgGradient: 'from-purple-950/90 via-slate-950 to-indigo-950/90',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    accentBorder: 'border-purple-500/60',
    badgeTextColor: 'text-purple-300',
    japaneseKanji: '解放のドラム • 領域展開 • 神威',
    featuredImage: '/src/assets/images/anime_legends_case_1793666056294.jpg',
    deviceMockup: 'iPhone 16 Pro Max',
    samplePriceEGP: 235,
    catalogCategory: 'anime',
    atmosphereSpecsAr: ['طباعة بارزة 3D ومقاومة للماء والخدش', 'صواعق نيون وهالة هولوغرام تتفاعل مع الإضاءة', 'حواف MagSafe مصفحة لحماية الموبايل من السقوط 3.5 م'],
    atmosphereSpecsEn: ['Scratch & water-resistant Japanese 3D UV texture', 'Dynamic holographic neon light reflection effects', 'Military drop absorption up to 3.5 meters'],
  },
  {
    id: 'aesthetic-girls',
    tagAr: 'ركن الأنوثة والدلع والشياكة الفاخرة 🌸',
    tagEn: 'Feminine Coquette Chic & Girly Glamour 🌸',
    nameAr: 'كورنر الدلع والأنوثة | فيونكات كوكيت وفراشة روز جولد 24k',
    nameEn: 'Girls Coquette | Silk Bow, 24k Rose Gold Butterfly & Pearls',
    heroHeadlineAr: 'أرق تصاميم الدلع والأنوثة بالماربل الوردي ولؤلؤ الكوكيت',
    heroHeadlineEn: 'Dreamy soft luxury: Silk coquette ribbon, 24k rose gold butterfly & pearls',
    subheadlineAr: 'كفرات رقيقة كقطعة مجوهرات؛ فراشات ذهب وردي بارزة 3D، فيونكات كوكيت حريرية، حبات لؤلؤ، ورخام فرنسي مع إطار حماية مذهب للعدسات.',
    subheadlineEn: 'Jewelry-grade phone cases with 3D filigree rose-gold butterfly, pastel coquette bows, natural pearls, and rose-gold camera bezel.',
    emoji: '🎀',
    bgGradient: 'from-rose-950/70 via-stone-950 to-pink-950/70',
    glowColor: 'rgba(244, 114, 182, 0.35)',
    accentBorder: 'border-pink-500/60',
    badgeTextColor: 'text-pink-300',
    japaneseKanji: '優雅な美しさ • 桜の花',
    featuredImage: '/src/assets/images/coquette_feminine_case_1793666068751.jpg',
    deviceMockup: 'iPhone 16 Pro Max',
    samplePriceEGP: 235,
    catalogCategory: 'aesthetic-florals',
    atmosphereSpecsAr: ['فراشة روز جولد عيار 24 وفيونكة كوكيت بارزة 3D', 'حلقة كاميرا مذهبة روز جولد متوافقة مع MagSafe', 'تغليف هدايا ملكي بالختم الشمعي وبتلات الورد المجفف'],
    atmosphereSpecsEn: ['3D 24k rose-gold butterfly & tactile coquette bow', 'Rose-gold camera bezel with full MagSafe fast charging', 'Royal wax-sealed gift unboxing with dried rose petals'],
  },
  {
    id: 'football',
    tagAr: 'أجواء الملاعب وأساطير الكورة ⚽',
    tagEn: 'Stadium Legends & Football Clubs ⚽',
    nameAr: 'كورنر الكورة | نسر القرن والكاربون فايبر',
    nameEn: 'Football Stadium | Century Eagle & Carbon Fiber',
    heroHeadlineAr: 'انتماؤك لناديك المفضل على ظهر هاتفك بألياف كربونية لا تنكسر',
    heroHeadlineEn: 'Carry your club colours with unbreakable carbon fiber composite',
    subheadlineAr: 'نسر النادي الأهلي الذهبي والبطولات الإفريقية، الزمالك الملكي، وريال مدريد مع حفر رقم التيشرت واسمك بالذهب.',
    subheadlineEn: 'Al Ahly Golden Eagle, Zamalek Royal, and Real Madrid crests with custom jersey number engraving.',
    emoji: '⚽',
    bgGradient: 'from-emerald-950/70 via-stone-950 to-red-950/50',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    accentBorder: 'border-emerald-500/50',
    badgeTextColor: 'text-emerald-300',
    japaneseKanji: '王者の栄光 • 世紀の鷲',
    featuredImage: '/src/assets/images/football_case_1793495651444.jpg',
    deviceMockup: 'Galaxy S25 Ultra',
    samplePriceEGP: 229,
    catalogCategory: 'football',
    atmosphereSpecsAr: ['ألياف كربونية Forged Carbon ضد الصدمات العنيفة', 'شعار ذهبي بارز ملموس لا يبهت تحت الشمس', 'مسكة جانبية مانعة للانزلاق في اليد والملاعب'],
    atmosphereSpecsEn: ['Impact-absorbing forged carbon fiber backing', 'Embossed metallic club crest guaranteed against fading', 'Tactical anti-slip side rails for stadium grip'],
  },
  {
    id: 'calligraphy',
    tagAr: 'التراث والخط العربي الملكي ✒️',
    tagEn: 'Arabic Calligraphy & Royal Heritage ✒️',
    nameAr: 'كورنر التراث | آيات قرآنية ونقوش أندلسية 24k',
    nameEn: 'Calligraphy Realm | Andalusian Arches & Gold Quranic Script',
    heroHeadlineAr: 'آية الكرسي ومحراب الحمراء بذهب ملكي بارز تحت الأصابع',
    heroHeadlineEn: 'Ayat Al-Kursi & Andalusian Alhambra arches embossed in 24k liquid gold',
    subheadlineAr: 'حفر يدوي بارز لخط الثلث والديواني والكوفي على ظهر أبنوسي فخم يعكس الهوية والأصالة العربية.',
    subheadlineEn: 'Deep obsidian matte backplate with tactile Diwani, Thuluth, and Kufic script embossed with 24k foil.',
    emoji: '✒️',
    bgGradient: 'from-amber-950/80 via-stone-950 to-stone-900',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    accentBorder: 'border-amber-500/50',
    badgeTextColor: 'text-amber-300',
    japaneseKanji: '伝統と書道 • 黄金',
    featuredImage: '/src/assets/images/islamic_gold_calligraphy_case_1793523903046.jpg',
    deviceMockup: 'iPhone 16 Pro Max',
    samplePriceEGP: 245,
    catalogCategory: 'islamic-calligraphy',
    atmosphereSpecsAr: ['خط ديواني وثلث عربي بارز 3D فائق الدقة', 'بصمة فويل حراري 24k لا تتقشر أو تزول', 'حماية كاملة للكاميرا مع شحن لاسلكي سريع'],
    atmosphereSpecsEn: ['Exquisite tactile 3D Arabic calligraphy script', 'Heat-stamped 24k metallic foil guaranteed for life', 'Elevated camera lip with fast wireless charging'],
  },
  {
    id: 'motorsport',
    tagAr: 'عشاق السرعة والسوبركارز 🏎️',
    tagEn: 'GT3 Motorsport & Supercars 🏎️',
    nameAr: 'كورنر الموتورسبورت | سوبركارز وعدادات نيون',
    nameEn: 'Motorsport Corner | Supercars & Neon Tachometers',
    heroHeadlineAr: 'روح حلبات الفورمولا 1 وسباقات GT3 بتشطيب كاربون فايبر تكتيكي',
    heroHeadlineEn: 'Formula 1 racing spirit with tactical forged carbon composite',
    subheadlineAr: 'عدادات سرعة نيون وألياف كربونية Forged Carbon تمنح هاتفك مسكة رياضية تكتيكية مانعة للانزلاق.',
    subheadlineEn: 'Neon tachometers and forged carbon composite providing a sport anti-slip grip built for speed.',
    emoji: '🏎️',
    bgGradient: 'from-red-950/70 via-stone-950 to-stone-900',
    glowColor: 'rgba(239, 68, 68, 0.25)',
    accentBorder: 'border-red-500/50',
    badgeTextColor: 'text-red-400',
    japaneseKanji: '超高速 • モータースポーツ',
    featuredImage: '/src/assets/images/supercars_racing_case_1793523887729.jpg',
    deviceMockup: 'Galaxy S25 Ultra',
    samplePriceEGP: 235,
    catalogCategory: 'cars-motorsport',
    atmosphereSpecsAr: ['كاربون فايبر تكتيكي فائق الخفة والمقاومة', 'ألوان نيون رياضية مستوحاة من عدادات الـ M-Power', 'حواف جانبية مانعة لتعرق اليد والانزلاق'],
    atmosphereSpecsEn: ['Ultralight forged carbon composite shell', 'M-Power racing neon instrument cluster aesthetics', 'Textured ergonomic side ridges resisting sweat'],
  },
];

export const ImmersiveCornersSection: React.FC<ImmersiveCornersSectionProps> = ({
  onOpenStudioForNiche,
  onFilterCatalogByNiche,
  onQuickAddProduct,
  products,
  currency,
}) => {
  const { language, isRtl } = useLanguage();
  const [activeCornerId, setActiveCornerId] = useState<string>('anime');
  const [isAtmosphereAudioActive, setIsAtmosphereAudioActive] = useState<boolean>(false);

  const activeCorner = CORNERS.find((c) => c.id === activeCornerId) || CORNERS[0];
  const currencyConfig = CURRENCIES[currency] || CURRENCIES.EGP;
  const currencySymbol = language === 'ar' ? currencyConfig.symbolAr : currencyConfig.symbolEn;
  const priceFormatted = ((activeCorner.samplePriceEGP / 31.0) * currencyConfig.rateFromUSD).toFixed(0);

  // Find matching product in catalog
  const matchingProduct = products.find((p) => p.image === activeCorner.featuredImage) || products[0];

  return (
    <section
      id="immersive-corners"
      className="relative py-16 sm:py-24 overflow-hidden transition-all duration-700 font-cairo"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Background Atmosphere Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${activeCorner.bgGradient} transition-colors duration-700 opacity-90`}
      />
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-all duration-700"
        style={{ backgroundColor: activeCorner.glowColor }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-all duration-700"
        style={{ backgroundColor: activeCorner.glowColor }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-900/80 border border-stone-700 text-amber-400 text-xs font-bold shadow-md">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>
              {language === 'ar' ? 'كورنر الأجواء الحصرية والتريندات' : 'Immersive Subculture Corners'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'ar' ? 'عِش أجواء العالم المفضل لديك بالتفصيل' : 'Step Inside Your Favorite Subculture Realm'}
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'اختر الكورنر الذي يعبر عن ذوقك: أنمي ياباني، ترندات البنات والماربل، أساطير الكورة، الخط العربي، أو سباقات السوبركارز.'
              : 'Switch atmospheres instantly: Japanese anime UV, aesthetic girls marble, football legends, royal calligraphy, or supercar speed.'}
          </p>
        </div>

        {/* Corner Selection Tabs Switcher */}
        <div className="flex items-center justify-start sm:justify-center gap-2 pb-4 overflow-x-auto scrollbar-none mb-8">
          {CORNERS.map((corner) => {
            const isActive = corner.id === activeCornerId;
            return (
              <button
                key={corner.id}
                onClick={() => setActiveCornerId(corner.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 shrink-0 border cursor-pointer ${
                  isActive
                    ? `bg-stone-900 text-white ${corner.accentBorder} shadow-lg shadow-black/60 scale-105 ring-1 ring-white/20`
                    : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-white hover:border-stone-700'
                }`}
              >
                <span className="text-base">{corner.emoji}</span>
                <span>{language === 'ar' ? corner.tagAr : corner.tagEn}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>}
              </button>
            );
          })}
        </div>

        {/* Immersive Corner Showcase Stage */}
        <div className={`relative rounded-3xl border ${activeCorner.accentBorder} bg-stone-950/80 backdrop-blur-xl shadow-2xl p-6 sm:p-10 overflow-hidden transition-all duration-700`}>
          
          {/* Subtle Kanji / Subculture Watermark */}
          {activeCorner.japaneseKanji && (
            <div className="absolute top-4 left-6 sm:left-12 text-5xl sm:text-8xl font-black text-white/[0.04] select-none pointer-events-none tracking-widest font-mono">
              {activeCorner.japaneseKanji}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left Column (Details, Specs, & CTAs) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge & Atmosphere Title */}
              <div className="space-y-2">
                <span className={`inline-block text-xs font-bold uppercase tracking-wider ${activeCorner.badgeTextColor}`}>
                  {language === 'ar' ? activeCorner.tagAr : activeCorner.tagEn}
                </span>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                  {language === 'ar' ? activeCorner.heroHeadlineAr : activeCorner.heroHeadlineEn}
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pt-1">
                  {language === 'ar' ? activeCorner.subheadlineAr : activeCorner.subheadlineEn}
                </p>
              </div>

              {/* Atmosphere Features Checklist */}
              <div className="space-y-2.5 pt-2">
                {(language === 'ar' ? activeCorner.atmosphereSpecsAr : activeCorner.atmosphereSpecsEn).map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-stone-200">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              {/* Price & Action Suite */}
              <div className="pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-stone-400 block">
                    {language === 'ar' ? 'السعر مع التخصيص والشحن:' : 'Price including custom name & dispatch:'}
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                      {priceFormatted}
                    </span>
                    <span className="text-xs font-bold text-amber-400">
                      {currencySymbol}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* Customize in Studio */}
                  <button
                    onClick={() => onOpenStudioForNiche(activeCorner.catalogCategory, activeCorner.featuredImage)}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg active:scale-98"
                  >
                    <Sliders className="w-4 h-4" />
                    <span>{language === 'ar' ? 'صمم هذا الكورنر باسمك ⚡' : 'Personalize in Studio ⚡'}</span>
                  </button>

                  {/* Quick Add */}
                  <button
                    onClick={() => onQuickAddProduct(matchingProduct)}
                    className="px-4 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors border border-stone-700"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span>{language === 'ar' ? 'إضافة سريعة +' : 'Quick Add +'}</span>
                  </button>

                  {/* Browse this whole corner */}
                  <button
                    onClick={() => onFilterCatalogByNiche(activeCorner.catalogCategory)}
                    className="px-4 py-3 rounded-xl text-stone-300 hover:text-white font-semibold text-xs flex items-center gap-1 transition-colors hover:underline"
                  >
                    <span>{language === 'ar' ? 'تصفح تشكيلة الكورنر' : 'Explore Corner'}</span>
                    {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Visual 3D Phone Mockup Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-sm">
                
                {/* Glow ring */}
                <div
                  className="absolute -inset-4 rounded-3xl blur-2xl opacity-60 transition-all duration-700 group-hover:opacity-100"
                  style={{ backgroundColor: activeCorner.glowColor }}
                />

                {/* Device Card */}
                <div className="relative bg-stone-900 border border-stone-700/80 rounded-3xl overflow-hidden shadow-2xl p-3 group-hover:scale-102 transition-transform duration-500">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-950">
                    <img
                      src={activeCorner.featuredImage}
                      alt={activeCorner.nameAr}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Badge Pill */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-stone-900/90 backdrop-blur-md border border-stone-700 text-xs font-bold text-amber-400 flex items-center gap-1.5 shadow-md">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{activeCorner.deviceMockup}</span>
                    </div>

                    {/* Bottom overlay tag */}
                    <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-stone-950/85 backdrop-blur-md border border-stone-800 flex items-center justify-between text-xs text-stone-200">
                      <span className="font-bold truncate">{language === 'ar' ? activeCorner.nameAr : activeCorner.nameEn}</span>
                      <span className="text-[10px] text-amber-400 font-mono font-bold shrink-0">UV 3D Relief</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
