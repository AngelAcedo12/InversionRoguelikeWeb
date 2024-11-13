"use client";
import { KeyBindsController } from "@/core/controllers/KeyBindsController";
import { MusicController } from "@/core/controllers/MusicController";
import { TimeController } from "@/core/controllers/TimeController";
import { usePlayer } from "@/hooks/usePlayer";
import { createContext, useContext, useEffect, useMemo } from "react";

interface GameContextInterface {
  player: ReturnType<typeof usePlayer>;
  handleStartButtonClick: () => void;
}

const GameContext = createContext<GameContextInterface>({
  player: {} as unknown as ReturnType<typeof usePlayer>,
  handleStartButtonClick: () => {},
});

export function GameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const player = usePlayer();
  const timeController = TimeController.getInstance();

  const startGame = (() => {
    let executed = false;

    return () => {
      if (!executed) {
        executed = true;
        console.log("Game started");
        // Add logic to initialize game state, controllers, etc.
        timeController.start();
        KeyBindsController.bindKeys();
      }
    };
  })();

  const handleStartButtonClick = () => {
    startGame();
  };
  useEffect(() => {
    console.log("GameContextProvider");
  }, []);

  const memo = useMemo(() => {
    return {
      player,
      handleStartButtonClick,
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
