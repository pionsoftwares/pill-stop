import { Box } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { router } from "./routes/router";
import ProvidesTheme from "./theme/ProvidesTheme";
import { Provider } from "react-redux";
import store from "./app/store";
import { Toaster } from "sonner";
function App() {
	return (
		<Provider store={store}>
			<Toaster richColors closeButton position="top-center" visibleToasts={1} expand={false} />
			<Box className="app">
				<ProvidesTheme>
					<RouterProvider router={router}></RouterProvider>
				</ProvidesTheme>
			</Box>
		</Provider>
	);
}

export default App;
