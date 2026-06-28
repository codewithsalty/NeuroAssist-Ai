"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CheckCircle,
  AlertTriangle,
  Info,
  RotateCcw,
  TrendingUp,
  Heart,
  Calendar,
  Pill,
  Activity,
  Phone,
  Clock,
  Shield,
} from "lucide-react"
import type { TumorResponse, StageResponse } from "@/lib/api-client"

interface ResultDisplayProps {
  result: TumorResponse | StageResponse
  type: "tumor" | "glioma"
  onReset: () => void
}

export function ResultDisplay({ result, type, onReset }: ResultDisplayProps) {
  if (type === "tumor") {
    const tumorResult = result as TumorResponse
    const { tumor_type, precaution, confidence, message } = tumorResult

    const getTumorInfo = () => {
      switch (tumor_type) {
        case "glioma":
          return {
            color: "destructive" as const,
            icon: <AlertTriangle className="h-4 w-4" />,
            title: "Glioma Detected",
            description:
              "A type of brain tumor that originates from glial cells. Further staging analysis is recommended.",
            hopeMessage:
              "🌟 Remember, early detection is your greatest advantage. Many glioma patients live full, meaningful lives with proper treatment. You're taking the right steps by getting diagnosed early.",
            immediateSteps: [
              "Schedule an appointment with a neuro-oncologist within 48-72 hours",
              "Gather all your MRI scans and medical records",
              "Consider getting a second opinion from a major medical center",
              "Start a symptom diary to track any changes",
            ],
            medications: [
              "Dexamethasone (4-8mg daily) - to reduce brain swelling",
              "Levetiracetam (500mg twice daily) - seizure prevention",
              "Omeprazole (20mg daily) - stomach protection while on steroids",
            ],
            lifestyle: [
              "Maintain a healthy, anti-inflammatory diet rich in omega-3 fatty acids",
              "Get adequate sleep (7-9 hours) to support brain healing",
              "Gentle exercise as tolerated - walking, yoga, or swimming",
              "Stay hydrated and limit alcohol consumption",
            ],
            followUp: "Weekly monitoring for the first month, then bi-weekly. MRI every 3 months initially.",
            emergency:
              "Seek immediate medical attention if you experience severe headaches, seizures, vision changes, or confusion.",
          }
        case "meningioma":
          return {
            color: "secondary" as const,
            icon: <Info className="h-4 w-4" />,
            title: "Meningioma Detected",
            description:
              "A tumor that arises from the meninges, the membranes that surround the brain and spinal cord.",
            hopeMessage:
              "💙 Great news! Meningiomas are often slow-growing and many are completely curable with treatment. Most patients return to their normal activities and live healthy, full lives.",
            immediateSteps: [
              "Consult with a neurosurgeon within 1-2 weeks",
              "Complete neurological evaluation",
              "Consider watchful waiting if tumor is small and asymptomatic",
              "Discuss surgical options if treatment is needed",
            ],
            medications: [
              "Dexamethasone (2-4mg daily) - if swelling is present",
              "Acetaminophen (500mg as needed) - for headache management",
              "Multivitamin with B-complex - support neurological health",
            ],
            lifestyle: [
              "Regular exercise to maintain overall health",
              "Stress management through meditation or counseling",
              "Maintain social connections and normal activities",
              "Healthy diet with plenty of fruits and vegetables",
            ],
            followUp: "Initial follow-up in 2 weeks, then every 3-6 months with MRI monitoring.",
            emergency:
              "Contact your doctor if you experience new or worsening headaches, vision problems, or neurological symptoms.",
          }
        case "pituitary":
          return {
            color: "secondary" as const,
            icon: <Info className="h-4 w-4" />,
            title: "Pituitary Tumor Detected",
            description: "A tumor that develops in the pituitary gland at the base of the brain.",
            hopeMessage:
              "🌈 Pituitary tumors are highly treatable! Most are benign and can be successfully managed with medication or minimally invasive surgery. Your quality of life can be excellent with proper treatment.",
            immediateSteps: [
              "See an endocrinologist within 1 week for hormone testing",
              "Complete comprehensive hormone panel",
              "Ophthalmology exam to check vision fields",
              "Consider pituitary-specialized neurosurgeon consultation",
            ],
            medications: [
              "Cabergoline (0.25mg twice weekly) - if prolactinoma is suspected",
              "Hormone replacement as needed based on deficiencies",
              "Regular monitoring of hormone levels",
            ],
            lifestyle: [
              "Monitor for symptoms of hormone imbalance",
              "Maintain regular sleep schedule",
              "Balanced nutrition to support hormone health",
              "Regular exercise appropriate for your condition",
            ],
            followUp: "Hormone level checks every 2-4 weeks initially, MRI every 6 months.",
            emergency:
              "Seek immediate care for severe headaches, vision loss, or signs of hormone crisis (extreme fatigue, nausea, confusion).",
          }
        case "notumor":
          return {
            color: "default" as const,
            icon: <CheckCircle className="h-4 w-4" />,
            title: "No Tumor Detected",
            description: "The analysis shows no evidence of brain tumor in the provided MRI scan.",
            hopeMessage:
              "🎉 Excellent news! Your scan shows no signs of brain tumors. This is a wonderful result that should give you peace of mind.",
            immediateSteps: [
              "Share these results with your primary care physician",
              "Continue with routine medical care",
              "Address any ongoing symptoms with your doctor",
              "Maintain healthy lifestyle habits",
            ],
            medications: [
              "Continue any current medications as prescribed",
              "Consider preventive supplements like Omega-3 and Vitamin D",
              "Discuss any ongoing symptoms with your healthcare provider",
            ],
            lifestyle: [
              "Maintain a brain-healthy diet rich in antioxidants",
              "Regular physical exercise for overall health",
              "Stress management and adequate sleep",
              "Stay up to date with routine health screenings",
            ],
            followUp: "Routine follow-up as recommended by your physician. No urgent follow-up needed.",
            emergency: "Contact your doctor if you develop new neurological symptoms.",
          }
        default:
          return {
            color: "secondary" as const,
            icon: <Info className="h-4 w-4" />,
            title: "Analysis Complete",
            description: "The analysis has been completed.",
            hopeMessage: "We're here to support you through this journey.",
            immediateSteps: ["Consult with your healthcare provider"],
            medications: ["Follow your doctor's recommendations"],
            lifestyle: ["Maintain healthy habits"],
            followUp: "As recommended by your healthcare provider",
            emergency: "Contact your doctor for any concerns",
          }
      }
    }

    const tumorInfo = getTumorInfo()

    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {/* Main Results Card */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <CardHeader className="text-center pb-6">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl">
              <Info className="h-6 w-6 text-purple-600" />
              MRI Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center">
              <Badge variant={tumorInfo.color} className="text-lg px-6 py-3 mb-4">
                {tumorInfo.icon}
                <span className="ml-2">{tumorInfo.title}</span>
              </Badge>
              {confidence && (
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-5 w-5 text-gray-500" />
                  <span className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                    Confidence: {(confidence * 100).toFixed(1)}%
                  </span>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl">
              <div className="flex items-start gap-3">
                <Heart className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">A Message of Hope</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{tumorInfo.hopeMessage}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Immediate Next Steps
                </h3>
                <ul className="space-y-2">
                  {tumorInfo.immediateSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Pill className="h-5 w-5 text-green-600" />
                  Recommended Medications
                </h3>
                <ul className="space-y-2">
                  {tumorInfo.medications.map((med, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{med}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-600" />
                Lifestyle Recommendations
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {tumorInfo.lifestyle.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  Follow-up Schedule
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">{tumorInfo.followUp}</p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <Phone className="h-4 w-4 text-red-600" />
                  Emergency Contact
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">{tumorInfo.emergency}</p>
              </div>
            </div>

            {tumor_type === "glioma" && (
              <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800 dark:text-orange-200">
                  Glioma detected. Please proceed with genetic mutation analysis for detailed staging and personalized
                  treatment planning.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-center pt-4">
              <Button onClick={onReset} variant="outline" size="lg" className="px-8">
                <RotateCcw className="h-4 w-4 mr-2" />
                Analyze Another Image
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  } else {
    // Enhanced Glioma stage result with comprehensive guidance
    const stageResult = result as StageResponse
    const { glioma_stage, confidence, mutation_summary } = stageResult

    const getStageInfo = () => {
      switch (glioma_stage) {
        case "Stage 1":
          return {
            color: "default" as const,
            description:
              "Low-grade glioma with favorable prognosis. Treatment typically involves surgical resection with possible adjuvant therapy.",
            urgency: "Low",
            hopeMessage:
              "🌟 Stage 1 gliomas have an excellent prognosis! Many patients live normal lifespans with proper treatment. You caught this early, which gives you the best possible outcome.",
            treatment: [
              "Surgical resection (tumor removal) is often curative",
              "Regular monitoring with MRI scans",
              "Possible radiation therapy if complete removal isn't possible",
              "Chemotherapy may be considered in some cases",
            ],
            medications: [
              "Dexamethasone (2-4mg daily) - reduce swelling post-surgery",
              "Levetiracetam (500mg twice daily) - seizure prevention",
              "Pain management as needed post-operatively",
            ],
            timeline: "Surgery within 2-4 weeks, recovery 4-6 weeks, follow-up every 3 months",
            prognosis: "Excellent - 5-year survival rate >90% with proper treatment",
          }
        case "Stage 2":
          return {
            color: "secondary" as const,
            description:
              "Low to intermediate-grade glioma. Treatment usually includes maximal safe resection followed by radiation and possibly chemotherapy.",
            urgency: "Moderate",
            hopeMessage:
              "💙 Stage 2 gliomas respond very well to treatment! With modern therapies, many patients maintain excellent quality of life for many years. Stay positive - you have many treatment options.",
            treatment: [
              "Maximal safe surgical resection",
              "Radiation therapy (6 weeks of daily treatments)",
              "Temozolomide chemotherapy",
              "Regular monitoring and follow-up care",
            ],
            medications: [
              "Temozolomide (150-200mg/m² for 5 days every 28 days)",
              "Dexamethasone (4-8mg daily) - manage swelling",
              "Anti-nausea medications during chemotherapy",
              "Prophylactic antibiotics (Bactrim) during treatment",
            ],
            timeline:
              "Surgery within 1-2 weeks, radiation starts 2-4 weeks post-surgery, chemotherapy concurrent with radiation",
            prognosis: "Very good - median survival 8-12 years with aggressive treatment",
          }
        case "Stage 3":
          return {
            color: "secondary" as const,
            description:
              "High-grade glioma with more aggressive characteristics. Multimodal treatment approach recommended including surgery, radiation, and chemotherapy.",
            urgency: "High",
            hopeMessage:
              "💪 Stage 3 gliomas are challenging, but there's real hope! New treatments are constantly improving outcomes. Many patients live meaningful lives for years with proper care. You're stronger than you know, and we're here to fight this with you.",
            treatment: [
              "Urgent surgical resection within 1 week",
              "Intensive radiation therapy (6 weeks)",
              "Concurrent and adjuvant temozolomide chemotherapy",
              "Consider clinical trials for novel therapies",
              "Tumor treating fields (TTFields) therapy",
            ],
            medications: [
              "Temozolomide (75mg/m² daily during radiation, then 150-200mg/m² for 5 days every 28 days)",
              "Dexamethasone (8-16mg daily) - manage significant swelling",
              "Levetiracetam (1000mg twice daily) - seizure prevention",
              "Ondansetron (8mg as needed) - nausea control",
              "Prophylactic medications for infection prevention",
            ],
            timeline:
              "Surgery within 1 week, radiation starts within 2 weeks post-surgery, chemotherapy for 6-12 cycles",
            prognosis:
              "Guarded but hopeful - median survival 3-5 years, some patients live much longer with aggressive treatment",
          }
        case "Stage 4":
          return {
            color: "destructive" as const,
            description:
              "Glioblastoma (GBM) - the most aggressive form. Requires intensive treatment including maximal safe resection, radiation, and chemotherapy with close monitoring.",
            urgency: "Critical",
            hopeMessage:
              "🌈 While Stage 4 is serious, remember that every day brings new hope and treatments. Some patients exceed all expectations and live for years. Focus on today, cherish your loved ones, and know that medical miracles happen. You are not alone in this fight.",
            treatment: [
              "Emergency surgical consultation within 24-48 hours",
              "Maximal safe surgical resection",
              "Intensive radiation therapy with concurrent chemotherapy",
              "Maintenance chemotherapy cycles",
              "Tumor treating fields (TTFields)",
              "Clinical trial enrollment when appropriate",
            ],
            medications: [
              "Temozolomide (75mg/m² daily during radiation, then 150-200mg/m² for 5 days every 28 days)",
              "Dexamethasone (16mg daily initially) - manage swelling and symptoms",
              "Levetiracetam (1000mg twice daily) - seizure prevention",
              "Comprehensive supportive care medications",
              "Pain management as needed",
            ],
            timeline: "Surgery within 48-72 hours, radiation starts within 2-3 weeks, ongoing treatment and monitoring",
            prognosis: "Serious but treatable - median survival 15-20 months, with some long-term survivors",
          }
        default:
          return {
            color: "secondary" as const,
            description: "Please consult with a neuro-oncologist for detailed treatment recommendations.",
            urgency: "Unknown",
            hopeMessage: "We're here to support you through this journey.",
            treatment: ["Consult with your healthcare team"],
            medications: ["Follow your doctor's recommendations"],
            timeline: "As recommended by your healthcare provider",
            prognosis: "Discuss with your medical team",
          }
      }
    }

    const stageInfo = getStageInfo()

    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {/* Main Results Card */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <CardHeader className="text-center pb-6">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl">
              <Info className="h-6 w-6 text-purple-600" />
              Glioma Staging Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center">
              <Badge variant={stageInfo.color} className="text-lg px-6 py-3 mb-4">
                {glioma_stage}
              </Badge>
              {confidence && (
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-5 w-5 text-gray-500" />
                  <span className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                    Confidence: {(confidence * 100).toFixed(1)}%
                  </span>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl">
              <div className="flex items-start gap-3">
                <Heart className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                    A Message of Hope & Strength
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{stageInfo.hopeMessage}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Treatment Plan
                </h3>
                <ul className="space-y-2">
                  {stageInfo.treatment.map((treatment, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{treatment}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Pill className="h-5 w-5 text-green-600" />
                  Medication Protocol
                </h3>
                <ul className="space-y-2">
                  {stageInfo.medications.map((med, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{med}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {mutation_summary && (
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-600" />
                  Genetic Analysis Summary
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Total Mutations Detected: {mutation_summary.total_mutations}/7
                    </p>
                    {mutation_summary.positive_mutations.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Positive Mutations:</p>
                        <div className="flex flex-wrap gap-2">
                          {mutation_summary.positive_mutations.map((mutation, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {mutation}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      These genetic markers help determine the most effective treatment approach and provide insights
                      into prognosis.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  Treatment Timeline
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">{stageInfo.timeline}</p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Prognosis
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">{stageInfo.prognosis}</p>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Phone className="h-5 w-5 text-yellow-600" />
                Important Support Resources
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-2">24/7 Emergency Contact:</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Call 911 for severe symptoms, seizures, or loss of consciousness
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-2">Support Groups:</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Connect with other patients and families facing similar journeys
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl">
              <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Remember: You Are Not Alone</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Your medical team, family, and support network are here for you. Take this one day at a time, celebrate
                small victories, and never lose hope. Medical advances happen every day, and your strength is greater
                than you know.
              </p>
              <div className="flex justify-center">
                <Button onClick={onReset} variant="outline" size="lg" className="px-8">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Start New Analysis
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}
