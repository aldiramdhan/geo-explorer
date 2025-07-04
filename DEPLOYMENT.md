# Deployment Configuration

## Build untuk Production

```bash
npm run build
```

## Preview Build

```bash
npm run preview
```

## Deployment ke Netlify

1. Build aplikasi:
   ```bash
   npm run build
   ```

2. Upload folder `dist` ke Netlify

Atau gunakan Netlify CLI:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

## Deployment ke Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

## Deployment ke GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Tambahkan script di package.json:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## Environment Variables

Untuk production, pastikan untuk mengset environment variables:

- `VITE_GEMINI_API_KEY`: API key untuk Google Gemini
- `VITE_APP_NAME`: Nama aplikasi
- `VITE_APP_VERSION`: Versi aplikasi

## Optimasi Performance

1. **Lazy Loading**: Komponen sudah menggunakan lazy loading
2. **Code Splitting**: Vite secara otomatis melakukan code splitting
3. **Tree Shaking**: Unused code akan dihapus saat build
4. **Minification**: CSS dan JS akan di-minify
5. **Gzip Compression**: Server harus mengaktifkan gzip compression

## Monitoring

- Gunakan tools seperti Lighthouse untuk mengecek performance
- Monitor Core Web Vitals untuk user experience
- Setup error tracking dengan Sentry atau serupa
