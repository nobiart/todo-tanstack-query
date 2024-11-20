import { authSlice } from "../auth/auth.slice.ts";
import { store } from "../../shared/redux.ts";
import { prefetchAuth } from "../auth/prefetch.ts";
import { todoListApi } from "./api.ts";
import { queryClient } from "../../shared/api/queryClient.ts";

export const prefetchTodoList = () => {
  const userId = authSlice.selectors.userId(store.getState());
  if (userId) {
    prefetchAuth();
    queryClient.prefetchQuery(
      todoListApi.getTodoListQueryOptions({ userId: userId }),
    );
    queryClient.prefetchQuery(
      todoListApi.getTodoListQueryOptions({ userId: "2" }),
    );
    queryClient.prefetchQuery(
      todoListApi.getTodoListQueryOptions({ userId: "3" }),
    );
  }
};
