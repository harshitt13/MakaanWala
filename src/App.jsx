"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import PropertyGallery from "./components/PropertyGallery";
import Pricing from "./components/Pricing";
import Blog from "./components/Blog";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import LoadingScreen from "./components/LoadingScreen";
import MobileOptimizations from "./utils/mobileOptimizations";
import "./App.css";
import "./styles/mobile-responsive.css";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Search from "./components/Search";
import BlogPost from "./components/BlogPost";
import PropertyDetail from "./components/PropertyDetail";
import NotFound from "./components/NotFound";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRestoreAppliedRef = useRef(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Initialize mobile optimizations
    MobileOptimizations.init();

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
      setShowScrollTop(totalScroll > 400); // show after some scroll

      // Persist current scroll for this route
      const routeKey = location.pathname + location.search + location.hash;
      // Store only every ~50ms via rAF batching
      if (!handleScroll.rafPending) {
        handleScroll.rafPending = true;
        requestAnimationFrame(() => {
          try {
            sessionStorage.setItem("scroll:" + routeKey, String(totalScroll));
          } catch (e) { /* ignore quota / private mode */ }
          handleScroll.rafPending = false;
        });
      }

      // Update active section based on scroll position
      const sections = [
        "home",
        "about",
        "services",
        "properties",
        "pricing",
        "blog",
        "contact",
      ];
      const headerHeight = 80;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop - headerHeight - 100;
          if (totalScroll >= sectionTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, location.search, location.hash]);

  // Apply restoration on load / route change (run after layout ready)
  useEffect(() => {
    if (scrollRestoreAppliedRef.current) return;
    window.history.scrollRestoration = 'manual';
    const routeKey = location.pathname + location.search + location.hash;
    let saved = null;
  try { saved = sessionStorage.getItem('scroll:' + routeKey); } catch (e) { /* ignore */ }
    if (saved) {
      const target = parseInt(saved, 10) || 0;
      // First attempt soon after paint
      requestAnimationFrame(() => window.scrollTo(0, target));
      // Second attempt after potential async/lazy content mounts (e.g. images)
      setTimeout(() => {
        if (Math.abs(window.scrollY - target) > 40) {
          window.scrollTo(0, target);
        }
      }, 350);
      scrollRestoreAppliedRef.current = true;
    }
  }, [location.pathname, location.search, location.hash]);

  // Ensure final position saved on unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        const routeKey = location.pathname + location.search + location.hash;
        sessionStorage.setItem('scroll:' + routeKey, String(window.scrollY));
      } catch (e) { /* ignore */ }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [location.pathname, location.search, location.hash]);

  const scrollToSection = (sectionId) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      // Use setTimeout to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerHeight = 80;
          const elementPosition = element.offsetTop - headerHeight;

          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      // We're already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.offsetTop - headerHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      ></div>
      <Header activeSection={activeSection} onNavigate={scrollToSection} />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <section id="home" className="section">
                <Hero onExplore={() => scrollToSection("properties")} />
              </section>
              <section id="about" className="section">
                <About />
              </section>
              <section id="services" className="section">
                <Services />
              </section>
              <section id="properties" className="section">
                <PropertyGallery />
              </section>
              <section id="pricing" className="section">
                <Pricing onNavigateToContact={() => scrollToSection("contact")} />
              </section>
              <section id="blog" className="section">
                <Blog />
              </section>
              <section id="contact" className="section">
                <ContactForm />
              </section>
            </main>
          }
        />
        <Route path="/search" element={<Search />} />
  <Route path="/blog/:id" element={<BlogPost />} />
  <Route path="/property/:id" element={<PropertyDetail />} />
  {/* Catch-all 404 route MUST stay last */}
  <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Chatbot />
      {showScrollTop && (
        <button
          aria-label="Scroll to top"
          className="scroll-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;
