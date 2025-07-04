# Testing & Quality Assurance

## Manual Testing Checklist

### 🔍 Search Functionality
- [ ] Search with valid location names (e.g., "Jakarta", "Tokyo", "New York")
- [ ] Search with invalid/non-existent locations
- [ ] Search with empty input
- [ ] Search with special characters
- [ ] Search with very long strings
- [ ] Search with different languages

### 🗺️ Map Interaction
- [ ] Map loads correctly on page load
- [ ] Map centers on searched location
- [ ] Map zoom adjusts appropriately
- [ ] Polygon overlay displays when available
- [ ] Map tiles load properly
- [ ] Map controls (zoom, pan) work correctly

### 📱 Responsive Design
- [ ] Layout adapts to mobile screens (< 768px)
- [ ] Touch interactions work on mobile
- [ ] Sidebar behavior on mobile
- [ ] Search input remains usable on small screens
- [ ] Map maintains functionality on mobile

### 🤖 AI Insights
- [ ] All 8 topic tabs load data
- [ ] Data formats correctly (JSON parsing)
- [ ] Fallback to raw text when JSON fails
- [ ] Loading states show during API calls
- [ ] Error handling for failed API calls

### 🎨 UI/UX
- [ ] Loading animations display correctly
- [ ] Sidebar toggle works smoothly
- [ ] Tab switching is responsive
- [ ] Hover effects work as expected
- [ ] Focus states are visible for accessibility

## Browser Testing

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari Mobile
- [ ] Firefox Mobile
- [ ] Samsung Internet

## Performance Testing

### Load Time Metrics
- [ ] Initial page load < 3 seconds
- [ ] Search response < 5 seconds
- [ ] AI insights load < 10 seconds
- [ ] Map tiles load < 2 seconds

### Lighthouse Scores
- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90

## Error Scenarios

### Network Issues
- [ ] Offline behavior
- [ ] Slow network connections
- [ ] API timeouts
- [ ] Rate limiting responses

### API Failures
- [ ] Geocoding API unavailable
- [ ] AI API quota exceeded
- [ ] Invalid API responses
- [ ] Malformed JSON responses

### Edge Cases
- [ ] Locations with no polygon data
- [ ] Locations with very large polygons
- [ ] Concurrent search requests
- [ ] Rapid succession of searches

## Accessibility Testing

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Enter/Space keys work for buttons

### Screen Reader Support
- [ ] All images have appropriate alt text
- [ ] Buttons have descriptive labels
- [ ] Form inputs have proper labels
- [ ] ARIA attributes are used correctly

### Color Contrast
- [ ] Text meets WCAG AA standards
- [ ] Interactive elements have sufficient contrast
- [ ] Focus indicators are visible
- [ ] Color is not the only means of conveying information

## Security Testing

### Input Validation
- [ ] Search input sanitization
- [ ] XSS prevention
- [ ] SQL injection prevention (if applicable)
- [ ] CSRF protection

### API Security
- [ ] API keys not exposed in client code
- [ ] Secure HTTP headers
- [ ] Rate limiting in place
- [ ] Error messages don't leak sensitive info

## Automated Testing Setup

### Unit Tests (Jest + React Testing Library)
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

**Example Test File**: `src/components/__tests__/FloatingSearch.test.jsx`
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import FloatingSearch from '../FloatingSearch';

describe('FloatingSearch', () => {
  test('renders search input and button', () => {
    render(<FloatingSearch onSearch={() => {}} />);
    expect(screen.getByPlaceholderText(/contoh:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cari/i })).toBeInTheDocument();
  });

  test('calls onSearch when button is clicked', () => {
    const mockOnSearch = jest.fn();
    render(<FloatingSearch onSearch={mockOnSearch} />);
    
    fireEvent.change(screen.getByPlaceholderText(/contoh:/i), {
      target: { value: 'Jakarta' }
    });
    fireEvent.click(screen.getByRole('button', { name: /cari/i }));
    
    expect(mockOnSearch).toHaveBeenCalledWith('Jakarta');
  });
});
```

### E2E Tests (Playwright)
```bash
npm install --save-dev @playwright/test
```

**Example E2E Test**: `e2e/search.spec.js`
```javascript
import { test, expect } from '@playwright/test';

test('search for location and view insights', async ({ page }) => {
  await page.goto('/');
  
  // Search for location
  await page.fill('input[placeholder*="Contoh"]', 'Jakarta');
  await page.click('button:has-text("Cari")');
  
  // Wait for map to update
  await page.waitForTimeout(2000);
  
  // Check if AI insights button appears
  await expect(page.locator('text=AI Insights')).toBeVisible();
  
  // Click to open sidebar
  await page.click('text=AI Insights');
  
  // Check if tabs are loaded
  await expect(page.locator('.tab')).toHaveCount(8);
});
```

## Continuous Integration

### GitHub Actions Workflow
```yaml
name: CI/CD
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
      - run: npm run e2e
```

## Quality Metrics

### Code Quality
- [ ] ESLint passes with no errors
- [ ] Prettier formatting consistent
- [ ] No console.log in production
- [ ] Proper error handling throughout

### Bundle Analysis
- [ ] Bundle size < 500KB
- [ ] No duplicate dependencies
- [ ] Tree shaking effective
- [ ] Code splitting implemented

### Performance Metrics
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Input Delay < 100ms

## Deployment Verification

### Pre-deployment Checklist
- [ ] All tests pass
- [ ] Build succeeds without warnings
- [ ] Environment variables configured
- [ ] SSL certificate valid
- [ ] CDN configured correctly

### Post-deployment Verification
- [ ] Application loads correctly
- [ ] All features work as expected
- [ ] Performance metrics maintained
- [ ] Error monitoring active
- [ ] Analytics tracking working

## Bug Reporting Template

```markdown
## Bug Report

### Description
Brief description of the issue

### Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

### Expected Behavior
What you expected to happen

### Actual Behavior
What actually happened

### Screenshots
If applicable, add screenshots

### Environment
- Browser: [e.g. Chrome 91]
- OS: [e.g. macOS 11.4]
- Device: [e.g. iPhone 12]
- Screen Size: [e.g. 1920x1080]

### Additional Context
Any other context about the problem
```

## Performance Optimization Checklist

### Frontend Optimization
- [ ] Images optimized (WebP format)
- [ ] Lazy loading implemented
- [ ] Code splitting by routes
- [ ] Bundle size optimized
- [ ] Caching strategies implemented

### API Optimization
- [ ] Request batching where possible
- [ ] Response caching
- [ ] Error retry mechanisms
- [ ] Request timeout handling
- [ ] Rate limiting compliance

### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] User analytics
- [ ] API usage tracking
- [ ] Uptime monitoring
