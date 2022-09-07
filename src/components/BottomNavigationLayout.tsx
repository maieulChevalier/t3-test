import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import Spinner from "@/components/Spinner";
import Redirect from "../hooks/useRedirect";
import useRedirect from "../hooks/useRedirect";

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

  return (
    <>
      <main>{children}</main>
      <BottomNavigation />
    </>
  );
}
