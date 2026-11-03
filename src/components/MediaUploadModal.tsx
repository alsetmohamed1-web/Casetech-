import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Check,
  Plus,
  Trash2,
  Sliders,
  Sparkles,
  Link as LinkIcon,
  Eye,
  Camera,
  Layers,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { Product, UploadedMediaItem } from '../types';

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddNewProductWithImage: (newProduct: Product) => void;
  onUpdateProductImage: (productId: string, newImageUrl: string) => void;
  onOpenCustomizerWithImage?: (imageUrl: string) => void;
}

export const SAMPLE_RECENT_UPLOADS: UploadedMediaItem[] = [
  {
    id: 'media-anime-solo',
    title: 'أنمي سولوليفيلنج - هالة الظلال البارزة UV',
    category: 'anime',
    dataUrl: '/src/assets/images/anime_uv_case_1793495650837.jpg',
    tags: ['Solo Leveling', 'Anime', 'UV 3D', 'Cyber Glow'],
    addedAt: 'اليوم',
    isUsedInStore: true,
  },
  {
    id: 'media-marble-gold',
    title: 'تريند البنات - ماربل إيطالي وعروق ذهب سائل',
    category: 'aesthetic',
    dataUrl: '/src/assets/images/luxury_marble_floral_case_1793523872771.jpg',
    tags: ['Aesthetic', 'Girls', 'Marble 24k', 'Lavender'],
    addedAt: 'اليوم',
    isUsedInStore: true,
  },
  {
    id: 'media-football-ahly',
    title: 'كورة - نسر القرن الذهبي وكاربون فايبر',
    category: 'football',
    dataUrl: '/src/assets/images/football_case_1793495651444.jpg',
    tags: ['Ahly', 'Football', 'Carbon Fiber', 'Eagle'],
    addedAt: 'اليوم',
    isUsedInStore: true,
  },
  {
    id: 'media-calligraphy-ayat',
    title: 'خط عربي إسلامي - آية الكرسي بذهب ملكي',
    category: 'calligraphy',
    dataUrl: '/src/assets/images/islamic_gold_calligraphy_case_1793523903046.jpg',
    tags: ['Calligraphy', 'Islamic', '24k Foil', 'Quran'],
    addedAt: 'أمس',
    isUsedInStore: true,
  },
  {
    id: 'media-supercars-gt3',
    title: 'موتورسبورت - سوبركارز Forged Carbon',
    category: 'general',
    dataUrl: '/src/assets/images/supercars_racing_case_1793523887729.jpg',
    tags: ['Supercars', 'GT3', 'Racing', 'Speed'],
    addedAt: 'أمس',
    isUsedInStore: true,
  },
];

