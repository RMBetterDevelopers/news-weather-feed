import z from "zod";

const jokeSchema = z.object({
  setup: z.string(),
  punchline: z.string(),
});

export type Joke = z.infer<typeof jokeSchema>;

export async function getJoke(): Promise<Joke> {
  const response = await fetch("https://official-joke-api.appspot.com/random_joke", {
      next: { revalidate: 3600 },
    });

  if (!response.ok) {
    throw new Error(`Kunne ikke hente joke: ${response.status}`);
  }

  const data = jokeSchema.parse(await response.json());

  return data;
}