import React, { useState } from "react";
import {
  HomeIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import BottomNavigationButton from "./BottomNavigationButton";

export default function BottomNavigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around border-t p-3">
      <BottomNavigationButton icon={<HomeIcon />} />
      <BottomNavigationButton icon={<PlusCircleIcon />} />
      <BottomNavigationButton icon={<UserIcon />} />
    </div>
  );
}
