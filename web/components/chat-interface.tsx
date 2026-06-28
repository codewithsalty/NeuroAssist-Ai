"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, type ChangeEvent } from "react"
import { Button, Input, Space, message } from "antd"
import { SendOutlined, AudioOutlined, StopOutlined } from "@ant-design/icons"
import styles from "./chat-interface.module.css"

interface Message {
  sender: "user" | "assistant"
  text: string
}

declare global {
  interface Window {
    webkitSpeechRecognition: any
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean
    interimResults: boolean
    lang: string
    onstart: () => void
    onresult: (event: SpeechRecognitionEvent) => void
    onend: () => void
    onerror: (event: SpeechRecognitionErrorEvent) => void
    start: () => void
    stop: () => void
  }

  interface SpeechRecognitionEvent extends Event {
    resultIndex: number
    results: SpeechRecognitionResultList
  }

  interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult
    length: number
    item(index: number): SpeechRecognitionResult
  }

  interface SpeechRecognitionResult {
    isFinal: boolean
    [index: number]: SpeechRecognitionAlternative
    length: number
    item(index: number): SpeechRecognitionAlternative
  }

  interface SpeechRecognitionAlternative {
    transcript: string
    confidence: number
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: string
  }
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isVoiceMode, setIsVoiceMode] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Initialize SpeechRecognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = ""
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setInputValue((prev) => prev + event.results[i][0].transcript)
          } else {
            interimTranscript += event.results[i][0].transcript
          }
        }
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
        message.error("Speech recognition error. Please try again.")
      }

      recognitionRef.current = recognition
    } else {
      console.warn("Speech recognition is not supported in this browser.")
      setIsVoiceMode(false)
    }
  }, [])

  // Function to add a message to the chat
  const addMessage = useCallback((sender: "user" | "assistant", text: string) => {
    setMessages((prevMessages) => [...prevMessages, { sender, text }])
  }, [])

  // Function to handle sending a message
  const sendMessage = useCallback(() => {
    if (inputValue.trim() !== "") {
      addMessage("user", inputValue)
      setInputValue("")
      // Simulate assistant response (replace with actual API call)
      setTimeout(() => {
        const assistantResponse = "This is a simulated response from the assistant."
        addMessage("assistant", assistantResponse)

        if (isVoiceMode && !isMuted) {
          speakText(assistantResponse)
        }
      }, 500)
    }
  }, [inputValue, addMessage, isVoiceMode, isMuted])

  // Function to handle voice input
  const handleVoiceInput = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start()
        setIsListening(true)
      }
    }
  }, [isListening])

  // Function to toggle voice mode
  const toggleVoiceMode = useCallback(() => {
    setIsVoiceMode((prev) => !prev)
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    }
  }, [isListening])

  // Function to toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  // Function to handle text-to-speech
  const speakText = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    speechSynthesis.speak(utterance)
  }, [])

  // Initial welcome message
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        const welcomeMessage =
          "Welcome to NeuroAssist™, your advanced AI-powered platform for brain tumor detection and staging. I'm your diagnostic assistant, ready to analyze MRI images with 99.2% accuracy using our state-of-the-art neural networks. Would you like to upload an image for analysis or learn more about our capabilities?"
        addMessage("assistant", welcomeMessage)

        if (isVoiceMode && !isMuted) {
          speakText(welcomeMessage)
        }

        setShowWelcome(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [showWelcome, isVoiceMode, isMuted, addMessage, speakText])

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageList}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${message.sender === "user" ? styles.userMessage : styles.assistantMessage}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <Space direction="horizontal" className={styles.inputArea}>
        <Input
          placeholder="Enter your message..."
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          onPressEnter={sendMessage}
        />
        <Button type="primary" icon={<SendOutlined />} onClick={sendMessage}>
          Send
        </Button>
        {isVoiceMode && (
          <Button
            icon={isListening ? <StopOutlined /> : <AudioOutlined />}
            onClick={handleVoiceInput}
            disabled={!("webkitSpeechRecognition" in window)}
          >
            {isListening ? "Stop" : "Speak"}
          </Button>
        )}
      </Space>
      <Space style={{ marginTop: 16 }}>
        <Button type="default" onClick={toggleVoiceMode}>
          {isVoiceMode ? "Disable Voice Mode" : "Enable Voice Mode"}
        </Button>
        {isVoiceMode && (
          <Button type="default" onClick={toggleMute}>
            {isMuted ? "Unmute" : "Mute"}
          </Button>
        )}
      </Space>
    </div>
  )
}

export default ChatInterface
