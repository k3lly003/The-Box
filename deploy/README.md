# Land Readjustment Platform — prototype (NLA)

Static site. No build step, no server code.

## Run locally
Browsers block some features when opening files directly, so serve the folder:

    cd deploy
    python3 -m http.server 8080
    # open http://localhost:8080

## Deploy
Upload the whole folder as-is to any static host (Nginx, Apache, IIS, GitHub Pages, Netlify, S3, an internal NLA web server). `index.html` is the entry point. Keep the folder structure unchanged.

## Contents
- `index.html` — the app
- `support.js` — runtime for the page (required)
- `lr-core.js`, `lr-map.js`, `lr-i18n.js` — data model, map, translations
- `data/` — Kabeza site data (`kabeza.data.js`), field resurvey (`kabeza_resurvey.data.js`); `.json` copies are a fallback
- `vendor/` — MapLibre GL (map engine)
- `fonts/` — Inter (self-hosted)

## Internet access
Everything is local except the basemap tiles (Esri Light Gray and World Imagery). Without internet the parcels and plots still draw on a plain background. To use NLA's own orthophoto or tile server, edit `LR.BASEMAPS` at the top of `lr-map.js`.

## Data privacy
Owner names are in `data/kabeza.data.js` and are hidden in the Public view only at the interface level. Do not host this folder publicly with real names; host it on an internal server or replace the names first.
