import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

export const useSignOut = () => {
  const router = useRouter();
  const { signOut } = useAuthActions();

  return async () => {
    await signOut();
    router.replace("/login");
  };
};
