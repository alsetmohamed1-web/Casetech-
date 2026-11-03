import React, { useState } from 'react';
import {
  Settings,
  X,
  Sparkles,
  Share2,
  Camera,
  Users,
  Crown,
  Zap,
  Gift,
  Palette,
  Brain,
  BellRing,
  ChevronUp,
  ChevronDown,
  Layers,
  ShoppingBag,
  Eye,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface OwnerAdminControlDrawerProps {
  onOpenSocialPosting: () => void;
  onOpenOfficialSocial: () => void;
  onOpenQuickShare: () => void;
  onOpenBrandKit: () => void;
  onOpenAiStudio: () => void;
  onOpenLeatherSim: () => void;
  onOpenMediaUpload: () => void;
  onOpenPriceAlerts: () => void;
  onOpenSupplyChain: () => void;
  onOpenOmnichannel: () => void;
  onOpenUnboxing: () => void;
  onOpenAdminStaff: () => void;
  onOpenLoyalty: () => void;
  isCustomerView: boolean;
  onToggleCustomerView: () => void;
}

export const OwnerAdminControlDrawer: React.FC<OwnerAdminControlDrawerProps> = ({
  onOpenSocialPosting,
  onOpenOfficialSocial,
  onOpenQuickShare,
  onOpenBrandKit,
  onOpenAiStudio,
  onOpenLeatherSim,
  onOpenMediaUpload,
  onOpenPriceAlerts,
  onOpenSupplyChain,
  onOpenOmnichannel,
  onOpenUnboxing,
  onOpenAdminStaff,
  onOpenLoyalty,
  isCustomerView,
  onToggleCustomerView,
}) => {
  const { language, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sleek, Non-Obstructive Docked Floating Pill on Bottom Edge */}
      <aside
        aria-label={language === 'ar' ? 'شريط تحكم التاجر ومعاينة الجمهور' : 'Store Owner & Customer View Bar'}
        className={`fixed bottom-4 ${isRtl ? 'left-4' : 'right-4'} z-40 flex items-center gap-2`}
      >
        {/* 1. Toggle Customer View vs Admin View */}
        <button
          onClick={onToggleCustomerView}
          className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-bold transition-all shadow-xl backdrop-blur-md border active:scale-95 cursor-pointer ${
            isCustomerView
              ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50 shadow-emerald-950/40 hover:bg-emerald-900/90'
              : 'bg-stone-900/95 text-stone-200 border-stone-700 shadow-black/50 hover:bg-stone-850'
          }`}
          title={
            isCustomerView
              ? 'أنت الآن في وضع تجربة الجمهور الحقيقية (المتجر نظيف 100% بدون أدوات تحكم)'
              : 'التبديل إلى وضع معاينة المتجر للجمهور والعملاء'
          }
        >
          <span className={`w-2 h-2 rounded-full ${isCustomerView ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">
            {isCustomerView
              ? (language === 'ar' ? 'معاينة الجمهور (المتجر الحقيقي)' : 'Customer Store View')
              : (language === 'ar' ? 'وضع الإدارة والتطوير' : 'Admin & Dev Mode')}
          </span>
          <span className="sm:hidden">
            {isCustomerView ? 'متجر الجمهور' : 'الإدارة'}
          </span>
        </button>

        {/* 2. Single Master Drawer Trigger (Replaces the 12 tall stacked buttons!) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-stone-900 via-indigo-950 to-stone-900 text-stone-100 font-bold text-xs border border-cyan-500/40 shadow-xl shadow-cyan-950/50 hover:border-cyan-400 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
          title="فتح لوحة أدوات التاجر والإدارة ورادار السوق (12 أداة في مكان واحد)"
        >
          <div className="w-5 h-5 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
            <Sliders className="w-3 h-3 text-cyan-400" />
          </div>
          <span className="hidden sm:inline">
            {language === 'ar' ? 'لوحة أدوات الإدارة ورادار السوق' : 'Store Admin Tools'}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
            12
          </span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
        </button>
      </aside>

      {/* Slide-over Control Center Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full sm:max-w-3xl bg-slate-950 border border-cyan-500/30 sm:rounded-3xl rounded-t-3xl shadow-2xl shadow-cyan-950/60 overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-6 duration-200"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    {language === 'ar' ? 'مركز قيادة التاجر والإدارة ورادار السوق' : 'Store Owner Cockpit & Market Radar'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {language === 'ar'
                      ? 'جميع أدوات التشغيل، رادار السوشيال، وسلاسل التوريد مجمعة بدقة لمنع حجب الشاشة عن المنتجات'
                      : 'All operational, social, and supply tools consolidated cleanly'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="إغلاق اللوحة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status & Mode Switch Banner */}
            <div className="px-5 py-2.5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">الوضع الحالي المعروض:</span>
                <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${
                  isCustomerView
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  {isCustomerView ? '🛍️ شكل المتجر الحقيقي للجمهور' : '🛠️ وضع التاجر والمسؤول'}
                </span>
              </div>

              <button
                onClick={onToggleCustomerView}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold underline flex items-center gap-1 cursor-pointer"
              >
                <span>{isCustomerView ? 'تفعيل وضع الإدارة وتعديل الكتالوج' : 'إخفاء أدوات الإدارة ومشاهدة المتجر كعميل'}</span>
                <span>←</span>
              </button>
            </div>

            {/* Body: 3 Organized Tool Groups */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              
              {/* GROUP 1: Marketing, Social Radar & Brand Hub */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-cyan-300">
                  <Share2 className="w-4 h-4 text-cyan-400" />
                  <span>1. التسويق ورادار السوق والسوشيال ميديا</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* Tool 1: Social Posting & Market Radar */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenSocialPosting();
                    }}
                    className="p-3 rounded-2xl bg-slate-900/90 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/50 transition-all text-start group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 flex items-center gap-1">
                          <span>سيستم البوستات ورادار السوق</span>
                          <span className="text-[9px] px-1 rounded bg-cyan-500/20 text-cyan-300">نشر متزامن ⚡</span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          نشر فوري للبوست الأول على المنصات الـ 5 ورادار الأحداث الرائجة
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Tool 2: Official Channels Hub */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenOfficialSocial();
                    }}
                    className="p-3 rounded-2xl bg-slate-900/90 hover:bg-blue-950/40 border border-slate-800 hover:border-blue-500/50 transition-all text-start group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Share2 className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-blue-300 flex items-center gap-1">
                          <span>قنوات السوشيال الرسمية الموثقة</span>
                          <span className="text-[9px] px-1 rounded bg-blue-500/20 text-blue-300">معاينة حية</span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          معاينة صفحات فيسبوك، انستغرام، تيك توك، ثريدز، وإكس
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Tool 3: Quick 1-Click Share & QR */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenQuickShare();
                    }}
                    className="p-3 rounded-2xl bg-slate-900/90 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 transition-all text-start group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Zap className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300 flex items-center gap-1">
                          <span>المشاركة السريعة ورمز QR</span>
                          <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300">واتساب</span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          مشاركة أي منتج عبر واتساب وتيليجرام وتوليد باركود فوري
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Tool 4: Brand Kit & ASMR Ads */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenBrandKit();
                    }}
                    className="p-3 rounded-2xl bg-slate-900/90 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-500/50 transition-all text-start group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Palette className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-purple-300 flex items-center gap-1">
                          <span>الهوية البصرية وإعلانات ASMR</span>
                          <span className="text-[9px] px-1 rounded bg-purple-500/20 text-purple-300">8x ROAS</span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          أكواد الألوان والخطوط وفيديوهات اختبارات السقوط العضوية
                        </p>
                      </div>
                    </div>
                  </button>

                </div>
              </div>

              {/* GROUP 2: AI, Customization & Product Simulators */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs font-black text-amber-300">
                  <Brain className="w-4 h-4 text-amber-400" />
                  <span>2. الذكاء الاصطناعي، التخصيص، ومحاكاة الخامات</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* Tool 5: AI High-Thinking Studio */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenAiStudio();
                    }}
                    className="p-3 rounded-2xl bg-slate-900/90 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-500/50 transition-all text-start group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Brain className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-indigo-300 flex items-center gap-1">
                          <span>استوديو التفكير الفائق وصور AI</span>
                          <span className="text-[9px] px-1 rounded bg-indigo-500/20 text-indigo-300">Gemini</span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          توليد تصاميم كفرات وخلفيات وكونسبت آرت فائق الدقة
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Tool 6: 3D Leather Simulator */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenLeatherSim();
                    }}
                    className="p-3 rounded-2xl bg-slate-900/90 hover:bg-amber-950/40 border border-slate-800 hover:border-amber-500/50 transition-all text-start group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-amber-300 flex items-center gap-1">
                          <span>محاكي ألوان الجلد والباتينا 3D</span>
                          <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300">جلد طبيعي</span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          معاينة تعتيق الجلود وتغير اللون مع مرور الوقت
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Tool 7: Camera & Media Upload */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenMediaUpload();
                    }}
                    className="p-3 rounded-2xl bg-slate-900/90 hover:bg-teal-950/40 border border-slate-800 hover:border-teal-500/50 transition-all text-start group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Camera className="w-4 h-4 text-teal-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-teal-300 flex items-center gap-1">
                          <span>رفع صور حديثة للطباعة الـ UV</span>
                          <span className="text-[9px] px-1 rounded bg-teal-500/20 text-teal-300">1200 DPI</span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          إضافة تصاميم من الكاميرا أو برابط وإرفاقها بالمنتجات
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Tool 8: Price Drop Flash Alerts */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenPriceAlerts();
                    }}
                    className="p-3 rounded-2xl bg-slate-900/90 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/50 transition-all text-start group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <BellRing className="w-4 h-4 text-rose-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-rose-300 flex items-center gap-1">
                          <span>رادار تنبيهات انخفاض الأسعار</span>
                          <span className="text-[9px] px-1 rounded bg-rose-500/20 text-rose-300">Flash Deals</span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          عروض الخصم اللحظية والعد التنازلي السريع
                        </p>
                      </div>
                    </div>
                  </button>

                </div>
              </div>

              {/* GROUP 3: Operations, Logistics & Staff */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs font-black text-emerald-300">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>3. سلاسل التوريد، بوسطة، والمنصات الخارجية</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* Tool 9: Supply Chain & Bosta */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenSupplyChain();
                    }}
                    className="p-3 rounded-2xl bg-slate-900/90 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 transition-all text-start group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Zap className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300 flex items-center gap-1">
                          <span>محاكي تدفق الأوردر ومطابع UV</span>
                          <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300">بوسطة</span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          إرسال أوامر الطباعة عبر الواتساب وتوليد البوليصة اللحظية
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Tool 10: Omnichannel (Amazon, Noon, TikTok Shop) */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenOmnichannel();
                    }}
                    className="p-3 rounded-2xl bg-slate-900/90 hover:bg-amber-950/40 border border-slate-800 hover:border-amber-500/50 transition-all text-start group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <ShoppingBag className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-amber-300 flex items-center gap-1">
                          <span>مركز قنوات أمازون ونون وكنز</span>
                          <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300">Omnichannel</span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          مزامنة المخزون ومبيعات الماركت بليس المتعددة
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Tool 11: Royal Unboxing */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenUnboxing();
                    }}
                    className="p-3 rounded-2xl bg-slate-900/90 hover:bg-yellow-950/40 border border-slate-800 hover:border-yellow-500/50 transition-all text-start group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-yellow-500/20 text-yellow-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Gift className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-yellow-300 flex items-center gap-1">
                          <span>تجربة فتح الصندوق الملكي الفاخر</span>
                          <span className="text-[9px] px-1 rounded bg-yellow-500/20 text-yellow-300">VIP Box</span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          خطوات التغليف، الختم الشمعي، وكارت الضمان الموثق
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Tool 12: Staff & Roles Management */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenAdminStaff();
                    }}
                    className="p-3 rounded-2xl bg-slate-900/90 hover:bg-blue-950/40 border border-slate-800 hover:border-blue-500/50 transition-all text-start group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Users className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-blue-300 flex items-center gap-1">
                          <span>المدراء والمتابعين وتوزيع الصلاحيات</span>
                          <span className="text-[9px] px-1 rounded bg-blue-500/20 text-blue-300">RBAC</span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          إضافة مشرفين ومسؤولي تغليف ومتابعي حركة الموقع
                        </p>
                      </div>
                    </div>
                  </button>

                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[11px]">
                {language === 'ar' ? '💡 تم جمع الأدوات في شريط موحد لحماية راحة زوار المتجر' : 'Consolidated to preserve customer shopping clarity'}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
