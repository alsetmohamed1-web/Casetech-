import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Smartphone, 
  MessageCircle, 
  ArrowRight, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  RotateCcw,
  CheckCircle2,
  Clock,
  Brain,
  Wand2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { OFFICIAL_CONTACT_INFO } from '../data/branding';

export interface AiSalesBotWidgetProps {
  onOpenCustomizer?: (productId?: string) => void;
  onOpenCheckout?: () => void;
  onOpenTracking?: () => void;
  onOpenDropship?: () => void;
  onOpenSocial?: () => void;
  onApplyPromoCode?: (code: string) => void;
  onOpenAiStudio?: () => void;
  onOpenLeatherSimulator?: () => void;
  onOpenPriceAlerts?: () => void;
  onOpenQuickShare?: () => void;
}

interface QuickOption {
  id: string;
  label: string;
  icon: string;
  category: 'models' | 'pricing' | 'guarantee' | 'promo' | 'tracking' | 'dropship' | 'whatsapp' | 'leather' | 'price_alerts' | 'quick_share';
}

interface ChatEntry {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  thinkingProcess?: string;
  durationMs?: number;
  isHighThinking?: boolean;
  actionButtons?: {
    label: string;
    action: () => void;
    icon?: string;
    variant?: 'primary' | 'secondary' | 'accent' | 'whatsapp';
  }[];
}

const QUICK_OPTIONS: QuickOption[] = [
  { id: 'opt-models', label: '📱 استفسار عن كفر لموديلي والتصاميم المتاحة', icon: '📱', category: 'models' },
  { id: 'opt-leather', label: '🎨 محاكي ألوان وعتامة الجلد الطبيعي 3D', icon: '🎨', category: 'leather' },
  { id: 'opt-price-alerts', label: '🔔 رادار وتنبيهات انخفاض الأسعار اللحظية', icon: '🔔', category: 'price_alerts' },
  { id: 'opt-pricing', label: '💰 معرفة الأسعار ومصاريف الشحن لباب البيت', icon: '💰', category: 'pricing' },
  { id: 'opt-guarantee', label: '🛡️ هل في معاينة وفحص للكفر قبل الدفع؟', icon: '🛡️', category: 'guarantee' },
  { id: 'opt-promo', label: '🎁 عايز كود خصم إضافي وأطلب أوردر دلوقتي', icon: '🎁', category: 'promo' },
  { id: 'opt-quick-share', label: '📤 مشاركة سريعة عبر الواتساب للأصدقاء', icon: '📤', category: 'quick_share' },
  { id: 'opt-tracking', label: '🚚 تتبع حالة شحنتي وموعد وصول المندوب', icon: '🚚', category: 'tracking' },
  { id: 'opt-dropship', label: '🤝 عايز اشتغل دروب شيبينج ومسوق بالعمولة', icon: '🤝', category: 'dropship' },
  { id: 'opt-whatsapp', label: '💬 تواصل فوري عبر الواتساب الرسمي (01026541234)', icon: '💬', category: 'whatsapp' },
];

