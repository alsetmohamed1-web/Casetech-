import React, { useState } from 'react';
import { Sparkles, ArrowLeft, ArrowRight, ShieldCheck, Zap, PackageCheck, Flame, Star, Check, Brain } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenStudio: () => void;
  onExploreCatalog: () => void;
  onOpenDropshipInfo: () => void;
  onSelectNiche?: (niche: string) => void;
  onOpenAiStudio?: () => void;
}

interface HeroFeaturedModel {
  id: string;
  niche: string;
  nicheEmoji: string;
  badgeAr: string;
  badgeEn: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  priceEGP: number;
  image: string;
  device: string;
}

const HERO_FEATURED_MODELS: HeroFeaturedModel[] = [
  {
    id: 'marble-floral',
    niche: 'aesthetic-florals',
    nicheEmoji: '🌸',
    badgeAr: 'تريند البنات والأناقة',
    badgeEn: 'Aesthetic Marble & Gold',
    titleAr: 'رخام كرارا إيطالي مع لافندر وعروق ذهب 24k سائل',
    titleEn: 'Carrara Italian Marble with Lavender & 24k Liquid Gold',
    subtitleAr: 'بروز ملموس 3D وحواف MagSafe ذهبية لحماية الكاميرا',
    subtitleEn: 'Tactile 3D relief with gold MagSafe camera protection ring',
    priceEGP: 229,
    image: '/src/assets/images/luxury_marble_floral_case_1793523872771.jpg',
    device: 'iPhone 16 Pro Max',
  },
  {
    id: 'supercars-gt3',
    niche: 'cars-motorsport',
    nicheEmoji: '🏎️',
    badgeAr: 'عشاق السرعة والموتورسبورت',
    badgeEn: 'Motorsport & GT3 Racing',
    titleAr: 'سوبركارز M-Power & GT3 كاربون فايبر وعداد سرعة نيون',
    titleEn: 'Supercars M-Power & GT3 Forged Carbon with Neon Tachometer',
    subtitleAr: 'ألياف كربونية Forged Carbon ومسكة تكتيكية مانعة للانزلاق',
    subtitleEn: 'Tactical grip forged carbon composite with anti-slip sides',
    priceEGP: 235,
    image: '/src/assets/images/supercars_racing_case_1793523887729.jpg',
    device: 'Galaxy S25 Ultra',
  },
  {
    id: 'quran-ayat',
    niche: 'islamic-calligraphy',
    nicheEmoji: '✒️',
    badgeAr: 'نقوش قرآنية وتراث أندلسي',
    badgeEn: 'Andalusian Gold Calligraphy',
    titleAr: 'آية الكرسي ومحراب الحمراء بذهب ملكي 24k سائل 3D',
    titleEn: 'Ayat Al-Kursi & Alhambra Archway with 24k 3D Liquid Gold',
    subtitleAr: 'خط ديواني ثلث بارز تحت الأصابع على ظهر أبنوسي فاخر',
    subtitleEn: 'Hand-embossed Diwani script on obsidian matte finish',
    priceEGP: 245,
    image: '/src/assets/images/islamic_gold_calligraphy_case_1793523903046.jpg',
    device: 'iPhone 16 Pro Max',
  },
  {
    id: 'football-ahly',
    niche: 'football',
    nicheEmoji: '⚽',
    badgeAr: 'نادي القرن والـ 12 نجمة',
    badgeEn: 'Club of the Century',
    titleAr: 'نسر النادي الأهلي الذهبي والبطولات الإفريقية الملكية',
    titleEn: 'Golden Al Ahly Eagle & African Championship Honours',
    subtitleAr: 'ألياف كربونية مقاومة للصدمات مع لمعان ذهبي بارز ملموس',
    subtitleEn: 'Shock-resistant carbon fiber with tactile raised golden crest',
    priceEGP: 229,
    image: '/src/assets/images/football_case_1793495651444.jpg',
    device: 'iPhone 15 Pro Max',
  },
  {
    id: 'anime-warrior',
    niche: 'anime',
    nicheEmoji: '⚔️',
    badgeAr: 'أنمي ياباني UV هولوغرام',
    badgeEn: 'Holographic Anime & Manga',
    titleAr: 'درع المحارب الأسطوري وهالة السحر البارزة 3D',
    titleEn: 'Shadow Monarch Warrior with 3D Holographic Aura',
    subtitleAr: 'طباعة يابانية UV ومؤثرات ضوئية تتغير مع زوايا الإضاءة',
    subtitleEn: 'Japanese UV printing with color-shifting dynamic light reflection',
    priceEGP: 229,
    image: '/src/assets/images/anime_uv_case_1793495650837.jpg',
    device: 'iPhone 16 Pro',
  },
  {
    id: 'egypt-vintage',
    niche: 'egyptian-icons',
    nicheEmoji: '🇪🇬',
    badgeAr: 'زمن الفن الجميل والطرب',
    badgeEn: 'Egyptian Heritage & Icons',
    titleAr: 'كوكب الشرق أم كلثوم ونغم زمان بالخط المذهب واللؤلؤ',
    titleEn: 'Star of the Orient Umm Kulthum with Pearl Gold Accents',
    subtitleAr: 'حفر ليزري تفصيلي وتغليف فاخر في صندوق الهدايا الملكي',
    subtitleEn: 'Fine laser engraving packaged inside royal gift box',
    priceEGP: 229,
    image: '/src/assets/images/egypt_icons_case_1793495666188.jpg',
    device: 'iPhone 15 Pro',
  },
];

