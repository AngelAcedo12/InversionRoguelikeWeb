"use client";
import { GameContextProvider } from "@/services/gameContext";
import React from "react";

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GameContextProvider>
      <section>{children}</section>
    </GameContextProvider>
  );
}
