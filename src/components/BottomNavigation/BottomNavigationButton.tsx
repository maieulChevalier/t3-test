import { HomeIcon } from "@heroicons/react/24/outline";
import React, { createElement, ReactNode } from "react";

export default function BottomNavigationButton({ icon }: { icon: ReactNode }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center outline-none hover:text-cyan-600 focus:text-cyan-600"
    >
      <div className="h-6 w-6">{icon}</div>
    </button>
  );
}
