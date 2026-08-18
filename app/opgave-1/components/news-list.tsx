"use client";

import { NewsArticle } from "../lib/news";
import NewsCard from "./news-card";
import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface NewsListProps {
  articles: NewsArticle[];
}

export default function NewsList({ articles }: NewsListProps) {
  const [query, setQuery] = useState("");

  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await fetch("/api/favorites");
      if (!res.ok) throw new Error("Kunne ikke hente favoritter");
      return res.json() as Promise<string[]>;
    },
  });

  const queryClient = useQueryClient();

  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async ({ articleUrl, isFavorite }: { articleUrl: string; isFavorite: boolean }) => {
      const res = await fetch("/api/favorites", {
        method: isFavorite ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleUrl }),
      });
      if (!res.ok) throw new Error("Kunne ikke opdatere favorit");
    },
    onMutate: async ({ articleUrl, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });
      const previousFavorites = queryClient.getQueryData<string[]>(["favorites"]);

      queryClient.setQueryData<string[]>(["favorites"], (old = []) =>
        isFavorite ? old.filter((id) => id !== articleUrl) : [...old, articleUrl]
      );

      return { previousFavorites };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites"], context.previousFavorites);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

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
              onToggleFavorite={() =>
                toggleFavorite({ articleUrl: article.id, isFavorite: favorites.includes(article.id) })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}