import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  Home,
} from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <Home size={28} />
              </div>
              <h3>MakaanWala</h3>
            </div>
            <p>
              Your trusted partner in finding the perfect property. Connecting dreams with reality across India.
            </p>
            <div className="social-links">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-link"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="social-link"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-link"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-link"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="social-link"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <div className="footer-links-grid">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#properties">Properties</a>
              <a href="#blog">Blog</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Property Types</h4>
            <div className="footer-links-grid">
              <a href="#">Apartments</a>
              <a href="#">Villas</a>
              <a href="#">Commercial</a>
              <a href="#">Land</a>
              <a href="#">Luxury Homes</a>
              <a href="#">Investment</a>
            </div>
          </div>

          <div className="footer-section footer-contact">
            <h4>Get In Touch</h4>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={16} />
                <span>3828 Piermont Dr, Albuquerque, NM 87112</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <a href="tel:+911145678900">+91 11 4567 8900</a>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <a href="mailto:support@makaanwala.com">support@makaanwala.com</a>
              </div>
              <div className="contact-item">
                <Clock size={16} />
                <span>Mon-Fri: 9AM-7PM • Sat-Sun: 10AM-5PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} MakaanWala. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
            <span>•</span>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
