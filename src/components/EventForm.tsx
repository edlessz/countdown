import { type FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { CreateEventInput, Event } from "@/lib/storage";
import { RecurrencePattern } from "@/lib/storage";

interface EventFormProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (input: CreateEventInput) => void;
	editingEvent?: Event | null;
}

export function EventForm({
	open,
	onOpenChange,
	onSubmit,
	editingEvent,
}: EventFormProps) {
	const [title, setTitle] = useState("");
	const [emoji, setEmoji] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [recurrence, setRecurrence] = useState<RecurrencePattern | "none">(
		"none",
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: open is needed to reset form when dialog reopens
	useEffect(() => {
		if (editingEvent) {
			setTitle(editingEvent.title);
			setEmoji(editingEvent.emoji);
			const dt = new Date(editingEvent.datetime);
			setDate(dt.toISOString().split("T")[0]);
			setTime(dt.toTimeString().slice(0, 5));
			setRecurrence(editingEvent.recurrence ?? "none");
		} else {
			setTitle("");
			setEmoji("");
			setDate("");
			setTime("");
			setRecurrence("none");
		}
	}, [editingEvent, open]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const datetime = new Date(`${date}T${time}`).toISOString();

		onSubmit({
			title,
			emoji: emoji || "📅",
			datetime,
			recurrence: recurrence === "none" ? null : recurrence,
		});

		onOpenChange(false);
	};

	const isValid = title.trim() && date && time;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{editingEvent ? "Edit Event" : "Add Event"}</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="title" className="text-sm font-medium">
							Title
						</label>
						<Input
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Event name"
							required
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="emoji" className="text-sm font-medium">
							Emoji
						</label>
						<Input
							id="emoji"
							value={emoji}
							onChange={(e) => setEmoji(e.target.value)}
							placeholder="📅"
							className="text-2xl"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<label htmlFor="date" className="text-sm font-medium">
								Date
							</label>
							<Input
								id="date"
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="time" className="text-sm font-medium">
								Time
							</label>
							<Input
								id="time"
								type="time"
								value={time}
								onChange={(e) => setTime(e.target.value)}
								required
							/>
						</div>
					</div>

					<div className="space-y-2">
						<label htmlFor="recurrence" className="text-sm font-medium">
							Repeat
						</label>
						<Select
							value={recurrence}
							onValueChange={(v) =>
								setRecurrence(v as RecurrencePattern | "none")
							}
						>
							<SelectTrigger id="recurrence" className="w-full">
								<SelectValue placeholder="Select recurrence" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="none">One-time</SelectItem>
								<SelectItem value={RecurrencePattern.DAILY}>Daily</SelectItem>
								<SelectItem value={RecurrencePattern.WEEKLY}>Weekly</SelectItem>
								<SelectItem value={RecurrencePattern.MONTHLY}>
									Monthly
								</SelectItem>
								<SelectItem value={RecurrencePattern.YEARLY}>Yearly</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={!isValid}>
							{editingEvent ? "Save" : "Add"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
