"use client";

import { useState, useMemo } from "react";
import {
  Heart,
  Phone,
  Mail,
} from "lucide-react";
import "./PropertyGallery.css";

const PropertyGallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const properties = useMemo(
    () => [
      {
        id: 1,
        title: "Modern Downtown Apartment",
        price: "₹45,00,000",
        location: "Connaught Place, Delhi",
        bedrooms: 2,
        bathrooms: 2,
        area: "1,200 sq ft",
        type: "apartment",
        image: "/placeholder.svg?height=300&width=400&text=Modern+Apartment",
        featured: true,
      },
      {
        id: 2,
        title: "Luxury Villa with Pool",
        price: "₹1,20,00,000",
        location: "Bandra West, Mumbai",
        bedrooms: 4,
        bathrooms: 3,
        area: "3,500 sq ft",
        type: "villa",
        image: "/placeholder.svg?height=300&width=400&text=Luxury+Villa",
        featured: true,
      },
      {
        id: 3,
        title: "Commercial Office Space",
        price: "₹80,00,000",
        location: "Cyber City, Gurgaon",
        bedrooms: 0,
        bathrooms: 2,
        area: "2,000 sq ft",
        type: "commercial",
        image: "/placeholder.svg?height=300&width=400&text=Office+Space",
        featured: false,
      },
      {
        id: 4,
        title: "Cozy Studio Apartment",
        price: "₹28,00,000",
        location: "Koramangala, Bangalore",
        bedrooms: 1,
        bathrooms: 1,
        area: "600 sq ft",
        type: "apartment",
        image: "/placeholder.svg?height=300&width=400&text=Studio+Apartment",
        featured: false,
      },
      {
        id: 5,
        title: "Family Villa with Garden",
        price: "₹95,00,000",
        location: "Jubilee Hills, Hyderabad",
        bedrooms: 5,
        bathrooms: 4,
        area: "4,200 sq ft",
        type: "villa",
        image: "/placeholder.svg?height=300&width=400&text=Family+Villa",
        featured: true,
      },
      {
        id: 6,
        title: "Retail Space Downtown",
        price: "₹60,00,000",
        location: "Commercial Street, Bangalore",
        bedrooms: 0,
        bathrooms: 1,
        area: "1,500 sq ft",
        type: "commercial",
        image: "/placeholder.svg?height=300&width=400&text=Retail+Space",
        featured: false,
      },
    ],
    []
  );

  const filteredProperties = useMemo(() => {
    let filtered = properties;

    if (activeFilter !== "all") {
      filtered = filtered.filter((property) => property.type === activeFilter);
    }

    if (priceRange !== "all") {
      filtered = filtered.filter((property) => {
        const price = Number.parseInt(property.price.replace(/[₹,]/g, ""));
        switch (priceRange) {
          case "under-50l":
            return price < 5000000;
          case "50l-1cr":
            return price >= 5000000 && price < 10000000;
          case "over-1cr":
            return price >= 10000000;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [activeFilter, priceRange, properties]);



  const PropertyActions = () => (
    <div className="property-actions">
      <div className="action-buttons">
        <button
          className="action-btn favorite-btn"
          aria-label="Add to favorites"
        >
          <Heart size={18} />
        </button>
        <button className="action-btn contact-btn" aria-label="Contact agent">
          <Phone size={18} />
        </button>
        <button className="action-btn email-btn" aria-label="Send inquiry">
          <Mail size={18} />
        </button>
      </div>
    </div>
  );

  const filters = [
    { id: "all", label: "All Properties" },
    { id: "apartment", label: "Apartments" },
    { id: "villa", label: "Villas" },
    { id: "commercial", label: "Commercial" },
  ];

  return (
    <section className="property-gallery">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span>🏘️</span>
            Featured Properties
          </div>
          <h2>Discover Premium Properties</h2>
          <p>Handpicked selection of the finest real estate opportunities</p>
        </div>

        <div className="filters">
          <div className="filter-group">
            <label>Property Type:</label>
            <div className="filter-buttons">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={`filter-btn ${
                    activeFilter === filter.id ? "active" : ""
                  }`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Price Range:</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="price-filter"
            >
              <option value="all">All Prices</option>
              <option value="under-50l">Under ₹50L</option>
              <option value="50l-1cr">₹50L - ₹1Cr</option>
              <option value="over-1cr">Over ₹1Cr</option>
            </select>
          </div>
        </div>

        <div className="properties-grid">
          {filteredProperties.map((property) => (
            <div key={property.id} className="property-card">
              {property.featured && (
                <div className="featured-badge">Featured</div>
              )}

              <div className="property-image">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                />
                <div className="property-overlay">
                  <button className="view-btn">View Details</button>
                </div>
              </div>

              <div className="property-info">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-location">{property.location}</p>
                <div className="property-price">{property.price}</div>

                <div className="property-details">
                  {property.bedrooms > 0 && (
                    <span className="detail">
                      <strong>{property.bedrooms}</strong> Beds
                    </span>
                  )}
                  <span className="detail">
                    <strong>{property.bathrooms}</strong> Baths
                  </span>
                  <span className="detail">
                    <strong>{property.area}</strong>
                  </span>
                </div>

                <PropertyActions property={property} />
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="no-results">
            <p>No properties found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyGallery;
