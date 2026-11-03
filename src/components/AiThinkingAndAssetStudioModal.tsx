import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Brain,
  Image as ImageIcon,
  Send,
  Copy,
  Check,
  Download,
  Smartphone,
  Share2,
  Clock,
  Layers,
  Zap,
  Wand2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText,
  HelpCircle,
  Eye,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Palette
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface AiThinkingAndAssetStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyImageToCustomizer?: (imageUrl: string) => void;
  onOpenSocialPosting?: () => void;
  initialTab?: 'thinking' | 'image_generator';
}

interface ThinkingQueryPreset {
  id: string;
  title: string;
  icon: string;
  badge: string;
  prompt: string;
  mode: 'phone_compatibility' | 'dropship_economics' | 'blog_hero_content' | 'deep_reasoning';
}

interface ImagePromptPreset {
  id: string;
  title: string;
  category: 'blog_hero' | 'phone_case' | 'concept_art';
  aspectRatio: '16:9' | '9:16' | '1:1';
  prompt: string;
  previewThumbnail: string;
  description: string;
}

const THINKING_PRESETS: ThinkingQueryPreset[] = [
  {
    id: 'preset-drop-test',
    title: '🛡️ الحماية العسكرية واختبارات السقوط MIL-STD-810G',
    icon: '🛡️',
    badge: 'هندسة الحماية',
    prompt: 'قم بتحليل فيزيائي وهندسي لقوة امتصاص الصدمات في كفرات هواتف كيستيك المزودة بحواف Air-Cushion TPU ومغناطيس ماج سيف N52، وقارنها بالكفرات الرخيصة عند السقوط على الخرسانة من ارتفاع 2.5 متر.',
    mode: 'phone_compatibility',
  },
  {
    id: 'preset-dropship-math',
    title: '💰 معادلة أرباح الدروب شيبينج ونقطة التعادل (Break-Even)',
    icon: '💰',
    badge: 'اقتصاديات واستثمار',
    prompt: 'احسب لي بدقة نموذج وحدة الاقتصاد (Unit Economics) لبيع 100 كفر هاتف شهرياً في مصر عبر دروب شيبينج كيستيك: تكلفة الكفر 160ج، سعر البيع 360ج، شحن بوسطة 50ج، ميزانية إعلانات فيسبوك/تيك توك 70ج للطلب، ونسبة مرتجعات 8%. كم صافي الأرباح؟',
    mode: 'dropship_economics',
  },
  {
    id: 'preset-blog-hero',
    title: '📝 كتابة مقال مدونة وبانر هيرو فيروسي (Blog Post Hero)',
    icon: '📝',
    badge: 'صناعة المحتوى الإعلاني',
    prompt: 'اكتب مقال مدونة تسويقي شيق بعنوان: "لماذا تدمّر الكفرات الرديئة هاتفك؟ الدليل الشامل لحماية الآيفون وسامسونج"، يتضمن عنوان هيرو جذاب، 4 أسباب علمية، وصف مفصل لبانر الهيرو 16:9 لتوليده بالذكاء الاصطناعي، ودعوة اتخاذ إجراء (CTA) قوية.',
    mode: 'blog_hero_content',
  },
  {
    id: 'preset-cairo-concept',
    title: '🎨 فلسفة دمج الخط العربي الأندلسي مع تقنية النانو UV',
    icon: '🎨',
    badge: 'استشارة فنية وتصميم',
    prompt: 'اقترح استراتيجية فنية متكاملة لابتكار كولكشن كفرات مدمجة بين الخط العربي الكوفي الهندسي ولمسات السايبربانك المستقبلية (Cyberpunk Arabic Calligraphy)، مع وصف الألوان المتباينة ومواضع بروز الذهب 3D.',
    mode: 'deep_reasoning',
  },
];

