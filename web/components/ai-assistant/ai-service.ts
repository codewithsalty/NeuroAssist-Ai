interface AIServiceOptions {
  predictionResult?: any
  language?: string
  aiProvider?: "gemini" | "mistral"
  conversationHistory?: any[]
}

class AIService {
  private geminiApiKey: string
  private mistralApiKey: string

  constructor() {
    this.geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
    this.mistralApiKey = process.env.NEXT_PUBLIC_MISTRAL_API_KEY || ""
  }

  async generateResponse(userMessage: string, options: AIServiceOptions = {}): Promise<string> {
    const { predictionResult, language = "en", aiProvider = "gemini" } = options

    try {
      if (aiProvider === "gemini") {
        return await this.generateGeminiResponse(userMessage, options)
      } else {
        return await this.generateMistralResponse(userMessage, options)
      }
    } catch (error) {
      console.error(`Error with ${aiProvider}:`, error)
      // Fallback to contextual responses
      return this.generateContextualResponse(userMessage, options)
    }
  }

  private async generateGeminiResponse(userMessage: string, options: AIServiceOptions): Promise<string> {
    if (!this.geminiApiKey) {
      return this.generateContextualResponse(userMessage, options)
    }

    const systemPrompt = this.getSystemPrompt(options)

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\nUser: ${userMessage}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    return data.candidates[0]?.content?.parts[0]?.text || this.generateContextualResponse(userMessage, options)
  }

  private async generateMistralResponse(userMessage: string, options: AIServiceOptions): Promise<string> {
    if (!this.mistralApiKey) {
      return this.generateContextualResponse(userMessage, options)
    }

    const systemPrompt = this.getSystemPrompt(options)

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.mistralApiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-medium",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      throw new Error(`Mistral API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || this.generateContextualResponse(userMessage, options)
  }

  private getSystemPrompt(options: AIServiceOptions): string {
    const { language = "en", predictionResult } = options

    const basePrompt = {
      en: `You are a professional medical AI assistant for NeuroAssist, a brain tumor screening platform. You help users understand brain tumor detection, MRI analysis, and glioma staging. 

Key responsibilities:
- Explain brain tumor types (glioma, meningioma, pituitary, no tumor)
- Guide users through MRI upload process
- Explain genetic mutation analysis for glioma staging
- Provide empathetic, professional medical guidance
- Always recommend consulting healthcare professionals
- Be supportive and informative, not alarming

Respond in a caring, professional medical tone. Keep responses concise but informative.`,

      ur: `آپ NeuroAssist کے لیے ایک پیشہ ور طبی AI اسسٹنٹ ہیں، جو دماغی ٹیومر کی جانچ کا پلیٹ فارم ہے۔ آپ صارفین کو دماغی ٹیومر کی تشخیص، MRI تجزیہ، اور گلیوما کی درجہ بندی سمجھنے میں مدد کرتے ہیں۔

اہم ذمہ داریاں:
- دماغی ٹیومر کی اقسام کی وضاحت
- MRI اپ لوڈ کے عمل میں رہنمائی
- گلیوما کی درجہ بندی کے لیے جینیاتی تبدیلی کا تجزیہ
- ہمدردانہ، پیشہ ورانہ طبی رہنمائی فراہم کرنا
- ہمیشہ صحت کی دیکھ بھال کے پیشہ ور افراد سے مشورہ کرنے کی تجویز دینا

خیال رکھنے والے، پیشہ ورانہ طبی لہجے میں جواب دیں۔`,

      ar: `أنت مساعد ذكي طبي محترف لـ NeuroAssist، منصة فحص أورام الدماغ. تساعد المستخدمين على فهم اكتشاف أورام الدماغ وتحليل الرنين المغناطيسي وتصنيف الورم الدبقي.

المسؤوليات الرئيسية:
- شرح أنواع أورام الدماغ
- إرشاد المستخدمين خلال عملية تحميل الرنين المغناطيسي
- شرح تحليل الطفرات الجينية لتصنيف الورم الدبقي
- تقديم إرشادات طبية مهنية ومتعاطفة
- التوصية دائماً بالتشاور مع المهنيين الصحيين

اجب بنبرة طبية مهنية ومهتمة. اجعل الردود موجزة ولكن مفيدة.`,
    }

    let prompt = basePrompt[language as keyof typeof basePrompt] || basePrompt.en

    if (predictionResult) {
      prompt += `\n\nCurrent prediction result: ${JSON.stringify(predictionResult)}`
    }

    return prompt
  }

