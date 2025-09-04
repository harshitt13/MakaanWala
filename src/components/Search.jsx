
import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import properties from "../data/properties"; // centralized shared data

const Search = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q") || "";
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return properties
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q)
      )
      .filter((p) => (typeFilter === "all" ? true : p.type === typeFilter));
  }, [query, typeFilter]);

  return (
    <section className="search-results-section">
      <div className="container">
        <h2>Search Results for: <span style={{ color: '#0077cc' }}>{query}</span></h2>
        {/* Type Filter Controls */}
        {query.trim() && (
          <div style={{ marginTop: 20, marginBottom: 24, display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ fontWeight: 600 }}>Filter by type:</label>
            {[
              { id: 'all', label: 'All' },
              { id: 'apartment', label: 'Apartments' },
              { id: 'villa', label: 'Villas' },
              { id: 'commercial', label: 'Commercial' },
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setTypeFilter(btn.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                  background: typeFilter === btn.id ? '#0077cc' : '#f5f5f5',
                  color: typeFilter === btn.id ? '#fff' : '#333',
                  fontSize: 14,
                  transition: 'all .2s'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div style={{ marginTop: 32, color: '#888' }}>No results found.</div>
        ) : (
          <>
            <div style={{ marginBottom: 8, fontSize: 14, color: '#555' }}>
              Showing {filtered.length} result{filtered.length !== 1 && 's'}
              {typeFilter !== 'all' && ` in ${typeFilter}`}
            </div>
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
          </>
        )}
      </div>
    </section>
  );
};

export default Search;
