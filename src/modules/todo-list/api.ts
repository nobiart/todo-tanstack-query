import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../../shared/api/apiInstance.ts";

export type TodoDto = {
  id: string;
  text: string;
  done: boolean;
  userId: string;
};

export type PaginatedResult<T> = {
  data: T[];
  first: number | null;
  items: number;
  last: number | null;
  next: number | null;
  pages: number;
  prev: number | null;
};

export const todoListApi = {
  baseKey: "tasks",
  getTodoListQueryOptions: ({ userId }: { userId: string }) => {
    return queryOptions({
      queryKey: [todoListApi.baseKey, "list", userId],
      queryFn: (meta) =>
        jsonApiInstance<TodoDto[]>(`/tasks?userId=${userId}`, {
          signal: meta.signal,
        }),
    });
  },

  getTodoListInfinityQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: [todoListApi.baseKey, "list"],
      queryFn: (meta) =>
        jsonApiInstance<PaginatedResult<TodoDto>>(
          `/tasks?_page=${meta.pageParam}&_per_page=10`,
          {
            signal: meta.signal,
          },
        ),
      initialPageParam: 1,
      getNextPageParam: (result) => result.next,
      select: (result) => result.pages.flatMap((page) => page.data),
    });
  },

  createTodo: (data: TodoDto) => {
    return jsonApiInstance<TodoDto>("/tasks", {
      method: "POST",
      json: data,
    });
  },

  updateTodo: (data: Partial<TodoDto> & { id: string }) => {
    return jsonApiInstance<TodoDto>(`/tasks/${data.id}`, {
      method: "PATCH",
      json: data,
    });
  },

  deleteTodo: (id: string) => {
    return jsonApiInstance(`/tasks/${id}`, {
      method: "DELETE",
    });
  },
};
