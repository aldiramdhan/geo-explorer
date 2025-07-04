import { useState, useEffect } from 'react';
import Map from './components/Map';
import FloatingSearch from './components/FloatingSearch';
import Sidebar from './components/Sidebar';
import useGeoExplorer from './hooks/useGeoExplorer';
import './App.css';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [mobileSidebarPeek, setMobileSidebarPeek] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [map, setMap] = useState(null);
  
  const {
    isMapLoading,
    isAILoading,
    mapCenter,
    mapZoom,
    geoJsonData,
    sidebarData,
    error,
    searchLocation,
  } = useGeoExplorer();

  const handleSearch = async (location) => {
    setCurrentLocation(location);
    await searchLocation(location);
  };

  // Auto-show sidebar when map loading completes (location loaded successfully)
  useEffect(() => {
    if (!isMapLoading && mapCenter && currentLocation) {
      // Check if mobile
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        // On mobile, show peek first, then full sidebar
        setMobileSidebarPeek(true);
        setSidebarVisible(true);
      } else {
        // On desktop, show sidebar normally
        setSidebarVisible(true);
      }
    }
  }, [isMapLoading, mapCenter, currentLocation]);

  // Reset mobile sidebar states when new search is performed
  useEffect(() => {
    if (isMapLoading) {
      setMobileSidebarPeek(false);
      setSidebarVisible(false);
    }
  }, [isMapLoading]);

  const handleMapReady = (mapInstance) => {
    setMap(mapInstance);
  };

  const handleSidebarToggle = () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // On mobile, toggle between peek and full
      if (mobileSidebarPeek) {
        setMobileSidebarPeek(false);
        setSidebarVisible(true); // Keep sidebar visible for full screen
      } else {
        setSidebarVisible(!sidebarVisible);
        if (!sidebarVisible) {
          setMobileSidebarPeek(true); // Show peek when opening
        }
      }
    } else {
      // On desktop, normal toggle
      setSidebarVisible(!sidebarVisible);
    }
  };

  // Adjust map size when sidebar visibility changes
  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    }
  }, [sidebarVisible, map]);

  return (
    <div className="app">
      <div className={`main-container ${sidebarVisible ? 'sidebar-visible' : ''}`}>
        <div className="map-container">
          <Map
            center={mapCenter}
            zoom={mapZoom}
            geoJsonData={geoJsonData}
            onMapReady={handleMapReady}
          />
          <FloatingSearch 
            onSearch={handleSearch} 
            isMapLoading={isMapLoading}
            onToggleSidebar={handleSidebarToggle}
            sidebarVisible={sidebarVisible}
          />
        </div>
        
        <Sidebar
          isVisible={sidebarVisible}
          mobileSidebarPeek={mobileSidebarPeek}
          data={sidebarData}
          onToggle={handleSidebarToggle}
          isLoading={isAILoading}
        />
      </div>
    </div>
  );
}

export default App;