export const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddNewProductWithImage,
  onUpdateProductImage,
  onOpenCustomizerWithImage,
}) => {
  if (!isOpen) return null;

  const { language, isRtl } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedMedia, setUploadedMedia] = useState<UploadedMediaItem[]>(() => {
    try {
      const saved = localStorage.getItem('naqsh_uploaded_media');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return SAMPLE_RECENT_UPLOADS;
  });

  const [activeTab, setActiveTab] = useState<'upload' | 'gallery'>('upload');
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);
  const [imageTitle, setImageTitle] = useState('');
  const [imageCategory, setImageCategory] = useState<'anime' | 'aesthetic' | 'football' | 'calligraphy' | 'general'>('anime');
  const [urlInput, setUrlInput] = useState('');
  const [isPublishingNewProduct, setIsPublishingNewProduct] = useState(false);
  const [newProductPriceEGP, setNewProductPriceEGP] = useState('229');
  const [targetProductIdToUpdate, setTargetProductIdToUpdate] = useState<string>('');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // File upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(language === 'ar' ? 'يرجى اختيار ملف صورة صالح (PNG, JPG, WEBP)' : 'Please select a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      setSelectedImagePreview(result);
      if (!imageTitle) {
        setImageTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    };
    reader.readAsDataURL(file);
  };

  // URL input handler
  const handleLoadUrl = () => {
    if (!urlInput.trim()) return;
    setSelectedImagePreview(urlInput.trim());
    if (!imageTitle) {
      setImageTitle(language === 'ar' ? 'تصميم حصري جديد' : 'New Exclusive Design');
    }
  };

  // Save to Gallery
  const handleSaveToGallery = () => {
    if (!selectedImagePreview) return;

    const newItem: UploadedMediaItem = {
      id: `img-${Date.now()}`,
      title: imageTitle.trim() || (language === 'ar' ? 'تصميم نقش حديث' : 'NAQSH Modern Design'),
      dataUrl: selectedImagePreview,
      category: imageCategory,
      tags: [imageCategory, 'New 2026', 'UV 3D'],
      addedAt: language === 'ar' ? 'الآن' : 'Just now',
      isUsedInStore: false,
    };

    const updated = [newItem, ...uploadedMedia];
    setUploadedMedia(updated);
    try {
      localStorage.setItem('naqsh_uploaded_media', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setFeedbackMsg(
      language === 'ar'
        ? 'تمت إضافة الصورة بنجاح إلى مكتبة الميديا الخاصة بالمتجر! 🎉'
        : 'Image successfully saved to store media library! 🎉'
    );
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  // Publish as new product
  const handlePublishAsProduct = () => {
    if (!selectedImagePreview) return;

    const priceEGP = parseFloat(newProductPriceEGP) || 229;
    const priceUSD = priceEGP / 31.0;

    const newProd: Product = {
      id: `custom-prod-${Date.now()}`,
      category: 'cases',
      theme: imageCategory === 'anime' ? 'anime' : imageCategory === 'aesthetic' ? 'aesthetic-florals' : imageCategory === 'football' ? 'football' : imageCategory === 'calligraphy' ? 'islamic-calligraphy' : undefined,
      themeNameAr:
        imageCategory === 'anime'
          ? 'أنمي ومانجا ياباني'
          : imageCategory === 'aesthetic'
          ? 'تريند البنات والأناقة'
          : imageCategory === 'football'
          ? 'كورة وأندية'
          : 'تصميم خاص حديث',
      nameAr: imageTitle.trim() || 'كفر هاتف مخصص حديث - طباعة بارزة UV',
      nameEn: imageTitle.trim() || 'Modern Custom UV Relief Phone Case',
      descriptionAr: 'تصميم حديث عالي الجودة تمت إضافته حديثاً مع طباعة يابانية 3D بارزة ضد الخدش والماء.',
      descriptionEn: 'Modern high-resolution design with Japanese 3D UV tactile relief and military drop protection.',
      price: priceUSD,
      factoryCost: 3.5,
      image: selectedImagePreview,
      featuresAr: ['طباعة UV بارزة 3D يابانية', 'حماية ماصّة للصدمات من الدرجة العسكرية', 'يدعم الشحن اللاسلكي وMagSafe'],
      featuresEn: ['Japanese 3D UV Relief Print', 'Military-Grade Drop Protection', 'MagSafe & Wireless Charging Compatible'],
      tagAr: 'تصميم حديث ⚡',
      tagEn: 'Modern Drop ⚡',
      isCustomizable: true,
      isNewArrival: true,
      salesCount: 1,
      rating: 5.0,
      reviewsCount: 1,
    };

    onAddNewProductWithImage(newProd);
    handleSaveToGallery();

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6'],
      });
    } catch {
      // ignore
    }

    setFeedbackMsg(
      language === 'ar'
        ? 'تم نشر المنتج بنجاح في المعرض الرئيسي للمتجر! أصبح متاحاً للعملاء للشراء والتخصيص فوراً.'
        : 'Product published successfully to store catalog!'
    );
    setTimeout(() => {
      setFeedbackMsg(null);
      onClose();
    }, 2000);
  };

  // Update existing product
  const handleUpdateProduct = () => {
    if (!selectedImagePreview || !targetProductIdToUpdate) return;
    onUpdateProductImage(targetProductIdToUpdate, selectedImagePreview);

    setFeedbackMsg(
      language === 'ar'
        ? 'تم تحديث صورة المنتج في المتجر بنجاح!'
        : 'Product cover photo updated successfully!'
    );
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-cairo text-stone-100" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="relative w-full max-w-3xl bg-stone-900 border border-amber-600/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Camera className="w-6 h-6 text-amber-400" />
            </span>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                {language === 'ar' ? 'استوديو رفع وتحديث الصور الحديثة 📸' : 'Modern Media & Photo Upload Studio 📸'}
              </h3>
              <p className="text-xs text-stone-400">
                {language === 'ar'
                  ? 'ارفع صور وتصاميم حديثة من جهازك أو بالرابط، وانشرها كمنتجات مباشرة أو حدّث بها كفرات المتجر.'
                  : 'Upload high-res photos from device or URL to publish new designs or update existing cases.'}
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

        {/* Tab switch */}
        <div className="flex items-center border-b border-stone-800 bg-stone-950/60 px-6">
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>{language === 'ar' ? 'رفع وتجهيز صورة جديدة' : 'Upload New Photo'}</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>{language === 'ar' ? 'مكتبة الصور المرفوعة' : 'Uploaded Library'}</span>
            <span className="px-1.5 py-0.5 rounded-full bg-stone-800 text-[10px] text-amber-400 font-mono">
              {uploadedMedia.length}
            </span>
          </button>
        </div>

        {/* Feedback Alert */}
        {feedbackMsg && (
          <div className="bg-emerald-950/80 border-b border-emerald-800/80 text-emerald-300 px-6 py-2.5 text-xs flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'upload' ? (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Upload Drop Zone / Camera Picker */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left: Input Sources */}
                <div className="space-y-4">
                  {/* Local File Picker */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-stone-700 hover:border-amber-500/80 rounded-2xl p-6 text-center cursor-pointer bg-stone-950/40 hover:bg-stone-800/40 transition-all flex flex-col items-center justify-center gap-2.5 group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">
                        {language === 'ar' ? 'انقر لاختيار صورة من جهازك أو اسحبها هنا' : 'Click to browse image or drag & drop'}
                      </p>
                      <p className="text-[11px] text-stone-400 mt-1">
                        PNG, JPG, WEBP حتى 20 ميجابايت (دقة عالية للطباعة)
                      </p>
                    </div>
                  </div>

                  {/* Or by Image URL */}
                  <div className="bg-stone-800/60 p-3.5 rounded-2xl border border-stone-700 space-y-2">
                    <label className="block text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                      <LinkIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>{language === 'ar' ? 'أو أدخل رابط صورة مباشرة من الإنترنت:' : 'Or paste high-res image URL:'}</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://images.unsplash.com/... أو رابط صورتك"
                        className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleLoadUrl}
                        className="px-3.5 py-2 bg-stone-700 hover:bg-stone-600 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                      >
                        {language === 'ar' ? 'معاينة' : 'Preview'}
                      </button>
                    </div>
                  </div>

                  {/* Image Meta: Title & Category */}
                  <div className="space-y-3 bg-stone-800/40 p-3.5 rounded-2xl border border-stone-700/80">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {language === 'ar' ? 'عنوان أو اسم التصميم:' : 'Design Title / Name:'}
                      </label>
                      <input
                        type="text"
                        value={imageTitle}
                        onChange={(e) => setImageTitle(e.target.value)}
                        placeholder={language === 'ar' ? 'مثال: أنمي دراجون بارز UV أو ماربل لافندر' : 'e.g. Cyber Dragon Anime UV Case'}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {language === 'ar' ? 'الكورنر أو التصنيف المناسب:' : 'Target Niche / Category:'}
                      </label>
                      <select
                        value={imageCategory}
                        onChange={(e) => setImageCategory(e.target.value as any)}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="anime">⚔️ كورنر الأنمي والمانجا (Anime & Manga)</option>
                        <option value="aesthetic">🌸 كورنر ترندات البنات والماربل (Aesthetic & Girls)</option>
                        <option value="football">⚽ كورنر الكورة والأندية (Football & Clubs)</option>
                        <option value="calligraphy">✒️ كورنر الخط العربي والروحانيات (Arabic Calligraphy)</option>
                        <option value="general">💎 تشكيلة عامة أو محافظ جلدية (General & Leather)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Right: Preview & Action Suite */}
                <div className="flex flex-col justify-between bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-stone-400 block mb-2">
                      {language === 'ar' ? 'معاينة الصورة المرفوعة:' : 'Image Live Preview:'}
                    </span>

                    {selectedImagePreview ? (
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-amber-500/40 bg-stone-900 shadow-md group">
                        <img
                          src={selectedImagePreview}
                          alt="Uploaded Preview"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-md text-[10px] text-amber-300 font-bold border border-amber-500/30">
                          {imageCategory.toUpperCase()}
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-[4/3] rounded-xl border border-dashed border-stone-800 flex flex-col items-center justify-center text-stone-600 gap-2 bg-stone-900/40">
                        <ImageIcon className="w-8 h-8" />
                        <span className="text-xs">
                          {language === 'ar' ? 'لم يتم اختيار أو رفع صورة بعد' : 'No photo uploaded yet'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions when photo is present */}
                  {selectedImagePreview && (
                    <div className="space-y-2 pt-2 border-t border-stone-800">
                      {/* Action 1: Publish as New Product */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <label className="text-[11px] text-stone-400">
                            {language === 'ar' ? 'السعر المقترح للمنتج (ج.م):' : 'Retail Price (EGP):'}
                          </label>
                          <input
                            type="number"
                            value={newProductPriceEGP}
                            onChange={(e) => setNewProductPriceEGP(e.target.value)}
                            className="w-20 bg-stone-900 border border-stone-700 rounded-lg px-2 py-1 text-xs text-white text-center font-bold"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={handlePublishAsProduct}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{language === 'ar' ? 'نشر كمنتج جديد في المتجر فوراً 🚀' : 'Publish as Live Store Product 🚀'}</span>
                        </button>
                      </div>

                      {/* Action 2: Update existing product cover */}
                      <div className="pt-2 border-t border-stone-800/80 space-y-1.5">
                        <label className="block text-[11px] text-stone-400">
                          {language === 'ar' ? 'أو استبدال وتحديث صورة منتج حالي:' : 'Or replace existing product image:'}
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={targetProductIdToUpdate}
                            onChange={(e) => setTargetProductIdToUpdate(e.target.value)}
                            className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-2.5 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                          >
                            <option value="">{language === 'ar' ? '-- اختر منتجاً لتحديث صورته --' : '-- Choose product --'}</option>
                            {products.map((p) => (
                              <option key={p.id} value={p.id}>
                                {language === 'ar' ? p.nameAr : p.nameEn}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            disabled={!targetProductIdToUpdate}
                            onClick={handleUpdateProduct}
                            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-200 font-bold text-xs rounded-xl transition-colors shrink-0"
                          >
                            {language === 'ar' ? 'تحديث' : 'Update'}
                          </button>
                        </div>
                      </div>

                      {/* Action 3: Open in 3D customizer */}
                      {onOpenCustomizerWithImage && (
                        <button
                          type="button"
                          onClick={() => {
                            onOpenCustomizerWithImage(selectedImagePreview);
                            onClose();
                          }}
                          className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Sliders className="w-3.5 h-3.5 text-amber-400" />
                          <span>{language === 'ar' ? 'معاينة التصميم في استوديو 3D' : 'Open in 3D Customizer'}</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
          ) : (
            /* Gallery of Uploaded Media */
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between text-xs text-stone-400 bg-stone-950/60 p-3 rounded-xl border border-stone-800">
                <span>
                  {language === 'ar'
                    ? 'الصور والتصاميم الحديثة المحفوظة في مكتبتك:'
                    : 'Saved media library assets ready for live store use:'}
                </span>
                <span className="font-mono text-amber-400 font-bold">
                  {uploadedMedia.length} {language === 'ar' ? 'تصميم متاح' : 'assets'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {uploadedMedia.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-stone-950/90 rounded-2xl border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group shadow-sm"
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-900 border border-stone-800">
                      <img
                        src={item.dataUrl}
                        alt={item.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded bg-black/70 text-[9px] text-amber-400 font-bold">
                        {item.category.toUpperCase()}
                      </span>
                    </div>

                    <div className="mt-2.5">
                      <h6 className="font-bold text-xs text-white truncate" title={item.title}>
                        {item.title}
                      </h6>
                      <span className="text-[10px] text-stone-500 block mt-0.5">{item.addedAt}</span>
                    </div>

                    <div className="mt-3 flex items-center gap-1 pt-2 border-t border-stone-800">
                      <button
                        onClick={() => {
                          setSelectedImagePreview(item.dataUrl);
                          setImageTitle(item.title);
                          setActiveTab('upload');
                        }}
                        className="flex-1 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white rounded-lg text-[10px] font-bold transition-colors"
                      >
                        {language === 'ar' ? 'استخدام' : 'Use Photo'}
                      </button>

                      {onOpenCustomizerWithImage && (
                        <button
                          onClick={() => {
                            onOpenCustomizerWithImage(item.dataUrl);
                            onClose();
                          }}
                          className="p-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-[10px]"
                          title="تجربة في الاستوديو"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>
            {language === 'ar'
              ? 'تتم معالجة الصور بدقة 1200 DPI لتتوافق مع ماكينات Mimaki اليابانية.'
              : 'Processed at 1200 DPI optimized for Japanese Mimaki UV printers.'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-xl transition-colors"
          >
            {language === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
