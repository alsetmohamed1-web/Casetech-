import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Search,
  Globe,
  CheckCircle,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
  Copy,
  Check,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';

interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  groundingChunks?: GroundingChunk[];
  webSearchQueries?: string[];
}

interface GoogleSearchAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSearchAgentModal: React.FC<GoogleSearchAgentModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'current_events' | 'fact_check' | 'tech_market'>('current_events');
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `أهلاً بك! أنا وكيلك الذكي المتصل مباشرة ببيانات بحث جوجل في الوقت الفعلي (Google Search Grounding).
يمكنني:
• **مناقشة الأحداث الجارية والأخبار العاجلة** حول العالم والمجتمع العربي فور حدوثها.
• **التحقق من صحة المعلومات وتدقيق الشائعات** مع إبراز المصادر المؤكدة.
• **رصد أحدث إعلانات الهواتف الذكية وتطورات السوق والأسعار**.

كيف يمكنني مساعدتك اليوم؟ يمكنك كتابة سؤالك أو اختيار أحد المواضيع المقترحة بالأسفل.`,
      timestamp: 'الآن',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || isLoading) return;

    setErrorMsg(null);
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setIsLoading(true);

    try {
      // Build conversation history excluding initial welcome message
      const history = messages
        .filter((m) => m.id !== 'welcome-msg')
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch('/api/search-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text.trim(),
          mode,
          history,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'فشل الاتصال بالوكيل أو محرك بحث جوجل.');
      }

      const data = await res.json();

      const assistantMsg: Message = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: data.text,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        groundingChunks: data.groundingChunks || [],
        webSearchQueries: data.webSearchQueries || [],
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'حدث خطأ غير متوقع أثناء استرجاع بيانات بحث جوجل.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const PRESET_QUERIES = [
    {
      label: 'أبرز الأخبار العاجلة اليوم',
      prompt: 'ما هي أهم الأحداث الجارية والأخبار العاجلة اليوم في العالم العربي وحول العالم؟ لخصها مع ذكر المصادر.',
      targetMode: 'current_events' as const,
    },
    {
      label: 'التحقق من صحة إشاعة أو خبر',
      prompt: 'كيف يمكنني التحقق من صحة الأخبار المتداولة اليوم على مواقع التواصل الاجتماعي؟ وما هي أحدث الشائعات التي تم دحضها رسمياً؟',
      targetMode: 'fact_check' as const,
    },
    {
      label: 'أحدث هواتف آيفون وسامسونج الصادرة',
      prompt: 'ما هي أحدث هواتف آيفون وسامسونج وجوجل بيكسل التي تم الإعلان عنها مؤخراً ومواصفاتها وأسعارها الحالية؟',
      targetMode: 'tech_market' as const,
    },
    {
      label: 'أسعار صرف العملات والذهب اليوم',
      prompt: 'ما هو سعر صرف الجنيه المصري والريال السعودي والدولار وأسعار الذهب اليوم وفقاً لآخر التحديثات؟',
      targetMode: 'tech_market' as const,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-auto text-stone-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 bg-stone-950/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-amber-500 to-emerald-500 p-0.5 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center text-amber-400">
                <Globe className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">وكيل جوجل للبحث اللحظي وتدقيق المعلومات</h2>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE GOOGLE SEARCH
                </span>
              </div>
              <p className="text-xs text-stone-400">
                مناقشة الأحداث الجارية، الاستشهاد بالأخبار الحديثة، والتحقق من صحة المعلومات في الوقت الفعلي
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

        {/* Mode Selector Strip */}
        <div className="px-6 py-2.5 bg-stone-950/60 border-b border-stone-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-stone-400 shrink-0 font-semibold">نمط البحث:</span>
          
          <button
            onClick={() => setMode('current_events')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              mode === 'current_events'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>الأحداث الجارية والأخبار</span>
          </button>

          <button
            onClick={() => setMode('fact_check')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              mode === 'fact_check'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>تدقيق الحقائق وصحة المعلومات</span>
          </button>

          <button
            onClick={() => setMode('tech_market')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              mode === 'tech_market'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>أخبار الهواتف والأسواق والأسعار</span>
          </button>
        </div>

        {/* Chat History Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 space-y-3 ${
                  msg.role === 'user'
                    ? 'bg-amber-500 text-stone-950 font-medium rounded-tr-none shadow-md'
                    : 'bg-stone-950 border border-stone-800 text-stone-100 rounded-tl-none shadow-lg'
                }`}
              >
                {/* Message Header */}
                <div className="flex items-center justify-between gap-4 text-[11px] opacity-75 border-b border-current/10 pb-1.5">
                  <span className="font-bold flex items-center gap-1.5">
                    {msg.role === 'user' ? (
                      'سؤالك'
                    ) : (
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <Globe className="w-3.5 h-3.5" />
                        وكيل بحث جوجل المباشر
                      </span>
                    )}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Real-time Google Search Queries Performed */}
                {msg.webSearchQueries && msg.webSearchQueries.length > 0 && (
                  <div className="p-2.5 bg-stone-900/90 rounded-xl border border-stone-800 text-xs space-y-1 text-stone-300">
                    <span className="text-[10px] text-stone-400 block font-semibold flex items-center gap-1">
                      <Search className="w-3 h-3 text-amber-400" />
                      عمليات بحث جوجل التي تم إجراؤها في الوقت الفعلي:
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.webSearchQueries.map((q, idx) => (
                        <span
                          key={idx}
                          className="bg-stone-800 px-2 py-0.5 rounded text-[11px] text-amber-300 border border-stone-700 font-mono"
                        >
                          &ldquo;{q}&rdquo;
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message Content (Formatted Markdown) */}
                <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </div>

                {/* Grounding Source Citations (Clickable web references) */}
                {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                  <div className="pt-2 border-t border-stone-800/80 space-y-2">
                    <span className="text-[11px] font-bold text-amber-400 block flex items-center gap-1">
                      <ExternalLink className="w-3.5 h-3.5" />
                      المصادر وروابط البحث المستشهد بها:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.groundingChunks.map((chunk, idx) => {
                        if (!chunk.web) return null;
                        return (
                          <a
                            key={idx}
                            href={chunk.web.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-stone-900 hover:bg-stone-800/80 border border-stone-800 hover:border-amber-500/50 rounded-lg text-right transition-colors flex items-center justify-between gap-2 group"
                          >
                            <div className="overflow-hidden">
                              <span className="block text-xs font-semibold text-stone-200 group-hover:text-amber-400 truncate">
                                {chunk.web.title || 'مصدر إخباري'}
                              </span>
                              <span className="block text-[10px] text-stone-500 truncate font-mono">
                                {chunk.web.uri}
                              </span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 shrink-0" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Copy Button */}
                {msg.role === 'assistant' && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="text-[11px] text-stone-400 hover:text-stone-200 flex items-center gap-1 transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>نسخ الإجابة</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-2.5">
              <div className="p-4 bg-stone-950 border border-stone-800 rounded-2xl rounded-tl-none text-xs text-stone-300 flex items-center gap-3">
                <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
                <span>جاري البحث في نتائج جوجل الحية واستخراج أحدث المعلومات والاستشهادات...</span>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-6 py-2 bg-stone-950/40 border-t border-stone-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-stone-500 shrink-0 text-[11px]">مواضيع مقترحة:</span>
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setMode(preset.targetMode);
                handleSendMessage(preset.prompt);
              }}
              className="px-2.5 py-1 bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white rounded-lg whitespace-nowrap text-[11px] transition-colors border border-stone-700/50"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Input Form Bar */}
        <div className="p-4 bg-stone-950 border-t border-stone-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="اكتب سؤالك، موضوعاً ترغب في مناقشته، أو خبراً تريد التحقق من صحته عبر جوجل..."
              className="flex-1 bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 disabled:opacity-40 whitespace-nowrap active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>بحث وتحقق</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
