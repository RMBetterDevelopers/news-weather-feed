"use client";

import { NewsArticle } from "../lib/news";
import NewsCard from "./news-card";
import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { useEffect } from "react";

interface NewsListProps {
  articles: NewsArticle[];
}

export default function NewsList({ articles }: NewsListProps) {
    const [query, setQuery] = useState("");
    const [favorites, setFavorites] = useState<string[]>([]);
    
    useEffect(() => {
        const stored = localStorage.getItem("favorite-news-ids");
        if (stored) {
            // eslint-disable-next-line
            setFavorites(JSON.parse(stored));
  }
}, []);

useEffect(() => {
  localStorage.setItem("favorite-news-ids", JSON.stringify(favorites));
}, [favorites]);

    function toggleFavorite(id: string) {
        setFavorites((prev) => {
            if (prev.includes(id)) {
                return prev.filter((favId) => favId !== id);
            } else {
                return [...prev, id];
            }
        });
    }

    const filteredArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    return (
    <div>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Søg i nyheder..."
        className="mb-4"
      />

      {filteredArticles.length === 0 ? (
        <p className="text-muted-foreground">Ingen nyheder matcher din søgning.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles.map((article) => (
            <NewsCard 
            key={article.id} 
            article={article} 
            isFavorite={favorites.includes(article.id)}
            onToggleFavorite={() => toggleFavorite(article.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}