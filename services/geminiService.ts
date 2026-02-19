
import { GoogleGenAI, Type } from "@google/genai";
import { ArticleOutline, ArticleContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateEncyclopediaOutline = async (topic: string): Promise<ArticleOutline[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `أنشئ خطة موسوعة علمية شاملة عن الموضوع التالي: "${topic}". 
    يجب أن تتضمن الخطة 4 إلى 6 عناوين لمقالات تغطي جوانب مختلفة (تاريخية، علمية، تطبيقية، مستقبلية، إلخ).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            category: { type: Type.STRING }
          },
          required: ["id", "title", "summary", "category"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse outline JSON", e);
    throw new Error("حدث خطأ أثناء تنظيم محتوى الموسوعة.");
  }
};

export const generateArticleDetail = async (topic: string, articleOutline: ArticleOutline): Promise<ArticleContent> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `اكتب مقالاً علمياً مفصلاً وعميقاً بعنوان "${articleOutline.title}" كجزء من موسوعة عن "${topic}".
    يجب أن يكون الأسلوب أكاديمياً، دقيقاً، ومشوقاً باللغة العربية.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          sections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                heading: { type: Type.STRING },
                content: { type: Type.STRING }
              },
              required: ["heading", "content"]
            }
          },
          facts: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          conclusion: { type: Type.STRING }
        },
        required: ["id", "title", "sections", "facts", "conclusion"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse article detail JSON", e);
    throw new Error("حدث خطأ أثناء توليد تفاصيل المقال.");
  }
};

export const generateArticleImage = async (prompt: string): Promise<string | undefined> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A high-quality scientific illustration or realistic photograph representing: ${prompt}. Cinematic lighting, educational encyclopedia style.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (e) {
    console.warn("Image generation failed, using placeholder.", e);
  }
  return undefined;
};
