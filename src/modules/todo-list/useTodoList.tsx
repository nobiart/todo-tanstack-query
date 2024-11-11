import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";

export const useTodoList = () => {
  const {
    data: todoItems,
    error,
    isLoading,
  } = useQuery({
    ...todoListApi.getTodoListQueryOptions(),
    select: (data) => data.toReversed(),
  });

  return { error, todoItems, isLoading };
};
