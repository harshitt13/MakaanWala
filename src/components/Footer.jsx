import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">🏠</div>
              <h3>MakaanWala</h3>
            </div>
            <p>
              Your trusted partner in finding the perfect property. We connect dreams with reality through exceptional
              real estate services across India.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                📘
              </a>
              <a href="#" aria-label="Twitter">
                🐦
              </a>
              <a href="#" aria-label="Instagram">
                📷
              </a>
              <a href="#" aria-label="LinkedIn">
                💼
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#properties">Properties</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Property Types</h4>
            <ul>
              <li>
                <a href="#">Apartments</a>
              </li>
              <li>
                <a href="#">Villas</a>
              </li>
              <li>
                <a href="#">Commercial</a>
              </li>
              <li>
                <a href="#">Land</a>
              </li>
              <li>
                <a href="#">Luxury Homes</a>
              </li>
              <li>
                <a href="#">Investment Properties</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p>📍 123 Real Estate Avenue, New Delhi 110001</p>
              <p>📞 +91 98765 43210</p>
              <p>✉️ info@makaanwala.com</p>
              <p>🕒 Mon-Fri: 9AM-7PM, Sat-Sun: 10AM-5PM</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 MakaanWala. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
