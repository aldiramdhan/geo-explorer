# Zoom Test Cases - Simplified Version

## Test Cases untuk Verifikasi Zoom Behavior (Simplified)

### 1. Countries (Expected Zoom: 5)
- [ ] **Indonesia** - Zoom 5 → fitBounds polygon
- [ ] **USA** - Zoom 5 → fitBounds polygon
- [ ] **Singapore** - Zoom 5 → fitBounds polygon (small country)

### 2. States/Provinces (Expected Zoom: 7)
- [ ] **Jawa Barat** - Zoom 7 → fitBounds polygon
- [ ] **California** - Zoom 7 → fitBounds polygon
- [ ] **DKI Jakarta** - Zoom 7 → fitBounds polygon

### 3. Cities (Expected Zoom: 10)
- [ ] **Jakarta** - Zoom 10 → fitBounds polygon
- [ ] **Bandung** - Zoom 10 → fitBounds polygon
- [ ] **Surabaya** - Zoom 10 → fitBounds polygon

### 4. Towns (Expected Zoom: 12)
- [ ] **Ubud** - Zoom 12 → fitBounds polygon
- [ ] **Canggu** - Zoom 12 → fitBounds polygon

### 5. Villages (Expected Zoom: 13)
- [ ] **Desa Penglipuran** - Zoom 13 → fitBounds or marker
- [ ] **Desa Trunyan** - Zoom 13 → fitBounds or marker

### 6. Neighborhoods (Expected Zoom: 14)
- [ ] **Menteng** - Zoom 14 → fitBounds or marker
- [ ] **Kemang** - Zoom 14 → fitBounds or marker

### 7. Buildings (Expected Zoom: 16)
- [ ] **Monas** - Zoom 16 → marker
- [ ] **Borobudur** - Zoom 16 → marker

## Zoom Behavior Expected:
1. **flyTo**: Smooth transition ke lokasi dengan zoom yang ditentukan
2. **fitBounds**: Jika ada polygon, otomatis adjust untuk show polygon
3. **Marker**: Jika tidak ada polygon, tampilkan marker
4. **Console Logs**: Menampilkan zoom calculation dan fitBounds usage

## Test Procedure:
1. Buka browser developer tools (F12)
2. Go to Console tab
3. Search lokasi satu per satu
4. Verify:
   - flyTo ke lokasi dengan zoom yang benar
   - fitBounds digunakan untuk polygon
   - Console logs menampilkan proses
   - Nama kota/lokasi terlihat jelas

## Success Criteria:
- ✅ Zoom levels sesuai dengan expected values
- ✅ Polygon selalu terlihat jelas dengan fitBounds
- ✅ Smooth flyTo transition
- ✅ Console logs clear dan informatif
- ✅ Nama lokasi terlihat jelas pada peta
- ✅ Tidak ada zoom fighting atau konflik
