import { NewsArticle } from "../lib/news";
import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardAction } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NewsCardProps {
  article: NewsArticle;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function NewsCard({ article, isFavorite, onToggleFavorite }: NewsCardProps) {
  return (
    <Card>
      {article.imageUrl && (
        <img 
        src={article.imageUrl}
        alt={article.title}
        className="aspect-video w-full object-cover"
        />
      )}
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