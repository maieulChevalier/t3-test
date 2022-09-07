import useRedirect from "@/hooks/useRedirect";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

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
  const { isRedirecting, status } = useRedirect();

  if (isRedirecting && status === "loading") {
    return <Spinner />;
  }
  return (
    <>
      <main>{children}</main>
    </>
  );
}
