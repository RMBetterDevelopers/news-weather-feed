export interface Joke {
  setup: string;
  punchline: string;
}

export async function getJoke(): Promise<Joke> {
  const response = await fetch("https://official-joke-api.appspot.com/random_joke", {
      next: { revalidate: 3600 },
    });

  if (!response.ok) {
    throw new Error(`Kunne ikke hente joke: ${response.status}`);
  }

  const data: Joke = await response.json();

  return data;
}