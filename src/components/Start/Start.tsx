import { Button, Select } from "antd";
import { COUNT_CARDS_OPTIONS } from "../../constants/COUNT_CARDS_OPTIONS.ts";
import { useGamesStore } from "../../stores/useGameStore.ts";
import { Step } from "../../types/Step.ts";
import { DEFAULT_CARDS_COUNT } from "../../constants/DEFAULT_CARDS_COUNT.ts";
import { GameStatus } from "../../types/GameStatus.ts";

export function Start() {
  const { maxCardsCount, setCurrentStep, setGameStatus, setMaxCardsCount } =
    useGamesStore();

  const startGame = () => {
    setCurrentStep(Step.GAME);
    setGameStatus(GameStatus.ACTIVE);
  };

  return (
    <div className={"start"}>
      <h1 className={"start-title"}>Memory Box Game</h1>

      <Select
        labelInValue
        labelRender={({ value }) => <div>Cards count: {value}</div>}
        defaultValue={COUNT_CARDS_OPTIONS[DEFAULT_CARDS_COUNT]}
        placeholder={"Select count cards"}
        className={"start-select__count"}
        onChange={({ value }) => setMaxCardsCount(value)}
        value={COUNT_CARDS_OPTIONS.find((elem) => elem.value === maxCardsCount)}
        options={COUNT_CARDS_OPTIONS}
      />

      <Button className={"start-btn"} type="primary" onClick={startGame} block>
        Start game
      </Button>
    </div>
  );
}
