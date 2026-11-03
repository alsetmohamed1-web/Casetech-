import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Package,
  Gift,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  ExternalLink,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { BRAND_IDENTITY, UnboxingItem } from '../data/branding';

interface CreativeUnboxingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomizePiece?: () => void;
}

export const CreativeUnboxingModal: React.FC<CreativeUnboxingModalProps> = ({
  isOpen,
  onClose,
  onCustomizePiece,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isSealBroken, setIsSealBroken] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [customGiftName, setCustomGiftName] = useState('أحمد الشريف');
  const [customGiftMessage, setCustomGiftMessage] = useState('إلى أخي وسندي، كل عام وأنت في أتم صحة ونجاح');
  const [activeTab, setActiveTab] = useState<'experience' | 'specs' | 'merchant_guide'>('experience');

  if (!isOpen) return null;

  const items = BRAND_IDENTITY.unboxingPackaging.items;
  const currentItem: UnboxingItem = items[activeStepIndex] || items[0];

  const handleNextStep = () => {
    if (activeStepIndex < items.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div
        className="relative w-full max-w-5xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden text-stone-100 my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="relative px-6 py-5 border-b border-stone-800 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <span>تغليف إبداعي فاخر</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400">مفاجأة تفوق التوقعات</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                تجربة فتح الصندوق الملكية (Creative Unboxing Experience)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'المؤثرات الصوتية مفعلة' : 'المؤثرات الصوتية مغلقة'}
              className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-800 px-6 bg-stone-900/60 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('experience')}
            className={`py-3.5 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'experience'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>محاكاة فتح الصندوق خطوة بخطوة</span>
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-3.5 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'specs'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>محتويات باقة التغليف (6 عناصر)</span>
          </button>
          <button
            onClick={() => setActiveTab('merchant_guide')}
            className={`py-3.5 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'merchant_guide'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>دليل التاجر: التكلفة ومصانع الكرتون في مصر</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {activeTab === 'experience' && (
            <div className="space-y-6">
              {/* Hero Visual Showcase */}
              <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 aspect-[16/9] max-h-80 sm:max-h-96">
                <img
                  src={BRAND_IDENTITY.unboxingPackaging.heroImage}
                  alt="Creative Unboxing Set"
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Floating Overlay Badge */}
                <div className="absolute top-4 right-4 bg-stone-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>تأثير المفاجأة: 100% مشاركة على تيك توك وإنستجرام</span>
                </div>

                {/* Interactive Wax Seal Stamp action on image */}
                <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-stone-950/90 backdrop-blur-md border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-right">
                    <p className="text-xs text-amber-400 font-semibold">خطوة {activeStepIndex + 1} من {items.length}</p>
                    <h3 className="text-sm sm:text-base font-bold text-white">{currentItem.titleAr}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentItem.id === 'wax-seal' && !isSealBroken && (
                      <button
                        onClick={() => setIsSealBroken(true)}
                        className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg border border-red-600 flex items-center gap-1.5 animate-pulse"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>اضغط لفض الختم الشمعي الملكي ✂️</span>
                      </button>
                    )}

                    {currentItem.id === 'wax-seal' && isSealBroken && (
                      <div className="px-3.5 py-1.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>تم فض الختم الشمعي بنجاح!</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      <button
                        onClick={handlePrevStep}
                        disabled={activeStepIndex === 0}
                        className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed text-stone-200"
                        title="الخطوة السابقة"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNextStep}
                        disabled={activeStepIndex === items.length - 1}
                        className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-bold"
                        title="الخطوة التالية"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Detail Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-stone-950/60 p-5 rounded-2xl border border-stone-800">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-stone-400">{currentItem.subtitleAr}</span>
                    <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                      {currentItem.tagAr}
                    </span>
                  </div>
                  <p className="text-sm text-stone-300 leading-relaxed mb-4">
                    {currentItem.descriptionAr}
                  </p>
                  
                  <div className="p-3 bg-stone-900/80 rounded-xl border border-stone-800 text-xs text-stone-400 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-200">سر انبهار العميل: </strong>
                      <span>{currentItem.unboxingTipAr}</span>
                    </div>
                  </div>
                </div>

                {/* Personalized Greeting Card Simulator */}
                <div className="bg-stone-950/60 p-5 rounded-2xl border border-stone-800 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5">
                      <HeartHandshake className="w-3.5 h-3.5" />
                      <span>تجربة كرت الإهداء المعطر</span>
                    </h4>
                    <p className="text-[11px] text-stone-400 mb-3">
                      اكتب اسم المستلم والإهداء لتجربة طباعته على الكرت المعطر بالعود:
                    </p>

                    <div className="space-y-2 mb-3">
                      <input
                        type="text"
                        value={customGiftName}
                        onChange={(e) => setCustomGiftName(e.target.value)}
                        placeholder="اسم صاحب الهدية..."
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                      />
                      <textarea
                        rows={2}
                        value={customGiftMessage}
                        onChange={(e) => setCustomGiftMessage(e.target.value)}
                        placeholder="عبارة الإهداء الخاصة..."
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 resize-none"
                      />
                    </div>
                  </div>

                  {/* Card Mini Preview */}
                  <div className="p-3 bg-gradient-to-br from-stone-900 to-stone-950 rounded-xl border border-amber-500/30 text-center relative overflow-hidden">
                    <div className="absolute top-1 left-2 text-[9px] text-amber-500/60 uppercase tracking-widest font-latin">NAQSH OUD CARD</div>
                    <p className="text-xs font-bold text-amber-300 mt-2">{customGiftName || 'أحمد الشريف'}</p>
                    <p className="text-[11px] text-stone-400 italic line-clamp-2 mt-1">&ldquo;{customGiftMessage || 'كل عام وأنت بخير'}&rdquo;</p>
                    <span className="text-[10px] text-emerald-400 block mt-1.5 font-medium">✨ معطر بنفحات العود الملكي الأصيل</span>
                  </div>
                </div>
              </div>

              {/* Progress Steps Indicator */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2">
                {items.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                      activeStepIndex === idx
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-md'
                        : 'bg-stone-950/40 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <span className="text-[10px] font-bold block mb-1">الخطوة {idx + 1}</span>
                    <span className="text-xs font-bold text-stone-200 line-clamp-1">{item.titleAr.split(' ')[0]} {item.titleAr.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-4">
              <div className="p-4 bg-stone-950/60 rounded-2xl border border-stone-800">
                <h3 className="text-sm font-bold text-white mb-1">
                  محتويات صندوق الهدايا الملكي الكامل (6 قطع فاخرة مدمجة مع كل طلب):
                </h3>
                <p className="text-xs text-stone-400">
                  لا نرسل الكفر أو المحفظة في أكياس بلاستيكية أبداً؛ بل تصل داخل هذه المنظومة المتكاملة لتحقيق أعلى نسبة رضا عملاء وتكرار شراء:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item, index) => (
                  <div key={item.id} className="p-4 bg-stone-950/50 rounded-2xl border border-stone-800/80 hover:border-amber-500/40 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white">{item.titleAr}</h4>
                        <span className="text-[11px] text-stone-400">{item.titleEn}</span>
                      </div>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed mb-3">
                      {item.descriptionAr}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] pt-2 border-t border-stone-800">
                      <span className="text-amber-400 font-medium">الخامة: {item.materialAr}</span>
                      <span aria-hidden="true" className="text-stone-700">·</span>
                      <span className="text-emerald-400">{item.tagAr}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'merchant_guide' && (
            <div className="space-y-6">
              {/* Merchant Cost & ROI Breakdown */}
              <div className="p-5 bg-gradient-to-br from-stone-950 to-stone-900 rounded-2xl border border-stone-800">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-2">
                  <Package className="w-4 h-4" />
                  <span>اقتصاديات التغليف للدروب شيبينج والطباعة عند الطلب</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  كيف يرفع التغليف الفاخر سعر البيع وهامش ربحك بنسبة 250%؟
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  العميل لا يشتري مجرد قطعة سيليكون أو جلد؛ هو يشتري &ldquo;شعور الفخامة والانبهار&rdquo;. التغليف الراقي يكلفك حوالي 30 إلى 40 ج.م فقط كتاجر، لكنه يتيح لك بيع الكفر بـ 600 - 800 ج.م وربح صافي يتجاوز 300 - 450 ج.م في القطعة الواحدة!
                </p>
              </div>

              {/* Cost Sheet Table */}
              <div className="overflow-x-auto rounded-xl border border-stone-800 bg-stone-950">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-900 text-stone-400 border-b border-stone-800">
                    <tr>
                      <th className="py-3 px-4 font-semibold">مكون التغليف</th>
                      <th className="py-3 px-4 font-semibold">مصدر التوريد في مصر</th>
                      <th className="py-3 px-4 font-semibold">أقل كمية (MOQ)</th>
                      <th className="py-3 px-4 font-semibold">التكلفة التقريبية</th>
                      <th className="py-3 px-4 font-semibold">القيمة المحسوسة للعميل</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60 text-stone-300">
                    <tr>
                      <td className="py-3 px-4 font-bold text-white">العلبة الصلبة المغناطيسية المطرزة بالذهب</td>
                      <td className="py-3 px-4">مطابع كرتون الفجالة / العاشر من رمضان / باب الخلق</td>
                      <td className="py-3 px-4">50 علبة</td>
                      <td className="py-3 px-4 text-amber-400 font-bold">18 - 25 ج.م</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">+150 ج.م</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-white">الختم الشمعي الياقوتي اليدوي + شريط الستان</td>
                      <td className="py-3 px-4">ورش خان الخليلي أو قالب شمع مخصص بـ 200 ج.م لمرة واحدة</td>
                      <td className="py-3 px-4">قالب دائم</td>
                      <td className="py-3 px-4 text-amber-400 font-bold">2 - 3 ج.م للقطعة</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">+80 ج.م</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-white">جراب القطيفة المخملي الأسود برباط مذهب</td>
                      <td className="py-3 px-4">سوق الموسكي وحارة اليهود (محلات أكياس الهدايا)</td>
                      <td className="py-3 px-4">100 كيس</td>
                      <td className="py-3 px-4 text-amber-400 font-bold">4 - 6 ج.م</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">+60 ج.م</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-white">بطاقة الضمان والـ NFC الذكية</td>
                      <td className="py-3 px-4">رقاقات NFC بالجملة على علي بابا أو سوق العتبة + طباعة UV</td>
                      <td className="py-3 px-4">50 بطاقة</td>
                      <td className="py-3 px-4 text-amber-400 font-bold">5 - 8 ج.م</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">+120 ج.م</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-white">الكرت المعطر بالعود + ستيكرات الـ UV الهدية</td>
                      <td className="py-3 px-4">تطبعها مع شيت الكفرات بالمطبعة بدون تكلفة إضافية</td>
                      <td className="py-3 px-4">ضمن شيت الطباعة</td>
                      <td className="py-3 px-4 text-amber-400 font-bold">2 - 3 ج.م</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">+50 ج.م</td>
                    </tr>
                    <tr className="bg-stone-900/60 font-bold">
                      <td className="py-3 px-4 text-amber-400">إجمالي طقم التغليف الفاخر بالكامل</td>
                      <td className="py-3 px-4" colSpan={2}>طقم متكامل ومبهر للمشتري</td>
                      <td className="py-3 px-4 text-amber-300">32 - 45 ج.م فقط</td>
                      <td className="py-3 px-4 text-emerald-300">+460 ج.م فرق تسعير</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Direct Tips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-stone-950/60 rounded-xl border border-stone-800 text-xs text-stone-300">
                  <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>نصيحة الاتفاق مع مطبعة الـ UV لتجهيز العلب:</span>
                  </h4>
                  <p className="leading-relaxed text-stone-400">
                    اطلب من المطبعة تخزين 100 علبة فارغة لديهم؛ فور انتهاء طباعة الكفر وتجفيفه بلمبة الـ UV، يضع العامل الكفر داخل جراب القطيفة ثم العلبة ويختمها، ويسلمها جاهزة لمندوب بوسطة. أنت لا تلمس المنتج بيدك!
                  </p>
                </div>
                <div className="p-4 bg-stone-950/60 rounded-xl border border-stone-800 text-xs text-stone-300">
                  <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>نصيحة إعلانات التيك توك والريلز:</span>
                  </h4>
                  <p className="leading-relaxed text-stone-400">
                    اجعل 80% من فيديوهات إعلاناتك تبدأ بلقطة فض الختم الشمعي وصوت فتح المغناطيس؛ هذه الفيديوهات من نوع الـ ASMR Unboxing تحقق ملايين المشاهدات العضوية وتحول المتابعين إلى مشترين فوراً!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-400">
            جميع المنتجات في متجر <strong className="text-amber-400">نقش | NAQSH</strong> تشمل هذا التغليف الملكي مجاناً دون أي مصاريف إضافية.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold rounded-xl transition-colors"
            >
              إغلاق
            </button>
            <button
              onClick={() => {
                onClose();
                if (onCustomizePiece) onCustomizePiece();
              }}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>ابدأ تخصيص طلبك الآن وشاهد التغليف بنفسك</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
