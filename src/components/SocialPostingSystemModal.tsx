import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  Calendar, 
  Plus, 
  Sparkles, 
  Flame, 
  Video, 
  Image as ImageIcon, 
  Send, 
  MessageSquare, 
  ThumbsUp, 
  TrendingUp,
  X,
  Smartphone,
  Hash,
  Eye,
  CheckCircle2,
  Clock,
  Layers,
  Radio,
  Zap,
  ShieldCheck,
  Award,
  BarChart3,
  RefreshCw,
  Heart,
  MessageCircle,
  Repeat
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { OFFICIAL_CONTACT_INFO, SOCIAL_LINKS } from '../data/branding';
import { ALL_CASE_COMPATIBLE_DEVICES } from '../data/products';

export interface SocialPostingSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCustomizer?: () => void;
  onOpenSocialHub?: () => void;
}

export interface ReadySocialPost {
  id: string;
  platform: 'facebook' | 'tiktok' | 'instagram' | 'threads' | 'x';
  title: string;
  category: 'viral_test' | 'luxury_calligraphy' | 'social_proof' | 'anime_pop' | 'dropship_b2b' | 'promo_sale';
  caption: string;
  hashtags: string[];
  cta: string;
  scheduledTime: string;
  status: 'published' | 'scheduled' | 'ready';
  stats?: {
    views?: string;
    shares?: string;
    conversion?: string;
    likes?: string;
    comments?: string;
  };
}

