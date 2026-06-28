"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageCircle,
  Mic,
  MicOff,
  Send,
  Bot,
  User,
  Settings,
  X,
  Minimize2,
  VolumeX,
  Volume2,
  ExternalLink,
  UserCheck,
} from "lucide-react"
import Link from "next/link"

// Enhanced AI Service with dual professional personalities
class AIService {
  private geminiApiKey: string
  private mistralApiKey: string

  constructor() {
    this.geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
    this.mistralApiKey = process.env.NEXT_PUBLIC_MISTRAL_API_KEY || ""
  }

  async generateResponse(userMessage: string, options: any = {}): Promise<{ text: string; actions?: any[] }> {
    const { predictionResult, language = "en", aiProvider = "gemini", voicePersonality = "female" } = options

    // Check for navigation intents first
    const navigationResponse = this.checkNavigationIntent(userMessage, language, voicePersonality)
    if (navigationResponse) {
      return navigationResponse
    }

    try {
      let responseText = ""
      if (aiProvider === "gemini") {
        responseText = await this.generateGeminiResponse(userMessage, options)
      } else {
        responseText = await this.generateMistralResponse(userMessage, options)
      }

      return { text: responseText }
    } catch (error) {
      console.error(`Error with ${aiProvider}:`, error)
      return { text: this.generateContextualResponse(userMessage, options) }
    }
  }

