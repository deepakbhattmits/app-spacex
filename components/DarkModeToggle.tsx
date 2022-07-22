/** @format */

import { FC, useEffect, useState } from "react";
import { Button, Tooltip } from "antd";
import MoonSVG from "../assets/icons/icon-moon.svg";
import SunSVG from "../assets/icons/icon-sun.svg";
const DarkModeToggle: FC = (): JSX.Element => {
  const [darkTheme, setDarkTheme] = useState<any>(undefined);

  // const handleToggle = (event) => {
  //   setDarkTheme(event.target.checked)
  // }
  const handleToggle = (event: any) => {
    setDarkTheme((prevState: any) => !prevState);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );
    // console.log('init', initialColorValue);

    setDarkTheme(initialColorValue === "dark");
  }, []);
  useEffect(() => {
    if (darkTheme !== undefined) {
      if (darkTheme) {
        document.documentElement.setAttribute("data-theme", "dark");
        window.localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        window.localStorage.setItem("theme", "light");
      }
    }
  }, [darkTheme]);

  return (
    <>
      {darkTheme !== undefined && (
        <>
          {/* <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            checked={darkTheme}
            onChange={handleToggle}
          />
          <label
            htmlFor="checkbox"
            className="label"
            title={t('theme', { mode: darkTheme ? 'light' : 'dark' })}
          >
            <MoonSVG className="icon icon-moon" />
            <SunSVG className="icon icon-sun" />
            <div className="ball" />
          </label> */}
          <Tooltip
            title={`Move to ${darkTheme ? "light" : "dark"}`}
            placement="bottom"
          >
            <Button
              className={`btn-theme ${darkTheme ? "dark" : "light"}`}
              onClick={handleToggle}
              shape="circle"
            >
              {darkTheme ? (
                <SunSVG className="icon icon-sun" />
              ) : (
                <MoonSVG className="icon icon-moon" />
              )}
            </Button>
          </Tooltip>
        </>
      )}
      <style>{`
        .checkbox {
          opacity: 0;
          position: absolute;
        }

        .label {
          width: 50px;
          height: 25px;
          background-image: linear-gradient(
            to right,
            var(--color-primary-light),
            var(--color-primary-dark)
          );
          display: flex;
          border-radius: 50px;
          align-items: center;
          justify-content: space-between;
          padding: 5px;
          position: relative;
          transform: scale(1.5);
        }

        .ball {
          width: 20px;
          height: 20px;
          background-color: white;
          position: absolute;
          top: 2px;
          left: 2px;
          border-radius: 50%;
          transition: transform 0.2s linear;
        }

        /*  target the elemenent after the label*/
        .checkbox:checked + .label .ball {
          transform: translateX(26px);
        }
      `}</style>
    </>
  );
};
export default DarkModeToggle;
