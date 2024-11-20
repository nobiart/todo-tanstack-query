import { TodoList } from "../modules/todo-list/TodoList.tsx";
import { useUser } from "../modules/auth/useUser.ts";
import { Login } from "../modules/auth/Login.tsx";
import { LogoutButton } from "../modules/auth/LogoutButton.tsx";
import { prefetchTodoList } from "../modules/todo-list/prefetchTodoList.ts";

export function App() {
  const user = useUser();

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (user.data) {
    prefetchTodoList();

    return (
      <>
        <LogoutButton />
        <TodoList />
      </>
    );
  }

  return <Login />;
}
