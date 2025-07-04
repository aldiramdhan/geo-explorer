# UX Testing Guide - Loading States & Expandable Sidebar

## Fitur Baru untuk Testing

### 1. Separated Loading States
- [ ] **Map Loading**: Button "Cari" menampilkan spinner animation
- [ ] **AI Loading**: Sidebar menampilkan loading spinner terpisah
- [ ] **Parallel Processing**: Map bergerak sebelum AI insights selesai

### 2. Auto-Show Sidebar After Map Load
- [ ] **Initial State**: Sidebar hidden pada tampilan awal (Indonesia)
- [ ] **Search Jakarta**: Map pindah dulu, sidebar muncul setelah map loaded
- [ ] **Background AI**: AI insights loading di background setelah sidebar muncul
- [ ] **No Blocking**: User dapat berinteraksi dengan map saat AI loading

### 3. Search Button Animation
- [ ] **Loading Spinner**: Button menampilkan circular spinner
- [ ] **Disabled State**: Button tidak bisa diklik saat loading
- [ ] **Visual Feedback**: Warna button berubah saat loading

### 4. Expandable Sidebar
- [ ] **Expand Button**: Button ⏫ untuk expand sidebar
- [ ] **Full Width**: Sidebar expanded hingga 80vw
- [ ] **Collapse Button**: Button ⏬ untuk collapse kembali
- [ ] **Sticky Header**: Header tetap terlihat saat scroll
- [ ] **Normal Position**: Sidebar tetap di posisi normal saat tidak expanded

## Test Procedure

### Test Auto-Show Sidebar:
1. **Buka aplikasi** - Verify sidebar tersembunyi
2. **Search "Jakarta"**
3. **Observe sequence**:
   - Button "Cari" shows spinner immediately
   - Map moves to Jakarta quickly
   - Sidebar muncul SETELAH map berhasil pindah
   - Sidebar shows "Memuat wawasan geografis..." 
   - AI content loads in background

### Test Loading States:
1. **Buka Developer Tools (F12)**
2. **Go to Network tab**
3. **Search any location**
4. **Verify timing**:
   - Map loading completes first
   - Sidebar appears after map loads
   - AI insights load separately in background

### Test Button Animation:
1. **Search any location**
2. **Observe button behavior**:
   - Spinner animation appears
   - Button becomes disabled
   - Color changes to gray
   - Cannot click during loading

### Test Expandable Sidebar:
1. **Search location** (e.g., "Indonesia")
2. **Wait for AI insights to load**
3. **Click expand button (⏫)**
4. **Verify**:
   - Sidebar expands to ~80% screen width
   - Content becomes more readable
   - Header stays at top
   - Can scroll content
5. **Click collapse button (⏬)**
6. **Verify**:
   - Sidebar returns to normal width
   - Position remains same

### Test Flow Sequence:
1. **Open app** → Clean map view (no marker, no sidebar, just map)
2. **Search "Tokyo"** → Button loading starts
3. **Map loads** → Location appears on map (polygon if available, or just zoom to location)
4. **Sidebar appears** → Auto-show after map loads successfully
5. **AI loading** → Background process for insights
6. **Content ready** → AI insights populate sidebar

### Test Parallel Processing:
1. **Open Network tab in DevTools**
2. **Search any location**
3. **Monitor sequence**:
   - Nominatim API call first
   - Map moves immediately after response
   - Sidebar shows up after map loads
   - Gemini API calls happen in background
   - User sees location before AI insights complete

### Test Clean Initial State:
1. **Open aplikasi**
2. **Verify initial view**:
   - Map centered on Indonesia
   - No marker visible (completely removed)
   - No sidebar visible
   - Only search box and logo visible
3. **Clean interface** - minimal distractions

### Test Polygon-Only Behavior:
1. **Search location with polygon** (e.g., "Jakarta")
   - Should show polygon area only
2. **Search location without polygon** (e.g., "Monas")
   - Should zoom to location without any marker
3. **All searches**
   - Should never show markers
   - Focus only on map zoom and polygon areas

## Expected Behavior

### ✅ Success Criteria:
- **Clean Initial State**: No marker, no sidebar pada tampilan awal
- **Map First**: Map location appears within 1-2 seconds
- **Auto-Show Sidebar**: Sidebar muncul setelah map berhasil load
- **Button Loading**: Clear visual feedback during search
- **Separate Loading**: Map and AI insights load independently
- **No Markers**: Aplikasi tidak menampilkan marker sama sekali
- **Polygon Focus**: Hanya polygon yang ditampilkan untuk area boundaries
- **Clean Zoom**: Lokasi tanpa polygon hanya zoom ke area tersebut
- **Expandable Content**: Can read AI insights in full width
- **Smooth Transitions**: All animations are smooth
- **No Blocking**: UI remains responsive during loading

### ⚠️ Potential Issues:
- Network delay might affect timing
- Mobile responsive behavior
- Expand/collapse animation smoothness
- Loading state synchronization

## Performance Metrics

### Target Performance:
- **Map Movement**: < 2 seconds after click
- **Button Response**: Immediate visual feedback
- **AI Insights**: 5-15 seconds (background)
- **Expand Animation**: < 300ms
- **Collapse Animation**: < 300ms

### Success Indicators:
- Users see map location quickly
- Clear loading states at all times
- Can read content comfortably when expanded
- No UI blocking or freezing
- Smooth user experience throughout

## Mobile Testing

### Additional Mobile Tests:
- [ ] **Touch Interactions**: Expand/collapse works on touch
- [ ] **Screen Space**: Expanded sidebar fits mobile screens
- [ ] **Scroll Behavior**: Content scrolls properly in expanded mode
- [ ] **Button Size**: Loading button remains touch-friendly
