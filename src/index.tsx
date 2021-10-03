import React from "react";
import ReactDOM from "react-dom";

// eslint-disable-next-line no-console
console.log(
  "%c BALU WAS HERE",
  "color: #FFFFFF; font-style: bold; background-color: #000000;padding: 20px"
);

const Root = (): JSX.Element => {
  return (
    <h1> Hello World </h1>
  );
};

ReactDOM.render(<Root />, document.getElementById("app"));
