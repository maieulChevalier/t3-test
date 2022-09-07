import React from "react";
import {
  HomeIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import BottomNavigationButton from "./BottomNavigationButton";
import { useRouter } from "next/router";
import clsx from "clsx";

export default function BottomNavigation() {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around border-t p-3">
      <BottomNavigationButton
        icon={<HomeIcon />}
        onClick={() => router.push("/")}
        className={clsx(router.pathname === "/" && "text-cyan-600")}
      />
      <BottomNavigationButton
        icon={<PlusCircleIcon />}
        onClick={() => router.push("/create")}
        className={clsx(router.pathname.includes("/create") && "text-cyan-600")}
      />
      <BottomNavigationButton
        icon={<UserIcon />}
        onClick={() => router.push("/user")}
        className={clsx(router.pathname.includes("/user") && "text-cyan-600")}
      />
    </div>
  );
}
