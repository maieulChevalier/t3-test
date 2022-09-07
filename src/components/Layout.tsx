import useRedirect from "@/hooks/useRedirect";
import { authorizationsAtom } from "@/jotai";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SignIn from "./SignIn";
import Spinner from "./Spinner";
import UserInfo from "./UserInfo";

export default function Layout({ children }: any) {
  // ALLOWS DISPLAYING A SPINNER WHEN TRANSITIONNING TO ANOTHER PAGE, COULD BE USED TO SHOW ANOTHER TRANSITION UI
  // const router = useRouter();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const handleStart = (url: String) =>
  //     url !== router.asPath && setLoading(true);
  //   const handleComplete = () => setLoading(false);
  //   const handleError = (url: String) =>
  //     url === router.asPath && setLoading(false);

  //   router.events.on("routeChangeStart", handleStart);
  //   router.events.on("routeChangeComplete", handleComplete);
  //   router.events.on("routeChangeError", handleError);

  //   return () => {
  //     router.events.off("routeChangeStart", handleStart);
  //     router.events.off("routeChangeComplete", handleComplete);
  //     router.events.off("routeChangeError", handleError);
  //   };
  // });

  // if (loading) {
  //   return <Spinner />;
  // }
  // const { isRedirecting, status } = useRedirect();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner />;
  }
  if (status === "unauthenticated" || session === null) {
    return <SignIn />;
  }

  if (status === "authenticated" && session?.user?.role === null) {
    return <UserInfo />;
  }

  if (status === "authenticated" && session?.user?.role === "nameSet") {
    return (
      <>
        <main>{children}</main>
      </>
    );
  }

  return <Spinner />;
}
