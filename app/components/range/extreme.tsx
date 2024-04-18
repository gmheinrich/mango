import { ChangeEvent } from "react";

type Props = { 
  value: number, 
  onChange(e: ChangeEvent<HTMLInputElement>): void,
  disabled?: boolean,
  'aria-label'?: React.ComponentProps<'input'>['aria-label']
} 

export const ExtremeField: React.FC<Props> = (props) => { 
  const { value, onChange, disabled, "aria-label": ariaLabel } = props
  return (
    <>
      <input 
          type="number" 
          value={value} 
          onChange={onChange} 
          disabled={disabled}
          className='peer w-full text-center focus:outline-2 focus:outline-black disabled:bg-inherit'
          aria-label={ariaLabel}
        />
        <span className='absolute w-4 right-3'>€</span>
    </>
  );
};