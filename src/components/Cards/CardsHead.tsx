import { Back } from "../UI/Back.tsx";
import { Timer } from "./Timer.tsx";
import { StartCountSelect } from "../Start/StartCountSelect.tsx";

export function CardsHead() {
  return (
    <div className={"cards-head"}>
      <Back />

      <Timer />

      <StartCountSelect />
    </div>
  );
}
