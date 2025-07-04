import { useState, useEffect, useRef } from 'react';
import LoadingSpinner from './LoadingSpinner';
import './Sidebar.css';

const Sidebar = ({ isVisible, mobileSidebarPeek, data, onToggle, isLoading }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const sidebarRef = useRef(null);

  // Check if mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleExpand = () => {
    if (isMobile) {
      setIsMobileExpanded(!isMobileExpanded);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const handleMobileClose = () => {
    if (isMobile) {
      setIsMobileExpanded(false);
      onToggle(); // This will close the sidebar completely
    }
  };

  const handleMobileTap = () => {
    if (isMobile && mobileSidebarPeek) {
      // If in peek mode, expand to full screen
      setIsMobileExpanded(true);
      onToggle(); // This will set mobileSidebarPeek to false
    }
  };

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (isMobile && isMobileExpanded) {
          handleMobileClose();
        } else if (!isMobile && isExpanded) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isExpanded, isMobileExpanded, isMobile]);

  // Prevent body scroll when fullscreen
  useEffect(() => {
    const shouldPreventScroll = (!isMobile && isExpanded) || (isMobile && isMobileExpanded);
    if (shouldPreventScroll) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded, isMobileExpanded, isMobile]);

  const renderStructuredResponse = (data) => {
    if (!data) return <p>⚠️ Data tidak tersedia.</p>;

    return (
      <div>
        {data.summary && (
          <p className="summary">{data.summary}</p>
        )}

        {data.statistics && data.statistics.length > 0 && (
          <div className="stats-grid">
            {data.statistics.map((stat, index) => (
              <div key={index} className="stat-card">
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">{stat.value}</span>
              </div>
            ))}
          </div>
        )}

        {data.timeline && data.timeline.length > 0 && (
          <ul className="timeline">
            {data.timeline.map((item, index) => (
              <li key={index}>
                <span className="year">{item.year}</span>
                <p>{item.event}</p>
              </li>
            ))}
          </ul>
        )}

        {['details', 'key_issues', 'innovations', 'security_points', 'main_commodities'].map(key => {
          if (data[key] && data[key].length > 0) {
            return (
              <ul key={key} className="info-list">
                {data[key].map((item, index) => (
                  <li key={index}>
                    {typeof item === 'object' ? (
                      <span><strong>{item.label}:</strong> {item.value}</span>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
            );
          }
          return null;
        })}
      </div>
    );
  };

  const formatResponse = (text) => {
    if (!text) return "⚠️ Data tidak tersedia.";

    const html = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/^\s*\*\s+(.*)/gm, "<li>$1</li>")
      .replace(/\n\n+/g, "</p><p>")
      .replace(/\n/g, "<br>");

    return `<p>${html}</p>`
      .replace(/<p><li>/g, "<ul><li>")
      .replace(/<\/li><\/p>/g, "</li></ul>");
  };

  const currentExpandedState = isMobile ? isMobileExpanded : isExpanded;
  const shouldShowOverlay = (!isMobile && isExpanded); // Remove overlay for mobile
  
  // Mobile sidebar classes
  const getMobileSidebarClasses = () => {
    if (!isMobile) return '';
    
    let classes = 'mobile';
    if (mobileSidebarPeek && !isMobileExpanded) {
      classes += ' mobile-peek';
    }
    if (isMobileExpanded) {
      classes += ' mobile-expanded';
    }
    return classes;
  };

  // Reset mobile expanded state when peek mode changes
  useEffect(() => {
    if (mobileSidebarPeek && isMobileExpanded) {
      setIsMobileExpanded(false);
    }
  }, [mobileSidebarPeek]);

  return (
    <>
      {/* Fullscreen overlay */}
      {shouldShowOverlay && (
        <div 
          className="sidebar-overlay"
          onClick={isMobile ? handleMobileClose : handleExpand}
        />
      )}
      
      <div 
        ref={sidebarRef}
        className={`sidebar ${isVisible ? 'show' : ''} ${currentExpandedState ? (isMobile ? 'mobile-expanded' : 'fullscreen') : ''} ${getMobileSidebarClasses()}`}
        onClick={handleMobileTap}
      >
        <div className="sidebar-header">
          <div className="sidebar-header-left">
            {!isMobile && (
              <button 
                className="expand-btn"
                onClick={handleExpand}
                title={isExpanded ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isExpanded ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 0 2-2h3M3 16h3a2 2 0 0 0 2 2v3"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2m0 10v2a2 2 0 0 1-2 2h-2M7 19H5a2 2 0 0 1-2-2v-2"/>
                  </svg>
                )}
              </button>
            )}
            <h2>AI Insights</h2>
            {isMobile && mobileSidebarPeek && !isMobileExpanded && (
              <div className="mobile-tap-hint">
                <span>Tap untuk buka penuh</span>
              </div>
            )}
          </div>
          <div className="sidebar-controls">
            {/* Mobile close button when expanded */}
            {isMobile && isMobileExpanded ? (
              <button 
                className="mobile-close-btn"
                onClick={handleMobileClose}
                title="Tutup"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            ) : (
              <button 
                className="close-btn"
                onClick={onToggle}
                title="Close"
              >
                ×
              </button>
            )}
          </div>
        </div>
        
        {isLoading ? (
          <LoadingSpinner message="🔄 Memuat wawasan geografis..." />
        ) : data && data.length > 0 ? (
          <>
            <div className="tabs">
              {data.map((topic, index) => (
                <div
                  key={index}
                  className={`tab ${activeTab === index ? 'active' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  {topic.key}
                </div>
              ))}
            </div>
            <div className="tab-contents">
              {data.map((topic, index) => (
                <div
                  key={index}
                  className={`tab-content ${activeTab === index ? 'active' : ''}`}
                >
                  <div className="content-box">
                    <h3>{topic.key}</h3>
                    {topic.parsedData ? 
                      renderStructuredResponse(topic.parsedData) : 
                      <div dangerouslySetInnerHTML={{ __html: formatResponse(topic.response) }} />
                    }
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-data">
            <p>Cari lokasi dulu!</p>
          </div>
        )}
      </div>
      
      {/* Desktop AI Insights Button Only */}
      {!isMobile && (
        <button 
          className="ai-insights-btn"
          onClick={onToggle}
        >
          {isVisible ? '×' : 'AI Insights ✨'}
        </button>
      )}
    </>
  );
};

export default Sidebar;
