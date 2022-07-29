import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { HomePage } from "../Components/HomePage";
import assert from "assert";


it("Renders without crashing", () => {
  const div = document.createElement("div");
  const queryClient = new QueryClient();
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Renders title text", () => {
  const div = document.createElement("div");
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );
  const linkElement = screen.getByText(/Welcome to the Old School Runescape Progress Tracker/i);
  assert(linkElement.textContent?.includes("Welcome to the Old School Runescape Progress Tracker"));
});

it("Component loads with no initial username in text box", () => {
  const div = document.createElement("div");
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );

  const username = screen.getByLabelText(/Username/i);

  assert(username.textContent === "");
});

it("Component loads with inputted username in text box", () => {
  const div = document.createElement("div");
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );

  let username = screen.getByLabelText(/Username/i);
  const button = screen.getByRole("button", /Submit/i);

  // Enter in a new username
  fireEvent.type(username, "TestAcc");
  fireEvent.click(button);

  assert(username, "TestAcc");
});
