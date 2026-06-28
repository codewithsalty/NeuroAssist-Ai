"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Upload, X, FileImage, AlertCircle, Brain, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { predictImage, checkBackendHealth, type TumorResponse } from "@/lib/api-client"

interface ImageUploadProps {
  onAnalysisComplete: (result: TumorResponse) => void
}

export function ImageUpload({ onAnalysisComplete }: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/bmp"]
    if (!validTypes.includes(file.type.toLowerCase())) {
      setError("❌ Please select a valid image file (JPEG, PNG, GIF, or BMP)")
      return
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError("❌ File size must be less than 10MB")
      return
    }

    console.log("📁 File selected:", { name: file.name, size: file.size, type: file.type })

    setSelectedFile(file)
    setError(null)

    // Create preview URL
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const simulateProgress = () => {
    setAnalysisProgress(0)
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 200)
    return interval
  }

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("❌ Please select an MRI image file first")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    // Start progress simulation
    const progressInterval = simulateProgress()

    try {
      console.log("🧠 Starting tumor type analysis with FastAPI...")

      // First check if backend is accessible
      try {
        await checkBackendHealth()
        console.log("✅ Backend health check passed")
      } catch (healthError) {
        throw new Error(
          "Backend server is not accessible. Please ensure the FastAPI server is running on the correct URL.",
        )
      }

      const result = await predictImage(selectedFile)

      // Complete progress
      clearInterval(progressInterval)
      setAnalysisProgress(100)

      console.log("✅ Tumor analysis completed successfully:", result)

      // Small delay to show completion
      setTimeout(() => {
        onAnalysisComplete(result)
      }, 500)
    } catch (err: any) {
      clearInterval(progressInterval)
      setAnalysisProgress(0)
      console.error("💥 Tumor analysis failed:", err)

      let errorMessage = "❌ Failed to analyze image. Please try again."

      if (err.message.includes("422")) {
        errorMessage = "❌ Invalid image format or server configuration issue. Please try a different image."
      } else if (err.message.includes("404")) {
        errorMessage = "❌ Backend endpoint not found. Please check server configuration."
      } else if (err.message.includes("500")) {
        errorMessage = "❌ Server error. Please try again later."
      } else if (err.message.includes("not accessible")) {
        errorMessage = "❌ Cannot connect to analysis server. Please check your connection."
      } else if (err.message) {
        errorMessage = `❌ ${err.message}`
      }

      setError(errorMessage)
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false)
        setAnalysisProgress(0)
      }, 1000)
    }
  }

  const clearSelection = () => {
    setSelectedFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    setError(null)
    setAnalysisProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <Brain className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <h3 className="text-lg font-semibold mb-2">Upload MRI Image</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Select a brain MRI scan for AI-powered tumor detection
            </p>
          </div>

          {!selectedFile ? (
            <div
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-colors group relative overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="absolute inset-0 opacity-5 bg-[url('/images/brain-mri-scan.png')] bg-cover bg-center" />
              <FileImage className="h-12 w-12 mx-auto mb-4 text-gray-400 group-hover:text-purple-500 transition-colors relative z-10" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 relative z-10">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 relative z-10">Supports: JPG, PNG, GIF, BMP (Max 10MB)</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 relative z-10">
                🧠 Brain MRI scans recommended
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={previewUrl || "/images/brain-mri-scan.png"}
                  alt="MRI Preview"
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
                  onError={() => setError("❌ Failed to load image preview")}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 shadow-lg"
                  onClick={clearSelection}
                  disabled={isAnalyzing}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-medium">📁 {selectedFile.name}</p>
                  <p>📏 {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p className="text-xs">🔍 Type: {selectedFile.type}</p>
                </div>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            aria-label="Upload MRI Image"
          />

          {isAnalyzing && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-purple-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Analyzing with AI models...</span>
              </div>
              <Progress value={analysisProgress} className="w-full" />
              <p className="text-xs text-center text-gray-500">🤖 Running tumor detection model via FastAPI</p>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            {!selectedFile ? (
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
              >
                <Upload className="h-4 w-4 mr-2" />
                Select MRI Image
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Analyze with AI
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={clearSelection} disabled={isAnalyzing}>
                  Clear
                </Button>
              </>
            )}
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">🔒 Secure analysis via FastAPI backend</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
