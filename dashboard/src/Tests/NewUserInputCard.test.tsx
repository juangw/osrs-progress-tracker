import React from "react";
import { render, screen } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";
import { NewUserInputCard } from "../Components/NewUserInputCard";
import assert from "assert";

it("Renders title text", () => {
    render(
        <NewUserInputCard
            onStatusUpdate={() => console.log("test")}
            onAlertTextUpdate={() => console.log("test")}
        />
    );
    const linkElement = screen.getByText(/Welcome the OSRS Progress Tracker/i);
    assert(linkElement.textContent?.includes("Welcome the OSRS Progress Tracker"));
  });

it("Component loads with no initial username in text box", () => {
    render(
        <NewUserInputCard
            onStatusUpdate={() => console.log("test")}
            onAlertTextUpdate={() => console.log("test")}
        />
    );

    const username = screen.getByLabelText(/Username/i);

    assert(username.textContent === "");
});

it("Component loads with inputted username in text box", () => {
    render(
        <NewUserInputCard
            onStatusUpdate={() => console.log("test")}
            onAlertTextUpdate={() => console.log("test")}
        />
    );

    let username = screen.getByLabelText(/Username/i);
    const button = screen.getByText(/Submit/i);

    // Enter in a new username
    fireEvent.type(username, "TestAcc");
    fireEvent.click(button);

    assert(username, "TestAcc");
});
