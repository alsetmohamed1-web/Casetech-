import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Initialize Gemini Client server-side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Google Search Grounding Agent Endpoint
  app.post('/api/search-agent', async (req, res) => {
    try {
      const { prompt, mode, history } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt is required.' });
      }

      let systemInstruction = `أنت وكيل ذكي فائق الدقة متصل مباشرة ببيانات بحث جوجل في الوقت الفعلي (Google Search Grounding).
مهمتك:
1. مناقشة الأحداث الجارية وآخر الأخبار المحلية والدولية استناداً إلى نتائج البحث الحية.
2. الاستشهاد بالمصادر الإخبارية الحديثة مع ذكر التواريخ والأسماء بدقة وموضوعية.
3. التحقق من صحة المعلومات والشائعات والأخبار المتداولة وتقديم حكم مدقق (صحيح، مضلل، غير دقيق، مؤكد).
4. الإجابة دائماً باللغة العربية بأسلوب راقٍ، مهني، وموثوق، مع تنسيق النقاط والعناوين بوضوح.
قم دائماً بالاعتماد على نتائج بحث جوجل المسترجعة لتحديث معرفتك باللحظة الراهنة.`;

      if (mode === 'fact_check') {
        systemInstruction += `\nنمط العمل الحالي: [تدقيق الحقائق والتحقق من صحة المعلومات].
قم ببحث متعمق في جوجل للتحقق من الادعاء، وقدم ملخصاً سريعاً لدرجة الصحة (مؤكد / غير صحيح / غير دقيق / قيد التحقيق) مع الأدلة الموثقة وروابط المصادر.`;
      } else if (mode === 'current_events') {
        systemInstruction += `\nنمط العمل الحالي: [الأحداث الجارية والأخبار العاجلة].
ركز على تقديم أحدث ما نشر اليوم وفي الأيام القليلة الماضية مع استعراض الأبعاد والتفاصيل.`;
      } else if (mode === 'tech_market') {
        systemInstruction += `\nنمط العمل الحالي: [أخبار التقنية والهواتف والأسواق].
ركز على أحدث إصدارات الهواتف الذكية، أسعار الصرف، أخبار التجارة الإلكترونية وسلاسل التوريد.`;
      }

      // Build conversation contents if history provided
      let contents: any[] = [];
      if (Array.isArray(history) && history.length > 0) {
        contents = history.map((h: any) => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }],
        }));
      }
      contents.push({ role: 'user', parts: [{ text: prompt }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
        },
      });

      const responseText = response.text || 'لم يتم استرجاع إجابة.';
      const candidate = response.candidates?.[0];
      const groundingMetadata = candidate?.groundingMetadata;

      const groundingChunks = groundingMetadata?.groundingChunks || [];
      const webSearchQueries = groundingMetadata?.webSearchQueries || [];
      const searchEntryPoint = groundingMetadata?.searchEntryPoint?.renderedContent;

      return res.json({
        text: responseText,
        groundingChunks,
        webSearchQueries,
        searchEntryPoint,
      });
    } catch (error: any) {
      console.error('Error in /api/search-agent:', error);
      return res.status(500).json({
        error: error.message || 'حدث خطأ أثناء الاتصال بمحرك بحث جوجل.',
      });
    }
  });

  // 1. High Thinking AI Endpoint (Reasoning Mode for complex queries)
  app.post('/api/ai/high-thinking', async (req, res) => {
    const startTime = Date.now();
    try {
      const { prompt, mode = 'deep_reasoning', history = [], userRole, includeGrounding = false } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt is required and must be a string.' });
      }

      let systemInstruction = `أنت الذكاء الاصطناعي الاستشاري الأعلى كفاءة لمنصة "كيستيك | CaseTech" (المنصة الرائدة في تصنيع كفرات الهواتف التكنولوجية، والمحافظ الجلدية الفاخرة، وحماية الهواتف المدرعة، والطباعة ثلاثية الأبعاد UV).
أنت الآن تعمل في "وضع التفكير الفائق والتعليل العميق (High Thinking / Deep Reasoning Mode)".

مهمتك في هذا الوضع:
1. التفكير المتأني والتحليلي لحل المسائل المعقدة، مثل: التوافق الهندسي لموديلات الهواتف وحسابات امتصاص الصدمات، معادلات تسعير الدروب شيبينج وهوامش الربح الصافية، واستراتيجيات الحملات التسويقية الإبداعية وكتابة مقالات مدونة احترافية (Blog Post Heroes & Articles).
2. تقديم إجابات مفصلة، احترافية، مدعومة بالأرقام والخطوات الدقيقة بدون تسرع.
3. التمييز بين أنواع الخامات (الحواف الهوائية Air-Cushion TPU، مغناطيس N52 النيوديميوم للماج سيف، طبقات النانو المضادة للاصفرار، والجلد الطبيعي المدبوغ نباتياً).
4. الرد دائماً بأسلوب منظم، عناوين واضحة، ونقاط محددة باللغة العربية (مع المصطلحات التقنية المعتمدة).
5. إذا طلب المستخدم كتابة مقال أو سكريبت فيديو أو خطة إعلانية، قم بتقديم هيكل تسويقي كامل ومقنع مع العناوين الرئيسية (Hero Headlines)، ونقاط الإقناع، ودعوات اتخاذ الإجراء (CTAs).`;

      if (mode === 'phone_compatibility') {
        systemInstruction += `\nنمط العمل: [الاستشارة الهندسية والتوافق مع الموديلات وحماية الصدمات].
قم بتحليل موديل الجهاز، أبعاد عدسات الكاميرا، توافق الشحن اللاسلكي والماج سيف، ومقارنة قوة امتصاص الصدمات (Drop Test Standards MIL-STD-810G).`;
      } else if (mode === 'dropship_economics') {
        systemInstruction += `\nنمط العمل: [حسابات واقتصاديات الدروب شيبينج وسلاسل التوريد].
قم بحساب تكلفة القطعة، مصاريف الشحن مع بوسطة، نسبة مرتجعات التجارة الإلكترونية، تكلفة الإعلانات لكل طلب (CPA)، وهوامش الربح الصافية (Net Profit Margin).`;
      } else if (mode === 'blog_hero_content') {
        systemInstruction += `\nنمط العمل: [صياغة مقالات المدونة الإبداعية ورؤى تصاميم الأصول التسويقية].
اكتب مقالاً متكاملاً أو محتوى تسويقياً رفيع المستوى يوضح القيمة الفريدة للكفرات، ويتضمن برومبتات مقترحة لتوليد صور الـ Hero Banner والـ Concept Art بالذكاء الاصطناعي.`;
      }

      // Build conversation contents
      let contents: any[] = [];
      if (Array.isArray(history) && history.length > 0) {
        contents = history.slice(-6).map((h: any) => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content || h.text || '' }],
        }));
      }
      contents.push({ role: 'user', parts: [{ text: prompt }] });

      const config: any = {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      };

      if (includeGrounding) {
        config.tools = [{ googleSearch: {} }];
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config,
      });

      const parts = response.candidates?.[0]?.content?.parts ?? [];
      let thoughts = '';
      let textResult = '';

      for (const part of parts) {
        if ((part as any).thought) {
          thoughts += (part as any).text || '';
        } else if (part.text) {
          textResult += part.text;
        }
      }

      if (!textResult && response.text) {
        textResult = response.text;
      }

      const durationMs = Date.now() - startTime;

      return res.json({
        text: textResult,
        thinkingProcess: thoughts,
        durationMs,
        model: 'gemini-3.8-flash',
        thinkingLevel: 'HIGH',
      });
    } catch (error: any) {
      console.error('Error in /api/ai/high-thinking:', error);
      return res.status(500).json({
        error: error.message || 'حدث خطأ أثناء تشغيل وضع التفكير الفائق.',
      });
    }
  });

  // 2. High-Quality Image Generation from Text Prompt Endpoint (Blog heroes, concept art, phone case assets)
  app.post('/api/ai/generate-asset-image', async (req, res) => {
    const startTime = Date.now();
    try {
      const { prompt, aspectRatio = '1:1', category = 'concept_art', style = 'photorealistic' } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Text prompt is required.' });
      }

      // Build detailed enriched prompt for high quality output
      let enrichedPrompt = prompt.trim();
      if (!enrichedPrompt.toLowerCase().includes('high quality') && !enrichedPrompt.toLowerCase().includes('photorealistic')) {
        enrichedPrompt = `${enrichedPrompt}, masterpiece, ultra-high resolution, studio product photography, hyper-detailed, clean lighting, 8k, professional concept art`;
      }

      // Validate supported aspect ratios: "1:1", "3:4", "4:3", "9:16", "16:9"
      const validAspectRatios = ['1:1', '3:4', '4:3', '9:16', '16:9'];
      const finalAspectRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : '1:1';

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts: [
            {
              text: enrichedPrompt,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: finalAspectRatio,
          },
        },
      });

      let imageUrl = '';
      let mimeType = 'image/png';

      for (const part of response.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData?.data) {
          const base64Data = part.inlineData.data;
          mimeType = part.inlineData.mimeType ?? 'image/png';
          imageUrl = `data:${mimeType};base64,${base64Data}`;
          break;
        }
      }

      if (!imageUrl) {
        return res.status(500).json({
          error: 'لم تتمكن خدمة توليد الصور من إرجاع صورة لهذه المحاولة. يرجى تجربة وصف آخر.',
        });
      }

      const durationMs = Date.now() - startTime;

      return res.json({
        imageUrl,
        prompt: enrichedPrompt,
        originalPrompt: prompt,
        aspectRatio: finalAspectRatio,
        category,
        durationMs,
        model: 'gemini-3.1-flash-lite-image',
      });
    } catch (error: any) {
      console.error('Error in /api/ai/generate-asset-image:', error);
      return res.status(500).json({
        error: error.message || 'فشل توليد الصورة بالذكاء الاصطناعي.',
      });
    }
  });

  // Vite middleware in dev or static files in prod
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
