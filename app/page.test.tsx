/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "./page";

it("Render page", () => {
  render(<Page />);
  expect(screen.getByRole("heading")).toHaveTextContent("Hello");
});
