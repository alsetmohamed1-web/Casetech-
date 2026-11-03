import React, { useState } from 'react';
import {
  X,
  Crown,
  Gift,
  Users,
  Copy,
  Check,
  Sparkles,
  Share2,
  Award,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Coins,
  ArrowRight,
  TrendingUp,
  Medal,
  Lock,
  Unlock,
  Trophy,
  Filter,
  Flame,
  Star,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { LoyaltyAccount, MembershipGift, Currency, AchievementBadge } from '../types';
import { CURRENCIES } from '../data/products';

interface LoyaltyAndReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  loyaltyAccount: LoyaltyAccount;
  onSelectGift: (giftId: string) => void;
  onRedeemPoints: (points: number) => void;
  onApplyReferralCode?: (code: string) => void;
  onBonusPointsAdded?: (points: number, reason: string) => void;
}

export const INITIAL_MEMBERSHIP_GIFTS: MembershipGift[] = [
  {
    id: 'gift-keychain',
    nameAr: 'ميدالية مفاتيح جلد طبيعي مخصصة بحرف اسمك',
    nameEn: 'Monogrammed Genuine Italian Leather Keychain',
    descriptionAr: 'ميدالية هاند ميد من أجود أنواع الجلود الإيطالية مع حفر حراري لحرفك بالذهب أو الفضة مجاناً.',
    descriptionEn: 'Handcrafted Italian leather keychain heat-stamped with your custom monogram in gold or silver foil.',
    icon: '🔑',
    valueEGP: 120,
    unlocked: true,
    selected: true,
  },
  {
    id: 'gift-box-upgrade',
    nameAr: 'ترقية علبة الهدايا الملكية بالختم الشمعي الأحمر',
    nameEn: 'Royal Wax-Sealed Presentation Box Upgrade',
    descriptionAr: 'علبة صلبة مغناطيسية فاخرة مبطنة بالمخمل الأسود ومختومة بختم شمعي قرمزي وكارت إهداء ملكي.',
    descriptionEn: 'Rigid magnetic presentation box lined with midnight black velvet, sealed with crimson wax & gift card.',
    icon: '🎁',
    valueEGP: 95,
    unlocked: true,
    selected: false,
  },
  {
    id: 'gift-care-kit',
    nameAr: 'باقة العناية بالجلود وطباعة UV مع شهادة الضمان',
    nameEn: 'Leather & UV Relief Care Kit + Warranty Certificate',
    descriptionAr: 'محلول مخصص للمحافظة على بروز وألوان طباعة UV وبلسم تغذية الجلود الطبيعية مع قماش ميكروفايبر.',
    descriptionEn: 'Specialized formula preserving UV vibrancy, natural leather conditioning balm and microfiber cloth.',
    icon: '✨',
    valueEGP: 85,
    unlocked: true,
    selected: false,
  },
];

