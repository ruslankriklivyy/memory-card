import { COUNT_CARDS_OPTIONS } from "../../constants/COUNT_CARDS_OPTIONS.ts";
import { DEFAULT_CARDS_COUNT } from "../../constants/DEFAULT_CARDS_COUNT.ts";
import { Select } from "antd";
import { useGamesStore } from "../../stores/useGameStore.ts";

export function StartCountSelect() {
  const { maxCardsCount, setMaxCardsCount } = useGamesStore();

  return (
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
  );
}
