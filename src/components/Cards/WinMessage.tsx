import winIcon from "../../assets/win.svg";

export function WinMessage() {
  return (
    <div className={"cards__win"}>
      <h2>You win! Congratulations. </h2>

      <img src={winIcon} alt={"WIN"} />
    </div>
  );
}
