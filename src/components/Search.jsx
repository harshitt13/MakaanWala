
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

// Property data (copied from PropertyGallery)
const properties = [
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
];

const Search = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q") || "";

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return properties.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section className="search-results-section">
      <div className="container">
        <h2>Search Results for: <span style={{ color: '#0077cc' }}>{query}</span></h2>
        {filtered.length === 0 ? (
          <div style={{ marginTop: 32, color: '#888' }}>No results found.</div>
        ) : (
          <div className="property-gallery search-property-gallery">
            {filtered.map((property) => (
              <div key={property.id} className="property-card">
                <img src={property.image} alt={property.title} className="property-image" />
                <div className="property-info">
                  <h3>{property.title}</h3>
                  <div className="property-location">{property.location}</div>
                  <div className="property-details">
                    <span>{property.bedrooms} Bed</span> | <span>{property.bathrooms} Bath</span> | <span>{property.area}</span>
                  </div>
                  <div className="property-price">{property.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