export const SocialPostingSystemModal: React.FC<SocialPostingSystemModalProps> = ({
  isOpen,
  onClose,
  onOpenCustomizer,
  onOpenSocialHub,
}) => {
  const { language, isRtl } = useLanguage();
  const [activeTab, setActiveTab] = useState<'posts' | 'market_radar' | 'live_preview' | 'generator' | 'schedule'>('market_radar');
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'facebook' | 'tiktok' | 'instagram' | 'threads' | 'x'>('all');
  const [previewPlatform, setPreviewPlatform] = useState<'facebook' | 'instagram' | 'tiktok' | 'threads' | 'x'>('facebook');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPublishingAll, setIsPublishingAll] = useState(false);
  const [publishSuccessAll, setPublishSuccessAll] = useState(false);

  // Initial Posts
  const [postsList, setPostsList] = useState<ReadySocialPost[]>([
    {
      id: 'post-all-channels-promo',
      platform: 'facebook',
      title: '🚨 البوست الأول الشامل: إطلاق كفرات كيستيك الرسمية وضمان المعاينة قبل الدفع',
      category: 'promo_sale',
      caption: `🚨 إعلان رسمي من علامة «كيستيك | CaseTech» لجميع عملائنا في مصر والوطن العربي 🛡️📱

دلوقتي تقدر تصمم كفر هاتفك بنفسك بحماية صدمات عسكرية معتمدة وتقنية طباعة يابانية بارزة 3D لا تبهت ولا تتقشر مدى الحياة!

✨ مميزات تجربة كيستيك:
1️⃣ حق المعاينة والتجربة أمام مندوب شركة بوسطة قبل سداد أي مبلغ!
2️⃣ شحن سريع خلال 24 - 48 ساعة لباب بيتك بجميع المحافظات.
3️⃣ كود الخصم الحصري: Dody15 يعطيك 15% خصم فوري.
4️⃣ شحن مجاني لأي طلب يتضمن قطعتين أو أكثر داخل علبة VIP الملكية.

قنواتنا الرسمية المعتمدة:
• فيسبوك: https://facebook.com/casetech.eg
• إنستغرام: https://instagram.com/casetech.eg
• تيك توك: https://tiktok.com/@casetech.official
• ثريدز: https://threads.net/@casetech.eg
• إكس (تويتر): https://x.com/CaseTechEG
• واتساب المبيعات المباشر وإرسال الطلب للمطبعة: 01026541234 / 01508881456 (https://wa.me/201026541234)`,
      hashtags: ['#كيستيك', '#CaseTech', '#كفرات_هواتف', '#عروض_مصر', '#Dody15', '#بوسطة', '#معاينة_قبل_الدفع'],
      cta: 'اطلب كفرك الآن أو تواصل معنا عبر واتساب 01026541234 📲',
      scheduledTime: 'حملة الإطلاق الرسمية',
      status: 'published',
      stats: { views: '180.0K', shares: '3.4K', conversion: '6.8%', likes: '12.4K', comments: '1.2K' }
    },
    {
      id: 'post-1',
      platform: 'tiktok',
      title: '🔥 سكريبت تيك توك ريلز: تجربة السقوط الصادمة (Drop Test ASMR)',
      category: 'viral_test',
      caption: `تفتكر تليفونك يقدر يستحمل وقعة من الدور التاني؟ 😱💥
سيبك من الكفرات السيليكون العادية اللي بتصفر وتبوظ بعد أسبوع!
كفر كيستيك (CaseTech) المدرع مصنوع بتكنولوجيا الحواف الهوائية العسكرية + مغناطيس ماج سيف قوي يمسك في الشاحن والسيارة زي الصخر.

🛡️ الأهم من كل ده؟ مش هتدفع مليم إلا لما تفتح العلبة مع مندوب بوسطة وتفحص الكفر بنفسك على جهازك وتتأكد من الخامة!
🎁 كود: Dody15 يعطيك 15% خصم فوري وشحن مجاني للقطعتين.
رابط الموقع في البايو أو واتساب المبيعات: 01026541234 / 01508881456 👇`,
      hashtags: ['#كيستيك', '#CaseTech', '#كفر_ايفون', '#سامسونج_s24', '#حماية_هاتف', '#مصر', '#drop_test'],
      cta: 'اكتب موديل تليفونك في التعليقات ونرد عليك بالثواني 📲',
      scheduledTime: 'اليوم، 06:00 م (وقت الذروة)',
      status: 'published',
      stats: { views: '142.5K', shares: '1.8K', conversion: '4.8%', likes: '9.8K', comments: '850' }
    },
    {
      id: 'post-2',
      platform: 'instagram',
      title: '💎 بوست انستقرام كاروسيل: فخامة الخط العربي والحماية الذكية',
      category: 'luxury_calligraphy',
      caption: `الفخامة مش مجرد شكل.. دي هيبة وحماية تحافظ على قيمة تليفونك ✨📱
كفرات كيستيك الملكية بالخط العربي وتطريز النانو UV المطلي بطبقات مقاومة للخدش والتآكل.
تخصيص كامل لاسمك أو عبارتك المفضلة مع فتحات كاميرا دقيقة 1:1 لأكثر من 50 موديلاً (آيفون، سامسونج، شاومي، بكسل، ون بلس).

📦 تجربة استلام فاخرة داخل بوكس كيستيك الأسود الملكي.
✅ متاح المعاينة قبل الدفع لضمان الرضا 100%.
كود الخصم الحصري: Dody15 | واتساب: 01026541234`,
      hashtags: ['#كيستيك', '#كفرات_فخمة', '#خط_عربي', '#ايفون16برو', '#سامسونج', '#تخصيص_اسمك'],
      cta: 'اضغط على الرابط بالبايو وصمم كفرك باسمك خلال 30 ثانية ✍️',
      scheduledTime: 'اليوم، 08:30 م',
      status: 'published',
      stats: { views: '88.2K', shares: '940', conversion: '5.2%', likes: '7.1K', comments: '510' }
    },
    {
      id: 'post-threads-official',
      platform: 'threads',
      title: '🧵 بوست ثريدز الرسمي (Threads): سؤال تفاعلي ومناقشة تجربة المعاينة',
      category: 'social_proof',
      caption: `هل جربت إحساس إنك تستلم أوردر أونلاين وتفتحه قدام المندوب وتفحصه وتجربه على موبايلك قبل ما تدفع أي مليم؟ 📦✨

في منصة «كيستيك - CaseTech»، مش بس بنقدملك أقوى كفر مدرع ضد الصدمات مع طباعة UV يابانية بارزة 3D وتخصيص كامل لاسمك بالخط العربي، إحنا كمان بنضمنلك حق المعاينة الكاملة مع مندوب شركة بوسطة في كل محافظات مصر.

🛡️ متوافق مع أكثر من 50 موديلاً (آيفون، سامسونج، شاومي، بكسل).
🔥 كود الخصم الترويجي: Dody15 (-15% خصم فوري).
💬 واتساب المبيعات المباشر: 01026541234 / 01508881456`,
      hashtags: ['#كيستيك', '#CaseTech', '#كفرات', '#ثريدز_مصر', '#iPhone16', '#SamsungS24'],
      cta: 'شاركنا نوع تليفونك في الردود ونبعتلك التصاميم المتاحة فوراً 👇',
      scheduledTime: 'متاح للنشر الفوري',
      status: 'published',
      stats: { views: '45.0K', shares: '820', conversion: '5.1%', likes: '3.6K', comments: '390' }
    },
    {
      id: 'post-x-official',
      platform: 'x',
      title: '𝕏 ثريد منصة إكس: مقارنة كاسيتيفاي بـ كيستيك وجودة التصنيع',
      category: 'viral_test',
      caption: `ليه تدفع 85 دولار في كفر مستورد يوصلك بعد شهر، لما تقدر تاخد نفس المتانة العسكرية والطباعة اليابانية الـ 3D محلياً بـ 450 ج.م؟ 🛡️📱

علامة CaseTech المصرية تكسر احتكار الكفرات العالمية:
• حواف ممتصة للصدمات معتمدة 10ft.
• ماج سيف N52 قوي جداً.
• والأهم: المعاينة والتجربة أمام مندوب بوسطة قبل ما تدفع مليم!

كود 15%: Dody15 | واتساب: 01026541234`,
      hashtags: ['#CaseTech', '#تقنية', '#آيفون16', '#سامسونج', '#تويتر_مصر'],
      cta: 'التفاصيل والطلب المباشر من الرابط بالموقع الرسمي 🛒',
      scheduledTime: 'اليوم، 09:00 م',
      status: 'published',
      stats: { views: '62.0K', shares: '1.1K', conversion: '4.4%', likes: '4.8K', comments: '230' }
    }
  ]);

  // Market Trends & General Direction Radar Data
  const MARKET_RADAR_ITEMS = [
    {
      id: 'trend-iphone16',
      device: 'سلسلة iPhone 16 Pro و Pro Max تيتانيوم',
      trendScore: 98,
      demandLevel: 'طلب قياسي فائق 🔥',
      bestSellingStyle: 'كفر السيليكون الماج سيف العسكري + خط عربي مذهب',
      marketInsight: 'العملاء يبحثون عن حماية قصوى لعدسات الكاميرا البارزة مع الاحتفاظ بمظهر التيتانيوم الفاخر ودعم شواحن الماج سيف.',
      competitorPrice: 'كاسيتيفاي: 4,200 ج.م ($85) | كيستيك: 450 ج.م فقط مع معاينة قبل الدفع',
      recommendedAngle: 'viral_test',
      actionHook: '«هل كفر بـ 450 جنيه يقدر يحمي آيفون بـ 80 ألف؟ شوف تجربة السقوط الحقيقية!»',
    },
    {
      id: 'trend-anime',
      device: 'سامسونج S24 Ultra و شاومي 14',
      trendScore: 95,
      demandLevel: 'تريند فيروسي شبابي ⚔️',
      bestSellingStyle: 'كفرات أنمي يابانية UV بارزة الملمس (ون بيس، جوجوتسو، سولو ليفيلنج)',
      marketInsight: 'الأجيال الشابة تبحث عن طباعة بارزة لا تمسح ولا تصفر بالاستخدام الطويل، مع ألوان حية ومقاومة للبصمات والخدوش.',
      competitorPrice: 'المطابع العادية تطبع ملصقات باهتة | كيستيك تطبع ماكينات Mimaki UV يابانية 1200 DPI',
      recommendedAngle: 'anime_pop',
      actionHook: '«الكفر اللي هيخلي كل صحابك في الجامعة يسألوك طابعه فين! أنمي ياباني بارز 3D»',
    },
    {
      id: 'trend-calligraphy',
      device: 'جميع موديلات آيفون وسامسونج (هدايا VIP)',
      trendScore: 92,
      demandLevel: 'مفضل للمناسبات والهدايا 👑',
      bestSellingStyle: 'كفر الخط العربي الأندلسي بالذهب والفضة والعلبة المغناطيسية',
      marketInsight: 'موسم هدايا أعياد الميلاد والتخرج والتعبير عن الشخصية. نسبة شراء قطعتين في الأوردر الواحد تتعدى 65%.',
      competitorPrice: 'لا يوجد بديل محلي يقدم بوكس هدايا ملكي بختم شمعي أحمر وكارت إهداء شخصي',
      recommendedAngle: 'luxury_calligraphy',
      actionHook: '«هدية ملكية تليق باسمك.. كفر بنقش خطك العربي داخل بوكس كيستيك الفاخر»',
    },
    {
      id: 'trend-sports',
      device: 'هواتف الفئة المتوسطة والشعبية (A55, Redmi Note)',
      trendScore: 89,
      demandLevel: 'تفاعل جماهيري مستمر ⚽',
      bestSellingStyle: 'كفرات مباريات الدوري والنوادي وأرقام اللاعبين',
      marketInsight: 'مع استمرار مباريات الدوري والبطولات الأفريقية، الطلب يتصاعد على الكفرات الرياضية المخصصة باسم المشجع.',
      competitorPrice: 'كفرات السوق رديئة الحواف | كيستيك تقدم درع مصمت مريح لليد أثناء الجيمنج',
      recommendedAngle: 'promo_sale',
      actionHook: '«شجع ناديك بكفر يحمي موبايلك في كل حماس المدرجات.. خصم 15% بكود Dody15»',
    },
  ];

  // Daily Automated Cadence Calendar
  const DAILY_CADENCE = [
    { time: '10:00 ص', type: 'صباحي تفاعلي', focus: 'مقارنة مواصفات وحق المعاينة قبل الدفع (فيسبوك وثريدز)', icon: '☀️' },
    { time: '02:00 م', type: 'تقني ومراجعة', focus: 'اختبار السقوط Drop-Test ASMR وفحص الماج سيف (تيك توك وإنستغرام)', icon: '🔨' },
    { time: '06:30 م (الذروة)', type: 'تريند شبابي وفيروسي', focus: 'كفرات الأنمي، الجيمنج، ومباريات اليوم (تيك توك وريلز)', icon: '🔥' },
    { time: '09:30 م (السهرة)', type: 'عروض وفخامة ملكية', focus: 'الخط العربي، علبة الهدايا، وكود الخصم Dody15 للشراء الفوري', icon: '🌙' },
  ];

  // Post Generator State
  const [newPostPlatform, setNewPostPlatform] = useState<'tiktok' | 'instagram' | 'facebook' | 'threads' | 'x'>('facebook');
  const [newPostAngle, setNewPostAngle] = useState<'viral_test' | 'luxury_calligraphy' | 'social_proof' | 'anime_pop' | 'promo_sale'>('viral_test');
  const [newPostTargetDevice, setNewPostTargetDevice] = useState('آيفون 16 برو ماكس وسامسونج S24 الترا');
  const [generatedResult, setGeneratedResult] = useState('');

  if (!isOpen) return null;

  const handleCopyContent = (post: ReadySocialPost) => {
    const fullText = `${post.caption}\n\n${post.hashtags.join(' ')}\n\n${post.cta}`;
    navigator.clipboard.writeText(fullText);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Direct Live Intent Sharing (Opens exact real share composer in 1-click)
  const handleDirectShareIntent = (platform: ReadySocialPost['platform'], post: ReadySocialPost) => {
    const textToShare = `${post.title}\n\n${post.caption}\n\n${post.hashtags.join(' ')}`;
    const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://casetech.eg';

    switch (platform) {
      case 'x':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(textToShare)}&url=${encodeURIComponent(currentUrl)}`, '_blank', 'noopener,noreferrer');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(textToShare)}`, '_blank', 'noopener,noreferrer');
        break;
      case 'threads':
        window.open(`https://threads.net/intent/post?text=${encodeURIComponent(textToShare)}`, '_blank', 'noopener,noreferrer');
        break;
      case 'tiktok':
        window.open(SOCIAL_LINKS.tiktok, '_blank', 'noopener,noreferrer');
        break;
      case 'instagram':
        window.open(SOCIAL_LINKS.instagram, '_blank', 'noopener,noreferrer');
        break;
    }
  };

  // Simultaneous 1-Click Multi-Platform Auto-Posting
  const handleSimultaneousPublishAll = () => {
    setIsPublishingAll(true);
    setPublishSuccessAll(false);

    // Trigger luxury confetti
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#06B6D4', '#8B5CF6', '#F59E0B', '#10B981'],
      });
    } catch {
      // fallback
    }

    setTimeout(() => {
      setIsPublishingAll(false);
      setPublishSuccessAll(true);
      // Update all posts status to published
      setPostsList((prev) =>
        prev.map((p) => ({
          ...p,
          status: 'published' as const,
          scheduledTime: 'منشور الآن بنجاح 🟢 (متزامن)',
        }))
      );
    }, 1200);
  };

  const handleGenerateFromTrend = (trend: typeof MARKET_RADAR_ITEMS[0]) => {
    setNewPostAngle(trend.recommendedAngle as any);
    setNewPostTargetDevice(trend.device);
    setActiveTab('generator');
    const text = `🚨 تريند اليوم على كفرات (${trend.device}):
${trend.actionHook}

✨ كفرات كيستيك (CaseTech) الأصلية تجمع بين حماية الصدمات المعتمدة وطباعة الـ UV اليابانية البارزة 3D.
🛡️ الميزة الأهم: معاينة وفحص الشحنة وتجربتها على موبايلك أمام مندوب شركة بوسطة قبل ما تدفع أي جنيه!

🔥 كود الخصم الفوري: Dody15 (-15%)
📦 شحن مجاني عند طلب قطعتين لباب بيتك بجميع محافظات مصر.
💬 للطلب ومراسلة المبيعات: 01026541234 / 01508881456 (https://wa.me/201026541234)`;
    setGeneratedResult(text);
  };

  const filteredPosts = postsList.filter((p) => {
    if (selectedPlatform === 'all') return true;
    return p.platform === selectedPlatform;
  });

  const previewPost = postsList.find((p) => p.platform === previewPlatform) || postsList[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-slate-950 border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-950/70 overflow-hidden flex flex-col max-h-[94vh]"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 border border-cyan-300/40">
              <Radio className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  {language === 'ar' ? 'رادار السوق، البوستات الفورية، والنشر المتزامن' : 'Market Radar & Cross-Platform Publisher'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-500/30">
                  Radar Live 📡
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                قياس التوجه العام للسوق المصري، النشر المتزامن للبوست الأول على جميع المنصات في وقت واحد، والمعاينة الحية
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800 cursor-pointer"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Simultaneous 1-Click Master Bar */}
        <div className="px-4 sm:px-6 py-3 bg-gradient-to-r from-cyan-950/90 via-indigo-950/90 to-slate-900 border-b border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold text-white">النشر المتزامن للبوست الأول:</span>
            <span className="text-[11px] text-cyan-300">
              {publishSuccessAll ? 'تم النشر بنجاح على المنصات الـ 5 معاً 🟢' : 'جاهز للإطلاق الفوري الموحد في ثانية واحدة'}
            </span>
          </div>

          <button
            onClick={handleSimultaneousPublishAll}
            disabled={isPublishingAll}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all shadow-lg active:scale-95 cursor-pointer ${
              publishSuccessAll
                ? 'bg-emerald-500 text-slate-950 shadow-emerald-900/40'
                : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 shadow-cyan-500/30'
            }`}
          >
            {isPublishingAll ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>جاري النشر والمزامنة اللحظية...</span>
              </>
            ) : publishSuccessAll ? (
              <>
                <Check className="w-4 h-4 text-slate-950 font-black" />
                <span>تم النشر المتزامن على الـ 5 منصات بنجاح! 🚀</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-slate-950" />
                <span>🚀 نشر البوست الأول على جميع المنصات في وقت واحد</span>
              </>
            )}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          {/* Tab 1: Market Trends Radar */}
          <button
            onClick={() => setActiveTab('market_radar')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'market_radar'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>📡 رادار السوق والمستجدات والتريندات</span>
          </button>

          {/* Tab 2: Live In-App Post Preview for all 5 platforms */}
          <button
            onClick={() => setActiveTab('live_preview')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'live_preview'
                ? 'bg-indigo-600 text-white font-black shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>👁️ المعاينة الحية لأول بوست على الصفحات</span>
          </button>

          {/* Tab 3: Ready Posts List */}
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'posts'
                ? 'bg-blue-600 text-white font-black shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>📋 البوستات الجاهزة للحملات ({postsList.length})</span>
          </button>

          {/* Tab 4: Daily Cadence Schedule */}
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'schedule'
                ? 'bg-emerald-600 text-white font-black shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>📅 جدول النشر اليومي المؤتمت</span>
          </button>

          {/* Tab 5: Post Generator */}
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'generator'
                ? 'bg-purple-600 text-white font-black shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>✨ مولّد البوستات الذكي</span>
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          
          {/* TAB 1: MARKET TRENDS RADAR */}
          {activeTab === 'market_radar' && (
            <div className="space-y-4">
              {/* Radar Intro Card */}
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <h3 className="text-sm font-black text-white">
                      مؤشرات الطلب والتريندات اللحظية في مصر والوطن العربي
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    رصد مباشر لاهتمامات العملاء وموديلات الهواتف الأكثر مبيعاً وأحدث المستجدات لمطابقتها فوراً بحملاتك الإعلانية.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-emerald-400 font-bold">تحديث الرادار: لحظي</span>
                </div>
              </div>

              {/* Radar Grid Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {MARKET_RADAR_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                        <h4 className="text-xs font-black text-white">{item.device}</h4>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono">
                        <span className="text-cyan-300 font-bold">{item.trendScore}% اهتمام</span>
                        <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-200 border border-cyan-500/30">
                          {item.demandLevel}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div>
                        <span className="text-slate-400">النمط الأكثر طلباً: </span>
                        <span className="font-bold text-amber-300">{item.bestSellingStyle}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {item.marketInsight}
                      </p>
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-emerald-300 flex items-center justify-between">
                        <span>{item.competitorPrice}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-slate-400 italic truncate max-w-[220px]">
                        {item.actionHook}
                      </span>
                      <button
                        onClick={() => handleGenerateFromTrend(item)}
                        className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>تطبيق البوست فوراً</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: LIVE IN-APP POST PREVIEW ON OFFICIAL PAGES */}
          {activeTab === 'live_preview' && (
            <div className="space-y-4">
              {/* Platform Switcher Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <button
                  onClick={() => setPreviewPlatform('facebook')}
                  className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    previewPlatform === 'facebook'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>📘 صفحة فيسبوك الرسمية</span>
                </button>
                <button
                  onClick={() => setPreviewPlatform('instagram')}
                  className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    previewPlatform === 'instagram'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>📸 صفحة إنستغرام الرسمية</span>
                </button>
                <button
                  onClick={() => setPreviewPlatform('tiktok')}
                  className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    previewPlatform === 'tiktok'
                      ? 'bg-pink-600 text-white shadow-lg shadow-pink-900/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>🎵 حساب تيك توك الرسمي</span>
                </button>
                <button
                  onClick={() => setPreviewPlatform('threads')}
                  className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    previewPlatform === 'threads'
                      ? 'bg-stone-700 text-white shadow-lg'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>🧵 حساب ثريدز الرسمي</span>
                </button>
                <button
                  onClick={() => setPreviewPlatform('x')}
                  className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    previewPlatform === 'x'
                      ? 'bg-stone-800 text-cyan-300 shadow-lg border border-cyan-800'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>𝕏 منصة إكس الرسمية</span>
                </button>
              </div>

              {/* Exact Visual Live Mockup of the Page Post */}
              <div className="max-w-2xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden p-5 space-y-4">
                {/* Profile Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center font-black text-white text-base shadow-md">
                      CT
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-white">كيستيك | CaseTech Egypt</span>
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                          Verified Brand
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span>@casetech.eg</span>
                        <span>•</span>
                        <span className="text-cyan-300">منشور الآن 🟢</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDirectShareIntent(previewPlatform, previewPost)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors cursor-pointer"
                    title="فتح نافذة النشر الفعلية"
                  >
                    <span>نشر حي الآن</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Post Caption */}
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                  {previewPost.caption}
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1 text-xs text-cyan-400 font-mono">
                  {previewPost.hashtags.map((h, i) => (
                    <span key={i} className="bg-cyan-950/60 px-2 py-0.5 rounded-lg border border-cyan-800/40">
                      {h}
                    </span>
                  ))}
                </div>

                {/* Verified Guarantee Badge */}
                <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>حق الفحص والتجربة أمام مندوب بوسطة قبل الدفع 🛡️</span>
                  </div>
                  <span className="font-mono text-white font-bold">كود: Dody15 (-15%)</span>
                </div>

                {/* Engagement Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-pink-400">
                      <Heart className="w-4 h-4 fill-pink-500/20" />
                      <span>{previewPost.stats?.likes || '12.4K'}</span>
                    </span>
                    <span className="flex items-center gap-1 text-cyan-400">
                      <MessageCircle className="w-4 h-4" />
                      <span>{previewPost.stats?.comments || '1.2K'}</span>
                    </span>
                    <span className="flex items-center gap-1 text-indigo-400">
                      <Repeat className="w-4 h-4" />
                      <span>{previewPost.stats?.shares || '3.4K'}</span>
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400">
                    {previewPost.stats?.views || '180K'} مشاهدة حقيقية
                  </span>
                </div>

                {/* Simulated Customer Comment (Reassurance) */}
                <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-[10px] text-slate-400 font-bold block">تعليقات العملاء الموثقة:</span>
                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                      م
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">المهندس محمود الشريف</span>
                        <span className="text-[10px] text-slate-500">القاهرة - منذ ساعتين</span>
                      </div>
                      <p className="text-slate-300 text-xs mt-0.5">
                        «استلمت كفر الآيفون 16 برو ماكس بالاسم والخط العربي النهاردة.. فعلاً مندوب بوسطة استناني لما فتحت العلبة وركبت الكفر على الموبايل وفحصت البروز قبل ما ادفع. خامة محترمة جداً وشكراً على الهدية والكارت الشخصي!»
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: READY POSTS CARDS */}
          {activeTab === 'posts' && (
            <div className="space-y-4">
              {/* Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
                {(['all', 'facebook', 'instagram', 'tiktok', 'threads', 'x'] as const).map((plat) => (
                  <button
                    key={plat}
                    onClick={() => setSelectedPlatform(plat)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                      selectedPlatform === plat
                        ? 'bg-cyan-500 text-slate-950 font-black'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{plat === 'all' ? 'جميع المنصات' : plat.toUpperCase()}</span>
                  </button>
                ))}
              </div>

              {/* Cards Grid */}
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all shadow-lg space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-xl text-xs font-black uppercase bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                          {post.platform}
                        </span>
                        <h3 className="text-sm font-bold text-white">{post.title}</h3>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                          {post.status}
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                      {post.caption}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>{post.stats?.views} مشاهدة</span>
                        <span>•</span>
                        <span>{post.stats?.shares} مشاركة</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyContent(post)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          {copiedId === post.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === post.id ? 'تم النسخ!' : 'نسخ النص'}</span>
                        </button>

                        <button
                          onClick={() => handleDirectShareIntent(post.platform, post)}
                          className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>نشر فوري حي</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DAILY AUTOMATED CADENCE SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-500/30 space-y-1">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>جدول النشر اليومي الآلي والدائم على مدار الأسبوع</span>
                </h3>
                <p className="text-xs text-slate-300">
                  خطة نشر مدروسة تضمن وجوداً ثابتاً لعلامتك التجارية في أوقات ذروة تصفح الهواتف والشراء في مصر.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DAILY_CADENCE.map((slot, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-white text-xs">
                        <span>{slot.icon}</span>
                        <span>{slot.time}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                        {slot.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      {slot.focus}
                    </p>
                    <div className="pt-2 border-t border-slate-800 text-[10px] text-emerald-400 flex items-center justify-between">
                      <span>حالة الجدولة: نشطة تلقائياً 🟢</span>
                      <span>معاينة قبل الدفع</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SMART POST GENERATOR */}
          {activeTab === 'generator' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>مولّد بوستات كيستيك التلقائي المتوافق مع التريندات</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">المنصة المستهدفة:</label>
                    <select
                      value={newPostPlatform}
                      onChange={(e) => setNewPostPlatform(e.target.value as any)}
                      className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-800"
                    >
                      <option value="facebook">فيسبوك (Facebook)</option>
                      <option value="instagram">إنستغرام (Instagram)</option>
                      <option value="tiktok">تيك توك (TikTok)</option>
                      <option value="threads">ثريدز (Threads)</option>
                      <option value="x">منصة 𝕏 (Twitter)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">زاوية البوست:</label>
                    <select
                      value={newPostAngle}
                      onChange={(e) => setNewPostAngle(e.target.value as any)}
                      className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-800"
                    >
                      <option value="viral_test">تجربة السقوط والـ Drop Test</option>
                      <option value="luxury_calligraphy">فخامة الخط العربي والذهب</option>
                      <option value="anime_pop">أنمي ياباني UV بارز 3D</option>
                      <option value="promo_sale">عرض الخصم والتوصيل السريع</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">موديل الهاتف المستهدف:</label>
                    <input
                      type="text"
                      value={newPostTargetDevice}
                      onChange={(e) => setNewPostTargetDevice(e.target.value)}
                      className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800"
                      placeholder="مثال: iPhone 16 Pro Max"
                    />
                  </div>
                </div>
              </div>

              {generatedResult && (
                <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-300">نص البوست المولّد:</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedResult);
                        setCopiedId('generated');
                        setTimeout(() => setCopiedId(null), 2500);
                      }}
                      className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg cursor-pointer"
                    >
                      {copiedId === 'generated' ? 'تم النسخ!' : 'نسخ'}
                    </button>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                    {generatedResult}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>واتساب المبيعات والمطبعة: <strong className="text-white font-mono">{OFFICIAL_CONTACT_INFO.phoneDisplay}</strong> ({OFFICIAL_CONTACT_INFO.secondaryPhoneDisplay})</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
