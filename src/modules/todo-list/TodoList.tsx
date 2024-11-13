import { useTodoList } from "./useTodoList.tsx";
import { useCreateTodo } from "./useCreateTodo.ts";
import { useDeleteTodo } from "./useDeleteTodo.ts";
import { useToggleTodo } from "./useToggleTodo.ts";

export const TodoList = () => {
  const { error, isLoading, todoItems } = useTodoList();
  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const { toggleTodo } = useToggleTodo();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="my-10 px-5 mx-auto max-w-[1200]">
      <h1 className="text-3xl font-bold mb-5">To Do List</h1>

      <form className="flex gap-2 mb-5" onSubmit={createTodo.handleCreate}>
        <input
          className="rounded p-2 border border-orange-500"
          type="text"
          name="text"
        />
        <button
          disabled={createTodo.isPending}
          className="rounded p-2 border border-orange-500 bg-orange-500 text-white disabled:opacity-50"
        >
          Add
        </button>
      </form>

      <div className="flex flex-col gap-4">
        {todoItems?.map((todo) => (
          <div
            key={todo.id}
            className="p-3 flex justify-between border border-slate-500 rounded-md"
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id, todo.done)}
            />
            {todo.text}
            <button
              className="text-rose-500 disabled:opacity-50"
              disabled={deleteTodo.getIsPending(todo.id)}
              onClick={() => deleteTodo.handleDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-5"></div>
    </div>
  );
};
