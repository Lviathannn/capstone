import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "@/lib/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
<<<<<<< HEAD
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/features/error/ErrorFallback.jsx";
import { BrowserRouter } from "react-router-dom";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: 3000,
    },
  },
});
=======

const queryClient = new QueryClient();
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} client={queryClient} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
