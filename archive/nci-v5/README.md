# National Indigenous Crops Knowledge Tool (V5)

Static site, no build step. Upload this whole folder to any static host (S3, Netlify, Cloudflare Pages, GitHub Pages, nginx).

- `index.html`: page markup
- `css/styles.css`: styles
- `js/app.js`: application logic
- `support.js`: runtime the app needs
- `data/`: dataset.json, rwanda-districts.geojson, i18n.js and i18n-v5.js (Kinyarwanda/French strings)
- `assets/`: logo

Serve over http(s); opening from file:// blocks the data and script loading.
Local test: `python3 -m http.server`, then open http://localhost:8000

Crop and landscape photos load live from Wikimedia Commons (internet required). To self-host, download them and replace the URLs in the `IMF` map near the top of `js/app.js`.
