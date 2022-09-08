import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import clsx from "clsx";
import LayoutNavbarBottom from "@/components/LayoutNavbarBottom";

const navigation = [
  {
    name: "Account",
    url: "/me/account",
    icon: HomeIcon,
    // current: true,
  },
  // {
  //   name: "Projects",
  //   url: "/projects",
  //   icon: FolderIcon,
  // },
  // {
  //   name: "Calendar",
  //   url: "/calendar",
  //   icon: CalendarIcon,
  // },
  // { name: "Documents", url: "/documents", icon: InboxIcon },
  // { name: "Reports", url: "/reports", icon: ChartBarIcon },
  { name: "Log out", url: "/auth/logout", icon: UsersIcon, onClick: signOut },
];

const User: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <>
      <br />
      <p className="px-4 text-2xl font-semibold">{session?.user?.name}</p>
      <br />
      <nav
        className=" flex flex-col justify-center space-y-1 px-4"
        aria-label="Sidebar"
      >
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() =>
              item.onClick ? item.onClick() : router.push(item.url)
            }
            className={clsx(
              "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              "flex items-center rounded-md px-3 py-3 text-sm font-medium"
            )}
          >
            <item.icon
              className={clsx(
                "text-gray-400",
                "-ml-1 mr-4 h-6 w-6 flex-shrink-0"
              )}
              aria-hidden="true"
            />
            <span className="truncate text-xl">{item.name}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

User.getLayout = function getLayout(page: ReactElement) {
  return <LayoutNavbarBottom>{page}</LayoutNavbarBottom>;
};

export default User;
