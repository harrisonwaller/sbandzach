/**
 * The weekend, as a printed program. Only public, Zola-listed venues and
 * addresses appear here — no shuttle times, room blocks or private logistics.
 */
export type ScheduleEvent = {
  time: string;
  title: string;
  venue: string;
  address: string;
  attire?: string;
};

export type ScheduleDay = {
  /** Long label, e.g. "Friday" */
  weekday: string;
  /** Readable date, e.g. "June 5" */
  date: string;
  events: ScheduleEvent[];
};

export const schedule: ScheduleDay[] = [
  {
    weekday: "Friday",
    date: "June 5",
    events: [
      {
        time: "9:00 — 11:00 PM",
        title: "Welcome Drinks",
        venue: "The Ritz-Carlton, Lake Oconee",
        address: "1 Lake Oconee Trail, Greensboro, Georgia",
        attire: "Cocktail Attire",
      },
    ],
  },
  {
    weekday: "Saturday",
    date: "June 6",
    events: [
      {
        time: "4:30 PM",
        title: "The Ceremony",
        venue: "Great Waters Course at Reynolds Lake Oconee",
        address: "112 Garrett Drive, Eatonton, Georgia",
        attire: "Black-Tie Optional",
      },
      {
        time: "5:00 PM",
        title: "The Reception",
        venue: "Great Waters Clubhouse",
        address: "112 Plantation Drive, Eatonton, Georgia",
      },
      {
        time: "10:30 PM — 1:30 AM",
        title: "The After Party",
        venue: "The Ritz-Carlton, Lake Oconee",
        address: "1 Lake Oconee Trail, Greensboro, Georgia",
      },
    ],
  },
];
