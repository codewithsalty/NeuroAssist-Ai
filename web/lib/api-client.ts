const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://b6b8-37-111-156-165.ngrok-free.app"

export interface TumorResponse {
  tumor_type: string
  confidence: number
  all_probabilities?: Record<string, number>
  precaution?: string
  message: string
  next?: string
}

export interface GliomaResponse {
  glioma_stage: string
  confidence: number
  all_stage_probabilities?: Record<string, number>
  mutation_summary?: {
    total_mutations: number
    positive_mutations: string[]
    mutation_profile: Record<string, boolean>
  }
  recommendations?: string
}

class ApiClient {
  private baseURL: string

  constructor() {
    this.baseURL = API_BASE_URL
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`
    console.log(`🌐 Making request to: ${url}`)

    // For FormData, don't set Content-Type header - let browser set it with boundary
    const isFormData = options.body instanceof FormData

    const defaultHeaders: Record<string, string> = {
      "ngrok-skip-browser-warning": "true",
      "Access-Control-Allow-Origin": "*",
    }

    // Only add Content-Type for JSON requests
    if (!isFormData) {
      defaultHeaders["Content-Type"] = "application/json"
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    try {
      console.log(`📤 Request config:`, {
        method: config.method,
        headers: config.headers,
        bodyType: isFormData ? "FormData" : typeof config.body,
      })

      const response = await fetch(url, config)

      console.log(`📥 Response status: ${response.status} ${response.statusText}`)

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`

        try {
          const errorData = await response.json()
          console.error("❌ Error response:", errorData)
          errorMessage = errorData.detail || errorData.message || errorMessage
        } catch (e) {
          console.error("❌ Could not parse error response")
        }

        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log("✅ Success response:", data)
      return data
    } catch (error) {
      console.error("💥 API request failed:", error)
      throw error
    }
  }

  async predictImage(imageFile: File): Promise<TumorResponse> {
    console.log("🖼️ Preparing image for analysis:", {
      name: imageFile.name,
      size: imageFile.size,
      type: imageFile.type,
    })

    // Validate file before sending
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/bmp"]
    if (!validTypes.includes(imageFile.type.toLowerCase())) {
      throw new Error("Invalid file type. Please upload a valid image file (JPEG, PNG, GIF, or BMP)")
    }

    if (imageFile.size > 10 * 1024 * 1024) {
      throw new Error("File size too large. Please upload an image smaller than 10MB")
    }

    const formData = new FormData()
    formData.append("file", imageFile)

    return this.makeRequest("/predict-image", {
      method: "POST",
      body: formData,
    })
  }

  async predictGliomaStage(data: any): Promise<GliomaResponse> {
    console.log("🧬 Predicting glioma stage with data:", data)

    return this.makeRequest("/predict-glioma-stage", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async completeAnalysis(imageFile: File, mutationData: any) {
    console.log("🔬 Starting complete analysis...")

    const formData = new FormData()
    formData.append("file", imageFile)
    formData.append("mutation_data", JSON.stringify(mutationData))

    return this.makeRequest("/complete-analysis", {
      method: "POST",
      body: formData,
    })
  }

  // Health check method
  async healthCheck() {
    try {
      return await this.makeRequest("/", {
        method: "GET",
      })
    } catch (error) {
      console.error("❌ Health check failed:", error)
      throw new Error("Backend server is not accessible. Please check if the FastAPI server is running.")
    }
  }
}

export const apiClient = new ApiClient()

// Export individual functions for easier importing
export const predictImage = (imageFile: File): Promise<TumorResponse> => {
  return apiClient.predictImage(imageFile)
}

export const predictGliomaStage = (data: any): Promise<GliomaResponse> => {
  return apiClient.predictGliomaStage(data)
}

export const completeAnalysis = (imageFile: File, mutationData: any) => {
  return apiClient.completeAnalysis(imageFile, mutationData)
}

export const checkBackendHealth = () => {
  return apiClient.healthCheck()
}
