# Geo Explorer 🌍

Aplikasi web berbasis React untuk eksplorasi geografis dengan wawasan AI menggunakan Google Gemini API.

## Fitur Utama

- 🗺️ **Peta Interaktif**: Powered by Leaflet dan React-Leaflet dengan auto-zoom ke lokasi
- 🔍 **Pencarian Lokasi**: Pencarian lokasi global menggunakan Nominatim API
- 🤖 **AI Insights**: Wawasan AI tentang berbagai topik untuk lokasi yang dicari
- 📊 **Visualisasi Data**: Tampilan data terstruktur dengan chart dan timeline
- 📱 **Responsive Design**: Optimal untuk desktop dan mobile
- ⚡ **Loading Optimized**: Loading state hanya di sidebar untuk UX yang lebih baik
- 🔄 **Auto-Sidebar**: Sidebar muncul otomatis saat pencarian lokasi
- 🗺️ **Smart Polygon**: Polygon area yang update otomatis untuk setiap lokasi baru

## Topik yang Tersedia

- 📜 Sejarah
- 🌍 Geografi
- 🏛️ Politik & Pemerintahan
- 🌱 Lingkungan
- 🧪 Sains & Teknologi
- 🛡️ Keamanan
- 🌾 Pertanian
- 💼 Ekonomi

## Teknologi yang Digunakan

- **React 19** - Frontend framework
- **Vite** - Build tool dan development server
- **Leaflet & React-Leaflet** - Peta interaktif
- **Google Gemini API** - AI insights
- **Nominatim API** - Geocoding service
- **CSS3** - Styling dengan animasi modern

## Instalasi dan Penggunaan

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd geo-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan aplikasi**
   ```bash
   npm run dev
   ```

4. **Buka di browser**
   ```
   http://localhost:5173
   ```

## Struktur Proyek

```
src/
├── components/
│   ├── Map.jsx                 # Komponen peta dengan auto-zoom
│   ├── FloatingSearch.jsx      # Komponen pencarian
│   ├── FloatingSearch.css      # Styling untuk pencarian
│   ├── Sidebar.jsx             # Komponen sidebar dengan auto-show
│   ├── Sidebar.css             # Styling untuk sidebar
│   ├── LoadingSpinner.jsx      # Komponen loading
│   └── LoadingSpinner.css      # Styling untuk loading
├── hooks/
│   └── useGeoExplorer.js       # Hook untuk logika utama
├── App.jsx                     # Komponen utama
├── App.css                     # Styling utama
├── index.css                   # Base styles dengan CSS reset
└── main.jsx                    # Entry point
```

## Konfigurasi API

Aplikasi menggunakan Google Gemini API untuk menghasilkan wawasan AI. API key sudah dikonfigurasi dalam `src/hooks/useGeoExplorer.js`.

## Scripts

- `npm run dev` - Menjalankan development server
- `npm run build` - Build aplikasi untuk production
- `npm run preview` - Preview build production
- `npm run lint` - Menjalankan ESLint

## Fitur Unggulan

### 1. Pencarian Cerdas
- Pencarian lokasi global dengan autocomplete
- Dukungan untuk berbagai format nama lokasi
- Visualisasi polygon area jika tersedia

### 2. AI Insights
- Wawasan mendalam tentang 8 topik berbeda
- Data terstruktur dalam format JSON
- Fallback ke format teks jika JSON parsing gagal

### 3. UI/UX Modern
- Design yang clean dan modern
- Animasi yang smooth
- Responsive design untuk semua ukuran layar
- Loading states yang informatif

### 4. Performa Optimal
- Lazy loading untuk komponen
- Optimized bundle size dengan Vite
- Efficient state management dengan React hooks

## 🎯 Smart Zoom Features

### Intelligent Zoom Calculation
Geo Explorer menggunakan sistem zoom cerdas yang menganalisis:
- **Bounding Box Analysis**: Menghitung ukuran area berdasarkan koordinat polygon
- **Location Type Detection**: Mengidentifikasi jenis lokasi (country, city, town, dll.)
- **Administrative Level**: Menggunakan admin_level untuk boundaries yang tepat
- **Display Name Analysis**: Menganalisis spesifisitas nama untuk lokasi point

### Zoom Levels by Location Type
| Location Type | Zoom Level | Example |
|---------------|------------|---------|
| **Continent** | 3-4 | Antarctica, Pacific Ocean |
| **Large Country** | 4-5 | USA, Indonesia, Australia |
| **Medium Country** | 5-6 | Germany, Japan, Philippines |
| **Small Country** | 6-11 | Singapore, Belgium, South Korea |
| **State/Province** | 6-8 | California, Jawa Barat, Ontario |
| **Large City** | 9-10 | Jakarta, Tokyo, New York |
| **Medium City** | 10-12 | Bandung, Osaka, Boston |
| **Small City** | 11-13 | Yogyakarta, Kyoto, Portland |
| **Town** | 12-14 | Ubud, Napa, Aspen |
| **Neighborhood** | 13-15 | Menteng, Shibuya, SoHo |
| **Street/Building** | 15-18 | Jl. Sudirman, Times Square |

### Smooth Animations
- **flyTo Animation**: Transisi zoom yang halus dengan durasi 1.2 detik
- **Polygon Aware**: Otomatis menyesuaikan zoom untuk visibility polygon yang optimal
- **No Conflicts**: Menghindari konflik antara calculated zoom dan fitBounds
- **Loading States**: Visual feedback saat map sedang bergerak

### Testing Zoom Behavior
Gunakan browser developer tools untuk melihat zoom calculation:
```javascript
// Console akan menampilkan:
🎯 Zoom Calculation: {
  location: "Jakarta, Indonesia",
  type: "city",
  class: "place", 
  boundingBoxSize: { latDiff: 0.3, lonDiff: 0.4, maxDiff: 0.4 },
  calculatedZoom: 10,
  hasPolygon: true
}
```

## Kontribusi

Kontribusi selalu diterima! Silakan fork repository ini dan buat pull request untuk perubahan yang diinginkan.

## Lisensi

MIT License - Lihat file LICENSE untuk detail lengkap.

---

Dikembangkan dengan ❤️ menggunakan React dan Vite
