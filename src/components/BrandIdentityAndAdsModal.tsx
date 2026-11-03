import React, { useState } from 'react';
import {
  X,
  Palette,
  Megaphone,
  Copy,
  Check,
  Sparkles,
  Download,
  Share2,
  Smartphone,
  Eye,
  Type,
  TrendingUp,
  Target,
  FileText,
  Globe,
  DollarSign,
  ShieldCheck,
  ExternalLink,
  Code,
  Layers,
  Award
} from 'lucide-react';
import { BRAND_IDENTITY, SocialAdTemplate, BrandColor } from '../data/branding';
import { CaseTechLogo } from './CaseTechLogo';

interface BrandIdentityAndAdsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandIdentityAndAdsModal: React.FC<BrandIdentityAndAdsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'branding' | 'growth_tactics' | 'expansion_study' | 'ads_kit' | 'templates'>('branding');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedAdId, setCopiedAdId] = useState<string | null>(null);
  const [copiedSvgKey, setCopiedSvgKey] = useState<string | null>(null);
  const [selectedAdTemplate, setSelectedAdTemplate] = useState<SocialAdTemplate>(
    BRAND_IDENTITY.socialAdTemplates[0]
  );
  const [adFormatPreview, setAdFormatPreview] = useState<'story' | 'feed'>('story');

  if (!isOpen) return null;

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleCopyAdCopy = (ad: SocialAdTemplate) => {
    const fullText = `${ad.hookHeadlineAr}\n\n${ad.bodyCopyAr}\n\n👉 ${ad.callToActionAr}\n#كيستيك #كفرات_هواتف #حماية_ذكية #طباعة_UV #CaseTech #دروبشيبينج`;
    navigator.clipboard.writeText(fullText);
    setCopiedAdId(ad.id);
    setTimeout(() => setCopiedAdId(null), 2500);
  };

  const handleCopySvgCode = async (svgUrl: string, key: string) => {
    try {
      const res = await fetch(svgUrl);
      const svgText = await res.text();
      navigator.clipboard.writeText(svgText);
      setCopiedSvgKey(key);
      setTimeout(() => setCopiedSvgKey(null), 2500);
    } catch {
      navigator.clipboard.writeText(window.location.origin + svgUrl);
      setCopiedSvgKey(key);
      setTimeout(() => setCopiedSvgKey(null), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div
        className="relative w-full max-w-5xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden text-stone-100 my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="relative px-6 py-5 border-b border-stone-800 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <span>مركز الهوية التسويقية والتوسع العالمي</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400">دراسة الأسواق والترويج الفعّال</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                دليل هوية براند &ldquo;كيستيك | CaseTech&rdquo; وأصول الإعلانات ودراسة التوسع
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-800 px-4 sm:px-6 bg-stone-900/80 text-xs font-semibold overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('branding')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'branding'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>الشعار المنفصل وأصول الهوية (SVG)</span>
          </button>
          
          <button
            onClick={() => setActiveTab('growth_tactics')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'growth_tactics'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>أنسب وأوفر طرق التسويق (Lowest CAC)</span>
          </button>

          <button
            onClick={() => setActiveTab('expansion_study')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'expansion_study'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>دراسة دخول السوق الأمريكي والأوروبي 🇺🇸🇪🇺</span>
          </button>

          <button
            onClick={() => setActiveTab('ads_kit')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'ads_kit'
                ? 'border-violet-400 text-violet-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>حملات الإعلانات الجاهزة</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'templates'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>معاينة إعلانات Story و Feed</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* TAB 1: STANDALONE LOGO & VECTOR ASSETS */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              
              {/* Standalone Logo Asset Card with Direct Downloads */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 border border-cyan-500/30 shadow-xl space-y-5">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-800 pb-4">
                  <div>
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                      ملفات الشعار الرسمية المنفصلة (Standalone Vector Logo Assets)
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      أصول لوجو &ldquo;كيستيك - CaseTech&rdquo; بدقة فيكتور لا متناهية
                    </h3>
                    <p className="text-xs text-stone-400 mt-1">
                      ملفات SVG مفتوحة المصدر وعالية الجودة جاهزة فوراً لحملات إعلانات Meta و TikTok و Google Ads والطباعة.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href="/casetech-logo.svg"
                      download="casetech-logo.svg"
                      className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>تحميل اللوجو الكامل SVG</span>
                    </a>
                    <a
                      href="/casetech-shield-icon.svg"
                      download="casetech-shield-icon.svg"
                      className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs border border-stone-700 flex items-center gap-1.5 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>تحميل أيقونة الدرع</span>
                    </a>
                  </div>
                </div>

                {/* Live Logo Visual Preview Canvas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Dark Canvas Preview */}
                  <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col items-center justify-center text-center space-y-4">
                    <span className="text-[10px] text-stone-500 font-mono">معاينة على خلفية داكنة (Dark Mode)</span>
                    <div className="w-full max-w-sm py-4 px-2 flex items-center justify-center">
                      <img src="/casetech-logo.svg" alt="CaseTech Logo Dark Preview" className="w-full h-auto max-h-24 object-contain" />
                    </div>
                    <div className="flex items-center gap-2 w-full pt-2 border-t border-stone-900 justify-center">
                      <button
                        onClick={() => handleCopySvgCode('/casetech-logo.svg', 'full_svg')}
                        className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold flex items-center gap-1 border border-stone-800"
                      >
                        {copiedSvgKey === 'full_svg' ? <Check className="w-3 h-3 text-emerald-400" /> : <Code className="w-3 h-3 text-cyan-400" />}
                        <span>{copiedSvgKey === 'full_svg' ? 'تم نسخ كود الـ SVG!' : 'نسخ كود الـ SVG'}</span>
                      </button>
                      <a
                        href="/casetech-logo.svg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold flex items-center gap-1 border border-stone-800"
                      >
                        <ExternalLink className="w-3 h-3 text-amber-400" />
                        <span>فتح بملف منفصل</span>
                      </a>
                    </div>
                  </div>

                  {/* Icon Emblem / Avatar Preview */}
                  <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col items-center justify-center text-center space-y-4">
                    <span className="text-[10px] text-stone-500 font-mono">أيقونة الدرع الذكي (App Icon / Avatar)</span>
                    <div className="w-24 h-24 py-1 flex items-center justify-center">
                      <img src="/casetech-shield-icon.svg" alt="CaseTech Shield Icon" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]" />
                    </div>
                    <div className="flex items-center gap-2 w-full pt-2 border-t border-stone-900 justify-center">
                      <button
                        onClick={() => handleCopySvgCode('/casetech-shield-icon.svg', 'icon_svg')}
                        className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold flex items-center gap-1 border border-stone-800"
                      >
                        {copiedSvgKey === 'icon_svg' ? <Check className="w-3 h-3 text-emerald-400" /> : <Code className="w-3 h-3 text-cyan-400" />}
                        <span>{copiedSvgKey === 'icon_svg' ? 'تم نسخ كود الأيقونة!' : 'نسخ كود الأيقونة'}</span>
                      </button>
                      <a
                        href="/casetech-shield-icon.svg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold flex items-center gap-1 border border-stone-800"
                      >
                        <ExternalLink className="w-3 h-3 text-amber-400" />
                        <span>فتح في نافذة جديدة</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Official Color Palette with 1-click Copy */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Palette className="w-4 h-4 text-cyan-400" />
                      <span>لوحة الألوان الرسمية للمتجر والإعلانات (Brand Color Palette)</span>
                    </h4>
                    <p className="text-xs text-stone-400 mt-0.5">
                      اضغط على أي كود لوني لنسخه واستخدامه فوراً في برامج التصميم (Photoshop / Illustrator / Canva / Figma):
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                  {BRAND_IDENTITY.colors.map((color: BrandColor) => (
                    <div
                      key={color.hex}
                      className="group bg-stone-950 rounded-2xl border border-stone-800 p-3 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Color Swatch */}
                        <div
                          className="w-full h-16 rounded-xl border border-white/10 mb-2.5 relative shadow-inner flex items-center justify-center"
                          style={{ backgroundColor: color.hex }}
                        >
                          <button
                            onClick={() => handleCopyHex(color.hex)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-stone-700 flex items-center gap-1 shadow-md"
                          >
                            {copiedHex === color.hex ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-cyan-400" />}
                            <span>{copiedHex === color.hex ? 'تم النسخ!' : 'نسخ الكود'}</span>
                          </button>
                        </div>

                        <h5 className="font-bold text-xs text-white line-clamp-1">{color.nameAr}</h5>
                        <p className="text-[10px] text-cyan-400 font-semibold mb-1">{color.role}</p>
                        <p className="text-[10px] text-stone-400 leading-relaxed line-clamp-2">{color.description}</p>
                      </div>

                      <div className="pt-2 border-t border-stone-800/80 mt-2 flex items-center justify-between text-xs">
                        <span className="font-mono text-stone-300 font-bold tracking-wider">{color.hex}</span>
                        <button
                          onClick={() => handleCopyHex(color.hex)}
                          className="text-stone-400 hover:text-cyan-400 transition-colors"
                          title="نسخ"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography & Fonts Guidelines */}
              <div className="bg-stone-950/60 p-5 rounded-2xl border border-stone-800">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Type className="w-4 h-4 text-amber-400" />
                  <span>نظام الخطوط والطباعة في المتجر والإعلانات:</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-stone-900/70 rounded-xl border border-stone-800">
                    <span className="text-cyan-400 font-semibold block mb-1">خط العناوين الرئيسية والهوية:</span>
                    <p className="text-sm font-bold text-white mb-2">خط القاهرة العريض وخط الثلث والديواني (Cairo 900 & Diwani Gold)</p>
                    <p className="text-stone-400 leading-relaxed">
                      يُستخدم للوغو الرئيسي &ldquo;كيستيك&rdquo;، وللحفر المذهب على الكفرات والمحافظ، وفي الهوك الإعلاني لجذب الانتباه خلال أول ثانيتين.
                    </p>
                  </div>

                  <div className="p-4 bg-stone-900/70 rounded-xl border border-stone-800">
                    <span className="text-cyan-400 font-semibold block mb-1">خط التكنولوجيا والكلمات اللاتينية:</span>
                    <p className="text-sm font-bold text-white mb-2">Plus Jakarta Sans & Mono Tech (CaseTech TechShield)</p>
                    <p className="text-stone-400 leading-relaxed">
                      يُستخدم لموديلات الهواتف ومصطلحات الصدمات والتكنولوجيا (MagSafe / Shockproof / 1200 DPI UV) لإبراز الطابع العصري الموثوق.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LOWEST CAC & HIGHEST ROI GROWTH TACTICS */}
          {activeTab === 'growth_tactics' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-stone-950 to-stone-900 border border-amber-500/30">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>دليل التسويق الأكثر كفاءة وأوفر تكلفة (Lowest-CAC & High-ROI Playbook)</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white mb-1.5">
                  كيف نروّج لـ &ldquo;كيستيك&rdquo; ونضاعف طلبات العملاء والتجار بأقل ميزانية؟
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  بناءً على تحليل سلوك المستهلك وتجارة الكفرات المخصصة، هذه هي الاستراتيجيات الأوفر والأكثر فاعلية لتحقيق أعلى مبيعات مع تجنب هدر الأموال في الإعلانات العشوائية:
                </p>
              </div>

              {/* 4 Core Growth Tactics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BRAND_IDENTITY.marketingGrowthTactics.map((tactic) => (
                  <div
                    key={tactic.id}
                    className="p-5 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          {tactic.badgeAr}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                          {tactic.roiMultiplier}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white">
                        {tactic.titleAr}
                      </h4>

                      <p className="text-xs text-stone-300 leading-relaxed">
                        {tactic.summaryAr}
                      </p>

                      <div className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800/80 text-[11px] text-stone-400 space-y-1">
                        <span className="text-amber-400 font-semibold block">تكلفة الاستحواذ المقدرة (CAC):</span>
                        <p className="text-white font-bold">{tactic.cacLevel}</p>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-stone-800/80">
                        <span className="text-[11px] font-semibold text-stone-300">خطوات التنفيذ العملية:</span>
                        <ul className="space-y-1 text-[11px] text-stone-400 list-disc list-inside">
                          {tactic.executionStepsAr.map((step, idx) => (
                            <li key={idx} className="leading-relaxed">{step}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: US & EU EXPANSION FEASIBILITY STUDY */}
          {activeTab === 'expansion_study' && (
            <div className="space-y-6">
              
              {/* Executive Summary Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-stone-950 to-emerald-950/30 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    دراسة جدوى استراتيجية 🇺🇸 🇪🇺
                  </span>
                  <span className="text-xs text-stone-400 font-mono">US & EU Market Expansion Feasibility</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  فرصة مضاعفة الأرباح 5 أضعاف في السوق الأمريكي والأوروبي
                </h3>
                
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {BRAND_IDENTITY.expansionStudy.executiveSummaryAr}
                </p>

                {/* Key Metrics Quick Ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                  <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 text-center">
                    <span className="text-[10px] text-stone-400 block">حجم السوق السنوي</span>
                    <span className="text-sm font-black text-white">12.8 مليار $</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 text-center">
                    <span className="text-[10px] text-stone-400 block">سعر البيع المقترح</span>
                    <span className="text-sm font-black text-emerald-400">45$ - 65$</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 text-center">
                    <span className="text-[10px] text-stone-400 block">تكلفة التصنيع POD</span>
                    <span className="text-sm font-black text-amber-400">11$ - 14$</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 text-center">
                    <span className="text-[10px] text-stone-400 block">صافي الربح للقطعة</span>
                    <span className="text-sm font-black text-cyan-400">35$ - 50$ (75%)</span>
                  </div>
                </div>
              </div>

              {/* Financial Comparison Table: Egypt vs US/EU */}
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>جدول مقارنة الأرباح وهوامش العائد (مصر والشرق الأوسط vs أمريكا وأوروبا):</span>
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="border-b border-stone-800 text-stone-400">
                        <th className="py-2.5 px-3 font-bold">بند المقارنة</th>
                        <th className="py-2.5 px-3 font-bold text-amber-400">السوق المحلي (مصر والشرق الأوسط)</th>
                        <th className="py-2.5 px-3 font-bold text-emerald-400">السوق الأمريكي والأوروبي (USA & EU)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800/60 text-stone-200">
                      {BRAND_IDENTITY.expansionStudy.financialComparisonTable.map((row, idx) => (
                        <tr key={idx} className="hover:bg-stone-900/40">
                          <td className="py-2.5 px-3 font-semibold text-white">{row.metricAr}</td>
                          <td className="py-2.5 px-3 text-stone-300 font-mono">{row.egyptValue}</td>
                          <td className="py-2.5 px-3 text-emerald-300 font-mono font-bold">{row.usEuValue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Strategic Pillars for US/EU Execution */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-cyan-400" />
                  <span>الركائز الاستراتيجية وخطة التنفيذ العملية (Execution Pillars):</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {BRAND_IDENTITY.expansionStudy.strategicPillars.map((pillar, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                        <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{pillar.titleAr}</span>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {pillar.detailAr}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: AD CAMPAIGNS & MARKETING COPY */}
          {activeTab === 'ads_kit' && (
            <div className="space-y-6">
              {/* Intro to Ad Campaigns */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-500/10 via-stone-950 to-stone-900 border border-violet-500/30">
                <div className="flex items-center gap-2 text-xs font-bold text-violet-400 mb-1">
                  <Megaphone className="w-4 h-4" />
                  <span>حملات إعلانية جاهزة للإطلاق الفوري على Facebook, Instagram & TikTok</span>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  نماذج نصوص إعلانية موجهة لاستهداف اهتمامات الجمهور المختلفة محلياً ودولياً
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  انسخ النص الإعلاني بضغطة زر واحدة والصقه مباشرة في مدير إعلانات Meta أو TikTok Ads Manager مع استهداف الاهتمامات الموصى بها أدناه لتحقيق أعلى معدل عائد على الإنفاق الإعلاني (ROAS):
                </p>
              </div>

              {/* US & EU Targeting Setup Quick Guide Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-stone-950 to-indigo-950/40 border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>دليل ضبط استهداف الإعلانات في أمريكا وأوروبا (Meta & TikTok Ads Manager Blueprint)</span>
                  </span>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-mono px-2 py-0.5 rounded-full border border-cyan-500/30">
                    High-Converting Setup ⚡
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800">
                    <span className="text-[10px] text-cyan-400 font-bold block mb-1">🌍 المدن الأكثر تحويلاً:</span>
                    <p className="text-stone-300 leading-relaxed text-[11px]">
                      <strong>USA:</strong> Detroit / Dearborn (أعلى كثافة عربية), New York, Los Angeles, Chicago, Houston, Dallas.<br />
                      <strong>UK & EU:</strong> London, Manchester, Berlin, Frankfurt, Paris.<br />
                      <strong>Canada:</strong> Toronto, Montreal.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800">
                    <span className="text-[10px] text-indigo-400 font-bold block mb-1">🎯 الاهتمامات والكلمات المفتاحية:</span>
                    <p className="text-stone-300 leading-relaxed text-[11px]">
                      • Casetify, OtterBox, Phone Cases.<br />
                      • iPhone 16 Pro, Samsung Galaxy Ultra.<br />
                      • Arabic Calligraphy, Arabic Art & Culture.<br />
                      • Sneakerhead, Streetwear, Gaming.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800">
                    <span className="text-[10px] text-emerald-400 font-bold block mb-1">📊 الميزانية وتكلفة الاستحواذ (CPA):</span>
                    <p className="text-stone-300 leading-relaxed text-[11px]">
                      • متوسط سعر الطلب (AOV): $49 - $65 USD.<br />
                      • تكلفة الاستحواذ المستهدفة (CPA): $12 - $15 USD.<br />
                      • صافي الربح لكل قطعة: $35 - $48 USD (أرباح تفوق 75%!).
                    </p>
                  </div>
                </div>
              </div>

              {/* Ad Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BRAND_IDENTITY.socialAdTemplates.map((ad: SocialAdTemplate) => (
                  <div
                    key={ad.id}
                    className="p-5 rounded-2xl bg-stone-950 border border-stone-800 hover:border-violet-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Category & Format header */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-xs font-bold text-white">{ad.audienceCategory}</span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          {ad.estimatedRoas}
                        </span>
                      </div>

                      {/* Hook Headline */}
                      <div className="p-3 bg-stone-900/90 rounded-xl border border-stone-800/80 mb-3">
                        <span className="text-[10px] text-amber-400 block font-semibold mb-0.5">الهوك الإعلاني (Headline Hook):</span>
                        <p className="text-sm font-extrabold text-white">{ad.hookHeadlineAr}</p>
                      </div>

                      {/* Body Copy */}
                      <div className="mb-3">
                        <span className="text-[10px] text-stone-400 block font-semibold mb-1">النص الإعلاني (Primary Text):</span>
                        <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/40 p-3 rounded-xl border border-stone-800/60">
                          {ad.bodyCopyAr}
                        </p>
                      </div>

                      {/* Call to action */}
                      <div className="text-xs text-amber-300 font-semibold mb-3 flex items-center gap-1.5">
                        <span>زر التحويل: </span>
                        <span className="bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 text-white font-bold">{ad.callToActionAr}</span>
                      </div>

                      {/* Targeting Notes */}
                      <div className="text-[11px] text-stone-400 space-y-1 pt-2 border-t border-stone-800">
                        <p><strong className="text-stone-300">الجمهور المستهدف: </strong>{ad.recommendedAudienceAr}</p>
                        <p><strong className="text-stone-300">الاتجاه البصري للفيديو: </strong>{ad.visualDirectionAr}</p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 border-t border-stone-800 mt-4 flex items-center justify-between gap-3">
                      <button
                        onClick={() => {
                          setSelectedAdTemplate(ad);
                          setActiveTab('templates');
                        }}
                        className="text-xs text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>معاينة في الإعلان الحي</span>
                      </button>

                      <button
                        onClick={() => handleCopyAdCopy(ad)}
                        className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-transform active:scale-95"
                      >
                        {copiedAdId === ad.id ? <Check className="w-3.5 h-3.5 text-stone-950" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedAdId === ad.id ? 'تم نسخ النص!' : 'نسخ الإعلان بالكامل'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: LIVE AD STORY & FEED PREVIEW */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              {/* Template Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-stone-950/70 rounded-2xl border border-stone-800">
                <div className="text-right">
                  <h4 className="text-sm font-bold text-white">معاينة محاكاة الإعلان على الهاتف</h4>
                  <p className="text-xs text-stone-400">اختر الحملة ونمط العرض للمعاينة الحية:</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex bg-stone-900 rounded-xl p-1 border border-stone-800 text-xs font-semibold">
                    <button
                      onClick={() => setAdFormatPreview('story')}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        adFormatPreview === 'story' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      Instagram/TikTok Story (9:16)
                    </button>
                    <button
                      onClick={() => setAdFormatPreview('feed')}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        adFormatPreview === 'feed' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      Facebook/Insta Feed (1:1)
                    </button>
                  </div>
                </div>
              </div>

              {/* Select Ad Category */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                {BRAND_IDENTITY.socialAdTemplates.map((ad: SocialAdTemplate) => (
                  <button
                    key={ad.id}
                    onClick={() => setSelectedAdTemplate(ad)}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors shrink-0 ${
                      selectedAdTemplate.id === ad.id
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-stone-950 text-stone-300 hover:bg-stone-800 border border-stone-800'
                    }`}
                  >
                    {ad.audienceCategory.split(' ')[0]} {ad.audienceCategory.split(' ')[1]}
                  </button>
                ))}
              </div>

              {/* Phone Mockup Preview */}
              <div className="flex justify-center">
                <div
                  className={`bg-stone-950 rounded-[2.5rem] p-3 border-4 border-stone-800 shadow-2xl relative overflow-hidden transition-all duration-300 ${
                    adFormatPreview === 'story' ? 'w-full max-w-xs aspect-[9/16]' : 'w-full max-w-sm aspect-[4/5]'
                  }`}
                >
                  {/* Phone Notch */}
                  <div className="w-28 h-4 bg-stone-900 rounded-full mx-auto mb-3"></div>

                  {/* Ad Container */}
                  <div className="relative h-[93%] rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 flex flex-col justify-between p-4">
                    {/* Top Ad Sponsor Header */}
                    <div className="flex items-center justify-between z-10 bg-stone-950/70 backdrop-blur-md p-2 rounded-2xl border border-stone-800/80">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-stone-950 p-1 border border-stone-700 flex items-center justify-center">
                          <img src="/casetech-shield-icon.svg" alt="CaseTech Shield" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-white flex items-center gap-1">
                            <span>casetech.eg</span>
                            <span className="text-cyan-400 font-bold">✓</span>
                          </p>
                          <span className="text-[9px] text-stone-400">إعلان ممول · Sponsored</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                        {selectedAdTemplate.estimatedRoas}
                      </span>
                    </div>

                    {/* Ad Visual Image Slot */}
                    <div className="my-auto py-2">
                      <div className="relative rounded-2xl overflow-hidden border border-stone-800 aspect-square shadow-lg">
                        <img
                          src={
                            selectedAdTemplate.id === 'ad-anime'
                              ? '/src/assets/images/anime_uv_case_1793495650837.jpg'
                              : selectedAdTemplate.id === 'ad-football'
                              ? '/src/assets/images/football_case_1793495651444.jpg'
                              : selectedAdTemplate.id === 'ad-egypt-tarab'
                              ? '/src/assets/images/egypt_icons_case_1793495666188.jpg'
                              : '/src/assets/images/luxury_unboxing_box_1793495649649.jpg'
                          }
                          alt="Ad Visual Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-stone-950/80 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-cyan-400 border border-stone-700">
                          طباعة UV ثلاثية الأبعاد
                        </div>
                      </div>
                    </div>

                    {/* Bottom Ad Copy & Swipe CTA */}
                    <div className="z-10 bg-stone-950/85 backdrop-blur-md p-3 rounded-2xl border border-stone-800 text-right space-y-2">
                      <p className="text-xs font-black text-white line-clamp-1">{selectedAdTemplate.hookHeadlineAr}</p>
                      <p className="text-[10px] text-stone-300 line-clamp-2 leading-relaxed">
                        {selectedAdTemplate.bodyCopyAr}
                      </p>

                      <button
                        onClick={() => handleCopyAdCopy(selectedAdTemplate)}
                        className="w-full py-2 bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-transform active:scale-95"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{selectedAdTemplate.callToActionAr}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
          <div className="text-xs text-stone-400">
            هوية <strong className="text-cyan-400">كيستيك | CaseTech</strong> صُممت لتنافس براندات الحماية والتخصيص العالمية.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl transition-colors"
          >
            إغلاق الدليل
          </button>
        </div>
      </div>
    </div>
  );
};
