import { Language } from '../types';

export interface Translations {
  // Top Banner
  topBannerText: string;
  copyCodeBtn: string;
  codeCopied: string;
  freeShippingThreshold: string;

  // Navbar
  brandName: string;
  brandTagline: string;
  navCases: string;
  navWallets: string;
  navMarketplaces: string;
  navUnboxing: string;
  navSocialAds: string;
  navTracking: string;
  navSupplyChain: string;
  navGoogleAgent: string;
  navStudioBtn: string;
  navCartAria: string;
  currencySelectAria: string;
  langSwitchAria: string;

  // Hero
  heroTopBadge: string;
  heroHeadline1: string;
  heroHeadlineHighlight: string;
  heroHeadline2: string;
  heroSubheadline: string;
  heroCtaCustomize: string;
  heroCtaBrowse: string;
  heroCtaDropship: string;
  heroFeature1: string;
  heroFeature2: string;
  heroFeature3: string;
  heroLivePreviewTitle: string;
  heroLivePreviewSubtitle: string;
  heroClickToPreview: string;

  // Niches
  nicheAll: string;
  nicheFootball: string;
  nicheAnime: string;
  nicheCalligraphy: string;
  nicheFlorals: string;
  nicheMotorsport: string;
  nicheNostalgia: string;
  nicheLeather: string;
  nicheGalaxy: string;

  // Catalog Section
  catalogTitle: string;
  catalogSubtitle: string;
  catalogDeviceLabel: string;
  catalogSearchPlaceholder: string;
  catalogSortBestseller: string;
  catalogSortPriceAsc: string;
  catalogSortPriceDesc: string;
  catalogSortRating: string;
  catalogTabAll: string;
  catalogTabCases: string;
  catalogTabWallets: string;
  catalogTabFootball: string;
  catalogTabAnime: string;
  catalogTabIslamic: string;
  catalogTabAesthetic: string;
  catalogTabCars: string;
  catalogTabEgypt: string;
  catalogTabGalaxy: string;
  catalogShowingResults: string;
  catalogNoResults: string;

  // Product Card
  cardBestseller: string;
  cardNewArrival: string;
  cardReviewsCount: string;
  cardBasePrice: string;
  cardDropshipProfit: string;
  cardCustomizeBtn: string;
  cardQuickAddBtn: string;
  cardSpecsUV: string;
  cardSpecsMagSafe: string;
  cardSpecsLeather: string;

  // Cart Drawer
  cartTitle: string;
  cartEmptyTitle: string;
  cartEmptySubtitle: string;
  cartEmptyExploreBtn: string;
  cartItemsCount: string;
  cartCustomizationBadge: string;
  cartCustomTextLabel: string;
  cartFoilLabel: string;
  cartItemRemove: string;
  cartSummarySubtotal: string;
  cartSummaryShipping: string;
  cartSummaryTotal: string;
  cartCheckoutBtn: string;
  cartFreeShippingNote: string;

  // Checkout Modal
  checkoutTitle: string;
  checkoutSubtitle: string;
  checkoutStepShipping: string;
  checkoutStepPayment: string;
  checkoutFullName: string;
  checkoutFullNamePlaceholder: string;
  checkoutPhone: string;
  checkoutPhonePlaceholder: string;
  checkoutGovernorate: string;
  checkoutGovernorateSelect: string;
  checkoutAddress: string;
  checkoutAddressPlaceholder: string;
  checkoutNotes: string;
  checkoutNotesPlaceholder: string;
  checkoutPromoLabel: string;
  checkoutPromoPlaceholder: string;
  checkoutPromoApply: string;
  checkoutPromoApplied: string;
  checkoutPromoDiscount: string;
  checkoutPromoInvalid: string;
  checkoutPaymentMethod: string;
  checkoutPaymentCod: string;
  checkoutPaymentCodDesc: string;
  checkoutPaymentInstapay: string;
  checkoutPaymentInstapayDesc: string;
  checkoutPaymentCard: string;
  checkoutPaymentCardDesc: string;
  checkoutOrderSummary: string;
  checkoutShippingFee: string;
  checkoutFreeShipping: string;
  checkoutTotalToPay: string;
  checkoutConfirmBtn: string;
  checkoutConfirmProcessing: string;
  checkoutSuccessTitle: string;
  checkoutSuccessSubtitle: string;
  checkoutOrderNumber: string;
  checkoutCloseBtn: string;

  // Customizer Studio
  studioTitle: string;
  studioSubtitle: string;
  studioTabDevice: string;
  studioTabStyle: string;
  studioTabText: string;
  studioTabFoil: string;
  studioCustomTextInputLabel: string;
  studioCustomTextPlaceholder: string;
  studioSelectFontLabel: string;
  studioSelectFoilLabel: string;
  studioFinishLabel: string;
  studioAddToCartBtn: string;
  studioCloseBtn: string;
  studioPriceLabel: string;

