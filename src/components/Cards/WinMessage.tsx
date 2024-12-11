import winIcon from "../../assets/win.svg";
import { useGamesStore } from "../../stores/useGameStore.ts";
import { useMemo } from "react";
import { getFormattedTime } from "../../helpers/getFormattedTime.ts";

export function WinMessage() {
  const { gameTime } = useGamesStore();

  const formattedTime = useMemo(() => getFormattedTime(gameTime), [gameTime]);

  return (
    <div className={"cards__win"}>
      <h2>You win! Congratulations. </h2>

      <p>Your time spent: {formattedTime}</p>

      <img src={winIcon} alt={"WIN"} />
    </div>
  );
}
