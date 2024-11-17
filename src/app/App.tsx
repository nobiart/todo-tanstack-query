import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/queryClient.ts";
import { TodoList } from "../modules/todo-list/TodoList.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "../shared/redux";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <TodoList />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