export const AiSalesBotWidget: React.FC<AiSalesBotWidgetProps> = ({
  onOpenCustomizer,
  onOpenCheckout,
  onOpenTracking,
  onOpenDropship,
  onOpenSocial,
  onApplyPromoCode,
  onOpenAiStudio,
  onOpenLeatherSimulator,
  onOpenPriceAlerts,
  onOpenQuickShare,
}) => {
  const { language, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isHighThinkingEnabled, setIsHighThinkingEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialBotMessage: ChatEntry = {
    id: 'welcome-1',
    sender: 'bot',
    text: language === 'ar'
      ? `أهلاً بك في كيستيك (CaseTech)! 👋\nأنا روبوت المبيعات والرد الذكي المباشر المجهز بـ "وضع التفكير الفائق (High Thinking Mode)" لمعالجة أعقد الاستفسارات الهندسية، مواصفات الهواتف، توليد صور الهيرو والكونسبت آرت، وضمان المعاينة قبل الدفع.\n\nمن فضلك اختر أحد الاستفسارات بالأسفل، أو اكتب سؤالك أو فكرتك لأحللها لك بدقة:`
      : `Welcome to CaseTech! 👋\nI am your AI sales closer powered by Gemini High Thinking mode. Ready to solve complex phone specs queries, concept art ideas, and promo code applications!`,
    timestamp: 'الآن',
  };

  const [messages, setMessages] = useState<ChatEntry[]>([initialBotMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnreadNotification(false);
    }
  }, [isOpen, messages, isTyping]);

  const handleSelectQuickOption = (option: QuickOption) => {
    // Add user message
    const userMsg: ChatEntry = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: option.label,
      timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let botResponse: ChatEntry;

      switch (option.category) {
        case 'models':
          botResponse = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: language === 'ar'
              ? `نوفر في كيستيك كفرات مخصصة لأكثر من 50 موديلاً حقيقياً بدقة 1:1 مع فتحات الكاميرا الدقيقة:\n\n• **Apple**: آيفون 16 برو ماكس حتى آيفون 11 بلس.\n• **Samsung**: سلسلة S26 Ultra، S24، S23، Z Fold 6، وسلسلة A الشعبية (A55، A35، A54).\n• **Xiaomi / Redmi / POCO**: شاومي 14 الترا، 13T، ريدمي نوت 13 برو، بوكو X6 برو.\n• **Google Pixel**: بكسل 9 برو XL، 8 برو، 7a.\n• **OnePlus / Honor / Huawei / Oppo**: ون بلس 12، هونر ماجيك 6 برو، أوبو رينو 12.\n\nكل كفر مدعوم بحماية عسكرية مدرعة ضد الصدمات وخيار ماج سيف مغناطيسي قوي!`
              : `We cover over 50+ models with 1:1 camera precision:\nApple, Samsung Galaxy, Xiaomi, Pixel, OnePlus, Honor & Oppo. Military drop-tested!`,
            timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
            actionButtons: [
              {
                label: language === 'ar' ? '🎨 فتح استوديو التخصيص واختيار موديلي' : '🎨 Open Customizer',
                action: () => {
                  setIsOpen(false);
                  onOpenCustomizer?.();
                },
                variant: 'primary',
              },
              {
                label: language === 'ar' ? '💬 استفسار عن موديل معين واتساب' : '💬 Inquire on WhatsApp',
                action: () => {
                  window.open(`https://wa.me/${OFFICIAL_CONTACT_INFO.whatsapp}?text=${encodeURIComponent('السلام عليكم، عايز استفسر هل متاح كفر لموديلي؟')}`, '_blank');
                },
                variant: 'whatsapp',
              },
            ],
          };
          break;

        case 'pricing':
          botResponse = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: language === 'ar'
              ? `أسعارنا في كيستيك منافسة جداً ومن المصنع مباشرة لباب بيتك:\n\n🏷️ **الكفرات المدرعة والماج سيف**: تبدأ من 290 إلى 420 جنيه مصري فقط.\n🎨 **التخصيص الفوري بالاسم أو الصورة**: مجاناً بالكامل مع طلبك اليوم!\n🚚 **الشحن مع شركة بوسطة (Bosta)**:\n• القاهرة والجيزة والإسكندرية: 50 ج فقط (شحن سريع 24-48 ساعة).\n• محافظات الدلتا والقناة والصعيد: 60-70 ج فقط.\n• **شحن مجاني بالكامل** عند طلب كفرين أو أكثر!`
              : `Cases start from 290 EGP with free custom name printing. Shipping via Bosta is 50 EGP (free on 2+ cases).`,
            timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
            actionButtons: [
              {
                label: language === 'ar' ? '🎁 تطبيق كود الخصم والشراء' : '🎁 Apply Code & Order',
                action: () => {
                  onApplyPromoCode?.('Dody15');
                  setIsOpen(false);
                  onOpenCheckout?.();
                },
                variant: 'accent',
              },
              {
                label: language === 'ar' ? '🛍️ تصفح الكتالوج' : '🛍️ Browse Catalog',
                action: () => setIsOpen(false),
                variant: 'secondary',
              },
            ],
          };
          break;

        case 'guarantee':
          botResponse = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: language === 'ar'
              ? `🛡️ **ضمان المعاينة والحق في الفحص بنسبة 100%:**\n\nنعم يا فندم بكل تأكيد! نحن في كيستيك نطبق سياسة (المعاينة قبل الدفع). مندوب شركة بوسطة ينتظر معك حتى تفتح العلبة وتفحص الكفر بنفسك وتتأكد من:\n1. مطابقة الموديل تماماً لهاتفك وكاميراته.\n2. جودة طباعة الـ UV النانو ووضوح الألوان.\n3. قوة الحواف المدرعة.\n\nفقط إذا أعجبك تماماً تدفع للمندوب، وفي حال وجود أي ملاحظة ترفض الاستلام دون دفع مليم واحد!`
              : `Yes, 100% inspection before payment! You can open the package and inspect your case before paying the Bosta courier.`,
            timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
            actionButtons: [
              {
                label: language === 'ar' ? '✅ اطلب الآن بأمان تام' : '✅ Order with Peace of Mind',
                action: () => {
                  setIsOpen(false);
                  onOpenCheckout?.();
                },
                variant: 'primary',
              },
              {
                label: language === 'ar' ? '📜 قراءة شهادة الضمان والقنوات' : '📜 Guarantee Certificate',
                action: () => {
                  setIsOpen(false);
                  onOpenSocial?.();
                },
                variant: 'secondary',
              },
            ],
          };
          break;

        case 'promo':
          botResponse = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: language === 'ar'
              ? `مبروك! تم تفعيل كود الخصم الحصري لك:\n\n🔥 **الكود:** \`Dody15\`\n✨ **الخصم:** 15% خصم فوري على إجمالي قيمة الكفرات!\n\n💡 نصيحة: إذا طلبت كفرين ستحصل أيضاً على شحن مجاني لباب البيت وهدية ستيكر نانو حماية مجاناً.`
              : `Congrats! Promo code Dody15 is activated for you (15% OFF)!`,
            timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
            actionButtons: [
              {
                label: language === 'ar' ? '⚡ تفعيل الكود وفتح صفحة إتمام الطلب' : '⚡ Apply & Checkout',
                action: () => {
                  onApplyPromoCode?.('Dody15');
                  setIsOpen(false);
                  onOpenCheckout?.();
                },
                variant: 'accent',
              },
              {
                label: language === 'ar' ? '🎨 تخصيص كفري الأول أولاً' : '🎨 Customize First',
                action: () => {
                  onApplyPromoCode?.('Dody15');
                  setIsOpen(false);
                  onOpenCustomizer?.();
                },
                variant: 'secondary',
              },
            ],
          };
          break;

        case 'tracking':
          botResponse = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: language === 'ar'
              ? `🚚 **متابعة شحنات بوسطة اللحظية:**\n\nتستطيع متابعة خط سير مندوبك لحظة بلحظة عبر إدخال رقم الطلب أو رقم هاتفك في نافذة التتبع.\n\n⏱️ **مواعيد التسليم التقريبية:**\n• أوردرات اليوم: يتم تجهيزها خلال 12 ساعة وتصل خلال 24-48 ساعة.\n• ستصلك رسالة SMS وواتساب من بوسطة برقم المندوب ورابط الـ GPS.`
              : `Track your live Bosta shipment status by entering your order ID. Delivery in 24-48 hours.`,
            timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
            actionButtons: [
              {
                label: language === 'ar' ? '🔍 فتح نافذة تتبع الشحنة الآن' : '🔍 Track Shipment Now',
                action: () => {
                  setIsOpen(false);
                  onOpenTracking?.();
                },
                variant: 'primary',
              },
            ],
          };
          break;

        case 'dropship':
          botResponse = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: language === 'ar'
              ? `🤝 **أهلاً بك شريكاً للنجاح في منظومة دروب شيبينج كيستيك:**\n\n• هامش ربحك من 40% إلى 60% لكل كفر.\n• صفر تكلفة مخزون: نحن نطبع ونغلف ونشحن باسم علامتك التجارية.\n• تحصيل فوري لأرباحك أسبوعياً عبر فودافون كاش أو إنستاباي.\n• لوحة تحكم ذكية لمتابعة شحناتك وعمولاتك.`
              : `Join CaseTech Dropshipping Network! Earn 40-60% profit per case with zero inventory and weekly InstaPay payouts.`,
            timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
            actionButtons: [
              {
                label: language === 'ar' ? '🚀 دخول بوابة ومسوقي الدروب شيبينج' : '🚀 Open Dropship Portal',
                action: () => {
                  setIsOpen(false);
                  onOpenDropship?.();
                },
                variant: 'primary',
              },
            ],
          };
          break;

        case 'leather':
          botResponse = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: language === 'ar'
              ? `🧥 **محاكي ألوان الجلد الطبيعي الفاخر وتأثير الباتينا (Patina):**\n\nنستخدم في منتجاتنا الجلدية جلد بقري طبيعي مدبوغ نباتياً (Full-Grain Italian Veg-Tan) يكتسب مع الوقت والحرارة والاستخدام لمعة طبيعية وتعتيقاً ساحراً (Patina) يزداد فخامة بمرور السنوات.\n\n• **الألوان الستة المتوفرة**: كونياك جملي، بني إسبريسو كلاسيكي، أسود أوبسيديان، عنابي نبيذي ملكي، أخضر غابات إمبراطوري، وكحلي سيادي.\n• **خيوط ألمانية شمعية**: خياطة يدوية متقنة تمنع التمزق مدى الحياة.\n• **ختم حراري (Hot Foil Stamping)**: خيار الختم بماء الذهب أو الفضة أو الختم الغائر (Blind Emboss).`
              : `Experience our 3D Veg-Tan Leather & Patina Simulator with 6 luxury shades, waxed German saddle stitching, and gold foil stamping!`,
            timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
            actionButtons: [
              {
                label: language === 'ar' ? '🎨 فتح محاكي ألوان الجلد والباتينا 3D' : '🎨 Open Leather Simulator',
                action: () => {
                  setIsOpen(false);
                  onOpenLeatherSimulator?.();
                },
                variant: 'accent',
              },
              {
                label: language === 'ar' ? '💬 استفسار عن المحافظ والجلود واتساب' : '💬 Inquire on WhatsApp',
                action: () => {
                  window.open(`https://wa.me/${OFFICIAL_CONTACT_INFO.whatsapp}?text=${encodeURIComponent('السلام عليكم، مهتم بالمنتجات الجلدية والمحافظ الطبيعية وتخصيص الاسم')}`, '_blank');
                },
                variant: 'whatsapp',
              },
            ],
          };
          break;

        case 'price_alerts':
          botResponse = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: language === 'ar'
              ? `⚡ **رادار وتنبيهات انخفاض الأسعار اللحظية (Price Drop Radar):**\n\nقمنا بتفعيل نظام مراقبة الأسعار والعروض الخاطفة اللحظية لجميع كفرات الهواتف والمحافظ الجلدية!\n\n• **عروض فلاش ديلز نشطة الآن**: خصومات تصل إلى 28% على مختارات آيفون وسامسونج وشاومي.\n• **تنبيه واتساب فوري**: يمكنك تحديد السعر المستهدف لموديلك وسنرسل لك إشعاراً فورياً على هاتفك بمجرد وصول السعر للهدف.\n• **كود خصم فوري نشط**: كود \`Dody15\` يمنحك 15% إضافية فوق أي عرض!`
              : `Real-time Price Drop Radar is active! Track flash sales up to 28% off or set your target price for instant WhatsApp alerts.`,
            timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
            actionButtons: [
              {
                label: language === 'ar' ? '⚡ فتح رادار الأسعار والعروض الخاطفة' : '⚡ Open Price Radar',
                action: () => {
                  setIsOpen(false);
                  onOpenPriceAlerts?.();
                },
                variant: 'primary',
              },
              {
                label: language === 'ar' ? '🎁 تفعيل كود Dody15 فورا' : '🎁 Apply Dody15 Code',
                action: () => {
                  onApplyPromoCode?.('Dody15');
                  setIsOpen(false);
                  onOpenCheckout?.();
                },
                variant: 'accent',
              },
            ],
          };
          break;

        case 'quick_share':
          botResponse = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: language === 'ar'
              ? `🚀 **ميزة المشاركة السريعة بنقرة واحدة (1-Click Quick Share):**\n\nتستطيع مشاركة أي كفر أو محفظة أو تصميم مخصص مع أصدقائك أو عائلتك فوراً عبر:\n\n• **واتساب بنقرة واحدة**: رسالة جاهزة تتضمن صورة الكفر وموديل الهاتف والسعر وكود الخصم ورابط مباشر.\n• **السوشيال ميديا**: فيسبوك، تليجرام، منصة X، ونسخ الرابط المباشر بنقرة.\n• **رمز الاستجابة السريعة (QR Code)**: للمسح الفوري بكاميرا الهاتف ومتابعة التسوق.`
              : `Share any case, wallet, or custom design in 1-click via WhatsApp, Facebook, Telegram, or QR Code!`,
            timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
            actionButtons: [
              {
                label: language === 'ar' ? '🔗 فتح مركز المشاركة السريعة وQR' : '🔗 Open Quick Share',
                action: () => {
                  setIsOpen(false);
                  onOpenQuickShare?.();
                },
                variant: 'primary',
              },
              {
                label: language === 'ar' ? '📱 مشاركة كود Dody15 على واتساب' : '📱 Share Dody15 on WhatsApp',
                action: () => {
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('🔥 الحق خصم 15% على كفرات الهواتف والمحافظ الفاخرة من كيستيك بكود: Dody15\nرابط الشراء مع معاينة قبل الدفع: ' + window.location.origin)}`, '_blank');
                },
                variant: 'whatsapp',
              },
            ],
          };
          break;

        case 'whatsapp':
        default:
          botResponse = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: language === 'ar'
              ? `يسعدنا تواصلك المباشر مع إدارة ومبيعات كيستيك على مدار 24/7:\n\n📱 **الواتساب والمبيعات المباشرة**: \`${OFFICIAL_CONTACT_INFO.whatsappDisplay}\`\n📞 **الخط الإضافي للتأكيد والمتابعة**: \`${OFFICIAL_CONTACT_INFO.secondaryPhoneDisplay}\`\n\nاضغط على الزر بالأسفل لفتح المحادثة فوراً وتأكيد تفاصيل طلبك مباشرة مع المطبعه للتنفيذ السريع والتغليف الفاخر!`
              : `Connect with CaseTech direct sales 24/7:\n• Primary WhatsApp: ${OFFICIAL_CONTACT_INFO.phoneDisplay}\n• Secondary Line: ${OFFICIAL_CONTACT_INFO.secondaryPhoneDisplay}`,
            timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
            actionButtons: [
              {
                label: `🟢 فتح واتساب المبيعات (${OFFICIAL_CONTACT_INFO.phoneDisplay})`,
                action: () => {
                  window.open(`https://wa.me/${OFFICIAL_CONTACT_INFO.whatsapp}?text=${encodeURIComponent('السلام عليكم، بتواصل مع كيستيك لشراء كفر هاتف')}`, '_blank');
                },
                variant: 'whatsapp',
              },
              {
                label: `📞 الخط الثاني (${OFFICIAL_CONTACT_INFO.secondaryPhoneDisplay})`,
                action: () => {
                  window.open(`https://wa.me/${OFFICIAL_CONTACT_INFO.secondaryWhatsapp}?text=${encodeURIComponent('السلام عليكم، استفسار ومتابعة طلب كيستيك')}`, '_blank');
                },
                variant: 'secondary',
              },
            ],
          };
          break;
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 450);
  };

  const handleSendCustomMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;

    const userMsg: ChatEntry = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // If High-Thinking is enabled, query Gemini 3 with ThinkingLevel.HIGH
    if (isHighThinkingEnabled) {
      try {
        const response = await fetch('/api/ai/high-thinking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: query,
            mode: 'deep_reasoning',
            history: messages.slice(-5).map((m) => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              text: m.text,
            })),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const botMsg: ChatEntry = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: data.text || 'تم فحص استفسارك بنجاح.',
            timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
            thinkingProcess: data.thinkingProcess,
            durationMs: data.durationMs,
            isHighThinking: true,
            actionButtons: [
              {
                label: '🎨 فتح استوديو التخصيص والألوان',
                action: () => {
                  setIsOpen(false);
                  onOpenCustomizer?.();
                },
                variant: 'primary',
              },
              ...(onOpenAiStudio ? [{
                label: '✨ توليد صور هيرو وكونسبت آرت بالذكاء الاصطناعي',
                action: () => {
                  setIsOpen(false);
                  onOpenAiStudio();
                },
                variant: 'accent' as const,
              }] : []),
              {
                label: '🎁 تطبيق كود الخصم (Dody15)',
                action: () => {
                  onApplyPromoCode?.('Dody15');
                  setIsOpen(false);
                  onOpenCheckout?.();
                },
                variant: 'secondary',
              },
              {
                label: '💬 استفسار مباشر واتساب',
                action: () => {
                  window.open(`https://wa.me/${OFFICIAL_CONTACT_INFO.whatsapp}?text=${encodeURIComponent(`السلام عليكم، استفسار بخصوص: ${query}`)}`, '_blank');
                },
                variant: 'whatsapp',
              },
            ],
          };

          setMessages((prev) => [...prev, botMsg]);
          setIsTyping(false);
          return;
        }
      } catch (error) {
        console.warn('High Thinking API request failed, falling back to local reasoning:', error);
      }
    }

    // Fallback response handler
    const lower = query.toLowerCase();
    setTimeout(() => {
      let replyText = '';
      let actionButtons: ChatEntry['actionButtons'] = undefined;

      if (lower.includes('ايفون') || lower.includes('iphone') || lower.includes('برو') || lower.includes('سامسونج') || lower.includes('s24') || lower.includes('s26') || lower.includes('شاومي') || lower.includes('xiaomi') || lower.includes('بكسل') || lower.includes('pixel') || lower.includes('موديل')) {
        replyText = `تمام جداً يا فندم! الموديل الذي تسأل عنه مدعوم بالكامل في مصنع كيستيك بدقة تصنيع 1:1 وفتحات للكاميرا لا تؤثر على الفلاش أو الليزر ومزود بحواف TPU مرنة لامتصاص الصدمات بنسبة 100%.\n\nيمكنك الآن فتح استوديو التخصيص لاختيار الموديل وكتابة اسمك أو اختيار التصميم الذي تحبه!`;
        actionButtons = [
          {
            label: '🎨 فتح استوديو التخصيص الآن',
            action: () => {
              setIsOpen(false);
              onOpenCustomizer?.();
            },
            variant: 'primary',
          },
          {
            label: '💬 استفسر مع ممثل المبيعات واتساب',
            action: () => {
              window.open(`https://wa.me/${OFFICIAL_CONTACT_INFO.whatsapp}?text=${encodeURIComponent(`السلام عليكم، بسأل عن كفر لموديل: ${query}`)}`, '_blank');
            },
            variant: 'whatsapp',
          },
        ];
      } else if (lower.includes('سعر') || lower.includes('بكام') || lower.includes('كام') || lower.includes('شحن') || lower.includes('مصاريف') || lower.includes('توصيل')) {
        replyText = `أسعار كفرات كيستيك تبدأ من 290 إلى 420 جنيه فقط بحسب نوع الحماية (شفاف مضاد للاصفرار، سيليكون ناعم، أو درع مدرع ماج سيف).\nالشحن 50 جنيه فقط لجميع مناطق القاهرة والجيزة والإسكندرية عبر شركة بوسطة، ويكون مجاناً تماماً عند طلب قطعتين!`;
        actionButtons = [
          {
            label: '🎁 تفعيل كود الخصم والشراء',
            action: () => {
              onApplyPromoCode?.('Dody15');
              setIsOpen(false);
              onOpenCheckout?.();
            },
            variant: 'accent',
          },
        ];
      } else if (lower.includes('خصم') || lower.includes('كود') || lower.includes('برومو') || lower.includes('عرض') || lower.includes('dody')) {
        replyText = `أهلاً بك! لقد تم تجهيز كود الخصم الحصري (Dody15) ليعطيك 15% خصم فوري على أي كفر تختاره الآن! هل تحب أن أنقلك لنافذة الدفع لتطبيقه مباشرة؟`;
        actionButtons = [
          {
            label: '✨ استخدام كود Dody15 الآن',
            action: () => {
              onApplyPromoCode?.('Dody15');
              setIsOpen(false);
              onOpenCheckout?.();
            },
            variant: 'accent',
          },
        ];
      } else if (lower.includes('معاينة') || lower.includes('افحص') || lower.includes('اشوفه') || lower.includes('قبل ما ادفع') || lower.includes('دفع عند الاستلام')) {
        replyText = `اطمئن تماماً يا فندم! سياسة كيستيك تضمن لك فحص الكفر وتجربته على تليفونك قبل تسليم المبلغ لمندوب الشحن. ولو في أي اختلاف، لا تدفع أي شيء. حقك مضمون بنسبة 100%!`;
        actionButtons = [
          {
            label: '🛡️ استكمل طلبك مع المعاينة',
            action: () => {
              setIsOpen(false);
              onOpenCheckout?.();
            },
            variant: 'primary',
          },
        ];
      } else if (lower.includes('جلد') || lower.includes('محفظة') || lower.includes('محافظ') || lower.includes('باتينا') || lower.includes('patina') || lower.includes('طبيعي') || lower.includes('ألوان الجلد')) {
        replyText = `نقدم لك في كيستيك قسماً ملكياً للجلود الطبيعية المدبوغة نباتياً (Full-Grain Italian Veg-Tan) مع محاكي ألوان وباتينا 3D يتيح لك رؤية تعتيق الجلد وتغيير الخياطة الشمعية والختم الحراري بالذهب أو الفضة!`;
        actionButtons = [
          {
            label: '🧥 فتح محاكي ألوان الجلد والباتينا 3D',
            action: () => {
              setIsOpen(false);
              onOpenLeatherSimulator?.();
            },
            variant: 'accent',
          },
          {
            label: '💬 استفسار واتساب عن المحافظ الجلدية',
            action: () => {
              window.open(`https://wa.me/${OFFICIAL_CONTACT_INFO.whatsapp}?text=${encodeURIComponent('السلام عليكم، استفسار عن المحافظ والمنتجات الجلدية الطبيعية')}`, '_blank');
            },
            variant: 'whatsapp',
          },
        ];
      } else if (lower.includes('تنبيه') || lower.includes('رادار') || lower.includes('انخفاض') || lower.includes('فلاش') || lower.includes('عروض') || lower.includes('flash') || lower.includes('drops')) {
        replyText = `⚡ رادار انخفاض الأسعار اللحظي يعمل الآن! يمكنك متابعة الصفقات الخاطفة (خصومات تصل إلى 28%) أو تفعيل تنبيه واتساب مباشر عندما ينخفض سعر كفر موديلك للسعر الذي تحدده.`;
        actionButtons = [
          {
            label: '⚡ فتح رادار الأسعار والعروض الخاطفة',
            action: () => {
              setIsOpen(false);
              onOpenPriceAlerts?.();
            },
            variant: 'primary',
          },
          {
            label: '🎁 تفعيل كود الخصم Dody15 فورا',
            action: () => {
              onApplyPromoCode?.('Dody15');
              setIsOpen(false);
              onOpenCheckout?.();
            },
            variant: 'accent',
          },
        ];
      } else if (lower.includes('شير') || lower.includes('مشاركة') || lower.includes('share') || lower.includes('qr') || lower.includes('باركود') || lower.includes('رابط')) {
        replyText = `يمكنك مشاركة أي منتج أو كفر مخصص بضغطة زر واحدة عبر الواتساب أو تيليجرام أو فيسبوك، أو توليد رمز QR مباشر للمسح بكاميرا الهاتف!`;
        actionButtons = [
          {
            label: '🚀 فتح مركز المشاركة السريعة وQR',
            action: () => {
              setIsOpen(false);
              onOpenQuickShare?.();
            },
            variant: 'primary',
          },
        ];
      } else if (lower.includes('واتس') || lower.includes('whatsapp') || lower.includes('رقم') || lower.includes('تليفون') || lower.includes('سوشيال') || lower.includes('فيسبوك') || lower.includes('تواصل')) {
        replyText = `📞 **قنوات التواصل والأرقام الرسمية المؤكدة لكيستيك (CaseTech):**\n\n• **رقم الواتساب والمبيعات المباشرة وإرسال الطلب للمطبعة**: \`${OFFICIAL_CONTACT_INFO.phoneDisplay}\` (${OFFICIAL_CONTACT_INFO.whatsappDisplay})\n• **الخط الإضافي للتأكيد واستكمال الشحنات**: \`${OFFICIAL_CONTACT_INFO.secondaryPhoneDisplay}\`\n• **الفيسبوك**: ${OFFICIAL_CONTACT_INFO.social.facebook}\n• **إنستغرام**: ${OFFICIAL_CONTACT_INFO.social.instagram}\n• **تيك توك**: ${OFFICIAL_CONTACT_INFO.social.tiktok}\n\nنحن متاحون 24/7 لخدمتك وضمان رحلة طلب ممتازة حتى باب بيتك مع التغليف الفاخر والهدايا والمعاينة قبل الدفع!`;
        actionButtons = [
          {
            label: `💬 فتح واتساب الرئيسي (${OFFICIAL_CONTACT_INFO.phoneDisplay})`,
            action: () => {
              window.open(`https://wa.me/${OFFICIAL_CONTACT_INFO.whatsapp}?text=${encodeURIComponent('السلام عليكم، بتواصل مع خدمة عملاء ومبيعات كيستيك')}`, '_blank');
            },
            variant: 'whatsapp',
          },
          {
            label: `📞 مراسلة الخط الثاني (${OFFICIAL_CONTACT_INFO.secondaryPhoneDisplay})`,
            action: () => {
              window.open(`https://wa.me/${OFFICIAL_CONTACT_INFO.secondaryWhatsapp}?text=${encodeURIComponent('السلام عليكم، استفسار وتأكيد أوردر كيستيك')}`, '_blank');
            },
            variant: 'secondary',
          },
          {
            label: '🌐 فتح دليل السوشيال ميديا والقنوات',
            action: () => {
              setIsOpen(false);
              onOpenSocial?.();
            },
            variant: 'secondary',
          },
        ];
      } else {
        replyText = `شكراً لسؤالك! أنا مدرب للرد على كافة تفاصيل كفرات كيستيك وحلول التخصيص السريعة. يمكنك إتمام طلبك الآن أو التحدث مباشرة مع فريق المبيعات البشري عبر الواتساب لتنفيذ أي طلب خاص.`;
        actionButtons = [
          {
            label: '🎨 تصفح الكتالوج واستوديو الكفرات',
            action: () => {
              setIsOpen(false);
              onOpenCustomizer?.();
            },
            variant: 'primary',
          },
          {
            label: '🟢 تواصل عبر الواتساب المباشر',
            action: () => {
              window.open(`https://wa.me/${OFFICIAL_CONTACT_INFO.whatsapp}?text=${encodeURIComponent(`السلام عليكم، استفسار بخصوص: ${query}`)}`, '_blank');
            },
            variant: 'whatsapp',
          },
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: replyText,
          timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
          actionButtons,
        },
      ]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating Trigger Button: Compact, polite and never covers products */}
      <div className={`fixed bottom-6 ${isRtl ? 'right-6' : 'left-6'} z-40`}>
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="group relative flex items-center gap-2.5 px-3.5 py-2.5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 hover:from-slate-800 hover:to-indigo-900 text-white font-bold rounded-2xl shadow-xl shadow-cyan-950/40 border border-cyan-400/40 transition-all transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
            aria-label="روبوت المبيعات والرد الآلي الذكي"
            title="روبوت مبيعات واستفسارات كيستيك (اضغط للمحادثة)"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-300/40 group-hover:rotate-6 transition-transform">
                <Bot className="w-4 h-4 text-cyan-300" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full"></span>
            </div>
            <div className="text-start">
              <div className="text-xs font-black tracking-wide text-white flex items-center gap-1">
                <span>بوت المبيعات</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">نشط</span>
              </div>
              <div className="text-[10px] text-cyan-200/80 font-medium">
                استفسار وتأكيد طلب ⚡
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Slide-out / Modal Chat Window with Minimizable State */}
      {isOpen && (
        isMinimized ? (
          /* MINIMIZED SLIM FLOATING BAR: Allows full preview of products */
          <div
            className={`fixed bottom-6 ${isRtl ? 'right-4 sm:right-6' : 'left-4 sm:left-6'} z-50 bg-slate-950/95 border border-cyan-500/50 rounded-2xl px-3.5 py-2 flex items-center gap-3 shadow-2xl backdrop-blur-xl animate-in fade-in duration-200 ring-1 ring-cyan-500/30`}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="text-start">
                <span className="text-xs font-bold text-white block">بوت المبيعات (مُصغر لمعاينة المنتجات)</span>
                <span className="text-[10px] text-cyan-300 font-medium">جاهز للإجابة فوراً ⚡</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 border-r border-slate-700/80 pr-2 mr-1">
              <button
                onClick={() => setIsMinimized(false)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[11px] transition-colors"
                title="استعادة وتكبير نافذة المحادثة"
              >
                <ChevronUp className="w-3.5 h-3.5" />
                <span>تكبير</span>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* FULL CHAT WINDOW */
          <div 
            className={`fixed bottom-6 ${isRtl ? 'right-4 sm:right-6' : 'left-4 sm:left-6'} z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-slate-950 border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-900/40 flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 p-3.5 border-b border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 border border-cyan-300/40">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-black text-white">روبوت مبيعات كيستيك الذكي</h3>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">AI Closer</span>
                  </div>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    رد فوري ومعاينة قبل الدفع · {OFFICIAL_CONTACT_INFO.phoneDisplay}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Minimize Button so customer can browse catalog freely without closing chat */}
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                  title="تصغير النافذة لمعاينة وتصفح المنتجات في الصفحة"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="إغلاق المحادثة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

          {/* Guaranteed Value & High-Thinking Bar */}
          <div className="bg-slate-900 border-b border-cyan-800/40 px-3.5 py-2 flex items-center justify-between text-[11px] text-cyan-300 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              معاينة وفحص قبل الدفع مع بوسطة
            </span>

            {/* High Thinking Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsHighThinkingEnabled(!isHighThinkingEnabled)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all border ${
                isHighThinkingEnabled
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-200 border-cyan-400/50 shadow-sm shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title="تفعيل وضع التفكير الفائق لتقييم الاستفسارات المعقدة (ThinkingLevel: HIGH)"
            >
              <Brain className={`w-3.5 h-3.5 ${isHighThinkingEnabled ? 'text-cyan-400 animate-pulse' : 'text-slate-400'}`} />
              <span>{isHighThinkingEnabled ? 'تفكير فائق: نشط ⚡' : 'رد سريع'}</span>
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-950 to-slate-900/90 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-sm'
                      : 'bg-slate-900 text-slate-100 border border-slate-800 rounded-bl-sm'
                  }`}
                >
                  {/* Thinking Process Disclosure for Deep Reasoning */}
                  {msg.thinkingProcess && (
                    <div className="mb-2.5 p-2.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 text-[11px] text-cyan-200/90">
                      <div className="flex items-center justify-between text-[10px] text-cyan-400 font-bold mb-1 font-mono">
                        <span className="flex items-center gap-1">
                          <Brain className="w-3 h-3 animate-pulse" />
                          <span>مسار التفكير المتأمل (Thinking Process):</span>
                        </span>
                        {msg.durationMs && (
                          <span className="text-cyan-300">
                            {(msg.durationMs / 1000).toFixed(1)} ث
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-[10px] text-slate-400 line-clamp-3 leading-relaxed">
                        {msg.thinkingProcess}
                      </p>
                    </div>
                  )}

                  {msg.text}

                  {/* Bot Interactive Action Buttons */}
                  {msg.actionButtons && msg.actionButtons.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-800 flex flex-col gap-2">
                      {msg.actionButtons.map((btn, idx) => (
                        <button
                          key={idx}
                          onClick={btn.action}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
                            btn.variant === 'primary'
                              ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black'
                              : btn.variant === 'accent'
                              ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 font-black'
                              : btn.variant === 'whatsapp'
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                              : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/50'
                          }`}
                        >
                          <span>{btn.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-500 mt-1 px-1 flex items-center gap-1 font-mono">
                  {msg.timestamp}
                  {msg.sender === 'bot' && <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400" />}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-cyan-400 text-xs bg-slate-900/80 p-3 rounded-2xl w-28 border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                <span className="text-[10px] font-mono text-slate-400">يكتب...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Pivotal Quick Reply Chips (الرسائل المفصلية ليختار العميل منها بنقرة واحدة) */}
          <div className="p-2.5 bg-slate-900/95 border-t border-slate-800">
            <div className="text-[11px] font-bold text-slate-400 mb-1.5 flex items-center justify-between px-1">
              <span>⚡ أسئلة مفصلية سريعة (اختر استفسارك):</span>
              <span className="text-[10px] text-cyan-400">ضغطة واحدة للرد</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
              {QUICK_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectQuickOption(opt)}
                  className="whitespace-nowrap px-2.5 py-1.5 bg-slate-800/90 hover:bg-cyan-900/40 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 text-[11px] font-medium rounded-xl border border-slate-700/60 transition-all flex items-center gap-1.5 shrink-0 active:scale-95 shadow-sm"
                >
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message Input Form */}
          <form
            onSubmit={handleSendCustomMessage}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="اكتب سؤالك هنا أو اسم موديل هاتفك..."
              className="flex-1 bg-slate-900 text-white placeholder-slate-500 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-slate-950 font-bold rounded-xl transition-all shadow-md shadow-cyan-500/20 active:scale-95"
              title="إرسال"
            >
              <Send className="w-4 h-4 rtl:rotate-180" />
            </button>
          </form>
        </div>
        )
      )}
    </>
  );
};
