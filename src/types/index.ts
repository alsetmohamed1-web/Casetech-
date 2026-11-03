export type ProductCategory =
  | 'all'
  | 'cases'
  | 'wallets'
  | 'new-arrivals'
  | 'bestsellers'
  | 'anime'
  | 'football'
  | 'egyptian-icons'
  | 'music-legends'
  | 'nature-calligraphy'
  | 'islamic-calligraphy'
  | 'aesthetic-florals'
  | 'cars-motorsport'
  | 'cosmic-galaxy'
  | 'trending-pop';

export type PhoneBrand =
  | 'Apple'
  | 'Samsung'
  | 'Xiaomi'
  | 'Google'
  | 'OnePlus'
  | 'Honor'
  | 'Huawei'
  | 'Oppo'
  | 'Realme';

export interface PhoneModel {
  id: string;
  name: string;
  brand: PhoneBrand;
  cameraLayout:
    | 'iphone-pro'
    | 'iphone-base'
    | 'samsung-vertical'
    | 'samsung-fold'
    | 'pixel-visor'
    | 'xiaomi-circle'
    | 'oneplus-corner-circle'
    | 'huawei-triangular';
  popularInEgypt?: boolean;
}

export type CaseFinish = 'tough' | 'matte' | 'magsafe' | 'leather';

export interface LeatherColor {
  id: string;
  nameAr: string;
  nameEn: string;
  hex: string;
  stitchHex: string;
  texture: string;
}

export type FoilType = 'gold' | 'silver' | 'blind' | 'white' | 'black' | 'neon-green' | 'cyber-pink';

export type FontStyle = 'diwani' | 'thuluth' | 'kufic' | 'ruqaa' | 'serif' | 'sans';

export interface CustomizationState {
  itemType: 'case' | 'wallet';
  productId: string;
  phoneModelId?: string;
  caseFinish?: CaseFinish;
  caseBaseColor?: string;
  leatherColorId?: string;
  customText: string;
  fontStyle: FontStyle;
  foilType: FoilType;
  position: 'bottom-right' | 'center' | 'bottom-center' | 'spine';
  fontSize: number;
  patternId?: string;
  uploadedImageUrl?: string;
}

export interface Product {
  id: string;
  category: 'cases' | 'wallets';
  theme?:
    | 'anime'
    | 'football'
    | 'egyptian-icons'
    | 'music-legends'
    | 'nature-calligraphy'
    | 'islamic-calligraphy'
    | 'aesthetic-florals'
    | 'cars-motorsport'
    | 'cosmic-galaxy'
    | 'trending-pop';
  themeNameAr?: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number; // Retail price in USD
  factoryCost: number; // Cost from manufacturer in USD
  image: string;
  secondaryImage?: string;
  featuresAr: string[];
  featuresEn: string[];
  tagAr: string;
  tagEn: string;
  isCustomizable: boolean;
  isNewArrival?: boolean;
  isBestseller?: boolean;
  salesCount?: number;
  rating?: number;
  reviewsCount?: number;
  reviews?: ProductReview[];
  compatibleDevices?: string[];
}

export interface SocialPost {
  id: string;
  platform: 'facebook' | 'tiktok' | 'instagram' | 'threads' | 'x';
  titleAr: string;
  contentAr: string;
  hashtags: string[];
  imageUrl: string;
  status: 'published' | 'scheduled' | 'draft';
  scheduledDate?: string;
  likesCount?: number;
  commentsCount?: number;
  sharesCount?: number;
  productTargetId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestedQuickReplies?: string[];
  recommendedProduct?: Product;
  actionCta?: {
    label: string;
    actionType: 'open_customizer' | 'open_checkout' | 'apply_promo' | 'open_tracking' | 'view_models' | 'contact_whatsapp';
    payload?: string;
  };
}

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1 to 5
  date: string;
  verifiedBuyer: boolean;
  modelPurchased?: string;
  comment: string;
  helpfulCount?: number;
}

export interface CartItem {
  cartId: string;
  product: Product;
  customization?: CustomizationState;
  quantity: number;
  unitPrice: number;
}

export type PaymentMethod =
  | 'cod'
  | 'card'
  | 'apple_pay'
  | 'google_pay'
  | 'paypal'
  | 'klarna'
  | 'instapay'
  | 'vodafone_cash'
  | 'etisalat_cash'
  | 'orange_cash'
  | 'mada';

export interface PaymentDetails {
  method: PaymentMethod;
  walletNumber?: string;
  instapayHandle?: string;
  transactionRef?: string;
  paymentProofUrl?: string;
  isPaid: boolean;
}

export interface NotificationLog {
  id: string;
  orderId: string;
  type: 'whatsapp' | 'sms' | 'email';
  recipient: string;
  sentAt: string;
  content: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: {
    country: string;
    city: string;
    street: string;
    notes?: string;
  };
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  discountCode?: string;
  discountPercent?: number;
  discountAmount?: number;
  paymentMethod: PaymentMethod;
  paymentDetails?: PaymentDetails;
  status: 'pending' | 'in_production' | 'quality_check' | 'shipped' | 'delivered';
  trackingNumber: string;
  courierName: string;
  factoryDispatchId: string;
  dropshipProfit: number;
  notesFromMerchant?: string;
  notifications?: NotificationLog[];
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  description: string;
  badgeLabel: string;
}

