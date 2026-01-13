import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { TickProvider } from "@/hooks/useTick.tsx";
import App from "./App.tsx";

const root = document.querySelector("#root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
	<StrictMode>
		<ThemeProvider>
			<TickProvider>
				<App />
			</TickProvider>
		</ThemeProvider>
	</StrictMode>,
);
