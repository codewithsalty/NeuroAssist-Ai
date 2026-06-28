"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Brain,
  Microscope,
  Activity,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Stethoscope,
  FileText,
  Clock,
} from "lucide-react"
import FloatingAssistant from "@/components/ai-assistant/floating-assistant"

const services = [
  {
    icon: Brain,
    title: "Brain Tumor Detection",
    description:
      "Advanced AI-powered detection of various brain tumor types including gliomas, meningiomas, and pituitary tumors.",
    features: ["99.2% accuracy rate", "Real-time analysis", "Multiple imaging modalities", "Instant reporting"],
    price: "Starting at $299/month",
    popular: true,
  },
  {
    icon: Microscope,
    title: "Glioma Staging & Grading",
    description: "Comprehensive genetic mutation analysis for precise glioma classification and treatment planning.",
    features: ["WHO grade classification", "Molecular subtyping", "Treatment recommendations", "Prognosis assessment"],
    price: "Starting at $199/month",
    popular: false,
  },
  {
    icon: Activity,
    title: "Complete Neurological Analysis",
    description:
      "Full-spectrum brain imaging analysis including tumor detection, staging, and comprehensive reporting.",
    features: ["Multi-modal imaging", "Comprehensive reports", "Treatment planning", "Follow-up monitoring"],
    price: "Starting at $499/month",
    popular: false,
  },
  {
    icon: Shield,
    title: "Enterprise PACS Integration",
    description: "Seamless integration with existing hospital systems and PACS for streamlined workflow.",
    features: ["DICOM compatibility", "HL7 integration", "Custom workflows", "24/7 support"],
    price: "Custom pricing",
    popular: false,
  },
]

const additionalServices = [
  {
    icon: FileText,
    title: "AI-Generated Reports",
    description: "Automated, comprehensive medical reports with detailed findings and recommendations.",
  },
  {
    icon: Clock,
    title: "24/7 AI Support",
    description: "Round-the-clock AI assistance for urgent cases and immediate consultation needs.",
  },
  {
    icon: Users,
    title: "Training & Education",
    description: "Comprehensive training programs for medical staff on AI-assisted diagnosis.",
  },
  {
    icon: Stethoscope,
    title: "Telemedicine Integration",
    description: "Remote consultation capabilities with AI-powered diagnostic support.",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-blue-500/20 text-blue-600 border-blue-400/30">
              Professional Medical AI Services
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Advanced AI Solutions for
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Medical Professionals
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Comprehensive suite of AI-powered diagnostic tools designed to enhance medical decision-making and improve
              patient outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Core Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose from our range of specialized AI diagnostic services tailored for different medical needs.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {service.popular && (
                  <Badge className="absolute -top-3 left-6 z-10 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    Most Popular
                  </Badge>
                )}
                <Card
                  className={`h-full ${service.popular ? "ring-2 ring-blue-500 shadow-xl" : "hover:shadow-lg"} transition-all duration-300`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <service.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{service.title}</CardTitle>
                        <div className="text-2xl font-bold text-blue-600 mt-2">{service.price}</div>
                      </div>
                    </div>
                    <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full" size="lg">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Additional Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive support services to maximize the value of your AI diagnostic platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-fit mb-4">
                      <service.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Contact our team to discuss which services best fit your medical practice needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-medium"
              >
                <Link href="/contact">
                  Contact Sales
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                <Link href="/diagnostic">Try Demo</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating AI Assistant */}
      <FloatingAssistant />
    </div>
  )
}
