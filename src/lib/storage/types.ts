export const RecurrencePattern = {
	DAILY: "daily",
	WEEKLY: "weekly",
	MONTHLY: "monthly",
	YEARLY: "yearly",
} as const;

export type RecurrencePattern =
	(typeof RecurrencePattern)[keyof typeof RecurrencePattern];

export interface Event {
	id: string;
	title: string;
	emoji: string;
	datetime: string; // ISO string
	recurrence: RecurrencePattern | null;
	createdAt: string;
	updatedAt: string;
}

export type CreateEventInput = Omit<Event, "id" | "createdAt" | "updatedAt">;
export type UpdateEventInput = Partial<CreateEventInput>;
