import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

const TickContext = createContext<number>(0);

export function TickProvider({ children }: { children: ReactNode }) {
	const [tick, setTick] = useState(0);

	useEffect(() => {
		let cancelled = false;

		const doTick = () => {
			if (cancelled) return;

			setTick((t) => t + 1);

			const delay = 1000 - (Date.now() % 1000);
			setTimeout(doTick, delay);
		};

		const firstDelay = 1000 - (Date.now() % 1000);
		const timeout = setTimeout(doTick, firstDelay);

		return () => {
			cancelled = true;
			clearTimeout(timeout);
		};
	}, []);

	return <TickContext.Provider value={tick}>{children}</TickContext.Provider>;
}

export function useTick() {
	return useContext(TickContext);
}
