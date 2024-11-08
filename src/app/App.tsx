import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/queryClient.ts";
import { TodoList } from "../modules/todo-list/TodoList.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