  // Footer & Trust
  trustTitle: string;
  trustFeature1Title: string;
  trustFeature1Desc: string;
  trustFeature2Title: string;
  trustFeature2Desc: string;
  trustFeature3Title: string;
  trustFeature3Desc: string;
  trustFeature4Title: string;
  trustFeature4Desc: string;
  footerRights: string;
  footerMadeWithLove: string;

  // 24-Hour Public Beta Testing
  betaBadge: string;
  betaBannerTitle: string;
  betaBannerSubtitle: string;
  betaHours: string;
  betaMins: string;
  betaSecs: string;
  betaApplyCodeBtn: string;
  betaFeedbackBtn: string;
  betaFeedbackTitle: string;
  betaFeedbackSubtitle: string;
  betaFeedbackSuccess: string;

  // Loyalty & Rewards Club
  navLoyalty: string;
  loyaltyTitle: string;
  loyaltySubtitle: string;
  loyaltyPointsLabel: string;
  loyaltyPointsUnit: string;
  loyaltyDiscountEquivalent: string;
  loyaltyTierLabel: string;
  loyaltyTierSilver: string;
  loyaltyTierGold: string;
  loyaltyTierDiamond: string;
  loyaltyRedeemAtCheckout: string;
  loyaltyHowItWorks: string;

  // Membership Gifts
  membershipGiftsTitle: string;
  membershipGiftsSubtitle: string;
  giftKeychainName: string;
  giftKeychainDesc: string;
  giftBoxUpgradeName: string;
  giftBoxUpgradeDesc: string;
  giftCareKitName: string;
  giftCareKitDesc: string;
  giftSelected: string;
  giftSelect: string;

  // Referral Win-Win Program
  referralTitle: string;
  referralSubtitle: string;
  referralYourCode: string;
  referralCopyBtn: string;
  referralCopied: string;
  referralShareWhatsapp: string;
  referralShareTelegram: string;
  referralFriendPerk: string;
  referralYourPerk: string;
  referralStatsTitle: string;
  referralStatsCount: string;
  referralStatsEarned: string;

