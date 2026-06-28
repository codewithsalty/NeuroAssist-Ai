"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Dna, Info, Loader2, Brain } from "lucide-react"
import { predictGliomaStage, type StageResponse } from "@/lib/api-client"

interface MutationFormProps {
  onAnalysisComplete: (result: StageResponse) => void
}

export function MutationForm({ onAnalysisComplete }: MutationFormProps) {
  const [formData, setFormData] = useState({
    gender: "m" as "m" | "f",
    age: 45,
    idh1: 0,
    tp53: 0,
    atrx: 0,
    pten: 0,
    egfr: 0,
    cic: 0,
    pik3ca: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

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
    }, 150)
    return interval
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    // Start progress simulation
    const progressInterval = simulateProgress()

    try {
      console.log("🧬 Submitting mutation data to FastAPI for glioma staging...")
      const result = await predictGliomaStage(formData)

      // Complete progress
      clearInterval(progressInterval)
      setAnalysisProgress(100)

      console.log("✅ Glioma stage prediction completed:", result)

      // Small delay to show completion
      setTimeout(() => {
        onAnalysisComplete(result)
      }, 500)
    } catch (err: any) {
      clearInterval(progressInterval)
      setAnalysisProgress(0)
      console.error("💥 Glioma stage prediction failed:", err)
      setError(err.message || "❌ Failed to predict glioma stage. Please try again.")
    } finally {
      setTimeout(() => {
        setIsSubmitting(false)
        setAnalysisProgress(0)
      }, 1000)
    }
  }

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    console.log(`📝 Updated ${field} to:`, value)
  }

  const mutations = [
    { key: "idh1", label: "IDH1", description: "Isocitrate Dehydrogenase 1" },
    { key: "tp53", label: "TP53", description: "Tumor Protein 53" },
    { key: "atrx", label: "ATRX", description: "Alpha Thalassemia/Mental Retardation Syndrome X-linked" },
    { key: "pten", label: "PTEN", description: "Phosphatase and Tensin Homolog" },
    { key: "egfr", label: "EGFR", description: "Epidermal Growth Factor Receptor" },
    { key: "cic", label: "CIC", description: "Capicua Transcriptional Repressor" },
    {
      key: "pik3ca",
      label: "PIK3CA",
      description: "Phosphatidylinositol-4,5-Bisphosphate 3-Kinase Catalytic Subunit Alpha",
    },
  ]

  const positiveMutations = Object.values(formData)
    .slice(2)
    .filter((v) => v === 1).length

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dna className="h-5 w-5 text-purple-600" />
          Glioma Mutation Analysis
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          🧬 Provide genetic mutation data for accurate glioma staging via FastAPI
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Glioma Detected!</strong> This analysis requires genetic mutation data from tumor sequencing. Please
            consult with your laboratory for accurate mutation status.
          </AlertDescription>
        </Alert>

        {/* Patient Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gender">👤 Gender</Label>
            <Select value={formData.gender} onValueChange={(value: "m" | "f") => updateField("gender", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="m">👨 Male</SelectItem>
                <SelectItem value="f">👩 Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">🎂 Age</Label>
            <Input
              id="age"
              type="number"
              min="0"
              max="120"
              value={formData.age}
              onChange={(e) => updateField("age", Number.parseInt(e.target.value) || 0)}
              placeholder="Enter patient age"
            />
          </div>
        </div>

        {/* Mutation Status */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              🧬 Genetic Mutation Status
              <span className="text-sm font-normal text-gray-500">({positiveMutations}/7 positive)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Select the mutation status for each gene (0 = Negative/Wild-type, 1 = Positive/Mutated)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mutations.map((mutation) => (
              <div key={mutation.key} className="space-y-2">
                <Label htmlFor={mutation.key} className="text-sm font-medium">
                  🧬 {mutation.label}
                </Label>
                <Select
                  value={formData[mutation.key as keyof typeof formData].toString()}
                  onValueChange={(value) => updateField(mutation.key, Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">❌ Negative (0)</SelectItem>
                    <SelectItem value="1">✅ Positive (1)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">{mutation.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Current Data Summary */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="font-medium mb-2 flex items-center gap-2">📊 Current Data Summary</h4>
          <div className="text-sm space-y-1">
            <p>👤 Gender: {formData.gender === "m" ? "Male" : "Female"}</p>
            <p>🎂 Age: {formData.age} years</p>
            <p>🧬 Positive mutations: {positiveMutations}/7</p>
            {positiveMutations > 0 && (
              <p className="text-xs text-purple-600 dark:text-purple-400">
                Higher mutation count may indicate more advanced stage
              </p>
            )}
          </div>
        </div>

        {isSubmitting && (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-purple-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm font-medium">Analyzing glioma stage with AI...</span>
            </div>
            <Progress value={analysisProgress} className="w-full" />
            <p className="text-xs text-center text-gray-500">🤖 Running glioma staging model via FastAPI</p>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Analyzing Glioma Stage...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />🎯 Predict Glioma Stage with AI
            </>
          )}
        </Button>

        <div className="text-center">
          <p className="text-xs text-gray-500">🔒 Secure analysis via FastAPI backend with trained models</p>
        </div>
      </CardContent>
    </Card>
  )
}
