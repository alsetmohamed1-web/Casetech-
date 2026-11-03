import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, Award, Zap, Truck, Sparkles } from 'lucide-react';

export const FaqAndTrust: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const FAQS = [
    {
      q: 'هل الطباعة على الكفرات تدوم طويلاً أم تزول بالاحتكاك والماء؟',
      a: 'نستخدم أحدث تقنيات الطباعة الهجينة فوق البنفسجية (High-Definition UV Curable Printing) بدقة 1200 DPI مدمجة مع طبقة حماية شفافة ميكرونية ورقائق معدنية ثلاثية الأبعاد. الطباعة مضادة للخدش تماماً، لا تتأثر بالحرارة أو العرق، ومضمونة لمدة سنة كاملة ضد التلاشي.',
    },
    {
      q: 'هل المحافظ مصنوعة من جلد طبيعي 100%؟',
      a: 'نعم، نستخدم حصرياً جلود الأبقار الطبيعية المدبوغة نباتياً (Italian Full-Grain Vegetable-Tanned Leather). الجلد طبيعي بالكامل، ذو ملمس ناعم ورائحة جلد أصلية، ويكتسب طبقة حماية طبيعية (Patina) تزداد جمالاً وعراقة مع كثرة الاستخدام.',
    },
    {
      q: 'كيف يعمل نظام الدروب شيبينج والطباعة عند الطلب للتجار وأصحاب المتاجر؟',
      a: 'يمكنك عرض منتجاتنا على متجرك أو صفحات التواصل الاجتماعي بأسعارك الخاصة. عندما يطلب عميلك، ترسل لنا مواصفات التخصيص، ونقوم بالطباعة والتغليف الفاخر باسم علامتك التجارية دون ذكر أي معلومات عنا، وشحنها مباشرة لباب عميلك مع تحصيل مبالغ الدفع عند الاستلام وتحويل أرباحك.',
    },
    {
      q: 'ما هي وسائل الدفع المدعومة لإتمام الطلبات؟',
      a: 'ندعم كافة خيارات الدفع الأكثر شيوعاً: الدفع نقداً عند الاستلام (COD) بعد المعاينة، إنستاباي مصر (InstaPay)، محافظ المحمول الذكية (فودافون كاش، اتصالات كاش، أورانج كاش، وي باي)، والبطاقات البنكية فيزا، ماستركارد، ومدى.',
    },
    {
      q: 'كم تستغرق مدة التصنيع والتوصيل لباب المنزل؟',
      a: 'يستغرق الحفر بالليزر والطباعة 24 ساعة فقط في معملنا، ويتم تسليم الشحنة لشركات التوصيل السريع (بوسطة، أرامكس، سمسا) لتصلك خلال 2 إلى 4 أيام عمل في مصر والسعودية والإمارات.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-stone-950/80 rounded-2xl border border-stone-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">ضمان الحفر والأصالة</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              جلد طبيعي مدبوغ وحفر ليزري دقيق لا يمحى، مع ضمان استبدال فوري في حال وجود أي عيب مصنعي.
            </p>
          </div>

          <div className="p-6 bg-stone-950/80 rounded-2xl border border-stone-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">تصنيع فوري عند الطلب</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              نبدأ التجهيز الليزري فور إتمام الطلب لتفادي الانتظار والمخزون الراكد والحصول على قطعة طازجة ومصنوعة لأجلك.
            </p>
          </div>

          <div className="p-6 bg-stone-950/80 rounded-2xl border border-stone-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">تغليف أبيض White-Label</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              صناديق هدايا فاخرة مع كيس مخملي وقماش تنظيف دون أي ملصقات أو فواتير تشير إلى المصنع المورد.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="text-center mb-10">
            <div className="text-xs font-semibold text-amber-400 mb-2">إجابات استفساراتكم الشائعة</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              الأسئلة الشائعة حول الطباعة والتوريد
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-stone-800 bg-stone-950/70 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 font-bold text-sm text-stone-200 hover:text-white"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-stone-400 leading-relaxed border-t border-stone-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
