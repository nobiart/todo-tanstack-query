import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/queryClient.ts";
import { TodoList } from "../modules/todo-list/TodoList.tsx";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  );
}
