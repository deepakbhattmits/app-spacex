import { FC } from "react";
import DarkModeToggle from "../DarkModeToggle";
const NavBar: FC = (): JSX.Element => (
  <nav className="nav__wrapper">
    <div className="nav__wrapper--left-content">
      <h1 className="app-name">App SpaceX !</h1>
    </div>
    <div className="nav__wrapper--right-content">
      <DarkModeToggle />
    </div>
  </nav>
);
export default NavBar;
