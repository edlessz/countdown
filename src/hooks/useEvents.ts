import { useCallback, useEffect, useState } from "react";
import {
	type CreateEventInput,
	type Event,
	eventStorage,
	type UpdateEventInput,
} from "../lib/storage";

export function useEvents() {
	const [events, setEvents] = useState<Event[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const loadEvents = useCallback(async () => {
		setIsLoading(true);
		try {
			const loaded = await eventStorage.getAll();
			setEvents(loaded);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadEvents();
	}, [loadEvents]);

	const createEvent = useCallback(async (input: CreateEventInput) => {
		const newEvent = await eventStorage.create(input);
		setEvents((prev) => [...prev, newEvent]);
		return newEvent;
	}, []);

	const updateEvent = useCallback(
		async (id: string, input: UpdateEventInput) => {
			const updated = await eventStorage.update(id, input);
			if (updated) {
				setEvents((prev) => prev.map((e) => (e.id === id ? updated : e)));
			}
			return updated;
		},
		[],
	);

	const deleteEvent = useCallback(async (id: string) => {
		const success = await eventStorage.delete(id);
		if (success) {
			setEvents((prev) => prev.filter((e) => e.id !== id));
		}
		return success;
	}, []);

	return {
		events,
		isLoading,
		createEvent,
		updateEvent,
		deleteEvent,
		refetch: loadEvents,
	};
}
