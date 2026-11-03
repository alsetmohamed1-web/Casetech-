import React, { useState } from 'react';
import {
  X,
  Share2,
  Download,
  Copy,
  Check,
  Printer,
  Sparkles,
  TrendingUp,
  DollarSign,
  Package,
  Layers,
  ShoppingBag,
  ExternalLink,
  Users,
  CheckCircle2,
  FileSpreadsheet,
  QrCode,
  Truck,
  ArrowRight,
  ShieldCheck,
  Send,
  Plus,
} from 'lucide-react';
import { Currency, Product, Order } from '../types';
import { CURRENCIES, MARKETPLACE_CHANNELS, INITIAL_AFFILIATES, PRODUCTS } from '../data/products';

interface OmnichannelMarketplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  products: Product[];
  currency: Currency;
}

export const OmnichannelMarketplaceModal: React.FC<OmnichannelMarketplaceModalProps> = ({
  isOpen,
  onClose,
  orders,
  products,
  currency,
}) => {
  if (!isOpen) return null;

  const currencyConfig = CURRENCIES[currency] || CURRENCIES.EGP;

  // Active Tab
  const [activeTab, setActiveTab] = useState<'channels' | 'kenzz_taager' | 'ai_copy' | 'thermal_label' | 'affiliates' | 'roadmap'>('channels');
  
  // Selected channel for detailed view
  const [selectedChannelId, setSelectedChannelId] = useState<'amazon' | 'noon' | 'kenzz' | 'jumia' | 'tiktok_meta'>('amazon');
  
  // Copying state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // AI Copy Generator State
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || 'case-1');
  const [targetPlatform, setTargetPlatform] = useState<'amazon' | 'noon' | 'kenzz' | 'tiktok'>('amazon');
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<{
    title: string;
    bullets: string[];
    keywords: string;
    hookScript: string;
  } | null>(null);

  // Thermal Label State
  const [selectedLabelOrder, setSelectedLabelOrder] = useState<Order>(orders[0]);
  const [labelCourier, setLabelCourier] = useState<'bosta' | 'amazon_easyship' | 'noon_express' | 'jumia'>('bosta');

  // Affiliates state
  const [affiliates, setAffiliates] = useState(INITIAL_AFFILIATES);
  const [newAffiliateName, setNewAffiliateName] = useState('');
  const [newAffiliateCode, setNewAffiliateCode] = useState('');
  const [newAffiliateChannel, setNewAffiliateChannel] = useState('');
  const [newAffiliateCommission, setNewAffiliateCommission] = useState(15);
  const [showAddAffiliate, setShowAddAffiliate] = useState(false);
  const [payoutSuccessMsg, setPayoutSuccessMsg] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleExportCSV = (channelId: string) => {
    let csvHeader = '';
    let csvRows: string[] = [];

    if (channelId === 'amazon') {
      csvHeader = 'item_sku,brand_name,item_name,standard_price,quantity,main_image_url,bullet_point1,bullet_point2,generic_keywords\n';
      csvRows = products.map((p) => {
        const sku = `NQSH-${p.id.toUpperCase()}-01`;
        const price = (p.price * currencyConfig.rateFromUSD).toFixed(0);
        return `"${sku}","NAQSH","${p.nameAr} - ${p.nameEn}","${price}","50","${p.image}","${p.featuresAr[0] || ''}","${p.featuresAr[1] || ''}","كفر حماية جوال نقش ليزر جلد طبيعي"`;
      });
    } else if (channelId === 'noon') {
      csvHeader = 'partner_sku,noon_sku,title_ar,title_en,price_egp,stock,brand,warranty\n';
      csvRows = products.map((p) => {
        const sku = `NOON-NQSH-${p.id}`;
        const price = (p.price * currencyConfig.rateFromUSD).toFixed(0);
        return `"${sku}","","${p.nameAr}","${p.nameEn}","${price}","35","NAQSH","1 Year UV Guarantee"`;
      });
    } else if (channelId === 'kenzz') {
      csvHeader = 'product_id,product_name,wholesale_cost_egp,suggested_retail_price_egp,marketer_profit_egp,stock_status\n';
      csvRows = products.map((p) => {
        const wholesaleCost = (p.factoryCost * currencyConfig.rateFromUSD + 50).toFixed(0);
        const retail = (p.price * currencyConfig.rateFromUSD).toFixed(0);
        const profit = Number(retail) - Number(wholesaleCost);
        return `"${p.id}","${p.nameAr}","${wholesaleCost}","${retail}","${profit}","متوفر للشحن الفوري 24 ساعة"`;
      });
    } else {
      csvHeader = 'sku,name,price,category,status\n';
      csvRows = products.map((p) => `"${p.id}","${p.nameAr}","${(p.price * currencyConfig.rateFromUSD).toFixed(0)}","${p.category}","Active"`);
    }

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(csvHeader + csvRows.join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `NAQSH_${channelId.toUpperCase()}_Catalog_Feed.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerateAICopy = () => {
    setIsGeneratingCopy(true);
    setTimeout(() => {
      const prod = products.find((p) => p.id === selectedProductId) || products[0];

      if (targetPlatform === 'amazon') {
        setGeneratedResult({
          title: `كفر هاتف نقش | NAQSH فخم متوافق مع ماج سيف وحماية من الصدمات بحفر ليزري مخصص - مناسب لآيفون وسامسونج، أسود كلاسيكي`,
          bullets: [
            '🛡️ حماية عسكرية فائقة: معتمد لتحمل السقوط من ارتفاع 3 أمتار بفضل حواف امتصاص الصدمات المزدوجة.',
            '✨ حفر ونقش دقيق: تفاصيل مطبوعة بأحدث ماكينات UV اليابانية بدقة 1200 DPI وثبات ألوان مقاوم للخدش والتآكل.',
            '🧲 شحن MagSafe قوي: مغناطيس مدمج N52 متوافق تماماً مع جميع الشواحن اللاسلكية وحوامل السيارات المغناطيسية.',
            '🎁 تغليف هدايا ملكي: يأتي داخل صندوق أسود فاخر مع كيس مخملي وبطاقة ضمان ذهبية، جاهز للإهداء الفوري.',
            '🇪🇬 فخر الصناعة والتخصيص: تصميم وتنفيذ محلي بأعلى معايير الجودة مع دعم الشحن السريع في جميع المحافظات.',
          ],
          keywords: 'كفر ايفون كفرات سامسونج جراب موبايل حماية ماج سيف نقش بالاسم هدية رجالية فخمة محفظة جلد طبيعي كفرات بنات كفر كشخة اكسسوارات جوال',
          hookScript: 'لماذا تدفع مبالغ طائلة في كفرات عادية بينما يمكنك امتلاك كفر يحمل اسمك بهوية ملكية وجودة عسكرية تدوم للأبد؟',
        });
      } else if (targetPlatform === 'noon') {
        setGeneratedResult({
          title: `نقش NAQSH كفر حماية للهواتف الذكية مع ميزة ماج سيف وطباعة UV بارزة عسلي وأسود`,
          bullets: [
            'علامة تجارية أصلية مسجلة بنسبة 100% مع ضمان استبدال مجاني.',
            'حواف مرتفعة لحماية عدسات الكاميرا والشاشة من الخدوش والاحتكاك المباشر.',
            'ملمس ناعم غير قابل للانزلاق ومقاوم لبصمات الأصابع والزيوت.',
            'يدعم الشحن اللاسلكي السريع دون الحاجة لنزع الكفر.',
          ],
          keywords: 'noon express naqsh phone case shockproof magsafe customized',
          hookScript: 'القطعة الأكثر طلباً الآن على نون إكسبريس مع توصيل في اليوم التالي وضمان الجودة.',
        });
      } else if (targetPlatform === 'kenzz') {
        setGeneratedResult({
          title: `[عرض خاص للمسوقين والدروب شيبينج] كفرات نقش ومحافظ جلد طبيعي - هامش ربحك 180 ج.م في القطعة!`,
          bullets: [
            'سعر التوريد للمسوق: 190 ج.م فقط (شامل العلبة الفاخرة والكيس المخملي).',
            'سعر البيع المقترح لعميلك: 390 - 450 ج.م (ربحك الصافي أكثر من 200 ج.م للطلب الواحد).',
            'متاح شحن لجميع محافظات مصر عبر بوسطة مع تحصيل الدفع عند الاستلام ونسبة تسليم تتجاوز 93%.',
            'نوفر لك صور ومقاطع فيديو احترافية بدون لوجو جاهزة للنشر فوراً على صفحاتك وجروباتك.',
          ],
          keywords: 'تاجر كنز دروب شيبينج مسوقين عمولة ربح من المنزل منتجات جاهزة للتسويق',
          hookScript: 'لكل مسوق بالعمولة: هذا المنتج يحقق أعلى نسبة تحويل (Conversion Rate) لأن العميل ينبهر برؤية اسمه مكتوباً بالذهب!',
        });
      } else {
        setGeneratedResult({
          title: `كفرات ومحافظ نقش الفاخرة | TikTok Viral Unboxing Experience`,
          bullets: [
            'فيديو فتح الصندوق الأكثر انتشاراً (Viral TikTok & Reels).',
            'كود الخصم الحصري في البايو: Dody15 لخصم 15% فوري + شحن مجاني.',
            'اطلب كفرك الآن واكتب اسمك أو بيت الشعر المفضل لديك.',
          ],
          keywords: '#نقش #كفرات_موبايل #اكسبلور #تيك_توك_شوب #هدايا_فخمة #مصر #السعودية',
          hookScript: 'الهوك: "لو بتدور على هدية تبهر أي حد بدون ما تدفع آلاف.. شوف إيه اللي وصلني النهاردة من نقش!" (مع صوت فتح العلبة الكرتونية والكيس المخملي).',
        });
      }
      setIsGeneratingCopy(false);
    }, 600);
  };

  const handleAddAffiliate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAffiliateName || !newAffiliateCode) return;

    const newPartner = {
      id: `aff-${Date.now()}`,
      name: newAffiliateName,
      channel: newAffiliateChannel || 'تيك توك / انستجرام',
      code: newAffiliateCode.trim().toUpperCase(),
      discountPercent: 10,
      commissionPercent: Number(newAffiliateCommission) || 15,
      clicksCount: 0,
      ordersCount: 0,
      totalSalesUSD: 0,
      pendingCommissionUSD: 0,
      paidCommissionUSD: 0,
      payoutMethod: 'instapay' as const,
      payoutDetails: 'بانتظار إضافة تفاصيل المحفظة',
    };

    setAffiliates((prev) => [newPartner, ...prev]);
    setNewAffiliateName('');
    setNewAffiliateCode('');
    setNewAffiliateChannel('');
    setShowAddAffiliate(false);
  };

  const handlePayAffiliate = (affId: string) => {
    setAffiliates((prev) =>
      prev.map((aff) => {
        if (aff.id === affId) {
          const amount = aff.pendingCommissionUSD;
          return {
            ...aff,
            paidCommissionUSD: aff.paidCommissionUSD + amount,
            pendingCommissionUSD: 0,
          };
        }
        return aff;
      })
    );
    setPayoutSuccessMsg('تم تأكيد تحويل العمولة بنجاح عبر إنستاباي وتسجيل الإشعار!');
    setTimeout(() => setPayoutSuccessMsg(null), 3000);
  };

  const handlePrintThermalLabel = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-auto text-stone-100 max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 bg-stone-950/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-stone-950 flex items-center justify-center font-bold shadow-md">
              <Share2 className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  مركز قنوات البيع المتعددة والأفلييت (Omnichannel & Marketplaces Hub)
                </h2>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                  AMAZON · NOON · KENZZ · JUMIA
                </span>
              </div>
              <p className="text-xs text-stone-400">
                إدارة البيع على أمازون، نون، شبكة مسوقي كنز وتاجر، وجوميا، مع مولد الأوصاف الذكي وطباعة البوالص الحرارية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="إغلاق النافذة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 px-6 py-2.5 bg-stone-950 border-b border-stone-800 overflow-x-auto text-xs no-scrollbar">
          <button
            onClick={() => setActiveTab('channels')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'channels' ? 'bg-amber-500 text-stone-950 shadow-sm' : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>قنوات البيع والمنصات (5 قنوات)</span>
          </button>

          <button
            onClick={() => setActiveTab('kenzz_taager')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'kenzz_taager' ? 'bg-emerald-500 text-stone-950 shadow-sm' : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>مسوقي كنز وتاجر (Wholesale Pack)</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_copy')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'ai_copy' ? 'bg-purple-500 text-white shadow-sm' : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>مولد الأوصاف بالذكاء الاصطناعي (AI Listings)</span>
          </button>

          <button
            onClick={() => setActiveTab('thermal_label')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'thermal_label' ? 'bg-blue-500 text-white shadow-sm' : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>بوالص الشحن والباركود A6 (Thermal Label)</span>
          </button>

          <button
            onClick={() => setActiveTab('affiliates')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'affiliates' ? 'bg-amber-500 text-stone-950 shadow-sm' : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>بوابة المؤثرين والعمولات (Dody15)</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'roadmap' ? 'bg-rose-500 text-white shadow-sm' : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>خطة الإطلاق والتفوق على المنافسين 🚀</span>
          </button>
        </div>

        {/* Tab 1: Marketplace Channels Overview & Feed Export */}
        {activeTab === 'channels' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-400 block mb-1">الوصول التراكمي للمنصات:</span>
                <span className="text-xl font-bold text-white font-latin">+55,000,000</span>
                <span className="text-[10px] text-stone-400 block mt-1">متسوق شهرياً عبر أمازون ونون وجوميا وسوشيال</span>
              </div>

              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-400 block mb-1">متوسط عمولة المنصات:</span>
                <span className="text-xl font-bold text-amber-400 tabular-nums">11.8%</span>
                <span className="text-[10px] text-stone-400 block mt-1">مغطاة بالكامل بهامش ربح المنتجات (+65%)</span>
              </div>

              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-400 block mb-1">جاهزية التصدير (Export Feeds):</span>
                <span className="text-xl font-bold text-emerald-400">100% جاهز</span>
                <span className="text-[10px] text-stone-400 block mt-1">ملفات CSV مجهزة وفق شروط كل متجر</span>
              </div>

              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-400 block mb-1">سياسة الشحن المتعدد:</span>
                <span className="text-xl font-bold text-blue-400">بوسطة + FBA + FBN</span>
                <span className="text-[10px] text-stone-400 block mt-1">شحن هجين يوفر تكاليف التخزين المسبق</span>
              </div>
            </div>

            {/* Channels Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {MARKETPLACE_CHANNELS.map((ch) => (
                <div
                  key={ch.id}
                  className="bg-stone-950/80 rounded-2xl border border-stone-800 p-5 flex flex-col justify-between hover:border-amber-500/50 transition-all hover:shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{ch.logo}</span>
                        <div>
                          <h3 className="font-bold text-sm text-white">{ch.nameAr}</h3>
                          <span className="text-[10px] text-stone-400 font-latin">{ch.nameEn}</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-stone-800 px-2 py-0.5 rounded border border-stone-700 font-medium text-amber-400">
                        {ch.badge}
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/80">
                      {ch.keyBenefit}
                    </p>

                    <div className="space-y-1.5 text-xs text-stone-400 pt-1">
                      <div className="flex items-center justify-between">
                        <span>نسبة عمولة المنصة:</span>
                        <strong className="text-stone-200">{ch.commissionRate}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>دورة تحويل الأرباح:</span>
                        <strong className="text-stone-200">{ch.payoutPeriod}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>طريقة التجهيز والشحن:</span>
                        <strong className="text-amber-400 text-[11px]">{ch.fulfillmentType}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>الوصول الشهري المتوقع:</span>
                        <strong className="text-emerald-400">{ch.monthlyReach}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-800/80 mt-4 flex items-center gap-2">
                    <button
                      onClick={() => handleExportCSV(ch.id)}
                      className="flex-1 py-2 bg-stone-800 hover:bg-stone-700 text-stone-100 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-stone-700 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>تنزيل شيت المنتجات (CSV)</span>
                    </button>
                    <button
                      onClick={() => {
                        setTargetPlatform(ch.id === 'amazon' ? 'amazon' : ch.id === 'noon' ? 'noon' : ch.id === 'kenzz' ? 'kenzz' : 'tiktok');
                        setActiveTab('ai_copy');
                      }}
                      className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30 transition-colors"
                      title="توليد أوصاف ذكية لهذه القناة"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Strategic Advice Banner */}
            <div className="p-5 bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/30 rounded-2xl border border-amber-800/40 text-xs text-stone-300 space-y-2">
              <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>كيف تتفوق على المنافسين في جميع هذه المنصات في وقت واحد؟</span>
              </h4>
              <p className="leading-relaxed">
                المنافسون يبيعون كفرات جاهزة مكررة. في <strong>نقش (NAQSH)</strong> لديك ميزتان لا يملكهما أي متجر آخر:
                <br />
                1. <strong>التخصيص الشخصي (Personalization):</strong> بيع الكفر بالطلب مع الاسم بحفر ليزري أو ذهب حقيقي — هذا يضاعف رغبة العميل ويمنع مقارنة السعر بالمنتجات الصينية الرخيصة.
                <br />
                2. <strong>انعدام المخزون الراكد:</strong> تطبع القطعة بعد استلام الطلب والشحن مباشرة خلال 24 ساعة، مما يحرر رأس مالك بالكامل للتسويق وصناعة المحتوى الفيروسي على تيك توك وإنستجرام.
              </p>
            </div>

          </div>
        )}

        {/* Tab 2: Kenzz & Taager Affiliate Reseller Pack */}
        {activeTab === 'kenzz_taager' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-emerald-950/50 via-stone-900 to-stone-950 rounded-2xl border border-emerald-800/40">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">حزمة التوريد لشبكات كنز وتاجر والمسوقين (Kenzz & Taager Pack)</h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                    +120,000 مسوق بالعمولة
                  </span>
                </div>
                <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
                  منصات مثل كنز وتاجر توفر لك جيشاً من المسوقين في مصر الذين يبيعون منتجاتك بدون أي تكلفة إعلانات مسبقة.
                  كل ما عليك هو توفير سعر جملة منافس ومادة إعلانية بدون لوجو (Mockups) ونحن نتكفل بالشحن عبر بوسطة!
                </p>
              </div>

              <button
                onClick={() => handleExportCSV('kenzz')}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95 shrink-0"
              >
                <Download className="w-4 h-4 text-stone-950" />
                <span>تنزيل كتالوج أسعار الجملة لكنز وتاجر</span>
              </button>
            </div>

            {/* Wholesale Pricing Table for Resellers */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-stone-300">هوامش أرباح المسوقين (Reseller Profit Margins):</h4>
              <div className="border border-stone-800 rounded-xl overflow-hidden bg-stone-950">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-900/90 text-stone-400 border-b border-stone-800">
                    <tr>
                      <th className="p-3">المنتج</th>
                      <th className="p-3">سعر التوريد للجملة (لكنز)</th>
                      <th className="p-3">السعر المقترح للمستهلك</th>
                      <th className="p-3 text-emerald-400">صافي ربح المسوق بالقطعة</th>
                      <th className="p-3">نسبة التسليم المضمونة</th>
                      <th className="p-3 text-center">أدوات التسويق</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60 text-stone-200">
                    {products.slice(0, 6).map((p) => {
                      const wholesale = (p.factoryCost * currencyConfig.rateFromUSD + 45).toFixed(0);
                      const retail = (p.price * currencyConfig.rateFromUSD).toFixed(0);
                      const profit = Number(retail) - Number(wholesale);

                      return (
                        <tr key={p.id} className="hover:bg-stone-900/40 transition-colors">
                          <td className="p-3 font-semibold flex items-center gap-2.5">
                            <img src={p.image} alt={p.nameAr} className="w-8 h-8 rounded-lg object-cover border border-stone-800" />
                            <span>{p.nameAr}</span>
                          </td>
                          <td className="p-3 font-mono font-bold text-stone-300">
                            {wholesale} {currencyConfig.symbolAr}
                          </td>
                          <td className="p-3 font-mono text-stone-400">
                            {retail} {currencyConfig.symbolAr}
                          </td>
                          <td className="p-3 font-mono font-bold text-emerald-400">
                            +{profit} {currencyConfig.symbolAr}
                          </td>
                          <td className="p-3">
                            <span className="text-[11px] bg-emerald-950/60 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/40">
                              93.5% (شحن 24 ساعة)
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => {
                                handleCopy(
                                  `عرض خاص من نقش | NAQSH: ${p.nameAr} مع نقش اسمك بالذهب والتغليف الملكي! السعر فقط ${retail} ج.م مع شحن لباب البيت ومعاينة قبل الاستلام. للطلب ارسل رسالة بالاسم والموديل.`,
                                  `promo-${p.id}`
                                );
                              }}
                              className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-[11px] border border-stone-700 transition-colors inline-flex items-center gap-1"
                            >
                              {copiedKey === `promo-${p.id}` ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span>تم النسخ!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>نسخ بوست المسوق</span>
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Ready Unbranded Assets Pack */}
            <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-3">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-400" />
                <span>حزمة الموك أب والصور المفرغة بدون علامات مائية للمسوقين:</span>
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                قمنا بإعداد مجلد كامل يحتوي على صور المنتجات بخلفيات بيضاء نقية وموك أب ثلاثي الأبعاد للهواتف بدون أي لوجو، حتى يتمكن مسوقو كنز وتاجر من وضع أسعارهم وأرقامهم التسويقية بحرية تامة:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {products.slice(0, 4).map((p, idx) => (
                  <div key={idx} className="bg-stone-900 p-2.5 rounded-xl border border-stone-800 text-center space-y-2">
                    <img src={p.image} alt={p.nameAr} className="w-full h-24 object-cover rounded-lg" />
                    <span className="text-[11px] text-stone-300 block truncate">{p.nameAr}</span>
                    <button
                      onClick={() => handleCopy(p.image, `img-${idx}`)}
                      className="w-full py-1 text-[10px] bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-700 flex items-center justify-center gap-1"
                    >
                      {copiedKey === `img-${idx}` ? 'تم نسخ الرابط!' : 'نسخ رابط الصورة'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: AI Multi-Platform Copy Generator */}
        {activeTab === 'ai_copy' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div className="p-5 bg-gradient-to-r from-purple-950/50 via-stone-900 to-stone-950 rounded-2xl border border-purple-800/40">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">
                  مولد الأوصاف الإعلانية الذكي لقنوات البيع (AI Multi-Channel Copywriter)
                </h3>
              </div>
              <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
                كل منصة لها خوارزميات كتابة خاصة: أمازون تعتمد على الكلمات المفتاحية وBullet Points، بينما تيك توك يحتاج إلى Hook في أول 3 ثوانٍ، ونون تركز على المواصفات الفنية. اختر المنصة والمنتج ودع الذكاء الاصطناعي يجهز لك النص الأقوى للبيع!
              </p>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">اختر المنتج:</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nameAr} ({p.category === 'cases' ? 'كفر هاتف' : 'محفظة'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">قناة البيع المستهدفة:</label>
                <select
                  value={targetPlatform}
                  onChange={(e) => setTargetPlatform(e.target.value as any)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="amazon">أمازون (Amazon A+ & Bullet Points)</option>
                  <option value="noon">نون (Noon Title & Specifications)</option>
                  <option value="kenzz">كنز وتاجر (عرض المسوقين وهوامش الربح)</option>
                  <option value="tiktok">تيك توك وإنستجرام (Viral Hook & Reels Script)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleGenerateAICopy}
                  disabled={isGeneratingCopy}
                  className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>{isGeneratingCopy ? 'جاري الصياغة بالذكاء الاصطناعي...' : 'توليد النص الإعلاني فوراً'}</span>
                </button>
              </div>
            </div>

            {/* Generated Output */}
            {generatedResult && (
              <div className="bg-stone-950 rounded-2xl border border-stone-800 p-5 space-y-4">
                
                {/* Title */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-purple-400">العنوان المتوافق مع خوارزمية البحث (Product Title):</span>
                    <button
                      onClick={() => handleCopy(generatedResult.title, 'copy-title')}
                      className="text-stone-400 hover:text-white text-xs flex items-center gap-1"
                    >
                      {copiedKey === 'copy-title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>نسخ</span>
                    </button>
                  </div>
                  <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 text-xs text-stone-200 font-medium">
                    {generatedResult.title}
                  </div>
                </div>

                {/* Bullets */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-400">نقاط البيع التنافسية (Bullet Points):</span>
                    <button
                      onClick={() => handleCopy(generatedResult.bullets.join('\n'), 'copy-bullets')}
                      className="text-stone-400 hover:text-white text-xs flex items-center gap-1"
                    >
                      {copiedKey === 'copy-bullets' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>نسخ الكل</span>
                    </button>
                  </div>
                  <div className="space-y-1.5 p-3 bg-stone-900 rounded-xl border border-stone-800 text-xs text-stone-300">
                    {generatedResult.bullets.map((b, i) => (
                      <p key={i} className="leading-relaxed">{b}</p>
                    ))}
                  </div>
                </div>

                {/* Hook / Script */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-emerald-400">الخطاف الإعلاني / Hook (لسوشيال ميديا وتيك توك):</span>
                    <button
                      onClick={() => handleCopy(generatedResult.hookScript, 'copy-hook')}
                      className="text-stone-400 hover:text-white text-xs flex items-center gap-1"
                    >
                      {copiedKey === 'copy-hook' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>نسخ</span>
                    </button>
                  </div>
                  <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 text-xs text-stone-200 italic">
                    &ldquo;{generatedResult.hookScript}&rdquo;
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-blue-400">الكلمات المفتاحية الخلفية (Backend Search Terms 250 Bytes):</span>
                    <button
                      onClick={() => handleCopy(generatedResult.keywords, 'copy-kw')}
                      className="text-stone-400 hover:text-white text-xs flex items-center gap-1"
                    >
                      {copiedKey === 'copy-kw' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>نسخ</span>
                    </button>
                  </div>
                  <div className="p-2.5 bg-stone-900 rounded-xl border border-stone-800 text-xs text-stone-400 font-mono">
                    {generatedResult.keywords}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* Tab 4: Thermal A6 Shipping Label & Code128 Barcode */}
        {activeTab === 'thermal_label' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-stone-950 rounded-2xl border border-stone-800">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Printer className="w-4 h-4 text-blue-400" />
                  <span>مولد بوليصة الشحن الحرارية والباركود (A6 Thermal 4x6&quot;)</span>
                </h3>
                <p className="text-xs text-stone-400">
                  متوافقة تماماً مع طابعات Xprinter وZebra الحرارية ومقبولة رسمياً لدى بوسطة، أمازون إيزي شيب، ونون إكسبريس.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintThermalLabel}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة البوليصة الآن (Print A6)</span>
                </button>
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">اختر الطلب لطباعة بوليصته:</label>
                <select
                  value={selectedLabelOrder.id}
                  onChange={(e) => {
                    const found = orders.find((o) => o.id === e.target.value);
                    if (found) setSelectedLabelOrder(found);
                  }}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  {orders.map((ord) => (
                    <option key={ord.id} value={ord.id}>
                      {ord.orderNumber} - {ord.customerName} ({ord.address.city})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">شركة الشحن والتوصيل:</label>
                <select
                  value={labelCourier}
                  onChange={(e) => setLabelCourier(e.target.value as any)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="bosta">بوسطة إكسبريس (Bosta Courier EG)</option>
                  <option value="amazon_easyship">أمازون إيزي شيب (Amazon Easy Ship EG/KSA)</option>
                  <option value="noon_express">نون دايركت (Noon Direct Delivery)</option>
                  <option value="jumia">جوميا دروب شيب (Jumia Drop-off)</option>
                </select>
              </div>
            </div>

            {/* Realistic Physical Thermal Label Preview (A6 Black & White) */}
            <div className="flex justify-center py-2">
              <div
                id="thermal-label-print-area"
                className="w-full max-w-md bg-white text-black p-5 rounded-lg shadow-2xl border-2 border-black font-sans text-xs space-y-3.5 select-none"
                style={{ minHeight: '520px' }}
              >
                
                {/* Label Header */}
                <div className="flex items-center justify-between border-b-2 border-black pb-2.5">
                  <div>
                    <h1 className="text-xl font-black tracking-tight">نقش | NAQSH</h1>
                    <span className="text-[10px] font-bold uppercase tracking-wider block">PREMIUM CUSTOM POD GOODS</span>
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-black uppercase px-2 py-1 bg-black text-white rounded">
                      {labelCourier === 'bosta' ? 'BOSTA EXPRESS' : labelCourier === 'amazon_easyship' ? 'AMAZON EASY SHIP' : 'NOON DIRECT'}
                    </span>
                    <span className="block text-[10px] text-stone-600 mt-0.5">{selectedLabelOrder.createdAt}</span>
                  </div>
                </div>

                {/* Barcode & Tracking Number */}
                <div className="text-center py-1 border-b-2 border-black">
                  {/* SVG Code128 Barcode Representation */}
                  <div className="flex justify-center items-center gap-[2px] h-14 overflow-hidden my-1">
                    {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1].map((w, idx) => (
                      <div
                        key={idx}
                        className={`bg-black h-full ${idx % 2 === 0 ? 'opacity-100' : 'opacity-0'}`}
                        style={{ width: `${w * 1.5}px` }}
                      ></div>
                    ))}
                  </div>
                  <span className="font-mono text-sm font-black tracking-widest">
                    *{selectedLabelOrder.trackingNumber || 'BST-EG-9984128'}*
                  </span>
                </div>

                {/* COD Big Box */}
                <div className="border-2 border-black p-2 flex items-center justify-between bg-stone-100">
                  <div>
                    <span className="text-[10px] font-bold block uppercase">PAYMENT MODE:</span>
                    <span className="text-base font-black">
                      {selectedLabelOrder.paymentMethod === 'cod' ? 'تحصيل عند الاستلام (COD)' : 'مدفوع مسبقاً (PREPAID)'}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-bold block uppercase">AMOUNT TO COLLECT:</span>
                    <span className="text-2xl font-black">
                      {(selectedLabelOrder.total * currencyConfig.rateFromUSD).toFixed(0)} {currencyConfig.symbolAr}
                    </span>
                  </div>
                </div>

                {/* Deliver To (Recipient) */}
                <div className="border-b-2 border-black pb-2 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-stone-600 block">DELIVER TO / المستلم:</span>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black">{selectedLabelOrder.customerName}</span>
                    <span className="font-mono font-bold text-sm">{selectedLabelOrder.customerPhone}</span>
                  </div>
                  <p className="font-medium text-xs leading-snug">
                    {selectedLabelOrder.address.country} - {selectedLabelOrder.address.city} - {selectedLabelOrder.address.street}
                  </p>
                  {selectedLabelOrder.address.notes && (
                    <p className="text-[10px] italic text-stone-700 bg-stone-100 p-1 rounded">
                      ملاحظة العميل: {selectedLabelOrder.address.notes}
                    </p>
                  )}
                </div>

                {/* Package & Order Items Breakdown */}
                <div className="border-b-2 border-black pb-2 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-stone-600 block">ITEMS & SPECS / محتويات الطرد:</span>
                  {selectedLabelOrder.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] font-bold">
                      <span>• {it.product.nameAr} (الكمية: {it.quantity})</span>
                      {it.customization?.customText && (
                        <span className="bg-black text-white px-1.5 py-0.5 rounded text-[10px] font-mono">
                          نقش: {it.customization.customText}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Return Hub & Sender */}
                <div className="flex items-center justify-between pt-1 text-[10px] font-bold text-stone-700">
                  <div>
                    <span>مرسل من: مطبعة ومركز توزيع نقش (مدينة نصر، القاهرة)</span>
                    <span className="block font-mono">هاتف المركز: +201098765432</span>
                  </div>
                  <div className="border border-black px-2 py-1 text-center font-black">
                    FRAGILE ⚠️ قابل للكسر
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* Tab 5: Affiliates & Influencers Portal */}
        {activeTab === 'affiliates' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-amber-950/50 via-stone-900 to-stone-950 rounded-2xl border border-amber-800/40">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">بوابة المسوقين بالعمولة والمؤثرين (Influencers & Affiliates)</h3>
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded font-bold">
                    كوبونات تتبع المبيعات
                  </span>
                </div>
                <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
                  أنشئ أكواد خصم حصرية لصناع المحتوى على تيك توك وإنستجرام ومسوقي كنز وتاجر (مثل كود <strong>Dody15</strong>).
                  يحصل العميل على خصم 15%، ويحصل المؤثر على عمولة 15% من كل طلب مكتمل مع تحويل فوري عبر إنستاباي!
                </p>
              </div>

              <button
                onClick={() => setShowAddAffiliate(true)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg transition-transform active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4 text-stone-950" />
                <span>إضافة مؤثر / مسوق جديد</span>
              </button>
            </div>

            {payoutSuccessMsg && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-600/50 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{payoutSuccessMsg}</span>
              </div>
            )}

            {/* Add Affiliate Form Modal */}
            {showAddAffiliate && (
              <form onSubmit={handleAddAffiliate} className="p-4 bg-stone-950 rounded-2xl border border-amber-500/40 space-y-4">
                <h4 className="text-xs font-bold text-amber-400">بيانات المسوق / صانع المحتوى الجديد:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] text-stone-300 mb-1">اسم المؤثر / القناة:</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: ياسمين لايف ستايل"
                      value={newAffiliateName}
                      onChange={(e) => setNewAffiliateName(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-300 mb-1">كود الخصم الترويجي:</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: YASMIN15"
                      value={newAffiliateCode}
                      onChange={(e) => setNewAffiliateCode(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white uppercase font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-300 mb-1">الحساب / القناة:</label>
                    <input
                      type="text"
                      placeholder="تيك توك @yasmin_tech"
                      value={newAffiliateChannel}
                      onChange={(e) => setNewAffiliateChannel(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-300 mb-1">نسبة العمولة للمسوق (%):</label>
                    <input
                      type="number"
                      min={5}
                      max={40}
                      value={newAffiliateCommission}
                      onChange={(e) => setNewAffiliateCommission(Number(e.target.value))}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddAffiliate(false)}
                    className="px-3 py-1.5 bg-stone-800 text-stone-300 rounded-lg text-xs"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-amber-500 text-stone-950 font-bold rounded-lg text-xs"
                  >
                    حفظ وإصدار الكود
                  </button>
                </div>
              </form>
            )}

            {/* Affiliates List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-stone-300">قائمة المؤثرين النشطين وأكوادهم:</h4>
              <div className="border border-stone-800 rounded-xl overflow-hidden bg-stone-950">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-900/90 text-stone-400 border-b border-stone-800">
                    <tr>
                      <th className="p-3">المؤثر / القناة</th>
                      <th className="p-3">كود الخصم</th>
                      <th className="p-3">الزيارات</th>
                      <th className="p-3">الطلبات المكتملة</th>
                      <th className="p-3">إجمالي المبيعات</th>
                      <th className="p-3 text-amber-400">العمولة المستحقة</th>
                      <th className="p-3">العمولات المدفوعة</th>
                      <th className="p-3 text-center">إجراء التحويل</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60 text-stone-200">
                    {affiliates.map((aff) => {
                      const salesFormatted = (aff.totalSalesUSD * currencyConfig.rateFromUSD).toFixed(0);
                      const pendingFormatted = (aff.pendingCommissionUSD * currencyConfig.rateFromUSD).toFixed(0);
                      const paidFormatted = (aff.paidCommissionUSD * currencyConfig.rateFromUSD).toFixed(0);

                      return (
                        <tr key={aff.id} className="hover:bg-stone-900/40 transition-colors">
                          <td className="p-3 font-semibold">
                            <span className="block text-white">{aff.name}</span>
                            <span className="text-[10px] text-stone-400 block">{aff.channel}</span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                                {aff.code}
                              </span>
                              <button
                                onClick={() => handleCopy(`https://naqsh.store/?ref=${aff.code}`, `afflink-${aff.id}`)}
                                className="p-1 hover:text-white text-stone-400 transition-colors"
                                title="نسخ رابط الإحالة الخاص به"
                              >
                                {copiedKey === `afflink-${aff.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </td>
                          <td className="p-3 font-mono text-stone-300">{aff.clicksCount.toLocaleString()}</td>
                          <td className="p-3 font-mono text-emerald-400 font-bold">{aff.ordersCount} طلب</td>
                          <td className="p-3 font-mono font-bold text-white">
                            {salesFormatted} {currencyConfig.symbolAr}
                          </td>
                          <td className="p-3 font-mono font-bold text-amber-400">
                            {pendingFormatted} {currencyConfig.symbolAr}
                          </td>
                          <td className="p-3 font-mono text-stone-400">
                            {paidFormatted} {currencyConfig.symbolAr}
                          </td>
                          <td className="p-3 text-center">
                            {aff.pendingCommissionUSD > 0 ? (
                              <button
                                onClick={() => handlePayAffiliate(aff.id)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-[11px] transition-colors inline-flex items-center gap-1 shadow-sm"
                              >
                                <Send className="w-3 h-3" />
                                <span>تحويل إنستاباي</span>
                              </button>
                            ) : (
                              <span className="text-[11px] text-stone-500 font-medium">تمت التسوية كاملة ✓</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 6: Competitive Launch Roadmap */}
        {activeTab === 'roadmap' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                خارطة طريق إطلاق مشروع نقش | NAQSH واكتساح المنافسين 🚀
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed max-w-3xl">
                هذه هي الـ 5 خطوات الدقيقة لتنفيذ فكرتك على أرض الواقع وتحقيق مبيعات حقيقية من أول أسبوع:
              </p>
            </div>

            <div className="space-y-4">
              
              <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">1</span>
                  <h4 className="text-sm font-bold text-white">الاتفاق مع مطبعة الـ UV في العتبة أو مدينة نصر (بدون شراء ماكينات)</h4>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed pr-8">
                  تواصل مع أحد المطابع المدرجة في دليل الموردين (مثل مطبعة UV-Tech في مدينة نصر أو الفاخرة لليزر في وسط البلد).
                  اتفق على سعر طباعة 30-35 جنيه للكفر الواحد و25 جنيه لختم المحفظة بالذهب، مع تجهيز الطلبات خلال 12-24 ساعة واستلام مندوب بوسطة من مقرهم.
                </p>
              </div>

              <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">2</span>
                  <h4 className="text-sm font-bold text-white">فتح حسابات البائعين على أمازون ونون وكنز</h4>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed pr-8">
                  • على <strong>أمازون مصر</strong>: افتح حساب Amazon Seller Central واختر الشحن عبر Easy Ship (المندوب يمر على المطبعة يستلم الكفر).
                  <br />
                  • على <strong>نون</strong>: سجل في Noon Seller Lab بنظام Direct Ship.
                  <br />
                  • على <strong>كنز وتاجر</strong>: سجل كتاجر مورد (Supplier)، وقم برفع ملف الكتالوج بالأسعار بالجملة وهامش ربح 180 ج.م للمسوق.
                </p>
              </div>

              <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">3</span>
                  <h4 className="text-sm font-bold text-white">تسجيل حساب شركة الشحن (بوسطة Bosta) والدفع عند الاستلام</h4>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed pr-8">
                  افتح حساب بيزنس على Bosta.co وضع عنوان الاستلام الدائم (Pickup Address) ليكون عنوان المطبعة وليس بيتك.
                  فور تأكيد أي طلب في المتجر، اطبع بوليصة الشحن الحرارية مباشرة من زر (طباعة البوليصة A6) ووجه المندوب للاستلام.
                </p>
              </div>

              <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">4</span>
                  <h4 className="text-sm font-bold text-white">إرسال 5 عينات مجانية لإنفلونسرز تيك توك وإنستقرام (Micro-influencers)</h4>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed pr-8">
                  اختر 5 صناع محتوى متابعيهم بين 20 ألف و100 ألف، واصنع كفرات مخصصة بأسماءهم وأسماء شركائهم مع التغليف الملكي (صندوق + كيس مخملي + شريطة ذهبية).
                  فيديو فتح الصندوق (Unboxing ASMR) يجلب آلاف المشاهدات والطلبات المباشرة باستخدام كودهم الخاص (مثل Dody15).
                </p>
              </div>

              <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">5</span>
                  <h4 className="text-sm font-bold text-white">إطلاق الإعلانات الممولة (Meta Advantage+ & TikTok Ads)</h4>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed pr-8">
                  ابدأ بميزانية 15-20 دولار يومياً على إنستقرام وتيك توك تستهدف ملاك هواتف iPhone الحديثة وسامسونج Ultra، مع إبراز ميزة &ldquo;اكتب اسمك بالذهب والتوصيل لباب البيت والمعاينة قبل الدفع&rdquo;.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
