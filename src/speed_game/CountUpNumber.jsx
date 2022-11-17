import React from "react";
import CountUp from "react-countup";


export default function CountUpNumber(props) {
  return (
    <CountUp start={0} end={props.number} duration={1.0}  />
  );
}
