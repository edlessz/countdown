import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

const TickContext = createContext<number>(0);

export function TickProvider({ children }: { children: ReactNode }) {
	const [tick, setTick] = useState(0);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		const doTick = () => {
			setTick((t) => t + 1);
			const delay = 1000 - (Date.now() % 1000);
			timeoutRef.current = setTimeout(doTick, delay);
		};

		const firstDelay = 1000 - (Date.now() % 1000);
		timeoutRef.current = setTimeout(doTick, firstDelay);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return <TickContext.Provider value={tick}>{children}</TickContext.Provider>;
}

export function useTick() {
	return useContext(TickContext);
}
