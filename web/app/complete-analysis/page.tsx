"use client"

import { useState } from "react"
import FloatingAssistant from "@/components/ai-assistant/floating-assistant"

const CompleteAnalysisPage = () => {
  const [predictionResult, setPredictionResult] = useState(null)

  const analyzeData = async () => {
    // Simulate data analysis and prediction
    const result = {
      summary: "This is a sample analysis result.",
      recommendations: ["Consider action A", "Also consider action B"],
      confidence: 0.85,
    }

    setPredictionResult(result)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Complete Analysis</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={analyzeData}>
        Analyze Data
      </button>

      {predictionResult && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Analysis Result:</h2>
          <p>Summary: {predictionResult.summary}</p>
          <p>Recommendations: {predictionResult.recommendations.join(", ")}</p>
          <p>Confidence: {predictionResult.confidence}</p>
        </div>
      )}

      <FloatingAssistant predictionResult={predictionResult} />
    </div>
  )
}

export default CompleteAnalysisPage
