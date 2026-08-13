export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  url: string;
  imageUrl: string | null;
}

interface NewsApiArticle {
  title: string;
  url: string;
  publishedAt: string;
  source: { name: string };
  urlToImage: string | null;
}

interface NewsApiResponse {
  articles: NewsApiArticle[];
}

export async function getTopNews(): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    throw new Error("NEWS_API_KEY mangler — tilføj den til .env.local");
  }

  const danishDomains = "dr.dk,tv2.dk,berlingske.dk,politiken.dk,jyllands-posten.dk";

  const response = await fetch(
    `https://newsapi.org/v2/everything?domains=${danishDomains}&sortBy=publishedAt&pageSize=5`,
    {
      headers: { "X-Api-Key": apiKey },
      next: { revalidate: 600 },
    }
  );

  if (!response.ok) {
    throw new Error(`Kunne ikke hente nyheder: ${response.status}`);
  }

  const data: NewsApiResponse = await response.json();

  return data.articles.map((article) => ({
    id: article.url,
    title: article.title,
    source: article.source.name,
    publishedAt: article.publishedAt,
    url: article.url,
    imageUrl: article.urlToImage,
  }));
}