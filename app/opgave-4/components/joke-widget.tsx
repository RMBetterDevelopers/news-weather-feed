"use client";

import { Joke, getJoke } from "../lib/joke";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface JokeWidgetProps {
  joke: Joke;
}

export default function JokeWidget({ joke: initialJoke }: JokeWidgetProps) {
    const [joke, setJoke] = useState(initialJoke)
    async function handleNewJoke() {
        const newJoke = await getJoke();
        setJoke(newJoke);
    }
  return (
    <Card>
        <CardHeader>
            <CardTitle>Dagens joke</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-base text-foreground">{joke.setup}</p>
            <p className="text-lg font-bold text-primary mt-2">{joke.punchline}</p>
            <Button onClick={handleNewJoke}>Ny joke</Button>
        </CardContent>
    </Card>
  );
}