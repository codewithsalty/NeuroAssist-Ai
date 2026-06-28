"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Upload, FileImage, CheckCircle, ArrowLeft, Target, Zap, Shield, Activity } from "lucide-react"
import Link from "next/link"
import { ImageUpload } from "@/components/image-upload"
import { ResultDisplay } from "@/components/result-display"
import FloatingAssistant from "@/components/ai-assistant/floating-assistant"
import type { TumorResponse } from "@/lib/api-client"

export default function DetectTumorPage() {
  const [analysisResult, setAnalysisResult] = useState<TumorResponse | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleAnalysisComplete = (result: TumorResponse) => {
    setAnalysisResult(result)
    setShowResult(true)
  }

  const handleReset = () => {
    setAnalysisResult(null)
    setShowResult(false)
  }

  if (showResult && analysisResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <Button asChild variant="outline" className="mb-6">
            <Link href="/diagnostic">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Diagnostic Center
            </Link>
          </Button>
          <ResultDisplay result={analysisResult} type="tumor" onReset={handleReset} />
        </div>
        <FloatingAssistant predictionResult={analysisResult} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/brain-mri-scan.png')] bg-cover bg-center" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Back Button */}
            <Button
              asChild
              variant="outline"
              className="mb-8 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <Link href="/diagnostic">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Diagnostic Center
              </Link>
            </Button>

            {/* Brain Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center">
                <Brain className="h-12 w-12 text-white" />
              </div>
            </motion.div>

            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              AI-Powered Brain Tumor Detection
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Tumor Type Detection</h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Upload MRI scans to detect and classify brain tumors using our advanced AI model
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">99.2%</div>
                <div className="text-white/80 text-sm">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{"<5s"}</div>
                <div className="text-white/80 text-sm">Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                <div className="text-white/80 text-sm">Cases</div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {[
                { icon: Target, text: "AI-powered detection" },
                { icon: Activity, text: "Multiple tumor types" },
                { icon: Zap, text: "99.2% accuracy" },
                { icon: Shield, text: "Instant results" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 mr-3 text-green-300" />
                  <span className="text-sm">{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <ImageUpload onAnalysisComplete={handleAnalysisComplete} />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white/10 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our advanced AI model analyzes your MRI scans in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Upload MRI Scan",
                description: "Upload your brain MRI image in JPEG, PNG, or DICOM format",
                icon: Upload,
              },
              {
                step: "2",
                title: "AI Analysis",
                description: "Our neural network analyzes the image for tumor detection and classification",
                icon: Brain,
              },
              {
                step: "3",
                title: "Get Results",
                description: "Receive detailed analysis with tumor type, confidence score, and recommendations",
                icon: FileImage,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">Step {step.step}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FloatingAssistant />
    </div>
  )
}
