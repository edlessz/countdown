import { Pencil, Trash2 } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCountdown } from "@/hooks/useCountdown";
import type { Event } from "@/lib/storage";
import { Countdown } from "./Countdown";

interface EventCardProps {
	event: Event;
	onEdit: (event: Event) => void;
	onDelete: (id: string) => void;
}

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
						<h3 className="text-xl font-semibold text-card-foreground">
							{event.title}
						</h3>
						<p className="text-sm text-muted-foreground">{formattedDate}</p>
					</div>
				</div>
				<div className="flex gap-1">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => onEdit(event)}
						aria-label="Edit event"
					>
						<Pencil className="size-4" />
					</Button>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="ghost" size="icon" aria-label="Delete event">
								<Trash2 className="size-4 text-destructive" />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Delete event?</AlertDialogTitle>
								<AlertDialogDescription>
									Are you sure you want to delete "{event.title}"? This action
									cannot be undone.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									variant="destructive"
									onClick={() => onDelete(event.id)}
								>
									Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>
			<Countdown countdown={countdown} />
		</div>
	);
}
