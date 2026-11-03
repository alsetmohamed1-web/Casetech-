import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { CustomizerModal } from './components/CustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { DropshipDashboardModal } from './components/DropshipDashboardModal';
import { OrderManagementModal } from './components/OrderManagementModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { GoogleSearchAgentModal } from './components/GoogleSearchAgentModal';
import { ProductReviewsModal } from './components/ProductReviewsModal';
import { SupplyChainAndBostaModal } from './components/SupplyChainAndBostaModal';
import { CreativeUnboxingModal } from './components/CreativeUnboxingModal';
import { BrandIdentityAndAdsModal } from './components/BrandIdentityAndAdsModal';
import { OmnichannelMarketplaceModal } from './components/OmnichannelMarketplaceModal';
import { SideLoyaltyQuickDock } from './components/SideLoyaltyQuickDock';
import { BetaFeedbackModal } from './components/BetaFeedbackModal';
import { LoyaltyAndReferralModal } from './components/LoyaltyAndReferralModal';
import { ImmersiveCornersSection } from './components/ImmersiveCornersSection';
import { MediaUploadModal } from './components/MediaUploadModal';
import { AdminAndStaffModal, INITIAL_STAFF_MEMBERS } from './components/AdminAndStaffModal';
import { OfficialSocialAndChannelsModal } from './components/OfficialSocialAndChannelsModal';
import { SocialProofTicker } from './components/SocialProofTicker';
import { FaqAndTrust } from './components/FaqAndTrust';
import { Footer } from './components/Footer';
import { AiSalesBotWidget } from './components/AiSalesBotWidget';
import { SocialPostingSystemModal } from './components/SocialPostingSystemModal';
import { AiThinkingAndAssetStudioModal } from './components/AiThinkingAndAssetStudioModal';
import { LeatherColorSimulatorModal } from './components/LeatherColorSimulatorModal';
import { PriceDropAlertsModal } from './components/PriceDropAlertsModal';
import { QuickShareModal } from './components/QuickShareModal';
import { OwnerAdminControlDrawer } from './components/OwnerAdminControlDrawer';
import { useLanguage } from './context/LanguageContext';

import { PRODUCTS as INITIAL_PRODUCTS, INITIAL_ORDERS } from './data/products';
import { Product, CartItem, Order, Currency, CustomizationState, ProductReview, ProductCategory, LoyaltyAccount, StaffMember, StaffRole } from './types';
import { Sparkles, Sliders, Globe, Truck, Gift, Palette, Layers, Flame, Share2, Zap, Crown, Camera, Users, Eye, ShieldCheck, Brain, BellRing, Compass, Sparkle, ShoppingBag } from 'lucide-react';

