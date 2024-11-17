import { queryClient } from "../../shared/api/queryClient.ts";
import { authSlice } from "./auth.slice.ts";
import { AppThunk } from "../../shared/redux.ts";

export const logoutThunk = (): AppThunk => async (dispatch) => {
  dispatch(authSlice.actions.removeUser());
  queryClient.removeQueries();
  localStorage.removeItem("userId");
};
