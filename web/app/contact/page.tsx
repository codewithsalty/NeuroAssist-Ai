"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value) => {
    setFormState((prev) => ({ ...prev, inquiryType: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "general",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center">
          <Button asChild variant="ghost" size="icon" className="mr-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Home</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gradient">Get in Touch</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-8">
                  Have questions about NeuroAssist™? Our team is here to help. Reach out to us using any of the methods
                  below, or fill out the contact form.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-none shadow-md card-hover">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">contact@neuroassist.com</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        We'll respond within 24 business hours
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md card-hover">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">+1 (555) 123-4567</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Monday-Friday, 9AM-5PM EST</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md card-hover">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Visit Us</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        123 Medical Center Dr, Suite 456
                        <br />
                        San Francisco, CA 94143
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-xl text-white shadow-lg">
                <h3 className="font-bold mb-2">Emergency Support</h3>
                <p className="text-sm mb-4">
                  For urgent technical assistance with the NeuroAssist™ platform, please contact our 24/7 support team.
                </p>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 987-6543</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-none shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-gradient">Send Us a Message</h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center"
                  >
                    <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Thank you for contacting us. We'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="border-gray-300 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="border-gray-300 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Inquiry Type</Label>
                      <RadioGroup
                        value={formState.inquiryType}
                        onValueChange={handleRadioChange}
                        className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="general" id="general" />
                          <Label htmlFor="general" className="cursor-pointer">
                            General
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="technical" id="technical" />
                          <Label htmlFor="technical" className="cursor-pointer">
                            Technical Support
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="partnership" id="partnership" />
                          <Label htmlFor="partnership" className="cursor-pointer">
                            Partnership
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        className="border-gray-300 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Please provide details about your inquiry..."
                        rows={5}
                        required
                        className="border-gray-300 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <section className="py-16 mt-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gradient">Frequently Asked Questions</h2>
            <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
              Find answers to common questions about NeuroAssist™ and our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "How accurate is NeuroAssist™ in detecting brain tumors?",
                a: "NeuroAssist™ achieves 99.2% accuracy in tumor detection, validated through extensive clinical testing with over 10,000 cases.",
              },
              {
                q: "Is my medical data secure with NeuroAssist™?",
                a: "Yes, we employ end-to-end encryption and comply with HIPAA and GDPR regulations to ensure your data remains secure and private.",
              },
              {
                q: "Can NeuroAssist™ integrate with our existing hospital systems?",
                a: "Yes, NeuroAssist™ is designed to integrate seamlessly with most hospital information systems and PACS through standard protocols.",
              },
              {
                q: "How long does the analysis process take?",
                a: "The entire analysis process typically takes less than 30 seconds from image upload to receiving detailed results.",
              },
              {
                q: "Do you offer training for medical staff?",
                a: "Yes, we provide comprehensive training sessions for medical professionals to ensure optimal use of the NeuroAssist™ platform.",
              },
              {
                q: "Is NeuroAssist™ FDA approved?",
                a: "NeuroAssist™ has received FDA clearance as a clinical decision support tool for healthcare professionals.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-none shadow-md card-hover h-full">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{faq.q}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
