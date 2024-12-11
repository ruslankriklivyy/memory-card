import { Outlet } from "react-router";

export function MainLayout() {
  return (
    <div className={"main-layout"}>
      <Outlet />
    </div>
  );
}
