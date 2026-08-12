import { NewsArticle } from "../lib/news";

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <div className ="rounded-lg bg-white shadow p-4">
        <h3 className="font-semibold text-gray-900">{article.title}</h3>
        <p className="text-sm text-gray-500 mt-1">
        {article.source} ·{" "}
        {new Date(article.publishedAt).toLocaleDateString("da-DK")}
        </p>
    </div>
  );
}