export const LoyaltyAndReferralModal: React.FC<LoyaltyAndReferralModalProps> = ({
  isOpen,
  onClose,
  currency,
  loyaltyAccount,
  onSelectGift,
  onRedeemPoints,
  onApplyReferralCode,
  onBonusPointsAdded,
}) => {
  if (!isOpen) return null;

  const { language, t, isRtl } = useLanguage();
  const [activeTab, setActiveTab] = useState<'points' | 'gifts' | 'referral' | 'badges'>('points');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [friendCodeInput, setFriendCodeInput] = useState('');
  const [friendCodeApplied, setFriendCodeApplied] = useState(false);
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [unlockedToast, setUnlockedToast] = useState<{ name: string; points: number } | null>(null);

  // Gamification Badges Initial State & Sync
  const [badges, setBadges] = useState<AchievementBadge[]>(() => {
    return [
      {
        id: 'first-order',
        nameAr: 'أول خطوة ملكية (First Orderer)',
        nameEn: 'First Orderer',
        descriptionAr: 'إتمام أول أوردر لكفر هاتف أو محفظة جلدية هاند ميد مخصصة باسمك.',
        descriptionEn: 'Complete your first custom phone case or bespoke leather order.',
        icon: '🛍️',
        tierColor: 'bronze',
        category: 'orders',
        rewardPoints: 100,
        progress: loyaltyAccount.totalOrders > 0 ? 1 : 0,
        target: 1,
        unitAr: 'طلب',
        unitEn: 'order',
        unlocked: loyaltyAccount.totalOrders > 0,
        unlockedDate: loyaltyAccount.totalOrders > 0 ? '2026-11-01' : undefined,
      },
      {
        id: 'master-referrer',
        nameAr: 'سفير نقش الماسي (Master Referrer)',
        nameEn: 'Master Referrer',
        descriptionAr: 'ترشيح 3 أصدقاء أو أكثر بنجاح لمشاركتهم كود الخصم وإتمام أول طلب.',
        descriptionEn: 'Successfully refer 3 or more friends who make their first purchase.',
        icon: '🌟',
        tierColor: 'gold',
        category: 'referrals',
        rewardPoints: 300,
        progress: loyaltyAccount.successfulReferrals,
        target: 3,
        unitAr: 'أصدقاء',
        unitEn: 'friends',
        unlocked: loyaltyAccount.successfulReferrals >= 3,
        unlockedDate: loyaltyAccount.successfulReferrals >= 3 ? '2026-11-01' : undefined,
      },
      {
        id: 'collector',
        nameAr: 'جامع التحف الفنية (Collector)',
        nameEn: 'Artisanal Collector',
        descriptionAr: 'اقتناء وتخصيص 3 قطع فنية فريدة (كفرات UV بارزة ومحافظ جلدية إيطالية).',
        descriptionEn: 'Collect or personalize 3 unique artisanal cases or genuine leather pieces.',
        icon: '👑',
        tierColor: 'ruby',
        category: 'collector',
        rewardPoints: 250,
        progress: 1,
        target: 3,
        unitAr: 'قطع',
        unitEn: 'items',
        unlocked: false,
      },
      {
        id: 'beta-pioneer',
        nameAr: 'رائد الاختبار التجريبي (Beta Pioneer)',
        nameEn: 'Beta Pioneer',
        descriptionAr: 'المشاركة الفعالة في فترة الاختبار التجريبي المفتوح لمدة 24 ساعة قبل الإطلاق.',
        descriptionEn: 'Active participation during the exclusive 24-Hour Public Beta period.',
        icon: '🚀',
        tierColor: 'emerald',
        category: 'beta',
        rewardPoints: 150,
        progress: 1,
        target: 1,
        unitAr: 'مشاركة',
        unitEn: 'event',
        unlocked: true,
        unlockedDate: '2026-11-01',
      },
      {
        id: 'calligraphy-master',
        nameAr: 'خطاط الملوك (Calligraphy Connoisseur)',
        nameEn: 'Calligraphy Connoisseur',
        descriptionAr: 'تخصيص قطعة بنقوش الخط العربي وزخارف آيات قرآنية مع بصمة فويل ذهبي أو فضي.',
        descriptionEn: 'Personalize a case with Arabic calligraphy and liquid 24k gold or silver foil.',
        icon: '✒️',
        tierColor: 'purple',
        category: 'vip',
        rewardPoints: 120,
        progress: 1,
        target: 1,
        unitAr: 'تصميم',
        unitEn: 'design',
        unlocked: true,
        unlockedDate: '2026-11-01',
      },
      {
        id: 'vip-elite',
        nameAr: 'النخبة الذهبية (VIP Elite)',
        nameEn: 'VIP Elite Member',
        descriptionAr: 'تخطي حاجز 500 نقطة ولاء والترقية التلقائية للفئة الذهبية VIP.',
        descriptionEn: 'Reach 500+ loyalty points to unlock VIP Gold club privileges and perks.',
        icon: '💎',
        tierColor: 'gold',
        category: 'vip',
        rewardPoints: 200,
        progress: loyaltyAccount.points,
        target: 500,
        unitAr: 'نقطة',
        unitEn: 'points',
        unlocked: loyaltyAccount.points >= 500,
        unlockedDate: loyaltyAccount.points >= 500 ? '2026-11-01' : undefined,
      },
    ];
  });

  const currencyConfig = CURRENCIES[currency] || CURRENCIES.EGP;
  const currencySymbol = language === 'ar' ? currencyConfig.symbolAr : currencyConfig.symbolEn;

  // Points conversion: 100 points = 50 EGP
  const pointsCashValueEGP = (loyaltyAccount.points / 100) * 50;
  const pointsCashValueFormatted = (
    (pointsCashValueEGP / 31.0) * currencyConfig.rateFromUSD
  ).toFixed(0);

  const referralShareUrl = `https://naqsh.store/?ref=${loyaltyAccount.referralCode}`;
  const referralShareText =
    language === 'ar'
      ? `استخدم كود الخصم بتاعي (${loyaltyAccount.referralCode}) في متجر نقش لكفرات الهواتف والمحافظ الجلدية المخصصة واحصل على خصم 15% إضافي فوري وشحن سريع: ${referralShareUrl}`
      : `Use my exclusive code (${loyaltyAccount.referralCode}) at NAQSH for custom luxury phone cases & wallets to get an instant 15% discount: ${referralShareUrl}`;

  // Badges Stats
  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;
  const totalBadgesRewardPoints = badges
    .filter((b) => b.unlocked)
    .reduce((sum, b) => sum + b.rewardPoints, 0);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(loyaltyAccount.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralShareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareWhatsapp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(referralShareText)}`;
    window.open(url, '_blank');
  };

  const handleShareTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(referralShareUrl)}&text=${encodeURIComponent(referralShareText)}`;
    window.open(url, '_blank');
  };

  const handleRedeem = () => {
    if (loyaltyAccount.points >= 100) {
      onRedeemPoints(100);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#3b82f6'],
        });
      } catch {
        // ignore
      }
    }
  };

  const handleApplyFriendReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendCodeInput.trim()) return;
    if (onApplyReferralCode) {
      onApplyReferralCode(friendCodeInput.trim());
      setFriendCodeApplied(true);
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#10b981', '#f59e0b'],
        });
      } catch {
        // ignore
      }
    }
  };

  // Gamification milestone simulation unlock
  const handleSimulateUnlock = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === badgeId) {
          if (!b.unlocked) {
            if (onBonusPointsAdded) {
              onBonusPointsAdded(b.rewardPoints, b.nameAr);
            }
            setUnlockedToast({
              name: language === 'ar' ? b.nameAr : b.nameEn,
              points: b.rewardPoints,
            });
            setTimeout(() => setUnlockedToast(null), 4000);

            try {
              confetti({
                particleCount: 75,
                spread: 80,
                origin: { y: 0.5 },
                colors: ['#f59e0b', '#ec4899', '#10b981', '#3b82f6', '#fbbf24'],
              });
            } catch {
              // ignore
            }

            return {
              ...b,
              unlocked: true,
              progress: b.target,
              unlockedDate: 'الآن',
            };
          }
        }
        return b;
      })
    );
  };

  const filteredBadges = badges.filter((b) => {
    if (badgeFilter === 'unlocked') return b.unlocked;
    if (badgeFilter === 'locked') return !b.unlocked;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-stone-900 border border-amber-600/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-stone-100 font-cairo"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Header with Luxury Crown Gradient */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-stone-950 shadow-lg shadow-amber-950/50">
              <Crown className="w-6 h-6 text-stone-950" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg sm:text-xl text-white">
                  {t.loyaltyTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                  {loyaltyAccount.tier === 'black_diamond'
                    ? t.loyaltyTierDiamond
                    : loyaltyAccount.tier === 'gold'
                    ? t.loyaltyTierGold
                    : t.loyaltyTierSilver}
                </span>
              </div>
              <p className="text-xs text-stone-400 font-medium">
                {t.loyaltySubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation including Badges & Achievements */}
        <div className="flex items-center border-b border-stone-800 bg-stone-950/50 px-3 sm:px-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('points')}
            className={`flex items-center gap-2 py-3 px-2.5 sm:px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all shrink-0 ${
              activeTab === 'points'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>{language === 'ar' ? 'النقاط والمكافآت' : 'Loyalty Points'}</span>
          </button>

          {/* BADGES & ACHIEVEMENTS TAB */}
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex items-center gap-1.5 py-3 px-2.5 sm:px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all shrink-0 ${
              activeTab === 'badges'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Medal className="w-4 h-4 text-amber-400" />
            <span>{t.tabBadges}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
              {unlockedBadgesCount}/{badges.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('gifts')}
            className={`flex items-center gap-1.5 py-3 px-2.5 sm:px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all shrink-0 ${
              activeTab === 'gifts'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>{language === 'ar' ? 'هدايا العضوية' : 'Membership Gifts'}</span>
          </button>

          <button
            onClick={() => setActiveTab('referral')}
            className={`flex items-center gap-1.5 py-3 px-2.5 sm:px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all shrink-0 ${
              activeTab === 'referral'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{language === 'ar' ? 'الترشيح المتبادل' : 'Win-Win Referral'}</span>
          </button>
        </div>

        {/* Floating Celebration Toast when badge unlocked */}
        {unlockedToast && (
          <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-stone-950 font-bold px-4 py-2.5 text-xs flex items-center justify-between shadow-lg animate-fadeIn">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>
                {language === 'ar'
                  ? `🎉 مبروك! فتحت وسام [${unlockedToast.name}] وحصلت على +${unlockedToast.points} نقطة ولاء فورية!`
                  : `🎉 Congrats! You unlocked [${unlockedToast.name}] and earned +${unlockedToast.points} Loyalty Points!`}
              </span>
            </div>
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        )}

        {/* Body Container */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[70vh] space-y-6">

          {/* TAB 1: POINTS & TIERS */}
          {activeTab === 'points' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Balance Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/80 via-stone-900 to-stone-900 border border-amber-600/40 p-5 shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-amber-400/90 font-medium">
                      {t.loyaltyPointsLabel}
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                        {loyaltyAccount.points}
                      </span>
                      <span className="text-xs font-bold text-amber-400">
                        {t.loyaltyPointsUnit}
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 mt-1">
                      {t.loyaltyDiscountEquivalent}{' '}
                      <span className="text-amber-400 font-bold">
                        {pointsCashValueFormatted} {currencySymbol}
                      </span>{' '}
                      {language === 'ar' ? 'كاش في سلتك' : 'cash discount in cart'}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleRedeem}
                      disabled={loyaltyAccount.points < 100}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-stone-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>
                        {language === 'ar'
                          ? 'استبدل 100 نقطة بخصم 50 ج.م فوري'
                          : 'Redeem 100 pts for 50 EGP off'}
                      </span>
                    </button>
                    <span className="text-[10px] text-stone-400 text-center">
                      {t.loyaltyHowItWorks}
                    </span>
                  </div>
                </div>

                {/* Progress to next tier */}
                <div className="mt-4 pt-4 border-t border-stone-800/80">
                  <div className="flex items-center justify-between text-xs text-stone-300 mb-1.5 font-medium">
                    <span>
                      {language === 'ar' ? 'التقدم نحو المستوى الذهبي (VIP):' : 'Progress to Gold VIP:'}
                    </span>
                    <span className="font-mono text-amber-400 font-bold">
                      {loyaltyAccount.points} / 500 {language === 'ar' ? 'نقطة' : 'pts'}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (loyaltyAccount.points / 500) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Badges Spotlight Box */}
              <div
                onClick={() => setActiveTab('badges')}
                className="p-4 rounded-2xl bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 border border-amber-500/30 hover:border-amber-500/60 transition-all cursor-pointer flex items-center justify-between gap-3 shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 group-hover:scale-110 transition-transform">
                    <Medal className="w-5 h-5" />
                  </span>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                      <span>{language === 'ar' ? 'أوسمة الإنجازات المفتوحة:' : 'Achievement Badges Status:'}</span>
                      <span className="text-amber-400 font-mono">
                        {unlockedBadgesCount} / {badges.length}
                      </span>
                    </h5>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      {language === 'ar'
                        ? 'حصدت حتى الآن أوسمة ملكية مع نقاط ولاء مجانية إضافية. اضغط للاستكشاف والتحدي.'
                        : 'Unlock royal achievements to earn bonus loyalty points & badges. Tap to view.'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-400 font-bold shrink-0">
                  <span>{language === 'ar' ? 'عرض الأوسمة' : 'View Badges'}</span>
                  {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </div>
              </div>

              {/* Tier Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Silver */}
                <div className="p-3.5 rounded-xl bg-stone-800/70 border border-stone-700/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-200">
                      {t.loyaltyTierSilver}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-700 text-stone-300">
                      0 - 499 {language === 'ar' ? 'نقطة' : 'pts'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    {language === 'ar'
                      ? 'كاش باك 5% نقاط على كل شراء + هدية ميدالية ترحيبية مجانية.'
                      : '5% points back on all purchases + free monogram leather keychain.'}
                  </p>
                </div>

                {/* Gold */}
                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-600/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">
                      {t.loyaltyTierGold}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      500+ {language === 'ar' ? 'نقطة' : 'pts'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-relaxed">
                    {language === 'ar'
                      ? 'كاش باك 10% نقاط + ترقية مجانية لعلبة الهدايا الملكية مع ختم الشمع.'
                      : '10% points back + complimentary royal wax-sealed gift box upgrade.'}
                  </p>
                </div>

                {/* Diamond Black */}
                <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300">
                      {t.loyaltyTierDiamond}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      1500+ {language === 'ar' ? 'نقطة' : 'pts'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-relaxed">
                    {language === 'ar'
                      ? 'كاش باك 15% نقاط + أولوية طباعة فورية خلال 12 ساعة + شحن مجاني دائم.'
                      : '15% points back + priority 12h production rush + permanent free shipping.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BADGES & ACHIEVEMENTS (NEW GAMIFICATION SYSTEM) */}
          {activeTab === 'badges' && (
            <div className="space-y-5 animate-fadeIn">
              
              {/* Gamification Mastery Overview Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/70 via-stone-900 to-amber-950/70 border border-amber-500/40 shadow-xl space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-inner">
                      <Trophy className="w-5 h-5 text-amber-400" />
                    </span>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-white">
                        {t.badgesTitle}
                      </h4>
                      <p className="text-xs text-amber-400/90 font-medium">
                        {t.badgesSubtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-stone-900/90 px-3 py-1.5 rounded-xl border border-stone-700 text-xs shrink-0">
                    <Coins className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-stone-300">{t.badgesTotalReward}</span>
                    <span className="font-bold text-amber-400 font-mono">+{totalBadgesRewardPoints} pts</span>
                  </div>
                </div>

                {/* Badges Progress Bar */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs text-stone-300 mb-1.5">
                    <span>{t.badgesProgressLabel}</span>
                    <span className="font-bold text-amber-400 font-mono">
                      {unlockedBadgesCount} / {badges.length} ({Math.round((unlockedBadgesCount / badges.length) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${(unlockedBadgesCount / badges.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-400 font-medium flex items-center gap-1">
                  <Filter className="w-3 h-3 text-stone-400" />
                  <span>{language === 'ar' ? 'تصفية:' : 'Filter:'}</span>
                </span>
                <button
                  onClick={() => setBadgeFilter('all')}
                  className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                    badgeFilter === 'all'
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-800 text-stone-300 hover:text-white'
                  }`}
                >
                  {t.badgesFilterAll} ({badges.length})
                </button>
                <button
                  onClick={() => setBadgeFilter('unlocked')}
                  className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                    badgeFilter === 'unlocked'
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-stone-800 text-stone-300 hover:text-white'
                  }`}
                >
                  {t.badgesFilterUnlocked} ({unlockedBadgesCount})
                </button>
                <button
                  onClick={() => setBadgeFilter('locked')}
                  className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                    badgeFilter === 'locked'
                      ? 'bg-stone-700 text-white font-bold'
                      : 'bg-stone-800 text-stone-300 hover:text-white'
                  }`}
                >
                  {t.badgesFilterLocked} ({badges.length - unlockedBadgesCount})
                </button>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredBadges.map((badge) => {
                  const badgeName = language === 'ar' ? badge.nameAr : badge.nameEn;
                  const badgeDesc = language === 'ar' ? badge.descriptionAr : badge.descriptionEn;
                  const unitLabel = language === 'ar' ? badge.unitAr : badge.unitEn;

                  // Metallic Border & Glow colors based on tier
                  const tierClasses = {
                    gold: badge.unlocked
                      ? 'border-amber-500/70 bg-gradient-to-br from-amber-950/40 via-stone-900 to-amber-950/20 shadow-amber-950/40'
                      : 'border-stone-800 bg-stone-900/60 opacity-80',
                    ruby: badge.unlocked
                      ? 'border-rose-500/70 bg-gradient-to-br from-rose-950/40 via-stone-900 to-rose-950/20 shadow-rose-950/40'
                      : 'border-stone-800 bg-stone-900/60 opacity-80',
                    emerald: badge.unlocked
                      ? 'border-emerald-500/70 bg-gradient-to-br from-emerald-950/40 via-stone-900 to-emerald-950/20 shadow-emerald-950/40'
                      : 'border-stone-800 bg-stone-900/60 opacity-80',
                    purple: badge.unlocked
                      ? 'border-purple-500/70 bg-gradient-to-br from-purple-950/40 via-stone-900 to-purple-950/20 shadow-purple-950/40'
                      : 'border-stone-800 bg-stone-900/60 opacity-80',
                    silver: badge.unlocked
                      ? 'border-slate-400/70 bg-gradient-to-br from-slate-900/60 via-stone-900 to-slate-900/40 shadow-slate-900/40'
                      : 'border-stone-800 bg-stone-900/60 opacity-80',
                    bronze: badge.unlocked
                      ? 'border-orange-700/70 bg-gradient-to-br from-orange-950/40 via-stone-900 to-orange-950/20 shadow-orange-950/40'
                      : 'border-stone-800 bg-stone-900/60 opacity-80',
                  }[badge.tierColor];

                  return (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between shadow-lg ${tierClasses}`}
                    >
                      {/* Top Row: Emblem + Status Pill + Reward Points */}
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <span className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner border transition-transform ${
                              badge.unlocked
                                ? 'bg-gradient-to-br from-stone-800 to-stone-900 border-amber-500/60 shadow-amber-500/20 ring-1 ring-amber-500/40'
                                : 'bg-stone-950 border-stone-800 grayscale'
                            }`}>
                              {badge.icon}
                            </span>
                            {badge.unlocked ? (
                              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border border-stone-900 flex items-center justify-center text-white text-[9px] shadow-sm">
                                ✓
                              </span>
                            ) : (
                              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-400 text-[9px]">
                                <Lock className="w-2.5 h-2.5" />
                              </span>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h5 className="font-bold text-xs sm:text-sm text-white">
                                {badgeName}
                              </h5>
                            </div>
                            <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">
                              {badgeDesc}
                            </p>
                          </div>
                        </div>

                        {/* Reward Chip */}
                        <div className="shrink-0 flex flex-col items-end gap-1">
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-[10px] border border-amber-500/30 whitespace-nowrap">
                            +{badge.rewardPoints} pts
                          </span>
                        </div>
                      </div>

                      {/* Milestone Progress Bar */}
                      <div className="mt-2 pt-2 border-t border-stone-800/80 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] text-stone-400">
                          <span>
                            {badge.unlocked
                              ? (language === 'ar' ? 'تم استيفاء المتطلب ✓' : 'Milestone Achieved ✓')
                              : (language === 'ar' ? 'التقدم المحرز:' : 'Current Progress:')}
                          </span>
                          <span className="font-mono text-stone-300 font-bold">
                            {badge.progress} / {badge.target} {unitLabel}
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-stone-950 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              badge.unlocked
                                ? 'bg-emerald-500'
                                : 'bg-gradient-to-r from-amber-600 to-yellow-500'
                            }`}
                            style={{
                              width: `${Math.min(100, (badge.progress / badge.target) * 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Action / Status Footer */}
                      <div className="mt-3 flex items-center justify-between gap-2 pt-1">
                        {badge.unlocked ? (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{t.badgesCompleted}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-medium">
                            <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                            <span>
                              {language === 'ar'
                                ? `متبقي ${Math.max(0, badge.target - badge.progress)} ${unitLabel} فقط`
                                : `${Math.max(0, badge.target - badge.progress)} ${unitLabel} remaining`}
                            </span>
                          </div>
                        )}

                        {/* Interactive Gamification simulation button */}
                        {!badge.unlocked && (
                          <button
                            type="button"
                            onClick={() => handleSimulateUnlock(badge.id)}
                            className="px-2.5 py-1 bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-300 text-[10px] font-bold rounded-lg transition-colors border border-stone-700 hover:border-amber-500 flex items-center gap-1"
                            title={language === 'ar' ? 'محاكاة إتمام المتطلب وفتح الوسام' : 'Simulate milestone completion'}
                          >
                            <Unlock className="w-3 h-3" />
                            <span>{language === 'ar' ? 'محاكاة الفتح 🎮' : 'Unlock Demo 🎮'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 3: MEMBERSHIP GIFTS */}
          {activeTab === 'gifts' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700">
                <h4 className="font-bold text-sm text-amber-400 mb-1">
                  {t.membershipGiftsTitle}
                </h4>
                <p className="text-xs text-stone-300">
                  {t.membershipGiftsSubtitle}
                </p>
              </div>

              <div className="space-y-3">
                {INITIAL_MEMBERSHIP_GIFTS.map((gift) => {
                  const isSelected = loyaltyAccount.selectedGiftId === gift.id || (!loyaltyAccount.selectedGiftId && gift.id === 'gift-keychain');
                  const giftName = language === 'ar' ? gift.nameAr : gift.nameEn;
                  const giftDesc = language === 'ar' ? gift.descriptionAr : gift.descriptionEn;

                  return (
                    <div
                      key={gift.id}
                      onClick={() => onSelectGift(gift.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-amber-950/50 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                          : 'bg-stone-800/70 border-stone-700 hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl p-2 rounded-xl bg-stone-900 border border-stone-700 shrink-0">
                          {gift.icon}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-sm text-white">{giftName}</h5>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                              {language === 'ar' ? 'مجاناً 100%' : '100% Free'}
                            </span>
                          </div>
                          <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                            {giftDesc}
                          </p>
                          <span className="inline-block mt-2 text-[11px] font-semibold text-amber-400">
                            {language === 'ar' ? `القيمة الأصلية: ${gift.valueEGP} ج.م` : `Regular Value: ${gift.valueEGP} EGP`}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 self-center">
                        <button
                          type="button"
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-amber-500 text-stone-950 shadow-sm'
                              : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
                          }`}
                        >
                          {isSelected ? (language === 'ar' ? '✓ تم الاختيار' : '✓ Selected') : (language === 'ar' ? 'اختيار' : 'Select')}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: REFERRAL DUAL WIN-WIN */}
          {activeTab === 'referral' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Highlight Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-900/60 via-stone-900 to-amber-900/60 border border-amber-600/40 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Users className="w-5 h-5 text-amber-400" />
                  <h4>{t.referralTitle}</h4>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {t.referralSubtitle}
                </p>

                {/* Win-Win Perks Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-700">
                    <p className="text-xs font-bold text-emerald-400 mb-0.5">
                      {language === 'ar' ? '🎁 هدية صديقك:' : '🎁 Your Friend Gets:'}
                    </p>
                    <p className="text-xs text-stone-300">
                      {language === 'ar'
                        ? 'خصم 15% فوري إضافي على كامل المنتجات بطلبهم الأول'
                        : 'Instant 15% extra discount on their first order'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-700">
                    <p className="text-xs font-bold text-amber-400 mb-0.5">
                      {language === 'ar' ? '💰 هديتك أنت:' : '💰 You Earn:'}
                    </p>
                    <p className="text-xs text-stone-300">
                      {language === 'ar'
                        ? '100 ج.م رصيد كاش في محفظتك أو 200 نقطة ولاء فورية'
                        : '100 EGP store credit or 200 Loyalty Points credited'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Your Personal Code & Link */}
              <div className="bg-stone-800/80 p-4 rounded-2xl border border-stone-700 space-y-3">
                <label className="block text-xs font-semibold text-stone-300">
                  {t.referralYourCode}
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-stone-950 px-3.5 py-2.5 rounded-xl border border-stone-700 text-sm font-mono font-bold text-amber-400 tracking-wider">
                    {loyaltyAccount.referralCode}
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm shrink-0"
                  >
                    {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCode ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : (language === 'ar' ? 'نسخ الكود' : 'Copy Code')}</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="px-3.5 py-2.5 rounded-xl bg-stone-700 hover:bg-stone-600 text-stone-200 font-bold text-xs flex items-center gap-1.5 transition-all shrink-0"
                  >
                    {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    <span>{copiedLink ? (language === 'ar' ? 'تم نسخ الرابط!' : 'Link Copied!') : (language === 'ar' ? 'نسخ الرابط' : 'Copy Link')}</span>
                  </button>
                </div>

                {/* Social Share Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleShareWhatsapp}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{t.referralShareWhatsapp}</span>
                  </button>
                  <button
                    onClick={handleShareTelegram}
                    className="flex-1 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <SendIcon className="w-3.5 h-3.5" />
                    <span>{t.referralShareTelegram}</span>
                  </button>
                </div>
              </div>

              {/* Enter a Friend's Referral Code */}
              <div className="p-4 rounded-2xl bg-stone-800/40 border border-stone-700 space-y-2.5">
                <p className="text-xs font-semibold text-stone-300">
                  {language === 'ar' ? 'لديك كود دعوة من صديق؟ فعّله الآن لخصم 15% فوري:' : 'Got a referral code from a friend? Enter it for 15% off:'}
                </p>
                <form onSubmit={handleApplyFriendReferral} className="flex gap-2">
                  <input
                    type="text"
                    value={friendCodeInput}
                    onChange={(e) => setFriendCodeInput(e.target.value)}
                    placeholder="e.g. NAQSH-VIP-..."
                    className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-700 hover:bg-stone-600 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    {language === 'ar' ? 'تطبيق' : 'Apply'}
                  </button>
                </form>
                {friendCodeApplied && (
                  <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      {language === 'ar'
                        ? 'تم تفعيل كود الخصم المشترك بنجاح! تم تطبيق 15% خصم على مشترياتك.'
                        : 'Referral discount applied! 15% discount will be deducted from your cart.'}
                    </span>
                  </p>
                )}
              </div>

              {/* Referral Stats */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-400">{t.referralStatsCount}</span>
                  <p className="text-base font-bold text-white font-mono mt-0.5">
                    {loyaltyAccount.successfulReferrals}{' '}
                    {language === 'ar' ? 'أصدقاء موثقين' : 'Friends'}
                  </p>
                </div>
                <div>
                  <span className="text-stone-400">{t.referralStatsEarned}</span>
                  <p className="text-base font-bold text-amber-400 font-mono mt-0.5">
                    {loyaltyAccount.referralCreditsEGP} ج.م ({loyaltyAccount.successfulReferrals * 200} pts)
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-1.5 text-stone-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              {language === 'ar' ? 'نقاط وهدايا موثقة ومضمونة 100%' : 'Guaranteed VIP Membership Rewards'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-xl transition-colors"
          >
            {language === 'ar' ? 'متابعة التسوق' : 'Done & Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
    </svg>
  );
}