  // Badges & Gamification Milestones
  tabBadges: string;
  badgesTitle: string;
  badgesSubtitle: string;
  badgesProgressLabel: string;
  badgesUnlockedCount: string;
  badgesTotalReward: string;
  badgesClaimReward: string;
  badgesCompleted: string;
  badgesInProgress: string;
  badgesFilterAll: string;
  badgesFilterUnlocked: string;
  badgesFilterLocked: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  ar: {
    // Top Banner
    topBannerText: '🎉 كود خصم إضافي: استخدم كود Dody15 لخصم 15% فوري على كل الكفرات + شحن سريع 48 ساعة لباب البيت 🚚',
    copyCodeBtn: 'نسخ الكود',
    codeCopied: 'تم النسخ!',
    freeShippingThreshold: 'شحن مجاني للطلبات فوق 500 ج.م',

    // Navbar
    brandName: 'كيستيك',
    brandTagline: 'CaseTech',
    navCases: 'كفرات الهواتف',
    navWallets: 'المحافظ الجلدية',
    navMarketplaces: '🛒 أمازون ونون وكنز',
    navUnboxing: 'فتح الصندوق 🎁',
    navSocialAds: 'إعلانات السوشيال 🎨',
    navTracking: 'تتبع شحنتك',
    navSupplyChain: 'المطابع وبوسطة',
    navGoogleAgent: 'وكيل جوجل',
    navStudioBtn: 'استوديو التخصيص',
    navCartAria: 'عربة التسوق',
    currencySelectAria: 'اختر العملة',
    langSwitchAria: 'تبديل اللغة',

    // Hero
    heroTopBadge: '✨ أحدث تشكيلة كفرات مخصصة ومحافظ جلدية في مصر والشرق الأوسط',
    heroHeadline1: 'صمّم جراب هاتفك ومحفظتك بلمستك الخاصة',
    heroHeadlineHighlight: 'شحن مباشر من المصنع لباب بيتك',
    heroHeadline2: 'بأعلى جودة طباعة UV يابانية وجلود طبيعية هاند ميد',
    heroSubheadline: 'اختر تصميمك المفضل من بين مئات الموديلات أو اكتب اسمك بالذهب والفضة مع أسرع خدمة تصنيع وشحن في مصر.',
    heroCtaCustomize: 'صمم جرابك الآن ⚡',
    heroCtaBrowse: 'تصفح الموديلات والبدائل',
    heroCtaDropship: 'بوابة الدروب شيبينج والتجار',
    heroFeature1: 'طباعة يابانية 3D بارزة ضد الخدش والماء',
    heroFeature2: 'تغليف هدايا ملكي مجاني مع كل أوردر',
    heroFeature3: 'شحن سريع 48 ساعة مع بوسطة والدفع عند الاستلام',
    heroLivePreviewTitle: 'معاينة حية للموديل على الهاتف',
    heroLivePreviewSubtitle: 'اضغط على أي كفر بالأسفل لمعاينته باللحظة على هاتف حقيقي',
    heroClickToPreview: 'انقر للتجربة',

    // Niches
    nicheAll: 'الكل',
    nicheFootball: '⚽ كورة وأندية',
    nicheAnime: '⚔️ أنمي ومانجا',
    nicheCalligraphy: '✒️ خط وزخارف',
    nicheFlorals: '🌸 ماربل وبنات',
    nicheMotorsport: '🏎️ عربيات وسرعة',
    nicheNostalgia: '🇪🇬 نوستالجيا مصرية',
    nicheLeather: '💎 جلد طبيعي',
    nicheGalaxy: '🌌 فضاء ومجرات',

    // Catalog Section
    catalogTitle: 'معرض الموديلات والتصاميم الحية',
    catalogSubtitle: 'تصفح التشكيلات الحصرية، جرب تصميمك على موديل تليفونك، أو صمم جراب خاص باسمك بنقرة واحدة.',
    catalogDeviceLabel: 'معاينة سريعة على هاتفك:',
    catalogSearchPlaceholder: 'ابحث عن تصميم، كورة، أنمي، رخام، سيارات، خط عربي...',
    catalogSortBestseller: 'الأكثر مبيعاً 🔥',
    catalogSortPriceAsc: 'السعر: من الأقل للأعلى',
    catalogSortPriceDesc: 'السعر: من الأعلى للأقل',
    catalogSortRating: 'الأعلى تقييماً ⭐',
    catalogTabAll: 'جميع المنتجات',
    catalogTabCases: '📱 كفرات الهواتف',
    catalogTabWallets: '💼 محافظ جلدية',
    catalogTabFootball: '⚽ أندية وكورة',
    catalogTabAnime: '⚔️ أنمي ومانجا',
    catalogTabIslamic: '✒️ خط إسلامي',
    catalogTabAesthetic: '🌸 ماربل ولطيف',
    catalogTabCars: '🏎️ سباقات وسيارات',
    catalogTabEgypt: '🇪🇬 نوستالجيا مصرية',
    catalogTabGalaxy: '🌌 فضاء ومجرات',
    catalogShowingResults: 'عرض الموديلات المتاحة',
    catalogNoResults: 'لم يتم العثور على نتائج مطابقة لبحثك، جرب كلمة أخرى أو تصفح كل الموديلات.',

    // Product Card
    cardBestseller: 'الأكثر طلباً',
    cardNewArrival: 'جديد وحصري',
    cardReviewsCount: 'تقييم موثق',
    cardBasePrice: 'السعر للعميل',
    cardDropshipProfit: 'صافي ربح التاجر',
    cardCustomizeBtn: 'تخصيص الاسم 🎨',
    cardQuickAddBtn: 'إضافة سريعة +',
    cardSpecsUV: 'UV بارز ياباني',
    cardSpecsMagSafe: 'يدعم MagSafe',
    cardSpecsLeather: 'جلد بقري طبيعي 100%',

    // Cart Drawer
    cartTitle: 'سلة مشترياتك',
    cartEmptyTitle: 'سلتك فارغة حالياً',
    cartEmptySubtitle: 'استكشف تشكيلات الكفرات والمحافظ واختر ما يناسب ذوقك الفريد.',
    cartEmptyExploreBtn: 'تصفح التصاميم الآن',
    cartItemsCount: 'منتجات',
    cartCustomizationBadge: 'مخصص بالطلب',
    cartCustomTextLabel: 'النص:',
    cartFoilLabel: 'البصمة:',
    cartItemRemove: 'حذف',
    cartSummarySubtotal: 'المجموع الفرعي للمنتجات:',
    cartSummaryShipping: 'رسوم الشحن (بوسطة):',
    cartSummaryTotal: 'الإجمالي النهائي المطلوب:',
    cartCheckoutBtn: 'المتابعة لإتمام الطلب ⚡',
    cartFreeShippingNote: '🚚 الشحن مجاني لجميع الطلبات في مصر عند شراء قطعتين أو أكثر!',

    // Checkout Modal
    checkoutTitle: 'إتمام الطلب والشحن السريع',
    checkoutSubtitle: 'أدخل بيانات التوصيل وسيتم تجهيز وشحن طلبك خلال 24 - 48 ساعة عبر بوسطة.',
    checkoutStepShipping: 'بيانات المستلم والتوصيل',
    checkoutStepPayment: 'طريقة الدفع وملخص الفاتورة',
    checkoutFullName: 'الاسم بالكامل',
    checkoutFullNamePlaceholder: 'مثال: أحمد محمود إبراهيم',
    checkoutPhone: 'رقم الموبايل (واتساب متاح)',
    checkoutPhonePlaceholder: '010XXXXXXXX أو 011XXXXXXXX',
    checkoutGovernorate: 'المحافظة',
    checkoutGovernorateSelect: 'اختر المحافظة...',
    checkoutAddress: 'العنوان بالتفصيل',
    checkoutAddressPlaceholder: 'الشارع، رقم العمارة، الشقة أو المعلم المميز...',
    checkoutNotes: 'ملاحظات خاصة للمندوب (اختياري)',
    checkoutNotesPlaceholder: 'مثال: الاتصال قبل الوصول بنصف ساعة...',
    checkoutPromoLabel: 'كوبون الخصم الترويجي',
    checkoutPromoPlaceholder: 'أدخل الكود (مثل Dody15 أو mody)',
    checkoutPromoApply: 'تطبيق',
    checkoutPromoApplied: 'تم تفعيل كود الخصم بنجاح! 🎉',
    checkoutPromoDiscount: 'قيمة الخصم المطبق:',
    checkoutPromoInvalid: 'كود الخصم غير صحيح أو منتهي الصلاحية',
    checkoutPaymentMethod: 'اختر طريقة الدفع المفضلة',
    checkoutPaymentCod: 'الدفع نقداً عند الاستلام (COD)',
    checkoutPaymentCodDesc: 'افحص الأوردر مع مندوب بوسطة ثم ادفع المبلغ كاش',
    checkoutPaymentInstapay: 'إنستاباي / فودافون كاش (InstaPay)',
    checkoutPaymentInstapayDesc: 'تحويل لحظي وسريع مع إشعار فوري',
    checkoutPaymentCard: 'بطاقة بنكية (فيزا / ماستركارد / ميزة)',
    checkoutPaymentCardDesc: 'دفع آمن ومشفر 100%',
    checkoutOrderSummary: 'ملخص الفاتورة',
    checkoutShippingFee: 'تكلفة الشحن لعنوانك:',
    checkoutFreeShipping: 'مجاناً 🎁',
    checkoutTotalToPay: 'المبلغ الإجمالي المستحق:',
    checkoutConfirmBtn: 'تأكيد وشحن الأوردر الآن 🚀',
    checkoutConfirmProcessing: 'جاري تسجيل الطلب وإصدار بوليصة الشحن...',
    checkoutSuccessTitle: 'تم تسجيل طلبك بنجاح! 🎉',
    checkoutSuccessSubtitle: 'سيصلك إشعار بالواتساب برقم التتبع فور تسليم الشحنة لمندوب بوسطة.',
    checkoutOrderNumber: 'رقم الأوردر المرجعي:',
    checkoutCloseBtn: 'العودة للمتجر',

    // Customizer Studio
    studioTitle: 'استوديو التخصيص ثلاثي الأبعاد',
    studioSubtitle: 'صمم جرابك أو محفظتك بأسلوبك الخاص مع طباعة حرارية أو فويل ذهبي بارز 24k.',
    studioTabDevice: 'الموديل والجهاز',
    studioTabStyle: 'التصميم والخامة',
    studioTabText: 'النص والاسم',
    studioTabFoil: 'لون البصمة والخط',
    studioCustomTextInputLabel: 'اكتب الاسم أو العبارة:',
    studioCustomTextPlaceholder: 'مثال: NAQSH أو اسمك بالعربي/الإنجليزي...',
    studioSelectFontLabel: 'نوع الخط:',
    studioSelectFoilLabel: 'لون بصمة الفويل الحراري:',
    studioFinishLabel: 'نوع الجراب:',
    studioAddToCartBtn: 'اعتماد التصميم والإضافة للسلة 🛍️',
    studioCloseBtn: 'إغلاق',
    studioPriceLabel: 'السعر شامل التخصيص:',

    // Footer & Trust
    trustTitle: 'لماذا يختار عملاؤنا منصة "نقش"؟',
    trustFeature1Title: 'خامات جلود وكفرات عسكرية',
    trustFeature1Desc: 'كفرات حماية ماصّة للصدمات وجلود طبيعية معالجة لتدوم لسنوات.',
    trustFeature2Title: 'طباعة يابانية UV بارزة',
    trustFeature2Desc: 'ألوان ثابتة تدوم ضد الشمس والماء ولا تبهت أبداً مع بروز ملموس.',
    trustFeature3Title: 'تغليف إهداء ملكي مجاني',
    trustFeature3Desc: 'كل أوردر يخرج في علبة فاخرة مع ختم شمعي وكارت إهداء أنيق.',
    trustFeature4Title: 'شحن وضمان استبدال فوري',
    trustFeature4Desc: 'معاينة واستلام مريح وضمان استبدال كامل في حال وجود أي عيب.',
    footerRights: 'جميع الحقوق محفوظة © منصة نقش | NAQSH',
    footerMadeWithLove: 'صُنع بحب وإتقان في مصر 🇪🇬',

    // 24-Hour Public Beta Testing
    betaBadge: 'نسخة تجريبية عامة (24 ساعة)',
    betaBannerTitle: '🚀 الموقع متاح الآن للجمهور تحت الاختبار التجريبي المفتوح لمدة 24 ساعة قبل الإطلاق الرسمي!',
    betaBannerSubtitle: 'استفد من خصم 20% حصري للمختبرين (كود: BETA24) + شحن مجاني وهدية عضوية ملكية مع كل طلب.',
    betaHours: 'ساعة',
    betaMins: 'دقيقة',
    betaSecs: 'ثانية',
    betaApplyCodeBtn: 'نسخ وتفعيل كود BETA24',
    betaFeedbackBtn: 'ملاحظات التجربة والجوائز 🎁',
    betaFeedbackTitle: 'مركز ملاحظات واقتراحات النسخة التجريبية (Beta)',
    betaFeedbackSubtitle: 'رأيك يصنع الفارق! شاركنا انطباعك أو أي خطأ صادفك وسنرسل لك كود خصم 25% + هدية ترحيبية.',
    betaFeedbackSuccess: 'شكراً لمساهمتك القيمة! تم تسجيل ملاحظتك بنجاح وإضافة 150 نقطة ولاء وكود هدية VIP.',

    // Loyalty & Rewards Club
    navLoyalty: 'نقاط الولاء والهدايا 👑',
    loyaltyTitle: 'نادي ولاء نقش | NAQSH VIP Club',
    loyaltySubtitle: 'اكسب نقاطاً مع كل طلب، استبدلها بخصومات كاش حقيقية، واحصل على هدايا حصرية ومزايا استثنائية.',
    loyaltyPointsLabel: 'رصيد نقاطك:',
    loyaltyPointsUnit: 'نقطة ولاء',
    loyaltyDiscountEquivalent: 'تساوي رصيد خصم بقيمة',
    loyaltyTierLabel: 'فئة العضوية الحالية:',
    loyaltyTierSilver: 'المستوى الفضي (Starter)',
    loyaltyTierGold: 'المستوى الذهبي (Gold VIP)',
    loyaltyTierDiamond: 'المستوى الماسي (Diamond Black)',
    loyaltyRedeemAtCheckout: 'استبدال النقاط بخصم مباشر في الفاتورة',
    loyaltyHowItWorks: 'كل 100 نقطة ولاء = 50 ج.م خصم فوري على أي طلب!',

    // Membership Gifts
    membershipGiftsTitle: 'هدايا العضوية والترحيب الحصرية 🎁',
    membershipGiftsSubtitle: 'اختر هديتك الترحيبية المجانية لتُرفق تلقائياً مع طلبك القادم دون أي تكلفة إضافية:',
    giftKeychainName: 'ميدالية جلد طبيعي محفورة بحرف اسمك',
    giftKeychainDesc: 'ميدالية مفاتيح هاند ميد من أجود أنواع الجلود الإيطالية مع حفر حراري لحرفك المفضل مجاناً.',
    giftBoxUpgradeName: 'ترقية علبة الهدايا الملكية بالختم الشمعي',
    giftBoxUpgradeDesc: 'علبة صلبة مغناطيسية مبطنة بالمخمل الأسود ومختومة بالشمع الأحمر الملكي مع كارت إهداء.',
    giftCareKitName: 'باقة تنظيف وتلميع الجلود وكفرات UV',
    giftCareKitDesc: 'محلول مخصص لحماية لمعان طباعة UV وبلسم تغذية الجلود الطبيعية مع قماش ميكروفايبر فاخر.',
    giftSelected: 'تم اختيار هذه الهدية لطلبك ✨',
    giftSelect: 'اختيار هذه الهدية مجاناً',

    // Referral Win-Win Program
    referralTitle: 'برنامج الترشيح والخصم الإضافي لكليهما 🤝',
    referralSubtitle: 'شارك رابطك أو كودك مع أصدقائك: يحصل صديقك على خصم 15% فوري إضافي، وتحصل أنت على 100 ج.م رصيد كاش / 200 نقطة ولاء عند إتمامه لطلبه الأول!',
    referralYourCode: 'كود الدعوة الخاص بك:',
    referralCopyBtn: 'نسخ كود ورابط الترشيح',
    referralCopied: 'تم نسخ الرابط والكود!',
    referralShareWhatsapp: 'مشاركة على واتساب',
    referralShareTelegram: 'مشاركة على تليجرام',
    referralFriendPerk: 'الصديق يحصل على: خصم 15% فوري إضافي على كامل المنتجات',
    referralYourPerk: 'أنت تحصل على: 100 ج.م رصيد محفظة أو 200 نقطة ولاء فورية',
    referralStatsTitle: 'إحصائيات ترشيحاتك الناجحة:',
    referralStatsCount: 'أصدقاء قاموا بالطلب:',
    referralStatsEarned: 'مجموع أرباحك ورصيدك المكتسب:',

    // Badges & Gamification Milestones
    tabBadges: 'أوسمة الإنجازات 🎖️',
    badgesTitle: 'أوسمة الشرف وإنجازات نادي نقش',
    badgesSubtitle: 'أكمل التحديات الملكية وافتح أوسمة نادرة لتكسب نقاط ولاء إضافية وجوائز استثنائية!',
    badgesProgressLabel: 'مستوى إنجاز الأوسمة:',
    badgesUnlockedCount: 'أوسمة تم فتحها',
    badgesTotalReward: 'مكافآت نقاط الأوسمة المكتسبة:',
    badgesClaimReward: 'استلام نقاط الوسام',
    badgesCompleted: 'تم الإنجاز بنجاح ✓',
    badgesInProgress: 'قيد التقدم',
    badgesFilterAll: 'جميع الأوسمة',
    badgesFilterUnlocked: 'الأوسمة المكتملة',
    badgesFilterLocked: 'الأوسمة القادمة',
  },

