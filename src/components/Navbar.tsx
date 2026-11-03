import React, { useState } from 'react';
import { ShoppingBag, Sliders, Truck, Globe, Sparkles, Gift, Palette, Languages, Crown, Camera, Users, ShieldCheck, Menu, X, ArrowLeft, ArrowRight, Brain, Wand2 } from 'lucide-react';
import { Currency } from '../types';
import { CURRENCIES } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { CaseTechLogo } from './CaseTechLogo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenStudio: () => void;
  onOpenDropshipPortal: () => void;
  onOpenTracking: () => void;
  onOpenSearchAgent: () => void;
  onOpenSupplyChain: () => void;
  onOpenUnboxingModal: () => void;
  onOpenBrandKitModal: () => void;
  onOpenOmnichannel: () => void;
  onOpenLoyalty: () => void;
  onOpenMediaUpload?: () => void;
  onOpenAdminStaff?: () => void;
  onOpenOfficialSocial?: () => void;
  onOpenSocialPosting?: () => void;
  onOpenAiStudio?: () => void;
  currency: Currency;
  onChangeCurrency: (c: Currency) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenStudio,
  onOpenDropshipPortal,
  onOpenTracking,
  onOpenSearchAgent,
  onOpenSupplyChain,
  onOpenUnboxingModal,
  onOpenBrandKitModal,
  onOpenOmnichannel,
  onOpenLoyalty,
  onOpenMediaUpload,
  onOpenAdminStaff,
  onOpenOfficialSocial,
  onOpenSocialPosting,
  onOpenAiStudio,
  currency,
  onChangeCurrency,
  onNavigateSection,
}) => {
  const { language, toggleLanguage, t, isRtl } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-18">
          
          {/* Zone 1: Brand Wordmark & Mascot Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group transition-transform hover:scale-102"
              title="كيستيك | CaseTech"
            >
              <CaseTechLogo size="md" showTagline={true} showMascotBadge={true} />
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden xl:flex items-center gap-3.5 text-xs sm:text-sm font-medium text-stone-300">
            {/* AI High-Thinking & Asset Studio Button */}
            {onOpenAiStudio && (
              <button
                onClick={onOpenAiStudio}
                className="flex items-center gap-1.5 text-cyan-300 hover:text-white font-black transition-all whitespace-nowrap shrink-0 bg-gradient-to-r from-cyan-950/80 via-indigo-950/70 to-slate-900 hover:from-cyan-900 hover:to-indigo-900 px-3 py-1.5 rounded-xl border border-cyan-400/50 shadow-md shadow-cyan-500/20 text-xs active:scale-95"
                title="استوديو التفكير الفائق وتوليد صور الهيرو والكونسبت آرت بالذكاء الاصطناعي"
              >
                <Brain className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>{language === 'ar' ? 'استوديو التفكير الفائق والصور AI ⚡' : 'AI Thinking & Images ⚡'}</span>
              </button>
            )}

            <button
              onClick={() => onNavigateSection('cases')}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              {t.navCases}
            </button>
            <button
              onClick={() => onNavigateSection('wallets')}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              {t.navWallets}
            </button>

            {/* Immersive Corners Shortcut */}
            <button
              onClick={() => onNavigateSection('immersive-corners')}
              className="flex items-center gap-1.5 text-amber-300 hover:text-white font-bold transition-all whitespace-nowrap shrink-0 bg-stone-800/80 hover:bg-stone-800 px-2.5 py-1 rounded-lg border border-stone-700 shadow-sm text-xs"
              title="عِش أجواء الأنمي وترندات البنات والكورة والخط العربي"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{language === 'ar' ? 'كورنر الأجواء ⚔️🌸' : 'Atmosphere Corners ✨'}</span>
            </button>

            {/* Upload Modern Media Button */}
            {onOpenMediaUpload && (
              <button
                onClick={onOpenMediaUpload}
                className="flex items-center gap-1.5 text-emerald-300 hover:text-white font-bold transition-all whitespace-nowrap shrink-0 bg-emerald-950/40 hover:bg-emerald-900/60 px-2.5 py-1 rounded-lg border border-emerald-500/40 shadow-sm text-xs"
                title="إضافة صور وتصاميم حديثة ونشرها كمنتجات"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'ar' ? 'رفع صور حديثة 📸' : 'Upload Photos 📸'}</span>
              </button>
            )}

            {/* Staff & Admin Manager Button */}
            {onOpenAdminStaff && (
              <button
                onClick={onOpenAdminStaff}
                className="flex items-center gap-1.5 text-blue-300 hover:text-white font-bold transition-all whitespace-nowrap shrink-0 bg-blue-950/40 hover:bg-blue-900/60 px-2.5 py-1 rounded-lg border border-blue-500/40 shadow-sm text-xs"
                title="إضافة وتعديل المدراء والمتابعين وتحديد الصلاحيات"
              >
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>{language === 'ar' ? 'المدراء والمتابعين 👥' : 'Staff & Roles 👥'}</span>
              </button>
            )}

            {/* Loyalty & Rewards Club */}
            <button
              onClick={onOpenLoyalty}
              className="flex items-center gap-1.5 text-amber-300 hover:text-white font-bold transition-all whitespace-nowrap shrink-0 bg-gradient-to-r from-amber-600/30 via-yellow-600/20 to-amber-600/30 hover:from-amber-600/50 hover:to-yellow-600/40 px-2.5 py-1 rounded-lg border border-amber-500/40 shadow-sm text-xs"
              title={language === 'ar' ? 'نقاط الولاء وهدايا العضوية والترشيح' : 'Loyalty Points, Membership Gifts & Referrals'}
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.navLoyalty}</span>
            </button>

            {/* Omnichannel Marketplaces Button */}
            <button
              onClick={onOpenOmnichannel}
              className="flex items-center gap-1.5 text-stone-300 hover:text-white font-medium transition-all whitespace-nowrap shrink-0 bg-stone-800/80 hover:bg-stone-800 px-2.5 py-1 rounded-lg border border-stone-700 shadow-sm text-xs"
            >
              <span>{t.navMarketplaces}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>

            {/* Official Social Channels & COD Liability Button */}
            {onOpenOfficialSocial && (
              <button
                onClick={onOpenOfficialSocial}
                className="flex items-center gap-1.5 text-amber-300 hover:text-white font-bold transition-all whitespace-nowrap shrink-0 bg-amber-950/40 hover:bg-amber-900/60 px-2.5 py-1 rounded-lg border border-amber-500/40 shadow-sm text-xs"
                title={language === 'ar' ? 'صفحات فيسبوك وتيك توك وإنستجرام وثريدز وإكس وإثبات مسؤولية الدفع والتوصيل' : 'Official Social Pages & COD Guarantee'}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'ar' ? 'قنواتنا وسوشيال ميديا 🌐' : 'Social & Channels 🌐'}</span>
              </button>
            )}

            {/* Social Media Content & Auto-Post System */}
            {onOpenSocialPosting && (
              <button
                onClick={onOpenSocialPosting}
                className="flex items-center gap-1.5 text-cyan-300 hover:text-white font-bold transition-all whitespace-nowrap shrink-0 bg-cyan-950/40 hover:bg-cyan-900/60 px-2.5 py-1 rounded-lg border border-cyan-500/40 shadow-sm text-xs"
                title={language === 'ar' ? 'سيستم بوستات السوشيال ميديا وريلز التيك توك الجاهزة للنشر' : 'Social Posts System & Viral Reels'}
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{language === 'ar' ? 'سيستم البوستات 📢' : 'Social Posts Hub 📢'}</span>
              </button>
            )}

            {/* Creative Unboxing Button */}
            <button
              onClick={onOpenUnboxingModal}
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold transition-colors whitespace-nowrap shrink-0 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 text-xs"
            >
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.navUnboxing}</span>
            </button>

            {/* Brand Kit & Ads Button */}
            <button
              onClick={onOpenBrandKitModal}
              className="flex items-center gap-1.5 text-purple-300 hover:text-purple-200 font-semibold transition-colors whitespace-nowrap shrink-0 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20 text-xs"
            >
              <Palette className="w-3.5 h-3.5 text-purple-400" />
              <span>{t.navSocialAds}</span>
            </button>

            <button
              onClick={onOpenTracking}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 text-xs"
            >
              <Truck className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.navTracking}</span>
            </button>
            
            <button
              onClick={onOpenSupplyChain}
              className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-semibold transition-colors whitespace-nowrap shrink-0 text-xs"
            >
              <Truck className="w-3.5 h-3.5 text-red-400" />
              <span>{t.navSupplyChain}</span>
            </button>
            
            {/* Google Search Agent Link */}
            <button
              onClick={onOpenSearchAgent}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition-colors whitespace-nowrap shrink-0 text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{t.navGoogleAgent}</span>
            </button>
          </nav>

          {/* Zone 3: Actions (Language Switcher, Loyalty, Currency, Live Studio CTA & Shopping Bag) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Mobile/Compact Loyalty Button */}
            <button
              onClick={onOpenLoyalty}
              title={language === 'ar' ? 'نقاط الولاء والترشيح والهدايا' : 'Loyalty & Referral Rewards'}
              className="xl:hidden p-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 transition-colors flex items-center justify-center"
            >
              <Crown className="w-4 h-4 text-amber-400" />
            </button>

            {/* Language Switcher Toggle - High Visibility */}
            <button
              onClick={toggleLanguage}
              aria-label={t.langSwitchAria}
              title={language === 'ar' ? 'Switch to English' : 'التحويل إلى اللغة العربية'}
              className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-amber-500/20 text-stone-200 hover:text-amber-300 border border-stone-700 hover:border-amber-500/40 transition-all text-xs font-bold shadow-sm"
            >
              <Languages className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
              <div className="flex items-center gap-1 text-[11px]">
                <span className={language === 'ar' ? 'text-amber-400 font-black' : 'text-stone-400 font-normal'}>
                  AR
                </span>
                <span className="text-stone-600">/</span>
                <span className={language === 'en' ? 'text-amber-400 font-black' : 'text-stone-400 font-normal'}>
                  EN
                </span>
              </div>
            </button>

            {/* Currency selector */}
            <div className="relative flex items-center bg-stone-800 rounded-lg p-1 text-xs border border-stone-700">
              <Globe className="w-3.5 h-3.5 text-stone-400 mx-1" />
              <select
                aria-label={t.currencySelectAria}
                value={currency}
                onChange={(e) => onChangeCurrency(e.target.value as Currency)}
                className="bg-transparent text-stone-200 text-xs font-medium focus:outline-none cursor-pointer pr-1 pl-1"
              >
                {Object.values(CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code} className="bg-stone-900 text-white">
                    {language === 'ar' ? c.symbolAr : c.symbolEn} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Customizer Studio Button */}
            <button
              onClick={onOpenStudio}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t.navStudioBtn}</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 transition-colors flex items-center justify-center shrink-0"
              aria-label={t.navCartAria}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center tabular-nums shadow-sm animate-scaleIn">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="xl:hidden p-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition-colors flex items-center justify-center shrink-0"
              aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة الرئيسية'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Full Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-stone-950/98 border-b border-stone-800 px-4 py-4 space-y-3 animate-fadeIn text-sm">
          {/* Quick Category Jump */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onNavigateSection('cases');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 text-stone-200 font-bold text-center transition-all"
            >
              📱 {t.navCases}
            </button>
            <button
              onClick={() => {
                onNavigateSection('wallets');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 text-stone-200 font-bold text-center transition-all"
            >
              💼 {t.navWallets}
            </button>
          </div>

          {/* Primary Action Studio CTA */}
          <button
            onClick={() => {
              onOpenStudio();
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-black flex items-center justify-center gap-2 shadow-md transition-transform active:scale-98"
          >
            <Sliders className="w-4 h-4" />
            <span>{t.navStudioBtn} (تخصيص جميع الموديلات)</span>
          </button>

          {/* Atmosphere Corners */}
          <button
            onClick={() => {
              onNavigateSection('immersive-corners');
              setIsMobileMenuOpen(false);
            }}
            className="w-full p-2.5 rounded-xl bg-stone-900/80 border border-stone-800 hover:bg-stone-800 text-amber-300 font-bold flex items-center justify-between text-xs transition-colors"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{language === 'ar' ? 'كورنر الأجواء (أنمي، كورة، خط عربي، ماربل)' : 'Atmosphere Corners'}</span>
            </span>
            <span className="text-stone-500 font-mono text-[11px]">⚔️🌸⚽</span>
          </button>

          {/* AI High-Thinking & Image Generation Studio (Mobile) */}
          {onOpenAiStudio && (
            <button
              onClick={() => {
                onOpenAiStudio();
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-3 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-indigo-950/70 to-slate-900 border border-cyan-400/50 text-cyan-200 font-extrabold flex items-center justify-between text-xs transition-all shadow-md"
            >
              <span className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>{language === 'ar' ? 'استوديو التفكير الفائق وتوليد الصور AI ⚡' : 'AI Thinking & Image Studio ⚡'}</span>
              </span>
              <span className="text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-300 font-mono font-bold">HIGH</span>
            </button>
          )}

          {/* Official Social & COD Responsibility */}
          {onOpenOfficialSocial && (
            <button
              onClick={() => {
                onOpenOfficialSocial();
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 hover:bg-amber-900/40 text-amber-300 font-bold flex items-center justify-between text-xs transition-colors"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'قنواتنا الرسمية وضمان الدفع عند الاستلام 🌐' : 'Official Social & COD Guarantee'}</span>
              </span>
              <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-300">موثق</span>
            </button>
          )}

          {/* Brand Identity & Marketing Kit */}
          <button
            onClick={() => {
              onOpenBrandKitModal();
              setIsMobileMenuOpen(false);
            }}
            className="w-full p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 hover:bg-cyan-900/40 text-cyan-300 font-bold flex items-center justify-between text-xs transition-colors"
          >
            <span className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-cyan-400" />
              <span>{language === 'ar' ? 'تحميل الشعار المنفصل (SVG) ودراسة أمريكا وأوروبا' : 'Logo Download & US/EU Study'}</span>
            </span>
            <span className="text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-300 font-mono">SVG 🇺🇸</span>
          </button>

          {/* Loyalty & Rewards */}
          <button
            onClick={() => {
              onOpenLoyalty();
              setIsMobileMenuOpen(false);
            }}
            className="w-full p-2.5 rounded-xl bg-stone-900/80 border border-stone-800 text-stone-200 font-semibold flex items-center justify-between text-xs"
          >
            <span className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>{t.navLoyalty}</span>
            </span>
            <span className="text-[10px] text-amber-400 font-bold">250 نقطة</span>
          </button>

          {/* Tracking */}
          <button
            onClick={() => {
              onOpenTracking();
              setIsMobileMenuOpen(false);
            }}
            className="w-full p-2.5 rounded-xl bg-stone-900/80 border border-stone-800 text-stone-200 font-semibold flex items-center justify-between text-xs"
          >
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>{t.navTracking}</span>
            </span>
            <span className="text-stone-500 font-mono text-[10px]">بوسطة VIP</span>
          </button>

          {/* Unboxing */}
          <button
            onClick={() => {
              onOpenUnboxingModal();
              setIsMobileMenuOpen(false);
            }}
            className="w-full p-2.5 rounded-xl bg-stone-900/80 border border-stone-800 text-stone-200 font-semibold flex items-center justify-between text-xs"
          >
            <span className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>{t.navUnboxing}</span>
            </span>
          </button>

          {/* Media Upload */}
          {onOpenMediaUpload && (
            <button
              onClick={() => {
                onOpenMediaUpload();
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 font-bold flex items-center justify-between text-xs"
            >
              <span className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>{language === 'ar' ? 'رفع صور حديثة وتصاميم 📸' : 'Upload Photos'}</span>
              </span>
            </button>
          )}

          {/* Staff Manager */}
          {onOpenAdminStaff && (
            <button
              onClick={() => {
                onOpenAdminStaff();
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-blue-950/30 border border-blue-500/30 text-blue-300 font-bold flex items-center justify-between text-xs"
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span>{language === 'ar' ? 'المدراء والمتابعين والصلاحيات 👥' : 'Staff & Roles'}</span>
              </span>
            </button>
          )}

          {/* Official Channels */}
          {onOpenOfficialSocial && (
            <button
              onClick={() => {
                onOpenOfficialSocial();
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 font-bold flex items-center justify-between text-xs"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'قنواتنا وسوشيال ميديا 🌐' : 'Social & Channels'}</span>
              </span>
            </button>
          )}

          {/* Social Posting System */}
          {onOpenSocialPosting && (
            <button
              onClick={() => {
                onOpenSocialPosting();
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-cyan-300 font-bold flex items-center justify-between text-xs"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{language === 'ar' ? 'سيستم بوستات السوشيال ميديا 📢' : 'Social Posts Hub'}</span>
              </span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};


