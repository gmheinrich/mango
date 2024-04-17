/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "./page"


describe('Page Exercise 1', () => {

  it("Render Heading", () => {
      render(<Page />);
      expect(screen.getByRole("heading")).toHaveTextContent("Exercise 1");
  });
  
  it("Render Range Component", () => {
    render(<Page />);
    const rangeComponent = screen.getByRole("spinbutton", { name: "Valor minimo" });
    expect(rangeComponent).toBeInTheDocument();
    //screen.debug()
  });
    

})


