# API Documentation

## External APIs Used

### 1. Nominatim Geocoding API

**Base URL**: `https://nominatim.openstreetmap.org/`

**Endpoint**: `/search`

**Method**: `GET`

**Parameters**:
- `q` (string): Search query (location name)
- `format` (string): Response format (json)
- `polygon_geojson` (number): Include polygon data (1)

**Headers**:
- `User-Agent`: Required by Nominatim

**Example Request**:
```javascript
fetch('https://nominatim.openstreetmap.org/search?q=Jakarta&format=json&polygon_geojson=1', {
  headers: {
    'User-Agent': 'GeoExplorer/1.0 (https://example.com)'
  }
})
```

**Response Format**:
```json
[
  {
    "place_id": 123456,
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://www.openstreetmap.org/copyright",
    "osm_type": "relation",
    "osm_id": 123456,
    "boundingbox": ["-6.3", "-6.1", "106.7", "106.9"],
    "lat": "-6.2",
    "lon": "106.8",
    "display_name": "Jakarta, Indonesia",
    "class": "place",
    "type": "city",
    "importance": 0.8,
    "geojson": {
      "type": "MultiPolygon",
      "coordinates": [...]
    }
  }
]
```

### 2. Google Gemini API

**Base URL**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`

**Method**: `POST`

**Authentication**: API Key (Query Parameter)

**Headers**:
- `Content-Type`: `application/json`

**Request Body**:
```json
{
  "contents": [
    {
      "parts": [
        {
          "text": "Your prompt here"
        }
      ]
    }
  ],
  "generationConfig": {
    "response_mime_type": "application/json"
  }
}
```

**Response Format**:
```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "Generated response text"
          }
        ]
      }
    }
  ]
}
```

## Internal API Structure

### useGeoExplorer Hook

**Purpose**: Centralized state management and API integration

**State Variables**:
- `isLoading`: Boolean for loading state
- `mapCenter`: Array [lat, lon] for map center
- `mapZoom`: Number for map zoom level
- `geoJsonData`: GeoJSON data for location polygon
- `sidebarData`: Array of topic data
- `error`: Error message string

**Functions**:

#### `searchLocation(location)`
- **Parameters**: `location` (string) - Location name to search
- **Returns**: Promise
- **Side Effects**: Updates map center, zoom, and geoJsonData

#### `fetchTopicData(location)`
- **Parameters**: `location` (string) - Location name
- **Returns**: Promise
- **Side Effects**: Updates sidebarData with AI insights

#### `queryGemini(prompt, isJson)`
- **Parameters**: 
  - `prompt` (string) - AI prompt
  - `isJson` (boolean) - Whether to request JSON response
- **Returns**: Promise<string>

## Data Structures

### Location Data
```javascript
{
  lat: Number,
  lon: Number,
  geojson: {
    type: "MultiPolygon" | "Polygon",
    coordinates: Array
  }
}
```

### Topic Data
```javascript
{
  key: String,        // Topic emoji + name
  response: String,   // Raw AI response
  parsedData: {       // Parsed JSON data
    summary: String,
    statistics?: Array<{label: String, value: String}>,
    timeline?: Array<{year: String, event: String}>,
    details?: Array<{label: String, value: String}>,
    key_issues?: Array<String>,
    innovations?: Array<String>,
    security_points?: Array<String>,
    main_commodities?: Array<String>
  }
}
```

## Error Handling

### Geocoding Errors
- Location not found
- Network timeout
- API rate limiting
- Invalid response format

### AI API Errors
- API key invalid
- Request quota exceeded
- Response parsing errors
- Network connectivity issues

## Rate Limiting

### Nominatim API
- **Limit**: 1 request per second
- **Policy**: Fair use policy
- **Mitigation**: Debouncing, caching

### Google Gemini API
- **Limit**: Depends on API key tier
- **Policy**: Quota-based
- **Mitigation**: Request batching, error handling

## Best Practices

### 1. Error Handling
```javascript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
} catch (error) {
  console.error('API Error:', error);
  // Show user-friendly error message
}
```

### 2. Loading States
```javascript
setIsLoading(true);
try {
  const data = await apiCall();
  setData(data);
} finally {
  setIsLoading(false);
}
```

### 3. Data Validation
```javascript
// Validate API response
if (!data || !Array.isArray(data) || data.length === 0) {
  throw new Error('Invalid API response');
}
```

### 4. User Experience
- Show loading indicators
- Provide clear error messages
- Implement retry mechanisms
- Cache frequently requested data

## Security Considerations

### 1. API Key Protection
- Store API keys in environment variables
- Don't commit API keys to version control
- Use server-side proxy for sensitive operations

### 2. Input Validation
- Sanitize user input
- Validate location names
- Prevent XSS attacks

### 3. Rate Limiting
- Implement client-side rate limiting
- Use debouncing for search inputs
- Cache API responses when possible

## Performance Optimization

### 1. Request Optimization
- Batch multiple requests when possible
- Use appropriate timeout values
- Implement request cancellation

### 2. Data Management
- Cache API responses
- Implement data pagination
- Use efficient data structures

### 3. Error Recovery
- Implement retry logic with exponential backoff
- Provide fallback data when possible
- Graceful degradation for API failures