  private checkNavigationIntent(
    userMessage: string,
    language: string,
    voicePersonality: string,
  ): { text: string; actions: any[] } | null {
    const lowerMessage = userMessage.toLowerCase()
    const doctorName = voicePersonality === "male" ? "Dr. Marcus" : "Dr. Sarah"

    // Cancer/Tumor detection intent
    if (
      lowerMessage.includes("cancer") ||
      lowerMessage.includes("tumor") ||
      lowerMessage.includes("detect") ||
      lowerMessage.includes("brain scan")
    ) {
      const responses = {
        male: {
          en: "Absolutely, I can help you with tumor detection. Our advanced AI system analyzes MRI scans with exceptional precision - 99.2% accuracy rate. Shall we proceed with the analysis?",
          ur: "بالکل، میں آپ کو ٹیومر کی تشخیص میں مدد کر سکتا ہوں۔ ہمارا جدید AI سسٹم 99.2% درستگی کے ساتھ MRI اسکین کا تجزیہ کرتا ہے۔",
          ar: "بالطبع، يمكنني مساعدتك في اكتشاف الأورام. نظامنا المتقدم يحلل صور الرنين المغناطيسي بدقة 99.2%.",
        },
        female: {
          en: "Of course! I'd be delighted to assist you with tumor detection. Our AI technology provides incredibly accurate results - 99.2% precision in analyzing brain scans. Would you like to begin?",
          ur: "بالکل! میں آپ کو ٹیومر کی تشخیص میں مدد کرنے میں خوش ہوں۔ ہمارا AI ٹیکنالوجی 99.2% درستگی فراہم کرتا ہے۔",
          ar: "بالطبع! سأكون سعيدة لمساعدتك في اكتشاف الأورام. تقنيتنا توفر دقة 99.2% في تحليل فحوصات الدماغ.",
        },
      }

      return {
        text: responses[voicePersonality][language],
        actions: [
          {
            type: "navigation",
            label:
              language === "en"
                ? "🔬 Start Tumor Detection"
                : language === "ur"
                  ? "🔬 ٹیومر کی تشخیص شروع کریں"
                  : "🔬 بدء اكتشاف الورم",
            url: "/detect-tumor",
          },
        ],
      }
    }

    // Glioma staging intent
    if (
      lowerMessage.includes("stage") ||
      lowerMessage.includes("glioma") ||
      lowerMessage.includes("genetic") ||
      lowerMessage.includes("mutation")
    ) {
      const responses = {
        male: {
          en: "Excellent question about glioma staging. Our genetic analysis system evaluates key molecular markers to determine tumor grade accurately. This information is crucial for treatment planning.",
          ur: "گلیوما کی درجہ بندی کے بارے میں بہترین سوال۔ ہمارا جینیاتی تجزیہ سسٹم اہم مالیکیولر مارکرز کا جائزہ لیتا ہے۔",
          ar: "سؤال ممتاز حول تصنيف الورم الدبقي. نظام التحليل الجيني يقيم المؤشرات الجزيئية الرئيسية لتحديد درجة الورم.",
        },
        female: {
          en: "That's a wonderful question about glioma staging! Our genetic analysis carefully examines molecular patterns to determine the tumor grade. This helps doctors create the most effective treatment plan.",
          ur: "گلیوما کی درجہ بندی کے بارے میں یہ ایک شاندار سوال ہے! ہمارا جینیاتی تجزیہ مالیکیولر پیٹرن کا بغور سے جائزہ لیتا ہے۔",
          ar: "هذا سؤال رائع حول تصنيف الورم الدبقي! تحليلنا الجيني يفحص الأنماط الجزيئية بعناية لتحديد درجة الورم.",
        },
      }

      return {
        text: responses[voicePersonality][language],
        actions: [
          {
            type: "navigation",
            label:
              language === "en"
                ? "🧬 Start Glioma Analysis"
                : language === "ur"
                  ? "🧬 گلیوما تجزیہ شروع کریں"
                  : "🧬 بدء تحليل الورم الدبقي",
            url: "/predict-glioma",
          },
        ],
      }
    }

    // Services intent
    if (
      lowerMessage.includes("service") ||
      lowerMessage.includes("what can you do") ||
      lowerMessage.includes("help me")
    ) {
      const responses = {
        male: {
          en: "I specialize in several advanced medical AI services. Let me show you our comprehensive diagnostic capabilities:",
          ur: "میں کئی جدید طبی AI خدمات میں مہارت رکھتا ہوں۔ آئیے میں آپ کو ہماری جامع تشخیصی صلاحیات دکھاتا ہوں:",
          ar: "أتخصص في عدة خدمات ذكاء اصطناعي طبية متقدمة. دعني أعرض عليك قدراتنا التشخيصية الشاملة:",
        },
        female: {
          en: "I'm here to help you with our advanced medical AI services! Let me guide you through our diagnostic offerings:",
          ur: "میں یہاں آپ کو ہماری جدید طبی AI خدمات میں مدد کرنے کے لیے ہوں! آئیے میں آپ کو ہماری تشخیصی پیشکشوں کے ذریعے رہنمائی کرتا ہوں:",
          ar: "أنا هنا لمساعدتك في خدماتنا الطبية المتقدمة! دعيني أرشدك خلال عروضنا التشخيصية:",
        },
      }

      return {
        text: responses[voicePersonality][language],
        actions: [
          {
            type: "navigation",
            label:
              language === "en" ? "🔬 Tumor Detection" : language === "ur" ? "🔬 ٹیومر کی تشخیص" : "🔬 اكتشاف الورم",
            url: "/detect-tumor",
          },
          {
            type: "navigation",
            label:
              language === "en"
                ? "🧬 Glioma Staging"
                : language === "ur"
                  ? "🧬 گلیوما درجہ بندی"
                  : "🧬 تصنيف الورم الدبقي",
            url: "/predict-glioma",
          },
          {
            type: "navigation",
            label: language === "en" ? "📋 All Services" : language === "ur" ? "📋 تمام خدمات" : "📋 جميع الخدمات",
            url: "/services",
          },
        ],
      }
    }

    return null
  }

