import { useState } from "react";
import { EventForm } from "./components/EventForm";
import { EventList } from "./components/EventList";
import { Button } from "./components/ui/Button";
import { ThemeToggle } from "./components/ui/ThemeToggle";
import { useEvents } from "./hooks/useEvents";
import type { CreateEventInput, Event, UpdateEventInput } from "./lib/storage";

function App() {
	const { events, isLoading, createEvent, updateEvent, deleteEvent } =
		useEvents();
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingEvent, setEditingEvent] = useState<Event | null>(null);

	const handleCreate = () => {
		setEditingEvent(null);
		setIsFormOpen(true);
	};

	const handleEdit = (event: Event) => {
		setEditingEvent(event);
		setIsFormOpen(true);
	};

	const handleDelete = async (id: string) => {
		await deleteEvent(id);
	};

	const handleSubmit = async (input: CreateEventInput) => {
		if (editingEvent) {
			await updateEvent(editingEvent.id, input as UpdateEventInput);
		} else {
			await createEvent(input);
		}
	};

	return (
		<div className="min-h-screen bg-background">
			<header className="border-b">
				<div className="container mx-auto flex items-center justify-between px-4 py-4">
					<h1 className="text-2xl font-bold text-foreground">Countdown</h1>
					<div className="flex items-center gap-2">
						<Button onClick={handleCreate}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="mr-2"
							>
								<title>Add icon</title>
								<path d="M5 12h14" />
								<path d="M12 5v14" />
							</svg>
							Add Event
						</Button>
						<ThemeToggle />
					</div>
				</div>
			</header>

			<main className="container mx-auto px-4 py-8">
				{isLoading ? (
					<div className="flex items-center justify-center py-16">
						<div className="text-muted-foreground">Loading...</div>
					</div>
				) : (
					<EventList
						events={events}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				)}
			</main>

			<EventForm
				open={isFormOpen}
				onOpenChange={setIsFormOpen}
				onSubmit={handleSubmit}
				editingEvent={editingEvent}
			/>
		</div>
	);
}

export default App;