const IMAGE_PRESETS: ImagePromptPreset[] = [
  {
    id: 'img-preset-1',
    title: 'بانر هيرو مقال: آيفون مدرع وسط شرارات المستقبل',
    category: 'blog_hero',
    aspectRatio: '16:9',
    prompt: 'Ultra-cinematic 16:9 blog post hero banner, futuristic matte black armor phone case with glowing cyan neon geometric circuits, floating in mid-air amidst subtle golden sparks and clean dark studio shadows, 8k resolution, sleek industrial design',
    previewThumbnail: '/src/assets/images/hero_phone_leather_showcase_1793491261408.jpg',
    description: 'مثالي لهيدر المقالات والمدونة وإعلانات الفيسبوك العريضة',
  },
  {
    id: 'img-preset-2',
    title: 'تصميم كفر: خط عربي أندلسي بذهب 24K سائل ملموس',
    category: 'phone_case',
    aspectRatio: '9:16',
    prompt: 'Luxury Arabic calligraphy 9:16 vertical phone case artwork, embossed liquid gold 24k Diwani calligraphy verses on dark obsidian stone marble background, 3D raised tactile micro-textures, ultra-sharp detail, museum grade luxury',
    previewThumbnail: '/src/assets/images/islamic_gold_calligraphy_case_1793523903046.jpg',
    description: 'جاهز للتطبيق المباشر على كفر الموبايل في استوديو التخصيص',
  },
  {
    id: 'img-preset-3',
    title: 'فن مفاهيمي: سايبر ساموراي بدرع نيون هولوغرام',
    category: 'concept_art',
    aspectRatio: '1:1',
    prompt: 'Cyberpunk anime samurai warrior holding a glowing katana, holographic neon dragon energy aura surrounding him, hyper-detailed UV print texture, vibrant magenta and cyan reflections, dramatic dark backdrop',
    previewThumbnail: '/src/assets/images/anime_uv_case_1793495650837.jpg',
    description: 'أصل فني عالي الدقة للترويج والستيكرات وبوستات السوشيال',
  },
  {
    id: 'img-preset-4',
    title: 'بانر تقني: اختبار السقوط ومحاكاة امتصاص الصدمات',
    category: 'blog_hero',
    aspectRatio: '16:9',
    prompt: 'High speed photography 16:9 hero shot, rugged carbon-fiber smartphone impact test hitting granite floor, visible aerodynamic shockwave particles, titanium bumper protection, dramatic slow-motion lighting, commercial tech advertisement',
    previewThumbnail: '/src/assets/images/supercars_racing_case_1793523887729.jpg',
    description: 'هيرو بانر لإعلانات اختبارات القوة والحماية المعتمدة',
  },
];

