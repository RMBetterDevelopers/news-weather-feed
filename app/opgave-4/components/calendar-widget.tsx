import { CalendarEvent } from "../lib/events";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CalendarWidgetProps {
    events: CalendarEvent[]
}

export default function CalendarWidget({ events }: CalendarWidgetProps) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Kommende begivenheder</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
            {events.map((event) => (
                <div key={event.title} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-foreground">{event.title}</span>
                    <span className="text-muted-foreground">
                        {new Date(event.date).toLocaleDateString("da-DK", {
                            day: "numeric",
                            month: "short",
                        })}{" "}
                        kl. {event.time}
                    </span>
                </div>
            ))}
        </CardContent>
    </Card>
  );
}