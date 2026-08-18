import mockEventsData from "../data/mock-events.json";
import z from "zod";

const calendarEventSchema = z.object({
  title: z.string(),
  date: z.string(),
  time: z.string(),
});

export type CalendarEvent = z.infer<typeof calendarEventSchema>;

const mockEvents = z.array(calendarEventSchema).parse(mockEventsData);

export async function getUpcomingEvents(): Promise<CalendarEvent[]> {
  return mockEvents;
}