import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import Spinner from "./Spinner";

export default function Layout({ children }: any) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" || session === null) {
      Router.push("/auth/signin");
    }
    if (status === "authenticated" && !session?.user?.role) {
      Router.push("/auth/user-info");
    }
    if (status === "authenticated" && session?.user?.role === "nameSet") {
      Router.push("/");
    }
    return;
  }, [status, session]);

  if (status === "loading") {
    return <Spinner />;
  }
  return (
    <>
      <main>{children}</main>
    </>
  );
}
