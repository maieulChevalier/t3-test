import {
  HomeIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRouter } from "next/router";
import LayoutNavbarBottomButton from "./LayoutNavbarBottomButton";

export default function LayoutNavbarTopGoBack({ children }: any) {
  const router = useRouter();
  return (
    <>
      <main>{children}</main>
      <nav
        className="fixed top-0 left-0 right-0 flex justify-around border-t p-3"
        aria-label="Navbar"
      >
        <LayoutNavbarBottomButton
          icon={
            <HomeIcon
              className={clsx(router.pathname === "/" && "stroke-slate-500")}
            />
          }
          onClick={() => router.push("/")}
        />
        <LayoutNavbarBottomButton
          icon={
            <PlusCircleIcon
              className={clsx(
                router.pathname.includes("/create") && "stroke-slate-500"
              )}
            />
          }
          onClick={() => router.push("/create")}
        />
        <LayoutNavbarBottomButton
          icon={
            <UserIcon
              className={clsx(
                router.pathname.includes("/me") && "stroke-slate-500"
              )}
            />
          }
          onClick={() => router.push("/me")}
        />
      </nav>{" "}
    </>
  );
}
