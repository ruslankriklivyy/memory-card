import "./App.css";
import "../src/styles/index.scss";
import { Snowfall } from "react-snowfall";
import { BrowserRouter, Route, Routes } from "react-router";
import { StartPage } from "./pages/StartPage.tsx";
import { GamePage } from "./pages/GamePage.tsx";
import { MainLayout } from "./layouts/MainLayout.tsx";

function App() {
  return (
    <>
      <Snowfall style={{ zIndex: 5 }} />

      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<MainLayout />}>
            <Route index element={<StartPage />}></Route>

            <Route path={"game"} element={<GamePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
