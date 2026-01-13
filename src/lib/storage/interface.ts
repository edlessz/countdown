import type { CreateEventInput, Event, UpdateEventInput } from "./types";

export interface IEventStorage {
	getAll(): Promise<Event[]>;
	getById(id: string): Promise<Event | null>;
	create(input: CreateEventInput): Promise<Event>;
	update(id: string, input: UpdateEventInput): Promise<Event | null>;
	delete(id: string): Promise<boolean>;
}
