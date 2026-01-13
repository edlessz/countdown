import type { IEventStorage } from "./interface";
import type { CreateEventInput, Event, UpdateEventInput } from "./types";

const STORAGE_KEY = "countdown-events";

function generateId(): string {
	return crypto.randomUUID();
}

export class LocalStorageEventStorage implements IEventStorage {
	private getEvents(): Event[] {
		const data = localStorage.getItem(STORAGE_KEY);
		if (!data) return [];
		try {
			return JSON.parse(data) as Event[];
		} catch {
			return [];
		}
	}

	private saveEvents(events: Event[]): void {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
	}

	async getAll(): Promise<Event[]> {
		return this.getEvents();
	}

	async getById(id: string): Promise<Event | null> {
		const events = this.getEvents();
		return events.find((e) => e.id === id) ?? null;
	}

	async create(input: CreateEventInput): Promise<Event> {
		const events = this.getEvents();
		const now = new Date().toISOString();
		const newEvent: Event = {
			...input,
			id: generateId(),
			createdAt: now,
			updatedAt: now,
		};
		events.push(newEvent);
		this.saveEvents(events);
		return newEvent;
	}

	async update(id: string, input: UpdateEventInput): Promise<Event | null> {
		const events = this.getEvents();
		const index = events.findIndex((e) => e.id === id);
		if (index === -1) return null;

		const updated: Event = {
			...events[index],
			...input,
			updatedAt: new Date().toISOString(),
		};
		events[index] = updated;
		this.saveEvents(events);
		return updated;
	}

	async delete(id: string): Promise<boolean> {
		const events = this.getEvents();
		const index = events.findIndex((e) => e.id === id);
		if (index === -1) return false;

		events.splice(index, 1);
		this.saveEvents(events);
		return true;
	}
}