export type Currency = 'SAR' | 'EGP' | 'AED' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: Currency;
  symbolAr: string;
  symbolEn: string;
  rateFromUSD: number; // multiplier
}

export interface Supplier {
  id: string;
  nameAr: string;
  category: 'cases_wholesale' | 'leather_tannery' | 'packaging';
  phone: string;
  whatsapp: string;
  location: string;
  minOrderQty: number; // MOQ
  wholesalePriceEGP: number; // Sample blank price
  rating: number;
  notes: string;
  contactPerson: string;
}

export interface PrintShop {
  id: string;
  nameAr: string;
  machineType: string; // e.g. "ماكينة UV مسطحة Mimaki UJF-6042 + ليزر فايبر"
  location: string;
  phone: string;
  costPerPrintEGP: number;
  turnaroundHours: number;
  supportedLayers: string[]; // e.g. ["White Underlayer", "CMYK 1200 DPI", "Gloss Varnish 3D"]
  readyForBostaPickup: boolean;
}

export interface BostaShipment {
  orderId: string;
  orderNumber: string;
  bostaTrackingNumber: string;
  pickupAddress: string; // Print shop address
  dropoffAddress: string; // Customer address
  codAmountEGP: number;
  deliveryFeeEGP: number;
  status: 'pickup_requested' | 'picked_up' | 'in_transit' | 'delivered' | 'paid_to_merchant';
  estimatedDeliveryDate: string;
  payoutBatchDate?: string;
}

export interface MarketplaceChannel {
  id: 'amazon' | 'noon' | 'kenzz' | 'jumia' | 'tiktok_meta';
  nameAr: string;
  nameEn: string;
  logo: string;
  badge: string;
  commissionRate: string;
  payoutPeriod: string;
  fulfillmentType: string;
  activeListingsCount: number;
  monthlyReach: string;
}

export interface AffiliatePartner {
  id: string;
  name: string;
  channel: string; // e.g. TikTok, Instagram, Kenzz, Telegram
  code: string;
  discountPercent: number;
  commissionPercent: number;
  clicksCount: number;
  ordersCount: number;
  totalSalesUSD: number;
  pendingCommissionUSD: number;
  paidCommissionUSD: number;
  payoutMethod: 'instapay' | 'vodafone_cash' | 'bank_transfer';
  payoutDetails: string;
}

export interface ShippingLabelData {
  orderNumber: string;
  trackingNumber: string;
  courier: 'bosta' | 'amazon_easyship' | 'noon_express' | 'jumia_drop';
  sender: {
    brandName: string;
    hubAddress: string;
    phone: string;
  };
  recipient: {
    name: string;
    phone: string;
    city: string;
    street: string;
    notes?: string;
  };
  packageDetails: {
    itemsSummary: string;
    weightKg: number;
    fragile: boolean;
  };
  codAmount: number;
  currencySymbol: string;
  barcodeValue: string;
  createdAt: string;
}

export type Language = 'ar' | 'en';

export type LoyaltyTier = 'silver' | 'gold' | 'black_diamond';

export interface MembershipGift {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  valueEGP: number;
  unlocked: boolean;
  selected: boolean;
}

export interface LoyaltyAccount {
  points: number;
  tier: LoyaltyTier;
  lifetimeEarned: number;
  totalOrders: number;
  referralCode: string;
  successfulReferrals: number;
  referralCreditsEGP: number;
  selectedGiftId?: string;
  unlockedBadgeIds?: string[];
}

export interface AchievementBadge {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  tierColor: 'bronze' | 'silver' | 'gold' | 'emerald' | 'purple' | 'ruby';
  category: 'orders' | 'referrals' | 'collector' | 'beta' | 'vip';
  rewardPoints: number;
  progress: number;
  target: number;
  unitAr: string;
  unitEn: string;
  unlocked: boolean;
  unlockedDate?: string;
}

export type StaffRole = 'super_admin' | 'operations_manager' | 'site_viewer';

export interface StaffMember {
  id: string;
  name: string;
  emailOrPhone: string;
  role: StaffRole;
  passcode: string;
  permissions: {
    canEditProducts: boolean;
    canUploadMedia: boolean;
    canManageOrders: boolean;
    canViewFinancials: boolean;
    canManageStaff: boolean;
  };
  addedAt: string;
  lastActive: string;
  isActive: boolean;
}

export interface UploadedMediaItem {
  id: string;
  title: string;
  dataUrl: string;
  category: 'case' | 'wallet' | 'anime' | 'aesthetic' | 'football' | 'calligraphy' | 'general';
  tags: string[];
  addedAt: string;
  isUsedInStore?: boolean;
}
