import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🏠 Welcome to MakaanWala! I'm your AI property assistant. How can I help you find your dream property today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Property database
  const propertyDatabase = [
    {
      id: 1,
      type: "apartment",
      title: "Luxury 3BHK in Connaught Place",
      price: "₹85L",
      location: "Delhi",
      features: ["3 bedrooms", "2 bathrooms", "1200 sq ft", "furnished"],
      description:
        "Premium apartment in the heart of Delhi with modern amenities",
    },
    {
      id: 2,
      type: "villa",
      title: "4BHK Villa with Pool",
      price: "₹1.2Cr",
      location: "Gurgaon",
      features: [
        "4 bedrooms",
        "3 bathrooms",
        "2800 sq ft",
        "private pool",
        "garden",
      ],
      description: "Spacious villa perfect for families with luxury amenities",
    },
    {
      id: 3,
      type: "studio",
      title: "Modern Studio Apartment",
      price: "₹28L",
      location: "Bangalore",
      features: ["1 room", "1 bathroom", "450 sq ft", "fully furnished"],
      description: "Perfect for young professionals in tech hub",
    },
    {
      id: 4,
      type: "commercial",
      title: "Office Space in Cyber City",
      price: "₹65L",
      location: "Gurgaon",
      features: ["1500 sq ft", "parking", "24/7 security", "cafeteria"],
      description: "Prime commercial space in business district",
    },
  ];
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Extract budget from message
    const budgetMatch = lowerMessage.match(/(\d+)\s*(lakh|crore|l|cr)/i);
    let userBudget = null;
    if (budgetMatch) {
      const amount = parseInt(budgetMatch[1]);
      const unit = budgetMatch[2].toLowerCase();
      userBudget = unit.includes("cr") ? amount * 100 : amount;
    }

    if (lowerMessage.includes("apartment") || lowerMessage.includes("flat")) {
      const apartment = propertyDatabase.find((p) => p.type === "apartment");
      return `We have excellent apartments! Our featured ${
        apartment.title
      } in ${apartment.location} is available for ${
        apartment.price
      }. It includes ${apartment.features.join(", ")}. ${
        apartment.description
      }. Would you like more details or schedule a viewing?`;
    }

    if (lowerMessage.includes("villa") || lowerMessage.includes("house")) {
      const villa = propertyDatabase.find((p) => p.type === "villa");
      return `Perfect choice for families! Our ${villa.title} in ${
        villa.location
      } for ${villa.price}. Features include ${villa.features.join(", ")}. ${
        villa.description
      }. Interested in scheduling a viewing?`;
    }

    if (lowerMessage.includes("studio")) {
      const studio = propertyDatabase.find((p) => p.type === "studio");
      return `Great for young professionals! ${studio.title} in ${
        studio.location
      } for just ${studio.price}. Features: ${studio.features.join(", ")}. ${
        studio.description
      }. Perfect for IT professionals!`;
    }

    if (
      lowerMessage.includes("commercial") ||
      lowerMessage.includes("office")
    ) {
      const commercial = propertyDatabase.find((p) => p.type === "commercial");
      return `Excellent business opportunity! ${commercial.title} in ${
        commercial.location
      } for ${commercial.price}. Includes ${commercial.features.join(", ")}. ${
        commercial.description
      }. Ideal for your business needs!`;
    }

    if (lowerMessage.includes("budget") || lowerMessage.includes("price")) {
      if (userBudget) {
        const matchingProperties = propertyDatabase.filter((p) => {
          const price = parseInt(p.price.replace(/[₹LCr]/g, ""));
          return price <= userBudget * 1.1;
        });

        if (matchingProperties.length > 0) {
          const property = matchingProperties[0];
          return `Great! Based on your budget of ₹${userBudget}L, I found: ${
            property.title
          } in ${property.location} for ${
            property.price
          }. It features ${property.features.join(
            ", "
          )}. Would you like to know more?`;
        }
      }
      return "Our properties range from ₹28L for studio apartments to ₹1.2Cr for luxury villas. What's your budget range? I can help find the perfect match within your price range.";
    }

    if (
      lowerMessage.includes("loan") ||
      lowerMessage.includes("financing") ||
      lowerMessage.includes("emi")
    ) {
      return "💰 We have partnerships with leading banks including SBI, HDFC, ICICI, and Axis Bank. Interest rates start from 8.5% with up to 90% loan-to-value ratio. Quick pre-approval available in 24 hours! EMI calculator also available. What's your monthly income range?";
    }

    if (
      lowerMessage.includes("viewing") ||
      lowerMessage.includes("visit") ||
      lowerMessage.includes("schedule")
    ) {
      return "🏠 I'd love to arrange a property viewing for you! We offer immediate viewing (today/tomorrow), weekend viewing, or virtual tour options. Contact: +91 98765 43210. Available Mon-Fri 9AM-7PM, Weekends 10AM-5PM. Which property interests you?";
    }

    if (lowerMessage.includes("delhi")) {
      const delhiProp = propertyDatabase.find((p) => p.location === "Delhi");
      return `Delhi is a prime location! We have ${delhiProp.title} for ${delhiProp.price}. Delhi offers great connectivity, schools, and business opportunities. Which area interests you - Central, South, or West Delhi?`;
    }

    if (lowerMessage.includes("gurgaon") || lowerMessage.includes("gurugram")) {
      const gurgaonProps = propertyDatabase.filter(
        (p) => p.location === "Gurgaon"
      );
      return `Gurgaon is booming! We have ${gurgaonProps.length} excellent options including ${gurgaonProps[0].title} for ${gurgaonProps[0].price}. Known for modern infrastructure and business hubs. What type interests you?`;
    }

    if (
      lowerMessage.includes("bangalore") ||
      lowerMessage.includes("bengaluru")
    ) {
      const bangaloreProp = propertyDatabase.find(
        (p) => p.location === "Bangalore"
      );
      return `Bangalore - India's Silicon Valley! Perfect for tech professionals. We have ${bangaloreProp.title} for ${bangaloreProp.price}. Great connectivity to tech parks. Are you in the tech industry?`;
    }

    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      return "Hello! 👋 Welcome to MakaanWala - your trusted property partner! I can help you find apartments, villas, commercial spaces, arrange viewings, and provide loan guidance. What type of property interests you today?";
    }

    if (lowerMessage.includes("thank")) {
      return "You're welcome! 😊 I'm here 24/7 to help with your property needs. Feel free to ask about specific properties, market insights, or schedule viewings. How else can I assist you?";
    }

    return "I'd love to help you with that! 🏠 I can assist with property searches, price information, viewing arrangements, and loan guidance. Are you looking for apartments, villas, studios, or commercial spaces? What's your preferred location and budget?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const messageToProcess = inputValue;
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateResponse(messageToProcess),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Show me apartments",
    "Find luxury villas",
    "Properties under ₹50L",
    "Schedule viewing",
    "Loan assistance",
    "Properties in Delhi",
  ];

  return (
    <div className={`chatbot ${isOpen ? "chatbot-open" : ""}`}>
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-content">
              <h4>🏠 MakaanWala AI Assistant</h4>
              <span className="online-indicator">● Online - Instant Help</span>
            </div>
            <button
              className="clear-chat-btn"
              onClick={() =>
                setMessages([
                  {
                    id: 1,
                    text: "🏠 Welcome back! I'm your AI property assistant. How can I help you today?",
                    isUser: false,
                    timestamp: new Date(),
                  },
                ])
              }
              title="Clear Chat"
            >
              🔄
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.isUser ? "user-message" : "bot-message"
                }`}
              >
                <div className="message-content">{message.text}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
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
                    setInputValue(question);
                    setTimeout(handleSendMessage, 100);
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
              placeholder="Ask about properties, prices, locations..."
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
