import "./App.css";
import "../src/styles/cards.scss";
import "../src/styles/modal.scss";
import "../src/styles/timer.scss";
import "../src/styles/start.scss";
import { Snowfall } from "react-snowfall";
import { Start } from "./components/Start/Start.tsx";
import { useGamesStore } from "./stores/useGameStore.ts";
import { Step } from "./types/Step.ts";
import { Cards } from "./components/Cards/Cards.tsx";

function App() {
  const { currentStep } = useGamesStore();

  return (
    <>
      <Snowfall style={{ zIndex: 5 }} />

      {currentStep === Step.GAME && <Cards />}

      {currentStep === Step.START && <Start />}
    </>
  );
}

export default App;