export const Hero: React.FC<HeroProps> = ({
  onOpenStudio,
  onExploreCatalog,
  onOpenDropshipInfo,
  onSelectNiche,
  onOpenAiStudio,
}) => {
  const { language, t, isRtl } = useLanguage();
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const currentModel = HERO_FEATURED_MODELS[activeModelIndex] || HERO_FEATURED_MODELS[0];

  const handleNicheClick = (nicheKey: string) => {
    if (onSelectNiche) {
      onSelectNiche(nicheKey);
    } else {
      const el = document.getElementById('catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nicheTabs = [
    { id: 'football', label: language === 'ar' ? '⚽ كورة وأندية مصرية وعالمية' : '⚽ Football & Egyptian Clubs' },
    { id: 'anime', label: language === 'ar' ? '⚔️ أنمي ياباني وجيمينج' : '⚔️ Anime & Manga' },
    { id: 'islamic-calligraphy', label: language === 'ar' ? '✒️ خط عربي ونقوش قرآنية' : '✒️ Arabic Calligraphy' },
    { id: 'aesthetic-florals', label: language === 'ar' ? '🌸 ماربل وبنات وفلورال' : '🌸 Aesthetic & Florals' },
    { id: 'cars-motorsport', label: language === 'ar' ? '🏎️ عربيات وسرعة وسوبركارز' : '🏎️ Racing & Supercars' },
    { id: 'egyptian-icons', label: language === 'ar' ? '🇪🇬 أيقونات مصرية ونوستالجيا' : '🇪🇬 Egyptian Icons' },
    { id: 'wallets', label: language === 'ar' ? '💎 محافظ جلد طبيعي محفورة' : '💎 Genuine Leather Wallets' },
    { id: 'cosmic-galaxy', label: language === 'ar' ? '🌌 فضاء وكواكب 3D' : '🌌 Cosmic & Galaxy' },
  ];

  return (
    <section className="relative bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-white overflow-hidden border-b border-stone-800">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16 relative z-10">
        
        {/* Top Minimal Alert / Call to Action */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-stone-800/60 text-xs">
          <div className="flex items-center gap-2 text-stone-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-amber-400 font-bold">
              {language === 'ar' ? 'معرض الموديلات الحية:' : 'Live Showroom:'}
            </span>
            <span className="hidden sm:inline text-stone-400">
              {language === 'ar'
                ? 'انقر على أي موديل لتغيير المعاينة فوراً والتخصيص باسمك'
                : 'Click any model to preview in real-time and customize with your name'}
            </span>
          </div>

          <button
            onClick={onExploreCatalog}
            className="text-stone-300 hover:text-amber-400 font-bold flex items-center gap-1 transition-colors"
          >
            <span>{language === 'ar' ? 'عرض كل الـ 20+ تصميماً بالأسفل' : 'Browse all 20+ designs below'}</span>
            {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Hero Interactive Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Visual Selector & Punchy Pitch */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Headline */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.heroTopBadge}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
                {language === 'ar' ? (
                  <>
                    تصاميم تخطف الأنظار، <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 via-yellow-200 to-amber-500">
                      تُصنّع خصيصاً باسمك
                    </span>
                    <span className="text-white"> من 215 ج.م فقط!</span>
                  </>
                ) : (
                  <>
                    Eye-Catching Cases, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">
                      Custom Crafted with Your Name
                    </span>
                    <span className="text-white"> from 215 EGP!</span>
                  </>
                )}
              </h1>

              <p className="text-xs sm:text-sm text-stone-300 mt-3 max-w-xl leading-relaxed">
                {t.heroSubheadline}
              </p>
            </div>

            {/* Interactive Model Selector Pills Grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {language === 'ar'
                    ? 'جرّب تبديل الموديلات فورياً وشاهد تفاصيلها بالصورة:'
                    : 'Switch featured models to preview on device:'}
                </span>
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {HERO_FEATURED_MODELS.map((item, idx) => {
                  const isSelected = idx === activeModelIndex;
                  const itemBadge = language === 'ar' ? item.badgeAr : item.badgeEn;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveModelIndex(idx)}
                      className={`text-start p-2.5 rounded-xl border transition-all text-xs cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? 'border-amber-500 bg-amber-950/40 text-white ring-1 ring-amber-500/60 shadow-lg'
                          : 'border-stone-800 bg-stone-900/70 text-stone-300 hover:border-stone-700 hover:bg-stone-900'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-base">{item.nicheEmoji}</span>
                        <span className="text-[10px] font-mono font-bold text-amber-400 bg-stone-950/70 px-1.5 py-0.5 rounded">
                          {item.priceEGP} {language === 'ar' ? 'ج.م' : 'EGP'}
                        </span>
                      </div>

                      <div className="font-bold text-stone-200 truncate text-[11px]">{itemBadge}</div>
                      <div className="text-[10px] text-stone-400 truncate mt-0.5">{item.device}</div>

                      {isSelected && (
                        <div className={`absolute top-0 ${isRtl ? 'right-0 rounded-bl' : 'left-0 rounded-br'} w-2 h-2 bg-amber-400`}></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenStudio}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black rounded-xl text-xs sm:text-sm shadow-xl shadow-amber-500/20 flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>{language === 'ar' ? 'اكتب اسمك على الموديل الحالي ✏️' : 'Personalize Current Model ✏️'}</span>
              </button>

              {onOpenAiStudio && (
                <button
                  onClick={onOpenAiStudio}
                  className="px-5 py-3.5 bg-gradient-to-r from-cyan-600 via-indigo-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-xl shadow-cyan-500/20 flex items-center gap-2 transition-transform active:scale-95 cursor-pointer border border-cyan-400/40"
                  title="استوديو التفكير الفائق وتوليد صور الهيرو والكونسبت آرت"
                >
                  <Brain className="w-4 h-4 text-cyan-200 animate-pulse" />
                  <span>{language === 'ar' ? 'استوديو التفكير وصور AI ⚡' : 'AI Thinking & Images ⚡'}</span>
                </button>
              )}

              <button
                onClick={onExploreCatalog}
                className="px-5 py-3.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white font-bold rounded-xl text-xs sm:text-sm border border-stone-700 transition-colors cursor-pointer"
              >
                {t.heroCtaBrowse} ⬇️
              </button>
            </div>

          </div>

          {/* Right Column: Dynamic Live Showcase Card for Active Model */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 shadow-2xl group">
              
              {/* Product Visual */}
              <div className="relative aspect-square w-full overflow-hidden bg-stone-900">
                <img
                  src={currentModel.image}
                  alt={language === 'ar' ? currentModel.titleAr : currentModel.titleEn}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />

                {/* Top Badge */}
                <div className={`absolute top-3 ${isRtl ? 'right-3' : 'left-3'} px-3 py-1 rounded-full bg-stone-950/85 backdrop-blur-md border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1 shadow-md`}>
                  <span>{currentModel.nicheEmoji}</span>
                  <span>{language === 'ar' ? currentModel.badgeAr : currentModel.badgeEn}</span>
                </div>

                {/* Price Tag */}
                <div className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'} px-3 py-1 rounded-full bg-emerald-950/90 backdrop-blur-md border border-emerald-500/60 text-emerald-300 font-black font-mono text-xs shadow-md`}>
                  {currentModel.priceEGP} {language === 'ar' ? 'ج.م فقط' : 'EGP only'}
                </div>

                {/* Bottom Overlay Info & Action */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-stone-950 via-stone-950/85 to-transparent">
                  <div className="flex items-end justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-stone-400 block font-semibold">
                        {language === 'ar'
                          ? `متوافق مع ${currentModel.device} و 20+ طراز آخر`
                          : `Compatible with ${currentModel.device} & 20+ devices`}
                      </span>
                      <h3 className="text-white font-black text-sm line-clamp-1">
                        {language === 'ar' ? currentModel.titleAr : currentModel.titleEn}
                      </h3>
                      <p className="text-stone-300 text-[11px] line-clamp-1">
                        {language === 'ar' ? currentModel.subtitleAr : currentModel.subtitleEn}
                      </p>
                    </div>

                    <button
                      onClick={onOpenStudio}
                      className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-xl shadow shrink-0 active:scale-95 transition-all cursor-pointer"
                    >
                      {language === 'ar' ? 'تخصيص ✨' : 'Customize ✨'}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Niche Navigation Bar: Fast Jumping to Subcultures */}
        <div className="mt-10 pt-6 border-t border-stone-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <span className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
              <span>{language === 'ar' ? 'انزل تفرّج على أشكال الموديلات حسب اهتمامك:' : 'Browse designs categorized by your interest:'}</span>
            </span>
            <span className="text-[11px] text-stone-500">
              {language === 'ar' ? 'اضغط على أي قسم للانتقال الفوري' : 'Click any category for instant scroll'}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            {nicheTabs.map((niche) => (
              <button
                key={niche.id}
                onClick={() => handleNicheClick(niche.id)}
                className="px-3.5 py-2 rounded-xl bg-stone-900/90 hover:bg-amber-500 hover:text-stone-950 text-stone-300 border border-stone-800 hover:border-amber-400 font-bold whitespace-nowrap transition-all shadow-sm shrink-0 cursor-pointer"
              >
                {niche.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