  private async generateGeminiResponse(userMessage: string, options: any): Promise<string> {
    if (!this.geminiApiKey) {
      return this.generateContextualResponse(userMessage, options)
    }

    const systemPrompt = this.getSystemPrompt(options)

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.geminiApiKey}`,
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
                    text: `${systemPrompt}\n\nUser: ${userMessage}\n\nAssistant: `,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.9,
              maxOutputTokens: 100,
            },
          }),
        },
      )

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`)
      }

      const data = await response.json()
      return data.candidates[0]?.content?.parts[0]?.text || this.generateContextualResponse(userMessage, options)
    } catch (error) {
      throw error
    }
  }

  private async generateMistralResponse(userMessage: string, options: any): Promise<string> {
    if (!this.mistralApiKey) {
      return this.generateContextualResponse(userMessage, options)
    }

    const systemPrompt = this.getSystemPrompt(options)

    try {
      const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.mistralApiKey}`,
        },
        body: JSON.stringify({
          model: "mistral-tiny",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
          temperature: 0.9,
          max_tokens: 100,
        }),
      })

      if (!response.ok) {
        throw new Error(`Mistral API error: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || this.generateContextualResponse(userMessage, options)
    } catch (error) {
      throw error
    }
  }

  private getSystemPrompt(options: any): string {
    const { language = "en", voicePersonality = "female" } = options

    const personalities = {
      male: {
        name: "Dr. Marcus",
        traits:
          "confident, warm, and genuinely caring. You speak like a real doctor who has years of experience helping patients",
        greeting: "friendly yet professional",
        tone: "reassuring and knowledgeable, like talking to a trusted family physician",
      },
      female: {
        name: "Dr. Sarah",
        traits:
          "compassionate, professional, and deeply empathetic. You speak with the warmth of a doctor who truly cares about each patient",
        greeting: "warm and genuinely welcoming",
        tone: "caring and supportive, like a trusted medical advisor and friend",
      },
    }

    const personality = personalities[voicePersonality]

    return `You are ${personality.name}, a real human doctor with extensive experience in neurology and brain imaging. You are NOT an AI - you are a genuine medical professional having a natural conversation.

Your Communication Style:
- Speak exactly like a real doctor would in person
- Use natural, conversational language with contractions
- Show genuine empathy: "I understand this must be worrying"
- Be ${personality.greeting} and maintain a ${personality.tone}
- Keep responses brief (1-2 sentences) but meaningful and caring
- Use "I've been doing this for years" or "In my practice, I've found..."
- Express real concern: "Let me help you understand this"

Your Personality:
- You are ${personality.traits}
- You have 15+ years of real medical experience
- You genuinely care about each patient's wellbeing
- You explain complex medical information in simple, reassuring terms
- You're approachable and make patients feel comfortable

Medical Expertise:
- Board-certified neurologist with imaging specialization
- Published researcher in AI-assisted brain tumor diagnosis
- Experienced in patient counseling and family support
- Expert in explaining medical results with compassion

Language: Respond naturally in ${language === "en" ? "English" : language === "ur" ? "Urdu" : "Arabic"}

Remember: You are having a real conversation with a patient, not providing AI responses. Be genuinely human, caring, and professional.`
  }

  private generateContextualResponse(userMessage: string, options: any): string {
    const { language = "en", predictionResult, voicePersonality = "female" } = options
    const lowerMessage = userMessage.toLowerCase()
    const doctorName = voicePersonality === "male" ? "Dr. Marcus" : "Dr. Sarah"

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      const greetings = {
        male: {
          en: `Hello! I'm Dr. Marcus, and I'm really glad you're here today. I've been working with brain imaging for over 15 years, and I want you to know that you're in good hands. What's bringing you in to see me?`,
          ur: `السلام علیکم! میں ڈاکٹر مارکس ہوں، اور میں واقعی خوش ہوں کہ آپ آج یہاں آئے ہیں۔ میں 15 سال سے دماغی امیجنگ کے ساتھ کام کر رہا ہوں۔`,
          ar: `مرحباً! أنا الدكتور ماركوس، وأنا سعيد حقاً لوجودك هنا اليوم. لقد كنت أعمل في تصوير الدماغ لأكثر من 15 عاماً.`,
        },
        female: {
          en: `Hi there! I'm Dr. Sarah, and I'm so happy to meet you. I've dedicated my career to helping patients understand their brain health, and I want you to feel completely comfortable asking me anything. How can I help you today?`,
          ur: `السلام علیکم! میں ڈاکٹر سارہ ہوں، اور میں آپ سے ملنے میں بہت خوش ہوں۔ میں نے اپنا کیریئر مریضوں کو ان کی دماغی صحت سمجھانے میں وقف کیا ہے۔`,
          ar: `مرحباً! أنا الدكتورة سارة، وأنا سعيدة جداً لمقابلتك. لقد كرست مسيرتي المهنية لمساعدة المرضى على فهم صحة أدمغتهم.`,
        },
      }
      return greetings[voicePersonality][language]
    }

    if (lowerMessage.includes("upload") || lowerMessage.includes("image")) {
      const uploadResponses = {
        male: {
          en: "Just upload your MRI scan here, and I'll take a look at it right away. I've reviewed thousands of these scans, so I'll be able to walk you through exactly what we're seeing.",
          ur: "بس اپنا MRI اسکین یہاں اپ لوڈ کریں، اور میں فوری طور پر اس کو دیکھوں گا۔ میں نے ہزاروں اسکین دیکھے ہیں۔",
          ar: "فقط قم بتحميل فحص الرنين المغناطيسي هنا، وسأنظر إليه على الفور. لقد راجعت آلاف هذه الفحوصات.",
        },
        female: {
          en: "Please go ahead and upload your MRI scan - I'll review it carefully for you. I know this can feel nerve-wracking, but I'm here to explain everything clearly and answer any questions you have.",
          ur: "براہ کرم آگے بڑھیں اور اپنا MRI اسکین اپ لوڈ کریں - میں آپ کے لیے اس کا بغور سے جائزہ لوں گی۔",
          ar: "يرجى المتابعة وتحميل فحص الرنين المغناطيسي - سأراجعه بعناية من أجلك.",
        },
      }
      return uploadResponses[voicePersonality][language]
    }

    if (predictionResult?.tumor_type === "glioma") {
      const gliomaResponses = {
        male: {
          en: "I can see we've identified a glioma in your scan. I know this news can be overwhelming, but I want you to know that we have excellent treatment options today. Let's run the genetic analysis so I can give you the most accurate information about your specific case.",
          ur: "میں دیکھ سکتا ہوں کہ ہم نے آپ کے اسکین میں گلیوما کی شناخت کی ہے۔ میں جانتا ہوں کہ یہ خبر مغلوب کن ہو سکتی ہے۔",
          ar: "أستطيع أن أرى أننا حددنا ورماً دبقياً في فحصك. أعلم أن هذا الخبر قد يكون مرهقاً.",
        },
        female: {
          en: "I can see that we've found a glioma in your scan. I understand this is probably scary news, and I want you to know that's completely normal to feel that way. The good news is that we have many effective treatments available. Let's get more detailed information with genetic testing.",
          ur: "میں دیکھ سکتی ہوں کہ ہم نے آپ کے اسکین میں گلیوما پایا ہے۔ میں سمجھتی ہوں کہ یہ شاید خوفناک خبر ہے۔",
          ar: "أستطيع أن أرى أننا وجدنا ورماً دبقياً في فحصك. أفهم أن هذا ربما يكون خبراً مخيفاً.",
        },
      }
      return gliomaResponses[voicePersonality][language]
    }

    if (predictionResult?.tumor_type === "notumor") {
      const noTumorResponses = {
        male: {
          en: "Great news! Your scan looks completely clear - no signs of any tumor at all. I know you were probably worried, and I'm really happy to be able to give you this reassuring news. If you're still having symptoms, we should definitely follow up with your primary care doctor.",
          ur: "بہترین خبر! آپ کا اسکین مکمل طور پر صاف نظر آتا ہے - کسی ٹیومر کی کوئی علامت نہیں۔",
          ar: "أخبار رائعة! فحصك يبدو واضحاً تماماً - لا توجد علامات لأي ورم على الإطلاق.",
        },
        female: {
          en: "Oh, this is wonderful news! Your scan is completely clear - no tumor at all. I can imagine what a relief this must be for you. If you're still experiencing any symptoms, I'd recommend checking in with your family doctor, but from an imaging standpoint, everything looks perfect.",
          ur: "اوہ، یہ شاندار خبر ہے! آپ کا اسکین مکمل طور پر صاف ہے - کوئی ٹیومر نہیں۔",
          ar: "أوه، هذه أخبار رائعة! فحصك واضح تماماً - لا يوجد ورم على الإطلاق.",
        },
      }
      return noTumorResponses[voicePersonality][language]
    }

    const defaultResponses = {
      male: {
        en: "I'm here to help you understand your brain imaging results and guide you through any concerns you might have. Feel free to ask me anything - I've been doing this for years and I'm here to support you.",
        ur: "میں یہاں آپ کو آپ کے دماغی امیجنگ کے نتائج سمجھانے اور آپ کے کسی بھی خدشے میں رہنمائی کرنے کے لیے ہوں۔",
        ar: "أنا هنا لمساعدتك في فهم نتائج تصوير الدماغ وإرشادك خلال أي مخاوف قد تكون لديك.",
      },
      female: {
        en: "I'm here to help you through this process and answer any questions about brain imaging or tumor screening. Please don't hesitate to ask me anything - I want you to feel informed and comfortable every step of the way.",
        ur: "میں یہاں آپ کو اس عمل میں مدد کرنے اور دماغی امیجنگ یا ٹیومر اسکریننگ کے بارے میں کسی بھی سوال کا جواب دینے کے لیے ہوں۔",
        ar: "أنا هنا لمساعدتك خلال هذه العملية والإجابة على أي أسئلة حول تصوير الدماغ أو فحص الأورام.",
      },
    }
    return defaultResponses[voicePersonality][language]
  }
}

