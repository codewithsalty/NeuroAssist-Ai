"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, MicOff, Send, Bot, User, Settings } from "lucide-react"

// Inline AI Service to avoid import issues
class AIService {
  private geminiApiKey: string
  private mistralApiKey: string

  constructor() {
    this.geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
    this.mistralApiKey = process.env.NEXT_PUBLIC_MISTRAL_API_KEY || ""
  }

  async generateResponse(userMessage: string, options: any = {}): Promise<string> {
    const { predictionResult, language = "en", aiProvider = "gemini" } = options

    try {
      if (aiProvider === "gemini") {
        return await this.generateGeminiResponse(userMessage, options)
      } else {
        return await this.generateMistralResponse(userMessage, options)
      }
    } catch (error) {
      console.error(`Error with ${aiProvider}:`, error)

      // Try the other provider as fallback
      try {
        if (aiProvider === "gemini") {
          console.log("Trying Mistral as fallback...")
          return await this.generateMistralResponse(userMessage, options)
        } else {
          console.log("Trying Gemini as fallback...")
          return await this.generateGeminiResponse(userMessage, options)
        }
      } catch (fallbackError) {
        console.error("Both AI providers failed, using local response:", fallbackError)
        return this.generateContextualResponse(userMessage, options)
      }
    }
  }

  private async generateGeminiResponse(userMessage: string, options: any): Promise<string> {
    if (!this.geminiApiKey) {
      return this.generateContextualResponse(userMessage, options)
    }

    const systemPrompt = this.getSystemPrompt(options)
    const fullPrompt = `${systemPrompt}\n\nUser: ${userMessage}\n\nAssistant:`

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
                    text: fullPrompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 512,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
            ],
          }),
        },
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Gemini API error ${response.status}:`, errorText)
        throw new Error(`Gemini API error: ${response.status}`)
      }

      const data = await response.json()

      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
        return data.candidates[0].content.parts[0].text
      } else {
        console.log("Gemini response structure:", data)
        throw new Error("Invalid response structure from Gemini")
      }
    } catch (error) {
      console.error("Gemini API error:", error)
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
          max_tokens: 512,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Mistral API error ${response.status}:`, errorText)
        throw new Error(`Mistral API error: ${response.status}`)
      }

      const data = await response.json()

      if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        return data.choices[0].message.content
      } else {
        console.log("Mistral response structure:", data)
        throw new Error("Invalid response structure from Mistral")
      }
    } catch (error) {
      console.error("Mistral API error:", error)
      throw error
    }
  }

  private getSystemPrompt(options: any): string {
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

      ur: `آپ NeuroAssist کے لیے ایک پیشہ ور طبی AI اسسٹنٹ ہیں، جو دماغی ٹیومر کی جانچ کا پلیٹ فارم ہے۔ آپ صارفین کو دماغی ٹیومر کی تشخیص، MRI تجزیہ، اور گلیوما کی درجہ بندی سمجھنے میں مدد کرتے ہیں۔`,

      ar: `أنت مساعد ذكي طبي محترف لـ NeuroAssist، منصة فحص أورام الدماغ. تساعد المستخدمين على فهم اكتشاف أورام الدماغ وتحليل الرنين المغناطيسي وتصنيف الورم الدبقي.`,
    }

    let prompt = basePrompt[language as keyof typeof basePrompt] || basePrompt.en

    if (predictionResult) {
      prompt += `\n\nCurrent prediction result: ${JSON.stringify(predictionResult)}`
    }

    return prompt
  }

  private generateContextualResponse(userMessage: string, options: any): string {
    const { language = "en", predictionResult } = options
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("help")) {
      return language === "en"
        ? "Hello! I'm your NeuroAssist AI companion. I can help you understand brain tumor screening, guide you through the process, and explain results. What would you like to know?"
        : language === "ur"
          ? "السلام علیکم! میں آپ کا NeuroAssist AI ساتھی ہوں۔ میں آپ کو دماغی ٹیومر کی جانچ سمجھنے میں مدد کر سکتا ہوں۔"
          : "مرحباً! أنا مساعدك الذكي في NeuroAssist. يمكنني مساعدتك في فهم فحص أورام الدماغ."
    }

    if (lowerMessage.includes("upload") || lowerMessage.includes("image") || lowerMessage.includes("mri")) {
      return "To upload your MRI image, click the upload area or drag and drop your file. We support JPG, PNG, and DICOM formats. Ensure the image clearly shows the brain scan for accurate analysis."
    }

    if (predictionResult) {
      if (predictionResult.tumor_type === "glioma") {
        return "A glioma has been detected in your MRI scan. Gliomas originate from glial cells in the brain. The next step is genetic analysis to determine the grade. Would you like me to guide you through the mutation analysis?"
      }
      if (predictionResult.tumor_type === "notumor") {
        return "Great news! No tumor was detected in your MRI scan. Your brain appears normal. However, if you have symptoms, continue working with your healthcare provider for comprehensive evaluation."
      }
    }

    return "I'm here to help with brain tumor screening questions. You can ask about the process, uploading images, understanding results, or general tumor information. How can I assist you?"
  }
}

const aiService = new AIService()

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

interface ChatAssistantProps {
  predictionResult?: any
}

export default function ChatAssistant({ predictionResult }: ChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your NeuroAssist AI companion. I'm here to help you with brain tumor screening and answer any questions you may have. How can I assist you today?",
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

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = language === "en" ? "en-US" : language === "ur" ? "ur-PK" : "ar-SA"

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
  }, [language])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await aiService.generateResponse(inputMessage, {
        predictionResult,
        language,
        aiProvider: selectedAI,
        conversationHistory: messages,
      })

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])

      // Text-to-speech for AI response
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(response)
        utterance.lang = language === "en" ? "en-US" : language === "ur" ? "ur-PK" : "ar-SA"
        utterance.rate = 0.9
        speechSynthesis.speak(utterance)
      }
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble responding right now. Please try again.",
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
        // Request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true })
        setIsListening(true)
        recognitionRef.current.start()
      } catch (error) {
        console.error("Microphone permission denied:", error)
        const errorMessage: Message = {
          id: Date.now().toString(),
          content: "Microphone access denied. Please allow microphone permissions and try again.",
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

  return (
    <div className="flex flex-col h-full">
      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="space-y-3">
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-start gap-2 max-w-[80%] ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "user"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div
                className={`rounded-2xl px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                }`}
              >
                <p className="text-sm">{message.content}</p>
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
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <span className="text-xs text-gray-500">Using {selectedAI === "gemini" ? "Gemini" : "Mistral"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={isListening ? stopListening : startListening}
            className={`${isListening ? "text-red-500" : "text-gray-500"}`}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
