import Image from "next/image";
import React from "react";
// import { PacmanLoader } from "react-spinners";

export default function LoaderPacman() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Image src="/pacman-loader.svg" height={50} width={50} />
    </div>
  );
}
