import React from 'react';
import { X, Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { CURRENCIES, PHONE_MODELS, LEATHER_COLORS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: () => void;
  currency: Currency;
  onOpenStudio: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  currency,
  onOpenStudio,
}) => {
  if (!isOpen) return null;

  const { language, t, isRtl } = useLanguage();
  const currencyConfig = CURRENCIES[currency] || CURRENCIES.USD;
  const currencySymbol = language === 'ar' ? currencyConfig.symbolAr : currencyConfig.symbolEn;

  const subtotalUSD = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const subtotalFormatted = (subtotalUSD * currencyConfig.rateFromUSD).toFixed(0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className={`fixed inset-y-0 ${isRtl ? 'left-0 pl-0 sm:pl-10' : 'right-0 pr-0 sm:pr-10'} max-w-full flex`}>
        <div className={`w-screen max-w-md bg-stone-900 ${isRtl ? 'border-r' : 'border-l'} border-stone-800 text-stone-100 shadow-2xl flex flex-col`}>
          
          {/* Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-white">{t.cartTitle}</h2>
              <span className="text-xs text-stone-400 tabular-nums">
                ({items.length} {t.cartItemsCount})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-stone-800 flex items-center justify-center text-stone-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-200">{t.cartEmptyTitle}</h3>
                  <p className="text-xs text-stone-400 mt-1 max-w-xs">
                    {t.cartEmptySubtitle}
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenStudio();
                  }}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  {t.cartEmptyExploreBtn}
                </button>
              </div>
            ) : (
              items.map((item) => {
                const phone = item.customization?.phoneModelId
                  ? PHONE_MODELS.find((m) => m.id === item.customization?.phoneModelId)
                  : null;
                const leather = item.customization?.leatherColorId
                  ? LEATHER_COLORS.find((l) => l.id === item.customization?.leatherColorId)
                  : null;

                const itemPrice = (item.unitPrice * currencyConfig.rateFromUSD).toFixed(0);
                const itemName = language === 'ar' ? item.product.nameAr : (item.product.nameEn || item.product.nameAr);
                const leatherName = leather ? (language === 'ar' ? leather.nameAr : leather.nameEn) : null;

                return (
                  <div
                    key={item.cartId}
                    className="p-3.5 bg-stone-950/60 rounded-xl border border-stone-800 flex gap-3.5"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-800 shrink-0 border border-stone-700/50">
                      <img
                        src={item.product.image}
                        alt={itemName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-white line-clamp-1">
                            {itemName}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.cartId)}
                            className="text-stone-500 hover:text-rose-400 transition-colors p-1"
                            title={t.cartItemRemove}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Customization Details Badges */}
                        <div className="mt-1 space-y-0.5 text-[11px] text-stone-400">
                          {phone && (
                            <p>
                              {language === 'ar' ? 'الطراز:' : 'Device:'} <strong className="text-stone-300">{phone.name}</strong>
                            </p>
                          )}
                          {leather && (
                            <p>
                              {language === 'ar' ? 'الجلد:' : 'Leather:'} <strong className="text-stone-300">{leatherName}</strong>
                            </p>
                          )}
                          {item.customization?.customText && (
                            <p className="text-amber-400 flex items-center gap-1 font-semibold">
                              <span>{t.cartCustomTextLabel}</span>
                              <span className="bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                                {item.customization.customText}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quantity & Unit Price */}
                      <div className="flex items-center justify-between pt-2 mt-1 border-t border-stone-800/60">
                        <div className="flex items-center gap-2 bg-stone-800 rounded-lg p-0.5 border border-stone-700">
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, -1)}
                            className="p-1 text-stone-300 hover:text-white rounded"
                            title="Decrease"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-1.5 tabular-nums text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, 1)}
                            className="p-1 text-stone-300 hover:text-white rounded"
                            title="Increase"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-amber-400 tabular-nums">
                          {itemPrice} {currencySymbol}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-800 bg-stone-950 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-stone-400">
                  <span>{t.cartSummarySubtotal}</span>
                  <span className="text-stone-200 font-semibold tabular-nums">
                    {subtotalFormatted} {currencySymbol}
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone-400">
                  <span>{t.cartSummaryShipping}</span>
                  <span className="text-emerald-400 font-bold">{t.checkoutFreeShipping}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-white pt-2 border-t border-stone-800">
                  <span>{t.cartSummaryTotal}</span>
                  <span className="text-lg text-amber-400 tabular-nums">
                    {subtotalFormatted} {currencySymbol}
                  </span>
                </div>
              </div>

              {/* Trust assurance */}
              <div className="flex items-center gap-2 text-[11px] text-stone-400 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{language === 'ar' ? 'إمكانية المعاينة والدفع عند الاستلام بعد التأكيد' : 'Inspection on delivery + Cash on Delivery'}</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-sm active:scale-[0.98] cursor-pointer"
              >
                <span>{t.cartCheckoutBtn}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

