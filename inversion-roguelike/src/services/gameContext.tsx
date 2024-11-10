"use client";
import { usePlayer } from "@/hooks/usePlayer";
import { useTime } from "@/hooks/useTime";
import { createContext, useContext, useMemo } from "react";

interface ContextInterface {
  player: ReturnType<typeof usePlayer>;
  time: ReturnType<typeof useTime>;
}

const GameContext = createContext<ContextInterface>({
  player: null as unknown as ReturnType<typeof usePlayer>,
  time: null as unknown as ReturnType<typeof useTime>,
});

export function GameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const player = usePlayer();
  const time = useTime();
  const memo = useMemo(() => {
    return {
      player,
      time,
    };
  }, [player]);

  return <GameContext.Provider value={memo}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const contex = useContext(GameContext);

  if (contex === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return contex;
}
