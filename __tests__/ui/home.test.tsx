/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Home from "../../app/page";

describe("Home component render correctly", () => {
  it("should render Home component", () => {
    render(<Home />);
    expect(Home).toBeTruthy();
  });
});
