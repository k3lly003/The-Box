# Rwanda's Indigenous Crops: National Knowledge Tool (SPA v2)

- `index.html`: the app (markup, inline styles, logic)
- `support.js`: runtime the app needs
- `data/dataset.json`, `data/rwanda-districts.geojson`: all figures and district boundaries
- `data/i18n.js`: Kinyarwanda and French strings
- `data/spa-icons.txt`: module icons
- `assets/`: logo

Run it from a local web server (for example `python3 -m http.server`, then open http://localhost:8000). Opening the file directly will block the data and translation files.
Crop photos load from Wikimedia Commons, so they need an internet connection.
