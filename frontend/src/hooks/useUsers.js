import { useQuery } from "@tanstack/react-query";
import users from "../api/users.js";

export function useUserMe() {
  return useQuery({
    queryKey: ["user-me"],
    queryFn: users.userMe,
  });
}

export function useUserById(userId) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => users.getUser(userId),
    enabled: !!userId,
  });
}
