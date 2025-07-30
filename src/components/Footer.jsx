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
} from "lucide-react";
import "./Footer.css";

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
              Your trusted partner in finding the perfect property. We connect
              dreams with reality through exceptional real estate services
              across India.
            </p>
            <div className="social-links">
              <a
                href="https://facebook.com/makaanwala"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="social-link"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com/makaanwala"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="social-link"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com/makaanwala"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="social-link"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com/company/makaanwala"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with us on LinkedIn"
                className="social-link"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://youtube.com/makaanwala"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch us on YouTube"
                className="social-link"
              >
                <Youtube size={20} />
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
              <div className="contact-item">
                <MapPin size={18} className="contact-icon" />
                <span>123 Real Estate Avenue, New Delhi 110001</span>
              </div>
              <div className="contact-item">
                <Phone size={18} className="contact-icon" />
                <a href="tel:+919876543210">+91 98765 43210</a>
              </div>
              <div className="contact-item">
                <Mail size={18} className="contact-icon" />
                <a href="mailto:info@makaanwala.com">info@makaanwala.com</a>
              </div>
              <div className="contact-item">
                <Clock size={18} className="contact-icon" />
                <span>Mon-Fri: 9AM-7PM, Sat-Sun: 10AM-5PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} MakaanWala. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
