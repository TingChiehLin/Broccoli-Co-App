/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Home from "../../app/page";

describe("Home component render correctly", () => {
  it("should render Home component", () => {
    render(<Home />);
    expect(Home).toBeTruthy();
  });

  it("should render Request an invite if the button is clicked", () => {
    render(<Home />);

    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    const titleElement = screen.getByText("Request an invite");
    expect(titleElement).toBeInTheDocument();
  });
});

describe("Form render", () => {
  it('does not see "Full Name is require" if the button was clicked', () => {
    render(<Home />);
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    const outElement = screen.queryByText("Full Name is require", {
      exact: false,
    });
    expect(outElement).toBeNull();
  });
});
