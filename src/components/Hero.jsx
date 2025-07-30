"use client"

import { useEffect, useState } from "react"
import "./Hero.css"

const Hero = ({ onExplore }) => {
  const [stats, setStats] = useState({
    properties: 0,
    clients: 0,
    agents: 0,
    experience: 0,
  })

  useEffect(() => {
    // Animate counters on load
    const targets = {
      properties: 5000,
      clients: 10000,
      agents: 200,
      experience: 20,
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
        setStats((prev) => ({
          ...prev,
          [key]: Math.floor(current),
        }))
      }, stepDuration)
    })
  }, [])

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-main">
          <div className="hero-text">
            <div className="hero-badge">
              <span>🏆</span>
              <span>India's Leading Real Estate Platform</span>
            </div>

            <h1 className="hero-title">Find Your Perfect Property in India</h1>

            <p className="hero-subtitle">
              Professional real estate services with over 20 years of experience. We help you buy, sell, and invest in
              properties across major Indian cities with confidence and expertise.
            </p>

            <div className="hero-search">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by location, property type, or budget..."
                  className="search-input"
                />
                <button className="search-button">
                  <span>🔍</span>
                </button>
              </div>
            </div>

            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={onExplore}>
                <span>Browse Properties</span>
              </button>
              <button className="btn btn-secondary">
                <span>Schedule Consultation</span>
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image">
              <img
                src="/placeholder.svg?height=400&width=600&text=Professional+Real+Estate"
                alt="Professional Real Estate Services"
              />
            </div>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-icon">🏠</div>
            <div className="stat-number">{stats.properties.toLocaleString()}+</div>
            <div className="stat-label">Properties Sold</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-number">{stats.clients.toLocaleString()}+</div>
            <div className="stat-label">Satisfied Clients</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏢</div>
            <div className="stat-number">{stats.agents}+</div>
            <div className="stat-label">Expert Agents</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-number">{stats.experience}+</div>
            <div className="stat-label">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
