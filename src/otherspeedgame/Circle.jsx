import React from "react";
import style from "../otherspeedgame/css/Circle.module.css";
export default function Circle(props) {
  const { value, onClick, active, gamestart } = props;
  return (
    <div
      className={[style[`${active === value ? "active" : ""}`], style["circle"]].join(" ")}
      onClick={() => {
        if (gamestart) {
          onClick(value);
        }
      }}
    >
      cirlc
    </div>
  );
}