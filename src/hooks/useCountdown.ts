import { useMemo } from "react";
import { RecurrencePattern } from "@/lib/storage";
import { useTick } from "./useTick";

export interface CountdownTime {
	months: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	isPast: boolean;
	totalMilliseconds: number;
}

function getNextOccurrence(
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

function calculateCountdown(targetDate: Date): CountdownTime {
	const now = new Date();
	const diff = targetDate.getTime() - now.getTime();
	const isPast = diff < 0;
	const absDiff = Math.abs(diff);

	// Calculate time components
	const totalSeconds = Math.floor(absDiff / 1000);
	const totalMinutes = Math.floor(totalSeconds / 60);
	const totalHours = Math.floor(totalMinutes / 60);
	const totalDays = Math.floor(totalHours / 24);

	// Approximate months (30 days per month)
	const months = Math.floor(totalDays / 30);
	const remainingDaysAfterMonths = totalDays % 30;

	return {
		months,
		days: remainingDaysAfterMonths,
		hours: totalHours % 24,
		minutes: totalMinutes % 60,
		seconds: totalSeconds % 60,
		isPast,
		totalMilliseconds: absDiff,
	};
}

export function useCountdown(
	datetime: string,
	recurrence: RecurrencePattern | null,
): CountdownTime & { nextOccurrence: Date } {
	// Subscribe to global tick - this causes re-render every second
	const tick = useTick();

	// Recalculate on every tick
	// biome-ignore lint/correctness/useExhaustiveDependencies: <must rerender every tick>
	const result = useMemo(() => {
		const nextOccurrence = getNextOccurrence(datetime, recurrence);
		const countdown = calculateCountdown(nextOccurrence);
		return { ...countdown, nextOccurrence };
	}, [datetime, recurrence, tick]);

	return result;
}
