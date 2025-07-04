import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Map = ({ center, zoom, geoJsonData, onMapReady }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [geoJsonKey, setGeoJsonKey] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    if (map && onMapReady) {
      onMapReady(map);
    }
  }, [map, onMapReady]);

  useEffect(() => {
    if (map && center) {
      console.log('🗺️ Map setView to:', { center, zoom });
      // Use flyTo for smooth transition between locations
      map.flyTo(center, zoom || 10, {
        duration: 1.0,
        easeLinearity: 0.25
      });
    }
  }, [map, center, zoom]);

  useEffect(() => {
    if (map && geoJsonData) {
      console.log('📊 Processing GeoJSON - will use fitBounds');
      // Force re-render of GeoJSON component
      setGeoJsonKey(prev => prev + 1);
      
      // Like vanilla JS: always use fitBounds for polygon areas
      setTimeout(() => {
        const geoJsonLayer = L.geoJSON(geoJsonData);
        const bounds = geoJsonLayer.getBounds();
        if (bounds.isValid()) {
          console.log('📍 Using fitBounds like vanilla JS');
          map.fitBounds(bounds, { 
            padding: [20, 20] // Keep some padding
          });
        }
      }, 150); // Small delay to let flyTo start first
    }
  }, [map, geoJsonData]);

  const geoJsonStyle = {
    color: "#1d4ed8",
    weight: 2,
    fillOpacity: 0.15,
    fillColor: "#3b82f6",
    opacity: 0.8
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 3,
          color: '#0f172a',
          fillOpacity: 0.25
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle(geoJsonStyle);
      }
      // Removed click handler to avoid additional zoom conflicts
    });
  };

  const handleMapCreated = (mapInstance) => {
    setMap(mapInstance);
    
    // Add event listeners for smooth UX
    mapInstance.on('movestart', () => setIsMoving(true));
    mapInstance.on('moveend', () => setIsMoving(false));
    mapInstance.on('zoomstart', () => setIsMoving(true));
    mapInstance.on('zoomend', () => setIsMoving(false));
  };

  return (
    <MapContainer
      ref={mapRef}
      center={center || [-2.5489, 118.0149]}
      zoom={zoom || 5}
      style={{ height: '100%', width: '100%' }}
      whenReady={(e) => handleMapCreated(e.target)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoJsonData && (
        <GeoJSON
          key={geoJsonKey}
          data={geoJsonData}
          style={geoJsonStyle}
          onEachFeature={onEachFeature}
        />
      )}
    </MapContainer>
  );
};

export default Map;
