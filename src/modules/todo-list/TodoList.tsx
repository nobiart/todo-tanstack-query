import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";

export const TodoList = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["tasks", "list"],
    queryFn: todoListApi.getTodoList,
  });

  if (isPending) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div>
      To Do List
      {data.map((todo) => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
};
