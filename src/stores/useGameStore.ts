import { create } from "zustand";

import { DEFAULT_CARDS_COUNT } from "../constants/DEFAULT_CARDS_COUNT.ts";
import { GameStatus } from "../types/GameStatus.ts";
import { GameResult } from "../types/GameResult";

interface UseGamesStoreState {
  gameResult: GameResult | null;
  gameStatus: GameStatus;
  maxCardsCount: number;
  gameTime: number;
}

interface UseGamesStoreAction {
  setGameResult: (gameResult: GameResult | null) => void;
  setGameStatus: (gameStatus: GameStatus) => void;
  setMaxCardsCount: (maxCardsCount: number) => void;
  setGameTime: (gameTime: number) => void;
}

export const useGamesStore = create<UseGamesStoreState & UseGamesStoreAction>(
  (set) => ({
    gameResult: null,
    gameStatus: GameStatus.START,
    maxCardsCount: DEFAULT_CARDS_COUNT,
    gameTime: 0,

    setGameResult: (gameResult) => set(() => ({ gameResult })),
    setGameStatus: (gameStatus) => set(() => ({ gameStatus })),
    setMaxCardsCount: (maxCardsCount) =>
      set((state) => {
        if (state.maxCardsCount !== maxCardsCount) {
          return {
            maxCardsCount,
            gameStatus: GameStatus.ACTIVE,
            gameTime: 0,
            gameResult: null,
          };
        }

        return {
          maxCardsCount,
        };
      }),
    setGameTime: (gameTime) => set(() => ({ gameTime })),
  }),
);
