"use client"

import { useState } from "react"
import "./ContactForm.css"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("idle")

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyType: "",
        budget: "",
        message: "",
      })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 3000)
    }
  }

  return (
    <section className="contact-form-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span>📞</span>
            Get In Touch
          </div>
          <h2>Let's Find Your Dream Property</h2>
          <p>Ready to take the next step? Our expert team is here to help you</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <h4>Visit Our Office</h4>
                <p>
                  123 Real Estate Avenue
                  <br />
                  Connaught Place, New Delhi 110001
                </p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <div className="info-content">
                <h4>Call Us</h4>
                <p>+91 98765 43210</p>
                <p>+91 11 4567 8900</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">✉️</div>
              <div className="info-content">
                <h4>Email Us</h4>
                <p>info@makaanwala.com</p>
                <p>support@makaanwala.com</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">🕒</div>
              <div className="info-content">
                <h4>Working Hours</h4>
                <p>
                  Mon - Fri: 9:00 AM - 7:00 PM
                  <br />
                  Sat - Sun: 10:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send us a Message</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="propertyType">Property Type</label>
                <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange}>
                  <option value="">Select Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="budget">Budget Range</label>
              <select id="budget" name="budget" value={formData.budget} onChange={handleChange}>
                <option value="">Select Budget Range</option>
                <option value="under-30l">Under ₹30L</option>
                <option value="30l-50l">₹30L - ₹50L</option>
                <option value="50l-1cr">₹50L - ₹1Cr</option>
                <option value="1cr-2cr">₹1Cr - ₹2Cr</option>
                <option value="over-2cr">Over ₹2Cr</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your property requirements..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {submitStatus === "success" && (
              <div className="form-message success">Thank you! Your message has been sent successfully.</div>
            )}

            {submitStatus === "error" && (
              <div className="form-message error">
                Sorry, there was an error sending your message. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
