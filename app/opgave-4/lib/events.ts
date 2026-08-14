import mockEventsData from "../data/mock-events.json";

export interface CalendarEvent {
  title: string;
  date: string;
  time: string;
}

const mockEvents = mockEventsData as CalendarEvent[];

export async function getUpcomingEvents(): Promise<CalendarEvent[]> {
  return mockEvents;
}