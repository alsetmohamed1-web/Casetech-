import React, { useState, useEffect } from 'react';
import { Search, Sparkles, ArrowUpDown, Smartphone, Check, LayoutGrid, Grid3X3, Zap, Shield, Flame, ChevronRight, ChevronLeft, Scale, Trash2 } from 'lucide-react';
import { Product, Currency, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { ProductComparisonModal } from './ProductComparisonModal';
import { useLanguage } from '../context/LanguageContext';
import { CURRENCIES } from '../data/products';

interface CatalogSectionProps {
  products: Product[];
  currency: Currency;
  onCustomize: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onViewReviews: (product: Product) => void;
  onShareProduct?: (product: Product) => void;
  onPriceAlert?: (product: Product) => void;
  onSimulateLeather?: (product: Product) => void;
  selectedCategory?: ProductCategory;
  onCategoryChange?: (category: ProductCategory) => void;
  showDropshipMargins?: boolean;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  currency,
  onCustomize,
  onQuickAdd,
  onViewReviews,
  onShareProduct,
  onPriceAlert,
  onSimulateLeather,
  selectedCategory = 'all',
  onCategoryChange,
  showDropshipMargins = true,
}) => {
  const { language, t, isRtl } = useLanguage();
  const [activeTab, setActiveTab] = useState<ProductCategory>(selectedCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'bestseller' | 'price-asc' | 'price-desc' | 'rating'>('bestseller');
  const [previewDevice, setPreviewDevice] = useState<'iPhone 16 Pro Max' | 'iPhone 15 Pro' | 'Galaxy S25 Ultra' | 'Galaxy S24 Ultra'>('iPhone 16 Pro Max');
  const [density, setDensity] = useState<'standard' | 'compact'>('compact'); // Default to high-efficiency multi-item per row view!
  const [animeHeroFilter, setAnimeHeroFilter] = useState<string>('all');
  const [aestheticFilter, setAestheticFilter] = useState<string>('all');
  const [selectedCompareProductIds, setSelectedCompareProductIds] = useState<string[]>([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  const handleToggleCompare = (product: Product) => {
    setSelectedCompareProductIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, product.id];
    });
  };

  const currencyConfig = CURRENCIES[currency] || CURRENCIES.USD;
  const currencySymbol = language === 'ar' ? currencyConfig.symbolAr : currencyConfig.symbolEn;

  // Sync external prop if changed
  useEffect(() => {
    if (selectedCategory) {
      setActiveTab(selectedCategory);
    }
  }, [selectedCategory]);

  const handleTabChange = (newTab: ProductCategory) => {
    setActiveTab(newTab);
    if (onCategoryChange) {
      onCategoryChange(newTab);
    }
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    // Tab filter
    if (activeTab === 'cases' && p.category !== 'cases') return false;
    if (activeTab === 'wallets' && p.category !== 'wallets') return false;
    if (activeTab === 'bestsellers' && !p.isBestseller) return false;
    if (activeTab === 'new-arrivals' && !p.isNewArrival) return false;
    if (activeTab === 'anime') {
      if (p.theme !== 'anime') return false;
      if (animeHeroFilter !== 'all') {
        const heroQuery = animeHeroFilter.toLowerCase();
        const heroMatch =
          p.nameAr.toLowerCase().includes(heroQuery) ||
          p.nameEn.toLowerCase().includes(heroQuery) ||
          p.descriptionAr.toLowerCase().includes(heroQuery) ||
          p.tagAr.toLowerCase().includes(heroQuery);
        if (!heroMatch) return false;
      }
    }
    if (activeTab === 'aesthetic-florals') {
      if (p.theme !== 'aesthetic-florals') return false;
      if (aestheticFilter !== 'all') {
        const aesQuery = aestheticFilter.toLowerCase();
        const aesMatch =
          p.nameAr.toLowerCase().includes(aesQuery) ||
          p.nameEn.toLowerCase().includes(aesQuery) ||
          p.descriptionAr.toLowerCase().includes(aesQuery) ||
          p.tagAr.toLowerCase().includes(aesQuery);
        if (!aesMatch) return false;
      }
    }
    if (activeTab === 'football' && p.theme !== 'football') return false;
    if (activeTab === 'egyptian-icons' && p.theme !== 'egyptian-icons') return false;
    if (activeTab === 'music-legends' && p.theme !== 'music-legends') return false;
    if (activeTab === 'nature-calligraphy' && p.theme !== 'nature-calligraphy') return false;
    if (activeTab === 'islamic-calligraphy' && p.theme !== 'islamic-calligraphy') return false;
    if (activeTab === 'cars-motorsport' && p.theme !== 'cars-motorsport') return false;
    if (activeTab === 'cosmic-galaxy' && p.theme !== 'cosmic-galaxy') return false;
    if (activeTab === 'trending-pop' && p.theme !== 'trending-pop') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.nameAr.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q);
      const matchDesc = p.descriptionAr.toLowerCase().includes(q) || p.descriptionEn.toLowerCase().includes(q);
      const matchTheme = p.themeNameAr?.toLowerCase().includes(q) || p.theme?.toLowerCase().includes(q);
      const matchTag = p.tagAr.toLowerCase().includes(q) || p.tagEn.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchTheme && !matchTag) return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
    return (b.salesCount || 0) - (a.salesCount || 0);
  });

  const CATEGORY_TABS = [
    { id: 'all', label: language === 'ar' ? 'الكل (جميع الموديلات)' : 'All Models', emoji: '🌟' },
    { id: 'football', label: language === 'ar' ? 'كورة وأندية' : 'Football & Clubs', emoji: '⚽' },
    { id: 'anime', label: language === 'ar' ? 'أنمي وجيمينج' : 'Anime & Gaming', emoji: '⚔️' },
    { id: 'islamic-calligraphy', label: language === 'ar' ? 'خط عربي وإسلاميات' : 'Islamic Calligraphy', emoji: '✒️' },
    { id: 'aesthetic-florals', label: language === 'ar' ? 'ماربل وبنات وفلورال' : 'Marble & Florals', emoji: '🌸' },
    { id: 'cars-motorsport', label: language === 'ar' ? 'عربيات وسرعة' : 'Racing & Supercars', emoji: '🏎️' },
    { id: 'egyptian-icons', label: language === 'ar' ? 'نوستالجيا وفلكلور مصري' : 'Egyptian Nostalgia', emoji: '🇪🇬' },
    { id: 'wallets', label: language === 'ar' ? 'محافظ جلد طبيعي' : 'Leather Wallets', emoji: '💎' },
    { id: 'cases', label: language === 'ar' ? 'كفرات الهواتف فقط' : 'Phone Cases Only', emoji: '📱' },
    { id: 'bestsellers', label: language === 'ar' ? 'الأكثر طلباً' : 'Bestsellers', emoji: '🔥' },
    { id: 'new-arrivals', label: language === 'ar' ? 'أحدث الإضافات' : 'New Arrivals', emoji: '✨' },
  ];

  // Quick Speed Strip Items: 8 diverse shapes & aesthetics for instant comparison in 1 row
  const SPEED_STRIP_ITEMS = [
    {
      id: 'strip-1',
      titleAr: 'درع الصدمات التكتيكي Armor',
      titleEn: 'Tactical Armor Shield',
      shapeAr: 'مزدوج الطبقات 3m Drop',
      shapeEn: 'Dual Layer 3m Drop',
      icon: '🛡️',
      price: 229,
      image: '/src/assets/images/product_case_tough_magsafe_1793491263615.jpg',
      themeAr: 'حماية قصوى',
      badgeAr: 'الأقوى تحملاً',
      glow: 'border-cyan-500/60 shadow-cyan-900/30',
    },
    {
      id: 'strip-2',
      titleAr: 'ماج سيف أساطير الأنمي 3D (لوفي وجوجو)',
      titleEn: 'Anime Legends Luffy & Gojo 3D',
      shapeAr: 'طباعة UV يابانية وصواعق نيون',
      shapeEn: 'Japanese 3D UV & Neon Lightning',
      icon: '⚡',
      price: 235,
      image: '/src/assets/images/anime_legends_case_1793666056294.jpg',
      themeAr: 'أنمي ياباني أسطوري',
      badgeAr: 'إله الشمس نيكا وجوجو',
      glow: 'border-violet-500/80 shadow-violet-900/40',
    },
    {
      id: 'strip-3',
      titleAr: 'كوكيت الدلع والأنوثة وفراشة روز جولد 24k',
      titleEn: 'Coquette Silk Bow & 24k Rose Gold',
      shapeAr: 'فيونكة حرير ولؤلؤ وماربل وردي',
      shapeEn: 'Silk Bow, Pearls & Blush Marble',
      icon: '🎀',
      price: 235,
      image: '/src/assets/images/coquette_feminine_case_1793666068751.jpg',
      themeAr: 'دلع وأنوثة راقية',
      badgeAr: 'الأكثر مبيعاً للبنات 🌸',
      glow: 'border-pink-500/80 shadow-pink-900/40',
    },
    {
      id: 'strip-4',
      titleAr: 'آية الكرسي ديواني مذهب 3D',
      titleEn: 'Ayat Al-Kursi 24k Gold',
      shapeAr: 'أسود مطفي حفر بارز',
      shapeEn: 'Matte Obsidian Embossed',
      icon: '✒️',
      price: 245,
      image: '/src/assets/images/islamic_gold_calligraphy_case_1793523903046.jpg',
      themeAr: 'خط عربي مذهب',
      badgeAr: 'فخامة ملكية',
      glow: 'border-yellow-500/60 shadow-yellow-900/30',
    },
    {
      id: 'strip-5',
      titleAr: 'سوبركارز GT3 كاربون فايبر',
      titleEn: 'Supercars GT3 Carbon',
      shapeAr: 'كاربون فايبر تكتيكي',
      shapeEn: 'Forged Carbon Tactical',
      icon: '🏎️',
      price: 235,
      image: '/src/assets/images/supercars_racing_case_1793523887729.jpg',
      themeAr: 'موتورسبورت',
      badgeAr: 'عشاق السرعة',
      glow: 'border-cyan-500/60 shadow-cyan-900/30',
    },
    {
      id: 'strip-6',
      titleAr: 'كفر النادي الأهلي الذهبي',
      titleEn: 'Al Ahly Golden Eagle',
      shapeAr: 'شوك بروف مقاوم للخدش',
      shapeEn: 'Shockproof Scratch-Free',
      icon: '⚽',
      price: 229,
      image: '/src/assets/images/football_case_1793495651444.jpg',
      themeAr: 'كورة وبطولات',
      badgeAr: 'نادي القرن',
      glow: 'border-red-500/60 shadow-red-900/30',
    },
    {
      id: 'strip-7',
      titleAr: 'محفظة جلد كستنائي محفورة',
      titleEn: 'Vintage Cognac Wallet',
      shapeAr: 'محفظة جيب كلاسيك',
      shapeEn: 'Classic Pocket Wallet',
      icon: '💎',
      price: 260,
      image: '/src/assets/images/product_wallet_leather_brown_1793491262869.jpg',
      themeAr: 'جلد طبيعي 100%',
      badgeAr: 'هاند ميد',
      glow: 'border-amber-500/60 shadow-amber-900/30',
    },
    {
      id: 'strip-8',
      titleAr: 'فلكلور مصر وأم كلثوم نيون',
      titleEn: 'Egyptian Icons Neon Art',
      shapeAr: 'هايبريد مات ضد الصدمات',
      shapeEn: 'Hybrid Matte Anti-Shock',
      icon: '🇪🇬',
      price: 229,
      image: '/src/assets/images/egypt_icons_case_1793495666188.jpg',
      themeAr: 'نوستالجيا مصرية',
      badgeAr: 'أصالة معاصرة',
      glow: 'border-emerald-500/60 shadow-emerald-900/30',
    },
  ];

  return (
    <section id="catalog" className="py-12 sm:py-16 bg-stone-950 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>
                {language === 'ar'
                  ? 'معرض كيستيك (CaseTech) الذكي · خيارات متعددة في وقت قياسي'
                  : 'CaseTech Smart Showroom · Multi-Shape Rapid Selection'}
              </span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="text-amber-400">
                {language === 'ar' ? 'طباعة UV يابانية وحماية عسكرية' : 'Japanese UV & Military Shield'}
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>{t.catalogTitle}</span>
              <span className="text-xs bg-gradient-to-r from-cyan-500 to-violet-500 text-stone-950 font-black px-2.5 py-1 rounded-lg">
                CaseTech™
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1.5 max-w-2xl leading-relaxed">
              {language === 'ar'
                ? 'تصفح تشكيلات الكفرات الذكية والمحافظ، وقارن بين أكثر من شكل وخامة مباشرة في نفس السطر لإتمام الشراء بسرعة وسلاسة.'
                : 'Explore smart cases & custom wallets, comparing multiple shapes and finishes in the same row for fast checkout.'}
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className={`w-4 h-4 text-stone-400 absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-3`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.catalogSearchPlaceholder}
              className={`w-full bg-stone-900 border border-stone-800 rounded-xl ${isRtl ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-cyan-500`}
            />
          </div>
        </div>

        {/* Device Switcher Bar: Lets user see their phone choice */}
        <div className="p-3 bg-stone-900/60 rounded-2xl border border-stone-800/80 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-300">
            <Smartphone className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-bold text-white">
              {language === 'ar' ? 'اختر موديل هاتفك للمعاينة:' : 'Select device model for preview:'}
            </span>
            <span className="text-stone-400 hidden sm:inline">
              {language === 'ar' ? '(جميع الأشكال متوفرة لـ 20+ طراز هاتف)' : '(All shapes available for 20+ phone models)'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(['iPhone 16 Pro Max', 'iPhone 15 Pro', 'Galaxy S25 Ultra', 'Galaxy S24 Ultra'] as const).map((dev) => (
              <button
                key={dev}
                onClick={() => setPreviewDevice(dev)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
                  previewDevice === dev
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-stone-950 font-black shadow'
                    : 'bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700'
                }`}
              >
                {previewDevice === dev && <Check className="w-3 h-3 text-stone-950" />}
                <span>{dev}</span>
              </button>
            ))}
          </div>
        </div>

        {/* INNOVATION: Dedicated Multi-Shape Speed Strip in 1 Line (شريط السرعة والتنوع المتعدد في سطر واحد) */}
        <div className="mb-8 p-4 bg-gradient-to-r from-stone-900 via-stone-900/80 to-stone-950 rounded-2xl border border-cyan-500/30 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">
                ⚡
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <span>{language === 'ar' ? 'شريط التنوع السريع في نفس السطر' : 'Single-Row Multi-Shape Speed Strip'}</span>
                  <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-mono">
                    8 خيارات جاهزة للشراء
                  </span>
                </h3>
                <p className="text-[11px] text-stone-400">
                  {language === 'ar'
                    ? 'تصفح أشكال الكفرات والخامات المتنوعة جنباً إلى جنب في سطر واحد للشراء الفوري دون عناء البحث.'
                    : 'Scan distinct case shapes & finishes side-by-side in one row for instant purchase without friction.'}
                </p>
              </div>
            </div>

            <span className="text-[11px] text-stone-400 flex items-center gap-1">
              <span>{language === 'ar' ? 'اسحب لمشاهدة باقي الأشكال' : 'Scroll horizontally for more shapes'}</span>
              <span>{isRtl ? '←' : '→'}</span>
            </span>
          </div>

          {/* Horizontal Scrolling Ribbon */}
          <div className="flex items-stretch gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-stone-700">
            {SPEED_STRIP_ITEMS.map((item) => {
              const itemPrice = (item.price * currencyConfig.rateFromUSD).toFixed(0);
              return (
                <div
                  key={item.id}
                  className={`min-w-[210px] max-w-[210px] sm:min-w-[230px] sm:max-w-[230px] shrink-0 bg-stone-950/80 rounded-xl border p-2.5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-200 group ${item.glow}`}
                >
                  <div>
                    {/* Image & Mini Badge */}
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-2 bg-stone-900">
                      <img
                        src={item.image}
                        alt={item.titleAr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-1.5 right-1.5 text-[9px] bg-stone-950/80 backdrop-blur-md text-amber-300 font-bold px-1.5 py-0.5 rounded border border-stone-800">
                        {item.icon} {item.badgeAr}
                      </span>
                    </div>

                    <div className="text-[10px] text-cyan-400 font-medium mb-0.5">
                      {item.themeAr}
                    </div>

                    <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
                      {language === 'ar' ? item.titleAr : item.titleEn}
                    </h4>

                    <div className="text-[10px] text-stone-400 mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>{language === 'ar' ? item.shapeAr : item.shapeEn}</span>
                    </div>
                  </div>

                  {/* Price & 1-Click Fast Add */}
                  <div className="mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between">
                    <span className="text-xs font-black text-white tabular-nums">
                      {itemPrice} <span className="text-[10px] text-amber-400 font-bold">{currencySymbol}</span>
                    </span>

                    <button
                      onClick={() => {
                        const targetProd = products.find((p) => p.image === item.image) || products[0];
                        onQuickAdd({
                          ...targetProd,
                          nameAr: item.titleAr,
                          nameEn: item.titleEn,
                          price: item.price,
                          tagAr: item.shapeAr,
                        });
                      }}
                      className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black rounded-lg text-[11px] flex items-center gap-1 shadow transition-all active:scale-95 cursor-pointer"
                      title={language === 'ar' ? 'شراء سريع وإضافة للسلة' : 'Quick buy this shape'}
                    >
                      <Zap className="w-3 h-3 fill-stone-950" />
                      <span>{language === 'ar' ? 'شراء ⚡' : 'Buy ⚡'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Interest Categories Tabs */}
        <div className="border-b border-stone-800/80 pb-4 mb-6 space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as ProductCategory)}
                  className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 via-violet-500 to-amber-500 text-stone-950 shadow-md shadow-cyan-500/20 scale-102 font-black'
                      : 'bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  <span>{tab.emoji}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Anime Legends Character Roster Bar (Shows when Anime tab is active) */}
          {activeTab === 'anime' && (
            <div className="p-3.5 bg-gradient-to-r from-purple-950/90 via-indigo-950/70 to-slate-900 rounded-2xl border border-purple-500/60 shadow-lg shadow-purple-900/40 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚔️</span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                      <span>{language === 'ar' ? 'أساطير الأنمي والمانجا الياباني 3D' : 'Mythic Anime & Manga Legends 3D'}</span>
                      <span className="text-[10px] font-mono bg-purple-900/90 text-purple-200 border border-purple-400/50 px-2 py-0.5 rounded-full font-bold">
                        領域展開 • 太陽の神ニカ • 神威
                      </span>
                    </h4>
                    <p className="text-[11px] text-purple-200/90">
                      {language === 'ar'
                        ? 'اختر بطلك الأسطوري لتصفح تصاميمه الخاصة المطبوعة بتقنية الـ UV البارزة ثلاثية الأبعاد وصواعق النيون المتوهجة.'
                        : 'Select your legendary anime hero to filter tactile 3D UV embossed designs and glowing neon lightning.'}
                    </p>
                  </div>
                </div>
                <div className="text-[11px] font-bold text-cyan-300 flex items-center gap-1.5 shrink-0 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-500/40">
                  <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>{language === 'ar' ? 'أجواء النيون الياباني مفعّلة ⚡' : 'Tokyo Neon Aura Active ⚡'}</span>
                </div>
              </div>

              {/* Hero Character Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                {[
                  { id: 'all', labelAr: 'الكل (جميع الأساطير)', labelEn: 'All Legends', icon: '🌟' },
                  { id: 'لوفي', labelAr: 'لوفي الجير 5 (نيكا)', labelEn: 'Luffy Gear 5 (Nika)', icon: '👑' },
                  { id: 'جوجو', labelAr: 'ساتورو جوجو (العيون الست)', labelEn: 'Gojo Satoru (Six Eyes)', icon: '👁️' },
                  { id: 'زورو', labelAr: 'زورو (ملك الجحيم وإينما)', labelEn: 'Zoro (King of Hell)', icon: '⚔️' },
                  { id: 'إيتاتشي', labelAr: 'إيتاتشي أوتشيها (سوسانو)', labelEn: 'Itachi (Susanoo)', icon: '🩸' },
                  { id: 'ليفاي', labelAr: 'ليفاي (فيلق الاستكشاف)', labelEn: 'Levi Ackerman', icon: '🗡️' },
                  { id: 'تانجيرو', labelAr: 'تانجيرو (تنفس الشمس)', labelEn: 'Tanjiro (Sun Breath)', icon: '🐉' },
                  { id: 'سولو', labelAr: 'سولو ليفيلنج (ملك الظلال)', labelEn: 'Solo Leveling (Arise)', icon: '🌑' },
                ].map((hero) => {
                  const isSelected = animeHeroFilter === hero.id;
                  return (
                    <button
                      key={hero.id}
                      onClick={() => setAnimeHeroFilter(hero.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 text-stone-950 font-black shadow-md shadow-purple-500/40 scale-102'
                          : 'bg-stone-900/90 text-purple-200 hover:text-white hover:bg-purple-950/80 border border-purple-500/40'
                      }`}
                    >
                      <span>{hero.icon}</span>
                      <span>{language === 'ar' ? hero.labelAr : hero.labelEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Interactive Feminine Coquette & Chic Glamour Bar (Shows when Aesthetic Florals tab is active) */}
          {activeTab === 'aesthetic-florals' && (
            <div className="p-3.5 bg-gradient-to-r from-pink-950/90 via-rose-950/70 to-stone-900 rounded-2xl border border-pink-500/60 shadow-lg shadow-pink-900/40 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎀</span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                      <span>{language === 'ar' ? 'ركن الأنوثة والدلع والشياكة الفاخرة' : 'Feminine Coquette Chic & Girly Glamour'}</span>
                      <span className="text-[10px] font-mono bg-pink-900/90 text-pink-200 border border-pink-400/50 px-2 py-0.5 rounded-full font-bold">
                        دلع • رقة • روز جولد 24k
                      </span>
                    </h4>
                    <p className="text-[11px] text-pink-200/90">
                      {language === 'ar'
                        ? 'كفرات رقيقة كقطعة مجوهرات؛ فيونكات كوكيت مخملية، فراشات الذهب الوردي 24k، لؤلؤ طبيعي، ورخام فرنسي مع إطار حماية مذهب.'
                        : 'Silky smooth coquette bows, 3D 24K rose gold butterflies, natural pearls, and French pastel marble.'}
                    </p>
                  </div>
                </div>
                <div className="text-[11px] font-bold text-pink-300 flex items-center gap-1.5 shrink-0 bg-pink-950/80 px-2.5 py-1 rounded-lg border border-pink-500/40">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                  <span>{language === 'ar' ? 'أجواء الدلع والأنوثة مفعّلة 🌸' : 'Girly Chic Aura Active 🌸'}</span>
                </div>
              </div>

              {/* Feminine Chic Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                {[
                  { id: 'all', labelAr: 'الكل (تشكيلة الدلع والأنوثة)', labelEn: 'All Girly Chic', icon: '🌸' },
                  { id: 'كوكيت', labelAr: 'فيونكات كوكيت ولؤلؤ ناعم', labelEn: 'Coquette Silk Bows', icon: '🎀' },
                  { id: 'فراشة', labelAr: 'فراشات ذهب وردي 24k مجوفة', labelEn: '24k Rose Gold Butterflies', icon: '🦋' },
                  { id: 'ساكورا', labelAr: 'زهور الساكورا اليابانية', labelEn: 'Sakura Cherry Blossom', icon: '🌸' },
                  { id: 'ماربل', labelAr: 'رخام كرارا وعروق ذهب سائل', labelEn: 'Carrara Marble & Gold', icon: '💎' },
                  { id: 'لافندر', labelAr: 'لافندر فرنسي وباستيل رقيق', labelEn: 'French Lavender Pastel', icon: '💜' },
                ].map((item) => {
                  const isSelected = aestheticFilter === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setAestheticFilter(item.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-stone-950 font-black shadow-md shadow-pink-500/40 scale-102'
                          : 'bg-stone-900/90 text-pink-200 hover:text-white hover:bg-pink-950/80 border border-pink-500/40'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{language === 'ar' ? item.labelAr : item.labelEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Results Counter, Sorter, and Density Mode Switcher (عرض متعدد في نفس السطر) */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400 pt-1">
            <span className="text-stone-300 font-medium">
              {language === 'ar' ? (
                <>
                  يتم عرض <strong className="text-cyan-400 font-bold">{sortedProducts.length}</strong> تصميماً جاهزاً لموديل <strong>{previewDevice}</strong>
                </>
              ) : (
                <>
                  Showing <strong className="text-cyan-400 font-bold">{sortedProducts.length}</strong> designs ready for <strong>{previewDevice}</strong>
                </>
              )}
            </span>

            <div className="flex items-center gap-3">
              {/* Density Toggle: 4-5 items per row vs Standard */}
              <div className="flex items-center gap-1 bg-stone-900 border border-stone-800 rounded-lg p-1">
                <button
                  onClick={() => setDensity('compact')}
                  className={`px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                    density === 'compact'
                      ? 'bg-cyan-500 text-stone-950 shadow'
                      : 'text-stone-400 hover:text-white'
                  }`}
                  title={language === 'ar' ? 'عرض مكثف: خيارات أكثر في نفس السطر' : 'Compact high-density multi-shape in line'}
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'عرض مكثف بالسطر (سريع)' : 'Dense Line View'}</span>
                </button>

                <button
                  onClick={() => setDensity('standard')}
                  className={`px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                    density === 'standard'
                      ? 'bg-cyan-500 text-stone-950 shadow'
                      : 'text-stone-400 hover:text-white'
                  }`}
                  title={language === 'ar' ? 'عرض قياسي واسع' : 'Standard View'}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'قياسي' : 'Standard'}</span>
                </button>
              </div>

              {/* Comparison Modal Launcher Button */}
              <button
                onClick={() => {
                  if (selectedCompareProductIds.length === 0) {
                    // Pre-select first 2 products for effortless instant demonstration if none selected yet
                    if (sortedProducts.length >= 2) {
                      setSelectedCompareProductIds([sortedProducts[0].id, sortedProducts[1].id]);
                    }
                  }
                  setIsComparisonModalOpen(true);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  selectedCompareProductIds.length > 0
                    ? 'bg-gradient-to-r from-cyan-500 to-amber-500 text-stone-950 border-cyan-400 font-black shadow-md shadow-cyan-500/20 animate-pulse'
                    : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-800 hover:text-white'
                }`}
                title={language === 'ar' ? 'مقارنة المنتجات والمواصفات جنبًا إلى جنب' : 'Compare Products Side-by-Side'}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'مقارنة المنتجات' : 'Compare'}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  selectedCompareProductIds.length > 0 ? 'bg-stone-950 text-cyan-300 font-bold' : 'bg-stone-800 text-stone-400'
                }`}>
                  {selectedCompareProductIds.length}/3
                </span>
              </button>

              {/* Sorter */}
              <div className="flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1 text-xs text-stone-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="bestseller">{t.catalogSortBestseller}</option>
                  <option value="price-asc">{t.catalogSortPriceAsc}</option>
                  <option value="price-desc">{t.catalogSortPriceDesc}</option>
                  <option value="rating">{t.catalogSortRating}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Visual Grid: Supports 4 to 5 cards per row when in compact mode! */}
        {sortedProducts.length === 0 ? (
          <div className="p-16 text-center text-stone-400 bg-stone-900/40 rounded-2xl border border-stone-800">
            <p className="text-sm font-semibold">{t.catalogNoResults}</p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 bg-gradient-to-r from-cyan-500 to-amber-500 text-stone-950 font-bold rounded-xl text-xs hover:opacity-90 transition-opacity"
            >
              {language === 'ar' ? 'عرض جميع الموديلات والتصاميم' : 'View All Models & Designs'}
            </button>
          </div>
        ) : (
          <div className={
            density === 'compact'
              ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4.5'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          }>
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                onCustomize={onCustomize}
                onQuickAdd={onQuickAdd}
                onViewReviews={onViewReviews}
                onShareProduct={onShareProduct}
                onPriceAlert={onPriceAlert}
                onSimulateLeather={onSimulateLeather}
                isSelectedForCompare={selectedCompareProductIds.includes(product.id)}
                onToggleCompare={handleToggleCompare}
                isCompareDisabled={selectedCompareProductIds.length >= 3 && !selectedCompareProductIds.includes(product.id)}
                showDropshipMargins={showDropshipMargins}
                density={density}
              />
            ))}
          </div>
        )}

        {/* Sticky Floating Compare Bar Dock */}
        {selectedCompareProductIds.length > 0 && (
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-stone-900/95 border-2 border-cyan-500/80 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-2xl shadow-cyan-950/70 flex items-center gap-3.5 max-w-[95vw] sm:max-w-xl animate-in slide-in-from-bottom-5 duration-300 ring-2 ring-cyan-500/20">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-500 text-stone-950 flex items-center justify-center font-black shrink-0 shadow">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-white">
                    {language === 'ar' ? 'مقارنة المنتجات' : 'Compare Products'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/40">
                    {selectedCompareProductIds.length}/3
                  </span>
                </div>
                <p className="text-[10px] text-stone-400 hidden sm:block">
                  {language === 'ar'
                    ? 'مقارنة حية للمتانة، الماج سيف، والأسعار'
                    : 'Side-by-side specs, MagSafe & prices'}
                </p>
              </div>
            </div>

            {/* Selected Thumbnails */}
            <div className="flex items-center -space-x-2 rtl:space-x-reverse overflow-hidden px-1">
              {selectedCompareProductIds.map((id) => {
                const prod = products.find((p) => p.id === id);
                if (!prod) return null;
                return (
                  <img
                    key={id}
                    src={prod.image}
                    alt={prod.nameAr}
                    className="w-8 h-8 rounded-lg object-cover border-2 border-stone-800 shadow"
                    title={language === 'ar' ? prod.nameAr : prod.nameEn}
                  />
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsComparisonModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-stone-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <span>{language === 'ar' ? 'فتح المقارنة ⚖️' : 'Compare ⚖️'}</span>
              </button>

              <button
                onClick={() => setSelectedCompareProductIds([])}
                className="p-2 text-stone-400 hover:text-red-400 hover:bg-stone-800 rounded-xl transition-colors cursor-pointer"
                title={language === 'ar' ? 'مسح التحديد' : 'Clear All'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Bottom Helper Bar for Instant Customization */}
        <div className="mt-12 p-4 bg-gradient-to-r from-cyan-950/40 via-stone-900 to-violet-950/30 border border-cyan-500/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">
                {language === 'ar'
                  ? 'لم تجد الرسمة أو النادي أو الشكل الذي تريده لهاتفك؟'
                  : "Haven't found the design, club, or case shape you need?"}
              </h4>
              <p className="text-stone-400 text-xs mt-0.5">
                {language === 'ar'
                  ? 'يمكنك رفع أي صورة أو شعار أو فكرة وسنقوم بطباعتها فوراً بماكينات UV يابانية 3D على أي شكل كفر تختاره!'
                  : 'Upload any artwork, photo, or club crest and we will print it in tactile 3D UV on any case shape you choose!'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onCustomize(products[0])}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 via-amber-500 to-amber-600 hover:from-cyan-400 hover:to-amber-500 text-stone-950 font-black rounded-xl whitespace-nowrap shadow-md transition-all active:scale-95 cursor-pointer text-xs"
          >
            {language === 'ar' ? 'افتح استوديو كيس تيك للتصميم الحر 🎨' : 'Open CaseTech Studio 🎨'}
          </button>
        </div>

        {/* Product Comparison Modal */}
        <ProductComparisonModal
          isOpen={isComparisonModalOpen}
          onClose={() => setIsComparisonModalOpen(false)}
          products={products.filter((p) => selectedCompareProductIds.includes(p.id))}
          currency={currency}
          onCustomize={onCustomize}
          onQuickAdd={onQuickAdd}
          onRemoveFromCompare={(id) =>
            setSelectedCompareProductIds((prev) => prev.filter((pId) => pId !== id))
          }
          onClearAll={() => setSelectedCompareProductIds([])}
        />

      </div>
    </section>
  );
};
