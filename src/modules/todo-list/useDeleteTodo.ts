import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    async onSettled() {
      await queryClient.invalidateQueries(
        todoListApi.getTodoListQueryOptions(),
      );
    },
    async onSuccess(_, deletedId) {
      const todos = queryClient.getQueryData(
        todoListApi.getTodoListQueryOptions().queryKey,
      );

      if (todos) {
        queryClient.setQueryData(
          todoListApi.getTodoListQueryOptions().queryKey,
          todos.filter((t) => t.id !== deletedId),
        );
      }
    },
  });

  return {
    handleDelete: deleteTodoMutation.mutate,
    getIsPending: (id: string) =>
      deleteTodoMutation.isPending && deleteTodoMutation.variables === id,
  };
};