  private generateContextualResponse(userMessage: string, options: AIServiceOptions): string {
    const { language = "en", predictionResult } = options
    const lowerMessage = userMessage.toLowerCase()

    // Greeting responses
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("help")) {
      return this.getLocalizedResponse("greeting", language)
    }

    // Upload help
    if (lowerMessage.includes("upload") || lowerMessage.includes("image") || lowerMessage.includes("mri")) {
      return this.getLocalizedResponse("upload_help", language)
    }

    // Mutation/genetic questions
    if (lowerMessage.includes("mutation") || lowerMessage.includes("gene") || lowerMessage.includes("genetic")) {
      return this.getLocalizedResponse("mutation_help", language)
    }

    // Tumor information
    if (lowerMessage.includes("tumor") || lowerMessage.includes("brain") || lowerMessage.includes("cancer")) {
      return this.getLocalizedResponse("tumor_info", language)
    }

    // Prediction result explanation
    if (predictionResult) {
      return this.explainPredictionResult(predictionResult, language)
    }

    // Default response
    return this.getLocalizedResponse("default", language)
  }

  private getLocalizedResponse(type: string, language: string): string {
    const responses = {
      greeting: {
        en: "Hello! I'm your NeuroAssist AI companion. I can help you understand brain tumor screening, guide you through the process, and explain results. What would you like to know?",
        ur: "السلام علیکم! میں آپ کا NeuroAssist AI ساتھی ہوں۔ میں آپ کو دماغی ٹیومر کی جانچ سمجھنے، عمل میں رہنمائی کرنے، اور نتائج کی وضاحت کرنے میں مدد کر سکتا ہوں۔",
        ar: "مرحباً! أنا مساعدك الذكي في NeuroAssist. يمكنني مساعدتك في فهم فحص أورام الدماغ وإرشادك خلال العملية وشرح النتائج.",
      },
      upload_help: {
        en: "To upload your MRI image, click the upload area or drag and drop your file. We support JPG, PNG, and DICOM formats. Ensure the image clearly shows the brain scan for accurate analysis.",
        ur: "اپنی MRI تصویر اپ لوڈ کرنے کے لیے، اپ لوڈ ایریا پر کلک کریں یا فائل کو گھسیٹ کر چھوڑیں۔ ہم JPG، PNG، اور DICOM فارمیٹس کو سپورٹ کرتے ہیں۔",
        ar: "لتحميل صورة الرنين المغناطيسي، انقر على منطقة التحميل أو اسحب الملف وأفلته. ندعم تنسيقات JPG و PNG و DICOM.",
      },
      mutation_help: {
        en: "For glioma staging, we analyze genetic mutations like IDH1, TP53, ATRX, and others. Select 'Positive' if the gene is mutated or 'Negative' if normal. This helps determine the glioma grade and treatment approach.",
        ur: "گلیوما کی درجہ بندی کے لیے، ہم IDH1، TP53، ATRX جیسے جینیاتی تبدیلیوں کا تجزیہ کرتے ہیں۔ اگر جین میں تبدیلی ہے تو 'مثبت' اور اگر نارمل ہے تو 'منفی' منتخب کریں۔",
        ar: "لتصنيف الورم الدبقي، نحلل الطفرات الجينية مثل IDH1 و TP53 و ATRX وغيرها. اختر 'إيجابي' إذا كان الجين متحوراً أو 'سلبي' إذا كان طبيعياً.",
      },
      tumor_info: {
        en: "Brain tumors are abnormal cell growths in the brain. Our AI detects gliomas (from brain cells), meningiomas (from brain membranes), and pituitary tumors. Early detection improves treatment outcomes significantly.",
        ur: "دماغی ٹیومر دماغ میں خلیوں کی غیر معمولی نشوونما ہیں۔ ہمارا AI گلیوما، مینن جیوما، اور پٹیوٹری ٹیومر کا پتہ لگاتا ہے۔ جلدی تشخیص علاج کے نتائج کو نمایاں طور پر بہتر بناتی ہے۔",
        ar: "أورام الدماغ هي نمو غير طبيعي للخلايا في الدماغ. يكتشف الذكاء الاصطناعي لدينا الأورام الدبقية والسحائية وأورام الغدة النخامية. الاكتشاف المبكر يحسن نتائج العلاج بشكل كبير.",
      },
      default: {
        en: "I'm here to help with brain tumor screening questions. You can ask about the process, uploading images, understanding results, or general tumor information. How can I assist you?",
        ur: "میں دماغی ٹیومر کی جانچ کے سوالات میں مدد کے لیے یہاں ہوں۔ آپ عمل، تصاویر اپ لوڈ کرنے، نتائج سمجھنے، یا عمومی ٹیومر کی معلومات کے بارے میں پوچھ سکتے ہیں۔",
        ar: "أنا هنا للمساعدة في أسئلة فحص أورام الدماغ. يمكنك السؤال عن العملية أو تحميل الصور أو فهم النتائج أو معلومات عامة عن الأورام.",
      },
    }

    return (
      responses[type as keyof typeof responses]?.[language as keyof typeof responses.greeting] || responses.default.en
    )
  }

  private explainPredictionResult(result: any, language: string): string {
    if (result.tumor_type) {
      switch (result.tumor_type) {
        case "glioma":
          return language === "en"
            ? "A glioma has been detected in your MRI scan. Gliomas originate from glial cells in the brain. The next step is genetic analysis to determine the grade. Would you like me to guide you through the mutation analysis?"
            : language === "ur"
              ? "آپ کے MRI اسکین میں گلیوما کا پتہ چلا ہے۔ گلیوما دماغ کے گلیل خلیوں سے شروع ہوتا ہے۔ اگلا قدم درجہ بندی کے لیے جینیاتی تجزیہ ہے۔"
              : "تم اكتشاف ورم دبقي في فحص الرنين المغناطيسي. الأورام الدبقية تنشأ من الخلايا الدبقية في الدماغ. الخطوة التالية هي التحليل الجيني لتحديد الدرجة."

        case "meningioma":
          return language === "en"
            ? "A meningioma has been detected. These are typically non-cancerous tumors that develop from brain membranes. Most grow slowly and may only need monitoring. Consult a neurosurgeon for evaluation."
            : language === "ur"
              ? "مینن جیوما کا پتہ چلا ہے۔ یہ عام طور پر غیر کینسر والے ٹیومر ہیں جو دماغ کی جھلیوں سے بنتے ہیں۔ زیادہ تر آہستہ بڑھتے ہیں۔"
              : "تم اكتشاف ورم سحائي. هذه عادة أورام غير سرطانية تتطور من أغشية الدماغ. معظمها ينمو ببطء وقد يحتاج فقط للمراقبة."

        case "pituitary":
          return language === "en"
            ? "A pituitary tumor has been detected. These affect the pituitary gland and can impact hormone production. Many are benign and treatable. Consult an endocrinologist for hormone evaluation."
            : language === "ur"
              ? "پٹیوٹری ٹیومر کا پتہ چلا ہے۔ یہ پٹیوٹری غدود کو متاثر کرتے ہیں اور ہارمون کی پیداوار پر اثر ڈال سکتے ہیں۔"
              : "تم اكتشاف ورم في الغدة النخامية. هذه تؤثر على الغدة النخامية ويمكن أن تؤثر على إنتاج الهرمونات."

        case "notumor":
          return language === "en"
            ? "Great news! No tumor was detected in your MRI scan. Your brain appears normal. However, if you have symptoms, continue working with your healthcare provider for comprehensive evaluation."
            : language === "ur"
              ? "بہترین خبر! آپ کے MRI اسکین میں کوئی ٹیومر نہیں ملا۔ آپ کا دماغ نارمل لگ رہا ہے۔"
              : "أخبار رائعة! لم يتم اكتشاف أي ورم في فحص الرنين المغناطيسي. يبدو دماغك طبيعياً."
      }
    }

    if (result.glioma_stage) {
      return language === "en"
        ? `Based on genetic analysis, your glioma is classified as ${result.glioma_stage}. This staging helps determine treatment approach. Please discuss these results with an oncologist for personalized treatment planning.`
        : language === "ur"
          ? `جینیاتی تجزیے کی بنیاد پر، آپ کا گلیوما ${result.glioma_stage} کے طور پر درجہ بند کیا گیا ہے۔ یہ درجہ بندی علاج کے طریقے کا تعین کرنے میں مدد کرتی ہے۔`
          : `بناءً على التحليل الجيني، تم تصنيف الورم الدبقي كـ ${result.glioma_stage}. هذا التصنيف يساعد في تحديد نهج العلاج.`
    }

    return "I've received your results. Let me help you understand what this means and guide you through the next steps."
  }
}

export const aiService = new AIService()
