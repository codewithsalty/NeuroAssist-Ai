"use client"

import { aiService } from "./ai-service"

export class EnhancedAIService {
  private service: typeof aiService

  constructor() {
    this.service = aiService
  }

  async generateMedicalResponse(
    userMessage: string,
    context: {
      page?: string
      predictionResult?: any
      language?: string
      patientData?: any
      conversationHistory?: any[]
    },
  ): Promise<string> {
    const { page, predictionResult, language = "en", patientData } = context

    // Enhanced medical context
    const medicalContext = this.buildMedicalContext(context)

    try {
      // Try AI service first
      const response = await this.service.generateResponse(userMessage, {
        ...context,
        systemPrompt: medicalContext,
      })

      return this.enhanceResponse(response, context)
    } catch (error) {
      console.error("Enhanced AI Service Error:", error)
      return this.generateFallbackResponse(userMessage, context)
    }
  }

  private buildMedicalContext(context: any): string {
    const { page, predictionResult, language, patientData } = context

    let medicalPrompt = `You are NeuroAssist AI, a specialized medical assistant for brain tumor screening and diagnosis. You must:

MEDICAL GUIDELINES:
- Always be empathetic and supportive
- Provide accurate, evidence-based information
- Use clear, non-technical language when possible
- Always recommend consulting healthcare professionals
- Never provide definitive diagnoses - only explain AI predictions
- Be culturally sensitive and respectful

CURRENT CONTEXT:`

    if (page) {
      medicalPrompt += `\n- Current page: ${page}`
    }

    if (predictionResult) {
      medicalPrompt += `\n- Recent AI prediction: ${JSON.stringify(predictionResult)}`

      if (predictionResult.tumor_type === "glioma") {
        medicalPrompt += `\n- IMPORTANT: Glioma detected - explain need for genetic testing and staging`
      } else if (predictionResult.tumor_type === "notumor") {
        medicalPrompt += `\n- IMPORTANT: No tumor detected - reassure but recommend continued medical care if symptomatic`
      } else if (predictionResult.glioma_stage) {
        medicalPrompt += `\n- IMPORTANT: Glioma stage determined - explain treatment implications and urgency`
      }
    }

    if (patientData) {
      medicalPrompt += `\n- Patient information available: ${JSON.stringify(patientData)}`
    }

    medicalPrompt += `\n\nRESPOND IN: ${language === "en" ? "English" : language === "ur" ? "Urdu" : "Arabic"}`

    return medicalPrompt
  }

  private enhanceResponse(response: string, context: any): string {
    const { predictionResult, language } = context

    // Add specific medical guidance based on prediction
    if (predictionResult) {
      if (predictionResult.tumor_type === "glioma") {
        const gliomaGuidance = this.getGliomaGuidance(language)
        return `${response}\n\n${gliomaGuidance}`
      } else if (predictionResult.glioma_stage) {
        const stageGuidance = this.getStageGuidance(predictionResult.glioma_stage, language)
        return `${response}\n\n${stageGuidance}`
      }
    }

    return response
  }

  private getGliomaGuidance(language: string): string {
    const guidance = {
      en: "🔬 Next Steps for Glioma:\n• Genetic mutation testing is crucial for staging\n• Consult with a neuro-oncologist\n• Consider getting a second opinion\n• Discuss treatment options with your medical team",
      ur: "🔬 گلیوما کے لیے اگلے قدم:\n• جینیاتی ٹیسٹ ضروری ہے\n• نیورو آنکولوجسٹ سے رابطہ کریں\n• دوسری رائے حاصل کریں",
      ar: "🔬 الخطوات التالية للورم الدبقي:\n• اختبار الطفرات الجينية ضروري\n• استشر طبيب أورام الأعصاب\n• احصل على رأي ثاني",
    }

    return guidance[language as keyof typeof guidance] || guidance.en
  }

  private getStageGuidance(stage: string, language: string): string {
    const urgency = stage.includes("4") ? "URGENT" : stage.includes("3") ? "HIGH" : "MODERATE"

    const guidance = {
      en: `⚡ ${stage} Guidance:\n• Priority level: ${urgency}\n• Immediate consultation with oncology team required\n• Treatment planning should begin promptly\n• Consider clinical trial eligibility`,
      ur: `⚡ ${stage} رہنمائی:\n• ترجیح کی سطح: ${urgency}\n• آنکولوجی ٹیم سے فوری مشاورت ضروری\n• علاج کی منصوبہ بندی فوری طور پر شروع کریں`,
      ar: `⚡ إرشادات ${stage}:\n• مستوى الأولوية: ${urgency}\n• استشارة فورية مع فريق الأورام مطلوبة\n• يجب بدء التخطيط للعلاج فوراً`,
    }

    return guidance[language as keyof typeof guidance] || guidance.en
  }

