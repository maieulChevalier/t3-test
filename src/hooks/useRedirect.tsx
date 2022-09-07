import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useRedirect() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (navigator.onLine) {
      if (status === "unauthenticated" || session === null) {
        setIsRedirecting(true);
        router.push("/auth/signin");
      }
      if (status === "authenticated" && session?.user?.role === null) {
        setIsRedirecting(true);
        router.push("/auth/user-info");
      }
    }
  }, [status, session]);

  return { isRedirecting, status };
}
