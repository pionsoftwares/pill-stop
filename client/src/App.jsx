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
import { SocketProvider } from "./context/SocketContext";
import { ScrollProvider } from "./context/ScrollContext";

function App() {
  return (
    <Provider store={store}>
      <SocketProvider>
        <ScrollProvider>
          <Toaster
            richColors
            closeButton
            position="top-center"
            visibleToasts={1}
            expand={false}
          />
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
        </ScrollProvider>
      </SocketProvider>
    </Provider>
  );
}

export default App;
