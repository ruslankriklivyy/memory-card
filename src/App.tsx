import "./App.css";
import { Cards } from "./components/Cards/Cards.tsx";
import "../src/styles/cards.scss";
import "../src/styles/modal.scss";
import { Snowfall } from "react-snowfall";

function App() {
  return (
    <>
      <Snowfall style={{ zIndex: 5 }} />

      <Cards />
    </>
  );
}

export default App;
