import mockNews from "../data/mock-news.json";

export interface NewsArticle {
    id: number;
    title: string;
    source: string;
    publishedAt: string;
    url: string;
}

export async function getTopNews(): Promise<NewsArticle[]> {
  return mockNews.slice(0, 5);
}