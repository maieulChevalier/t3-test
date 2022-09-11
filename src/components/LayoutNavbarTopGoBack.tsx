import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export default function LayoutNavbarTopGoBack({ children }: any) {
  const router = useRouter();
  return (
    <>
      <main>{children}</main>
      <nav
        className="fixed top-0 left-0 right-0 flex items-center border-b p-3"
        aria-label="Navbar"
      >
        <button>
          <ChevronLeftIcon
            className="h-6 w-6 text-slate-900"
            onClick={() => router.back()}
          />
        </button>
      </nav>
    </>
  );
}
