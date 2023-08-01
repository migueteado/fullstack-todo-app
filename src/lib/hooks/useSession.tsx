import useStore from "@/store";
import { useEffect } from "react";
import { apiGetAuthUser } from "../api";
import { ErrorResponse, UserResponse } from "../types";

export default function useSession() {
  const store = useStore();

  async function fetchUser() {
    try {
      const result = await apiGetAuthUser();
      if (result.status === "success") {
        store.setAuthUser((result as UserResponse).data.user);
      } else {
        throw new Error((result as ErrorResponse).message);
      }
    } catch (error: any) {
      store.reset();
    }
  }

  useEffect(() => {
    if (!store.authUser) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return store.authUser;
}
