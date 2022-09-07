import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import Spinner from "@/components/Spinner";
import Redirect from "../hooks/useRedirect";
import useRedirect from "../hooks/useRedirect";

export default function BottomNavigationLayout({ children }: any) {
  return (
    <>
      <main>{children}</main>
      <BottomNavigation />
    </>
  );
}
