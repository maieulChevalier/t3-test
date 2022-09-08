import { useSession } from "next-auth/react";
import SignIn from "./AuthSignIn";
import Spinner from "./LoaderPacman";
import SignInUserInfo from "./AuthSignInUserInfo";
import { useEffect, useState } from "react";

export default function LayoutApp({ children }: any) {
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

  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    console.log("helo");
    if (navigator.onLine) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  });

  if (isOnline) {
    if (status === "loading") {
      return <Spinner />;
    }
    if (status === "unauthenticated" || session === null) {
      return <SignIn />;
    }

    if (status === "authenticated" && session?.user?.role === null) {
      return <SignInUserInfo />;
    }
    if (status === "authenticated" && session?.user?.role === "nameSet") {
      return (
        <>
          <main>{children}</main>
        </>
      );
    }
  } else {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-2 text-center">
        <p className="text-2xl font-medium">No internet</p>
        <p className="text-base">
          Please check your internet connection and try again.
        </p>
      </div>
    );
  }

  return <Spinner />;
}
