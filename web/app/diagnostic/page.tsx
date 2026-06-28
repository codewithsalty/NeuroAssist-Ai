"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Brain, Activity, Zap, ArrowRight, CheckCircle, Sparkles, Target, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DiagnosticPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const diagnosticOptions = [
    {
      id: "tumor-detection",
      title: "Tumor Type Detection",
      description: "Upload MRI scans to detect and classify brain tumors using our advanced AI model",
      icon: <Brain className="h-16 w-16" />,
      features: ["AI-powered detection", "Multiple tumor types", "99.2% accuracy", "Instant results"],
      href: "/detect-tumor",
      badge: "Most Popular",
      cardBg: "from-purple-600 to-indigo-700",
      iconBg: "from-purple-500 to-indigo-600",
      badgeStyle: "bg-purple-600 text-white",
      stats: { accuracy: "99.2%", time: "<5s", cases: "10K+" },
    },
    {
      id: "glioma-staging",
      title: "Glioma Stage Prediction",
      description: "Determine glioma stage using genetic mutation data and patient information",
      icon: <Activity className="h-16 w-16" />,
      features: ["Genetic analysis", "Stage classification", "Mutation profiling", "Clinical insights"],
      href: "/predict-glioma",
      badge: "Specialized",
      cardBg: "from-emerald-600 to-teal-700",
      iconBg: "from-emerald-500 to-teal-600",
      badgeStyle: "bg-emerald-600 text-white",
      stats: { accuracy: "97.8%", time: "<3s", stages: "4 Types" },
    },
    {
      id: "combined-analysis",
      title: "Complete Analysis Workflow",
      description: "Full diagnostic pipeline: tumor detection followed by glioma staging if applicable",
      icon: <Zap className="h-16 w-16" />,
      features: ["End-to-end analysis", "Comprehensive reports", "Automated workflow", "Complete diagnosis"],
      href: "/complete-analysis",
      badge: "Recommended",
      cardBg: "from-orange-600 to-red-700",
      iconBg: "from-orange-500 to-red-600",
      badgeStyle: "bg-orange-600 text-white",
      stats: { accuracy: "99%", time: "<30s", features: "All-in-1" },
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-purple-900/20 pt-20">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="container relative mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8 group">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 text-lg">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Diagnostics
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 dark:from-white dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-6">
              Choose Your Diagnostic Path
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Select the analysis type that best fits your needs. Our AI-powered models provide accurate, fast results
              to support clinical decision-making.
            </p>
          </motion.div>
        </div>

        {/* Diagnostic Options with Prominent Badges - Exactly like the provided image */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {diagnosticOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
              onMouseEnter={() => setHoveredCard(option.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Link href={option.href} className="block h-full">
                {/* Card with dark background like the image */}
                <Card
                  className={`h-full transition-all duration-500 cursor-pointer border-0 bg-gradient-to-br ${option.cardBg} hover:shadow-2xl hover:scale-105 transform relative overflow-hidden text-white`}
                >
                  {/* Prominent Badge at the top - exactly like the image */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <Badge
                      className={`${option.badgeStyle} shadow-xl px-6 py-2 text-sm font-bold rounded-full border-2 border-white/20`}
                    >
                      {option.badge}
                    </Badge>
                  </div>

                  <CardHeader className="text-center pb-6 pt-16 relative z-10">
                    {/* Large Icon with rounded background - exactly like the image */}
                    <motion.div
                      className="mb-8 flex justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`p-8 rounded-3xl bg-gradient-to-br ${option.iconBg} text-white shadow-2xl group-hover:shadow-3xl transition-all duration-300`}
                      >
                        {option.icon}
                      </div>
                    </motion.div>

                    <CardTitle className="text-3xl mb-6 text-white font-bold">{option.title}</CardTitle>
                    <CardDescription className="text-lg leading-relaxed text-white/90 px-4">
                      {option.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 relative z-10 px-8 pb-8">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                      {Object.entries(option.stats).map(([key, value], idx) => (
                        <div key={key} className="text-center">
                          <div className="text-xl font-bold text-white">{value}</div>
                          <div className="text-xs text-white/80 capitalize font-medium">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {option.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + idx * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle className="h-6 w-6 text-white flex-shrink-0" />
                          <span className="text-base text-white font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 group/btn text-lg py-6 rounded-xl backdrop-blur-sm">
                      <Target className="mr-2 h-6 w-6" />
                      Start Analysis
                      <ArrowRight className="ml-2 h-6 w-6 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                  </CardContent>

                  {/* Hover Effect Overlay */}
                  <AnimatePresence>
                    {hoveredCard === option.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 border-0 shadow-2xl backdrop-blur-sm">
            <CardContent className="p-12">
              <div className="text-center">
                <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2">
                  Professional Medical AI
                </Badge>
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
                  Trusted by Healthcare Professionals Worldwide
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Our models are trained on thousands of medical images and clinical data points, providing healthcare
                  professionals with reliable diagnostic support backed by cutting-edge AI technology.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[
                    {
                      icon: <Target className="h-8 w-8" />,
                      value: "99.2%",
                      label: "Detection Accuracy",
                      color: "from-purple-500 to-blue-500",
                    },
                    {
                      icon: <Clock className="h-8 w-8" />,
                      value: "<30s",
                      label: "Analysis Time",
                      color: "from-emerald-500 to-teal-500",
                    },
                    {
                      icon: <Brain className="h-8 w-8" />,
                      value: "24/7",
                      label: "Availability",
                      color: "from-orange-500 to-red-500",
                    },
                    {
                      icon: <CheckCircle className="h-8 w-8" />,
                      value: "10K+",
                      label: "Cases Analyzed",
                      color: "from-indigo-500 to-purple-500",
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                      className="text-center group"
                    >
                      <div
                        className={`bg-gradient-to-r ${stat.color} text-white rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        {stat.icon}
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
