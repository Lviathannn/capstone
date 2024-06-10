"use client";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "@/lib/store.js";
import { PersistGate } from "redux-persist/integration/react";
<<<<<<< HEAD
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from "react-query";
=======
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


>>>>>>> f234909 (feat: manage route page (get route data))

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
<<<<<<< HEAD
      <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} client={queryClient}/>
=======
        <QueryClientProvider client={queryClient}>
          <App />
>>>>>>> f234909 (feat: manage route page (get route data))
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);