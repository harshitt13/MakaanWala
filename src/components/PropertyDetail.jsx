import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Wifi, 
  Shield, 
  Trees, 
  Zap,
  Share2,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import "./PropertyDetail.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Form state for quick inquiry
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    propertyId: id
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Extended property data with more details
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
      images: [
        "/placeholder.svg?height=400&width=600&text=Modern+Apartment+1",
        "/placeholder.svg?height=400&width=600&text=Modern+Apartment+2",
        "/placeholder.svg?height=400&width=600&text=Modern+Apartment+3",
        "/placeholder.svg?height=400&width=600&text=Modern+Apartment+4"
      ],
      description: "A stunning modern apartment in the heart of Delhi's business district. This beautifully designed 2-bedroom unit features contemporary finishes, floor-to-ceiling windows, and premium amenities. Perfect for professionals and small families looking for urban convenience.",
      amenities: ["WiFi", "Parking", "Security", "Garden", "Power Backup"],
      features: [
        "Prime location in Connaught Place",
        "24/7 security and concierge",
        "Modern kitchen with premium appliances",
        "Master bedroom with en-suite bathroom",
        "Balcony with city views",
        "Central air conditioning",
        "Covered parking space",
        "Access to rooftop garden"
      ],
      nearbyPlaces: [
        { name: "Metro Station", distance: "200m" },
        { name: "Shopping Mall", distance: "500m" },
        { name: "Hospital", distance: "1.2km" },
        { name: "School", distance: "800m" }
      ],
      agent: {
        name: "Walter White",
        phone: "+91 99XXXXXXXX",
        email: "walter@makaanwala.com",
        image: "https://vignette.wikia.nocookie.net/breakingbad/images/4/46/Cast_bb_800x600_walter-white.jpg/revision/latest/scale-to-width-down/350?cb=20170613183854"
      }
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
      images: [
        "/placeholder.svg?height=400&width=600&text=Luxury+Villa+1",
        "/placeholder.svg?height=400&width=600&text=Luxury+Villa+2",
        "/placeholder.svg?height=400&width=600&text=Luxury+Villa+3",
        "/placeholder.svg?height=400&width=600&text=Luxury+Villa+4"
      ],
      description: "An exquisite luxury villa offering the perfect blend of comfort and elegance. Located in prestigious Bandra West, this property features a private swimming pool, landscaped gardens, and top-of-the-line amenities throughout.",
      amenities: ["WiFi", "Parking", "Security", "Garden", "Power Backup", "Swimming Pool"],
      features: [
        "Private swimming pool and deck",
        "Landscaped garden with outdoor seating",
        "Spacious living areas with high ceilings",
        "Gourmet kitchen with island",
        "Master suite with walk-in closet",
        "3 additional bedrooms with attached baths",
        "2-car garage with storage",
        "Home office/study room"
      ],
      nearbyPlaces: [
        { name: "Bandra Station", distance: "1.5km" },
        { name: "Linking Road", distance: "1km" },
        { name: "Lilavati Hospital", distance: "2km" },
        { name: "American School", distance: "1.8km" }
      ],
      agent: {
        name: "Skyler White",
        phone: "+91 99XXXXXXXX",
        email: "skyler@makaanwala.com",
        image: "https://dygtyjqp7pi0m.cloudfront.net/i/21084/22735773_3.jpg?v=8D28033E5EA82A0"
      }
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
      images: [
        "/placeholder.svg?height=400&width=600&text=Office+Space+1",
        "/placeholder.svg?height=400&width=600&text=Office+Space+2",
        "/placeholder.svg?height=400&width=600&text=Office+Space+3",
        "/placeholder.svg?height=400&width=600&text=Office+Space+4"
      ],
      description: "Premium commercial office space in the heart of Cyber City, Gurgaon. This modern workspace offers excellent connectivity, state-of-the-art infrastructure, and a professional environment perfect for growing businesses.",
      amenities: ["WiFi", "Parking", "Security", "Power Backup", "Conference Room"],
      features: [
        "Grade A office building",
        "24/7 security and access control",
        "High-speed elevators",
        "Central air conditioning",
        "Dedicated parking spaces",
        "Conference room access",
        "Cafeteria and food court",
        "Metro connectivity"
      ],
      nearbyPlaces: [
        { name: "Cyber Hub", distance: "500m" },
        { name: "Metro Station", distance: "300m" },
        { name: "Hospital", distance: "2km" },
        { name: "Shopping Complex", distance: "1km" }
      ],
      agent: {
        name: "Jesse Pinkman",
        phone: "+91 99XXXXXXXX",
        email: "jesse@makaanwala.com",
        image: "https://tse2.mm.bing.net/th/id/OIP.bMMCqogxWFqrqrJUf2LvZQHaHU?pid=ImgDet&w=198&h=196&c=7&o=7&rm=3"
      }
    }
  ];

  const property = properties.find(p => p.id === parseInt(id));

  if (!property) {
    return (
      <div className="property-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>Property Not Found</h2>
            <p>The property you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/')} className="property-back-button">
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    const shareUrl = `https://makaanwala.vercel.app/property/${id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      // Create a temporary notification
      const notification = document.createElement('div');
      notification.textContent = 'Link copied to clipboard!';
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #38a169;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    } catch (err) {
      alert('Link copied to clipboard!');
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formPayload = {
        ...formData,
        access_key: import.meta.env.VITE_WEB3FORM_ACCESS_KEY,
        subject: `MakaanWalaProperty Inquiry - ${property?.title || 'Property ID: ' + id}`,
        from_name: formData.name,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formPayload),
      });
      
      const data = await response.json();
      if (data.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          propertyId: id
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi size={16} />;
      case 'parking': return <Car size={16} />;
      case 'security': return <Shield size={16} />;
      case 'garden': return <Trees size={16} />;
      case 'power backup': return <Zap size={16} />;
      default: return <div className="amenity-dot"></div>;
    }
  };

  return (
    <div className="property-detail-page">
      <div className="container">
        {/* Header */}
        <div className="property-detail-header">
          <button className="property-back-button" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
            Back to Properties
          </button>
          
          <div className="header-actions">
            <button className="action-button" onClick={handleShare}>
              <Share2 size={18} />
              Share
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="property-gallery">
          <div className="main-image">
            <img 
              src={property.images[currentImageIndex]} 
              alt={property.title}
            />
          </div>
          <div className="thumbnail-grid">
            {property.images.map((image, index) => (
              <div 
                key={index}
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img src={image} alt={`${property.title} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div className="property-content">
          <div className="property-main">
            <div className="property-header">
              <div className="property-title-section">
                <h1>{property.title}</h1>
                <div className="property-location">
                  <MapPin size={16} />
                  {property.location}
                </div>
                <div className="property-price">{property.price}</div>
              </div>
            </div>

            <div className="property-stats">
              {property.bedrooms > 0 && (
                <div className="stat">
                  <Bed size={20} />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
              )}
              <div className="stat">
                <Bath size={20} />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="stat">
                <Square size={20} />
                <span>{property.area}</span>
              </div>
            </div>

            <div className="property-description">
              <h3>About This Property</h3>
              <p>{property.description}</p>
            </div>

            <div className="property-features">
              <h3>Key Features</h3>
              <ul>
                {property.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="property-amenities">
              <h3>Amenities</h3>
              <div className="amenities-grid">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="amenity">
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="nearby-places">
              <h3>Nearby Places</h3>
              <div className="places-grid">
                {property.nearbyPlaces.map((place, index) => (
                  <div key={index} className="place">
                    <span className="place-name">{place.name}</span>
                    <span className="place-distance">{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Agent Contact Card */}
          <div className="property-sidebar">
            <div className="agent-card">
              <h3>Contact Agent</h3>
              <div className="agent-info">
                <img src={property.agent.image} alt={property.agent.name} />
                <div className="agent-details">
                  <h4>{property.agent.name}</h4>
                  <p>Property Specialist</p>
                </div>
              </div>
              
              <div className="contact-actions">
                <button className="contact-button phone">
                  <Phone size={18} />
                  Call Now
                </button>
                <button className="contact-button email">
                  <Mail size={18} />
                  Email
                </button>
              </div>
            </div>

            <div className="inquiry-form">
              <h3>Quick Inquiry</h3>
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Your Phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                />
                <textarea 
                  name="message"
                  placeholder="Your Message" 
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                </button>
                
                {submitStatus === "success" && (
                  <div className="form-message success">
                    <CheckCircle size={16} />
                    Thank you! Your inquiry has been sent successfully.
                  </div>
                )}
                
                {submitStatus === "error" && (
                  <div className="form-message error">
                    <AlertCircle size={16} />
                    Sorry, there was an error sending your inquiry. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
