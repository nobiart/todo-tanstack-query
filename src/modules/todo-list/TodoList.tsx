import { useTodoList } from "./useTodoList.tsx";

export const TodoList = () => {
  const { error, isLoading, todoItems, cursor } = useTodoList();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="my-10 px-5 mx-auto max-w-[1200]">
      <h1 className="text-3xl font-bold mb-5">To Do List</h1>
      <div className="flex flex-col gap-4">
        {todoItems?.map((todo) => (
          <div key={todo.id} className="p-3 border border-slate-500 rounded-md">
            {todo.text}
          </div>
        ))}
      </div>
      {cursor}
    </div>
  );
};
