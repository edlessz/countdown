import { RecurrencePattern } from "./storage";

export function getNextOccurrence(
	datetime: string,
	recurrence: RecurrencePattern | null,
): Date {
	const eventDate = new Date(datetime);
	const now = new Date();

	if (!recurrence || eventDate > now) {
		return eventDate;
	}

	// For recurring events that are in the past, calculate next occurrence
	const next = new Date(eventDate);

	while (next <= now) {
		switch (recurrence) {
			case RecurrencePattern.DAILY:
				next.setDate(next.getDate() + 1);
				break;
			case RecurrencePattern.WEEKLY:
				next.setDate(next.getDate() + 7);
				break;
			case RecurrencePattern.MONTHLY:
				next.setMonth(next.getMonth() + 1);
				break;
			case RecurrencePattern.YEARLY:
				next.setFullYear(next.getFullYear() + 1);
				break;
		}
	}

	return next;
}

/**
 * Calculate the difference between two dates in months and remaining days.
 * Uses actual calendar months instead of 30-day approximation.
 */
export function getMonthsDaysDiff(
	from: Date,
	to: Date,
): { months: number; days: number } {
	const earlier = from < to ? from : to;
	const later = from < to ? to : from;

	let months =
		(later.getFullYear() - earlier.getFullYear()) * 12 +
		(later.getMonth() - earlier.getMonth());

	// Create a date that is `months` months after `earlier`
	const tempDate = new Date(earlier);
	tempDate.setMonth(tempDate.getMonth() + months);

	// If we've gone past `later`, subtract a month
	if (tempDate > later) {
		months--;
		tempDate.setMonth(tempDate.getMonth() - 1);
	}

	// Calculate remaining days
	const diffMs = later.getTime() - tempDate.getTime();
	const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	return { months, days };
}
