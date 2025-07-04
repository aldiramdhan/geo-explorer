import { useState, useEffect } from 'react';
import './FloatingSearch.css';

const FloatingSearch = ({ onSearch, isMapLoading, onToggleSidebar, sidebarVisible }) => {
  const [location, setLocation] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim() && !isMapLoading) {
      onSearch(location.trim());
    }
  };

  const handleSearch = () => {
    if (location.trim() && !isMapLoading) {
      onSearch(location.trim());
    } else if (!location.trim()) {
      alert('Masukkan lokasi!');
    }
  };

  return (
    <>
      {/* DESKTOP VERSION - Top Layout with Logo */}
      {!isMobile && (
        <div className={`desktop-header ${sidebarVisible ? 'sidebar-visible' : ''}`}>
          <div className="desktop-container">
            {/* Logo */}
            <div className="desktop-logo">
              <img src="/geoexplore.png" alt="Geo Explorer Logo" className="desktop-logo-img" />
              <h2>Geo Explorer</h2>
            </div>
            
            {/* Search Form */}
            <form onSubmit={handleSubmit} className="desktop-search-form">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Contoh: Jawa Barat, Tokyo, Brazil"
                className="desktop-search-input"
              />
              <button 
                type="button" 
                onClick={handleSearch}
                disabled={isMapLoading}
                className={`desktop-search-btn ${isMapLoading ? 'loading' : ''}`}
              >
                {isMapLoading ? (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  <span className="material-icons-outlined search-icon">
                    search
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MOBILE VERSION - Logo Top, Search Bottom */}
      {isMobile && (
        <>
          {/* Logo Container - Top */}
          <div className="mobile-logo-header">
            <div className="mobile-logo-container">
              <img src="/geoexplore.png" alt="Geo Explorer Logo" className="mobile-logo-img" />
              <h2>Geo Explorer</h2>
            </div>
          </div>
          
          {/* Search Container - Bottom Floating */}
          <div className="mobile-search-header">          <div className="mobile-search-container">
            <form onSubmit={handleSubmit} className="mobile-search-form">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Contoh: Jawa Barat, Tokyo, Brazil"
                className="mobile-search-input"
              />
              <button 
                type="button" 
                onClick={handleSearch}
                disabled={isMapLoading}
                className={`mobile-search-btn ${isMapLoading ? 'loading' : ''}`}
              >
                {isMapLoading ? (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  <span className="material-icons-outlined search-icon">
                    search
                  </span>
                )}
              </button>
            </form>
            
            {/* AI Button Mobile */}
            <button 
              className="mobile-ai-btn"
              onClick={onToggleSidebar}
            >
              <span className="material-icons ai-star-icon">
                auto_awesome
              </span>
            </button>
          </div>
          </div>
        </>
      )}
    </>
  );
};

export default FloatingSearch;
