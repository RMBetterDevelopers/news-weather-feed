"use client";

import { NewsArticle } from "../lib/news";
import NewsCard from "./NewsCard";
import { useState } from "react";
import { Input } from "./ui/input";

interface NewsListProps {
  articles: NewsArticle[];
}

export default function NewsList({ articles }: NewsListProps) {
    const [query, setQuery] = useState("");
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
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}