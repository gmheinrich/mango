import { render, screen, fireEvent } from "@testing-library/react";
import { Range } from "./range";

describe("Test Range Component", () => {
  it("renders with initial values correctly", () => {
    render(<Range min={0} max={100} />);
    expect(screen.getByLabelText("Valor minimo")).toHaveValue(0);
    expect(screen.getByLabelText("Valor maximo")).toHaveValue(100);
  });

  it("updates min value when input min field changes", () => {
    render(<Range min={0} max={100} />);
    
    const minInput = screen.getByLabelText("Valor minimo");
    fireEvent.change(minInput, { target: { value: 50 } });
    expect(minInput).toHaveValue(50);
  });
  
  it("updates max value when input max field changes", () => {
    render(<Range min={0} max={100} />);
    
    const maxInput = screen.getByLabelText("Valor maximo");
    fireEvent.change(maxInput, { target: { value: 75 } });
    expect(maxInput).toHaveValue(75);
  });

  it("change the minimum value when dragging the handle", () => {
    render(<Range min={5} max={100} />);
    
    // Drag the minimun handle
    const minHandle = screen.getByTestId("min-handle") as HTMLInputElement;
    fireEvent.mouseDown(minHandle);
    fireEvent.mouseMove(minHandle, { clientX: 25 });
    fireEvent.mouseUp(minHandle);

    const minValueInput = screen.getByLabelText("Valor minimo") as HTMLInputElement;
    expect(Number(minValueInput.value)).toBeGreaterThan(5);
  });

  it("updates max value when dragging the max handle", () => {
    render(<Range min={0} max={100} />);
    
    // Drag the max handle
    const maxHandle = screen.getByTestId("max-handle");
    fireEvent.mouseDown(maxHandle);
    fireEvent.mouseMove(maxHandle, { clientX: -25 });
    fireEvent.mouseUp(maxHandle);

    const minValueInput = screen.getByLabelText("Valor maximo") as HTMLInputElement;
    expect(Number(minValueInput.value)).toBeLessThan(100)
  });
});