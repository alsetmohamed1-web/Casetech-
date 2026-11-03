import React, { useState } from 'react';
import {
  X,
  Star,
  CheckCircle,
  ThumbsUp,
  MessageSquare,
  ShieldCheck,
  Send,
  User,
  Plus,
} from 'lucide-react';
import { Product, ProductReview, Currency } from '../types';
import { CURRENCIES } from '../data/products';

interface ProductReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddReview: (productId: string, review: Omit<ProductReview, 'id'>) => void;
  currency: Currency;
  onCustomize: (product: Product) => void;
}

export const ProductReviewsModal: React.FC<ProductReviewsModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddReview,
  currency,
  onCustomize,
}) => {
  if (!isOpen || !product) return null;

  const currencyConfig = CURRENCIES[currency] || CURRENCIES.USD;
  const reviews = product.reviews || [];
  const reviewsCount = product.reviewsCount || reviews.length;
  const avgRating = product.rating || 4.9;

  // New review form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [modelPurchased, setModelPurchased] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});

  const handleHelpfulClick = (reviewId: string, currentCount: number) => {
    if (helpfulMap[reviewId]) return;
    setHelpfulMap((prev) => ({
      ...prev,
      [reviewId]: currentCount + 1,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    onAddReview(product.id, {
      productId: product.id,
      author: authorName.trim(),
      rating: newRating,
      date: 'الآن',
      verifiedBuyer: true,
      modelPurchased: modelPurchased.trim() || 'قطعة مخصصة بالطلب',
      comment: commentText.trim(),
      helpfulCount: 1,
    });

    setSubmittedNotice(true);
    setAuthorName('');
    setCommentText('');
    setModelPurchased('');
    setShowAddForm(false);
    setTimeout(() => setSubmittedNotice(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-auto text-stone-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 bg-stone-950/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-800 shrink-0 border border-stone-700">
              <img src={product.image} alt={product.nameAr} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white line-clamp-1">{product.nameAr}</h2>
                <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/80 font-bold shrink-0">
                  {avgRating.toFixed(2)} ★
                </span>
              </div>
              <p className="text-xs text-stone-400">
                تقييمات وتجارب المشترين الموثقين ({reviewsCount} تقييم معتمد)
              </p>
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

        {/* Success Alert */}
        {submittedNotice && (
          <div className="mx-6 mt-4 p-3 bg-emerald-950/70 border border-emerald-700/60 rounded-xl text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>شكراً لك! تم إضافة تقييمك بنجاح وسيكون ظاهراً لجميع زوار المتجر لتعزيز الثقة.</span>
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Rating Summary Bar */}
          <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* Score Cluster */}
            <div className="sm:col-span-5 text-center sm:text-right border-b sm:border-b-0 sm:border-l border-stone-800 pb-4 sm:pb-0 sm:pl-6">
              <span className="text-4xl font-extrabold text-amber-400 tabular-nums">
                {avgRating.toFixed(1)}
              </span>
              <span className="text-stone-400 text-xs mr-1">من 5.0</span>

              {/* Stars */}
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 my-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>بناءً على {reviewsCount} مشتري حقيقي</span>
              </div>
            </div>

            {/* Satisfaction Bars */}
            <div className="sm:col-span-7 space-y-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-stone-300 w-12 text-left">5 نجوم</span>
                <div className="flex-1 h-2 bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[94%]"></div>
                </div>
                <span className="text-stone-400 text-[11px] tabular-nums">94%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-stone-300 w-12 text-left">4 نجوم</span>
                <div className="flex-1 h-2 bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[6%]"></div>
                </div>
                <span className="text-stone-400 text-[11px] tabular-nums">6%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-stone-400 w-12 text-left">3 نجوم</span>
                <div className="flex-1 h-2 bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[0%]"></div>
                </div>
                <span className="text-stone-500 text-[11px] tabular-nums">0%</span>
              </div>
            </div>

          </div>

          {/* Trigger to write a review */}
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-stone-200">
              تجارب وآراء العملاء ({reviews.length} معروضة):
            </h3>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'إلغاء التقييم' : 'أضف تقييمك وتجربتك'}</span>
            </button>
          </div>

          {/* Add Review Form Dropdown */}
          {showAddForm && (
            <form onSubmit={handleFormSubmit} className="p-4 bg-stone-950 rounded-xl border border-amber-500/40 space-y-4 animate-fadeIn">
              <h4 className="text-xs font-bold text-amber-400">شاركنا تجربتك وتقييمك للمنتج:</h4>

              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-300">تقييمك:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewRating(star)}
                      className="p-1 text-amber-400 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= (hoverRating || newRating) ? 'fill-amber-400 text-amber-400' : 'text-stone-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-300 mb-1">اسمك الكامل *</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="مثال: م. أحمد عبد العزيز"
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">الطراز أو النص المخصص الذي اشتريته</label>
                  <input
                    type="text"
                    value={modelPurchased}
                    onChange={(e) => setModelPurchased(e.target.value)}
                    placeholder="مثال: iPhone 16 Pro Max · خط ديواني"
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-300 mb-1">رأيك وتجربتك بالتفصيل *</label>
                <textarea
                  rows={3}
                  required
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="كيف كانت جودة الجلد أو الطباعة الليزرية؟ وسرعة التوصيل والتغليف؟"
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>نشر التقييم فوراً</span>
                </button>
              </div>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-3.5">
            {reviews.map((rev) => {
              const helpfulCount = helpfulMap[rev.id] ?? rev.helpfulCount ?? 12;
              const hasLiked = Boolean(helpfulMap[rev.id]);

              return (
                <div
                  key={rev.id}
                  className="p-4 bg-stone-950/70 rounded-xl border border-stone-800 space-y-2.5 transition-colors hover:border-stone-700"
                >
                  {/* Top line: Author & Rating */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs sm:text-sm">{rev.author}</span>
                        {rev.verifiedBuyer && (
                          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/80 flex items-center gap-1 font-semibold">
                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                            <span>مشتري موثق</span>
                          </span>
                        )}
                      </div>

                      {rev.modelPurchased && (
                        <p className="text-[11px] text-amber-400/90 mt-0.5 font-medium">
                          القطعة: {rev.modelPurchased}
                        </p>
                      )}
                    </div>

                    <div className="text-left">
                      <div className="flex items-center gap-0.5 text-amber-400 justify-end">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-stone-500 block mt-0.5">{rev.date}</span>
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-stone-300 leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  {/* Bottom Helpful button */}
                  <div className="pt-2 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-500">
                    <span>هل كان هذا التقييم مفيداً؟</span>
                    <button
                      onClick={() => handleHelpfulClick(rev.id, rev.helpfulCount ?? 12)}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                        hasLiked ? 'text-emerald-400 bg-emerald-950/40' : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span className="tabular-nums">مفيد ({helpfulCount})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Footer with Customize CTA */}
        <div className="p-4 border-t border-stone-800 bg-stone-950 flex items-center justify-between">
          <div className="text-xs">
            <span className="text-stone-400 block">السعر:</span>
            <span className="text-base font-bold text-amber-400 tabular-nums">
              {(product.price * currencyConfig.rateFromUSD).toFixed(0)} {currencyConfig.symbolAr}
            </span>
          </div>

          <button
            onClick={() => {
              onClose();
              onCustomize(product);
            }}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition-colors shadow-md shadow-amber-500/20"
          >
            تخصيص هذا المنتج الآن
          </button>
        </div>

      </div>
    </div>
  );
};
