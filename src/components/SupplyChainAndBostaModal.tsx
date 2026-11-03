import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Phone,
  MessageSquare,
  Printer,
  Truck,
  DollarSign,
  Copy,
  Check,
  ExternalLink,
  Plus,
  Layers,
  ArrowRight,
  ShieldCheck,
  Clock,
  Send,
  Sliders,
  Sparkles,
  MapPin,
  Zap,
} from 'lucide-react';
import { Supplier, PrintShop, BostaShipment, Order, Currency } from '../types';
import { SUPPLIERS, PRINT_SHOPS, SAMPLE_BOSTA_SHIPMENTS, NEGOTIATION_SCRIPTS, CURRENCIES } from '../data/products';

interface SupplyChainAndBostaModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  currency: Currency;
}

export const SupplyChainAndBostaModal: React.FC<SupplyChainAndBostaModalProps> = ({
  isOpen,
  onClose,
  orders,
  currency,
}) => {
  if (!isOpen) return null;

  const currencyConfig = CURRENCIES[currency] || CURRENCIES.EGP;
  const [activeTab, setActiveTab] = useState<'suppliers' | 'print_uv' | 'bosta_logistics' | 'finance_payout' | 'proximity_cluster'>('proximity_cluster');
  const [selectedSupCategory, setSelectedSupCategory] = useState<'all' | 'cases_wholesale' | 'leather_tannery' | 'packaging'>('all');
  const [suppliersList, setSuppliersList] = useState<Supplier[]>(SUPPLIERS);
  const [printShopsList, setPrintShopsList] = useState<PrintShop[]>(PRINT_SHOPS);
  const [bostaShipments, setBostaShipments] = useState<BostaShipment[]>(SAMPLE_BOSTA_SHIPMENTS);

  // Copy helper
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Negotiation script modal or section state
  const [activeScript, setActiveScript] = useState<'caseSupplier' | 'printShop' | 'bostaCourier'>('caseSupplier');

  // Print spec generator state
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState<Order>(orders[0] || null);
  const [selectedPrintShop, setSelectedPrintShop] = useState<PrintShop>(PRINT_SHOPS[0]);
  const [generatedSpecNotice, setGeneratedSpecNotice] = useState<string | null>(null);

  // Live Routing Simulation State & Scenarios
  const SIM_SCENARIOS = [
    {
      id: 'scenario-cairo-gold',
      title: 'كفر آيفون 16 برو ماكس - نقش ذهبي "عمر" (القاهرة - التجمع)',
      productName: 'جراب جلد ملكي مخصص بالاسم وذهب 24k ملموس',
      model: 'iPhone 16 Pro Max (MagSafe)',
      customText: 'عمر الفاروق',
      foil: 'ذهب ياقوتي ثلاثي الأبعاد بارز',
      priceEGP: 229,
      deliveryFeeEGP: 45,
      customerName: 'د. عمر الفاروق',
      customerPhone: '01012345678',
      customerAddress: 'التجمع الخامس، الحي الأول، فيلا 14، القاهرة',
      cluster: 'وسط البلد والعتبة (800م)',
      supplierName: 'سنتر الرواد للجملة (باب اللوق)',
      supplierLocation: 'مول البستان التجاري - باب اللوق (800م من المطبعة)',
      blankSku: 'BLK-MAG-IP16PM-CLR-DE',
      blankCostEGP: 22,
      printShopName: 'ورشة نقش الليزر الملكية ومطبعة الفارس UV',
      printShopLocation: 'شارع شريف وتقاطع رشدي، وسط البلد',
      printMachine: 'Mimaki UJF-6042 MkII e Digital UV (اليابان)',
      printSpecFile: 'NQSH_8842_IPHONE16PM_GOLD_RELIEF.tiff',
      printCostEGP: 20,
      packagingCostEGP: 8,
      packagingType: 'علبة هارد بوكس مغناطيسية + ختم شمعي + كارت ضمان + استيكرات',
      trackingNumber: 'BOSTA-EG-8842910',
    },
    {
      id: 'scenario-alex-anime',
      title: 'كفر سامسونج S24 Ultra - أنمي ياباني UV بارز (الإسكندرية - سموحة)',
      productName: 'كفر أنمي إكستريم بنقش بارز ملموس 3D',
      model: 'Samsung Galaxy S24 Ultra',
      customText: 'Luffy Gear 5 - الإمبراطور',
      foil: 'طباعة UV ألوان حية + ورنيش مطفي ضد البصمات',
      priceEGP: 219,
      deliveryFeeEGP: 55,
      customerName: 'م. مروان الشريف',
      customerPhone: '01234567890',
      customerAddress: 'شارع فوزي معاذ، سموحة، الإسكندرية',
      cluster: 'مدينة نصر ومكرم عبيد (300م)',
      supplierName: 'الصفا والمروة لإكسسوارات المحمول (العتبة)',
      supplierLocation: 'الرويعي - العتبة (مخزن مركزي مع تسليم مشترك)',
      blankSku: 'BLK-S24U-MATTE-BLACK',
      blankCostEGP: 22,
      printShopName: 'مركز UV-Tech المتطور للطباعة الرقمية',
      printShopLocation: 'شارع مكرم عبيد، مدينة نصر (300م من فرع بوسطة)',
      printMachine: 'Roland VersaUV LEF2-300 (اليابان 1440 DPI)',
      printSpecFile: 'NQSH_9912_S24U_ANIME_RELIEF.tiff',
      printCostEGP: 20,
      packagingCostEGP: 8,
      packagingType: 'علبة هارد بوكس سلايدر + كيس مخملي + استيكرات أنمي مجانية',
      trackingNumber: 'BOSTA-EG-7731902',
    },
    {
      id: 'scenario-giza-wallet',
      title: 'محفظة جلد بقري طبيعي فاخر - حفر اسم بالليزر (الجيزة - الدقي)',
      productName: 'محفظة كروت ونقود جلد طبيعي فاخر بختم مونوغرام',
      model: 'محفظة بطاقات جلد طبيعي مينيمال مع درع RFID',
      customText: 'H. El-Shennawy',
      foil: 'نحت ليزر حراري عميق ملموس (Deep Engraving)',
      priceEGP: 369,
      deliveryFeeEGP: 45,
      customerName: 'أ. حازم الشناوي',
      customerPhone: '01123456789',
      customerAddress: 'شارع مصدق، الدقي، الجيزة',
      cluster: 'وسط البلد والروبيكي',
      supplierName: 'مدابغ مصر الحديثة ومصنع الأهرام للجلود',
      supplierLocation: 'مدينة الروبيكي للجلود ووسط البلد',
      blankSku: 'WLT-SLIM-RFID-BRN-GEN',
      blankCostEGP: 85,
      printShopName: 'ورشة نقش الليزر الملكية (شارع شريف)',
      printShopLocation: 'شارع شريف، وسط البلد',
      printMachine: 'Fiber Laser Deep Engraver 50W',
      printSpecFile: 'NQSH_7721_WALLET_LEATHER_ENGRAVE.dxf',
      printCostEGP: 25,
      packagingCostEGP: 12,
      packagingType: 'صندوق خشبي فاخر محفور + كيس قطيفة ملكي + زيت تلميع جلد',
      trackingNumber: 'BOSTA-EG-6612984',
    },
  ];

  const [activeSimScenarioId, setActiveSimScenarioId] = useState<string>('scenario-cairo-gold');
  const [simStep, setSimStep] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // Live GPS Tracking Radar Modal & Scanner State
  const [isRadarModalOpen, setIsRadarModalOpen] = useState<boolean>(false);
  const [scannedTrackingNumber, setScannedTrackingNumber] = useState<string>('BOSTA-EG-8842910');
  const [radarLaserScanning, setRadarLaserScanning] = useState<boolean>(false);

  const handleOpenRadarForTracking = (trackingNum: string) => {
    setScannedTrackingNumber(trackingNum);
    setIsRadarModalOpen(true);
    setRadarLaserScanning(true);
    setTimeout(() => setRadarLaserScanning(false), 1400);
  };

  const currentScenario = SIM_SCENARIOS.find((s) => s.id === activeSimScenarioId) || SIM_SCENARIOS[0];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899'],
      });
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    let timer: any;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setSimStep((prev) => {
          if (prev >= 5) {
            setIsAutoPlaying(false);
            triggerConfetti();
            return 5;
          }
          const next = prev + 1;
          if (next === 5) triggerConfetti();
          return next;
        });
      }, 2600);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const ROUTING_STEPS = [
    {
      step: 1,
      icon: '🛒',
      shortTitle: 'استلام الأوردر',
      duration: '00:00:02 ث',
      fullTitle: 'استلام الطلب وتوليد الباركود وتجهيز الداتا الفنية',
      description: 'تلقي تفاصيل تخصيص العميل وتأكيد رقم الموبايل وتجهيز باركود الصنف الآلي.',
      responsibleParty: 'نظام متجر نقش المؤتمت (Cloud Server)',
      timeOffset: 'T + 00:00:02 ثانية',
      geoCoords: 'سيرفرات سحابية - فوري',
      locationText: 'المتجر الإلكتروني -> قاعدة البيانات المشفرة -> التحقق من صحة رقم الموبايل المصري',
      internalDistance: '0 متر (فوري بالثانية عبر الإنترنت)',
      payloadType: 'JSON Order Spec & Vector Code',
      payloadSnippet: `{"orderId":"${currentScenario.trackingNumber}","customer":"${currentScenario.customerName}","phone":"${currentScenario.customerPhone}","model":"${currentScenario.model}","text":"${currentScenario.customText}","payment":"COD_${currentScenario.priceEGP + currentScenario.deliveryFeeEGP}_EGP"}`,
      costPhase: 'صفر تكلفة إضافية',
      accumulatedCost: '0.00 ج.م',
      actionTip: 'تم توليد رقم الباركود وتأكيد صلاحية عنوان العميل بالذكاء الاصطناعي بنجاح.',
    },
    {
      step: 2,
      icon: '📦',
      shortTitle: 'تأكيد البلانك الخام',
      duration: '00:05:00 د',
      fullTitle: 'حجز وسحب الكفر الخام من مورد الجملة الأقرب',
      description: `تأكيد توفر موديل ${currentScenario.model} في رف سنتر الرواد أو الصفا والمروة وسحبه مباشرة.`,
      responsibleParty: currentScenario.supplierName,
      timeOffset: 'T + 00:05:00 دقيقة',
      geoCoords: currentScenario.cluster,
      locationText: currentScenario.supplierLocation,
      internalDistance: '800 متر فقط من المطبعة (أو موجود بالرف المشترك)',
      payloadType: 'Warehouse Stock Ticket (SKU)',
      payloadSnippet: `{"supplier":"${currentScenario.supplierName}","blankSku":"${currentScenario.blankSku}","qty":1,"wholesaleCostEGP":${currentScenario.blankCostEGP},"status":"PICKED_FOR_PRINT"}`,
      costPhase: 'حجز البلانك الخام',
      accumulatedCost: `${currentScenario.blankCostEGP}.00 ج.م`,
      actionTip: 'البلانك سليم 100% ومطابق لمقاسات زر الـ Camera Control في آيفون 16.',
    },
    {
      step: 3,
      icon: '🖨️',
      shortTitle: 'طباعة الـ UV باليابان',
      duration: '00:15:00 د',
      fullTitle: 'الطباعة الرقمية بماكينة Mimaki UV اليابانية والورنيش البارز',
      description: 'تنفيذ طبقة الحبر الأبيض الأساس، ألوان 1440 DPI، وطبقة الورنيش الشفاف المجففة بالـ LED فورياً.',
      responsibleParty: currentScenario.printShopName,
      timeOffset: 'T + 00:15:00 دقيقة',
      geoCoords: currentScenario.printShopLocation,
      locationText: `${currentScenario.printShopName} - ${currentScenario.printShopLocation}`,
      internalDistance: '0 متر (داخل غرفة الطباعة والتشغيل)',
      payloadType: 'TIFF CMYK + White + 3D Varnish File',
      payloadSnippet: `{"machine":"${currentScenario.printMachine}","jobTicket":"${currentScenario.printSpecFile}","reliefHeight":"0.8mm","inkStandard":"ECO-UV Japan","costEGP":${currentScenario.printCostEGP}}`,
      costPhase: 'تكلفة الطباعة والورنيش',
      accumulatedCost: `${currentScenario.blankCostEGP + currentScenario.printCostEGP}.00 ج.م`,
      actionTip: 'خرج الجراب من الماكينة جاف تماماً ومقاوم للماء والكحول والخدوش بمفتاح حاد.',
    },
    {
      step: 4,
      icon: '🎁',
      shortTitle: 'التغليف وبوسطة A6',
      duration: '00:25:00 د',
      fullTitle: 'التغليف الفاخر الشبيه بالهدايا ولصق بوليصة بوسطة الحرارية',
      description: 'وضع الجراب بالعلبة الصلبة والختم الشمعي واستيكرات البونص مع بوليصة بوسطة A6 باركود.',
      responsibleParty: 'فريق التغليف بالمطبعة (White-Label Packaging)',
      timeOffset: 'T + 00:25:00 دقيقة',
      geoCoords: 'غرفة التجهيز والتغليف بالمطبعة',
      locationText: `${currentScenario.packagingType} -> كيس بوسطة البوليمر المؤمن ضد الفتح`,
      internalDistance: '0 متر (المطبعة جهزت الطرد مباشرة)',
      payloadType: 'Bosta Shipping Label A6 (AWB Code128)',
      payloadSnippet: `{"carrier":"BOSTA_EXPRESS","tracking":"${currentScenario.trackingNumber}","pickupHub":"Makram Ebeid Hub","codAmount":${currentScenario.priceEGP + currentScenario.deliveryFeeEGP},"weight":"0.25kg"}`,
      costPhase: 'تكلفة التغليف والإهداء',
      accumulatedCost: `${currentScenario.blankCostEGP + currentScenario.printCostEGP + currentScenario.packagingCostEGP}.00 ج.م`,
      actionTip: 'الطرد محكم وموضوع في صندوق بوسطة اليومي لاستلام المندوب الساعة 5:00 مساءً.',
    },
    {
      step: 5,
      icon: '💰',
      shortTitle: 'التحصيل والأرباح',
      duration: 'خلال 24-48 ساعة',
      fullTitle: 'تسليم كابتن بوسطة للعميل وإيداع الأرباح الصافية في حسابك',
      description: 'استلام العميل الكفر وتسديد الكاش (COD)، وإيداع صافي أرباحك فوراً في دورة التحويل.',
      responsibleParty: 'شركة بوسطة للشحن ومحفظتك البنكية / فودافون كاش',
      timeOffset: 'T + 24:00:00 ساعة (تسليم بنجاح)',
      geoCoords: currentScenario.customerAddress,
      locationText: `عنوان العميل: ${currentScenario.customerAddress} | المستلم: ${currentScenario.customerName}`,
      internalDistance: 'توصيل مباشر لباب العميل في أي محافظة بمصر',
      payloadType: 'Payout Disbursement Receipt',
      payloadSnippet: `{"totalCollected":${currentScenario.priceEGP + currentScenario.deliveryFeeEGP},"courierFee":${currentScenario.deliveryFeeEGP},"productCost":50,"netProfitDisbursed":${currentScenario.priceEGP - 50},"channel":"Vodafone Cash / CIB Bank"}`,
      costPhase: 'الأرباح الصافية المحققة',
      accumulatedCost: `50.00 ج.م تكلفة إنتاج شاملة`,
      actionTip: `مبروك! تم تحصيل ${currentScenario.priceEGP + currentScenario.deliveryFeeEGP} ج.م وإيداع +${currentScenario.priceEGP - 50} ج.م أرباح صافية في جيبك بنسبة 78%!`,
    },
  ];

  const currentStepData = ROUTING_STEPS[simStep - 1] || ROUTING_STEPS[0];

  // New Supplier Form
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [newSupName, setNewSupName] = useState('');
  const [newSupPhone, setNewSupPhone] = useState('');
  const [newSupLocation, setNewSupLocation] = useState('');
  const [newSupPrice, setNewSupPrice] = useState(25);
  const [newSupCategory, setNewSupCategory] = useState<'cases_wholesale' | 'leather_tannery' | 'packaging'>('cases_wholesale');

  // Bosta Pickup Request Simulation
  const [requestingPickup, setRequestingPickup] = useState(false);
  const [pickupSuccessAlert, setPickupSuccessAlert] = useState<string | null>(null);

  // Realistic Market-Driven Profit Calculator State (229 EGP Retail vs 50 EGP Total Cost)
  const [calcRetailPrice, setCalcRetailPrice] = useState(229); // EGP (سعر منافس ومغري للمستهلك المصري)
  const [calcBlankCost, setCalcBlankCost] = useState(22); // EGP (كفر سادة من العتبة)
  const [calcUvPrintCost, setCalcUvPrintCost] = useState(20); // EGP (طباعة UV بالاتفاق)
  const [calcPackagingCost, setCalcPackagingCost] = useState(8); // EGP (علبة شيك وكيس مخملي)
  const [calcBostaDeliveryFee, setCalcBostaDeliveryFee] = useState(45); // EGP

  const totalCost = calcBlankCost + calcUvPrintCost + calcPackagingCost + calcBostaDeliveryFee;
  const netProfit = calcRetailPrice - totalCost;
  const profitMarginPercent = Math.round((netProfit / calcRetailPrice) * 100);

  const handleAddSupplierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSupName || !newSupPhone) return;
    const newSup: Supplier = {
      id: `sup-${Date.now()}`,
      nameAr: newSupName,
      category: newSupCategory,
      phone: newSupPhone,
      whatsapp: newSupPhone.replace(/[^0-9]/g, ''),
      location: newSupLocation || 'القاهرة',
      minOrderQty: 10,
      wholesalePriceEGP: Number(newSupPrice),
      rating: 5.0,
      notes: 'تمت إضافته بواسطة صاحب المتجر',
      contactPerson: 'مسؤول المبيعات',
    };
    setSuppliersList([newSup, ...suppliersList]);
    setShowAddSupplier(false);
    setNewSupName('');
    setNewSupPhone('');
  };

  const handleRequestBostaPickup = (order: Order) => {
    setRequestingPickup(true);
    setTimeout(() => {
      const newShipment: BostaShipment = {
        orderId: order.id,
        orderNumber: order.orderNumber,
        bostaTrackingNumber: `BOSTA-EG-${Math.floor(1000000 + Math.random() * 9000000)}`,
        pickupAddress: `${selectedPrintShop.nameAr} (${selectedPrintShop.location})`,
        dropoffAddress: `${order.address.city} - ${order.address.street}`,
        codAmountEGP: Math.round(order.total * 31),
        deliveryFeeEGP: 50,
        status: 'pickup_requested',
        estimatedDeliveryDate: 'خلال 48 ساعة لباب العميل',
        payoutBatchDate: 'الأربعاء القادم في دورة تحويل بوسطة',
      };
      setBostaShipments([newShipment, ...bostaShipments]);
      setRequestingPickup(false);
      setPickupSuccessAlert(`تم طلب مندوب بوسطة لاستلام الأوردر ${order.orderNumber} من مقر المطبعة مباشرة برقم بوليصة ${newShipment.bostaTrackingNumber}`);
      setTimeout(() => setPickupSuccessAlert(null), 4000);
    }, 800);
  };

  const handleSendToPrintShopWhatsApp = () => {
    if (!selectedOrderForPrint) return;
    const item = selectedOrderForPrint.items[0];
    const phone = item?.customization?.phoneModelId || 'آيفون';
    const textToPrint = item?.customization?.customText || 'نقش مخصص';
    const font = item?.customization?.fontStyle || 'ديواني';

    const msg = `أمر طباعة وتشغيل UV جديد - براند نقش | NAQSH:
رقم الطلب: ${selectedOrderForPrint.orderNumber}
المنتج: ${item.product.nameAr}
موديل الهاتف: ${phone}
النص المطلوب طباعته/نقشه: "${textToPrint}"
نوع الخط: ${font}
المواصفات: طبقة حبر أبيض + ألوان 1200 DPI + ورنيش بارز 3D
بوليصة الشحن بوسطة: ${selectedOrderForPrint.trackingNumber}
يرجى التغليف الفاخر White-Label وتجهيز الطرد لاستلام مندوب بوسطة اليوم.`;

    const cleanPhone = selectedPrintShop.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-auto text-stone-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 bg-stone-950/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-emerald-500 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center text-amber-400 font-bold">
                <Layers className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  مركز سلاسل التوريد، مطابع الـ UV، وربط بوسطة وتحصيل الأموال
                </h2>
                <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/80 font-mono">
                  SUPPLY CHAIN & BOSTA HUB
                </span>
              </div>
              <p className="text-xs text-stone-400">
                دليل التواصل مع موردي الجملة، إرسال أوامر الطباعة UV، استدعاء مندوب بوسطة، وحساب دورة تحويل الأرباح
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-2.5 bg-stone-950/70 border-b border-stone-800 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('suppliers')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'suppliers' ? 'bg-amber-500 text-stone-950 font-bold shadow-sm' : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>1. موردي الجملة والتفاوض ({suppliersList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('print_uv')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'print_uv' ? 'bg-amber-500 text-stone-950 font-bold shadow-sm' : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>2. ربط مطابع الـ UV وتوليد ملفات النحت</span>
          </button>

          <button
            onClick={() => setActiveTab('bosta_logistics')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'bosta_logistics' ? 'bg-amber-500 text-stone-950 font-bold shadow-sm' : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>3. ربط تطبيق بوسطة (Bosta Logistics)</span>
          </button>

          <button
            onClick={() => setActiveTab('finance_payout')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'finance_payout' ? 'bg-amber-500 text-stone-950 font-bold shadow-sm' : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>4. دراسة التكلفة الحقيقية (50 ج.م)</span>
          </button>

          <button
            onClick={() => setActiveTab('proximity_cluster')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'proximity_cluster' ? 'bg-emerald-500 text-stone-950 font-bold shadow-sm' : 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/60 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>5. خريطة الأماكن الأقرب واختبار التنسيق الفوري 📍</span>
          </button>
        </div>

        {/* Global Feedback Alert */}
        {pickupSuccessAlert && (
          <div className="mx-6 mt-4 p-3 bg-emerald-950/70 border border-emerald-700/60 rounded-xl text-emerald-200 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{pickupSuccessAlert}</span>
          </div>
        )}

        {/* Tab 1: Wholesale Suppliers Directory & Negotiation */}
        {activeTab === 'suppliers' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Top Info Banner with Negotiation Script Trigger */}
            <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>دليل مصانع ومستوردي كفرات الهواتف والجلود الطبيعية المعتمدين</span>
                </h3>
                <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
                  تواصل معهم أولاً للاتفاق على سعر الجملة، واطلب توريد كمية تجريبية (10-20 قطعة سادة) يتم تسليمها مباشرة للمطبعة للبدء دون الحاجة لمخزن لديك.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowAddSupplier(!showAddSupplier)}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg border border-stone-700 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showAddSupplier ? 'إغلاق النموذج' : 'إضافة مورد جديد'}</span>
                </button>
              </div>
            </div>

            {/* Negotiation Scripts Accordion / Preview */}
            <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400">قالب رسالة التفاوض والاتفاق على سعر الجملة:</span>
                  <span className="text-[10px] text-stone-400">(انسخها وتواصل معه على الواتساب)</span>
                </div>
                <button
                  onClick={() => handleCopy(NEGOTIATION_SCRIPTS.caseSupplier, 'sup-script')}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                >
                  {copiedKey === 'sup-script' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'sup-script' ? 'تم نسخ الرسالة!' : 'نسخ الرسالة بنقرة واحدة'}</span>
                </button>
              </div>

              <pre className="text-xs text-stone-300 font-sans whitespace-pre-wrap bg-stone-950 p-3 rounded-lg border border-stone-800 leading-relaxed">
                {NEGOTIATION_SCRIPTS.caseSupplier}
              </pre>
            </div>

            {/* Add Supplier Form */}
            {showAddSupplier && (
              <form onSubmit={handleAddSupplierSubmit} className="p-4 bg-stone-950 rounded-xl border border-amber-500/40 space-y-4">
                <h4 className="text-xs font-bold text-amber-400">إضافة مورد جديد لدليلك الخاص:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-300 mb-1">اسم المورد أو الشركة *</label>
                    <input
                      type="text"
                      required
                      value={newSupName}
                      onChange={(e) => setNewSupName(e.target.value)}
                      placeholder="مثال: شركة الأهرام لإكسسوارات المحمول"
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 mb-1">رقم الهاتف / الواتساب *</label>
                    <input
                      type="text"
                      required
                      value={newSupPhone}
                      onChange={(e) => setNewSupPhone(e.target.value)}
                      placeholder="+201012345678"
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 mb-1">متوسط سعر الجملة للقطعة (ج.م)</label>
                    <input
                      type="number"
                      value={newSupPrice}
                      onChange={(e) => setNewSupPrice(Number(e.target.value))}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs"
                  >
                    حفظ المورد في القائمة
                  </button>
                </div>
              </form>
            )}

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-stone-400 font-semibold shrink-0">تصنيف الموردين:</span>
              <button
                onClick={() => setSelectedSupCategory('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
                  selectedSupCategory === 'all'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-800 text-stone-300 hover:text-white'
                }`}
              >
                الكل ({suppliersList.length})
              </button>
              <button
                onClick={() => setSelectedSupCategory('cases_wholesale')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
                  selectedSupCategory === 'cases_wholesale'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-800 text-stone-300 hover:text-white'
                }`}
              >
                كفرات وجرابات سادة ({suppliersList.filter((s) => s.category === 'cases_wholesale').length})
              </button>
              <button
                onClick={() => setSelectedSupCategory('leather_tannery')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
                  selectedSupCategory === 'leather_tannery'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-800 text-stone-300 hover:text-white'
                }`}
              >
                مدابغ وجلود طبيعية ({suppliersList.filter((s) => s.category === 'leather_tannery').length})
              </button>
              <button
                onClick={() => setSelectedSupCategory('packaging')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
                  selectedSupCategory === 'packaging'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-800 text-stone-300 hover:text-white'
                }`}
              >
                علب وتغليف هدايا ({suppliersList.filter((s) => s.category === 'packaging').length})
              </button>
            </div>

            {/* Suppliers Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suppliersList
                .filter((sup) => selectedSupCategory === 'all' || sup.category === selectedSupCategory)
                .map((sup) => (
                  <div
                    key={sup.id}
                    className="p-5 bg-stone-950/80 rounded-2xl border border-stone-800 space-y-3 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{sup.nameAr}</h4>
                          <span className="text-[10px] text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800">
                            {sup.category === 'cases_wholesale'
                              ? 'جرابات سادة'
                              : sup.category === 'leather_tannery'
                              ? 'دباغة جلود'
                              : 'تغليف هدايا'}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 mt-1">
                          المسؤول: <strong className="text-stone-300">{sup.contactPerson}</strong> · الموقع: {sup.location}
                        </p>
                      </div>

                      <div className="text-left shrink-0">
                        <span className="text-xs text-stone-400 block">سعر الجملة:</span>
                        <span className="text-base font-bold text-emerald-400 tabular-nums">
                          ~{sup.wholesalePriceEGP} ج.م
                        </span>
                        <span className="text-[10px] text-stone-500 block">أقل كمية: {sup.minOrderQty} قطع</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-300 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/80 leading-relaxed">
                      {sup.notes}
                    </p>

                    <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-2">
                      <a
                        href={`tel:${sup.phone}`}
                        className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-mono inline-flex items-center gap-1.5 border border-stone-700 transition-colors"
                        title="اتصال هاتفي مباشر"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>{sup.phone}</span>
                      </a>
                      <a
                        href={`https://wa.me/${sup.whatsapp}?text=${encodeURIComponent(
                          NEGOTIATION_SCRIPTS.caseSupplier.replace('[اسم المورد]', sup.contactPerson)
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>محادثة واتساب</span>
                      </a>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        )}

        {/* Tab 2: UV Print & Laser Machines Bridge */}
        {activeTab === 'print_uv' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-amber-500" />
                <span>ربط ماكينات الـ UV المسطحة والحفر بالليزر (UV Curable Print & Laser Bridge)</span>
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                تقنية الطباعة الـ UV تعتمد على رش حبر هجين معالج بالأشعة فوق البنفسجية في 3 طبقات: (1) طبقة بيضاء للألوان الداكنة، (2) ألوان CMYK بدقة 1200 DPI، (3) ورنيش ملمسي بارز (Gloss) يعطي لمسة النحت الفاخر.
              </p>
            </div>

            {/* Split View: Print Shop Selector + Live UV Spec File Generator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left: Partner Print Shops List */}
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-bold text-stone-300 block">اختر المطبعة الشريكة لتوجيه الأوامر:</span>
                {printShopsList.map((ps) => {
                  const isSelected = selectedPrintShop.id === ps.id;
                  return (
                    <div
                      key={ps.id}
                      onClick={() => setSelectedPrintShop(ps)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-stone-800/90 shadow-md ring-1 ring-amber-500/30'
                          : 'border-stone-800 bg-stone-950/70 hover:bg-stone-800/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-xs font-bold text-white">{ps.nameAr}</h4>
                        <span className="text-xs font-bold text-amber-400 tabular-nums">
                          {ps.costPerPrintEGP} ج.م / قطعة
                        </span>
                      </div>

                      <p className="text-[11px] text-stone-400 mb-2">{ps.machineType}</p>
                      <p className="text-[11px] text-stone-400 mb-2">📍 {ps.location}</p>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {ps.supportedLayers.map((layer, idx) => (
                          <span key={idx} className="text-[10px] bg-stone-900 text-stone-300 px-1.5 py-0.5 rounded border border-stone-700">
                            {layer}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-2">
                        <a
                          href={`tel:${ps.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] text-stone-300 hover:text-white flex items-center gap-1 font-mono bg-stone-900 px-2 py-1 rounded border border-stone-700/80"
                        >
                          <Phone className="w-3 h-3 text-amber-400" />
                          <span>{ps.phone}</span>
                        </a>
                        <a
                          href={`https://wa.me/${ps.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            NEGOTIATION_SCRIPTS.printShop
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-800/60"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>واتساب المطبعة</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: Automated UV Print Spec Sheet Generator */}
              <div className="lg:col-span-7 bg-stone-950 rounded-xl border border-stone-800 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-xs font-bold text-amber-400 block">مولد ملف أمر تشغيل الـ UV الفوري:</span>
                    <span className="text-[11px] text-stone-400">ملف جاهز لماكينة الطباعة بدقة 1200 DPI</span>
                  </div>

                  {/* Order Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-400">الطلب:</span>
                    <select
                      value={selectedOrderForPrint?.id}
                      onChange={(e) => {
                        const ord = orders.find((o) => o.id === e.target.value);
                        if (ord) setSelectedOrderForPrint(ord);
                      }}
                      className="bg-stone-800 border border-stone-700 rounded-lg px-2 py-1 text-xs text-white"
                    >
                      {orders.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.orderNumber} ({o.customerName})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {selectedOrderForPrint && (
                  <div className="space-y-3 text-xs bg-stone-900/70 p-4 rounded-xl border border-stone-800">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-stone-400 block">المنتج:</span>
                        <strong className="text-white">{selectedOrderForPrint.items[0]?.product.nameAr}</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block">طراز الهاتف أو المحفظة:</span>
                        <strong className="text-amber-400">
                          {selectedOrderForPrint.items[0]?.customization?.phoneModelId || 'iPhone 16 Pro Max'}
                        </strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block">النص المنقوش:</span>
                        <strong className="text-white font-mono bg-black/60 px-2 py-0.5 rounded">
                          {selectedOrderForPrint.items[0]?.customization?.customText || 'محمد الخالد'}
                        </strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block">نوع الخط والرقائق:</span>
                        <strong className="text-stone-200">
                          {selectedOrderForPrint.items[0]?.customization?.fontStyle || 'ديواني'} · {selectedOrderForPrint.items[0]?.customization?.foilType || 'ذهب ميتاليك'}
                        </strong>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                      <span>المطبعة المستلمة: <strong className="text-white">{selectedPrintShop.nameAr}</strong></span>
                      <span>وقت التسليم المتوقع: <strong>{selectedPrintShop.turnaroundHours} ساعة</strong></span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={handleSendToPrintShopWhatsApp}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>إرسال أمر النحت والطباعة لواتساب المطبعة فوراً</span>
                  </button>

                  <button
                    onClick={() => {
                      setGeneratedSpecNotice('تم تنزيل ملف أبعاد ماكينة الـ UV (Vector PDF & White Separation Sheet) بنجاح.');
                      setTimeout(() => setGeneratedSpecNotice(null), 3000);
                    }}
                    className="py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold border border-stone-700 transition-colors"
                  >
                    تصدير ملف Vector UV
                  </button>
                </div>

                {generatedSpecNotice && (
                  <p className="text-xs text-emerald-400 bg-emerald-950/40 p-2 rounded-lg border border-emerald-800">
                    {generatedSpecNotice}
                  </p>
                )}
              </div>

            </div>

          </div>
        )}

        {/* Tab 3: Bosta Logistics Integration */}
        {activeTab === 'bosta_logistics' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Explainer: How Bosta works seamlessly with the Print Shop */}
            <div className="p-4 bg-gradient-to-r from-red-950/40 via-stone-950 to-stone-950 rounded-2xl border border-red-900/50 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center">B</span>
                <h3 className="text-sm font-bold text-white">
                  كيف يعمل الربط مع تطبيق بوسطة (Bosta Express) دون أن تلمس المنتج بيدك؟
                </h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed max-w-3xl">
                1. تسجل حساب تاجر في بوسطة وتحدد عنوان الاستلام ليكون <strong>مقر المطبعة في مدينة نصر</strong>.
                <br />
                2. فور الانتهاء من طباعة الكفر وتغليفه بالعلبة الفاخرة، يضغط النظام على استدعاء مندوب بوسطة وطباعة البوليصة (AWB).
                <br />
                3. مندوب بوسطة يمر على المطبعة يستلم الأوردرات يومياً، ويوصلها لباب العميل، ويحصل قيمة الدفع عند الاستلام (COD).
                <br />
                4. بوسطة تخصم رسوم الشحن (45 - 55 ج.م) وتحول لك باقي أرباحك الصافية على حسابك البنكي أو محفظتك أسبوعياً!
              </p>
            </div>

            {/* Bosta Dispatch Action & Live Waybills */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-stone-200">
                  شحنات وبوالص بوسطة الصادرة (Bosta Air Waybills):
                </h4>

                {orders[0] && (
                  <button
                    onClick={() => handleRequestBostaPickup(orders[0])}
                    disabled={requestingPickup}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md disabled:opacity-50"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>{requestingPickup ? 'جاري الاتصال بـ API بوسطة...' : `استدعاء مندوب بوسطة للمطبعة لطلب ${orders[0].orderNumber}`}</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bostaShipments.map((shipment, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">{shipment.orderNumber}</span>
                          <span className="text-xs font-mono font-bold text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-800/80">
                            {shipment.bostaTrackingNumber}
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-400 mt-1 block">
                          مكان الاستلام: <strong className="text-stone-300">{shipment.pickupAddress}</strong>
                        </span>
                      </div>

                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold border ${
                        shipment.status === 'delivered' ? 'text-emerald-400 bg-emerald-950/50 border-emerald-800' : 'text-blue-400 bg-blue-950/50 border-blue-800'
                      }`}>
                        {shipment.status === 'delivered' ? 'تم التسليم والتحصيل' : 'في الطريق مع المندوب'}
                      </span>
                    </div>

                    <div className="bg-stone-900/60 p-2.5 rounded-lg border border-stone-800/80 text-xs space-y-1">
                      <p className="text-stone-300">التوصيل إلى: <strong>{shipment.dropoffAddress}</strong></p>
                      <div className="flex items-center justify-between text-stone-400 pt-1 border-t border-stone-800">
                        <span>المبلغ المحصل كاش (COD): <strong className="text-white tabular-nums">{shipment.codAmountEGP} ج.م</strong></span>
                        <span>شحن بوسطة: <strong className="text-red-400 tabular-nums">-{shipment.deliveryFeeEGP} ج.م</strong></span>
                      </div>
                    </div>

                    <div className="text-[11px] text-stone-500 flex items-center justify-between pt-1">
                      <span>{shipment.payoutBatchDate}</span>
                      <a
                        href={`https://bosta.co/tracking-shipment?shipmentId=${shipment.bostaTrackingNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
                      >
                        <span>تتبع الشحنة في بوسطة</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top 4 Egyptian Courier Companies Comparison for E-Commerce */}
            <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Truck className="w-4 h-4 text-red-500" />
                    <span>مقارنة أفضل 4 شركات شحن تجارة إلكترونية ودفع عند الاستلام (COD) في مصر:</span>
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    جميع هذه الشركات تدعم استلام الطرود يومياً من مقر المطبعة مباشرة وتحويل أموال الكاش لحسابك
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {/* Bosta */}
                <div className="p-3.5 bg-stone-900 rounded-xl border border-red-800/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-white font-bold text-sm">1. بوسطة (Bosta)</strong>
                    <span className="text-[10px] bg-red-950 text-red-300 px-1.5 py-0.5 rounded border border-red-800">الأكثر انتشاراً</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    متوسط الشحن: <strong>45 - 60 ج.م</strong>
                    <br />
                    سرعة التسليم: 24 - 48 ساعة
                    <br />
                    تحويل الكاش: أسبوعياً كل أربعاء
                    <br />
                    نسبة النجاح: <strong className="text-emerald-400">93%</strong>
                  </p>
                  <a
                    href="https://bosta.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>فتح حساب تاجر بوسطة</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Mylerz */}
                <div className="p-3.5 bg-stone-900 rounded-xl border border-amber-800/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-white font-bold text-sm">2. مايلرز (Mylerz)</strong>
                    <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800">أسرع تسليم</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    متوسط الشحن: <strong>48 - 65 ج.م</strong>
                    <br />
                    سرعة التسليم: نفس اليوم أو 24 ساعة
                    <br />
                    تحويل الكاش: مرتين أسبوعياً (أحد وأربعاء)
                    <br />
                    نسبة النجاح: <strong className="text-emerald-400">94.5%</strong>
                  </p>
                  <a
                    href="https://mylerz.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 bg-amber-600/30 hover:bg-amber-600 text-amber-200 hover:text-stone-950 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>فتح حساب تاجر مايلرز</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* J&T Express */}
                <div className="p-3.5 bg-stone-900 rounded-xl border border-red-800/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-white font-bold text-sm">3. J&T Express</strong>
                    <span className="text-[10px] bg-red-950 text-red-300 px-1.5 py-0.5 rounded border border-red-800">أوفر للأقاليم</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    متوسط الشحن: <strong>38 - 50 ج.م</strong>
                    <br />
                    سرعة التسليم: 24 - 72 ساعة
                    <br />
                    تحويل الكاش: أسبوعياً
                    <br />
                    تغطية: <strong className="text-emerald-400">جميع قرى ونجوع الصعيد</strong>
                  </p>
                  <a
                    href="https://jtexpress.com.eg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>موقع J&T مصر</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Shipblu */}
                <div className="p-3.5 bg-stone-900 rounded-xl border border-blue-800/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-white font-bold text-sm">4. شيب بلو (Shipblu)</strong>
                    <span className="text-[10px] bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded border border-blue-800">معاينة قبل الدفع</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    متوسط الشحن: <strong>48 - 60 ج.م</strong>
                    <br />
                    سرعة التسليم: 24 - 48 ساعة
                    <br />
                    الميزة الكبرى: <strong>معاينة العميل وتجربة الكفر</strong>
                    <br />
                    تحويل الكاش: لحظي عبر إنستاباي
                  </p>
                  <a
                    href="https://shipblu.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>موقع Shipblu</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 4: Cash Flow & Payout Settlement Calculator */}
        {activeTab === 'finance_payout' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>حاسبة التدفق المالي ودورة تأكيد الدفع وتحويل الأرباح (Cash Settlement)</span>
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                اعرف أرباحك الصافية بدقة عن كل قطعة تباع عبر المتجر بعد خصم سعر الكفر السادة، وتكلفة طباعة الـ UV، ومصاريف شحن بوسطة:
              </p>
            </div>

            {/* Interactive Calculator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Sliders & Inputs */}
              <div className="lg:col-span-7 bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-4 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-stone-300 font-semibold">سعر بيع الجراب للعميل على المتجر:</span>
                    <strong className="text-white tabular-nums text-sm">{calcRetailPrice} ج.م</strong>
                  </div>
                  <input
                    type="range"
                    min="350"
                    max="1200"
                    step="10"
                    value={calcRetailPrice}
                    onChange={(e) => setCalcRetailPrice(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-stone-400">سعر الجراب السادة من مورد الجملة (Blank Case):</span>
                    <strong className="text-stone-200 tabular-nums">-{calcBlankCost} ج.م</strong>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="90"
                    step="1"
                    value={calcBlankCost}
                    onChange={(e) => setCalcBlankCost(Number(e.target.value))}
                    className="w-full accent-stone-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-stone-400">تكلفة طباعة الـ UV والنحت للمطبعة:</span>
                    <strong className="text-stone-200 tabular-nums">-{calcUvPrintCost} ج.م</strong>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="70"
                    step="1"
                    value={calcUvPrintCost}
                    onChange={(e) => setCalcUvPrintCost(Number(e.target.value))}
                    className="w-full accent-stone-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-stone-400">تكلفة علبة التغليف الفاخر والكيس الشمواه:</span>
                    <strong className="text-stone-200 tabular-nums">-{calcPackagingCost} ج.م</strong>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    step="1"
                    value={calcPackagingCost}
                    onChange={(e) => setCalcPackagingCost(Number(e.target.value))}
                    className="w-full accent-stone-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-stone-400">رسوم شحن وتوصيل بوسطة (تدفع عند التحصيل):</span>
                    <strong className="text-stone-200 tabular-nums">-{calcBostaDeliveryFee} ج.م</strong>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="80"
                    step="5"
                    value={calcBostaDeliveryFee}
                    onChange={(e) => setCalcBostaDeliveryFee(Number(e.target.value))}
                    className="w-full accent-stone-500"
                  />
                </div>
              </div>

              {/* Profit Scorecard */}
              <div className="lg:col-span-5 bg-gradient-to-b from-emerald-950/40 via-stone-950 to-stone-950 p-6 rounded-2xl border border-emerald-800/60 text-center space-y-4">
                <span className="text-xs font-semibold text-emerald-400 block uppercase tracking-wider">
                  صافي ربحك في الكفر الواحد (Net Profit):
                </span>

                <div className="text-4xl font-black text-emerald-400 tabular-nums">
                  +{netProfit} ج.م
                </div>

                <div className="inline-block bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700 text-xs font-bold text-emerald-300">
                  هامش ربح صافي: {profitMarginPercent}%
                </div>

                <div className="pt-4 border-t border-stone-800 text-xs text-stone-400 space-y-2 text-right">
                  <p>• إذا بعت <strong>10 كفرات يومياً</strong> = أرباحك الشهرية <strong>{(netProfit * 300).toLocaleString()} ج.م</strong></p>
                  <p>• بوسطة تحول المبالغ المجمعة لحسابك البنكي أو فودافون كاش كل أسبوع بانتظام.</p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 5: Proximity Cluster, Real-Cost Breakdown (50 EGP), and Live Order Routing Simulator */}
        {activeTab === 'proximity_cluster' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Top Banner: Reality Check on Egyptian Pricing */}
            <div className="p-5 bg-gradient-to-r from-emerald-950/60 via-stone-900 to-emerald-950/40 rounded-2xl border border-emerald-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  <h3 className="text-base font-bold text-white">
                    الحقيقة التجارية: كيف نخفض تكلفة القطعة لـ 50 ج.م ونبيع بـ 229 ج.م بدلاً من 700 ج.م؟
                  </h3>
                </div>
                <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
                  أنت محق 100%! المستهلك المصري لن يشتري كفر هاتف بـ 700 جنيه في الظروف الحالية. السر هو التنسيق بين موردين ومطابع متجاورين في نفس المربع السكني لتصفير تكاليف النقل الداخلي والحصول على تكلفة إنتاج 50 ج.م فقط وهامش ربح +179 ج.م!
                </p>
              </div>

              <div className="bg-emerald-950 p-3 rounded-xl border border-emerald-600/80 text-center shrink-0">
                <span className="text-[10px] text-emerald-300 block uppercase">سعر البيع المقترح</span>
                <span className="text-2xl font-black text-white">229 ج.م</span>
                <span className="text-[10px] text-emerald-400 block font-bold">ربحك الصافي: +179 ج.م</span>
              </div>
            </div>

            {/* Section 1: The Zero-Distance Geographic Clusters */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">
                  عناقيد الموردين الأقرب لبعض جغرافياً (Zero-Friction Geographic Clusters):
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Cluster A: Downtown & Bab El-Louq */}
                <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-3 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <span>عنقود 1: وسط البلد والعتبة (The Downtown Cluster)</span>
                    </span>
                    <span className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded font-mono">
                      المسافة: 800 متر فقط
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-stone-300">
                    <div className="bg-stone-900/80 p-2.5 rounded-xl border border-stone-800 space-y-1">
                      <span className="text-[10px] text-stone-400 block font-semibold">مورد الكفرات السادة الخام:</span>
                      <strong className="text-white">سنتر الرواد أو الصفا والمروة</strong> (شارع الفلكي / عبد العزيز - العتبة)
                      <span className="block text-[11px] text-emerald-400 font-bold">سعر الكفر الخام: 22 ج.م</span>
                    </div>

                    <div className="flex justify-center">
                      <span className="text-xs text-stone-500 font-bold">⬇️ مسافة 7 دقائق بموتوسيكل دليفري (تكلفة النقل: 10 ج.م أو مجاناً) ⬇️</span>
                    </div>

                    <div className="bg-stone-900/80 p-2.5 rounded-xl border border-stone-800 space-y-1">
                      <span className="text-[10px] text-stone-400 block font-semibold">مطبعة الحفر بالليزر والختم الذهبي:</span>
                      <strong className="text-white">ورشة نقش الليزر الملكية</strong> (شارع شريف - وسط البلد)
                      <span className="block text-[11px] text-amber-400 font-bold">تكلفة الختم / النحت: 20 ج.م</span>
                    </div>

                    <div className="bg-stone-900/80 p-2.5 rounded-xl border border-stone-800 space-y-1">
                      <span className="text-[10px] text-stone-400 block font-semibold">نقطة استلام بوسطة ومايلرز:</span>
                      <span className="text-stone-300">فرع بوسطة وسط البلد (شارع الجمهورية) يمر المندوب يومياً لاستلام الأوردرات الجاهزة.</span>
                    </div>
                  </div>
                </div>

                {/* Cluster B: Nasr City & Makram Ebeid */}
                <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-3 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <span>عنقود 2: مدينة نصر ومكرم عبيد (The Print-to-Ship Hub)</span>
                    </span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-mono border border-emerald-800">
                      المسافة: 300 متر فقط
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-stone-300">
                    <div className="bg-stone-900/80 p-2.5 rounded-xl border border-stone-800 space-y-1">
                      <span className="text-[10px] text-stone-400 block font-semibold">مطبعة الـ UV المتطورة (Mimaki اليابانية):</span>
                      <strong className="text-white">مركز UV-Tech المتطور</strong> (شارع مكرم عبيد)
                      <span className="block text-[11px] text-emerald-400 font-bold">تكلفة الطباعة والورنيش البارز: 20 - 25 ج.م</span>
                    </div>

                    <div className="flex justify-center">
                      <span className="text-xs text-emerald-400 font-bold">⬇️ بوسطة ومايلرز على بُعد شارعين فقط (تكلفة النقل: 0 ج.م) ⬇️</span>
                    </div>

                    <div className="bg-stone-900/80 p-2.5 rounded-xl border border-stone-800 space-y-1">
                      <span className="text-[10px] text-stone-400 block font-semibold">فرع بوسطة ومايلرز اللوجستي:</span>
                      <strong className="text-white">فرع بوسطة مكرم عبيد الرئيسي</strong> (شارع الموصل)
                      <span className="block text-[11px] text-stone-300">
                        المندوب يدخل مقر المطبعة يومياً في تمام الساعة 5 مساءً لاستلام الطرود الجاهزة والمغلفة مع إشعار AWB فوري.
                      </span>
                    </div>

                    <div className="p-2 bg-emerald-950/40 rounded-lg border border-emerald-800/60 text-[11px] text-emerald-300">
                      ✨ <strong>النتيجة:</strong> صفر هدر زمني، صفر مصاريف نقل داخلي، وخروج الشحنة للعميل خلال 12 ساعة فقط.
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Section 2: Real-World Cost Sheet (التكلفة الحقيقية بالقرش) */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>تفكيك تكلفة الكفر الكاملة (50 ج.م فقط) بعد التفاوض على الكميات:</span>
              </h4>

              <div className="border border-stone-800 rounded-xl overflow-hidden bg-stone-950">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-900 text-stone-400 border-b border-stone-800">
                    <tr>
                      <th className="p-3">بند التكلفة</th>
                      <th className="p-3">المصدر والمكان</th>
                      <th className="p-3">التكلفة السابقة</th>
                      <th className="p-3 text-emerald-400">التكلفة بعد التفاوض</th>
                      <th className="p-3">طريقة التوفير</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60 text-stone-200">
                    <tr>
                      <td className="p-3 font-semibold">1. كفر MagSafe سادة شفاف/مطفي</td>
                      <td className="p-3 text-stone-400">سنتر الرواد (العتبة/باب اللوق)</td>
                      <td className="p-3 text-stone-500 line-through">38 ج.م</td>
                      <td className="p-3 font-bold text-emerald-400 font-mono">22 ج.م</td>
                      <td className="p-3 text-stone-400">شراء دستة تجريبية (12 قطعة) مجمعة لموديلات آيفون وسامسونج</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">2. طباعة UV ثلاثية الأبعاد + ورنيش بارز</td>
                      <td className="p-3 text-stone-400">مطبعة UV-Tech (مكرم عبيد)</td>
                      <td className="p-3 text-stone-500 line-through">35 ج.م</td>
                      <td className="p-3 font-bold text-emerald-400 font-mono">20 ج.م</td>
                      <td className="p-3 text-stone-400">تجميع أوردرات اليوم وطباعتها على نفس الشيت (Batch Printing)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">3. علبة هارد بوكس شيك + كيس قطيفة</td>
                      <td className="p-3 text-stone-400">الفجالة والعاشر من رمضان</td>
                      <td className="p-3 text-stone-500 line-through">18 ج.م</td>
                      <td className="p-3 font-bold text-emerald-400 font-mono">8 ج.م</td>
                      <td className="p-3 text-stone-400">شراء علبة كرتون مقوى أسود جاهزة مقاس 18×10 سم مع كيس شمواه</td>
                    </tr>
                    <tr className="bg-emerald-950/40 font-bold">
                      <td className="p-3 text-white">إجمالي تكلفة المنتج الجاهز للشحن:</td>
                      <td className="p-3 text-stone-300">جاهز بالعلبة وكيس الحماية</td>
                      <td className="p-3 text-stone-500 line-through">91 ج.م</td>
                      <td className="p-3 font-mono text-lg text-emerald-400">50 ج.م فقط!</td>
                      <td className="p-3 text-emerald-300">وفرت 41 ج.م في القطعة الواحدة!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 3: Interactive Live Order Routing & Dispatch Simulator (بدقة متناهية) */}
            <div className="p-5 sm:p-6 bg-stone-950 rounded-2xl border border-stone-800 space-y-5">
              
              {/* Header and Live Scanner Radar Trigger */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-stone-800/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      <Zap className="w-4 h-4" />
                    </span>
                    <h4 className="text-base font-extrabold text-white">
                      محاكي تدفق الأوردر اللحظي وتأكيد العناوين خطوة بخطوة (Live Order Routing Engine)
                    </h4>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed max-w-2xl">
                    اختر السيناريو الذي تفضله أو اضغط على أرقام التتبع أدناه لمسح مسارات التتبع الحية ومتابعة حركة الأموال والتحصيل بالثواني!
                  </p>
                </div>

                {/* Direct Radar Scanner Button */}
                <button
                  onClick={() => handleOpenRadarForTracking(currentScenario.trackingNumber)}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95 border border-cyan-400/40"
                  title="مسح وتتبع مسار الشحنة بالرادار وحركة الأموال"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-200"></span>
                  </span>
                  <span>رادار التتبع وحركة الأموال 📡</span>
                </button>
              </div>

              {/* 3 Rich Interactive Scenario Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {SIM_SCENARIOS.map((sc) => {
                  const isSelected = sc.id === activeSimScenarioId;
                  return (
                    <div
                      key={sc.id}
                      onClick={() => {
                        setActiveSimScenarioId(sc.id);
                        setSimStep(1);
                        setIsAutoPlaying(false);
                      }}
                      className={`cursor-pointer p-3.5 rounded-xl border text-right transition-all relative ${
                        isSelected
                          ? 'border-amber-500 bg-amber-950/30 ring-1 ring-amber-500/60 shadow-lg'
                          : 'border-stone-800 bg-stone-900/60 hover:border-stone-700 hover:bg-stone-900'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-white truncate max-w-[170px]">{sc.model}</span>
                        <span className="text-xs font-black text-amber-400">{sc.priceEGP} ج.م</span>
                      </div>

                      <p className="text-[11px] text-stone-300 line-clamp-1 mb-2 font-medium">
                        {sc.title}
                      </p>

                      <div className="flex items-center justify-between text-[10px] pt-2 border-t border-stone-800/80">
                        <span className="text-emerald-400 font-bold">ربح صافي: +{sc.priceEGP - 50} ج.م</span>
                        
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSimScenarioId(sc.id);
                            handleOpenRadarForTracking(sc.trackingNumber);
                          }}
                          className="px-2 py-0.5 rounded bg-stone-800 hover:bg-cyan-900/60 text-cyan-300 hover:text-cyan-200 border border-cyan-800/60 font-mono transition-colors flex items-center gap-1"
                          title="فحص مسار التتبع اللحظي لهذا الأوردر"
                        >
                          <span>🔍</span>
                          <span>{sc.trackingNumber}</span>
                        </button>
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-amber-400"></div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Real-Time Money Flow Live Meter */}
              <div className="p-3 bg-stone-900/70 border border-stone-800 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">💰 عداد حركة الأموال اللحظي:</span>
                  <span className="text-stone-300 font-mono">
                    تحصيل العميل: <strong className="text-white">{currentScenario.priceEGP + currentScenario.deliveryFeeEGP} ج.م</strong>
                  </span>
                  <span className="text-stone-500">|</span>
                  <span className="text-stone-400 font-mono">
                    تكلفة الإنتاج: <strong className="text-red-400">-50 ج.م</strong>
                  </span>
                  <span className="text-stone-500">|</span>
                  <span className="text-stone-400 font-mono">
                    شحن بوسطة: <strong className="text-stone-300">-{currentScenario.deliveryFeeEGP} ج.م</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-stone-400">الصافي المحول لحسابك:</span>
                  <span className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-700/80 rounded-lg text-emerald-300 font-black font-mono text-xs shadow-sm">
                    +{currentScenario.priceEGP - 50} ج.م صافي (78.1%)
                  </span>
                </div>
              </div>

              {/* Playback Controls & Progress Status */}
              <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (isAutoPlaying) {
                        setIsAutoPlaying(false);
                      } else {
                        setIsAutoPlaying(true);
                        if (simStep === 5) setSimStep(1);
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                      isAutoPlaying
                        ? 'bg-amber-500 text-stone-950 hover:bg-amber-400 animate-pulse'
                        : 'bg-emerald-500 text-stone-950 hover:bg-emerald-400'
                    }`}
                  >
                    {isAutoPlaying ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>إيقاف مؤقت ⏸</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 text-stone-950" />
                        <span>تشغيل المحاكاة التلقائية ⚡</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setSimStep((prev) => Math.max(1, prev - 1));
                    }}
                    disabled={simStep <= 1}
                    className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 disabled:opacity-30 rounded-xl text-xs font-semibold border border-stone-700 transition-colors"
                  >
                    ◀ السابق
                  </button>

                  <button
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setSimStep((prev) => {
                        const next = Math.min(5, prev + 1);
                        if (next === 5) triggerConfetti();
                        return next;
                      });
                    }}
                    disabled={simStep >= 5}
                    className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 disabled:opacity-30 rounded-xl text-xs font-semibold border border-stone-700 transition-colors"
                  >
                    التالي ▶
                  </button>

                  <button
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setSimStep(1);
                    }}
                    className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold border border-stone-700 transition-colors"
                    title="إعادة تشغيل المحاكاة من البداية"
                  >
                    🔄 إعادة ضبط
                  </button>
                </div>

                {/* Chronometer & Status Bar */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5 bg-stone-950 px-3 py-1.5 rounded-lg border border-stone-800 text-stone-300">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-stone-400">التوقيت المنقضي:</span>
                    <strong className="text-amber-400 font-mono text-xs">{currentStepData.timeOffset}</strong>
                  </div>

                  <div className="flex items-center gap-1.5 bg-stone-950 px-3 py-1.5 rounded-lg border border-stone-800">
                    <span className="text-stone-400">الخطوة الحالية:</span>
                    <strong className="text-emerald-400 font-mono text-xs">{simStep} من 5</strong>
                  </div>
                </div>
              </div>

              {/* Interactive 5-Step Visual Pipeline */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                {ROUTING_STEPS.map((step) => {
                  const isActive = simStep === step.step;
                  const isDone = simStep > step.step;

                  return (
                    <button
                      key={step.step}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setSimStep(step.step);
                        if (step.step === 5) triggerConfetti();
                      }}
                      className={`text-right p-3 rounded-xl border transition-all text-xs relative ${
                        isActive
                          ? 'border-amber-500 bg-amber-950/40 text-white shadow-lg ring-1 ring-amber-500/50'
                          : isDone
                          ? 'border-emerald-700/60 bg-emerald-950/30 text-stone-300'
                          : 'border-stone-800 bg-stone-900/40 text-stone-500 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold flex items-center gap-1 text-[11px]">
                          <span>{step.icon}</span>
                          <span>خطوة {step.step}</span>
                        </span>
                        {isDone ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : isActive ? (
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                        ) : null}
                      </div>

                      <div className="font-bold text-stone-200 text-xs truncate">{step.shortTitle}</div>
                      <div className="text-[10px] text-stone-400 mt-1 font-mono">{step.duration}</div>

                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-amber-400 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Deep Inspection Panel for Current Active Step */}
              <div className="p-5 bg-gradient-to-br from-stone-900 to-stone-950 rounded-2xl border border-stone-800 space-y-4">
                
                {/* Step Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{currentStepData.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-sm sm:text-base font-bold text-white">
                          الخطوة {simStep}: {currentStepData.fullTitle}
                        </h5>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/80 text-amber-300">
                          {currentStepData.timeOffset}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 mt-0.5">{currentStepData.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs shrink-0">
                    <span className="text-stone-400">الطرف المسؤول:</span>
                    <span className="font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/80">
                      {currentStepData.responsibleParty}
                    </span>
                  </div>
                </div>

                {/* Step Specific Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  
                  {/* Card 1: Geographic Location & Proximity */}
                  <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800/90 space-y-2">
                    <div className="flex items-center justify-between text-stone-400 text-[11px] font-semibold">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>الموقع الجغرافي والمسافة:</span>
                      </span>
                      <span className="text-stone-400">{currentStepData.geoCoords}</span>
                    </div>

                    <p className="text-xs text-stone-200 font-medium leading-relaxed">
                      {currentStepData.locationText}
                    </p>

                    <div className="pt-1.5 border-t border-stone-800/60 flex items-center justify-between text-[11px]">
                      <span className="text-stone-400">مسافة النقل الداخلي:</span>
                      <strong className="text-amber-400 font-mono">{currentStepData.internalDistance}</strong>
                    </div>
                  </div>

                  {/* Card 2: Technical Specs & Payload Output */}
                  <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800/90 space-y-2">
                    <div className="flex items-center justify-between text-stone-400 text-[11px] font-semibold">
                      <span className="flex items-center gap-1 text-amber-400">
                        <Layers className="w-3.5 h-3.5" />
                        <span>المخرجات الرقمية الفنية (Payload):</span>
                      </span>
                      <span className="text-stone-500 font-mono">{currentStepData.payloadType}</span>
                    </div>

                    <div className="bg-stone-900/90 p-2 rounded-lg font-mono text-[10px] text-amber-300 border border-stone-800 break-all leading-relaxed">
                      {currentStepData.payloadSnippet}
                    </div>

                    <div className="pt-1.5 border-t border-stone-800/60 flex items-center justify-between text-[11px]">
                      <span className="text-stone-400">مستوى الأتمتة:</span>
                      <span className="text-emerald-400 font-bold">100% بدون تدخل يدوي</span>
                    </div>
                  </div>

                  {/* Card 3: Financials & Cost Ledger */}
                  <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800/90 space-y-2">
                    <div className="flex items-center justify-between text-stone-400 text-[11px] font-semibold">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>حركة الأموال والتكلفة المترتبة:</span>
                      </span>
                      <span className="text-stone-400">{currentStepData.costPhase}</span>
                    </div>

                    <div className="space-y-1 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-stone-400">التكلفة المتراكمة:</span>
                        <strong className="text-stone-200 font-mono">{currentStepData.accumulatedCost}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">سعر البيع النهائي:</span>
                        <strong className="text-white font-mono">{currentScenario.priceEGP} ج.م</strong>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-stone-800/60">
                        <span className="text-emerald-400 font-bold">صافي الربح المتوقع:</span>
                        <strong className="text-emerald-400 font-bold font-mono">
                          +{currentScenario.priceEGP - 50} ج.م (78%)
                        </strong>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Live Simulation Action Buttons for Active Step */}
                <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-stone-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{currentStepData.actionTip}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {simStep === 3 && (
                      <button
                        onClick={() => {
                          const specText = `=== أمر تشغيل طباعة UV فوري ===\nالطلب: ${currentScenario.trackingNumber}\nالموديل: ${currentScenario.model}\nالنص المطلوب: ${currentScenario.customText}\nالماكينة: ${currentScenario.printMachine}\nالملف: ${currentScenario.printSpecFile}\nالورنيش: طبقة بارزة 3D Relief 1200 DPI\nالتكلفة: 20 ج.م\nالتسليم: مندوب بوسطة اليوم الساعة 5:00 م`;
                          handleCopy(specText, 'sim-print-spec');
                        }}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg flex items-center gap-1 transition-colors"
                      >
                        {copiedKey === 'sim-print-spec' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === 'sim-print-spec' ? 'تم نسخ أمر التشغيل!' : 'نسخ أمر تشغيل الماكينة'}</span>
                      </button>
                    )}

                    {simStep === 4 && (
                      <button
                        onClick={() => {
                          const awb = `بوليصة شحن بوسطة Bosta AWB: ${currentScenario.trackingNumber}\nالمستلم: ${currentScenario.customerName}\nالهاتف: ${currentScenario.customerPhone}\nالعنوان: ${currentScenario.customerAddress}\nالتحصيل عند الاستلام COD: ${currentScenario.priceEGP + currentScenario.deliveryFeeEGP} ج.م\nالمقر: استلام من مطبعة ${currentScenario.printShopName}`;
                          handleCopy(awb, 'sim-awb');
                        }}
                        className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-lg flex items-center gap-1 transition-colors"
                      >
                        {copiedKey === 'sim-awb' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === 'sim-awb' ? 'تم نسخ بوليصة بوسطة!' : 'نسخ بوليصة بوسطة A6'}</span>
                      </button>
                    )}

                    {simStep === 5 && (
                      <button
                        onClick={triggerConfetti}
                        className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-stone-950 font-black rounded-lg flex items-center gap-1 shadow hover:scale-105 transition-transform"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>احتفال بتحصيل الكاش والأرباح! 🎉</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Live GPS Tracking Radar & Barcode Scanner Modal (سكانر أرقام ومسارات التتبع المباشر) */}
        {isRadarModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl overflow-hidden text-stone-100 flex flex-col max-h-[90vh]">
              
              {/* Radar Header */}
              <div className="px-5 py-3.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-200"></span>
                    </span>
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>رادار مسارات التتبع المباشر وحركة الأموال (GPS & Cashflow Scanner)</span>
                    </h3>
                    <span className="text-[10px] text-stone-400 font-mono">
                      AWB: {scannedTrackingNumber} · بوسطة إكسبريس مصر
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsRadarModalOpen(false)}
                  className="p-1 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Radar Body */}
              <div className="p-5 overflow-y-auto space-y-4 text-xs">
                
                {/* Visual Barcode Scanner Box with animated Laser */}
                <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 text-center relative overflow-hidden space-y-2">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-mono">
                    BOSTA EXPRESS WAYBILL · CODE128 BARCODE
                  </span>

                  {/* Simulated Barcode */}
                  <div className="py-2 px-6 bg-white rounded-lg inline-block relative overflow-hidden shadow-inner">
                    <div className="font-mono text-2xl font-black text-black tracking-[0.25em] select-none">
                      ||| | |||| | ||| || |||| |||
                    </div>
                    <span className="text-[10px] font-mono font-bold text-stone-900 block mt-0.5">
                      {scannedTrackingNumber}
                    </span>

                    {/* Animated Scanning Laser Line */}
                    {radarLaserScanning && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_8px_#ef4444] animate-pulse"></div>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-emerald-400 font-semibold pt-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>تم التحقق اللحظي من صلاحية البوليصة وربطها بنظام بوسطة مصر المركزي</span>
                  </div>
                </div>

                {/* Live GPS Checkpoints Timeline */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-stone-200 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>مسار الشحنة الجغرافي من المصنع إلى باب العميل (Zero Waste Route):</span>
                  </h4>

                  <div className="space-y-2 bg-stone-950 p-3.5 rounded-xl border border-stone-800 text-[11px]">
                    
                    <div className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                      <div>
                        <strong className="text-white">09:00 ص - مستودع البلانك (العتبة / باب اللوق):</strong>
                        <p className="text-stone-400">سحب كفر MagSafe أصلي ممتص للصدمات بسعر 22 ج.م ونقله للمطبعة المجاورة (800م).</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                      <div>
                        <strong className="text-white">11:30 ص - مطبعة UV-Tech (مكرم عبيد):</strong>
                        <p className="text-stone-400">طباعة رقمية 1440 DPI بماكينة Mimaki اليابانية + ورنيش بارز ثلاثي الأبعاد بتكلفة 20 ج.م.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                      <div>
                        <strong className="text-white">02:15 م - قسم التغليف الفاخر:</strong>
                        <p className="text-stone-400">وضع الكفر في الصندوق الصلب + الختم الشمعي وكارت الإهداء ولصق بوليصة بوسطة A6 بتكلفة 8 ج.م.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1 shrink-0 animate-ping"></span>
                      <div>
                        <strong className="text-cyan-300">05:00 م - استلام مندوب بوسطة (Pickup):</strong>
                        <p className="text-stone-400">مندوب بوسطة يستلم الطرد من مقر المطبعة مباشرة (0 ج.م مصاريف نقل داخلي).</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 mt-1 shrink-0"></span>
                      <div>
                        <strong className="text-amber-300">اليوم التالي - تسليم العميل وتحصيل الكاش:</strong>
                        <p className="text-stone-400">تسليم الطرد لباب العميل بنجاح وتحصيل المبلغ كاش وإيداع صافي أرباحك فوراً.</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Instant Financial Settlement Matrix (حركة الأموال بالقرش) */}
                <div className="p-3.5 bg-gradient-to-br from-emerald-950/40 via-stone-950 to-stone-950 rounded-xl border border-emerald-800/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>حركة الأموال اللحظية في هذا الأوردر:</span>
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">دورة تحويل بوسطة</span>
                  </div>

                  <div className="space-y-1 font-mono text-[11px] divide-y divide-stone-800/60">
                    <div className="flex justify-between py-1">
                      <span className="text-stone-300 font-sans">إجمالي الكاش المحصل من العميل (COD):</span>
                      <strong className="text-white font-bold">+{currentScenario.priceEGP + currentScenario.deliveryFeeEGP}.00 ج.م</strong>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-stone-400 font-sans">مصاريف الشحن لشركة بوسطة:</span>
                      <span className="text-stone-400">-{currentScenario.deliveryFeeEGP}.00 ج.م</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-stone-400 font-sans">تكلفة كفر الموبايل الخام (العتبة/باب اللوق):</span>
                      <span className="text-stone-400">-22.00 ج.م</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-stone-400 font-sans">تكلفة الطباعة الرقمية والورنيش UV:</span>
                      <span className="text-stone-400">-20.00 ج.م</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-stone-400 font-sans">تكلفة التغليف الملكي والختم الشمعي:</span>
                      <span className="text-stone-400">-8.00 ج.م</span>
                    </div>

                    <div className="flex justify-between py-1.5 text-xs">
                      <span className="text-emerald-300 font-bold font-sans">صافي الربح المودع في محفظتك:</span>
                      <strong className="text-emerald-400 font-black text-sm">
                        +{currentScenario.priceEGP - 50}.00 ج.م (78.1%)
                      </strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* Radar Footer */}
              <div className="p-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => handleCopy(scannedTrackingNumber, 'radar-awb')}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === 'radar-awb' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'radar-awb' ? 'تم نسخ الكود!' : 'نسخ رقم التتبع'}</span>
                </button>

                <button
                  onClick={() => setIsRadarModalOpen(false)}
                  className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-lg transition-colors"
                >
                  إغلاق نافذة الرادار
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
