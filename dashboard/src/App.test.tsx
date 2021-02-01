import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders text", () => {
  render(<App />);
  const linkElement = screen.getByText(/Old School Runescape Progress Tracker/i);
  expect(linkElement).toBeInTheDocument();
});
