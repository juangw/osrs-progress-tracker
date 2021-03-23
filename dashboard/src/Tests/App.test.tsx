import { render, screen } from "@testing-library/react";
import ReactDOM from "react-dom";
import App from "../App";


it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Renders title text", () => {
  render(<App />);
  const linkElement = screen.getByText(/Old School Runescape Progress Tracker/i);
  expect(linkElement).toBeInTheDocument();
});
