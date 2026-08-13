"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="max-w-5xl mx-auto p-6 flex flex-col items-center justify-center text-center min-h-[50vh]">
      <h1 className="text-2xl font-bold text-gray-900">Noget gik galt</h1>
      <p className="text-gray-600 mt-2">
        Vi kunne ikke hente vejr lige nu. Prøv igen om lidt.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-blue-600 text-white px-5 py-2 font-medium hover:bg-blue-700"
      >
        Prøv igen
      </button>
    </main>
  );
}