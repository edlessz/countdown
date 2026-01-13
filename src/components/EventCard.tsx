import { useCountdown } from "../hooks/useCountdown";
import type { Event } from "../lib/storage";
import { RecurrencePattern } from "../lib/storage";
import { Countdown } from "./Countdown";
import { Button } from "./ui/Button";

interface EventCardProps {
	event: Event;
	onEdit: (event: Event) => void;
	onDelete: (id: string) => void;
}

const recurrenceLabels: Record<RecurrencePattern, string> = {
	[RecurrencePattern.DAILY]: "Daily",
	[RecurrencePattern.WEEKLY]: "Weekly",
	[RecurrencePattern.MONTHLY]: "Monthly",
	[RecurrencePattern.YEARLY]: "Yearly",
};

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
	const countdown = useCountdown(event.datetime, event.recurrence);

	const formattedDate = new Intl.DateTimeFormat("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
	}).format(countdown.nextOccurrence);

	return (
		<div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-center gap-3">
					<span className="text-4xl">{event.emoji}</span>
					<div>
						<h3 className="text-xl font-semibold text-card-foreground">
							{event.title}
						</h3>
						<p className="text-sm text-muted-foreground">{formattedDate}</p>
						{event.recurrence && (
							<span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary mt-1">
								{recurrenceLabels[event.recurrence]}
							</span>
						)}
					</div>
				</div>
				<div className="flex gap-1">
					<Button variant="ghost" size="icon" onClick={() => onEdit(event)}>
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
						>
							<title>Edit</title>
							<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
							<path d="m15 5 4 4" />
						</svg>
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => onDelete(event.id)}
					>
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
							className="text-destructive"
						>
							<title>Delete</title>
							<path d="M3 6h18" />
							<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
							<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
							<line x1="10" x2="10" y1="11" y2="17" />
							<line x1="14" x2="14" y1="11" y2="17" />
						</svg>
					</Button>
				</div>
			</div>
			<div className="mt-4">
				<Countdown countdown={countdown} />
			</div>
		</div>
	);
}
