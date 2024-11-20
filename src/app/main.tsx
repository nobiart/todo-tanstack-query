import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { queryClient } from "../shared/api/queryClient.ts";
import { Provider } from "react-redux";
import { store } from "../shared/redux.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { onlineManager } from "@tanstack/react-query";

onlineManager.setOnline(navigator.onLine);

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        // resume mutations after initial restore from localStorage was successful
        queryClient.resumePausedMutations().then(() => {
          queryClient.invalidateQueries();
        });
      }}
    >
      <Provider store={store}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </PersistQueryClientProvider>
  </StrictMode>,
);
