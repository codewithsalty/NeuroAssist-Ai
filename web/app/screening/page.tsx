"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Dna, Activity, MessageCircle } from "lucide-react"
import Link from "next/link"
import FloatingAssistant from "@/components/ai-assistant/floating-assistant"
import { Badge } from "@/components/ui/badge"

export default function ScreeningPage() {
  const [showAssistant, setShowAssistant] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">AI-Powered Brain Tumor Screening</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              Advanced neural networks for accurate tumor detection and staging
            </p>
            <div className="flex items-center justify-center gap-2 text-purple-600">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">AI Assistant Available</span>
            </div>
          </div>

          {/* Screening Options */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 px-4 pt-8 mt-8">
            <Card className="relative hover:shadow-lg transition-shadow pt-12 mt-4">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center">
                <Brain className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <CardTitle>Tumor Detection</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Upload MRI images for AI-powered tumor classification
                </p>
                <Button asChild className="w-full">
                  <Link href="/detect-tumor">Start Detection</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="relative hover:shadow-lg transition-shadow pt-12 mt-4">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Specialized
                </Badge>
              </div>
              <CardHeader className="text-center">
                <Dna className="h-12 w-12 mx-auto mb-4 text-emerald-600" />
                <CardTitle>Glioma Staging</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Determine glioma stage using genetic mutation data
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/predict-glioma">Predict Stage</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="relative hover:shadow-lg transition-shadow pt-12 mt-4">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Recommended
                </Badge>
              </div>
              <CardHeader className="text-center">
                <Activity className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>Complete Analysis</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">Full workflow from detection to staging</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/complete-analysis">Full Analysis</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* AI Assistant Info */}
          <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                  <MessageCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Assistant Available</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our intelligent assistant is here to guide you through the screening process, explain results, and
                    answer your questions. It supports both voice and text interactions in multiple languages.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating AI Assistant */}
      {showAssistant && <FloatingAssistant />}
    </div>
  )
}
