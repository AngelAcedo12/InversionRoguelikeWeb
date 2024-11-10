"use client";
import { KeyBindsController } from "@/core/controllers/KeyBindsController";
import { TimeController } from "@/core/controllers/TimeController";
import { usePlayer } from "@/hooks/usePlayer";
import { createContext, useContext, useEffect, useMemo } from "react";

interface GameContextInterface {
  player: ReturnType<typeof usePlayer>;
}

const GameContext = createContext<GameContextInterface>({
  player: {} as unknown as ReturnType<typeof usePlayer>,
});

export function GameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const player = usePlayer();
  const timeController = TimeController.getInstance();

  useEffect(() => {
    console.log("GameContextProvider");
    timeController.start();
    KeyBindsController.bindKeys();
  }, []);

  const memo = useMemo(() => {
    return {
      player,
      timeController,
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
