import { logoutThunk } from "./logoutThunk.ts";
import { useAppDispatch } from "../../shared/redux.ts";

export function LogoutButton() {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(logoutThunk())}
      className="border border-rose-500 p-3 rounded"
    >
      Logout
    </button>
  );
}
