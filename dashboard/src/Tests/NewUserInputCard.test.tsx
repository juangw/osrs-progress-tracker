import React from "react";
import { render, screen } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";
import NewUserInputCard from "../Components/NewUserInputCard";
import assert from "assert";


it("Component loads with no initial username in text box", () => {
    render(<NewUserInputCard />);

    const username = screen.getByLabelText(/Username/i);

    assert(username.textContent === "");
});

it("Component loads with inputted username in text box", () => {
    render(<NewUserInputCard />);

    let username = screen.getByLabelText(/Username/i);
    const button = screen.getByText(/Submit/i);

    // Enter in a new username
    fireEvent.type(username, "TestAcc");
    fireEvent.click(button);

    assert(username, "TestAcc");
});
