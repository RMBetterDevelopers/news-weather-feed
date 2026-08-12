# Local News & Weather Feed

Et lille dashboard, der viser de 5 seneste nyhedsoverskrifter og det aktuelle vejr i Aarhus samlet ét sted.

## Kør projektet lokalt

```bash
npm install
npm run dev
```

Åbn derefter [http://localhost:3000](http://localhost:3000) i browseren.

## Data

- **Vejr**: hentes live fra [Open-Meteo](https://open-meteo.com/) (kræver ingen API-nøgle).
- **Nyheder**: mock-data fra [`data/mock-news.json`](data/mock-news.json).
