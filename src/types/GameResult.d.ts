import { GameStatus } from "./GameStatus.ts";

export interface GameResult {
  status: GameStatus;
  timeSpent: number;
}