export const AiThinkingAndAssetStudioModal: React.FC<AiThinkingAndAssetStudioModalProps> = ({
  isOpen,
  onClose,
  onApplyImageToCustomizer,
  onOpenSocialPosting,
  initialTab = 'thinking',
}) => {
  const { language, isRtl } = useLanguage();
  const [activeTab, setActiveTab] = useState<'thinking' | 'image_generator'>(initialTab);

  // High Thinking State
  const [thinkingPrompt, setThinkingPrompt] = useState<string>('');
  const [thinkingMode, setThinkingMode] = useState<'deep_reasoning' | 'phone_compatibility' | 'dropship_economics' | 'blog_hero_content'>('deep_reasoning');
  const [isThinkingLoading, setIsThinkingLoading] = useState<boolean>(false);
  const [thinkingResult, setThinkingResult] = useState<{
    text: string;
    thinkingProcess?: string;
    durationMs?: number;
    model?: string;
  } | null>(null);
  const [showThinkingProcess, setShowThinkingProcess] = useState<boolean>(true);
  const [copiedThinking, setCopiedThinking] = useState<boolean>(false);

  // Image Generator State
  const [imagePrompt, setImagePrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3' | '3:4'>('16:9');
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [imageResult, setImageResult] = useState<{
    imageUrl: string;
    prompt: string;
    aspectRatio: string;
    durationMs?: number;
  } | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [copiedImagePrompt, setCopiedImagePrompt] = useState<boolean>(false);

  if (!isOpen) return null;

  // Execute High Thinking reasoning request
  const handleExecuteThinking = async (promptToUse?: string, modeToUse?: any) => {
    const finalPrompt = (promptToUse || thinkingPrompt).trim();
    if (!finalPrompt) return;

    setIsThinkingLoading(true);
    setThinkingResult(null);

    try {
      const response = await fetch('/api/ai/high-thinking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalPrompt,
          mode: modeToUse || thinkingMode,
          includeGrounding: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      const data = await response.json();
      setThinkingResult(data);
    } catch (err: any) {
      console.error('High thinking error:', err);
      setThinkingResult({
        text: `حدث خطأ أثناء الاتصال بنموذج التفكير الفائق: ${err.message || 'يرجى التأكد من اتصال الخادم وإعادة المحاولة.'}`,
        thinkingProcess: 'تم فحص الاتصال بالخادم الداخلي للمنصة ولكن لم يتم استلام استجابة كافية.',
      });
    } finally {
      setIsThinkingLoading(false);
    }
  };

  // Execute Image Generation from text prompt
  const handleGenerateImage = async (promptToUse?: string, ratioToUse?: any) => {
    const finalPrompt = (promptToUse || imagePrompt).trim();
    if (!finalPrompt) return;

    setIsImageLoading(true);
    setImageError(null);

    try {
      const response = await fetch('/api/ai/generate-asset-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalPrompt,
          aspectRatio: ratioToUse || aspectRatio,
          category: 'blog_hero_and_concept_art',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const data = await response.json();
      setImageResult(data);
    } catch (err: any) {
      console.error('Image generation error:', err);
      setImageError(err.message || 'حدث خطأ أثناء توليد الصورة بالذكاء الاصطناعي.');
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleCopyText = (content: string, type: 'thinking' | 'prompt') => {
    navigator.clipboard.writeText(content);
    if (type === 'thinking') {
      setCopiedThinking(true);
      setTimeout(() => setCopiedThinking(false), 2000);
    } else {
      setCopiedImagePrompt(true);
      setTimeout(() => setCopiedImagePrompt(false), 2000);
    }
  };

  const handleDownloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden text-stone-100 flex flex-col my-4 max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with High-Thinking Badge */}
        <div className="px-6 py-4 border-b border-stone-800 bg-gradient-to-r from-stone-950 via-stone-900 to-indigo-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/40">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  وضع التفكير الفائق ومولد الأصول الذكية
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold border border-cyan-500/30">
                  ThinkingLevel: HIGH ⚡
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white">
                استوديو التعليل العميق وتوليد صور الهيرو والكونسبت آرت
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            title="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-stone-800 bg-stone-950/60 px-6 gap-3">
          <button
            onClick={() => setActiveTab('thinking')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'thinking'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Brain className="w-4 h-4 text-cyan-400" />
            <span>🧠 وضع التفكير الفائق (Deep Thinking / Complex Queries)</span>
          </button>

          <button
            onClick={() => setActiveTab('image_generator')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'image_generator'
                ? 'border-amber-400 text-amber-300 bg-amber-950/20'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span>🎨 توليد صور الهيرو والكونسبت آرت (Blog Heroes & Concept Art)</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

          {/* TAB 1: HIGH THINKING LAB */}
          {activeTab === 'thinking' && (
            <div className="space-y-6">
              
              {/* Introduction Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/30 to-slate-900 border border-cyan-500/30 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm text-stone-300 space-y-1">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <span>كيف يعمل وضع التفكير الفائق (High Thinking Mode)؟</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-mono">نشط ومفعل</span>
                  </h4>
                  <p className="text-stone-300 leading-relaxed text-xs">
                    يقوم النموذج بمنح الذكاء الاصطناعي وقتاً كافياً للتفكير المتأني ومحاكاة سلاسل الاستدلال المنطقي والرياضي قبل صياغة الإجابة. ممتاز لحل المعضلات الهندسية المعقدة، حسابات هوامش أرباح الدروب شيبينج، استراتيجيات التسويق الكبرى، وصياغة مقالات مدونة استثنائية.
                  </p>
                </div>
              </div>

              {/* Pre-made Complex Query Pills */}
              <div>
                <label className="text-xs font-bold text-stone-400 block mb-2">
                  ⚡ نماذج استفسارات معقدة جاهزة للتجربة بنقرة واحدة:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {THINKING_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setThinkingPrompt(preset.prompt);
                        setThinkingMode(preset.mode);
                        handleExecuteThinking(preset.prompt, preset.mode);
                      }}
                      className="p-3 text-start bg-stone-850 hover:bg-stone-800 rounded-xl border border-stone-750 hover:border-cyan-500/50 transition-all flex items-start gap-2.5 group shadow-sm active:scale-98"
                    >
                      <span className="text-lg shrink-0 mt-0.5">{preset.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {preset.title}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-stone-700 text-stone-300 font-mono">
                            {preset.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                          {preset.prompt}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Thinking Input Form */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-400">
                  <span>أو اكتب مسألتك أو استفسارك المعقد بالتفصيل:</span>
                  <span className="text-cyan-400 text-[11px]">يمنح الذكاء الاصطناعي وقتاً تحليلياً إضافياً</span>
                </div>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={thinkingPrompt}
                    onChange={(e) => setThinkingPrompt(e.target.value)}
                    placeholder="مثال: قم بدراسة جدوى كاملة لبيع كفرات الهواتف بالخط العربي، مع كتابة سيناريو إعلان فيديو تيك توك ومقال مدونة يشرح القيمة..."
                    className="w-full bg-stone-950 text-white placeholder-stone-500 rounded-2xl p-4 border border-stone-800 focus:outline-none focus:border-cyan-400 transition-all text-xs sm:text-sm leading-relaxed"
                  />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <button
                      onClick={() => handleExecuteThinking()}
                      disabled={isThinkingLoading || !thinkingPrompt.trim()}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-stone-950 font-black rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                    >
                      {isThinkingLoading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>الذكاء الاصطناعي يفكر بعمق...</span>
                        </>
                      ) : (
                        <>
                          <Brain className="w-3.5 h-3.5 text-stone-950" />
                          <span>تفكير متأمل وحل المسألة ⚡</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Loading Indicator with Thinking Animation */}
              {isThinkingLoading && (
                <div className="p-6 rounded-2xl bg-stone-950 border border-cyan-500/40 text-center space-y-3 animate-pulse">
                  <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    <Brain className="w-8 h-8 animate-bounce" />
                  </div>
                  <h4 className="font-extrabold text-white text-sm">
                    الذكاء الاصطناعي يقوم بالتفكير والتعليل العميق الآن (ThinkingLevel: HIGH)...
                  </h4>
                  <p className="text-xs text-stone-400 max-w-md mx-auto">
                    يتم تحليل المسألة وفحص التوافق الفيزيائي والهندسي والأرقام المالية لتقديم إجابة موثقة ودقيقة 100%.
                  </p>
                </div>
              )}

              {/* Result Container with Thinking Process Breakdown */}
              {thinkingResult && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {/* Thinking Process Accordion */}
                  {thinkingResult.thinkingProcess && (
                    <div className="rounded-2xl border border-indigo-500/40 bg-indigo-950/20 overflow-hidden">
                      <button
                        onClick={() => setShowThinkingProcess(!showThinkingProcess)}
                        className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-indigo-300 hover:bg-indigo-950/40 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4 text-indigo-400" />
                          <span>مسار التفكير المنطقي للذكاء الاصطناعي (Chain-of-Thought)</span>
                          {thinkingResult.durationMs && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 font-mono">
                              {(thinkingResult.durationMs / 1000).toFixed(1)} ثانية
                            </span>
                          )}
                        </div>
                        {showThinkingProcess ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {showThinkingProcess && (
                        <div className="p-4 border-t border-indigo-500/20 bg-stone-950/80 text-xs font-mono text-indigo-200/90 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                          {thinkingResult.thinkingProcess}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Final Output Content */}
                  <div className="rounded-2xl border border-cyan-500/40 bg-stone-950 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        <h4 className="font-extrabold text-sm text-white">
                          الحل والتحليل الاستشاري المكتمل:
                        </h4>
                      </div>

                      <button
                        onClick={() => handleCopyText(thinkingResult.text, 'thinking')}
                        className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 border border-stone-700"
                      >
                        {copiedThinking ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">تم النسخ</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-stone-400" />
                            <span>نسخ التحليل</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-line space-y-2">
                      {thinkingResult.text}
                    </div>

                    {/* Follow up actions */}
                    <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setActiveTab('image_generator')}
                        className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-stone-950" />
                        <span>توليد صورة هيرو أو كونسبت آرت لهذا المحتوى 🎨</span>
                      </button>

                      {onOpenSocialPosting && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenSocialPosting();
                          }}
                          className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-cyan-300 font-bold rounded-xl text-xs flex items-center gap-1.5 border border-cyan-800"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>نشر هذا المحتوى في سيستم السوشيال ميديا</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: IMAGE & ASSET GENERATOR */}
          {activeTab === 'image_generator' && (
            <div className="space-y-6">
              
              {/* Image Generator Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-yellow-950/30 to-stone-900 border border-amber-500/30 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                  <Wand2 className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm text-stone-300 space-y-1">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <span>مولد صور الهيرو والكونسبت آرت من النص (Text-to-Image AI)</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/20 text-amber-300 rounded font-mono">gemini-3.1-flash-lite-image</span>
                  </h4>
                  <p className="text-stone-300 leading-relaxed text-xs">
                    اكتب وصفاً لأي صورة، خلفية مقال مدونة (16:9 Blog Hero)، أو تصميم فني كفر موبايل (9:16)، وسيقوم الذكاء الاصطناعي بتوليدها مباشرة بجودة فائقة مع إمكانية تطبيقها فوراً على الكفر في استوديو التخصيص ثلاثي الأبعاد!
                  </p>
                </div>
              </div>

              {/* Ready Prompt Presets */}
              <div>
                <label className="text-xs font-bold text-stone-400 block mb-2">
                  ✨ أفكار وبرومبتات احترافية جاهزة للتوليد الفوري:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {IMAGE_PRESETS.map((preset) => (
                    <div
                      key={preset.id}
                      className="p-3 bg-stone-850 rounded-2xl border border-stone-800 hover:border-amber-500/50 transition-all flex items-start gap-3 group"
                    >
                      <img
                        src={preset.previewThumbnail}
                        alt={preset.title}
                        className="w-16 h-16 rounded-xl object-cover border border-stone-700 shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                            {preset.title}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                            {preset.aspectRatio}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400 line-clamp-1 mb-2">
                          {preset.description}
                        </p>
                        <button
                          onClick={() => {
                            setImagePrompt(preset.prompt);
                            setAspectRatio(preset.aspectRatio);
                            handleGenerateImage(preset.prompt, preset.aspectRatio);
                          }}
                          className="px-2.5 py-1 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-300 font-bold rounded-lg text-[10px] transition-colors flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>توليد هذه الصورة الآن</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Prompt Box */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-stone-400">
                  <span>اكتب وصف الصورة التي تريد توليدها (بالعربية أو الإنجليزية):</span>
                  <span className="text-amber-400 text-[11px]">يدعم تفاصيل الخامات، الإضاءة، ونوع اللقطة</span>
                </div>

                <textarea
                  rows={3}
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="مثال: Cinematic 16:9 hero banner of a luxury Arabic calligraphy phone case with liquid gold foil relief, dark obsidian marble, professional studio lighting, 8k..."
                  className="w-full bg-stone-950 text-white placeholder-stone-500 rounded-2xl p-4 border border-stone-800 focus:outline-none focus:border-amber-400 transition-all text-xs sm:text-sm leading-relaxed"
                />

                {/* Aspect Ratio Selector & Trigger */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-400 font-bold">أبعاد الصورة (Aspect Ratio):</span>
                    <div className="flex items-center gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-800">
                      {(['16:9', '9:16', '1:1', '4:3', '3:4'] as const).map((ratio) => (
                        <button
                          key={ratio}
                          type="button"
                          onClick={() => setAspectRatio(ratio)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                            aspectRatio === ratio
                              ? 'bg-amber-500 text-stone-950'
                              : 'text-stone-400 hover:text-white'
                          }`}
                        >
                          {ratio}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleGenerateImage()}
                    disabled={isImageLoading || !imagePrompt.trim()}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 disabled:opacity-40 text-stone-950 font-black rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                  >
                    {isImageLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                        <span>الذكاء الاصطناعي يرسم الأصول الآن...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 text-stone-950" />
                        <span>توليد الصورة عالية الدقة 🎨</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image Loading State */}
              {isImageLoading && (
                <div className="p-8 rounded-3xl bg-stone-950 border border-amber-500/40 text-center space-y-3 animate-pulse">
                  <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <Wand2 className="w-8 h-8 animate-spin" />
                  </div>
                  <h4 className="font-extrabold text-white text-sm">
                    جاري توليد الصورة الفائقة بموديل gemini-3.1-flash-lite-image...
                  </h4>
                  <p className="text-xs text-stone-400 max-w-sm mx-auto">
                    يتم رسم وتنسيق تفاصيل الإضاءة والظلال ثلاثية الأبعاد بدقة استوديو تصوير احترافي.
                  </p>
                </div>
              )}

              {/* Image Error Alert */}
              {imageError && (
                <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs flex items-center justify-between">
                  <span>{imageError}</span>
                  <button
                    onClick={() => handleGenerateImage()}
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold"
                  >
                    إعادة المحاولة
                  </button>
                </div>
              )}

              {/* Generated Image Result Card */}
              {imageResult && (
                <div className="p-5 rounded-3xl bg-stone-950 border border-amber-500/40 space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h4 className="font-extrabold text-sm text-white">الصورة المولدة بنجاح:</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                        {imageResult.aspectRatio}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyText(imageResult.prompt, 'prompt')}
                        className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 border border-stone-700"
                      >
                        {copiedImagePrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>نسخ البرومبت</span>
                      </button>

                      <button
                        onClick={() => handleDownloadImage(imageResult.imageUrl, `casetech-ai-asset-${Date.now()}.png`)}
                        className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-amber-400 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 border border-stone-700"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>تحميل الأصل (Download)</span>
                      </button>
                    </div>
                  </div>

                  {/* Rendered Image Preview Frame */}
                  <div className="relative rounded-2xl overflow-hidden bg-black/80 border border-stone-800 flex items-center justify-center p-2">
                    <img
                      src={imageResult.imageUrl}
                      alt="Generated AI Concept Art"
                      className="max-h-[380px] w-auto object-contain rounded-xl shadow-2xl transition-transform hover:scale-102"
                    />
                  </div>

                  {/* Action Buttons: Apply to phone case, or use in social */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      {onApplyImageToCustomizer && (
                        <button
                          onClick={() => {
                            onApplyImageToCustomizer(imageResult.imageUrl);
                            onClose();
                          }}
                          className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                        >
                          <Smartphone className="w-4 h-4 text-stone-950" />
                          <span>📱 تطبيق فوراً على كفر الموبايل في استوديو التخصيص</span>
                        </button>
                      )}

                      {onOpenSocialPosting && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenSocialPosting();
                          }}
                          className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-all"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>📢 نشر هذا البانر في إعلانات السوشيال</span>
                        </button>
                      )}
                    </div>

                    <span className="text-[11px] text-stone-400 font-mono">
                      توليد فوري من خلال Google GenAI SDK
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-stone-300">الذكاء الاصطناعي مجهز بنموذج Gemini 3 المتقدم مع ميزة التفكير العالي</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl transition-colors"
          >
            إغلاق النافذة
          </button>
        </div>

      </div>
    </div>
  );
};
