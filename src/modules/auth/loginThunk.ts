import { AppThunk } from "../../shared/redux.ts";
import { MutationObserver, useMutation } from "@tanstack/react-query";
import { queryClient } from "../../shared/api/queryClient.ts";
import { authApi } from "./api.ts";
import { authSlice } from "./auth.slice.ts";

export const loginThunk =
  (login: string, password: string): AppThunk =>
  async (dispatch) => {
    const user = await new MutationObserver(queryClient, {
      mutationKey: ["login"],
      mutationFn: authApi.loginUser,
    }).mutate({
      login,
      password,
    });

    if (user) {
      dispatch(
        authSlice.actions.addUser({
          userId: user.id,
        }),
      );

      queryClient.setQueryData(authApi.getUserById(user.id).queryKey, user);
      localStorage.setItem("userId", user.id);
    }

    dispatch(authSlice.actions.setError("Incorrect Login or Password"));
  };

// @TODO not working
export const useLoginLoading = () =>
  useMutation({
    mutationKey: ["login"],
  }).isPending;
