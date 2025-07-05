import { useState, useCallback } from 'react';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyAhuLVzwvQTsfNxM7mEh7mBC79bpiQ_Y9k";

const useGeoExplorer = () => {
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([-2.5489, 118.0149]);
  const [mapZoom, setMapZoom] = useState(5);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [sidebarData, setSidebarData] = useState([]);
  const [error, setError] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);

  const searchLocation = useCallback(async (location) => {
    setIsMapLoading(true);
    setError(null);
    // Reset state untuk pencarian baru
    setGeoJsonData(null);
    setSidebarData([]);
    setLocationInfo(null);
    
    try {
      // Start AI loading immediately (parallel process)
      setIsAILoading(true);
      // Don't await this - let it run in background
      fetchTopicData(location);
      
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${location}&format=json&polygon_geojson=1`,
        {
          headers: {
            'User-Agent': 'GeoExplorer/1.0 (https://example.com)'
          }
        }
      );

      if (!geoRes.ok) {
        throw new Error(`HTTP error! status: ${geoRes.status}`);
      }

      const geoData = await geoRes.json();
      if (!geoData.length) {
        throw new Error("Lokasi tidak ditemukan!");
      }

      const { lat, lon, geojson, display_name, type, class: locationClass } = geoData[0];
      const newCenter = [parseFloat(lat), parseFloat(lon)];
      
      // Simplified zoom calculation like the original vanilla JS
      // Default zoom 10, then let fitBounds handle the rest
      let idealZoom = 10;
      
      // Only adjust for very specific cases
      if (type && locationClass) {
        if (locationClass === 'place') {
          switch (type) {
            case 'country':
              idealZoom = 5;
              break;
            case 'state':
            case 'province':
              idealZoom = 7;
              break;
            case 'city':
              idealZoom = 10;
              break;
            case 'town':
              idealZoom = 12;
              break;
            case 'village':
            case 'hamlet':
              idealZoom = 13;
              break;
            case 'neighbourhood':
            case 'suburb':
              idealZoom = 14;
              break;
            default:
              idealZoom = 10;
              break;
          }
        }
        else if (locationClass === 'boundary' && type === 'administrative') {
          const adminLevel = geoData[0].admin_level;
          if (adminLevel) {
            switch (adminLevel) {
              case '2': // Country level
                idealZoom = 5;
                break;
              case '4': // State/Province level  
                idealZoom = 7;
                break;
              case '6': // County/Region level
                idealZoom = 9;
                break;
              case '8': // City level
                idealZoom = 11;
                break;
              default:
                idealZoom = 10;
                break;
            }
          }
        }
        else if (locationClass === 'building' || locationClass === 'amenity') {
          idealZoom = 16;
        }
      }
      
      // For point locations without polygon, use slightly higher zoom
      if (!geojson) {
        idealZoom = Math.max(idealZoom, 12);
      }
      
      // Store location info for debugging and display
      setLocationInfo({
        name: display_name,
        type: type,
        class: locationClass,
        calculatedZoom: idealZoom,
        hasPolygon: !!geojson
      });
      
      // Simplified debug log
      console.log('🎯 Simple Zoom:', {
        location: display_name,
        type: type,
        class: locationClass,
        zoom: idealZoom,
        hasPolygon: !!geojson
      });
      
      setMapCenter(newCenter);
      setMapZoom(idealZoom);
      setGeoJsonData(geojson);
      
      // Map loading complete - user can see location immediately
      setIsMapLoading(false);
      
    } catch (error) {
      console.error("Search error:", error);
      setError(error.message || "Gagal mengambil data lokasi");
      setIsMapLoading(false);
      setIsAILoading(false);
      alert("Gagal mengambil data lokasi. Server mungkin sedang sibuk atau terjadi masalah jaringan. Silakan tunggu sejenak dan coba lagi.");
    }
  }, []);

  const fetchTopicData = async (location) => {
    const topics = [
      {
        key: "📜 Sejarah",
        prompt: `Berikan data sejarah untuk ${location} dalam format JSON. Pastikan semua respons dalam Bahasa Indonesia. JSON harus berisi "summary" (string) dan "timeline" (array objek dengan "year" dan "event").`,
      },
      {
        key: "🌍 Geografi",
        prompt: `Berikan data geografis untuk ${location} dalam format JSON. Pastikan semua respons dalam Bahasa Indonesia. JSON harus berisi "summary" (string) dan "statistics" (array objek dengan "label" dan "value").`,
      },
      {
        key: "🏛️ Politik & Pemerintahan",
        prompt: `Berikan data politik dan pemerintahan untuk ${location} dalam format JSON. Pastikan semua respons dalam Bahasa Indonesia. JSON harus berisi "summary" (string) dan "details" (array objek dengan "label" dan "value").`,
      },
      {
        key: "🌱 Lingkungan",
        prompt: `Berikan data lingkungan untuk ${location} dalam format JSON. Pastikan semua respons dalam Bahasa Indonesia. JSON harus berisi "summary" (string) dan "key_issues" (array string).`,
      },
      {
        key: "🧪 Sains & Teknologi",
        prompt: `Berikan data sains dan teknologi untuk ${location} dalam format JSON. Pastikan semua respons dalam Bahasa Indonesia. JSON harus berisi "summary" (string) dan "innovations" (array string).`,
      },
      {
        key: "🛡️ Keamanan",
        prompt: `Berikan data keamanan untuk ${location} dalam format JSON. Pastikan semua respons dalam Bahasa Indonesia. JSON harus berisi "summary" (string) dan "security_points" (array string).`,
      },
      {
        key: "🌾 Pertanian",
        prompt: `Berikan data pertanian untuk ${location} dalam format JSON. Pastikan semua respons dalam Bahasa Indonesia. JSON harus berisi "summary" (string) dan "main_commodities" (array string).`,
      },
      {
        key: "💼 Ekonomi",
        prompt: `Berikan data ekonomi untuk ${location} dalam format JSON. Pastikan semua respons dalam Bahasa Indonesia. JSON harus berisi "summary" (string) dan "statistics" (array objek dengan "label" dan "value" untuk PDB, populasi, dll).`,
      },
    ];

    try {
      const responses = await Promise.all(
        topics.map((topic) => queryGemini(topic.prompt, true))
      );

      const processedData = topics.map((topic, index) => {
        let parsedData = null;
        try {
          const cleanedResponse = responses[index].replace(/```json|```/g, '').trim();
          parsedData = JSON.parse(cleanedResponse);
        } catch (e) {
          console.error("JSON parsing error:", e, responses[index]);
        }

        return {
          key: topic.key,
          response: responses[index],
          parsedData: parsedData
        };
      });

      setSidebarData(processedData);
      setIsAILoading(false);
    } catch (error) {
      console.error("Error fetching topic data:", error);
      setError("Gagal mengambil data topik");
      setIsAILoading(false);
    }
  };

  const queryGemini = async (prompt, isJson = false) => {
    try {
      const body = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      };

      if (isJson) {
        body.generationConfig = {
          response_mime_type: "application/json",
        };
      }

      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
          API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();
      return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        (isJson ? '{ "summary": "Tidak ada respons.", "statistics": [] }' : "⚠️ Tidak ada respons.")
      );
    } catch (error) {
      console.error("Kesalahan saat mengakses Gemini:", error);
      return (isJson ? '{ "summary": "Terjadi kesalahan API.", "statistics": [] }' : "⚠️ Terjadi kesalahan API.");
    }
  };

  return {
    isMapLoading,
    isAILoading,
    mapCenter,
    mapZoom,
    geoJsonData,
    sidebarData,
    error,
    locationInfo,
    searchLocation,
  };
};

export default useGeoExplorer;
