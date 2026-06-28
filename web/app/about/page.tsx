"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowLeft, Brain, Microscope, GraduationCap, Award, Users, Github, Linkedin, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  const teamRef = useRef(null)
  const missionRef = useRef(null)
  const isTeamInView = useInView(teamRef, { once: true, amount: 0.3 })
  const isMissionInView = useInView(missionRef, { once: true, amount: 0.3 })
  const [selectedMember, setSelectedMember] = useState(null)

  const teamMembers = [
    {
      name: "Salman Khan",
      role: "Lead AI Engineer & Co-Founder",
      bio: "Cryptography Blockchain & AI-ML Enthusiast | Certified Ethical Hacker Python Full Stack Developer | 3D Animated Fully Responsive Web Developer | Graphic Designer.",
      image: "/images/team/salman-khan.jpg",
      gender: "male",
      linkedin: "https://www.linkedin.com/in/s4lmankhan/",
      github: "https://github.com/S4lmankhan",
      email: "codewithsalty@gmail.com",
      portfolio: "www.codewithsalty.com",
      experience: "5+ years in AI/ML & Full Stack Development",
      education: "Certified Ethical Hacker, Full Stack Developer",
      specialties: ["Cryptography", "Blockchain", "AI/ML", "Python", "3D Animation", "Graphic Design"],
    },
    {
      name: "Usama Shahid",
      role: "Machine Learning Engineer & Data Scientist",
      bio: "Artificial Intelligence Student | AI & ML Enthusiast | Python & Java Dev | Eager for New Opportunities",
      image: "/images/team/usama-shahid.jpg",
      gender: "male",
      linkedin: "https://www.linkedin.com/in/usamashahid2366009/",
      github: "https://github.com/usama-shahid",
      email: "usama@neuroassist.com",
      experience: "4+ years in Data Science",
      education: "MS Data Science, MIT",
      specialties: ["Machine Learning", "Data Analysis", "Model Optimization", "Python", "R"],
    },
    {
      name: "Afnaan",
      role: "Full-Stack Developer & Technical Lead",
      bio: "Aspiring AI/ML Developer | AI Student at NUML | Passionate About Innovation and Teaching | Focused on Python and AI Development",
      image: "/images/team/afnan.jpeg",
      gender: "female",
      linkedin: "https://www.linkedin.com/in/afnan-shoukat-030306267/",
      github: "https://github.com/afnaan-tech",
      email: "afnaan@neuroassist.com",
      experience: "4+ years in Full-Stack Development",
      education: "BS Software Engineering, Carnegie Mellon",
      specialties: ["React", "Next.js", "Node.js", "Cloud Architecture", "API Development"],
    },
    {
      name: "Hina Tanveer",
      role: "Frontend Developer & UX Designer",
      bio: "Hina creates intuitive user interfaces for complex medical AI systems. She specializes in responsive design, accessibility, and creating user-friendly experiences for healthcare professionals.",
      image: "/images/team/hina-tanveer.png",
      gender: "female",
      linkedin: "https://www.linkedin.com/in/hina-tanveer-21a19b292/",
      github: "https://github.com/hina-tanveer",
      email: "hina@neuroassist.com",
      experience: "3+ years in Frontend Development",
      education: "BS Computer Science, University of Washington",
      specialties: ["UI/UX Design", "React", "Tailwind CSS", "Figma", "Accessibility"],
    },
    {
      name: "Dure Addan",
      role: "Backend Developer & DevOps Engineer",
      bio: "Aspiring Backend Developer | Computer Engineering Student | Passionate About DevOps and Cloud Technologies | Focused on System Architecture and Scalable Solutions",
      image: "/images/team/dure-addan.jpg",
      gender: "female",
      linkedin: "https://www.linkedin.com/in/dure-adan-noor-29b01b2b5/",
      github: "https://github.com/dure-addan",
      email: "dure@neuroassist.com",
      experience: "4+ years in Backend Development",
      education: "BS Computer Engineering, UC Berkeley",
      specialties: ["DevOps", "AWS", "Docker", "Kubernetes", "Backend APIs", "System Architecture"],
    },
  ]

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-8 flex items-center">
          <Button asChild variant="ghost" size="icon" className="mr-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Home</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">About NeuroAssist™</h1>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-16 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-indigo-600/90 mix-blend-multiply" />
          <Image
            src="/images/brain-scan-analysis.png"
            alt="NeuroAssist AI Technology - Advanced Brain Tumor Detection System"
            width={1200}
            height={500}
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 max-w-4xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
              >
                Revolutionizing Neuro-Oncology
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl md:text-2xl text-white max-w-3xl mx-auto drop-shadow-md leading-relaxed"
              >
                Leading the future of brain tumor diagnostics through cutting-edge artificial intelligence and medical
                expertise
              </motion.p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <section ref={missionRef} className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gradient">Our Mission</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  At NeuroAssist™, our mission is to revolutionize brain tumor diagnostics by combining cutting-edge
                  artificial intelligence with medical expertise. We aim to provide healthcare professionals with tools
                  that enable faster, more accurate diagnoses, ultimately improving patient outcomes.
                </p>
                <p>
                  We believe that technology should augment human expertise, not replace it. Our AI-powered platform is
                  designed to work alongside healthcare professionals, providing them with insights that help make
                  informed decisions quickly and confidently.
                </p>
                <p>
                  Through continuous research and development, we strive to push the boundaries of what's possible in
                  medical imaging analysis, making advanced diagnostic capabilities accessible to healthcare providers
                  worldwide.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              <Card className="bg-purple-50 dark:bg-gray-800 border-none card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-full mb-4">
                    <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-medium mb-2">AI Innovation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Developing state-of-the-art neural networks for medical imaging analysis
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-indigo-50 dark:bg-gray-800 border-none card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full mb-4">
                    <Microscope className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-medium mb-2">Clinical Precision</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ensuring diagnostic accuracy through rigorous clinical validation
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-indigo-50 dark:bg-gray-800 border-none card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full mb-4">
                    <GraduationCap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-medium mb-2">Continuous Learning</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Improving our models through ongoing research and feedback
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 dark:bg-gray-800 border-none card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-full mb-4">
                    <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-medium mb-2">Excellence</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Committed to the highest standards in everything we do
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" ref={teamRef} className="py-16">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gradient">Meet Our Team</h2>
              <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
                Our diverse team combines expertise in artificial intelligence, medical imaging, software development,
                and clinical research to create innovative solutions for brain tumor diagnostics.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="h-full cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <Card className="overflow-hidden border-none shadow-xl card-hover bg-white dark:bg-gray-800 h-full flex flex-col transition-transform hover:scale-105">
                  <div className="relative h-64 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 flex items-center justify-center">
                    {member.image ? (
                      <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          width={192}
                          height={192}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    ) : (
                      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-200 to-indigo-200 dark:from-purple-800 dark:to-indigo-800 flex items-center justify-center border-4 border-white shadow-lg">
                        <div className="text-6xl">{member.gender === "male" ? "👨‍💻" : "👩‍💻"}</div>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6 h-48 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{member.name}</h3>
                      <p className="text-sm text-purple-600 dark:text-purple-400 mb-3 font-semibold">{member.role}</p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex-1">{member.bio}</p>
                    <div className="mt-4 text-xs text-purple-500 dark:text-purple-400 font-medium">
                      Click to view profile →
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Member Popup */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full z-10"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="p-8">
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="w-32 h-32 mx-auto md:mx-0 flex-shrink-0">
                      {selectedMember.image ? (
                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-purple-200 dark:border-purple-700 shadow-lg">
                          <Image
                            src={selectedMember.image || "/placeholder.svg"}
                            alt={selectedMember.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 rounded-full flex items-center justify-center border-4 border-purple-200 dark:border-purple-700 shadow-lg">
                          <div className="text-4xl">{selectedMember.gender === "male" ? "👨‍💻" : "👩‍💻"}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{selectedMember.name}</h3>
                      <p className="text-lg text-purple-600 dark:text-purple-400 mb-2 font-semibold">
                        {selectedMember.role}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedMember.email}</p>

                      <div className="flex justify-center md:justify-start gap-4 mb-4">
                        <a
                          href={selectedMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </a>
                        <a
                          href={selectedMember.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                        {selectedMember.portfolio && (
                          <a
                            href={`https://${selectedMember.portfolio}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            <Globe className="h-4 w-4" />
                            Portfolio
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">About</h4>
                      <p className="text-gray-700 dark:text-gray-300">{selectedMember.bio}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Experience</h4>
                        <p className="text-gray-700 dark:text-gray-300">{selectedMember.experience}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Education</h4>
                        <p className="text-gray-700 dark:text-gray-300">{selectedMember.education}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <section className="py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md my-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gradient">Our Impact</h2>
              <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
                NeuroAssist™ is making a difference in brain tumor diagnostics around the world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "99.2%", label: "Detection Accuracy" },
                { value: "10,000+", label: "Cases Analyzed" },
                { value: "200+", label: "Medical Institutions" },
                { value: "45+", label: "Countries" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isTeamInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{stat.value}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gradient">Ready to Experience NeuroAssist™?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-700 dark:text-gray-300">
            Join healthcare providers worldwide who are using our platform to improve brain tumor diagnostics.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/diagnostic">Start Your Screening</Link>
          </Button>
        </section>
      </div>
    </div>
  )
}
