import { create } from "zustand";

import { Step } from "../types/Step.ts";
import { DEFAULT_CARDS_COUNT } from "../constants/DEFAULT_CARDS_COUNT.ts";
import { GameStatus } from "../types/GameStatus.ts";
import { GameResult } from "../types/GameResult";

interface UseGamesStoreState {
  gameResult: GameResult | null;
  gameStatus: GameStatus;
  maxCardsCount: number;
  gameTime: number;
  currentStep: Step;
}

interface UseGamesStoreAction {
  setGameResult: (gameResult: GameResult | null) => void;
  setGameStatus: (gameStatus: GameStatus) => void;
  setMaxCardsCount: (maxCardsCount: number) => void;
  setGameTime: (gameTime: number) => void;
  setCurrentStep: (step: Step) => void;
}

export const useGamesStore = create<UseGamesStoreState & UseGamesStoreAction>(
  (set) => ({
    gameResult: null,
    gameStatus: GameStatus.START,
    maxCardsCount: DEFAULT_CARDS_COUNT,
    gameTime: 0,
    currentStep: Step.START,

    setGameResult: (gameResult) => set(() => ({ gameResult })),
    setGameStatus: (gameStatus) => set(() => ({ gameStatus })),
    setMaxCardsCount: (maxCardsCount) =>
      set(() => ({
        maxCardsCount,
      })),
    setGameTime: (gameTime) => set(() => ({ gameTime })),
    setCurrentStep: (currentStep: Step) =>
      set(() => ({
        currentStep,
      })),
  }),
);
