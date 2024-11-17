import { FormEvent } from "react";
import { useAppDispatch } from "../../shared/redux.ts";
import { createTodoThunk, useCreateLoading } from "./createTodoThunk.ts";

export const useCreateTodo = () => {
  const appDispatch = useAppDispatch();
  const isLoading = useCreateLoading();

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const text = String(formData.get("text") ?? "");

    await appDispatch(createTodoThunk(text));

    e.currentTarget.reset();
  };

  return { handleCreate, isLoading };
};