  private generateFallbackResponse(userMessage: string, context: any): string {
    const { predictionResult, language = "en" } = context
    const lowerMessage = userMessage.toLowerCase()

    // Medical emergency responses
    if (lowerMessage.includes("emergency") || lowerMessage.includes("urgent") || lowerMessage.includes("pain")) {
      return language === "en"
        ? "⚠️ If you're experiencing a medical emergency, please call emergency services immediately (911/999/112). For severe symptoms, go to the nearest emergency room."
        : "⚠️ اگر آپ کو طبی ایمرجنسی ہے تو فوری طور پر ایمرجنسی سروسز کو کال کریں۔"
    }

    // Prediction-specific responses
    if (predictionResult) {
      if (predictionResult.tumor_type === "glioma") {
        return language === "en"
          ? "A glioma has been detected in your scan. This requires immediate attention from a neuro-oncologist. The next step is genetic testing to determine the exact stage and treatment approach."
          : "آپ کے اسکین میں گلیوما کا پتہ چلا ہے۔ اس کے لیے نیورو آنکولوجسٹ سے فوری رابطہ ضروری ہے۔"
      }

      if (predictionResult.tumor_type === "notumor") {
        return language === "en"
          ? "Good news! No tumor was detected in your MRI scan. However, if you're experiencing symptoms, please continue working with your healthcare provider."
          : "خوشخبری! آپ کے MRI اسکین میں کوئی ٹیومر نہیں ملا۔ تاہم اگر آپ کو علامات ہیں تو اپنے ڈاکٹر سے رابطے میں رہیں۔"
      }
    }

    // General medical guidance
    return language === "en"
      ? "I'm here to help explain your screening results and guide you through the process. Please remember that AI predictions should always be confirmed by qualified medical professionals."
      : "میں آپ کے اسکریننگ کے نتائج کی وضاحت اور عمل میں رہنمائی کے لیے یہاں ہوں۔ یاد رکھیں کہ AI کی پیشن گوئیاں ہمیشہ طبی ماہرین سے تصدیق کرانی چاہیے۔"
  }

  // Medical report generation
  async generateMedicalReport(predictionData: any, patientInfo: any): Promise<string> {
    const reportTemplate = `
NEUROASSIST AI SCREENING REPORT
Generated: ${new Date().toLocaleString()}

PATIENT INFORMATION:
${patientInfo ? JSON.stringify(patientInfo, null, 2) : "Not provided"}

AI ANALYSIS RESULTS:
${JSON.stringify(predictionData, null, 2)}

RECOMMENDATIONS:
${this.generateRecommendations(predictionData)}

DISCLAIMER:
This report is generated by AI and should not replace professional medical diagnosis. 
Please consult with qualified healthcare professionals for proper medical evaluation.
`

    return reportTemplate
  }

  private generateRecommendations(predictionData: any): string {
    if (predictionData.tumor_type === "glioma") {
      return `
• Immediate consultation with neuro-oncologist required
• Genetic mutation testing for accurate staging
• Consider multidisciplinary team evaluation
• Discuss treatment options including surgery, radiation, chemotherapy
• Second opinion recommended
`
    }

    if (predictionData.tumor_type === "meningioma") {
      return `
• Consultation with neurosurgeon recommended
• Regular monitoring may be sufficient for small tumors
• Discuss surgical options if symptomatic
• Follow-up imaging as recommended by physician
`
    }

    if (predictionData.tumor_type === "pituitary") {
      return `
• Endocrinologist consultation recommended
• Hormone level testing may be needed
• Discuss treatment options (medication vs surgery)
• Regular monitoring of pituitary function
`
    }

    if (predictionData.tumor_type === "notumor") {
      return `
• No immediate action required based on AI analysis
• Continue regular check-ups with healthcare provider
• Report any new or worsening symptoms
• Follow physician recommendations for follow-up imaging
`
    }

    return "• Consult with healthcare professional for proper evaluation and treatment planning"
  }
}

export const enhancedAIService = new EnhancedAIService()
