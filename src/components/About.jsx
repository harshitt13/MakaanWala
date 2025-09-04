"use client"

import { useState, useEffect, useRef } from "react"
import "./About.css"

const About = () => {
  const [counters, setCounters] = useState({
    experience: 0,
    properties: 0,
    clients: 0,
    agents: 0,
  })
  const [isVisible, setIsVisible] = useState(false)
  const aboutRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          animateCounters()
        }
      },
      { threshold: 0.3 },
    )

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  const animateCounters = () => {
    const targets = {
      experience: 20,
      properties: 5000,
      clients: 15000,
      agents: 250,
    }

    const duration = 2000
    const steps = 50
    const stepDuration = duration / steps

    Object.keys(targets).forEach((key) => {
      const target = targets[key]
      const increment = target / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setCounters((prev) => ({
          ...prev,
          [key]: Math.floor(current),
        }))
      }, stepDuration)
    })
  }

  const teamMembers = [
    {
      name: "Don Eladio",
      role: "CEO & Founder",
      image: "/ceo.png?height=300&width=300&text=CEO",
      bio: "20+ years in Indian real estate with expertise in residential and commercial properties across major cities.",
    },
    {
      name: "Hector Salamanca",
      role: "Head of Sales",
      image: "/hos.png?height=300&width=300&text=Sales+Head",
      bio: "Top-performing agent specializing in first-time home buyers and affordable housing solutions.",
    },
    {
      name: "Lalo Salamanca",
      role: "Property Manager",
      image: "/manager.png?height=300&width=300&text=Manager",
      bio: "Expert in property management and investment strategies with focus on rental yields and ROI optimization.",
    },
  ]

  const features = [
    {
      icon: "🤝",
      title: "Trust & Transparency",
      description: "Honest dealings and transparent processes in every transaction.",
    },
    {
      icon: "💡",
      title: "Market Expertise",
      description: "Deep knowledge of Indian real estate markets and trends.",
    },
    {
      icon: "🎯",
      title: "Client Focus",
      description: "Your satisfaction and success are our top priorities.",
    },
    {
      icon: "🏆",
      title: "Proven Results",
      description: "Track record of successful transactions and satisfied clients.",
    },
  ]

  return (
    <section className="about-section" ref={aboutRef}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span>🏢</span>
            About MakaanWala
          </div>
          <h2>Professional Real Estate Services</h2>
          <p>
            Your trusted partner in Indian real estate for over 20 years, delivering exceptional results through
            expertise and integrity.
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3>Why Choose MakaanWala?</h3>
            <p>
              Since 2004, MakaanWala has been at the forefront of India&#39;s real estate industry, helping thousands of
              families, investors, and businesses find their perfect properties. Our commitment to excellence and client
              satisfaction has made us one of the most trusted names in Indian real estate.
            </p>
            <p>
              We combine deep market knowledge with cutting-edge technology to provide comprehensive real estate
              solutions. From residential homes to commercial spaces, from buying to selling, we handle every aspect of
              your real estate journey with professionalism and care.
            </p>

            <div className="about-features">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-visual">
            <div className="about-image">
              <img
                src="/team.png?height=400&width=500&text=Professional+Team"
                alt="MakaanWala Professional Team"
              />
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-icon">📅</div>
              <div className="stat-number">{counters.experience}+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🏠</div>
              <div className="stat-number">{counters.properties.toLocaleString()}+</div>
              <div className="stat-label">Properties Sold</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">😊</div>
              <div className="stat-number">{counters.clients.toLocaleString()}+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">👥</div>
              <div className="stat-number">{counters.agents}+</div>
              <div className="stat-label">Expert Agents</div>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h3>Our Leadership Team</h3>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-image">
                  <img src={member.image || "/team.png"} alt={member.name} />
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About