import { render, screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import { HomePage } from "../HomePage";


it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<HomePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