export default function App() {
  const { language, isRtl, t } = useLanguage();

  // Global States
  const [currency, setCurrency] = useState<Currency>('EGP');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Staff and Admin Role State
  const [staffList, setStaffList] = useState<StaffMember[]>(() => {
    try {
      const saved = localStorage.getItem('naqsh_staff_list');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_STAFF_MEMBERS;
  });
  const [currentStaffRole, setCurrentStaffRole] = useState<StaffRole>('super_admin');

  // Loyalty & Rewards State
  const [loyaltyAccount, setLoyaltyAccount] = useState<LoyaltyAccount>(() => {
    try {
      const saved = localStorage.getItem('naqsh_loyalty_account');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      points: 250,
      tier: 'silver',
      lifetimeEarned: 250,
      totalOrders: 0,
      referralCode: 'NAQSH-VIP-782',
      successfulReferrals: 1,
      referralCreditsEGP: 100,
      selectedGiftId: 'gift-keychain',
    };
  });

  // Modals Visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizerType, setCustomizerType] = useState<'case' | 'wallet'>('case');
  const [customizerProductId, setCustomizerProductId] = useState<string | undefined>(undefined);
  const [customizerUploadedImage, setCustomizerUploadedImage] = useState<string | undefined>(undefined);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDropshipPortalOpen, setIsDropshipPortalOpen] = useState(false);
  const [isOMSOpen, setIsOMSOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isSearchAgentOpen, setIsSearchAgentOpen] = useState(false);
  const [isSupplyChainOpen, setIsSupplyChainOpen] = useState(false);
  const [isUnboxingModalOpen, setIsUnboxingModalOpen] = useState(false);
  const [isBrandKitModalOpen, setIsBrandKitModalOpen] = useState(false);
  const [isOmnichannelOpen, setIsOmnichannelOpen] = useState(false);
  const [isBetaFeedbackOpen, setIsBetaFeedbackOpen] = useState(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);
  const [isMediaUploadOpen, setIsMediaUploadOpen] = useState(false);
  const [isAdminStaffOpen, setIsAdminStaffOpen] = useState(false);
  const [isOfficialSocialOpen, setIsOfficialSocialOpen] = useState(false);
  const [isSocialPostingOpen, setIsSocialPostingOpen] = useState(false);
  const [isAiStudioOpen, setIsAiStudioOpen] = useState(false);
  const [aiStudioInitialTab, setAiStudioInitialTab] = useState<'thinking' | 'image_generator'>('thinking');
  const [activePromoCode, setActivePromoCode] = useState<string>('Dody15');

  // Leather Simulator, Real-time Price Drop Radar & Quick Share states
  const [isLeatherSimOpen, setIsLeatherSimOpen] = useState(false);
  const [isPriceAlertsOpen, setIsPriceAlertsOpen] = useState(false);
  const [isQuickShareOpen, setIsQuickShareOpen] = useState(false);
  const [selectedShareProduct, setSelectedShareProduct] = useState<Product | null>(null);
  const [selectedPriceAlertDevice, setSelectedPriceAlertDevice] = useState<string | undefined>(undefined);

  const handleShareProduct = (product: Product) => {
    setSelectedShareProduct(product);
    setIsQuickShareOpen(true);
  };

  const handlePriceAlert = (product: Product) => {
    setSelectedPriceAlertDevice(product.nameAr);
    setIsPriceAlertsOpen(true);
  };

  const handleSimulateLeather = () => {
    setIsLeatherSimOpen(true);
  };

  // Reviews Modal state
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [selectedReviewProduct, setSelectedReviewProduct] = useState<Product | null>(null);

  // Customer View vs Store Owner / Admin Mode
  const [isCustomerView, setIsCustomerView] = useState(true);
  const [showDropshipMargins, setShowDropshipMargins] = useState(false);

  // Active Catalog Category & Dynamic Site Atmosphere
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState<ProductCategory>('all');
  const [siteAtmosphereOverride, setSiteAtmosphereOverride] = useState<'default' | 'anime' | 'feminine_coquette' | null>(null);

  const activeAtmosphere: 'default' | 'anime' | 'feminine_coquette' = siteAtmosphereOverride || (
    selectedCatalogCategory === 'anime'
      ? 'anime'
      : selectedCatalogCategory === 'aesthetic-florals'
        ? 'feminine_coquette'
        : 'default'
  );

  const handleSetAtmosphere = (mode: 'default' | 'anime' | 'feminine_coquette') => {
    setSiteAtmosphereOverride(mode);
    if (mode === 'anime') {
      setSelectedCatalogCategory('anime');
    } else if (mode === 'feminine_coquette') {
      setSelectedCatalogCategory('aesthetic-florals');
    }
    const catalog = document.getElementById('catalog');
    if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCartWithCustomization = (customization: CustomizationState, quantity: number) => {
    const product = products.find((p) => p.id === customization.productId) || products[0];
    const customizationFee = customization.foilType === 'gold' || customization.foilType === 'silver' ? 3.0 : 0;
    const unitPrice = product.price + customizationFee;

    const newItem: CartItem = {
      cartId: `cart-${Date.now()}-${Math.random()}`,
      product,
      customization,
      quantity,
      unitPrice,
    };

    setCartItems((prev) => [newItem, ...prev]);
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product) => {
    const newItem: CartItem = {
      cartId: `cart-${Date.now()}-${Math.random()}`,
      product,
      quantity: 1,
      unitPrice: product.price,
    };
    setCartItems((prev) => [newItem, ...prev]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Order Management operations
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders((prev) => prev.map((ord) => (ord.id === updatedOrder.id ? updatedOrder : ord)));
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  // Open customizer with product context
  const handleOpenCustomizerForProduct = (product: Product) => {
    setCustomizerType(product.category === 'cases' ? 'case' : 'wallet');
    setCustomizerProductId(product.id);
    setIsCustomizerOpen(true);
  };

  // Open reviews modal for a product
  const handleOpenReviewsModal = (product: Product) => {
    setSelectedReviewProduct(product);
    setIsReviewsModalOpen(true);
  };

  // Add new customer review
  const handleAddReview = (productId: string, newReviewData: Omit<ProductReview, 'id'>) => {
    const fullReview: ProductReview = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const currentReviews = p.reviews || [];
          const updatedReviews = [fullReview, ...currentReviews];
          const newCount = (p.reviewsCount || currentReviews.length) + 1;
          const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          const newRating = Number((totalRating / updatedReviews.length).toFixed(2));

          const updatedProduct = {
            ...p,
            reviews: updatedReviews,
            reviewsCount: newCount,
            rating: newRating,
          };

          if (selectedReviewProduct?.id === productId) {
            setSelectedReviewProduct(updatedProduct);
          }

          return updatedProduct;
        }
        return p;
      })
    );
  };

  const handleNavigateSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      const catalog = document.getElementById('catalog');
      if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className={`min-h-screen text-stone-100 flex flex-col font-cairo transition-colors duration-700 relative overflow-x-hidden ${
        activeAtmosphere === 'anime'
          ? 'bg-[#06020e] selection:bg-cyan-400 selection:text-stone-950'
          : activeAtmosphere === 'feminine_coquette'
            ? 'bg-[#120511] selection:bg-pink-400 selection:text-stone-950'
            : 'bg-stone-950 selection:bg-amber-800 selection:text-white'
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Dynamic Anime Ambient Background Lighting & Tokyo Cyberpunk Kanji Particles */}
      {activeAtmosphere === 'anime' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[650px] bg-gradient-to-b from-purple-600/25 via-indigo-600/18 to-transparent blur-3xl rounded-full"></div>
          <div className="absolute top-1/4 -right-20 w-[550px] h-[550px] bg-cyan-500/18 blur-3xl rounded-full"></div>
          <div className="absolute top-1/2 -left-20 w-[550px] h-[550px] bg-rose-600/16 blur-3xl rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-[600px] h-[400px] bg-violet-600/15 blur-3xl rounded-full"></div>

          {/* Floating Subtle Tokyo Kanji Watermarks */}
          <div className="absolute top-36 right-10 text-6xl sm:text-8xl font-black text-purple-400/6 select-none font-sans tracking-widest hidden lg:block">
            領域展開
          </div>
          <div className="absolute top-96 left-8 text-6xl sm:text-7xl font-black text-cyan-400/6 select-none font-sans tracking-widest hidden lg:block">
            太陽の神
          </div>
          <div className="absolute top-[850px] right-6 text-6xl sm:text-7xl font-black text-rose-400/6 select-none font-sans tracking-widest hidden lg:block">
            神威 • 覇気
          </div>
        </div>
      )}

      {/* Dynamic Feminine Coquette Ambient Background Lighting & Sakura Petal Glow */}
      {activeAtmosphere === 'feminine_coquette' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[650px] bg-gradient-to-b from-pink-500/25 via-rose-500/18 to-transparent blur-3xl rounded-full"></div>
          <div className="absolute top-1/4 -right-20 w-[550px] h-[550px] bg-amber-400/12 blur-3xl rounded-full"></div>
          <div className="absolute top-1/2 -left-20 w-[550px] h-[550px] bg-pink-400/18 blur-3xl rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-[600px] h-[400px] bg-rose-400/15 blur-3xl rounded-full"></div>

          {/* Floating Sakura & Coquette Emblems */}
          <div className="absolute top-36 right-10 text-5xl sm:text-7xl text-pink-300/12 select-none hidden lg:block animate-pulse">
            🌸 ✨
          </div>
          <div className="absolute top-96 left-8 text-6xl sm:text-8xl text-pink-300/12 select-none hidden lg:block">
            🎀 💖
          </div>
          <div className="absolute top-[850px] right-6 text-5xl sm:text-7xl text-amber-200/12 select-none hidden lg:block">
            🦋 💎
          </div>
        </div>
      )}
      
      {/* Side Quick Dock: Cleanly docked on the edge, reveals Loyalty, Camera, AI Studio and Beta Perks on approach without covering header or products */}
      <SideLoyaltyQuickDock
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
        onOpenMediaUpload={() => setIsMediaUploadOpen(true)}
        onOpenAiStudio={() => setIsAiStudioOpen(true)}
        onOpenFeedback={() => setIsBetaFeedbackOpen(true)}
        onApplyCode={(code) => {
          setActivePromoCode(code);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Viewer / Supervisor Active Indicator Bar (when in Site Viewer Mode) */}
      {currentStaffRole === 'site_viewer' && (
        <div className="bg-blue-950/95 text-blue-200 border-b border-blue-600/60 py-1.5 px-4 text-xs flex items-center justify-between shadow-md relative z-10">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="font-bold">
              {language === 'ar'
                ? 'وضع المتابع والمشرف مفعل: صلاحيات مشاهدة ورصد الطلبات وحركة الزوار والتقييمات (بدون تعديل الأسعار أو حذف المنتجات).'
                : 'Site Monitor / Viewer Mode Active: Read-only live monitoring of orders, metrics, and customer flow.'}
            </span>
          </div>
          <button
            onClick={() => setCurrentStaffRole('super_admin')}
            className="px-2.5 py-0.5 rounded-lg bg-blue-700 hover:bg-blue-600 text-white font-bold text-[11px] transition-colors"
          >
            {language === 'ar' ? 'الرجوع لوضع المدير العام' : 'Switch to Super Admin'}
          </button>
        </div>
      )}

      {/* Top International & Domestic Notice Bar with Atmosphere Switchers */}
      <div className={`py-2 px-4 text-xs relative z-10 transition-colors border-b ${
        activeAtmosphere === 'anime'
          ? 'bg-gradient-to-r from-purple-950 via-slate-950 to-indigo-950 border-purple-500/40'
          : activeAtmosphere === 'feminine_coquette'
            ? 'bg-gradient-to-r from-pink-950 via-stone-950 to-rose-950 border-pink-500/40'
            : 'bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-cyan-800/40'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-stone-300">
          <div className="flex items-center gap-2 text-center sm:text-start">
            <span className={`w-2 h-2 rounded-full animate-ping ${
              activeAtmosphere === 'anime' ? 'bg-cyan-400' : activeAtmosphere === 'feminine_coquette' ? 'bg-pink-400' : 'bg-cyan-400'
            }`}></span>
            <span className="font-medium text-white flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
              <span className={`font-bold ${
                activeAtmosphere === 'anime' ? 'text-cyan-300' : activeAtmosphere === 'feminine_coquette' ? 'text-pink-300' : 'text-cyan-300'
              }`}>
                {activeAtmosphere === 'anime'
                  ? '⚔️ بُعد الأنمي مفعّل:'
                  : activeAtmosphere === 'feminine_coquette'
                    ? '🌸 مود الأنوثة والدلع مفعّل:'
                    : '🌍 جاهزون للطلبات الدولية (US, UK & EU):'}
              </span>
              <span>
                {activeAtmosphere === 'anime'
                  ? (language === 'ar' ? 'أجواء النيون الياباني وطلاسم الأبطال مشتعلة في الموقع بالكامل' : 'Tokyo Cyberpunk neon atmosphere glowing across the site')
                  : activeAtmosphere === 'feminine_coquette'
                    ? (language === 'ar' ? 'ماربل فرنسي، فيونكات كوكيت، وفراشات الذهب الوردي 24k' : 'Pastel blush marble, silk bows & 24k rose-gold butterflies')
                    : (language === 'ar' ? 'شحن سريع 3-5 أيام عبر DHL Express · دفع آمن بـ Apple Pay و PayPal' : 'Fast 3-5 Days Express Shipping via DHL Express')}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-wrap justify-center">
            {/* Quick Atmosphere Toggles */}
            <div className="flex items-center gap-1 bg-stone-900/90 rounded-lg p-0.5 border border-stone-800 text-xs">
              <button
                onClick={() => handleSetAtmosphere('anime')}
                className={`px-2 py-0.5 rounded font-black flex items-center gap-1 transition-all ${
                  activeAtmosphere === 'anime'
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-stone-950 shadow-sm'
                    : 'text-purple-300 hover:text-white'
                }`}
                title="تفعيل أجواء وبُعد الأنمي والنيون الياباني"
              >
                <span>⚔️</span>
                <span>{language === 'ar' ? 'الأنمي 3D' : 'Anime'}</span>
              </button>

              <button
                onClick={() => handleSetAtmosphere('feminine_coquette')}
                className={`px-2 py-0.5 rounded font-black flex items-center gap-1 transition-all ${
                  activeAtmosphere === 'feminine_coquette'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-stone-950 shadow-sm'
                    : 'text-pink-300 hover:text-white'
                }`}
                title="تفعيل أجواء الدلع والأنوثة والفيونكات الوردية"
              >
                <span>🌸</span>
                <span>{language === 'ar' ? 'الدلع والأنوثة' : 'Coquette'}</span>
              </button>

              <button
                onClick={() => handleSetAtmosphere('default')}
                className={`px-2 py-0.5 rounded font-bold flex items-center gap-1 transition-all ${
                  activeAtmosphere === 'default'
                    ? 'bg-amber-600 text-stone-950 shadow-sm font-black'
                    : 'text-stone-400 hover:text-white'
                }`}
                title="الرجوع للوضع الملكي الفاخر"
              >
                <span>👑</span>
                <span>{language === 'ar' ? 'فاخر' : 'Luxury'}</span>
              </button>
            </div>

            {/* Official Social Channels & COD Liability Guarantee */}
            <button
              onClick={() => setIsOfficialSocialOpen(true)}
              className="text-amber-300 hover:text-white font-bold flex items-center gap-1.5 bg-gradient-to-r from-amber-700/50 to-stone-800 px-2.5 py-0.5 rounded border border-amber-500/50 shadow-sm text-xs cursor-pointer"
              title="صفحات التواصل الموثقة وضمان مسؤولية الدفع والتوصيل"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'ar' ? 'حساباتنا الرسمية وضمان الدفع 🛡️' : 'Official Channels & COD 🛡️'}</span>
            </button>

            {/* Quick Share Modal Button */}
            <button
              onClick={() => {
                setSelectedShareProduct(products[0]);
                setIsQuickShareOpen(true);
              }}
              className="text-emerald-200 hover:text-white font-black flex items-center gap-1.5 bg-gradient-to-r from-emerald-900/60 to-teal-900/60 hover:from-emerald-800 hover:to-teal-800 px-2 py-0.5 rounded border border-emerald-500/50 shadow-sm text-xs transition-colors cursor-pointer"
              title="مشاركة سريعة بنقرة واحدة عبر واتساب وتيليجرام ورمز QR"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'ar' ? 'مشاركة 🚀' : 'Share 🚀'}</span>
            </button>

            {/* Loyalty club button in top bar */}
            <button
              onClick={() => setIsLoyaltyOpen(true)}
              className="text-amber-300 hover:text-white font-bold flex items-center gap-1.5 bg-gradient-to-r from-amber-600/40 to-yellow-600/40 px-2.5 py-0.5 rounded border border-amber-500/50 shadow-sm text-xs cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.navLoyalty}</span>
            </button>

            {/* Admin & Store Owner Internal Tools (Hidden in Customer View) */}
            {!isCustomerView && (
              <>
                <span className="text-stone-600">·</span>
                <button
                  onClick={() => setIsLeatherSimOpen(true)}
                  className="text-amber-200 hover:text-white font-black flex items-center gap-1 bg-amber-900/60 px-2 py-0.5 rounded border border-amber-500/40 text-xs"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>محاكي الجلد</span>
                </button>
                <button
                  onClick={() => setIsPriceAlertsOpen(true)}
                  className="text-cyan-200 hover:text-white font-black flex items-center gap-1 bg-cyan-900/60 px-2 py-0.5 rounded border border-cyan-500/40 text-xs"
                >
                  <BellRing className="w-3 h-3 text-cyan-400" />
                  <span>تنبيهات الأسعار</span>
                </button>
                <button
                  onClick={() => setIsMediaUploadOpen(true)}
                  className="text-emerald-300 hover:text-white font-bold flex items-center gap-1 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-500/40 text-xs"
                >
                  <Camera className="w-3 h-3 text-emerald-400" />
                  <span>رفع صور</span>
                </button>
                <button
                  onClick={() => setIsAdminStaffOpen(true)}
                  className="text-blue-300 hover:text-white font-bold flex items-center gap-1 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/40 text-xs"
                >
                  <Users className="w-3 h-3 text-blue-400" />
                  <span>فريق العمل</span>
                </button>
                <button
                  onClick={() => setIsSupplyChainOpen(true)}
                  className="text-emerald-300 hover:text-white font-bold flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40 text-xs"
                >
                  <Zap className="w-3 h-3 text-emerald-400" />
                  <span>بوسطة والمطابع</span>
                </button>
                <button
                  onClick={() => setIsOmnichannelOpen(true)}
                  className="text-amber-300 hover:text-white font-bold flex items-center gap-1 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40 text-xs"
                >
                  <ShoppingBag className="w-3 h-3 text-amber-400" />
                  <span>أمازون ونون</span>
                </button>
                <button
                  onClick={() => setIsOMSOpen(true)}
                  className="text-emerald-400 hover:text-emerald-300 font-bold underline text-xs"
                >
                  OMS
                </button>
                <button
                  onClick={() => setShowDropshipMargins(!showDropshipMargins)}
                  className="text-[11px] text-stone-400 hover:text-white"
                >
                  {showDropshipMargins ? 'إخفاء الهوامش' : 'إظهار الهوامش'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Primary Top Bar (Navbar) */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenStudio={() => {
          setCustomizerType('case');
          setCustomizerProductId(undefined);
          setIsCustomizerOpen(true);
        }}
        onOpenDropshipPortal={() => setIsDropshipPortalOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenSearchAgent={() => setIsSearchAgentOpen(true)}
        onOpenSupplyChain={() => setIsSupplyChainOpen(true)}
        onOpenUnboxingModal={() => setIsUnboxingModalOpen(true)}
        onOpenBrandKitModal={() => setIsBrandKitModalOpen(true)}
        onOpenOmnichannel={() => setIsOmnichannelOpen(true)}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
        onOpenMediaUpload={() => setIsMediaUploadOpen(true)}
        onOpenAdminStaff={() => setIsAdminStaffOpen(true)}
        onOpenOfficialSocial={() => setIsOfficialSocialOpen(true)}
        onOpenSocialPosting={() => setIsSocialPostingOpen(true)}
        onOpenAiStudio={() => {
          setAiStudioInitialTab('thinking');
          setIsAiStudioOpen(true);
        }}
        currency={currency}
        onChangeCurrency={setCurrency}
        onNavigateSection={handleNavigateSection}
      />

      {/* Dynamic Anime Realm Atmosphere Banner */}
      {activeAtmosphere === 'anime' && (
        <div className="bg-gradient-to-r from-purple-950/95 via-[#0c0422] to-indigo-950/95 border-b border-purple-500/50 py-2.5 px-4 text-xs shadow-lg shadow-purple-900/40 sticky top-18 z-30 backdrop-blur-md animate-fadeIn">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-purple-200">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              <div className="font-bold flex items-center gap-2 flex-wrap text-stone-200">
                <span className="text-cyan-300 font-black flex items-center gap-1">
                  <span>⚔️ بُعد الأنمي والمانجا الياباني (Tokyo Cyberpunk):</span>
                </span>
                <span className="text-xs text-purple-200/90">
                  {language === 'ar'
                    ? 'ألوان الموقع تحولت بالكامل لتلائم هالات النيون وصواعق الأبطال (لوفي نيكا، جوجو العيون الست، زورو ملك الجحيم، إيتاتشي سوسانو)'
                    : 'The website colors have transformed into Tokyo Cyberpunk Neon aura to match legendary anime heroes'}
                </span>
                <span className="text-[10px] bg-purple-900 text-purple-200 border border-purple-400/40 px-2 py-0.5 rounded-full font-mono font-bold hidden sm:inline-block">
                  領域展開 • 太陽の神 • 神威
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleSetAtmosphere('feminine_coquette')}
                className="px-2.5 py-1 rounded-lg bg-pink-950/80 hover:bg-pink-900 text-pink-300 text-[11px] font-bold border border-pink-500/40 transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>🌸</span>
                <span>{language === 'ar' ? 'مود الدلع والأنوثة' : 'Coquette Chic'}</span>
              </button>
              <button
                onClick={() => handleSetAtmosphere('default')}
                className="px-2.5 py-1 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 text-[11px] font-bold border border-stone-700 transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>👑</span>
                <span>{language === 'ar' ? 'الفخامة الملكية' : 'Classic Luxury'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Feminine Coquette Atmosphere Banner */}
      {activeAtmosphere === 'feminine_coquette' && (
        <div className="bg-gradient-to-r from-pink-950/95 via-[#190617] to-rose-950/95 border-b border-pink-500/50 py-2.5 px-4 text-xs shadow-lg shadow-pink-900/40 sticky top-18 z-30 backdrop-blur-md animate-fadeIn">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-pink-200">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-ping"></span>
              <div className="font-bold flex items-center gap-2 flex-wrap text-stone-200">
                <span className="text-pink-300 font-black flex items-center gap-1">
                  <span>🌸 ركن الأنوثة والدلع والأناقة الرقيقة (Coquette Glamour):</span>
                </span>
                <span className="text-xs text-pink-200/90">
                  {language === 'ar'
                    ? 'ألوان الموقع تحولت إلى الماربل الوردي الفرنسي ولؤلؤ الكوكيت وفراشات الذهب الوردي 24k وزهور الساكورا'
                    : 'The website colors have transformed into soft pastel blush, silk ribbons, 24k rose gold butterflies & pearls'}
                </span>
                <span className="text-[10px] bg-pink-900 text-pink-200 border border-pink-400/40 px-2 py-0.5 rounded-full font-mono font-bold hidden sm:inline-block">
                  دلع • رقة • 24k Rose Gold
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleSetAtmosphere('anime')}
                className="px-2.5 py-1 rounded-lg bg-purple-950/80 hover:bg-purple-900 text-purple-300 text-[11px] font-bold border border-purple-500/40 transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>⚔️</span>
                <span>{language === 'ar' ? 'بُعد الأنمي 3D' : 'Anime Realm'}</span>
              </button>
              <button
                onClick={() => handleSetAtmosphere('default')}
                className="px-2.5 py-1 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 text-[11px] font-bold border border-stone-700 transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>👑</span>
                <span>{language === 'ar' ? 'الفخامة الملكية' : 'Classic Luxury'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {/* Hero Section with interactive model previews and subcultures quick jump */}
        <Hero
          onOpenStudio={() => {
            setCustomizerType('case');
            setCustomizerProductId(undefined);
            setIsCustomizerOpen(true);
          }}
          onExploreCatalog={() => handleNavigateSection('catalog')}
          onOpenDropshipInfo={() => setIsDropshipPortalOpen(true)}
          onSelectNiche={(niche) => {
            setSiteAtmosphereOverride(null);
            setSelectedCatalogCategory(niche as ProductCategory);
            handleNavigateSection('catalog');
          }}
          onOpenAiStudio={() => {
            setAiStudioInitialTab('image_generator');
            setIsAiStudioOpen(true);
          }}
        />

        {/* Immersive Subculture Corners Section (Anime Cyber, Aesthetic Girls Marble, Football, Calligraphy, Motorsport) */}
        <ImmersiveCornersSection
          products={products}
          currency={currency}
          onOpenStudioForNiche={(nicheTheme, sampleImage) => {
            setCustomizerType('case');
            if (sampleImage) {
              setCustomizerUploadedImage(sampleImage);
            }
            setIsCustomizerOpen(true);
          }}
          onFilterCatalogByNiche={(cat) => {
            setSiteAtmosphereOverride(null);
            setSelectedCatalogCategory(cat as ProductCategory);
            handleNavigateSection('catalog');
          }}
          onQuickAddProduct={handleQuickAdd}
        />

        {/* Catalog Section with Bestsellers, New Arrivals, Cases, Wallets & Customer Reviews */}
        <CatalogSection
          products={products}
          currency={currency}
          onCustomize={handleOpenCustomizerForProduct}
          onQuickAdd={handleQuickAdd}
          onViewReviews={handleOpenReviewsModal}
          selectedCategory={selectedCatalogCategory}
          onCategoryChange={(cat) => {
            setSiteAtmosphereOverride(null);
            setSelectedCatalogCategory(cat);
          }}
          showDropshipMargins={!isCustomerView && showDropshipMargins}
          onShareProduct={handleShareProduct}
          onPriceAlert={handlePriceAlert}
          onSimulateLeather={handleSimulateLeather}
        />

        {/* Brand Identity & Creative Unboxing Feature Spotlight */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800/90 py-5 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Box 1: Creative Unboxing Spotlight */}
            <div
              onClick={() => setIsUnboxingModalOpen(true)}
              className="cursor-pointer group p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-900/90 to-stone-950 border border-stone-800 hover:border-amber-500/50 shadow-xl transition-all duration-300 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-108 transition-transform">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-amber-400 mb-0.5">
                    <span>تغليف إبداعي يُفاجئ المستلم</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400">Wow Factor</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    تجربة فتح الصندوق الملكية (Unboxing Experience)
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-1">
                    علبة مغناطيسية صلبة + ختم شمعي ياقوتي + جراب قطيفة + كرت عود ملكي وبطاقة NFC
                  </p>
                </div>
              </div>

              <span className="shrink-0 px-3 py-1.5 bg-amber-500 text-stone-950 text-xs font-bold rounded-xl shadow group-hover:bg-amber-400 transition-colors">
                شاهد المحاكاة ✨
              </span>
            </div>

            {/* Box 2: Premium Playful Brand Identity & Social Ads Spotlight */}
            <div
              onClick={() => setIsBrandKitModalOpen(true)}
              className="cursor-pointer group p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-900/90 to-stone-950 border border-stone-800 hover:border-purple-500/50 shadow-xl transition-all duration-300 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-108 transition-transform">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-purple-400 mb-0.5">
                    <span>الهوية البصرية المتفوقة</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-cyan-400">Premium Playful Vibe</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-purple-300 transition-colors">
                    أصول الهوية البصرية وإعلانات السوشيال ميديا
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-1">
                    لوحة ألوان رسمية + نصوص إعلانية موجهة للأنمي والكورة + قوالب Story و Feed جاهزة
                  </p>
                </div>
              </div>

              <span className="shrink-0 px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-xl shadow group-hover:bg-purple-500 transition-colors">
                استعراض الأصول 🎨
              </span>
            </div>

          </div>
        </div>

        {/* Live Search & Real-time Trends Banner */}
        <div className="bg-stone-900/60 border-b border-stone-800 py-3.5 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-stone-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-semibold text-white">وكيل جوجل للبحث والتحقق المباشر:</span>
              <span className="text-stone-400">ناقش الأحداث الجارية، واستشهد بأحدث الأخبار، وتحقق من صحة المعلومات باللحظة</span>
            </div>

            <button
              onClick={() => setIsSearchAgentOpen(true)}
              className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>فتح وكيل بحث جوجل الحي</span>
            </button>
          </div>
        </div>

        {/* AI High-Thinking & Image Generation Studio Feature Spotlight */}
        <div className="bg-gradient-to-r from-cyan-950/70 via-indigo-950/80 to-slate-900 border-b border-cyan-500/40 py-4 px-4 sm:px-6 shadow-xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0 shadow-lg shadow-cyan-500/20">
                <Brain className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-cyan-400 mb-0.5">
                  <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">ThinkingLevel: HIGH ⚡</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-400">Gemini 3 Deep Reasoning & Text-to-Image</span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-white">
                  {language === 'ar' ? 'استوديو التفكير الفائق وتوليد صور الهيرو والكونسبت آرت' : 'AI High-Thinking & High-Quality Image Generator'}
                </h3>
                <p className="text-xs text-stone-300 mt-0.5 line-clamp-1">
                  {language === 'ar'
                    ? 'حل أعقد استفسارات التوافق الهندسي، معادلات الدروب شيبينج، وتوليد صور البانر 16:9 وتصاميم الكفرات 9:16 بضغطة زر واحدة'
                    : 'Solve complex engineering & dropshipping unit economics, generate 16:9 blog heroes & 9:16 phone case concept art from text prompts'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
              <button
                onClick={() => {
                  setAiStudioInitialTab('thinking');
                  setIsAiStudioOpen(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-stone-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all active:scale-95 whitespace-nowrap"
              >
                <Brain className="w-4 h-4 text-stone-950" />
                <span>{language === 'ar' ? 'تشغيل التفكير الفائق ⚡' : 'Deep Thinking Lab'}</span>
              </button>

              <button
                onClick={() => {
                  setAiStudioInitialTab('image_generator');
                  setIsAiStudioOpen(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all active:scale-95 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>{language === 'ar' ? 'توليد صور وكونسبت آرت 🎨' : 'Generate Concept Art'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Spotlight: Live Interactive Studio CTA */}
        <section className="py-16 bg-gradient-to-b from-stone-900 to-stone-950 border-b border-stone-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-stone-950 border border-stone-800 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Sparkles className="w-4 h-4" />
                    <span>محاكاة فورية بدقة 100%</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    جرّب تخصيص كفر هاتفك أو محفظتك الجلدية الآن <br className="hidden sm:inline" />
                    بالخط العربي أو الرقائق الذهبية البارزة
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
                    يتيح لك استوديو التخصيص كتابة اسمك، اختيار نوع الخط الديواني أو الرقعة أو الكوفي، وتحديد لون الجلد ونوع الكفر مع معاينة مطابقة تماماً لما سيتم تصنيعه وشحنه.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4">
                    <button
                      onClick={() => {
                        setCustomizerType('case');
                        setIsCustomizerOpen(true);
                      }}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-amber-500/20"
                    >
                      <Sliders className="w-4 h-4" />
                      <span>تخصيص كفر هاتف (آيفون / سامسونج / بيكسل)</span>
                    </button>

                    <button
                      onClick={() => {
                        setCustomizerType('wallet');
                        setIsCustomizerOpen(true);
                      }}
                      className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-colors"
                    >
                      <span>تخصيص محفظة جلد طبيعي</span>
                    </button>
                  </div>
                </div>

                {/* Right side studio visual preview */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-64 h-64 rounded-2xl overflow-hidden border border-stone-700 shadow-2xl group">
                    <img
                      src="/src/assets/images/product_case_calligraphy_1793491296023.jpg"
                      alt="كفر خط عربي ذهبي"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent flex items-end p-4">
                      <p className="text-xs font-bold text-white">طباعة مذهبة بارزة مقاومة للخدش</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* FAQ & Trust Guarantees */}
        <FaqAndTrust />
      </main>

      {/* Footer */}
      <Footer
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenDropshipPortal={() => setIsDropshipPortalOpen(true)}
        onOpenOMS={() => setIsOMSOpen(true)}
        onOpenStudio={() => {
          setCustomizerType('case');
          setIsCustomizerOpen(true);
        }}
        onOpenSupplyChain={() => setIsSupplyChainOpen(true)}
        onNavigateSection={handleNavigateSection}
        onOpenOfficialSocial={() => setIsOfficialSocialOpen(true)}
        onOpenSocialPosting={() => setIsSocialPostingOpen(true)}
      />

      {/* Interactive Modals */}
      
      {/* 1. Customizer Studio Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => {
          setIsCustomizerOpen(false);
          setCustomizerUploadedImage(undefined);
        }}
        onAddToCart={handleAddToCartWithCustomization}
        currency={currency}
        initialType={customizerType}
        initialProductId={customizerProductId}
        initialUploadedImageUrl={customizerUploadedImage}
        onOpenAiStudio={() => {
          setAiStudioInitialTab('image_generator');
          setIsAiStudioOpen(true);
        }}
      />

      {/* 2. Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        currency={currency}
        onOpenStudio={() => {
          setCustomizerType('case');
          setIsCustomizerOpen(true);
        }}
      />

      {/* 3. Comprehensive Checkout Modal (COD, InstaPay, Vodafone Cash, Cards) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={currency}
        onOrderPlaced={handleOrderPlaced}
        onClearCart={handleClearCart}
        initialPromoCode={activePromoCode}
      />

      {/* 4. Order Management System (OMS) & WhatsApp / SMS Notifications */}
      <OrderManagementModal
        isOpen={isOMSOpen}
        onClose={() => setIsOMSOpen(false)}
        orders={orders}
        onUpdateOrder={handleUpdateOrder}
        currency={currency}
      />

      {/* 5. Dropshipping & Factory Print Partner Portal */}
      <DropshipDashboardModal
        isOpen={isDropshipPortalOpen}
        onClose={() => setIsDropshipPortalOpen(false)}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        currency={currency}
      />

      {/* 6. Customer Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        orders={orders}
        currency={currency}
      />

      {/* 7. Google Search Grounded Agent (Real-time Current Events & Fact Checking) */}
      <GoogleSearchAgentModal
        isOpen={isSearchAgentOpen}
        onClose={() => setIsSearchAgentOpen(false)}
      />

      {/* 8. Product Reviews Modal & Submission Form */}
      <ProductReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        product={selectedReviewProduct}
        onAddReview={handleAddReview}
        currency={currency}
        onCustomize={handleOpenCustomizerForProduct}
      />

      {/* 9. Wholesale Suppliers, UV Print Machine Bridge, & Bosta Express Logistics Hub */}
      <SupplyChainAndBostaModal
        isOpen={isSupplyChainOpen}
        onClose={() => setIsSupplyChainOpen(false)}
        orders={orders}
        currency={currency}
      />

      {/* 10. Creative Unboxing Experience Modal */}
      <CreativeUnboxingModal
        isOpen={isUnboxingModalOpen}
        onClose={() => setIsUnboxingModalOpen(false)}
        onCustomizePiece={() => {
          setCustomizerType('case');
          setIsCustomizerOpen(true);
        }}
      />

      {/* 11. Brand Identity & Social Ads Kit Modal */}
      <BrandIdentityAndAdsModal
        isOpen={isBrandKitModalOpen}
        onClose={() => setIsBrandKitModalOpen(false)}
      />

      {/* 12. Omnichannel Multi-Marketplace & Affiliate Hub (Amazon, Noon, Kenzz, Jumia, TikTok) */}
      <OmnichannelMarketplaceModal
        isOpen={isOmnichannelOpen}
        onClose={() => setIsOmnichannelOpen(false)}
        orders={orders}
        products={products}
        currency={currency}
      />

      {/* 13. Live Social Proof & Trust Purchase Notifications Ticker */}
      <SocialProofTicker
        currency={currency}
      />

      {/* 14. 24-Hour Public Beta Feedback & Bug Bounty Modal */}
      <BetaFeedbackModal
        isOpen={isBetaFeedbackOpen}
        onClose={() => setIsBetaFeedbackOpen(false)}
        onRewardGranted={(bonusPoints) => {
          setLoyaltyAccount((prev) => {
            const updated = {
              ...prev,
              points: prev.points + bonusPoints,
              lifetimeEarned: prev.lifetimeEarned + bonusPoints,
            };
            try {
              localStorage.setItem('naqsh_loyalty_account', JSON.stringify(updated));
            } catch {
              // ignore
            }
            return updated;
          });
        }}
      />

      {/* 15. Loyalty Club, Membership Gifts, & Win-Win Dual Referral Modal */}
      <LoyaltyAndReferralModal
        isOpen={isLoyaltyOpen}
        onClose={() => setIsLoyaltyOpen(false)}
        currency={currency}
        loyaltyAccount={loyaltyAccount}
        onSelectGift={(giftId) => {
          setLoyaltyAccount((prev) => {
            const updated = { ...prev, selectedGiftId: giftId };
            try {
              localStorage.setItem('naqsh_loyalty_account', JSON.stringify(updated));
            } catch {
              // ignore
            }
            return updated;
          });
        }}
        onRedeemPoints={(pts) => {
          setLoyaltyAccount((prev) => {
            const updated = { ...prev, points: Math.max(0, prev.points - pts) };
            try {
              localStorage.setItem('naqsh_loyalty_account', JSON.stringify(updated));
            } catch {
              // ignore
            }
            return updated;
          });
          setIsCheckoutOpen(true);
        }}
        onApplyReferralCode={(code) => {
          setIsCheckoutOpen(true);
        }}
        onBonusPointsAdded={(bonusPoints, reason) => {
          setLoyaltyAccount((prev) => {
            const updated = {
              ...prev,
              points: prev.points + bonusPoints,
              lifetimeEarned: prev.lifetimeEarned + bonusPoints,
            };
            try {
              localStorage.setItem('naqsh_loyalty_account', JSON.stringify(updated));
            } catch {
              // ignore
            }
            return updated;
          });
        }}
      />

      {/* 16. Modern Photo Upload Studio & Media Library Modal */}
      <MediaUploadModal
        isOpen={isMediaUploadOpen}
        onClose={() => setIsMediaUploadOpen(false)}
        products={products}
        onAddNewProductWithImage={(newProduct) => {
          setProducts((prev) => [newProduct, ...prev]);
        }}
        onUpdateProductImage={(productId, newImageUrl) => {
          setProducts((prev) =>
            prev.map((p) => (p.id === productId ? { ...p, image: newImageUrl } : p))
          );
        }}
        onOpenCustomizerWithImage={(imageUrl) => {
          setCustomizerType('case');
          setCustomizerUploadedImage(imageUrl);
          setIsCustomizerOpen(true);
        }}
      />

      {/* 17. Store Managers & Site Viewers / Monitors RBAC Modal */}
      <AdminAndStaffModal
        isOpen={isAdminStaffOpen}
        onClose={() => setIsAdminStaffOpen(false)}
        staffList={staffList}
        currentRole={currentStaffRole}
        onSwitchActiveRole={(role) => setCurrentStaffRole(role)}
        onAddStaffMember={(newStaff) => {
          setStaffList((prev) => {
            const updated = [newStaff, ...prev];
            try {
              localStorage.setItem('naqsh_staff_list', JSON.stringify(updated));
            } catch {
              // ignore
            }
            return updated;
          });
        }}
        onRemoveStaffMember={(id) => {
          setStaffList((prev) => {
            const updated = prev.filter((s) => s.id !== id);
            try {
              localStorage.setItem('naqsh_staff_list', JSON.stringify(updated));
            } catch {
              // ignore
            }
            return updated;
          });
        }}
        onToggleStaffStatus={(id) => {
          setStaffList((prev) => {
            const updated = prev.map((s) =>
              s.id === id ? { ...s, isActive: !s.isActive } : s
            );
            try {
              localStorage.setItem('naqsh_staff_list', JSON.stringify(updated));
            } catch {
              // ignore
            }
            return updated;
          });
        }}
      />

      {/* 18. Official Social Media Channels & Merchant COD Responsibility Certificate */}
      <OfficialSocialAndChannelsModal
        isOpen={isOfficialSocialOpen}
        onClose={() => setIsOfficialSocialOpen(false)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* 19. Social Media Auto-Poster & Ready Campaigns Hub */}
      <SocialPostingSystemModal
        isOpen={isSocialPostingOpen}
        onClose={() => setIsSocialPostingOpen(false)}
        onOpenCustomizer={() => {
          setCustomizerType('case');
          setIsCustomizerOpen(true);
        }}
        onOpenSocialHub={() => setIsOfficialSocialOpen(true)}
      />

      {/* 20. Live AI Customer Inquiry & Smart Sales Closer Bot (Active Now) */}
      <AiSalesBotWidget
        onOpenCustomizer={(productId) => {
          setCustomizerType('case');
          setCustomizerProductId(productId);
          setIsCustomizerOpen(true);
        }}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenDropship={() => setIsDropshipPortalOpen(true)}
        onOpenSocial={() => setIsOfficialSocialOpen(true)}
        onOpenLeatherSimulator={() => setIsLeatherSimOpen(true)}
        onOpenPriceAlerts={() => setIsPriceAlertsOpen(true)}
        onOpenQuickShare={() => {
          setSelectedShareProduct(products[0]);
          setIsQuickShareOpen(true);
        }}
        onApplyPromoCode={(code) => {
          setActivePromoCode(code);
        }}
        onOpenAiStudio={() => {
          setAiStudioInitialTab('image_generator');
          setIsAiStudioOpen(true);
        }}
      />

      {/* 21. AI High-Thinking & High-Quality Image / Concept Art Generator Studio Modal */}
      <AiThinkingAndAssetStudioModal
        isOpen={isAiStudioOpen}
        onClose={() => setIsAiStudioOpen(false)}
        initialTab={aiStudioInitialTab}
        onApplyImageToCustomizer={(imageUrl) => {
          setCustomizerUploadedImage(imageUrl);
          setCustomizerType('case');
          setIsCustomizerOpen(true);
        }}
        onOpenSocialPosting={() => setIsSocialPostingOpen(true)}
      />

      {/* 22. 3D Full-Grain Veg-Tan Leather Color & Patina Simulator Modal */}
      <LeatherColorSimulatorModal
        isOpen={isLeatherSimOpen}
        onClose={() => setIsLeatherSimOpen(false)}
        currency={currency}
        onApplyToCustomizer={() => {
          setCustomizerType('wallet');
          setIsCustomizerOpen(true);
        }}
      />

      {/* 23. Real-time Price Drop Alerts & Flash Deals Radar Modal */}
      <PriceDropAlertsModal
        isOpen={isPriceAlertsOpen}
        onClose={() => setIsPriceAlertsOpen(false)}
        currency={currency}
        initialDevice={selectedPriceAlertDevice}
        onApplyDealToCheckout={() => {
          setActivePromoCode('Dody15');
          setIsCheckoutOpen(true);
        }}
      />

      {/* 24. 1-Click Quick Social & WhatsApp Share Modal */}
      <QuickShareModal
        isOpen={isQuickShareOpen}
        onClose={() => setIsQuickShareOpen(false)}
        product={selectedShareProduct || products[0]}
        promoCode={activePromoCode}
      />

      {/* Consolidated Store Owner Control Drawer & Customer Storefront View Switcher (Replaces the 12 tall stacked buttons) */}
      <OwnerAdminControlDrawer
        onOpenSocialPosting={() => setIsSocialPostingOpen(true)}
        onOpenOfficialSocial={() => setIsOfficialSocialOpen(true)}
        onOpenQuickShare={() => {
          setSelectedShareProduct(products[0]);
          setIsQuickShareOpen(true);
        }}
        onOpenBrandKit={() => setIsBrandKitModalOpen(true)}
        onOpenAiStudio={() => {
          setAiStudioInitialTab('thinking');
          setIsAiStudioOpen(true);
        }}
        onOpenLeatherSim={() => setIsLeatherSimOpen(true)}
        onOpenMediaUpload={() => setIsMediaUploadOpen(true)}
        onOpenPriceAlerts={() => setIsPriceAlertsOpen(true)}
        onOpenSupplyChain={() => setIsSupplyChainOpen(true)}
        onOpenOmnichannel={() => setIsOmnichannelOpen(true)}
        onOpenUnboxing={() => setIsUnboxingModalOpen(true)}
        onOpenAdminStaff={() => setIsAdminStaffOpen(true)}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
        isCustomerView={isCustomerView}
        onToggleCustomerView={() => {
          setIsCustomerView(!isCustomerView);
          setShowDropshipMargins(isCustomerView ? true : false);
        }}
      />

    </div>
  );
}
