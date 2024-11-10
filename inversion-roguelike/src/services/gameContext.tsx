import { usePlayer } from "@/hooks/usePlayer";
import { useMemo } from "react";
import { createContext } from "vm";

const GameContext = createContext({
  player: null as unknown as ReturnType<typeof usePlayer>,
});

export function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const player = usePlayer();

  const memo = useMemo(() => {
    return {
      player,
    };
  }, [player]);

  return (
    <GameContext.Provider value={{ memo }}>{children}</GameContext.Provider>
  );
}
