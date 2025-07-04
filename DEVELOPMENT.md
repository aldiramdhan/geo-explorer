# Development Tips untuk Geo Explorer

## Struktur Komponen

### 1. Map Component
- Menggunakan React-Leaflet untuk integrasi yang mudah
- Komponen terpusat untuk semua operasi peta
- Props untuk center, zoom, dan geoJsonData

### 2. FloatingSearch Component
- Desain yang responsive dan modern
- Form handling yang proper
- Callback untuk parent component

### 3. Sidebar Component
- Sistem tab yang fleksibel
- Rendering data yang terstruktur
- Animasi yang smooth

## Custom Hooks

### useGeoExplorer
- Centralized state management
- API calls untuk geocoding dan AI
- Error handling yang comprehensive

## Optimasi Performance

### 1. Code Splitting
```javascript
// Lazy loading komponen
const LazyComponent = React.lazy(() => import('./Component'));
```

### 2. Memoization
```javascript
// Memo untuk komponen yang tidak sering berubah
const MemoizedComponent = React.memo(Component);

// useMemo untuk perhitungan yang expensive
const expensiveValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
```

### 3. useCallback
```javascript
// Untuk mencegah re-render yang tidak perlu
const handleClick = useCallback(() => {
  // handle click
}, [dependency]);
```

## Debugging

### 1. React Developer Tools
- Install extension untuk Chrome/Firefox
- Monitor state dan props changes

### 2. Console Debugging
```javascript
// Debug API calls
console.log('API Response:', response);

// Debug state changes
console.log('State updated:', state);
```

### 3. Network Tab
- Monitor API calls
- Check for failed requests
- Analyze loading times

## Testing

### 1. Unit Testing (Jest + React Testing Library)
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

### 2. E2E Testing (Playwright)
```bash
npm install --save-dev @playwright/test
```

### 3. Visual Testing
```bash
npm install --save-dev @storybook/react
```

## Error Handling

### 1. Error Boundaries
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

### 2. Try-Catch untuk Async Operations
```javascript
const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
```

## Best Practices

### 1. Component Organization
```
components/
├── common/          # Reusable components
├── layouts/         # Layout components
├── features/        # Feature-specific components
└── ui/             # UI components
```

### 2. Naming Conventions
- PascalCase untuk komponen
- camelCase untuk functions dan variables
- UPPER_CASE untuk constants

### 3. Props Validation
```javascript
import PropTypes from 'prop-types';

Component.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
  onSave: PropTypes.func.isRequired,
};
```

## Performance Monitoring

### 1. React Profiler
```javascript
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log({ id, phase, actualDuration });
}

<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>
```

### 2. Web Vitals
```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Deployment Checklist

- [ ] Build passes without errors
- [ ] All environment variables set
- [ ] Performance optimized (Lighthouse score > 90)
- [ ] Accessibility compliant
- [ ] Mobile responsive
- [ ] Error handling implemented
- [ ] Loading states implemented
- [ ] API rate limiting considered
