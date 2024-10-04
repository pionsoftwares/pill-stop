import { Box } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { router } from "./routes/router";
import ProvidesTheme from "./theme/ProvidesTheme";
import { Provider } from "react-redux";
import store from "./app/store";
import { Toaster } from "sonner";
import ConfirmProvider from "./context/ConfirmContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import ReasonProvider from "./context/ReasonContext";

function App() {
	return (
		<Provider store={store}>
			<Toaster richColors closeButton position="top-center" visibleToasts={1} expand={false} />
			<Box className="app">
				<ProvidesTheme>
					<ReasonProvider>
						<ConfirmProvider>
							<LocalizationProvider dateAdapter={AdapterMoment}>
								<RouterProvider router={router}></RouterProvider>
							</LocalizationProvider>
						</ConfirmProvider>
					</ReasonProvider>
				</ProvidesTheme>
			</Box>
		</Provider>
	);
}

export default App;
