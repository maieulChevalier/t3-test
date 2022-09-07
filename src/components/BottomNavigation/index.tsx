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
        icon={
          <HomeIcon
            className={clsx(router.pathname === "/" && "stroke-cyan-600")}
          />
        }
        onClick={() => router.push("/")}
      />
      <BottomNavigationButton
        icon={
          <PlusCircleIcon
            className={clsx(
              router.pathname.includes("/create") && "stroke-cyan-600"
            )}
          />
        }
        onClick={() => router.push("/create")}
      />
      <BottomNavigationButton
        icon={
          <UserIcon
            className={clsx(
              router.pathname.includes("/user") && "stroke-cyan-600"
            )}
          />
        }
        onClick={() => router.push("/user")}
      />
    </div>
  );
}
