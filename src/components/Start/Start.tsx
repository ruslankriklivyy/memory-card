import { Button } from "antd";
import { useGamesStore } from "../../stores/useGameStore.ts";
import { GameStatus } from "../../types/GameStatus.ts";
import { useNavigate } from "react-router";
import { StartCountSelect } from "./StartCountSelect.tsx";

export function Start() {
  const { setGameStatus } = useGamesStore();
  const navigate = useNavigate();

  const startGame = () => {
    setGameStatus(GameStatus.ACTIVE);
    navigate("game");
  };

  return (
    <div className={"start"}>
      <h1 className={"start-title"}>Memory Box Game</h1>

      <StartCountSelect />

      <Button className={"start-btn"} type="primary" onClick={startGame} block>
        Start game
      </Button>
    </div>
  );
}