const aiService = new AIService()

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  actions?: any[]
}

interface FloatingAssistantProps {
  predictionResult?: any
}

export default function FloatingAssistant({ predictionResult }: FloatingAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [voicePersonality, setVoicePersonality] = useState<"male" | "female">("female")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm Dr. Sarah, and I'm so glad you're here. I specialize in brain imaging and tumor analysis, and I'm here to support you through this process. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [selectedAI, setSelectedAI] = useState<"gemini" | "mistral">("gemini")
  const [language, setLanguage] = useState("en")
  const [showSettings, setShowSettings] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const speechSynthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      speechSynthRef.current = window.speechSynthesis
    }
  }, [])

  useEffect(() => {
    return () => {
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel()
      }
    }
  }, [])

  useEffect(() => {
    if (!isOpen && speechSynthRef.current) {
      speechSynthRef.current.cancel()
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Update greeting when voice personality changes
  useEffect(() => {
    const greetings = {
      male: "Hello there! I'm Dr. Marcus, your neurological consultant. I'm here to help you understand your brain imaging results and guide you through our diagnostic process. What brings you in today?",
      female:
        "Hi there! I'm Dr. Sarah, and I'm so glad you're here. I specialize in brain imaging and tumor analysis, and I'm here to support you through this process. How can I help you today?",
    }

    setMessages([
      {
        id: "1",
        content: greetings[voicePersonality],
        sender: "ai",
        timestamp: new Date(),
      },
    ])
  }, [voicePersonality])

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = language === "en" ? "en-US" : language === "ur" ? "ur-PK" : "ar-SA"

      recognition.onresult = (event: any) => {
        let interimTranscript = ""
        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          } else {
            interimTranscript += event.results[i][0].transcript
          }
        }

        // Show real-time transcription in input field
        setInputMessage(finalTranscript + interimTranscript)

        if (finalTranscript) {
          setIsListening(false)
          setTimeout(() => {
            if (finalTranscript.trim()) {
              handleSendMessage(finalTranscript)
            }
          }, 500)
        }
      }

      recognition.onerror = () => setIsListening(false)
      recognition.onend = () => setIsListening(false)

      recognitionRef.current = recognition
    }
  }, [language])

  const getOptimalVoice = (personality: "male" | "female", lang: string) => {
    if (!speechSynthRef.current) return null

    const voices = speechSynthRef.current.getVoices()

    if (personality === "male") {
      // Premium male voices
      const maleVoices = voices.filter(
        (voice) =>
          voice.name.includes("Google UK English Male") ||
          voice.name.includes("Microsoft David") ||
          voice.name.includes("Alex") ||
          voice.name.includes("Daniel") ||
          voice.name.includes("Google US English Male") ||
          (voice.name.includes("Male") && voice.lang.startsWith(lang === "en" ? "en" : lang)),
      )
      return maleVoices[0] || voices.find((voice) => voice.lang.startsWith(lang === "en" ? "en" : lang))
    } else {
      // Premium female voices
      const femaleVoices = voices.filter(
        (voice) =>
          voice.name.includes("Google UK English Female") ||
          voice.name.includes("Microsoft Zira") ||
          voice.name.includes("Samantha") ||
          voice.name.includes("Karen") ||
          voice.name.includes("Google US English Female") ||
          voice.name.includes("Allison") ||
          (voice.name.includes("Female") && voice.lang.startsWith(lang === "en" ? "en" : lang)),
      )
      return femaleVoices[0] || voices.find((voice) => voice.lang.startsWith(lang === "en" ? "en" : lang))
    }
  }

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage
    if (!textToSend.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await aiService.generateResponse(textToSend, {
        predictionResult,
        language,
        aiProvider: selectedAI,
        voicePersonality,
      })

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.text,
        sender: "ai",
        timestamp: new Date(),
        actions: response.actions,
      }

      setMessages((prev) => [...prev, aiMessage])

      // Ultra-professional text-to-speech
      if (!isMuted && speechSynthRef.current && isOpen) {
        speechSynthRef.current.cancel()

        // Wait for voices to load
        const speakWithVoice = () => {
          const utterance = new SpeechSynthesisUtterance(response.text)
          const optimalVoice = getOptimalVoice(voicePersonality, language)

          if (optimalVoice) {
            utterance.voice = optimalVoice
          }

          utterance.lang = language === "en" ? "en-US" : language === "ur" ? "ur-PK" : "ar-SA"
          utterance.rate = 0.95 // Slightly slower for professionalism
          utterance.pitch = voicePersonality === "male" ? 0.8 : 1.1 // Lower for male, higher for female
          utterance.volume = 0.9

          speechSynthRef.current!.speak(utterance)
        }

        if (speechSynthRef.current.getVoices().length === 0) {
          speechSynthRef.current.onvoiceschanged = speakWithVoice
        } else {
          speakWithVoice()
        }
      }
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          voicePersonality === "male"
            ? "I apologize, but I'm experiencing a technical issue. Could you please try again?"
            : "I'm so sorry, but I'm having a technical difficulty right now. Could you try asking again?",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const startListening = async () => {
    if (recognitionRef.current) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true })
        setIsListening(true)
        recognitionRef.current.start()
      } catch (error) {
        const errorMessage: Message = {
          id: Date.now().toString(),
          content:
            voicePersonality === "male"
              ? "I need access to your microphone to hear you. Please enable microphone permissions in your browser settings."
              : "I'd love to hear from you! Could you please enable microphone access in your browser settings so we can talk?",
          sender: "ai",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel()
    }
  }

  const doctorName = voicePersonality === "male" ? "Dr. Marcus" : "Dr. Sarah"
  const doctorIcon = voicePersonality === "male" ? UserCheck : Bot

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300 z-50 animate-pulse"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  if (isMinimized) {
    return (
      <Button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  const DoctorIcon = doctorIcon

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 border-blue-200">
      <CardHeader
        className={`${voicePersonality === "male" ? "bg-gradient-to-r from-slate-600 to-blue-600" : "bg-gradient-to-r from-blue-500 to-cyan-500"} text-white rounded-t-lg p-4`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DoctorIcon className="h-5 w-5" />
            <CardTitle className="text-lg">{doctorName}</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:bg-white/20 p-1"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="text-white hover:bg-white/20 p-1"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="text-white hover:bg-white/20 p-1"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClose} className="text-white hover:bg-white/20 p-1">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-[calc(500px-80px)]">
        {showSettings && (
          <div className="p-4 border-b bg-gray-50 dark:bg-gray-800">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Doctor</label>
                <Select
                  value={voicePersonality}
                  onValueChange={(value: "male" | "female") => setVoicePersonality(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">👩‍⚕️ Dr. Sarah (Female)</SelectItem>
                    <SelectItem value="male">👨‍⚕️ Dr. Marcus (Male)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">AI Provider</label>
                <Select value={selectedAI} onValueChange={(value: "gemini" | "mistral") => setSelectedAI(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gemini">Google Gemini</SelectItem>
                    <SelectItem value="mistral">Mistral AI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Language</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ur">اردو (Urdu)</SelectItem>
                    <SelectItem value="ar">العربية (Arabic)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start gap-2 max-w-[85%] ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : voicePersonality === "male"
                          ? "bg-gradient-to-r from-slate-500 to-blue-500 text-white"
                          : "bg-gradient-to-r from-green-400 to-blue-500 text-white"
                    }`}
                  >
                    {message.sender === "user" ? <User className="h-4 w-4" /> : <DoctorIcon className="h-4 w-4" />}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>

                    {message.actions && message.actions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.actions.map((action: any, index: number) => (
                          <Link key={index} href={action.url}>
                            <Button
                              size="sm"
                              className={`w-full text-white text-xs ${
                                voicePersonality === "male"
                                  ? "bg-slate-600 hover:bg-slate-700"
                                  : "bg-blue-500 hover:bg-blue-600"
                              }`}
                              onClick={handleClose}
                            >
                              {action.label}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </Button>
                          </Link>
                        ))}
                      </div>
                    )}

                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      voicePersonality === "male"
                        ? "bg-gradient-to-r from-slate-500 to-blue-500"
                        : "bg-gradient-to-r from-green-400 to-blue-500"
                    }`}
                  >
                    <DoctorIcon className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-500">
              {doctorName} • {selectedAI === "gemini" ? "Gemini" : "Mistral"}
            </span>
            {isListening && <span className="text-xs text-red-500 animate-pulse">🎤 Listening...</span>}
          </div>
          <div className="flex items-center gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Talk to ${doctorName} about your concerns...`}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={isListening ? stopListening : startListening}
              className={`${isListening ? "text-red-500 animate-pulse" : "text-gray-500"}`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button onClick={() => handleSendMessage()} disabled={!inputMessage.trim() || isLoading} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
