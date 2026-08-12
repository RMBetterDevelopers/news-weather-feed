import { NewsArticle } from "../lib/news";
import { Card } from "./ui/card";
import { CardHeader } from "./ui/card";
import { CardTitle } from "./ui/card";
import { CardDescription } from "./ui/card";
import { CardAction } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface NewsCardProps {
  article: NewsArticle;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function NewsCard({ article, isFavorite, onToggleFavorite }: NewsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
        <CardAction>
          <Button variant="ghost" size="icon" onClick={onToggleFavorite}>
            <span className="text-xl">{isFavorite ? "★" : "☆"}</span>
          </Button>
        </CardAction>
        <CardDescription>
          <Badge variant="secondary">{article.source} ·{" "}</Badge>
          {new Date(article.publishedAt).toLocaleDateString("da-DK")}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}