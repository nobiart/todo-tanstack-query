import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";
import { FormEvent } from "react";
import { nanoid } from "nanoid";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    // onSuccess() {
    //   queryClient.invalidateQueries(todoListApi.getTodoListQueryOptions());
    // },
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] });
    },
  });

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const text = String(formData.get("text") ?? "");

    createTodoMutation.mutate(
      {
        id: nanoid(),
        text,
        done: false,
        userId: "1",
      },
      // {
      //   onSuccess: () =>
      //     queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] }),
      //   // queryClient.invalidateQueries(todoListApi.getTodoListQueryOptions())
      // },
    );

    e.currentTarget.reset();
  };

  return { handleCreate, isPending: createTodoMutation.isPending };
};
