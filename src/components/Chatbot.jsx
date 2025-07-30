import { useState, useRef, useEffect } from "react"
import "./Chatbot.css"

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🏠 Welcome to MakaanWala! I'm your AI property assistant. How can I help you find your dream property today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userContext, setUserContext] = useState({
    budget: null,
    propertyType: null,
    location: null,
    preferences: [],
    stage: "initial"
  })

  // Property database
  const propertyDatabase = [
    {
      id: 1,
      type: "apartment",
      title: "Luxury 3BHK in Connaught Place",
      price: "₹85L",
      location: "Delhi",
      features: ["3 bedrooms", "2 bathrooms", "1200 sq ft", "furnished"],
      description: "Premium apartment in the heart of Delhi with modern amenities"
    },
    {
      id: 2,
      type: "villa",
      title: "4BHK Villa with Pool",
      price: "₹1.2Cr",
      location: "Gurgaon",
      features: ["4 bedrooms", "3 bathrooms", "2800 sq ft", "private pool", "garden"],
      description: "Spacious villa perfect for families with luxury amenities"
    },
    {
      id: 3,
      type: "studio",
      title: "Modern Studio Apartment",
      price: "₹28L",
      location: "Bangalore",
      features: ["1 room", "1 bathroom", "450 sq ft", "fully furnished"],
      description: "Perfect for young professionals in tech hub"
    },
    {
      id: 4,
      type: "commercial",
      title: "Office Space in Cyber City",
      price: "₹65L",
      location: "Gurgaon",
      features: ["1500 sq ft", "parking", "24/7 security", "cafeteria"],
      description: "Prime commercial space in business district"
    }
  ]
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes("apartment") || lowerMessage.includes("flat")) {
      return "We have excellent apartments available! Our featured 3BHK in Connaught Place, Delhi is available for ₹85L. It includes 3 bedrooms, 2 bathrooms, 1200 sq ft, and comes fully furnished. Would you like more details?"
    }
    
    if (lowerMessage.includes("villa") || lowerMessage.includes("house")) {
      return "Perfect choice for families! We have a beautiful 4BHK Villa with Pool in Gurgaon for ₹1.2Cr. Features include 4 bedrooms, 3 bathrooms, 2800 sq ft, private pool, and garden. Interested in scheduling a viewing?"
    }
    
    if (lowerMessage.includes("budget") || lowerMessage.includes("price")) {
      return "Our properties range from ₹28L for studio apartments to ₹1.2Cr for luxury villas. What's your budget range? I can help find the perfect match within your price range."
    }
    
    if (lowerMessage.includes("loan") || lowerMessage.includes("financing")) {
      return "We have partnerships with leading banks including SBI, HDFC, ICICI, and Axis Bank. Interest rates start from 8.5% with up to 90% loan-to-value ratio. Quick pre-approval available in 24 hours!"
    }
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! 👋 Welcome to MakaanWala. I'm here to help you find the perfect property. Are you looking for apartments, villas, or commercial spaces?"
    }
    
    return "I'd love to help you with that! 🏠 I can assist with property searches, price information, viewing arrangements, and loan guidance. What specific type of property interests you?"
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
    
    const messageToProcess = inputValue
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateResponse(messageToProcess),
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className={`chatbot ${isOpen ? "chatbot-open" : ""}`}>
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>🏠 MakaanWala AI Assistant</h4>
            <span className="online-indicator">● Online</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.isUser ? "user-message" : "bot-message"}`}>
                <div className="message-content">
                  {message.text}
                </div>
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

          <div className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about properties, prices, locations..."
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
