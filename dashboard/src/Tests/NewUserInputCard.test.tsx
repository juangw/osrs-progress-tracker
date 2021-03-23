import { render, screen, fireEvent } from "@testing-library/react";
import NewUserInputCard from "../Components/NewUserInputCard";
import TextField from "@material-ui/core/TextField";


it("Component loads with no initial username in text box", () => {
    render(<NewUserInputCard />);

    const username = screen.getByLabelText(/Username/i)

    expect(username).toHaveTextContent("")
});

it("Component loads with inputted username in text box", () => {
    render(<NewUserInputCard />);

    const username = screen.getByLabelText(/Username/i);

    // Enter in a new username
    fireEvent.change(username, { target: { value: "TestAcc" } })
    fireEvent.keyDown(username, { key: "Enter" })

    expect(username.value).toBe("TestAcc")
});
  