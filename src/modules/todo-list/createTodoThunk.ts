import { authSlice } from "../auth/auth.slice.ts";
import { queryClient } from "../../shared/api/queryClient.ts";
import { authApi } from "../auth/api.ts";
import { TodoDto, todoListApi } from "./api.ts";
import { nanoid } from "nanoid";
import { MutationObserver, useMutation } from "@tanstack/react-query";
import { AppThunk } from "../../shared/redux.ts";

export const createTodoThunk =
  (text: string): AppThunk =>
  async (_, getState) => {
    const userId = authSlice.selectors.userId(getState());
    if (!userId) {
      throw new Error("user not login");
    }

    const user = await queryClient.fetchQuery(authApi.getUserById(userId));
    const newTodo: TodoDto = {
      id: nanoid(),
      done: false,
      text: `${text}. Owner: ${user.login}`,
      userId,
    };
    queryClient.cancelQueries({
      queryKey: [todoListApi.baseKey],
    });
    const prevTasks = queryClient.getQueryData(
      todoListApi.getTodoListQueryOptions().queryKey,
    );
    queryClient.setQueryData(
      todoListApi.getTodoListQueryOptions().queryKey,
      (tasks) => [...(tasks ?? []), newTodo],
    );
    try {
      await new MutationObserver(queryClient, {
        mutationFn: todoListApi.createTodo,
      }).mutate(newTodo);
    } catch (e) {
      queryClient.setQueryData(
        todoListApi.getTodoListQueryOptions().queryKey,
        prevTasks,
      );
      console.log(e);
    } finally {
      queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey],
      });
    }
  };

// @TODO review it, why doesn't work
export const useCreateLoading = () =>
  useMutation({
    mutationKey: ["create-todo"],
  }).isPending;
