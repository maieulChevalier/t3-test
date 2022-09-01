import Image from "next/image";
import React from "react";
// import { PacmanLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Image src="/pacman-loader.svg" height={50} width={50} />
    </div>
  );
}
