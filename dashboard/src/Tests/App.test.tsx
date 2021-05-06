import { render, screen } from "@testing-library/react";
import assert from "assert";
import React from "react";
import ReactDOM from "react-dom";
import AppEntry from "../AppEntry";


it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AppEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Renders title text", () => {
  render(<AppEntry />);
  const linkElement = screen.getByText(/Old School Runescape Progress Tracker/i);
  assert(linkElement.textContent?.includes("Old School Runescape Progress Tracker"));
});
