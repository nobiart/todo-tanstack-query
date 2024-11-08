import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";
import { useState } from "react";

export const TodoList = () => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isPlaceholderData } = useQuery({
    queryKey: ["tasks", "list", { page }],
    queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="my-10 px-5 mx-auto max-w-[1200]">
      <h1 className="text-3xl font-bold mb-5">To Do List</h1>
      <div
        className={
          "flex flex-col gap-4" + (isPlaceholderData ? " opacity-50" : "")
        }
      >
        {data?.data.map((todo) => (
          <div key={todo.id} className="p-3 border border-slate-500 rounded-md">
            {todo.text}
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-5">
        <button
          className="px-3 py-2 rounded-md border border-orange-400"
          onClick={() => setPage(Math.max(page - 1, 1))}
        >
          Prev
        </button>
        <button
          className="px-3 py-2 rounded-md border border-orange-400"
          onClick={() => setPage(Math.min(page + 1, data?.items))}
        >
          Next
        </button>
      </div>
    </div>
  );
};
