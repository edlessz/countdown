import type { IEventStorage } from "./interface";
import { LocalStorageEventStorage } from "./localStorage";

// Export types
export type { IEventStorage } from "./interface";
export type {
	CreateEventInput,
	Event,
	UpdateEventInput,
} from "./types";
export { RecurrencePattern } from "./types";

// Create and export singleton instance
// When migrating to Convex, replace this with ConvexEventStorage
export const eventStorage: IEventStorage = new LocalStorageEventStorage();
