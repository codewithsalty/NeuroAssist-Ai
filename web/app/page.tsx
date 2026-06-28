"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import {
  Brain,
  Shield,
  Zap,
  Users,
  Award,
  ChevronRight,
  Play,
  Star,
  CheckCircle,
  ArrowRight,
  Activity,
  Microscope,
} from "lucide-react"
import FloatingAssistant from "@/components/ai-assistant/floating-assistant"

const heroImages = [
  "/images/brain-mri-scan.png",
  "/images/medical-ai-technology.png",
  "/images/neurology-research.png",
  "/images/brain-scan-analysis.png",
]

const stats = [
  { number: "99.2%", label: "Accuracy Rate", icon: Award },
  { number: "500+", label: "Medical Institutions", icon: Users },
  { number: "50K+", label: "Scans Analyzed", icon: Activity },
  { number: "24/7", label: "AI Support", icon: Shield },
]

const features = [
  {
    icon: Brain,
    title: "AI-Powered Detection",
    description: "Advanced machine learning algorithms for precise tumor identification and classification.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get comprehensive analysis results in seconds, not hours or days.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security ensuring complete patient data protection.",
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    icon: Microscope,
    title: "Multi-Modal Analysis",
    description: "Supports various imaging modalities including MRI, CT, and PET scans.",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
  },
]

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief Radiologist, Mayo Clinic",
    content:
      "NeuroAssist has revolutionized our diagnostic workflow. The accuracy and speed of tumor detection have significantly improved patient outcomes in our department.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Dr. Michael Rodriguez",
    role: "Neurosurgeon, Johns Hopkins",
    content:
      "This AI assistant has significantly improved our early detection rates and surgical planning accuracy. It's become an essential tool in our practice.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Dr. Emily Watson",
    role: "Oncologist, Cleveland Clinic",
    content:
      "The speed and precision of NeuroAssist allows us to focus more on patient care and treatment planning. Outstanding diagnostic capabilities.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1594824475317-d3b9b4b8b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Dr. James Thompson",
    role: "Head of Radiology, Stanford Medical",
    content:
      "Outstanding accuracy in tumor detection. This technology is transforming how we approach brain imaging and diagnosis in our institution.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Dr. Lisa Park",
    role: "Neuro-oncologist, UCLA Medical",
    content:
      "The genetic analysis capabilities have enhanced our treatment planning significantly. Highly recommended for any medical institution.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Dr. Robert Kim",
    role: "Chief Medical Officer, Cedars-Sinai",
    content:
      "NeuroAssist has become an essential tool in our diagnostic arsenal. The results speak for themselves with improved patient outcomes.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
]

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Slideshow */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={heroImages[currentImageIndex] || "/placeholder.svg"}
                alt="Medical Technology"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          {/* Professional gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/60 to-slate-900/70" />
        </div>

        <div className="container relative z-20 mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="mb-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-100 border-blue-400/30 px-6 py-2 text-sm font-medium backdrop-blur-sm">
                ✨ Trusted by 500+ Medical Institutions Worldwide
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-light mb-8 leading-tight"
            >
              <span className="block text-white/90 mb-2">Advanced AI for</span>
              <span className="block font-semibold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Brain Tumor Detection
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl mb-12 text-slate-200/90 font-light leading-relaxed max-w-3xl mx-auto"
            >
              Revolutionizing medical diagnosis with cutting-edge artificial intelligence.
              <br />
              <span className="text-blue-200">
                Precise, fast, and reliable brain tumor screening for healthcare professionals.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button
                asChild
                size="lg"
                className="group relative border-2 border-blue-400/60 text-blue-100 bg-blue-600/20 hover:bg-blue-500/30 backdrop-blur-md transition-all duration-500 px-10 py-4 text-lg font-semibold rounded-xl hover:border-blue-300/80 hover:shadow-lg hover:shadow-blue-400/20"
              >
                <Link href="/diagnostic" className="relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                  <Brain className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  Start Analysis
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]" />
                </Link>
              </Button>

              <Button
                onClick={() => {
                  // Create and show demo popup
                  const popup = document.createElement("div")
                  popup.className = "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                  popup.innerHTML = `
                    <div class="bg-gradient-to-br from-slate-900 to-blue-900 p-8 rounded-2xl shadow-2xl max-w-md mx-4 text-center border border-blue-400/30">
                      <div class="mb-6">
                        <div class="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-2">Demo Coming Soon!</h3>
                        <p class="text-blue-200 leading-relaxed">
                          We're putting the finishing touches on an amazing interactive demo. 
                          Stay tuned for an immersive experience showcasing our AI capabilities!
                        </p>
                      </div>
                      <button onclick="this.parentElement.parentElement.remove()" class="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                        Got it!
                      </button>
                    </div>
                  `
                  document.body.appendChild(popup)

                  // Add click outside to close
                  popup.addEventListener("click", (e) => {
                    if (e.target === popup) {
                      popup.remove()
                    }
                  })
                }}
                size="lg"
                className="group relative border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-md transition-all duration-500 px-10 py-4 text-lg font-semibold rounded-xl hover:border-white/60 hover:shadow-lg hover:shadow-white/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-blue-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Slideshow indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-blue-600" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-slate-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Transforming Medical Diagnosis with AI
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                NeuroAssist combines cutting-edge artificial intelligence with medical expertise to provide
                unprecedented accuracy in brain tumor detection. Our platform empowers healthcare professionals with
                tools that enhance diagnostic precision and improve patient outcomes.
              </p>
              <div className="space-y-4">
                {[
                  "FDA-approved AI algorithms",
                  "Real-time analysis and reporting",
                  "Integration with existing PACS systems",
                  "Continuous learning and improvement",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/images/brain-scan-analysis.png"
                alt="AI Medical Analysis"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Advanced Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the powerful capabilities that make NeuroAssist the leading choice for medical professionals
              worldwide.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50 dark:bg-gray-800 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Trusted by Medical Professionals</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what leading healthcare institutions say about NeuroAssist
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              animate={{ x: [0, -100 * testimonials.length] }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex gap-8"
              style={{ width: `${testimonials.length * 400}px` }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <Card key={index} className="w-80 h-80 flex-shrink-0 shadow-lg">
                  <CardContent className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 italic text-sm leading-relaxed">
                        "{testimonial.content}"
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">{testimonial.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
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
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Practice?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of medical professionals who trust NeuroAssist for accurate brain tumor detection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-medium"
              >
                <Link href="/diagnostic">
                  Start Free Trial
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                <Link href="/contact">Contact Sales</Link>
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
