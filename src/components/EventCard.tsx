import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCountdown } from "@/hooks/useCountdown";
import type { Event } from "@/lib/storage";
// import { RecurrencePattern } from "@/lib/storage";
import { Countdown } from "./Countdown";

interface EventCardProps {
	event: Event;
	onEdit: (event: Event) => void;
	onDelete: (id: string) => void;
}

// const recurrenceLabels: Record<RecurrencePattern, string> = {
// 	[RecurrencePattern.DAILY]: "Daily",
// 	[RecurrencePattern.WEEKLY]: "Weekly",
// 	[RecurrencePattern.MONTHLY]: "Monthly",
// 	[RecurrencePattern.YEARLY]: "Yearly",
// };

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
		<div className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-center gap-3">
					<span className="text-4xl">{event.emoji}</span>
					<div>
						<div className="flex gap-4">
							<h3 className="text-xl font-semibold text-card-foreground">
								{event.title}
							</h3>
							{/* {event.recurrence && (
								<span className="inline-flex items-center rounded-full bg-primary/10 px-2 text-xs font-medium text-primary">
									{recurrenceLabels[event.recurrence]}
								</span>
							)} */}
						</div>

						<p className="text-sm text-muted-foreground">{formattedDate}</p>
					</div>
				</div>
				<div className="flex gap-1">
					<Button variant="ghost" size="icon" onClick={() => onEdit(event)}>
						<Pencil className="size-4" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => onDelete(event.id)}
					>
						<Trash2 className="size-4 text-destructive" />
					</Button>
				</div>
			</div>
			<Countdown countdown={countdown} />
		</div>
	);
}
