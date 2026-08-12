import { NewsArticle } from "../lib/news";
import { Card } from "./ui/card";
import { CardHeader } from "./ui/card";
import { CardTitle } from "./ui/card";
import { CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";


interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Card>
        <CardHeader>
        <CardTitle>{article.title}</CardTitle>
        <CardDescription>
        <Badge variant="secondary">{article.source} ·{" "}</Badge>
        {new Date(article.publishedAt).toLocaleDateString("da-DK")}
        </CardDescription>
        </CardHeader>
    </Card>
  );
}