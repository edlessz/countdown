"use client";

import clsx from "clsx";
import {
	type EmojiPickerListCategoryHeaderProps,
	type EmojiPickerListEmojiProps,
	EmojiPicker as FrimousseEmojiPicker,
} from "frimousse";
import type * as React from "react";
import { cn } from "@/lib/utils";

function EmojiPickerRoot({
	className,
	...props
}: React.ComponentProps<typeof FrimousseEmojiPicker.Root>) {
	return (
		<FrimousseEmojiPicker.Root
			data-slot="emoji-picker"
			className={cn(
				"isolate flex h-92 w-full flex-col bg-transparent",
				className,
			)}
			{...props}
		/>
	);
}

function EmojiPickerSearch({
	className,
	...props
}: React.ComponentProps<typeof FrimousseEmojiPicker.Search>) {
	return (
		<FrimousseEmojiPicker.Search
			data-slot="emoji-picker-search"
			className={cn(
				"bg-muted text-foreground placeholder:text-muted-foreground h-9 w-full rounded-md border-0 px-3 text-sm outline-none",
				className,
			)}
			{...props}
		/>
	);
}

function EmojiPickerViewport({
	className,
	...props
}: React.ComponentProps<typeof FrimousseEmojiPicker.Viewport>) {
	return (
		<FrimousseEmojiPicker.Viewport
			data-slot="emoji-picker-viewport"
			className={cn("relative flex-1 outline-none no-scrollbar", className)}
			{...props}
		/>
	);
}

function EmojiPickerLoading({
	className,
	...props
}: React.ComponentProps<typeof FrimousseEmojiPicker.Loading>) {
	return (
		<FrimousseEmojiPicker.Loading
			data-slot="emoji-picker-loading"
			className={cn(
				"text-muted-foreground absolute inset-0 flex items-center justify-center text-sm",
				className,
			)}
			{...props}
		/>
	);
}

function EmojiPickerEmpty({
	className,
	...props
}: React.ComponentProps<typeof FrimousseEmojiPicker.Empty>) {
	return (
		<FrimousseEmojiPicker.Empty
			data-slot="emoji-picker-empty"
			className={cn(
				"text-muted-foreground absolute inset-0 flex items-center justify-center text-sm",
				className,
			)}
			{...props}
		/>
	);
}

function EmojiPickerList({
	className,
	selectedEmoji,
	...props
}: Omit<
	React.ComponentProps<typeof FrimousseEmojiPicker.List>,
	"components"
> & {
	selectedEmoji?: string;
}) {
	return (
		<FrimousseEmojiPicker.List
			data-slot="emoji-picker-list"
			className={cn("select-none", className)}
			components={{
				CategoryHeader: ({
					category,
					...categoryProps
				}: EmojiPickerListCategoryHeaderProps) => (
					<div
						className="bg-popover text-muted-foreground px-0 pb-1.5 pt-3 text-xs font-medium"
						{...categoryProps}
					>
						{category.label}
					</div>
				),
				Emoji: ({ emoji, ...emojiProps }: EmojiPickerListEmojiProps) => (
					<button
						type="button"
						className={clsx(
							{
								"bg-muted": emoji.emoji === selectedEmoji,
							},
							"flex size-8 items-center justify-center rounded-md text-lg transition-colors hover:bg-muted data-active:bg-muted",
						)}
						{...emojiProps}
					>
						{emoji.emoji}
					</button>
				),
			}}
			{...props}
		/>
	);
}

const EmojiPicker = {
	Root: EmojiPickerRoot,
	Search: EmojiPickerSearch,
	Viewport: EmojiPickerViewport,
	Loading: EmojiPickerLoading,
	Empty: EmojiPickerEmpty,
	List: EmojiPickerList,
};

export { EmojiPicker };
