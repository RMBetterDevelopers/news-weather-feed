"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutate: login, isPending } = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data, error } = await authClient.signIn.email(credentials);
      if (error) throw new Error(error.message ?? "Kunne ikke logge ind");
      return data;
    },
    onSuccess: () => router.push("/opgave-1"),
    onError: (error) => setError(error.message),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    login({ email, password });
  }

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Log ind</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Adgangskode</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={isPending}>
              {isPending ? "Logger ind..." : "Log ind"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground text-center mt-4">
            Har du ikke en bruger?{" "}
            <Link href="/sign-up" className="text-primary underline-offset-4 hover:underline">
              Opret en her
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}