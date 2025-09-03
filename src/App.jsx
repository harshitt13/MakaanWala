"use client";

import { useState, useEffect } from "react";
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

import { Routes, Route } from "react-router-dom";
import Search from "./components/Search";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

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

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
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
      </Routes>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
