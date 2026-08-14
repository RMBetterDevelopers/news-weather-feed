import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const RESOURCES = [
    { title: "Projektstyring", url: "https://example.com" },
    { title: "Timesedler", url: "https://example.com" },
    { title: "Dokumentation", url: "https://example.com" },
    { title: "Firmaside", url: "https://example.com" },
];

export default function ResourceLinks() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Genveje</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
            {RESOURCES.map((resource) => (
                <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener no referrer"
                className="text-sm text-primary underline-offset-4 hover:underline"
                >
                    {resource.title}
                </a>
            ))}
        </CardContent>
    </Card>
  );
}