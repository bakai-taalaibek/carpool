import { useDispatch } from "react-redux";
import { clearCredentials } from "./authSlice";

export function useLogout() {
  const dispatch = useDispatch();

  return () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expiresAt");

    dispatch(clearCredentials());
  };
}
