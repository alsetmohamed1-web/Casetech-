import React, { useState } from 'react';
import { X, Layers, TrendingUp, DollarSign, Package, Send, CheckCircle, RefreshCw, Printer, ExternalLink, Settings, Sparkles } from 'lucide-react';
import { Order, Currency } from '../types';
import { CURRENCIES, PHONE_MODELS } from '../data/products';

interface DropshipDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
  currency: Currency;
}

export const DropshipDashboardModal: React.FC<DropshipDashboardModalProps> = ({
  isOpen,
  onClose,
  orders,
  onUpdateOrderStatus,
  currency,
}) => {
  if (!isOpen) return null;

  const currencyConfig = CURRENCIES[currency] || CURRENCIES.USD;
  const [activeTab, setActiveTab] = useState<'orders' | 'guide' | 'settings'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState<string | null>(null);

  // Financial calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0) * currencyConfig.rateFromUSD;
  const totalProfit = orders.reduce((sum, ord) => sum + ord.dropshipProfit, 0) * currencyConfig.rateFromUSD;
  const totalFactoryCost = totalRevenue - totalProfit;

  const handleDispatchToFactory = (order: Order) => {
    setIsDispatching(true);
    setTimeout(() => {
      onUpdateOrderStatus(order.id, 'in_production');
      setIsDispatching(false);
      setDispatchSuccess(`تم إرسال أمر الإنتاج للمطبعة بنجاح برقم تشغيل: ${order.factoryDispatchId}`);
      setTimeout(() => setDispatchSuccess(null), 3000);
    }, 700);
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded text-[11px] font-semibold border border-amber-500/20">قيد المراجعة</span>;
      case 'in_production':
        return <span className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded text-[11px] font-semibold border border-blue-500/20">جاري الطباعة والتصنيع</span>;
      case 'quality_check':
        return <span className="text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded text-[11px] font-semibold border border-purple-500/20">فحص الجودة والتغليف</span>;
      case 'shipped':
        return <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-500/20">تم الشحن مع المندوب</span>;
      case 'delivered':
        return <span className="text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded text-[11px] font-semibold border border-teal-500/20">تم التوصيل بنجاح</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-auto text-stone-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 bg-stone-950/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">بوابة التوريد والدروب شيبينغ وإدارة المصنع</h2>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80 font-mono">
                  DIRECT POD ENGINE
                </span>
              </div>
              <p className="text-xs text-stone-400">
                لوحة تحكم صاحب المتجر لمتابعة أرباح الدروب شيبينج وأوامر الطباعة والشحن المباشر للعملاء
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex p-1 bg-stone-800 rounded-lg text-xs">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                  activeTab === 'orders' ? 'bg-amber-500 text-stone-950 shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                الطلبات والإنتاج ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                  activeTab === 'guide' ? 'bg-amber-500 text-stone-950 shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                دليل نظام التوريد المباشر
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                  activeTab === 'settings' ? 'bg-amber-500 text-stone-950 shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                إعدادات التغليف (White-Label)
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors ml-2"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Orders & Production Management */}
        {activeTab === 'orders' && (
          <div className="flex-1 flex flex-col overflow-y-auto">
            
            {/* KPI Financial Bar */}
            <div className="p-6 bg-stone-950/60 border-b border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-stone-900/80 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-400 block mb-1">إجمالي المبيعات (Gross Sales):</span>
                <span className="text-xl font-bold text-white tabular-nums">
                  {totalRevenue.toFixed(0)} {currencyConfig.symbolAr}
                </span>
                <span className="text-[10px] text-stone-400 block mt-1">من مبيعات المتجر للعملاء</span>
              </div>

              <div className="p-4 bg-stone-900/80 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-400 block mb-1">تكلفة المصنع والطباعة (Fulfillment Cost):</span>
                <span className="text-xl font-bold text-stone-300 tabular-nums">
                  {totalFactoryCost.toFixed(0)} {currencyConfig.symbolAr}
                </span>
                <span className="text-[10px] text-stone-400 block mt-1">تُدفع للشركة الموردة عند الشحن</span>
              </div>

              <div className="p-4 bg-emerald-950/30 rounded-xl border border-emerald-800/40">
                <span className="text-xs text-emerald-400 block mb-1 font-semibold">صافي أرباحك (Your Net Profit):</span>
                <span className="text-2xl font-black text-emerald-400 tabular-nums">
                  +{totalProfit.toFixed(0)} {currencyConfig.symbolAr}
                </span>
                <span className="text-[10px] text-emerald-300/80 block mt-1">هامش ربح صافي يتجاوز 60%</span>
              </div>
            </div>

            {/* Notification alert if any */}
            {dispatchSuccess && (
              <div className="mx-6 mt-4 p-3 bg-emerald-900/40 border border-emerald-600/50 rounded-xl text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{dispatchSuccess}</span>
              </div>
            )}

            {/* Order Split Table & Inspector */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto p-6 gap-6">
              
              {/* Order List */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400 pb-1">
                  <span>طلبات العملاء الواردة</span>
                  <span>اضغط على أي طلب لعرض تفاصيل الطباعة والتوريد</span>
                </div>

                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrder(ord)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedOrder?.id === ord.id
                        ? 'border-amber-500 bg-stone-800/90 shadow-md'
                        : 'border-stone-800 bg-stone-950/60 hover:bg-stone-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{ord.orderNumber}</span>
                          <span className="text-xs text-stone-400 font-normal">({ord.createdAt})</span>
                        </div>
                        <p className="text-xs text-stone-300 mt-0.5">{ord.customerName} - {ord.address.city}</p>
                      </div>

                      <div className="text-left">
                        {getStatusBadge(ord.status)}
                        <span className="block text-xs font-bold text-amber-400 mt-1 tabular-nums">
                          {(ord.total * currencyConfig.rateFromUSD).toFixed(0)} {currencyConfig.symbolAr}
                        </span>
                      </div>
                    </div>

                    {/* Customization Quick Badge */}
                    <div className="flex items-center gap-2 text-[11px] text-stone-400 bg-stone-900 p-2 rounded-lg border border-stone-800">
                      <span className="text-stone-300 font-semibold">{ord.items.length} قطع:</span>
                      {ord.items.map((i, idx) => (
                        <span key={idx} className="truncate">
                          {i.product.nameAr}
                          {i.customization?.customText && (
                            <strong className="text-amber-400 mr-1">({i.customization.customText})</strong>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Factory Spec Inspector */}
              <div className="lg:col-span-5 bg-stone-950 rounded-xl border border-stone-800 p-5 space-y-5">
                {selectedOrder ? (
                  <>
                    <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                      <div>
                        <span className="text-xs text-stone-400">مواصفات أمر التصنيع للطلب:</span>
                        <h4 className="text-base font-bold text-white">{selectedOrder.orderNumber}</h4>
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] text-stone-400 block">رقم التشغيل بالمصنع:</span>
                        <span className="text-xs font-mono font-bold text-amber-400">{selectedOrder.factoryDispatchId}</span>
                      </div>
                    </div>

                    {/* Customer & Delivery Spec */}
                    <div className="space-y-1.5 text-xs text-stone-300 bg-stone-900/60 p-3 rounded-lg border border-stone-800">
                      <p><strong className="text-white">العميل:</strong> {selectedOrder.customerName} ({selectedOrder.customerPhone})</p>
                      <p><strong className="text-white">العنوان:</strong> {selectedOrder.address.country} - {selectedOrder.address.city} - {selectedOrder.address.street}</p>
                      <p><strong className="text-white">طريقة الدفع:</strong> {selectedOrder.paymentMethod === 'cod' ? 'تحصيل عند الاستلام (COD)' : 'مدفوع إلكترونياً'}</p>
                      <p><strong className="text-white">شركة الشحن:</strong> {selectedOrder.courierName} (بوليصة: {selectedOrder.trackingNumber})</p>
                    </div>

                    {/* Production Print Spec File */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <Printer className="w-4 h-4" />
                        <span>ملف الطباعة والحفر بالليزر (Factory Spec Sheet):</span>
                      </h5>

                      {selectedOrder.items.map((item, idx) => {
                        const phone = item.customization?.phoneModelId
                          ? PHONE_MODELS.find((m) => m.id === item.customization?.phoneModelId)
                          : null;

                        return (
                          <div key={idx} className="p-3 bg-stone-900 rounded-lg border border-stone-800 text-xs space-y-1">
                            <p className="font-semibold text-white">{item.product.nameAr}</p>
                            {phone && <p className="text-stone-300">الهاتف: <strong className="text-amber-400">{phone.name}</strong></p>}
                            {item.customization?.customText && (
                              <p className="text-stone-300">
                                النص المطلوب طباعته/نقشه: <strong className="text-white bg-black/60 px-2 py-0.5 rounded font-mono text-amber-400">{item.customization.customText}</strong>
                              </p>
                            )}
                            {item.customization?.fontStyle && (
                              <p className="text-stone-400">نوع الخط: <span className="text-stone-200">{item.customization.fontStyle}</span></p>
                            )}
                            {item.customization?.foilType && (
                              <p className="text-stone-400">نوع التغليف/الرقائق: <span className="text-stone-200">{item.customization.foilType}</span></p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Action Controls */}
                    <div className="pt-2 border-t border-stone-800 space-y-2">
                      <button
                        onClick={() => handleDispatchToFactory(selectedOrder)}
                        disabled={isDispatching}
                        className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isDispatching ? 'جاري الإرسال للمصنع...' : 'إرسال أمر الطباعة للمصنع فوراً (1-Click Dispatch)'}</span>
                      </button>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <button
                          onClick={() => onUpdateOrderStatus(selectedOrder.id, 'shipped')}
                          className="py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg border border-stone-700 transition-colors"
                        >
                          تسليم لمندوب الشحن
                        </button>
                        <button
                          onClick={() => onUpdateOrderStatus(selectedOrder.id, 'delivered')}
                          className="py-2 bg-stone-800 hover:bg-stone-700 text-emerald-400 rounded-lg border border-stone-700 transition-colors"
                        >
                          تأكيد تسليم العميل
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-12 text-center text-xs text-stone-500">
                    اختر طلباً لعرض مواصفات الإنتاج
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Dropshipping Guide */}
        {activeTab === 'guide' && (
          <div className="p-6 overflow-y-auto space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                كيف تعمل منصة نقش بنظام التوريد المباشر (Print-on-Demand Dropshipping)؟
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed max-w-3xl">
                هذا النموذج يتيح لك بيع كفرات الموبايل والمحافظ الجلدية المخصصة دون أن تشتري أي مخزون مسبقاً ودون الحاجة لمستودعات أو معدات طباعة باهظة الثمن:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">1</span>
                <h4 className="text-sm font-bold text-white">طلب العميل والتخصيص</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  العميل يدخل المتجر، يختار طراز هاتفه، يكتب اسمه ونوع الخط ولون الذهب أو الفضة ويدفع إلكترونياً أو يختار الدفع عند الاستلام.
                </p>
              </div>

              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">2</span>
                <h4 className="text-sm font-bold text-white">إرسال تلقائي لخط الإنتاج</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  النظام يقوم بتوليد ملف الطباعة بدقة 1200 DPI مع بيانات العميل وإرساله مباشرة للماكينات الليزرية في المعمل.
                </p>
              </div>

              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">3</span>
                <h4 className="text-sm font-bold text-white">تصنيع وتغليف White-Label</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  يتم حفر المحفظة أو طباعة الكفر وتغليفها بعلبة فاخرة تحمل اسم علامتك التجارية فقط دون ذكر أي تفاصيل عن المصنع.
                </p>
              </div>

              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">4</span>
                <h4 className="text-sm font-bold text-white">الشحن وتحصيل الأرباح</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  مندوب الشحن يسلّم الطلب لباب العميل، يحصّل القيمة، وتتحول أرباحك الصافية (هامش الربح) لحسابك البنكي أو المحفظة الإلكترونية.
                </p>
              </div>
            </div>

            {/* Profit calculator breakdown */}
            <div className="p-5 bg-gradient-to-r from-amber-950/40 via-stone-950 to-stone-950 rounded-xl border border-amber-800/30">
              <h4 className="text-sm font-bold text-amber-300 mb-2">مثال عملي على أرباحك الشهرية:</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                إذا قمت ببيع 100 كفر هاتف و50 محفظة جلدية شهرياً:
                <br />
                • متوسط ربح الكفر الواحد = 15 دولار (460 جنيه / 56 ريال).
                <br />
                • متوسط ربح المحفظة الواحدة = 20 دولار (620 جنيه / 75 ريال).
                <br />
                <strong>إجمالي صافي الربح الشهري المتوقع = 2,500 دولار (أكثر من 77,000 جنيه مصري / 9,300 ريال سعودي) بدون رأس مال!</strong>
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: White-Label Packaging Settings */}
        {activeTab === 'settings' && (
          <div className="p-6 overflow-y-auto max-w-2xl space-y-5">
            <h3 className="text-base font-bold text-white">إعدادات الهوية والتغليف (White-Label Packaging)</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              جميع المنتجات يتم شحنها داخل صناديق هدايا فاخرة مع كيس مخملي وقماش تنظيف دون أي إشارة للمطبعة أو المصنع.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">اسم المتجر الظاهر على كرت الإهداء:</label>
                <input
                  type="text"
                  defaultValue="نقش ورداء ستور | NAQSH"
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">رسالة الشكر المطبوعة داخل الصندوق:</label>
                <textarea
                  rows={3}
                  defaultValue="شكراً لاختيارك قطعتنا المصنوعة خصيصاً بالطلب لأجلك. نتمنى أن تضفي لمسة فخامة على هاتفك ومقتنياتك اليومية."
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setDispatchSuccess('تم حفظ إعدادات التغليف والطباعة بنجاح!');
                    setTimeout(() => setDispatchSuccess(null), 2500);
                  }}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition-colors"
                >
                  حفظ إعدادات التغليف
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