  en: {
    // Top Banner
    topBannerText: '🎉 Special Discount: Use promo code Dody15 for an instant 15% OFF all cases + 48h doorstep express delivery 🚚',
    copyCodeBtn: 'Copy Code',
    codeCopied: 'Copied!',
    freeShippingThreshold: 'Free Express Shipping on orders over 500 EGP',

    // Navbar
    brandName: 'CaseTech',
    brandTagline: 'كيستيك',
    navCases: 'Phone Cases',
    navWallets: 'Leather Wallets',
    navMarketplaces: '🛒 Amazon & Noon',
    navUnboxing: 'Unboxing 🎁',
    navSocialAds: 'Social Ads 🎨',
    navTracking: 'Track Order',
    navSupplyChain: 'Printers & Bosta',
    navGoogleAgent: 'Google AI Agent',
    navStudioBtn: 'Live Customizer',
    navCartAria: 'Shopping Cart',
    currencySelectAria: 'Select Currency',
    langSwitchAria: 'Switch Language',

    // Hero
    heroTopBadge: '✨ Premium Custom Cases & Handcrafted Leather Goods in Egypt & MENA',
    heroHeadline1: 'Design Your Custom Phone Case & Leather Wallet',
    heroHeadlineHighlight: 'Direct Factory-to-Doorstep Fulfillment',
    heroHeadline2: 'Featuring Japanese 3D UV Relief and 100% Genuine Leather',
    heroSubheadline: 'Explore hundreds of trending subculture designs or personalize with your name in 24k liquid gold and silver foil.',
    heroCtaCustomize: 'Customize Case Now ⚡',
    heroCtaBrowse: 'Explore Showroom & Models',
    heroCtaDropship: 'Merchant & Dropship Portal',
    heroFeature1: 'Scratch-resistant Japanese 3D UV tactile print',
    heroFeature2: 'Complimentary luxury gift unboxing with every order',
    heroFeature3: '48h express delivery with Bosta + Cash on Delivery',
    heroLivePreviewTitle: 'Live Real-Device Mockup Preview',
    heroLivePreviewSubtitle: 'Click any case below to instantly preview it on a real phone',
    heroClickToPreview: 'Click to Preview',

    // Niches
    nicheAll: 'All',
    nicheFootball: '⚽ Football Clubs',
    nicheAnime: '⚔️ Anime & Manga',
    nicheCalligraphy: '✒️ Arabic Calligraphy',
    nicheFlorals: '🌸 Aesthetic & Florals',
    nicheMotorsport: '🏎️ Supercars & Racing',
    nicheNostalgia: '🇪🇬 Egyptian Nostalgia',
    nicheLeather: '💎 Genuine Leather',
    nicheGalaxy: '🌌 Cosmic & Galaxy',

    // Catalog Section
    catalogTitle: 'Live Models & Designs Showroom',
    catalogSubtitle: 'Browse exclusive subculture collections, preview on your phone model, or personalize with your name in one click.',
    catalogDeviceLabel: 'Quick device preview:',
    catalogSearchPlaceholder: 'Search design, football, anime, marble, racing, calligraphy...',
    catalogSortBestseller: 'Bestsellers 🔥',
    catalogSortPriceAsc: 'Price: Low to High',
    catalogSortPriceDesc: 'Price: High to Low',
    catalogSortRating: 'Top Rated ⭐',
    catalogTabAll: 'All Items',
    catalogTabCases: '📱 Phone Cases',
    catalogTabWallets: '💼 Leather Wallets',
    catalogTabFootball: '⚽ Football & Clubs',
    catalogTabAnime: '⚔️ Anime & Manga',
    catalogTabIslamic: '✒️ Islamic Art',
    catalogTabAesthetic: '🌸 Aesthetic & Marble',
    catalogTabCars: '🏎️ Racing & Supercars',
    catalogTabEgypt: '🇪🇬 Egyptian Icons',
    catalogTabGalaxy: '🌌 Galaxy & Space',
    catalogShowingResults: 'Showing available models',
    catalogNoResults: 'No designs match your search query. Try another keyword or browse all collections.',

    // Product Card
    cardBestseller: 'Bestseller',
    cardNewArrival: 'New Arrival',
    cardReviewsCount: 'verified reviews',
    cardBasePrice: 'Customer Price',
    cardDropshipProfit: 'Net Merchant Profit',
    cardCustomizeBtn: 'Personalize 🎨',
    cardQuickAddBtn: 'Quick Add +',
    cardSpecsUV: 'Japanese 3D UV Relief',
    cardSpecsMagSafe: 'MagSafe Compatible',
    cardSpecsLeather: '100% Genuine Leather',

    // Cart Drawer
    cartTitle: 'Your Shopping Cart',
    cartEmptyTitle: 'Your cart is currently empty',
    cartEmptySubtitle: 'Explore our phone case and leather wallet collections and pick your favorite style.',
    cartEmptyExploreBtn: 'Browse Catalog Now',
    cartItemsCount: 'items',
    cartCustomizationBadge: 'Personalized on Demand',
    cartCustomTextLabel: 'Custom Text:',
    cartFoilLabel: 'Foil Finish:',
    cartItemRemove: 'Remove',
    cartSummarySubtotal: 'Subtotal:',
    cartSummaryShipping: 'Delivery (Bosta):',
    cartSummaryTotal: 'Total to Pay:',
    cartCheckoutBtn: 'Proceed to Checkout ⚡',
    cartFreeShippingNote: '🚚 Free delivery in Egypt when ordering 2 or more items!',

    // Checkout Modal
    checkoutTitle: 'Checkout & Express Delivery',
    checkoutSubtitle: 'Enter your shipping address. Your order will be prepared and shipped within 24 - 48 hours via Bosta.',
    checkoutStepShipping: 'Recipient & Delivery Details',
    checkoutStepPayment: 'Payment Method & Order Summary',
    checkoutFullName: 'Full Name',
    checkoutFullNamePlaceholder: 'e.g. Michael Smith / Ahmed Ibrahim',
    checkoutPhone: 'Mobile Number (WhatsApp enabled)',
    checkoutPhonePlaceholder: '010XXXXXXXX or 011XXXXXXXX',
    checkoutGovernorate: 'Governorate / State',
    checkoutGovernorateSelect: 'Select governorate...',
    checkoutAddress: 'Detailed Street Address',
    checkoutAddressPlaceholder: 'Street, Building No., Apartment, Landmark...',
    checkoutNotes: 'Delivery Instructions (Optional)',
    checkoutNotesPlaceholder: 'e.g. Call 30 mins before arrival...',
    checkoutPromoLabel: 'Promotional Discount Code',
    checkoutPromoPlaceholder: 'Enter promo code (e.g. Dody15, mody)',
    checkoutPromoApply: 'Apply',
    checkoutPromoApplied: 'Promo code applied successfully! 🎉',
    checkoutPromoDiscount: 'Applied Discount:',
    checkoutPromoInvalid: 'Invalid or expired promo code',
    checkoutPaymentMethod: 'Select Preferred Payment Method',
    checkoutPaymentCod: 'Cash on Delivery (COD)',
    checkoutPaymentCodDesc: 'Inspect your order upon courier delivery and pay cash',
    checkoutPaymentInstapay: 'InstaPay / Mobile Wallet',
    checkoutPaymentInstapayDesc: 'Instant bank or Vodafone Cash transfer with fast confirmation',
    checkoutPaymentCard: 'Credit / Debit Card (Visa, MasterCard)',
    checkoutPaymentCardDesc: '100% Secure and encrypted checkout',
    checkoutOrderSummary: 'Order Invoice Summary',
    checkoutShippingFee: 'Shipping Fee to Address:',
    checkoutFreeShipping: 'Free 🎁',
    checkoutTotalToPay: 'Total Amount Due:',
    checkoutConfirmBtn: 'Confirm & Dispatch Order 🚀',
    checkoutConfirmProcessing: 'Processing order and generating Bosta airway bill...',
    checkoutSuccessTitle: 'Order Placed Successfully! 🎉',
    checkoutSuccessSubtitle: 'You will receive a WhatsApp tracking link as soon as Bosta picks up the parcel.',
    checkoutOrderNumber: 'Order Reference ID:',
    checkoutCloseBtn: 'Back to Store',

    // Customizer Studio
    studioTitle: '3D Live Customization Studio',
    studioSubtitle: 'Design your case or wallet with tactile 3D relief or 24k liquid gold heat-foil embossing.',
    studioTabDevice: 'Device Model',
    studioTabStyle: 'Style & Material',
    studioTabText: 'Custom Text',
    studioTabFoil: 'Foil & Typography',
    studioCustomTextInputLabel: 'Enter your name or custom phrase:',
    studioCustomTextPlaceholder: 'e.g. NAQSH or your personal name...',
    studioSelectFontLabel: 'Typography Style:',
    studioSelectFoilLabel: 'Heat Foil Stamping Color:',
    studioFinishLabel: 'Case Finish:',
    studioAddToCartBtn: 'Confirm Design & Add to Cart 🛍️',
    studioCloseBtn: 'Close',
    studioPriceLabel: 'Price including personalization:',

    // Footer & Trust
    trustTitle: 'Why Discerning Customers Choose NAQSH?',
    trustFeature1Title: 'Military-Grade Drop Protection',
    trustFeature1Desc: 'Shock-absorbing dual-layer cases and vegetable-tanned genuine leather built to last.',
    trustFeature2Title: 'Japanese Tactile 3D UV Relief',
    trustFeature2Desc: 'Vibrant colors that never fade under sunlight, with rich embossed texture under your fingertips.',
    trustFeature3Title: 'Complimentary Royal Unboxing Box',
    trustFeature3Desc: 'Every order arrives in a rigid magnetic presentation box with ruby wax seal and velvet pouch.',
    trustFeature4Title: 'Fast Delivery & 100% Guarantee',
    trustFeature4Desc: 'Hassle-free inspection on delivery with a 14-day replacement guarantee.',
    footerRights: 'All Rights Reserved © NAQSH Platform',
    footerMadeWithLove: 'Crafted with precision & passion in Egypt 🇪🇬',

    // 24-Hour Public Beta Testing
    betaBadge: 'Public Beta Live (24h Window)',
    betaBannerTitle: '🚀 The store is now open to the public for a 24-Hour Beta Testing run before our official launch!',
    betaBannerSubtitle: 'Enjoy an exclusive 20% discount (Code: BETA24) + Free shipping and a complimentary VIP membership gift.',
    betaHours: 'Hours',
    betaMins: 'Mins',
    betaSecs: 'Secs',
    betaApplyCodeBtn: 'Copy & Apply BETA24 Code',
    betaFeedbackBtn: 'Beta Feedback & Perks 🎁',
    betaFeedbackTitle: 'Beta Testing Feedback & Bug Bounty Hub',
    betaFeedbackSubtitle: 'Your feedback shapes our platform! Report bugs or suggest designs to claim an instant 25% reward coupon + welcome gift.',
    betaFeedbackSuccess: 'Thank you for your valuable feedback! 150 Loyalty Points and your VIP gift code have been credited.',

    // Loyalty & Rewards Club
    navLoyalty: 'Loyalty & Rewards 👑',
    loyaltyTitle: 'NAQSH VIP Club & Rewards',
    loyaltySubtitle: 'Earn points on every order, redeem for instant cash discounts, and unlock exclusive handcrafted gifts.',
    loyaltyPointsLabel: 'Your Points Balance:',
    loyaltyPointsUnit: 'Loyalty Points',
    loyaltyDiscountEquivalent: 'Equivalent to a discount of',
    loyaltyTierLabel: 'Current Membership Tier:',
    loyaltyTierSilver: 'Silver Tier (Starter)',
    loyaltyTierGold: 'Gold VIP Tier',
    loyaltyTierDiamond: 'Black Diamond VIP',
    loyaltyRedeemAtCheckout: 'Redeem points for direct discount in cart & checkout',
    loyaltyHowItWorks: 'Every 100 loyalty points = 50 EGP ($1.6) instant discount on any order!',

    // Membership Gifts
    membershipGiftsTitle: 'Exclusive Welcome Membership Gifts 🎁',
    membershipGiftsSubtitle: 'Pick your free complimentary welcome gift to be included with your order at zero charge:',
    giftKeychainName: 'Monogrammed Genuine Italian Leather Keychain',
    giftKeychainDesc: 'Handcrafted genuine leather keychain stamped with your custom embossed initial in metallic foil.',
    giftBoxUpgradeName: 'Royal Wax-Sealed Presentation Box Upgrade',
    giftBoxUpgradeDesc: 'Rigid magnetic gift box lined with midnight black velvet, sealed with crimson wax and gift card.',
    giftCareKitName: 'Leather & Japanese UV Finish Care Kit',
    giftCareKitDesc: 'Specialized formula preserving UV vibrancy, natural leather conditioning balm and microfiber cloth.',
    giftSelected: 'Selected for your order ✨',
    giftSelect: 'Select this gift for free',

    // Referral Win-Win Program
    referralTitle: 'Dual Win-Win Referral Program 🤝',
    referralSubtitle: 'Share your code or link with friends: Your friend gets an extra 15% discount, and you earn 100 EGP cash credit / 200 points on their first completed purchase!',
    referralYourCode: 'Your Personal Referral Code:',
    referralCopyBtn: 'Copy Code & Referral Link',
    referralCopied: 'Link & Code Copied!',
    referralShareWhatsapp: 'Share on WhatsApp',
    referralShareTelegram: 'Share on Telegram',
    referralFriendPerk: 'Friend Receives: Extra 15% instant discount on all products',
    referralYourPerk: 'You Receive: 100 EGP store credit or 200 Loyalty Points',
    referralStatsTitle: 'Your Successful Referral Stats:',
    referralStatsCount: 'Friends who ordered:',
    referralStatsEarned: 'Total referral earnings:',

    // Badges & Gamification Milestones
    tabBadges: 'Badges & Achievements 🎖️',
    badgesTitle: 'NAQSH Honor Badges & Milestones',
    badgesSubtitle: 'Unlock royal achievement badges, collect rare medals, and earn bonus loyalty points and privileges!',
    badgesProgressLabel: 'Badges Mastery:',
    badgesUnlockedCount: 'Badges Unlocked',
    badgesTotalReward: 'Total Badge Rewards Earned:',
    badgesClaimReward: 'Claim Reward Points',
    badgesCompleted: 'Milestone Completed ✓',
    badgesInProgress: 'In Progress',
    badgesFilterAll: 'All Badges',
    badgesFilterUnlocked: 'Unlocked',
    badgesFilterLocked: 'Locked',
  },
};
