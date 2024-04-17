/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "./page"

describe('Page Exercise 2', () => {

    it("App Router: Works with Server Components", () => {
      render(<Page />);
      expect(screen.getByRole("heading")).toHaveTextContent("Exercise 2");
    });
    
    it("Render Range Component", () => {
      render(<Page />);
      const rangeComponent = screen.getByLabelText("Valor maximo");
      expect(rangeComponent).toBeInTheDocument();
      //screen.debug()
    });
      
  
  })
  
  
  