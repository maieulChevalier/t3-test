import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import BottomNavigationLayout from "@/components/LayoutNavigationBottom";

import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const navigation = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: HomeIcon,
    current: true,
    count: "5",
  },
  { name: "Team", url: "/team", icon: UsersIcon, current: false },
  {
    name: "Projects",
    url: "/projects",
    icon: FolderIcon,
    current: false,
    count: "19",
  },
  {
    name: "Calendar",
    url: "/calendar",
    icon: CalendarIcon,
    current: false,
    count: "20+",
  },
  { name: "Documents", url: "/documents", icon: InboxIcon, current: false },
  { name: "Reports", url: "/reports", icon: ChartBarIcon, current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const User: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {navigation.map((item) => (
        <button
          key={item.name}
          onClick={() => router.push(item.url)}
          className={classNames(
            item.current
              ? "bg-gray-200 text-gray-900"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            "flex items-center rounded-md px-3 py-2 text-sm font-medium"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          <item.icon
            className={classNames(
              item.current ? "text-gray-500" : "text-gray-400",
              "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
            )}
            aria-hidden="true"
          />
          <span className="truncate">{item.name}</span>
          {item.count ? (
            <span
              className={classNames(
                item.current ? "bg-gray-50" : "bg-gray-200 text-gray-600",
                "ml-auto inline-block rounded-full py-0.5 px-3 text-xs"
              )}
            >
              {item.count}
            </span>
          ) : null}
        </button>
      ))}
    </nav>
  );
};

User.getLayout = function getLayout(page: ReactElement) {
  return <BottomNavigationLayout>{page}</BottomNavigationLayout>;
};

export default User;
