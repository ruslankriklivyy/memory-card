import { useEffect, useMemo, useRef } from "react";
import dayjs from "dayjs";
import { useGamesStore } from "../../stores/useGameStore.ts";
import { GameStatus } from "../../types/GameStatus.ts";
import { getFormattedTime } from "../../helpers/getFormattedTime.ts";

export function Timer() {
  const { gameTime, gameStatus, maxCardsCount, setGameTime } = useGamesStore();
  const startTime = useRef(dayjs());

  const formattedTime = useMemo(() => getFormattedTime(gameTime), [gameTime]);

  useEffect(() => {
    let interval: number | null = null;

    console.log("gameStatus", gameStatus);

    if (gameStatus === GameStatus.ACTIVE) {
      startTime.current = dayjs();
      setGameTime(0);

      interval = window.setInterval(() => {
        const now = dayjs();
        const diff = now.diff(startTime.current, "second");
        setGameTime(diff);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [gameStatus, maxCardsCount, setGameTime]);

  return (
    <div className="timer">
      <div className="timer-value">{formattedTime}</div>
    </div>
  );
}
