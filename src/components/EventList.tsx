import { useMemo } from "react";
import { getNextOccurrence } from "@/lib/date-utils";
import type { Event } from "@/lib/storage";
import { EventCard } from "./EventCard";

interface EventListProps {
	events: Event[];
	onEdit: (event: Event) => void;
	onDelete: (id: string) => void;
}

export function EventList({ events, onEdit, onDelete }: EventListProps) {
	// Sort by next occurrence (respects recurrence), upcoming first
	const sortedEvents = useMemo(() => {
		const now = Date.now();

		return [...events].sort((a, b) => {
			const dateA = getNextOccurrence(a.datetime, a.recurrence).getTime();
			const dateB = getNextOccurrence(b.datetime, b.recurrence).getTime();

			// Both in future: sort ascending (nearest first)
			if (dateA > now && dateB > now) {
				return dateA - dateB;
			}
			// Both in past: sort descending (most recent first)
			if (dateA <= now && dateB <= now) {
				return dateB - dateA;
			}
			// Future events come before past events
			return dateA > now ? -1 : 1;
		});
	}, [events]);

	if (events.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-16 text-center">
				<div className="text-6xl mb-4">📅</div>
				<h2 className="text-xl font-semibold text-foreground mb-2">
					No events yet
				</h2>
				<p className="text-muted-foreground">
					Add your first event to start counting down!
				</p>
			</div>
		);
	}

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{sortedEvents.map((event) => (
				<EventCard
					key={event.id}
					event={event}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			))}
		</div>
	);
}
