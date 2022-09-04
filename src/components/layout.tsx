import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Spinner from "./Spinner";

export default function Layout({ children }: any) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || session === null) {
      router.push("/auth/signin");
    }
    if (status === "authenticated" && !session?.user?.role) {
      router.push("/auth/user-info");
    }
    if (status === "authenticated" && session?.user?.role === "nameSet") {
      router.push("/");
    }
    return;
  }, [status, session]);

  if (status === "loading") {
    return <Spinner />;
  }
  return (
    <>
      <div>{children}</div>
    </>
  );
}
