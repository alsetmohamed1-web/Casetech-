import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, PackageCheck, AlertCircle, Phone, ArrowRight } from 'lucide-react';
import { Order, Currency } from '../types';
import { CURRENCIES } from '../data/products';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  currency: Currency;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
  currency,
}) => {
  if (!isOpen) return null;

  const currencyConfig = CURRENCIES[currency] || CURRENCIES.USD;
  const [query, setQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(orders[0] || null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const trimmed = query.trim().toUpperCase();
    const found = orders.find(
      (o) =>
        o.orderNumber.toUpperCase() === trimmed ||
        o.trackingNumber.toUpperCase() === trimmed ||
        o.customerPhone.includes(trimmed)
    );

    if (found) {
      setSearchedOrder(found);
      setErrorMsg(null);
    } else {
      setErrorMsg(`لم يتم العثور على طلب برقم "${query}". يرجى التأكد من الرقم (مثال: NQ-94812).`);
    }
  };

  const getStepStatus = (stepIndex: number, currentStatus: Order['status']) => {
    const statusRanks: Record<Order['status'], number> = {
      pending: 0,
      in_production: 1,
      quality_check: 2,
      shipped: 3,
      delivered: 4,
    };
    const currentRank = statusRanks[currentStatus] ?? 1;

    if (currentRank > stepIndex) return 'completed';
    if (currentRank === stepIndex) return 'active';
    return 'upcoming';
  };

  const STEPS = [
    { title: 'تم استلام وتأكيد الطلب', desc: 'تم استلام طلبك ومواصفات التخصيص' },
    { title: 'قيد الحفر والطباعة بالليزر', desc: 'جاري التصنيع والطباعة بدقة 1200 DPI' },
    { title: 'فحص الجودة والتغليف', desc: 'مراجعة خلو القطعة من أي عيوب والتغليف الفاخر' },
    { title: 'تم التسليم لشركة الشحن', desc: 'الشحنة مع مندوب التوصيل في طريقها إليك' },
    { title: 'تم التسليم بنجاح', desc: 'تم استلام الطلب من قِبل العميل' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-auto text-stone-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/80">
          <div className="flex items-center gap-2.5">
            <Truck className="w-5 h-5 text-amber-500" />
            <div>
              <h2 className="text-base font-bold text-white">تتبع حالة شحنتك والطباعة المباشرة</h2>
              <p className="text-[11px] text-stone-400">تحديثات حية لمراحل التصنيع والشحن والتوصيل للباب</p>
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="أدخل رقم طلبك (مثال: NQ-94812 أو رقم الهاتف)..."
                className="w-full bg-stone-800 border border-stone-700 rounded-xl pr-10 pl-3 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs whitespace-nowrap transition-colors"
            >
              بحث وتتبع
            </button>
          </form>

          {errorMsg && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {searchedOrder && (
            <div className="space-y-6">
              
              {/* Order Info Bar */}
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-stone-400 block">رقم الطلب:</span>
                  <span className="text-sm font-bold text-amber-400 font-mono">{searchedOrder.orderNumber}</span>
                </div>

                <div>
                  <span className="text-[11px] text-stone-400 block">شركة التوصيل:</span>
                  <span className="text-xs font-semibold text-stone-200">{searchedOrder.courierName}</span>
                </div>

                <div>
                  <span className="text-[11px] text-stone-400 block">رقم بوليصة الشحن:</span>
                  <span className="text-xs font-mono font-bold text-stone-300">{searchedOrder.trackingNumber}</span>
                </div>

                <div>
                  <span className="text-[11px] text-stone-400 block">تاريخ الإنشاء:</span>
                  <span className="text-xs text-stone-300">{searchedOrder.createdAt}</span>
                </div>
              </div>

              {/* Visual Progress Stepper */}
              <div className="p-5 bg-stone-950/80 rounded-xl border border-stone-800 space-y-5">
                <h4 className="text-xs font-bold text-stone-300">مراحل التنفيذ والتوصيل:</h4>

                <div className="space-y-4">
                  {STEPS.map((step, idx) => {
                    const status = getStepStatus(idx, searchedOrder.status);
                    return (
                      <div key={idx} className="flex items-start gap-3 relative">
                        {idx !== STEPS.length - 1 && (
                          <div
                            className={`absolute right-3.5 top-7 bottom-0 w-0.5 -mb-4 ${
                              status === 'completed' ? 'bg-amber-500' : 'bg-stone-800'
                            }`}
                          />
                        )}

                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 text-xs font-bold ${
                            status === 'completed'
                              ? 'bg-amber-500 text-stone-950'
                              : status === 'active'
                              ? 'bg-amber-500/20 text-amber-400 ring-2 ring-amber-400 animate-pulse'
                              : 'bg-stone-800 text-stone-500'
                          }`}
                        >
                          {status === 'completed' ? '✓' : idx + 1}
                        </div>

                        <div>
                          <p className={`text-xs font-bold ${status === 'upcoming' ? 'text-stone-500' : 'text-white'}`}>
                            {step.title}
                          </p>
                          <p className="text-[11px] text-stone-400 mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items in this order */}
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
                <span className="text-xs font-bold text-stone-300 block mb-2">المنتجات المخصصة داخل هذا الطلب:</span>
                {searchedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-stone-800/60 last:border-0">
                    <span className="text-stone-200">{it.product.nameAr} (الكمية: {it.quantity})</span>
                    {it.customization?.customText && (
                      <span className="text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        النقش: {it.customization.customText}
                      </span>
                    )}
                  </div>
                ))}

                {searchedOrder.discountCode && (
                  <div className="flex items-center justify-between text-xs pt-2 mt-1 border-t border-stone-800 text-emerald-400 font-medium">
                    <span>كود الخصم الترويجي ({searchedOrder.discountCode}):</span>
                    <span className="bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                      تم تطبيق خصم {searchedOrder.discountPercent}%
                    </span>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
