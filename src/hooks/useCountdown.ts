import { useMemo } from "react";
import { getMonthsDaysDiff, getNextOccurrence } from "@/lib/date-utils";
import type { RecurrencePattern } from "@/lib/storage";
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

function calculateCountdown(targetDate: Date): CountdownTime {
	const now = new Date();
	const diff = targetDate.getTime() - now.getTime();
	const isPast = diff < 0;
	const absDiff = Math.abs(diff);

	// Calculate time components
	const totalSeconds = Math.floor(absDiff / 1000);
	const totalMinutes = Math.floor(totalSeconds / 60);
	const totalHours = Math.floor(totalMinutes / 60);

	// Use actual calendar months instead of 30-day approximation
	const { months, days } = getMonthsDaysDiff(now, targetDate);

	return {
		months,
		days,
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
