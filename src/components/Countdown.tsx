import type { CountdownTime } from "../hooks/useCountdown";
import { cn } from "../lib/utils";

interface CountdownProps {
	countdown: CountdownTime;
	className?: string;
}

function TimeUnit({
	value,
	label,
	showSeparator = true,
}: {
	value: number;
	label: string;
	showSeparator?: boolean;
}) {
	return (
		<div className="flex items-baseline gap-1">
			<span className="text-4xl font-bold tabular-nums sm:text-5xl">
				{String(value).padStart(2, "0")}
			</span>
			<span className="text-xs text-muted-foreground uppercase">{label}</span>
			{showSeparator && (
				<span className="text-2xl text-muted-foreground mx-1 sm:text-3xl">
					:
				</span>
			)}
		</div>
	);
}

export function Countdown({ countdown, className }: CountdownProps) {
	const { months, days, hours, minutes, seconds, isPast } = countdown;

	return (
		<div className={cn("flex flex-wrap items-center gap-1", className)}>
			{isPast && (
				<span className="text-muted-foreground text-sm mr-2">ago</span>
			)}
			{months > 0 && <TimeUnit value={months} label="mo" />}
			{(months > 0 || days > 0) && <TimeUnit value={days} label="d" />}
			<TimeUnit value={hours} label="h" />
			<TimeUnit value={minutes} label="m" />
			<TimeUnit value={seconds} label="s" showSeparator={false} />
			{isPast && (
				<span className="text-muted-foreground text-sm ml-2">ago</span>
			)}
		</div>
	);
}
