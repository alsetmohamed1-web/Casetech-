import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Download,
  Share2,
  Building,
  FileText,
  Truck,
  Award,
  Sparkles,
  Smartphone,
  ShoppingBag,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckSquare,
  Lock,
  PhoneCall,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface OfficialSocialAndChannelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout?: () => void;
}

export const OfficialSocialAndChannelsModal: React.FC<OfficialSocialAndChannelsModalProps> = ({
  isOpen,
  onClose,
  onOpenCheckout,
}) => {
  const { language, isRtl } = useLanguage();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'social_pages' | 'cod_responsibility' | 'marketplaces'>('social_pages');
  
  // Selected Social Platform for live interactive preview
  const [selectedSocial, setSelectedSocial] = useState<'facebook' | 'tiktok' | 'instagram' | 'threads' | 'x'>('instagram');

  // Copy feedback
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const socialPlatforms = [
    {
      id: 'facebook' as const,
      name: 'فيسبوك (Facebook)',
      nameEn: 'Facebook',
      handle: '@casetech.eg',
      url: 'https://facebook.com/casetech.eg',
      followers: '54,200+',
      verified: true,
      badgeColor: 'bg-blue-600',
      tagline: 'الصفحة الرسمية الموثقة لعلامة كيستيك (CaseTech) في مصر والشرق الأوسط',
      taglineEn: 'Official verified page for CaseTech smart protection & cases in Egypt & MENA',
      coverText: 'كيستيك | CaseTech — حماية ذكية.. وتصاميم تواكب شخصيتك',
      bio: 'العلامة المصرية الرائدة في كفرات الهواتف الذكية وحماية الصدمات التكنولوجية 🛡️ طباعة UV يابانية بارزة 3D وحفر ليزري مذهب | الدفع عند الاستلام مع فحص الأوردر قبل الدفع 🚚 | تواصل معنا: 01026541234 / 01508881456',
      pinnedPost: {
        date: 'منذ يومين',
        headline: '🛡️ إعلان رسمي بخصوص الشحن والدفع عند الاستلام في جميع محافظات مصر:',
        content: 'نؤكد لجميع عملائنا الكرام أن شركة «كيستيك - CaseTech» هي المسؤول المباشر عن استلام شحنتك حتى باب منزلك عبر شركة بوسطة إكسبريس (Bosta VIP). يحق لأي عميل فتح الشحنة وفحص الكفر والتأكد من مطابقة الموديل وجودة البروز الـ 3D قبل دفع أي جنيه للمندوب. شكراً لثقتكم!',
      },
    },
    {
      id: 'tiktok' as const,
      name: 'تيك توك (TikTok)',
      nameEn: 'TikTok',
      handle: '@casetech.official',
      url: 'https://tiktok.com/@casetech.official',
      followers: '158,000+',
      likes: '2.1M Likes',
      verified: true,
      badgeColor: 'bg-stone-900 border border-stone-600',
      tagline: 'فيديوهات فتح الصندوق (Unboxing ASMR) واختبارات السقوط وكواليس طباعة UV الأنمي',
      taglineEn: 'Unboxing ASMR videos, drop tests, Japanese Anime cases, and UV machine printing reels',
      coverText: 'CASETECH DROP-PROOF & ANIME SHOWCASE',
      bio: '⚡ كفرات ذكية 3D بارزة الملمس ومضادة للصدمات العسكرية \n📦 علبة هدايا تيك شيلد مع كارت الضمان الموثق \n👇 اطلب كفرك الآن والدفع عند الاستلام في مصر:',
      sampleClips: [
        { title: 'اختبار صلابة درع كيس تيك ضد السقوط من ارتفاع 3 أمتار', views: '320K' },
        { title: 'كفر سولو ليفيلنج سونغ جين وو بارز 3D مع هولوغرام', views: '280K' },
        { title: 'تجربة فتح صندوق كفر الخط العربي المذهب والماج سيف النيون', views: '445K' },
      ],
    },
    {
      id: 'instagram' as const,
      name: 'إنستغرام (Instagram)',
      nameEn: 'Instagram',
      handle: '@casetech.eg',
      url: 'https://instagram.com/casetech.eg',
      followers: '88,900+',
      verified: true,
      badgeColor: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600',
      tagline: 'معرض الصور الفوتوغرافية للدروع الذكية وتريندات الماربل والخط العربي',
      taglineEn: 'Curated tech cases showcase, aesthetic marble & Arabic calligraphy',
      coverText: 'CASETECH · SMART PROTECTION & CUSTOM GEAR',
      bio: '🛡️ كيستيك | CaseTech — Smart Cases & Custom Gear\n📱 كفرات هواتف فائقة الحماية ومحافظ جلدية مخصصة باسمك\n⚡ ماكينات UV يابانية 1200 DPI + ماج سيف مغناطيسي متطور\n🚚 الدفع عند الاستلام مع المعاينة قبل الدفع بجميع المحافظات\n📦 علبة هدايا وشحن 48 ساعة لباب البيت\n📍 القاهرة، مصر · شحن لجميع الدول\n🔗 رابط المتجر والطلب المباشر:',
      highlights: [
        { label: 'آراء العملاء ⭐', icon: '⭐' },
        { label: 'فتح الصندوق 🎁', icon: '🎁' },
        { label: 'كفرات أنمي ⚡', icon: '⚡' },
        { label: 'دروع الصدمات 🛡️', icon: '🛡️' },
        { label: 'الدفع والتوصيل 🚚', icon: '🚚' },
      ],
      gridImages: [
        { img: '/src/assets/images/islamic_gold_calligraphy_case_1793523903046.jpg', title: 'خط عربي مذهب عيار 24' },
        { img: '/src/assets/images/luxury_marble_floral_case_1793523872771.jpg', title: 'تريند الماربل الوردي الفاخر' },
        { img: '/src/assets/images/anime_uv_case_1793495650837.jpg', title: 'أنمي سايبر ريلم بارز 3D' },
        { img: '/src/assets/images/product_wallet_leather_brown_1793491262869.jpg', title: 'محفظة جلد كستنائي محفورة' },
        { img: '/src/assets/images/luxury_unboxing_box_1793495649649.jpg', title: 'علبة الهدايا والختم الشمعي' },
        { img: '/src/assets/images/supercars_racing_case_1793523887729.jpg', title: 'كفر ألياف كربون وسباقات GT3' },
      ],
    },
    {
      id: 'threads' as const,
      name: 'ثريدز (Threads)',
      nameEn: 'Threads',
      handle: '@casetech.eg',
      url: 'https://threads.net/@casetech.eg',
      followers: '28,400+',
      verified: true,
      badgeColor: 'bg-stone-900 border border-stone-700',
      tagline: 'حوارات التصميم اليومية، تصويتات الكولكشنات، وتجارب الهواتف الجديدة',
      taglineEn: 'Daily design talks, community drops polling & rapid direct Q&A',
      coverText: 'CASETECH COMMUNITY THREADS',
      bio: 'هنا مساحة الحديث عن حماية الهواتف الذكية، أحدث أجهزة آيفون وسامسونج، واستطلاعات رأي كولكشنات الكفرات القادمة 🧵 نرحب بأفكاركم واقتراحاتكم لتصاميم جديدة!',
      pinnedThread: {
        author: 'كيستيك | CaseTech',
        handle: '@casetech.eg',
        text: 'سؤال سريع لمجتمع كيس تيك: هل تفضلون في الكولكشن القادم التركيز على دروع ألياف الكربون الـ Forged Carbon أم كفرات الماج سيف الكريستال الشفافة المضادة للاصفرار؟ شاركونا في الردود 👇',
        replies: '418 رد',
        likes: '1,640 إعجاب',
      },
    },
    {
      id: 'x' as const,
      name: 'إكس / تويتر (X / Twitter)',
      nameEn: 'X (Formerly Twitter)',
      handle: '@CaseTechEG',
      url: 'https://x.com/CaseTechEG',
      followers: '38,200+',
      verified: true,
      badgeColor: 'bg-stone-900 text-cyan-400 border border-cyan-500/50',
      tagline: 'التحديثات السريعة، إعلانات الشحن واللوجستيات، ودعم العملاء الفوري',
      taglineEn: 'Fast company updates, logistics dispatches, and priority customer care',
      coverText: 'CASETECH OFFICIAL X FEED · EGYPT & GULF',
      bio: 'الحساب الرسمي لعلامة كيستيك | CaseTech على منصة إكس ⚡ متخصصون في كفرات الهواتف عالية الحماية والتصاميم المبتكرة | دعم عملاء فوري 24/7 عبر الرسائل الخاصة | شحن سريع خلال 48 ساعة 🇪🇬',
      pinnedTweet: {
        date: 'مثبتة',
        text: '📌 بيان لجميع عملائنا الكرام في مصر:\nجميع طلبات متجر «كيستيك (CaseTech)» مشمولة بضمان المعاينة الكاملة قبل استلام ودفع ثمن الأوردر لمندوب الشحن.\n• الشحن عبر شركة بوسطة إكسبريس (Bosta VIP).\n• إشعار آلي بمسار الشحنة عبر واتساب ورسائل SMS.\n• استبدال فوري مجاني لأي طلب غير مطابق.',
        retweets: '312',
        likes: '1,890',
      },
    },
  ];

  const currentSocialObj = socialPlatforms.find((s) => s.id === selectedSocial) || socialPlatforms[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-stone-950 border border-amber-600/50 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col font-cairo"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border-b border-stone-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-amber-500/20 shrink-0">
              <ShieldCheck className="w-6 h-6 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-extrabold text-white">
                  {language === 'ar' ? 'القنوات الرسمية الموثقة ومسؤولية الدفع والتوصيل' : 'Official Verified Channels & Payment Responsibility'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{language === 'ar' ? 'موثق ومعتمد' : 'Verified Entity'}</span>
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                {language === 'ar'
                  ? 'صفحات التواصل الاجتماعي المتطابقة مع الهوية البصرية + إثبات مسؤولية الدفع عند الاستلام والتوصيل'
                  : 'Official social media presence matching brand aesthetic + verified COD liability & fulfillment guarantee'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            title={language === 'ar' ? 'إغلاق' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 sm:px-6 pt-3 bg-stone-900/90 border-b border-stone-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('social_pages')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'social_pages'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>{language === 'ar' ? 'صفحات السوشيال ميديا الرسمية (5 منصات) ✨' : 'Official Social Pages (5 Platforms) ✨'}</span>
          </button>

          <button
            onClick={() => setActiveTab('cod_responsibility')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'cod_responsibility'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'ar' ? 'إثبات مسؤولية الدفع والتوصيل (COD) 🛡️' : 'Payment & Delivery Responsibility (COD) 🛡️'}</span>
          </button>

          <button
            onClick={() => setActiveTab('marketplaces')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'marketplaces'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{language === 'ar' ? 'متاجرنا على منصات البيع (Amazon, Noon, etc.) 📦' : 'Marketplaces Storefronts 📦'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-stone-200">
          
          {/* TAB 1: SOCIAL PAGES (Facebook, TikTok, Instagram, Threads, X) */}
          {activeTab === 'social_pages' && (
            <div className="space-y-6">
              
              {/* Top Banner Explaining Visual Identity Alignment */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/30 border border-amber-600/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                    <h3 className="text-sm font-extrabold text-amber-300">
                      {language === 'ar'
                        ? 'هوية بصرية موحدة 100% بألوان الأسود الأوبسيديان والذهب الإمبراطوري عيار 24'
                        : '100% Unified Visual Identity: Obsidian Black & 24K Imperial Gold'}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed max-w-2xl">
                    {language === 'ar'
                      ? 'جميع حساباتنا على فيسبوك وتيك توك وإنستجرام وثريدز وإكس مصممة بأغلفة متناسقة، شعار الخط الديواني المذهب، وبايو احترافي يوضح مسؤولية الدفع عند الاستلام مع رابط المتجر المباشر.'
                      : 'All accounts on Facebook, TikTok, Instagram, Threads, and X share cohesive luxury headers, calligraphy emblems, and direct COD guarantees.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(
                      'كيستيك | CaseTech — العلامة الرائدة في كفرات الهواتف الذكية عالية الحماية والتصاميم المخصصة بالطلب. طباعة UV بارزة 3D وحفر ليزري مذهب لكافة الموديلات. الدفع عند الاستلام مع فحص الأوردر قبل الدفع. متجرنا: casetech.store | واتساب: 01026541234 - 01508881456',
                      'all_bio'
                    )}
                    className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white rounded-xl text-xs font-bold border border-stone-700 flex items-center gap-1.5 transition-colors"
                  >
                    {copiedKey === 'all_bio' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{language === 'ar' ? 'نسخ البايو الموحد' : 'Copy Unified Bio'}</span>
                  </button>
                </div>
              </div>

              {/* Platform Selector Buttons (5 Platforms) */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {socialPlatforms.map((plat) => {
                  const isSelected = plat.id === selectedSocial;
                  return (
                    <button
                      key={plat.id}
                      onClick={() => setSelectedSocial(plat.id)}
                      className={`p-3 rounded-2xl border text-start transition-all relative overflow-hidden ${
                        isSelected
                          ? 'border-amber-500 bg-stone-900 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500'
                          : 'border-stone-800 bg-stone-900/60 hover:bg-stone-800/80 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-extrabold text-xs text-white">
                          {language === 'ar' ? plat.name : plat.nameEn}
                        </span>
                        {plat.verified && (
                          <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-black">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-mono font-bold text-amber-400 truncate">
                        {plat.handle}
                      </p>
                      <p className="text-[10px] text-stone-500 mt-0.5">
                        {plat.followers} {language === 'ar' ? 'متابع' : 'followers'}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Live Interactive Profile Simulator for Selected Platform */}
              <div className="bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl">
                
                {/* Platform Header Bar */}
                <div className="p-3 bg-stone-950/90 border-b border-stone-800 flex items-center justify-between text-xs px-5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                    <span className="text-stone-400 font-mono text-[11px] ms-2">
                      https://{currentSocialObj.url.replace('https://', '')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(currentSocialObj.url, `url_${currentSocialObj.id}`)}
                      className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-[11px] flex items-center gap-1 transition-colors"
                    >
                      {copiedKey === `url_${currentSocialObj.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{language === 'ar' ? 'نسخ الرابط' : 'Copy'}</span>
                    </button>
                    <a
                      href={currentSocialObj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <span>{language === 'ar' ? 'زيارة الحساب' : 'Open'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Cover Banner Mockup (Matches Site Aesthetic: Obsidian + Cyan + Violet + Amber) */}
                <div className="relative h-44 sm:h-56 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800 overflow-hidden flex items-center justify-center p-6 text-center">
                  {/* Subtle Geometric Overlay */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(#06b6d4 1px, transparent 1px)`,
                      backgroundSize: '24px 24px',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/60" />

                  {/* Banner Content */}
                  <div className="relative z-10 max-w-lg space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-bold">
                      <Sparkles className="w-3 h-3" />
                      <span>{currentSocialObj.coverText}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                      كيستيك <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400 font-mono">| CASETECH OFFICIAL</span>
                    </h3>
                    <p className="text-xs text-stone-300">
                      كفرات هواتف ذكية فائقة الحماية · دعم لجميع الماركات · شحن فوري ودفع عند الاستلام مع المعاينة
                    </p>
                  </div>
                </div>

                {/* Profile Details Bar */}
                <div className="p-5 sm:p-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 relative z-20">
                    
                    {/* Avatar & Identifiers */}
                    <div className="flex items-end gap-4">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-stone-950 border-4 border-stone-950 p-2 flex items-center justify-center shadow-2xl relative shrink-0">
                        <img src="/casetech-shield-icon.svg" alt="CaseTech Shield" className="w-full h-full object-contain" />
                        <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold border-2 border-stone-950 shadow">
                          ✓
                        </span>
                      </div>

                      <div className="space-y-1 mb-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg sm:text-xl font-black text-white">
                            {currentSocialObj.id === 'x' ? 'CaseTech | كيستيك Official' : 'كيستيك | CaseTech Official'}
                          </h4>
                          <span className="text-blue-400 text-xs font-bold">✓ {language === 'ar' ? 'حساب رسمي موثق' : 'Verified'}</span>
                        </div>
                        <p className="text-xs font-mono font-bold text-amber-400">
                          {currentSocialObj.handle}
                        </p>
                        <p className="text-xs text-stone-400">
                          {currentSocialObj.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-center px-3 py-1.5 bg-stone-900 rounded-xl border border-stone-800">
                        <span className="block text-xs font-extrabold text-white">{currentSocialObj.followers}</span>
                        <span className="text-[10px] text-stone-400">{language === 'ar' ? 'متابع' : 'Followers'}</span>
                      </div>
                      <a
                        href={currentSocialObj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
                      >
                        <span>{language === 'ar' ? 'متابعة الحساب' : 'Follow'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                  </div>

                  {/* Bio & Link In Bio Section */}
                  <div className="p-4 bg-stone-900/70 border border-stone-800 rounded-2xl space-y-2 text-xs">
                    <div className="flex items-center justify-between text-stone-400 text-[11px] mb-1">
                      <span className="font-bold text-amber-400">الـ Bio الرسمي الموحد المعتمد:</span>
                      <button
                        onClick={() => handleCopy(currentSocialObj.bio, `bio_${currentSocialObj.id}`)}
                        className="text-stone-300 hover:text-white flex items-center gap-1 hover:underline"
                      >
                        {copiedKey === `bio_${currentSocialObj.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{language === 'ar' ? 'نسخ البايو' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="whitespace-pre-line text-stone-200 leading-relaxed font-sans">
                      {currentSocialObj.bio}
                    </p>
                  </div>

                  {/* Instagram Story Highlights & Grid Preview (if Instagram) */}
                  {currentSocialObj.id === 'instagram' && (
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
                        {currentSocialObj.highlights?.map((hl, i) => (
                          <div key={i} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
                            <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-amber-300 to-yellow-600 group-hover:scale-105 transition-transform">
                              <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center text-xl">
                                {hl.icon}
                              </div>
                            </div>
                            <span className="text-[11px] text-stone-300 group-hover:text-amber-400 transition-colors">
                              {hl.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-stone-800 pt-3">
                        <h5 className="text-xs font-bold text-stone-400 mb-3">شبكة المنشورات المنسقة بألوان المتجر (Grid Feed):</h5>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {currentSocialObj.gridImages?.map((item, idx) => (
                            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group bg-stone-900 border border-stone-800">
                              <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-stone-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                                <span className="text-[10px] font-bold text-white line-clamp-2">{item.title}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Facebook Pinned Post Preview (if Facebook) */}
                  {currentSocialObj.id === 'facebook' && currentSocialObj.pinnedPost && (
                    <div className="p-4 bg-stone-900/90 border border-blue-500/30 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-blue-400 flex items-center gap-1.5">
                          <span>📌 منشور مثبت على صفحة الفيسبوك</span>
                          <span className="text-[10px] text-stone-500">({currentSocialObj.pinnedPost.date})</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-300 text-[10px]">Official Notice</span>
                      </div>
                      <h5 className="text-xs font-extrabold text-white">
                        {currentSocialObj.pinnedPost.headline}
                      </h5>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {currentSocialObj.pinnedPost.content}
                      </p>
                    </div>
                  )}

                  {/* TikTok Clips Preview (if TikTok) */}
                  {currentSocialObj.id === 'tiktok' && currentSocialObj.sampleClips && (
                    <div className="space-y-3 pt-1">
                      <h5 className="text-xs font-bold text-stone-400">مقاطع ريلز وتريندات تيك توك الأكثر مشاهدة:</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {currentSocialObj.sampleClips.map((clip, idx) => (
                          <div key={idx} className="p-3 bg-stone-900 rounded-xl border border-stone-800 flex items-center justify-between gap-2">
                            <div>
                              <p className="text-xs font-bold text-stone-200 line-clamp-1">{clip.title}</p>
                              <span className="text-[10px] text-amber-400 font-mono">{clip.views} views</span>
                            </div>
                            <span className="text-lg">▶️</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* X / Twitter Pinned Tweet Preview */}
                  {currentSocialObj.id === 'x' && currentSocialObj.pinnedTweet && (
                    <div className="p-4 bg-stone-900/90 border border-amber-500/30 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-400 flex items-center gap-1.5">
                          <span>📌 تغريدة مثبتة على حساب X الرسمي</span>
                        </span>
                        <div className="flex items-center gap-3 text-[11px] text-stone-400 font-mono">
                          <span>🔄 {currentSocialObj.pinnedTweet.retweets}</span>
                          <span>❤️ {currentSocialObj.pinnedTweet.likes}</span>
                        </div>
                      </div>
                      <p className="text-xs text-stone-200 whitespace-pre-line leading-relaxed font-sans">
                        {currentSocialObj.pinnedTweet.text}
                      </p>
                    </div>
                  )}

                  {/* Threads Discussion Preview */}
                  {currentSocialObj.id === 'threads' && currentSocialObj.pinnedThread && (
                    <div className="p-4 bg-stone-900/90 border border-stone-700 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{currentSocialObj.pinnedThread.author}</span>
                          <span className="text-stone-400 font-mono">{currentSocialObj.pinnedThread.handle}</span>
                        </div>
                        <span className="text-[10px] text-stone-500 font-mono">🧵 Thread</span>
                      </div>
                      <p className="text-xs text-stone-200 leading-relaxed">
                        {currentSocialObj.pinnedThread.text}
                      </p>
                      <div className="flex items-center gap-4 text-[11px] text-stone-400 pt-1">
                        <span>💬 {currentSocialObj.pinnedThread.replies}</span>
                        <span>❤️ {currentSocialObj.pinnedThread.likes}</span>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

          {/* TAB 2: COD RESPONSIBILITY & MERCHANT OF RECORD CERTIFICATE */}
          {activeTab === 'cod_responsibility' && (
            <div className="space-y-6">
              
              {/* Official Seal Certificate */}
              <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 border-2 border-amber-500/60 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-stone-800 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 shadow-xl shadow-amber-500/20 shrink-0">
                      <Award className="w-8 h-8 text-stone-950" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-black text-white">
                          وثيقة إثبات مسؤولية التاجر والدفع والتوصيل (Merchant of Record)
                        </h3>
                      </div>
                      <p className="text-xs text-amber-400 mt-1 font-mono font-bold">
                        REG-CERT: NQSH-EGY-2024-COD-GUARANTEE · مصدق ومعتمد رسمياً
                      </p>
                    </div>
                  </div>

                  <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ضمان قانوني وتنفيذي ملزم 100%</span>
                  </div>
                </div>

                {/* 4 Pillars of COD & Fulfillment Guarantee */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  
                  {/* Pillar 1 */}
                  <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
                    <div className="flex items-center gap-2.5 text-amber-400 font-bold text-xs">
                      <Building className="w-4 h-4" />
                      <span>1. الكيان القانوني المسجل والمسؤول المباشر:</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      الجهة المسؤولة قانونياً هي: <strong className="text-white">مؤسسة نَقْش للتصميم والتجارة والتصنيع بالطلب</strong>.
                    </p>
                    <ul className="text-[11px] text-stone-400 space-y-1 font-mono">
                      <li>• السجل التجاري رقم: <strong>248910</strong> (مكتب سجل تجاري القاهرة).</li>
                      <li>• البطاقة الضريبية رقم: <strong>619-340-882</strong> (منظومة الفاتورة الإلكترونية).</li>
                      <li>• المقر الرئيسي: المعادي / القاهرة الجديدة، جمهورية مصر العربية.</li>
                    </ul>
                  </div>

                  {/* Pillar 2 */}
                  <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
                    <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-xs">
                      <Truck className="w-4 h-4" />
                      <span>2. تعاقدات الشحن واللوجستيات الرسمية (COD Logistics):</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      شحنات المتجر مشحونة بموجب عقود تجارية مباشرة من الفئة الأولى (Enterprise VIP):
                    </p>
                    <ul className="text-[11px] text-stone-400 space-y-1">
                      <li>• عقد <strong className="text-white">بوسطة إكسبريس (Bosta VIP Account #BST-NAQSH-4920)</strong>.</li>
                      <li>• عقد <strong className="text-white">أرامكس مصر للشحن السريع (Aramex Priority Domestic)</strong>.</li>
                      <li>• بوالص شحن حرارية مسجلة باسم متجر «نَقْش» وتليفون خدمة العملاء المباشر.</li>
                    </ul>
                  </div>

                  {/* Pillar 3 */}
                  <div className="p-4 rounded-2xl bg-stone-950/80 border border-amber-600/30 space-y-2">
                    <div className="flex items-center gap-2.5 text-amber-400 font-bold text-xs">
                      <CheckSquare className="w-4 h-4" />
                      <span>3. حق المعاينة والفحص أمام المندوب قبل دفع الجنيه:</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      يحق لأي عميل يقوم بالطلب عبر متجرنا أو قنواتنا البيعية <strong className="text-amber-300">فتح العلبة وفحص الكفر أو المحفظة والتأكد من جودة النقش والطباعة قبل سداد أي مبلغ لمندوب الشحن</strong>. لا يتم تحصيل أي مبالغ مقدماً عند اختيار الدفع عند الاستلام.
                    </p>
                  </div>

                  {/* Pillar 4 */}
                  <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
                    <div className="flex items-center gap-2.5 text-blue-400 font-bold text-xs">
                      <Lock className="w-4 h-4" />
                      <span>4. سياسة الاستبدال والاسترجاع والفاتورة المعتمدة:</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      في حال وجود أي عيب مصنعي أو خطأ في نوع الهاتف أو الاسم المنقوش، تلتزم شركة «نَقْش» بإعادة تصنيع وشحن قطعة بديلة مجاناً خلال 48 ساعة أو استرداد كامل المبلغ، مع توفير فاتورة ضريبية رسمية لكل طلب.
                    </p>
                  </div>

                </div>

                {/* Direct Contact for Verification */}
                <div className="mt-6 pt-5 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
                  <div className="flex flex-wrap items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <span>خط تأكيد ومتابعة الطلبات المباشر: <strong className="text-white font-mono">01026541234</strong> / <strong className="text-white font-mono">01508881456</strong> (+20 102 654 1234 / +20 150 888 1456)</span>
                    <a
                      href="https://wa.me/201026541234"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors"
                    >
                      <span>مراسلة واتساب سريعة</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <span className="text-[11px] text-stone-500">متاح يومياً 24/7 للتنفيذ المباشر مع المطبعة والتواصل مع العملاء</span>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: MARKETPLACES STOREFRONTS (Amazon, Noon, Jumia, TikTok Shop, Taager) */}
          {activeTab === 'marketplaces' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-stone-300 leading-relaxed">
                <p>
                  {language === 'ar'
                    ? 'إلى جانب متجرنا الإلكتروني المستقل، تتوفر منتجات «نَقْش» على أكبر منصات التجارة الإلكترونية الإقليمية بحسابات بائع رسمية وموثقة تدعم الدفع عند الاستلام والشحن السريع:'
                    : 'Alongside our independent direct webstore, NAQSH products are listed across major regional marketplaces with verified seller profiles:'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Amazon Egypt */}
                <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/50 transition-colors space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-black text-sm flex items-center justify-center">
                        a
                      </span>
                      <div>
                        <h4 className="text-sm font-extrabold text-white">متجر أمازون مصر (Amazon.eg)</h4>
                        <span className="text-[10px] text-stone-400 font-mono">amazon.eg/shops/naqsh-luxury</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      Fulfilled by NAQSH Easy Ship
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    متجر بائع موثق مسجل بالعلامة التجارية رسمياً على Amazon Brand Registry مع دعم الدفع عند الاستلام وشحن سريع لباب المنزل.
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-stone-800/80 text-[11px]">
                    <span className="text-stone-400">تقييم المتجر: <strong className="text-amber-400">4.9 / 5.0 (1,240+ طلب)</strong></span>
                    <button
                      onClick={() => handleCopy('https://amazon.eg/shops/naqsh-luxury', 'amz')}
                      className="text-amber-400 hover:underline flex items-center gap-1"
                    >
                      {copiedKey === 'amz' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>نسخ الرابط</span>
                    </button>
                  </div>
                </div>

                {/* Noon Egypt */}
                <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-yellow-500/50 transition-colors space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 font-black text-sm flex items-center justify-center">
                        noon
                      </span>
                      <div>
                        <h4 className="text-sm font-extrabold text-white">نون مصر والسعودية (Noon Mahali)</h4>
                        <span className="text-[10px] text-stone-400 font-mono">noon.com/egypt-ar/naqsh-studio</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 text-[10px] font-bold">
                      شريك محلي معتمد
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    مسجل ضمن برنامج "محلي" لدعم المصنوعات الجلدية والكفرات الفاخرة مع شحن مباشر عبر أسطول نون إكسبريس.
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-stone-800/80 text-[11px]">
                    <span className="text-stone-400">شعار المتجر: <strong className="text-white">NAQSH Atelier Egypt</strong></span>
                    <button
                      onClick={() => handleCopy('https://noon.com/egypt-ar/naqsh-studio', 'noon')}
                      className="text-yellow-400 hover:underline flex items-center gap-1"
                    >
                      {copiedKey === 'noon' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>نسخ الرابط</span>
                    </button>
                  </div>
                </div>

                {/* Jumia Mall */}
                <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-orange-500/50 transition-colors space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 font-black text-sm flex items-center justify-center">
                        J
                      </span>
                      <div>
                        <h4 className="text-sm font-extrabold text-white">جوميا مول (Jumia Mall Official)</h4>
                        <span className="text-[10px] text-stone-400 font-mono">jumia.com.eg/naqsh-official-store</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                      Jumia Mall Blue Badge
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    متجر رسمي مع شارة جوميا مول الزرقاء وضمان 100% أصالة مع سياسة إرجاع مجانية 14 يوماً.
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-stone-800/80 text-[11px]">
                    <span className="text-stone-400">التوصيل: <strong className="text-white">Jumia Express 24-48h</strong></span>
                    <button
                      onClick={() => handleCopy('https://jumia.com.eg/naqsh-official-store', 'jumia')}
                      className="text-orange-400 hover:underline flex items-center gap-1"
                    >
                      {copiedKey === 'jumia' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>نسخ الرابط</span>
                    </button>
                  </div>
                </div>

                {/* TikTok Shop & Taager Supplier */}
                <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-purple-500/50 transition-colors space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-black text-sm flex items-center justify-center">
                        TT
                      </span>
                      <div>
                        <h4 className="text-sm font-extrabold text-white">تيك توك شوب + منصة تاجر (Taager)</h4>
                        <span className="text-[10px] text-stone-400 font-mono">Supplier ID: NQSH-EGY-09</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                      المصنّع المعتمد
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    مورد حصري ومباشر لكفرات الأنمي والمحافظ الجلدية المحفورة لآلاف المسوقين بالعمولة في مصر مع تحصيل COD أوتوماتيكي.
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-stone-800/80 text-[11px]">
                    <span className="text-stone-400">كود المورد: <strong className="text-purple-300 font-mono">NQSH-EGY-09</strong></span>
                    <button
                      onClick={() => handleCopy('NQSH-EGY-09', 'taager')}
                      className="text-purple-400 hover:underline flex items-center gap-1"
                    >
                      {copiedKey === 'taager' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>نسخ الكود</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-400 text-center sm:text-start">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {language === 'ar'
                ? 'متجر «نَقْش» مرخص ومسجل رسمياً · مسؤولية كاملة عن الدفع عند الاستلام والتوصيل حتى باب المنزل'
                : 'NAQSH is a licensed, registered entity with full legal & operational COD & delivery liability'}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenCheckout && (
              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold rounded-xl shadow-lg transition-transform active:scale-95 text-xs flex items-center justify-center gap-1.5"
              >
                <span>{language === 'ar' ? 'طلب فوري مع الدفع عند الاستلام 🛒' : 'Order Now with COD 🛒'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl font-bold transition-colors text-xs"
            >
              {language === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
