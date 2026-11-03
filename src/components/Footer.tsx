import React from 'react';
import { Truck, Layers, ShieldCheck, Mail, Phone } from 'lucide-react';
import { CaseTechLogo } from './CaseTechLogo';

interface FooterProps {
  onOpenTracking: () => void;
  onOpenDropshipPortal: () => void;
  onOpenOMS: () => void;
  onOpenStudio: () => void;
  onOpenSupplyChain?: () => void;
  onNavigateSection: (id: string) => void;
  onOpenOfficialSocial?: () => void;
  onOpenSocialPosting?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTracking,
  onOpenDropshipPortal,
  onOpenOMS,
  onOpenStudio,
  onOpenSupplyChain,
  onNavigateSection,
  onOpenOfficialSocial,
  onOpenSocialPosting,
}) => {
  return (
    <footer className="bg-stone-950 text-stone-400 text-xs border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <CaseTechLogo size="md" showTagline={true} showMascotBadge={true} />
            <p className="text-xs text-stone-400 leading-relaxed">
              منصة كيستيك (CaseTech) الرائدة في كفرات الهواتف الذكية عالية الحماية، الطباعة اليابانية 3D، وتخصيص الاسم والأنمي بأعلى متانة.
            </p>
            <div className="text-[11px] text-stone-500 space-y-1">
              <p>حماية عسكرية ضد الصدمات · تصنيع فوري وشحن 48 ساعة</p>
              <p>دعم الدفع عند الاستلام مع المعاينة قبل الدفع</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">المنتجات والتصنيفات</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('cases')}
                  className="hover:text-amber-400 transition-colors"
                >
                  كفرات الهواتف المطبوعة بالليزر
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('wallets')}
                  className="hover:text-amber-400 transition-colors"
                >
                  محافظ الجلد الطبيعي المحفورة بالاسم
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStudio}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                >
                  استوديو التخصيص والمحاكاة الحية
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-amber-400 transition-colors"
                >
                  تتبع حالة طلبك وبوليصة الشحن
                </button>
              </li>
            </ul>
          </div>

          {/* Dropship & Business Portal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">خدمات التجار والدروب شيبينغ</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenDropshipPortal}
                  className="hover:text-amber-400 transition-colors"
                >
                  بوابة المورد وإدارة أرباح الدروب شيبينج
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSupplyChain}
                  className="text-red-400 hover:text-red-300 font-semibold transition-colors"
                >
                  شبكة الموردين + ماكينات الـ UV + بوسطة
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenOMS}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  نظام إدارة الطلبات وإشعارات العملاء (OMS)
                </button>
              </li>
              <li>
                <span className="text-stone-500 block">تغليف أبيض White-Label بدون وسيط</span>
              </li>
              <li>
                <span className="text-stone-500 block">ربط فوري بماكينات الطباعة UV الليزرية</span>
              </li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">بوابات الدفع والضمان القانوني</h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              إنستاباي (InstaPay) · فودافون كاش · اتصالات كاش · أورانج كاش · فيزا وماستركارد ومدى · الدفع عند الاستلام (COD).
            </p>
            <div className="pt-1 flex items-center gap-2 text-stone-400 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>معاملات مشفرة وآمنة · سجل تجاري 248910</span>
            </div>
            {onOpenOfficialSocial && (
              <button
                onClick={onOpenOfficialSocial}
                className="mt-2 w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>شهادة مسؤولية الدفع والتوصيل وقنواتنا الرسمية 🛡️</span>
              </button>
            )}

            {onOpenSocialPosting && (
              <button
                onClick={onOpenSocialPosting}
                className="mt-1.5 w-full py-2 px-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>سيستم بوستات السوشيال ميديا وريلز التيك توك 📢</span>
              </button>
            )}
          </div>

        </div>

        {/* Official Social Media Channels Row (Facebook, TikTok, Instagram, Threads, X) */}
        <div className="py-6 border-t border-stone-800/80 my-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-stone-300">
              حساباتنا الرسمية الموثقة (Social Media):
            </span>
            <span className="text-[11px] text-amber-400 font-medium hidden sm:inline">
              هوية بصرية موحدة بالأسود والذهب
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* Facebook */}
            <a
              href="https://facebook.com/casetech.eg"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 hover:border-blue-500/40 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
              title="صفحة فيسبوك الرسمية لكيستيك"
            >
              <span className="text-blue-400 font-black">f</span>
              <span>Facebook</span>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com/@casetech.official"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 hover:border-stone-500/50 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
              title="حساب تيك توك الرسمي لكيستيك"
            >
              <span className="text-stone-200 font-black">♪</span>
              <span>TikTok</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/casetech.eg"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 hover:border-rose-500/50 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
              title="حساب إنستغرام الرسمي لكيستيك"
            >
              <span className="text-rose-400 font-black">📷</span>
              <span>Instagram</span>
            </a>

            {/* Threads */}
            <a
              href="https://threads.net/@casetech.eg"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 hover:border-stone-500/50 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
              title="حساب ثريدز الرسمي لكيستيك"
            >
              <span className="text-stone-300 font-mono font-bold">@</span>
              <span>Threads</span>
            </a>

            {/* X */}
            <a
              href="https://x.com/CaseTechEG"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 hover:border-amber-500/50 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
              title="حساب إكس الرسمي لكيستيك"
            >
              <span className="text-amber-400 font-black">𝕏</span>
              <span>X (Twitter)</span>
            </a>

            {onOpenOfficialSocial && (
              <button
                onClick={onOpenOfficialSocial}
                className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold flex items-center gap-1 transition-colors"
              >
                <span>معاينة الحسابات ⚡</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} منصة كيستيك للتكنولوجيا وحلول الهواتف الذكية (CaseTech Egypt). جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenOfficialSocial} className="hover:underline text-stone-400">
              مسؤولية الدفع والتوصيل (COD)
            </button>
            <span>·</span>
            <span>سياسة الخصوصية</span>
            <span>·</span>
            <span>شروط الخدمة والضمان (14 يوماً)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
