# Local News & Weather Feed

Dashboard, that shows the latest 5 news headlines and the actual weather in Aarhus.

## Run the project locally

1. Get a free API key at [newsapi.org/register](https://newsapi.org/register).
2. Create a `.env.local` file in the project root with:
   ```
   NEWS_API_KEY=your_key_here
   ```
3. Install and run:
   ```bash
   npm install
   npm run dev
   ```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Data

- **Weather**: API from [Open-Meteo](https://open-meteo.com/) (no requirement of API key).
- **News**: [NewsAPI.org](https://newsapi.org/), filtered to Danish domains (dr.dk, tv2.dk, berlingske.dk, politiken.dk, jyllands-posten.dk). NewsAPI's free tier is development-only (localhost) and doesn't support Denmark via its `country`/`language` filters, so we filter by domain instead.
