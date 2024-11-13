"use client";
import LinearGraph from "@/components/linearGraphLanding";

import { VfxSoundController } from "@/core/controllers/VfxController";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <div className="flex items-center flex-col justify-center h-[100dvh]">
      <h1 className="text-4xl font-bold text-blue-500 ">
        Bienvenidos a Inversion Roguelike
      </h1>
      <p className="mt-2">
        El juego esta en desarrollo, por favor vuelva mas tarde.
      </p>
      <LinearGraph />
      <Link
        className="mt-4 bg-blue-500 text-white p-2 rounded-md"
        href={"/game"}
      
      >
        Empezar a jugar 🤑🤑
      </Link>

      <div className="absolute " id="icons"></div>
    </div>
  );
}
