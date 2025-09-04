import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import properties, { getPropertyById, getPropertyBySlug } from "../data/properties"; // centralized property data & helpers
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
import ThreeDViewer from "./ThreeDViewer";
import NotFound from "./NotFound";
import "./PropertyDetail.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shareCopied, setShareCopied] = useState(false);
  
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

  // properties now imported from centralized data file

  // Support both numeric ID and slug routes
  const property = getPropertyById(id) || getPropertyBySlug(id) || properties.find(p => p.id === parseInt(id));

  if (!property || property.complete === false) {
    return (
      <NotFound 
        title="Property Not Found" 
        message={property && property.complete === false ? "This property is not yet available. Please check back later." : "The property you're looking for doesn't exist or may have been removed."} 
        backLabel="Back to Home" 
        to="/" 
      />
    );
  }

  const handleShare = async () => {
    const shareUrl = `https://makaanwala.vercel.app/property/${id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch (err) {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
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
          <button className="property-back-button" onClick={() => navigate('/') }>
            <ArrowLeft size={20} />
            Back to Properties
          </button>
        </div>

        {/* Image Gallery */}
        <div className="property-gallery">
          <div className="main-image">
            <img 
              src={property.images[currentImageIndex]} 
              alt={property.title}
            />
            <button
              type="button"
              className={`floating-share-btn ${shareCopied ? 'copied' : ''}`}
              aria-label="Share property"
              onClick={handleShare}
            >
              <Share2 size={18} />
            </button>
            {shareCopied && (
              <span className="share-tooltip" role="status">Copied!</span>
            )}
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

        {/* 3D Model Viewer */}
        <ThreeDViewer property={property} />

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
