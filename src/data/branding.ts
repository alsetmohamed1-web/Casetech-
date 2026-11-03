export interface BrandColor {
  nameAr: string;
  nameEn: string;
  hex: string;
  role: string;
  description: string;
}

export interface UnboxingItem {
  id: string;
  stepNumber: number;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  descriptionAr: string;
  icon: string;
  tagAr: string;
  materialAr: string;
  unboxingTipAr: string;
}

export interface SocialAdTemplate {
  id: string;
  audienceCategory: string;
  format: 'story' | 'feed' | 'reel';
  hookHeadlineAr: string;
  bodyCopyAr: string;
  callToActionAr: string;
  recommendedAudienceAr: string;
  visualDirectionAr: string;
  taglineAr: string;
  estimatedRoas: string;
}

export const BRAND_IDENTITY = {
  brandNameAr: 'كيستيك | CaseTech',
  brandNameEn: 'CaseTech Smart Cases & Protection',
  taglineAr: 'حماية ذكية.. وتصاميم تواكب شخصيتك',
  taglineEn: 'Next-Gen Smart Protection · Infinite Personalized Styles',
  mascotNameAr: 'تيك شيلد | TechShield (تميمة درع الحماية الذكي)',
  mascotDescriptionAr: 'درع هندسي مستقبلي يدمج حواف الكفر الصدمات مع عدسة الكاميرا الذكية وحرفي CT المتوهجين بنبضات النيون.',
  foundedYear: '2024',
  originCity: 'القاهرة · جمهورية مصر العربية',
  printTechnology: 'ماكينات UV مسطحة يابانية 1200 DPI + حفر ليزري فايبر ومواد ماج سيف وكاربون فايبر عسكرية',
  colors: [
    {
      nameAr: 'أسود كربون أوبسيديان (Obsidian Carbon)',
      nameEn: 'Obsidian Carbon',
      hex: '#090D16',
      role: 'اللون الأساسي للكفرات وخلفيات الدروع الفاخرة',
      description: 'يعطي متانة وعمقاً بصرياً فائقاً يبرز تفاصيل الطباعة الـ UV ولمعان الخامات.',
    },
    {
      nameAr: 'سيان نيون ذكي (Cyber Cyan)',
      nameEn: 'Cyber Cyan',
      hex: '#06B6D4',
      role: 'لون الإضاءة الذكية والتميمة التكنولوجية ولمسات الماج سيف',
      description: 'يرمز لسرعة التكنولوجيا الحديثة وحلقات الشحن اللاسلكي ودقة الليزر.',
    },
    {
      nameAr: 'بنفسجي كهربائي (Electric Violet)',
      nameEn: 'Electric Violet',
      hex: '#8B5CF6',
      role: 'لون تدرجات التميمة والتصاميم العصرية والأنمي',
      description: 'يخلق تدرجاً مبتكراً فريداً للعلامة يلفت الانتباه ويمنح إحساس التفرد والشبابية.',
    },
    {
      nameAr: 'عنبر ناري متوهج (Cyber Amber)',
      nameEn: 'Cyber Amber',
      hex: '#F59E0B',
      role: 'لون أزرار الشراء الفوري وخصومات السرعة',
      description: 'يحقق أعلى معدل تحويل وإتمام شراء مع توجيه العين فوراً لأزرار التخصيص السريع.',
    },
    {
      nameAr: 'رمادي دروع تيتانيوم (Titanium Armor)',
      nameEn: 'Titanium Armor',
      hex: '#1E293B',
      role: 'لون حواف امتصاص الصدمات وحماية الكاميرات',
      description: 'يوفر إحساس المتانة العسكرية ضد السقوط من ارتفاع 3 أمتار.',
    },
  ] as BrandColor[],
  
  typographyAr: {
    displayFont: 'خط الثلث والديواني الملكي (للعناوين والأختام)',
    bodyFont: 'خط القاهرة / الكوفي العصري (للقراءة السلسة وتفاصيل المنتجات)',
    engravingOptions: ['خط ديواني مذهب', 'خط ثلث مركب', 'كوفي هندسي', 'رقعة حديث', 'Serif إنجليزي فخم'],
  },

  unboxingPackaging: {
    heroImage: '/src/assets/images/luxury_unboxing_box_1793495649649.jpg',
    headlineAr: 'تجربة فتح الصندوق الإبداعية.. المفاجأة تبدأ من لحظة الاستلام',
    subheadlineAr: 'صممنا التغليف ليجعل من لحظة استلام الطلب تجربة سينمائية مبهرة تستحق التصوير والمشاركة على تيك توك وإنستجرام!',
    items: [
      {
        id: 'box-rigid',
        stepNumber: 1,
        titleAr: 'علبة الهدايا الصلبة المغناطيسية (Rigid Magnetic Box)',
        titleEn: 'Soft-Touch Matte Black Magnetic Box',
        subtitleAr: 'كرتون مقوى فاخر 1200 جم مع إغلاق مغناطيسي خفي',
        descriptionAr: 'ملمس مخملي مطفي ناعم كالحرير (Soft-Touch Lamination) مع شعار "نَقْش" محفور بتقنية الختم الحراري الذهبي البارز (Gold Hot Foil)، تقاوم الصدمات أثناء الشحن وتمنح شعور الهدية الملكية.',
        icon: 'package',
        tagAr: 'كرتون مقوى 1200 GSM',
        materialAr: 'خامات بيئية معالجة بملمس حريري',
        unboxingTipAr: 'صوت إغلاق المغناطيس المكتوم يعطي انطباعاً فورياً بالفخامة والجودة العالية.',
      },
      {
        id: 'wax-seal',
        stepNumber: 2,
        titleAr: 'ختم شمعي ياقوتي أصلي يدوياً (Hand-Poured Ruby Wax Seal)',
        titleEn: 'Custom Royal Wax Seal & Satin Ribbon',
        subtitleAr: 'شريط ستان عنابي مدموغ بختم الشمع الكلاسيكي لشعار البراند',
        descriptionAr: 'كل علبة تُختم يدوياً في ورشتنا بشمع بريطاني مرن مقاوم للكسر يحمل وسم "نَقْش"، ليقوم العميل بفض الختم بنفسه كما كان يفعل الملوك والنبلاء قديماً.',
        icon: 'stamp',
        tagAr: 'ختم يدوي 100%',
        materialAr: 'شمع مرن بلون الياقوت الملكي',
        unboxingTipAr: 'العميل يستمتع بكسر الختم الشمعي وتصويره بتقنية السلو موشن لنشرها كـ Reel.',
      },
      {
        id: 'velvet-pouch',
        stepNumber: 3,
        titleAr: 'جراب الحماية المخملي مع خيط ذهبي (Microfiber Velvet Pouch)',
        titleEn: 'Luxury Velvet Protection & Cleaning Pouch',
        subtitleAr: 'كيس قطيفة أسود فخم لحفظ الكفر أو المحفظة',
        descriptionAr: 'مبطن بألياف مايكروفايبر فائقة النعومة لحماية الكفر من أي احتكاك، ويُستخدم كجراب إضافي لحفظ الهاتف داخل الحقيبة أو لتلميع الشاشة والكاميرا باستمرار.',
        icon: 'shield-check',
        tagAr: 'قماش مايكروفايبر مزدوج',
        materialAr: 'قطيفة سويسرية سوداء مع حبل مذهب',
        unboxingTipAr: 'يبقى مع العميل شهوراً ويذكره دائماً ببراند "نَقْش".',
      },
      {
        id: 'nfc-card',
        stepNumber: 4,
        titleAr: 'بطاقة الضمان والتوثيق الذكية NFC & QR (Smart Guarantee Card)',
        titleEn: 'Gold Metal/Gloss NFC Authenticity Card',
        subtitleAr: 'شريحة رقمية مشفرة لتوثيق أصلية القطعة وتاريخ تصنيعها بالليزر',
        descriptionAr: 'بطاقة سوداء بطلاء ذهبي براق تحتوي على رقاقة NFC وكود QR؛ بمجرد أن يلمس العميل هاتفه للبطاقة، تفتح له صفحة شهادة الأصالة ورسالة ترحيب مخصصة باسمه مع زر لتتبع الضمان.',
        icon: 'cpu',
        tagAr: 'شريحة NFC ذكية',
        materialAr: 'بلاستيك أسود مطفي مع حواف مطلية بالذهب',
        unboxingTipAr: 'تثبت للعميل أن قطعه ليست مجرد جراب عادي، بل عمل فني مخصص له وحده.',
      },
      {
        id: 'scented-letter',
        stepNumber: 5,
        titleAr: 'خطاب إهداء مخصص معطر بنفحات العود الملكي (Scented Personal Letter)',
        titleEn: 'Personalized Parchment Letter with Royal Oud Scent',
        subtitleAr: 'رسالة مكتوبة بالاسم على ورق بردي إيطالي معطر',
        descriptionAr: 'نطبع اسم المشتري أو العبارة الترويجية على ورق مقوى معطر بلمسة خاصة من العود الملكي، لتفوح رائحة زكية بمجرد فتح الصندوق تأسِر الحواس.',
        icon: 'sparkles',
        tagAr: 'عطر عود ملكي هادئ',
        materialAr: 'ورق قطني طبيعي 300 جم',
        unboxingTipAr: 'التجربة الحسية بالرائحة تدوم وتخلق رابطاً عاطفياً إيجابياً لا يُنسى مع متجرك.',
      },
      {
        id: 'free-stickers',
        stepNumber: 6,
        titleAr: 'باقة ستيكرات بارزة 3D هدية مجانية (Surprise 3D Sticker Pack)',
        titleEn: 'Surprise UV Dimensional Sticker Gift',
        subtitleAr: '3 ملصقات إضافية لشخصية الأنمي أو النادي أو النجم المختار',
        descriptionAr: 'مفاجأة غير معلنة يجدها العميل داخل العلبة: ستيكرات UV بارزة ثلاثية الأبعاد مضادة للماء تناسب اللابتوب أو زجاجة المياه أو السيارة تزيد من بهجة الاستلام.',
        icon: 'gift',
        tagAr: 'هدية مجانية 100%',
        materialAr: 'فينيل UV ثلاثي الأبعاد مضاد للماء',
        unboxingTipAr: 'العنصر المفاجئ يرفع من نسبة تقييمات 5 نجوم ويعزز الشراء المتكرر!',
      },
    ] as UnboxingItem[],
  },

  socialAdTemplates: [
    {
      id: 'ad-anime',
      audienceCategory: 'عشاق الأنمي والمانغا (Attack on Titan, One Piece, Naruto)',
      format: 'story',
      hookHeadlineAr: 'جرابك العادي مش معبر عن شخصيتك؟ شوف البروز الـ 3D ده! ⚡',
      bodyCopyAr: 'أقوى كفرات الأنمي اليابانية مطبوعة بتقنية UV بارزة الملمس مع تفاصيل هولوغرافية تتألق مع الضوء. حماية صدمات عسكرية مع دعم MagSafe كامل. اطلبه الآن باسمك أو اسم شخصيتك المفضلة وتوصيل سريع لباب بيتك مع علبة هدايا ملكية وختم شمعي!',
      callToActionAr: 'خصص كفر الأنمي الخاص بك الآن واستفد من كود Dody15',
      recommendedAudienceAr: 'الشباب والفتيات 16-32 سنة، المهتمين بالأنمي والكوميكس وألعاب الفيديو',
      visualDirectionAr: 'فيديو مقرب 9:16 يوضح لمس الأصابع لبروز الـ 3D لكفر إيتاتشي أو لوفي مع لمعان الضوء على الهولوغرام.',
      taglineAr: 'لأن بطل الأنمي يستحق درعاً حقيقياً!',
      estimatedRoas: '4.8x ROAS',
    },
    {
      id: 'ad-football',
      audienceCategory: 'عشاق كرة القدم (ميسي، رونالدو، صلاح، الأهلي، الزمالك، ريال مدريد)',
      format: 'feed',
      hookHeadlineAr: 'أنت من أي جيل؟ أساطير الذهب والقميص رقم 10 في جيبك! ⚽🏆',
      bodyCopyAr: 'كفرات أساطير كرة القدم والأندية الكبرى بطباعة مذهبة بارزة من ألياف الكربون وخياطة ليزر حقيقية. احفر اسمك بجوار رقم أسطورتك المفضلة أو شعار ناديك الأبدي. ضمان سنتين ضد الخدش أو بهتان الألوان وتغليف هدايا يفاجئ أي شخص تهديه له!',
      callToActionAr: 'تسوق تشكيلة أساطير الكرة مع شحن سريع ومعاينة حية',
      recommendedAudienceAr: 'عشاق دوري الأبطال والدوري المصري والسعودي والأوروبي (رجال وشباب 18-45 سنة)',
      visualDirectionAr: 'صورة كاروسيل تبدأ بكفر ميسي/رونالدو المذهب بجوار علبة الهدايا والختم الشمعي الملكي.',
      taglineAr: 'رمز البطولة والانتماء أينما ذهبت',
      estimatedRoas: '5.2x ROAS',
    },
    {
      id: 'ad-egypt-tarab',
      audienceCategory: 'أساطير الفن والموسيقى الكلاسيكية (أم كلثوم، عبد الحليم، عادل إمام، أحمد زكي)',
      format: 'reel',
      hookHeadlineAr: 'نغم وسينما زمان.. قطعة فنية تفيض أصالة وهيبة 🎵🎬',
      bodyCopyAr: 'كفرات ومحافظ من الجلد الطبيعي الإيطالي محفورة بالليزر لكوكب الشرق، العندليب الأسمر، والزعيم عادل إمام. ملمس الجلد الطبيعي مع رائحة الدباغة الأصلية وخط ديواني مذهب يحمل مقطوعاتك الغنائية المفضلة. الهدية المثالية لأصحاب الذوق الرفيع.',
      callToActionAr: 'اقتنِ قطعة من التراث المصري الأصيل - اضغط للطلب الفوري',
      recommendedAudienceAr: 'أصحاب الذوق الرفيع، عشاق الطرب الأصيل والزمن الجميل، الباحثين عن هدايا كبار الشخصيات (24-55 سنة)',
      visualDirectionAr: 'مقطع ريلز هادئ مع موسيقى أنت عمري، وتصوير لماكينة الليزر وهي تحفر بالدقة على الجلد البني الفاخر.',
      taglineAr: 'طرب خالد.. وفن يعيش في تفاصيلك اليومية',
      estimatedRoas: '4.4x ROAS',
    },
    {
      id: 'ad-luxury-gifts',
      audienceCategory: 'الهدايا الفاخرة وتجربة فتح الصندوق (Unboxing Wow Factor)',
      format: 'story',
      hookHeadlineAr: 'مش مجرد كفر هاتف.. دي تجربة هدية تكنولوجية تبهر أي شخص يفتحها! 🎁✨',
      bodyCopyAr: 'كل أوردر يوصلك في علبة صلبة فاخرة بمغناطيس خفي، مختومة يدوياً بشمع ياقوتي ملكي وشريط ستان، مع جراب قطيفة وبطاقة ضمان NFC ذكية وخطاب إهداء معطر بالعود. اكتب اسمه أو أول حروفه وشوف فرحته لحظة الاستلام!',
      callToActionAr: 'اطلب هديتك المخصصة الآن مع كود خصم Dody15',
      recommendedAudienceAr: 'المقبلين على مناسبات وأعياد ميلاد وذكرى زواج وتخرج في مصر والخليج والعالم',
      visualDirectionAr: 'فيديو فتح الصندوق (Unboxing ASMR): فتح المغناطيس -> كسر الختم الشمعي -> فك القطيفة -> ابتسامة الانبهار.',
      taglineAr: 'الهدية التي لا تُنسى',
      estimatedRoas: '6.1x ROAS',
    },
    {
      id: 'ad-us-diaspora-gold',
      audienceCategory: 'الجاليات العربية في أمريكا وأوروبا وكندا (USA, UK & EU Diaspora)',
      format: 'story',
      hookHeadlineAr: 'Your Name in 24K Gold Arabic Calligraphy with Military-Grade Protection 🇺🇸✨',
      bodyCopyAr: `Stop buying generic clear cases that turn yellow in 2 weeks!
CaseTech delivers handcrafted Arabic Calligraphy phone cases with 3D tactile nano-relief, aerospace drop protection, and ultra-strong N52 MagSafe.
Personalized with your custom name or initials in elegant Diwani, Kufic, or Thuluth script.

✈️ Fast 3-5 days delivery to the USA, UK, Germany & France via DHL Express.
🛡️ 100% Satisfaction & money-back guarantee.
💳 Instant 1-Touch Checkout with Apple Pay, Google Pay, PayPal & Klarna.
Use Code: DODY15 for 15% OFF today!`,
      callToActionAr: 'Order Your Custom Arabic Case Now — Free US/EU Express Shipping on 2+ Items',
      recommendedAudienceAr: 'Arab Americans & MENA diaspora in Dearborn/Detroit, New York, Los Angeles, Chicago, London, Paris, Berlin, Toronto (18-40 yrs)',
      visualDirectionAr: 'Macro 9:16 video showing finger tracing over the 3D raised gold calligraphy, snapping onto an Apple MagSafe charger with a crisp sound effect.',
      taglineAr: 'Wear Your Heritage with Next-Gen Tech Protection',
      estimatedRoas: '5.8x ROAS',
    },
    {
      id: 'ad-us-drop-test',
      audienceCategory: 'عشاق التكنولوجيا والآيفون وسامسونج في أمريكا وأوروبا (US/EU Techies)',
      format: 'reel',
      hookHeadlineAr: 'Drop-tested from 10ft onto concrete. Casetify quality, half the price! 💥🔨',
      bodyCopyAr: `Why spend $85 on a phone case?
CaseTech provides military-grade shockproof air-cushion corners, high-precision 1:1 camera protection, and Japanese 3D UV tactile prints that never peel or fade.
Available for iPhone 16 Pro Max, Samsung S24 Ultra, Google Pixel & Xiaomi.

📦 Zero customs delay — Dispatched from our local US & EU hubs.
⚡ 2-4 Days Express delivery via DHL & FedEx.
🎁 Free shipping on orders over $45 + 15% OFF with code DODY15.`,
      callToActionAr: 'Shop CaseTech Military Grade Cases — Apple Pay & 30-Day Money Back Guarantee',
      recommendedAudienceAr: 'US, UK & Canada Tech enthusiasts, iPhone 16 & Galaxy S24 users, Casetify & OtterBox buyers (Ages 18-35)',
      visualDirectionAr: 'High-energy fast-paced drop test from head height onto concrete slab, picking up the phone unscratched with instant zoom-in on corner bumper cushions.',
      taglineAr: 'Unmatched Drop Protection. Fair Price.',
      estimatedRoas: '4.9x ROAS',
    },
  ] as SocialAdTemplate[],

  // Standalone Vector Assets for Marketing, Ads Agencies & Social Teams
  logoAssets: {
    fullLogoSvgUrl: '/casetech-logo.svg',
    shieldIconSvgUrl: '/casetech-shield-icon.svg',
    brandGuideDownloadUrl: '/casetech-logo.svg',
    primaryColors: [
      { name: 'Cyber Cyan', hex: '#06B6D4', rgb: 'rgb(6, 182, 212)', usage: 'الإضاءة الذكية والماج سيف' },
      { name: 'Electric Violet', hex: '#8B5CF6', rgb: 'rgb(139, 92, 246)', usage: 'التدرجات والهوية الشبابية والأنمي' },
      { name: 'Cyber Amber', hex: '#F59E0B', rgb: 'rgb(245, 158, 11)', usage: 'أزرار الشراء والعروض الفورية' },
      { name: 'Obsidian Carbon', hex: '#090D16', rgb: 'rgb(9, 13, 22)', usage: 'الخلفيات الداكنة والدروع المصفحة' },
    ],
    typography: 'Cairo ExtraBold (Arabic) + Plus Jakarta Sans Bold (Latin)',
    dimensions: 'Vector Scalable (640x180 px horizontal, 200x200 px square emblem)',
  },

  // Lowest-CAC & Highest-ROI Growth Tactics (أنسب الطرق وأوفرها وأكثرها فاعلية للتسويق)
  marketingGrowthTactics: [
    {
      id: 'tactic-asmr-reels',
      titleAr: 'محتوى الـ ASMR العضوي وفيديوهات اختبار السقوط (Zero/Low Ad Spend)',
      titleEn: 'Organic Drop-Test ASMR & Satisfying UV Laser Reels',
      badgeAr: 'الأعلى فاعلية والأقل تكلفة 🚀',
      cacLevel: 'أقل من 10 إلى 15 ج.م للعميل (أو مجاني عضوي)',
      roiMultiplier: '7x إلى 12x ROAS',
      summaryAr: 'تصوير فيديوهات قصيرة مقربة (9:16) تُظهر اختبار رمي الهاتف من ارتفاع 3 أمتار على الرخام بكفر CaseTech المقاوم، وتصوير ماكينة الـ UV اليابانية وهي تطبع الاسم أو شخصية الأنمي مع لمعان البروز الـ 3D. هذا المحتوى يحصل على ملايين المشاهدات في مصر والعالم دون دفع إعلانات!',
      executionStepsAr: [
        'تسجيل 10 فيديوهات ASMR أسبوعياً لصوت كسر الختم الشمعي وفتح مغناطيس العلبة.',
        'استخدام خطاف بصري (Hook) في أول 2 ثانية: «هل كفر بـ 400 جنيه يحمي آيفون بـ 70 ألف؟ شوف التجربة!»',
        'تشغيل Spark Ads على أفضل الفيديوهات العضوية بميزانية تجريبية 5-10 دولار فقط يومياً.',
      ],
    },
    {
      id: 'tactic-micro-influencers',
      titleAr: 'برنامج إهداء المؤثرين الصغار (Micro-Influencer Gifting Barter)',
      titleEn: 'Zero-Cash Gifting to 50 Tech, Gaming & Lifestyle Creators',
      badgeAr: 'عائد موثوق وتأثير نفسي قوي 🎁',
      cacLevel: 'تكلفة التصنيع فقط (حوالي 120 ج.م للقطعة)',
      roiMultiplier: '8x ROAS',
      summaryAr: 'إرسال كفر مخصص فاخر مجاناً لـ 50 صانع محتوى في مجالات الجيمنج، التقنية، الفاشون، وطلاب الجامعات (من 10k إلى 50k متابع)، محفور عليه اسمهم أو قناتهم بالذهب مع العلبة الشمعية الفاخرة. 90% منهم ينشرون Stories و Unboxing بدافع الانبهار بالهدية دون طلب مقابل مادي!',
      executionStepsAr: [
        'تحديد 50 صانع محتوى لديهم تفاعل عالي وجمهور شبابي مستهدف في القاهرة والإسكندرية والمنصورة.',
        'تجهيز علبة VIP عليها اسم المؤثر وختم شمعي أحمر مع كارت إهداء شخصي مكتوب بخط عربي مذهب.',
        'منح المؤثر كود خصم مخصص لمتابعيه (خصم 15% مثل Dody15) مع عمولة نقاط أو كاش لكل عملية شراء.',
      ],
    },
    {
      id: 'tactic-whatsapp-bot',
      titleAr: 'روبوت واتساب للمعاينة الحية وإتمام الطلب (WhatsApp Direct Commerce)',
      titleEn: 'Automated 1-Click WhatsApp Live Mockup & COD Closing',
      badgeAr: 'أعلى معدل تحويل وإتمام شراء ⚡',
      cacLevel: 'مجاني للعملاء المحتملين',
      roiMultiplier: 'معدل إتمام 38% مقابل 3% في المتاجر التقليدية',
      summaryAr: 'في مصر والشرق الأوسط، معدل فتح رسائل واتساب يتجاوز 98%. نضع زر واتساب سريع يتيح للعميل كتابة اسمه ونوع هاتفه، فيرسل له الروبوت صورة فورية للكفر باسمه خلال 5 ثوانٍ، مع زر للتأكيد الفوري والدفع عند الاستلام مع المعاينة قبل الدفع.',
      executionStepsAr: [
        'ربط زر المحادثة الفورية برابط التخصيص السريع.',
        'إرسال صور وتجارب عملاء حقيقيين بالفيديو لبناء الثقة الكاملة ضد التردد.',
        'تأكيد عنوان الشحن وموعد الاستلام عبر بوسطة لخفض نسبة المرتجعات لأقل من 4%.',
      ],
    },
    {
      id: 'tactic-dropship-affiliates',
      titleAr: 'شبكة المسوقين والدروب شيبينغ للطلبة ومحلات الموبايل (Zero-Risk B2B/B2C)',
      titleEn: 'Zero-Risk Affiliate & Mobile Shop Dropship Network',
      badgeAr: 'توسع ذاتي بدون مصاريف تسويق 🤝',
      cacLevel: '0 ج.م مسبقاً (دفع بالعمولة عند البيع الفعلي)',
      roiMultiplier: 'أرباح مستدامة ونمو تلقائي',
      summaryAr: 'تمكين الشباب ومحلات الإكسسوارات من بيع كفرات CaseTech دون الحاجة لشراء بضاعة أو مخزون. هم يجمعون الطلبات بربح 150-250 ج.م في القطعة، ونحن نتولى الطباعة والتغليف الفاخر والشحن للعميل مباشرة باسمهم (White-Label)!',
      executionStepsAr: [
        'إطلاق صفحة تسجيل المسوقين برابط إحالة وكود خصم خاص لكل مسوق.',
        'توفير كتالوج صور وفيديوهات إعلانية عالية الدقة جاهزة للنشر على صفحاتهم وستورياتهم.',
        'تحويل الأرباح للمسوقين أسبوعياً عبر إنستاباي أو فودافون كاش فور تسليم الأوردر للعميل.',
      ],
    },
  ],

  // Comprehensive US & EU Expansion Feasibility Study & Strategy (دراسة دخول السوق الأمريكي والأوروبي)
  expansionStudy: {
    executiveSummaryAr: 'دراسة جدوى استراتيجية متكاملة لدخول سوق كفرات الهواتف الفاخرة والمخصصة في الولايات المتحدة الأمريكية والاتحاد الأوروبي. يتميز هذا السوق بقدرة شرائية ضخمة وقبول استثنائي لأسعار تتراوح بين 45 و 65 دولاراً للكفر الواحد (مقارنة بـ 10-15 دولار في مصر)، ما يحقق أرباحاً صافية تتجاوز 400% لكل طلب، خاصة مع الاستفادة من ميزة الخط العربي المذهب وتصاميم الحماية التكنولوجية الفريدة.',
    marketSizeUSD: '12.8 مليار دولار سنوياً في أمريكا وأوروبا لكفرات الهواتف المخصصة',
    targetPriceUS_EU: '$45 - $65 USD (€42 - €60 EUR)',
    cairoCostUSD: '$10 - $14 USD (تكلفة التصنيع والشحن المحلي)',
    netMarginPerUnitUSD: '$35 - $50 USD (هامش ربح صافٍ 70% - 80%)',
    strategicPillars: [
      {
        titleAr: 'الميزة التنافسية الفاصلة (Unique Selling Proposition)',
        detailAr: 'الأسواق الغربية مشبعة بالكفرات البلاستيكية التقليدية من Casetify و Burga. ميزتنا الحصرية هي: الخط العربي الملكي المحفور بالذهب عيار 24، دروع الحماية التكنولوجية العسكرية MagSafe بأسعار أقل بـ 30% من كاسيتيفاي، مع بروز طباعة 3D يابانية نادرة هناك.',
      },
      {
        titleAr: 'شريحة العملاء الأكثر طلباً واستهدافاً (Target Demographics)',
        detailAr: '1) الجاليات العربية والشرق أوسطية في أمريكا وأوروبا (أكثر من 7.5 مليون نسمة في ديترويت، لوس أنجلوس، نيوجيرسي، لندن، باريس، وبرلين) يبحثون بشغف عن كفرات فاخرة تحمل أسماءهم بحرفية عربية أصيلة. 2) عشاق الفن الشرقي والتصاميم التكنولوجية من الجمهور الغربي العام.',
      },
      {
        titleAr: 'بنية الشحن والتصنيع الذكية (Hybrid Fulfillment Blueprint)',
        detailAr: 'الاعتماد على نموذج هجين ذكي: للكفرات المطبوعة بالـ UV، يتم الربط مع منصات Print-on-Demand محلية في ألمانيا وبريطانيا وتكساس (مثل Gelato / Prodigi) لتسليم الطلب خلال 2-4 أيام عمل بدون جمارك. وللمحافظ الجلدية الأصلية والذهب المسبوك يدوياً، يتم الشحن السريع المباشر من مصر عبر DHL Express خلال 48-72 ساعة.',
      },
      {
        titleAr: 'بوابات الدفع والامتثال القانوني والضريبي (Fintech & Compliance)',
        detailAr: 'تفعيل بوابة Stripe لدعم الدفع المباشر عبر Apple Pay و Google Pay و Klarna (الدفع بالتقسيط) وبطاقات Visa/Mastercard. الالتزام بنظام ضريبة القيمة المضافة الأوروبي (EU IOSS) لتمرير الشحنات دون احتجاز جمركي، والامتثال لقوانين حماية البيانات العامة (GDPR).',
      },
      {
        titleAr: 'خطة الإطلاق التدريجي على 3 مراحل (3-Stage GTM Roadmap)',
        detailAr: 'المرحلة 1: إطلاق حملات تيك توك شوب وإنستجرام لاستهداف الجاليات العربية في لندن وديترويت. المرحلة 2: التعاون مع مؤثرين تقنيين أجانب لمراجعة كفرات CaseTech واختبار السقوط مع الآيفون وسامسونج. المرحلة 3: التوسع في متاجر أمازون أمريكا وأوروبا (Amazon FBA) لتوفير شحن برايم خلال 24 ساعة.',
      },
    ],
    financialComparisonTable: [
      { metricAr: 'سعر البيع للمستهلك', egyptValue: '450 - 650 ج.م (~$9 - $13)', usEuValue: '$49 - $65 USD (~2,400 - 3,200 ج.م)' },
      { metricAr: 'تكلفة التصنيع والخامات', egyptValue: '120 - 180 ج.م (~$2.5 - $3.5)', usEuValue: '$11 - $14 USD (تصنيع محلي سريع)' },
      { metricAr: 'تكلفة الشحن والتوصيل', egyptValue: '45 - 65 ج.م (بوسطة إكسبريس)', usEuValue: '$5 - $8 USD (شحن محلي بأمريكا وأوروبا)' },
      { metricAr: 'صافي الربح للقطعة الواحدة', egyptValue: '280 - 400 ج.م (~$6 - $8)', usEuValue: '$33 - $46 USD (~1,600 - 2,300 ج.م)' },
      { metricAr: 'نسبة مضاعف الأرباح', egyptValue: 'الأساس (1x)', usEuValue: 'أكثر من 4x إلى 5x أضعاف الربح المحلي!' },
    ],
  },
};

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/casetech.eg',
  instagram: 'https://instagram.com/casetech.eg',
  tiktok: 'https://tiktok.com/@casetech.official',
  threads: 'https://threads.net/@casetech.eg',
  twitter: 'https://x.com/CaseTechEG',
  whatsapp: 'https://wa.me/201026541234',
  secondaryWhatsapp: 'https://wa.me/201508881456',
};

export const OFFICIAL_CONTACT_INFO = {
  phone: '+201026541234',
  phoneDisplay: '01026541234',
  secondaryPhone: '+201508881456',
  secondaryPhoneDisplay: '01508881456',
  whatsapp: '201026541234',
  whatsappDisplay: '+20 102 654 1234 (01026541234)',
  secondaryWhatsapp: '201508881456',
  secondaryWhatsappDisplay: '+20 150 888 1456 (01508881456)',
  email: 'support@casetech.eg',
  addressAr: 'شارع التسعين الشمالي، التجمع الخامس، القاهرة، مصر',
  commercialRegister: 'سجل تجاري رقم: 248910 (وزارة التموين والتجارة الداخلية)',
  taxCard: 'بطاقة ضريبية رقم: 618-402-991',
  social: SOCIAL_LINKS,
};

