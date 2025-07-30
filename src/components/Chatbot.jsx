"use client"

import { useState, useRef, useEffect } from "react"
import "./Chatbot.css"

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your MakaanWala assistant. How can I help you find your perfect property today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("budget")) {
      return "Our properties range from ₹28L for studio apartments to ₹1.2Cr for luxury villas. What's your budget range? I can help you find properties that match your financial requirements."
    }

    if (lowerMessage.includes("apartment") || lowerMessage.includes("flat")) {
      return "We have beautiful apartments ranging from cozy studios to spacious 4-bedroom units. They're located in prime areas like Connaught Place, Bandra, and Koramangala. Would you like to see our available apartments?"
    }

    if (lowerMessage.includes("villa") || lowerMessage.includes("house")) {
      return "Our villa collection includes luxury properties with 4-5 bedrooms, private pools, and gardens. Prices start from ₹95L. These are perfect for families looking for space and privacy."
    }

    if (lowerMessage.includes("commercial") || lowerMessage.includes("office") || lowerMessage.includes("business")) {
      return "We offer various commercial spaces including office buildings and retail spaces in prime business districts like Cyber City Gurgaon and Commercial Street Bangalore. Are you looking to buy or lease?"
    }

    if (lowerMessage.includes("location") || lowerMessage.includes("area") || lowerMessage.includes("city")) {
      return "We have properties in several premium locations: Delhi NCR, Mumbai, Bangalore, Hyderabad, and other major Indian cities. Which city or area interests you most?"
    }

    if (lowerMessage.includes("viewing") || lowerMessage.includes("visit") || lowerMessage.includes("tour")) {
      return "I'd be happy to arrange a property viewing for you! You can schedule through our contact form or call us at +91 98765 43210. Our agents are available Mon-Fri 9AM-7PM, weekends 10AM-5PM."
    }

    if (lowerMessage.includes("loan") || lowerMessage.includes("financing") || lowerMessage.includes("emi")) {
      return "We work with several trusted banks and NBFCs for home loans. Our team can connect you with pre-approved lenders and help you understand your financing options. Would you like me to arrange a consultation?"
    }

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! Great to meet you. I'm here to help you find the perfect property in India. Are you looking for a residential home, apartment, or commercial space?"
    }

    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "You're very welcome! I'm here whenever you need help with your property search. Feel free to ask me anything about our listings, pricing, or scheduling viewings."
    }

    // Default response
    return "That's a great question! I can help you with property searches, pricing information, scheduling viewings, and connecting you with our expert agents. You can also fill out our contact form for personalized assistance. What specific information are you looking for?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(
      () => {
        const botResponse = {
          id: Date.now() + 1,
          text: generateResponse(inputValue),
          isUser: false,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickQuestions = [
    "Show me apartments under ₹50L",
    "What luxury villas do you have?",
    "Schedule a property viewing",
    "Tell me about commercial spaces",
  ]

  return (
    <div className={`chatbot ${isOpen ? "chatbot-open" : ""}`}>
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>🏠 MakaanWala Assistant</h4>
            <span className="online-indicator">● Online</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.isUser ? "user-message" : "bot-message"}`}>
                <div className="message-content">{message.text}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message bot-message">
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="quick-questions">
              <p>Quick questions:</p>
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="quick-question-btn"
                  onClick={() => {
                    setInputValue(question)
                    setTimeout(handleSendMessage, 100)
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <div className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about properties..."
              disabled={isTyping}
            />
            <button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chatbot
