'use client';

import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { ExtremeField } from './extreme';

interface RangeProps {
  range: number[];
}

interface MinMaxProps {
  min: number;
  max: number;
}

type Props = { rangeType: true } & RangeProps | { rangeType?: false } & MinMaxProps;

export const Range: React.FC<Props> = ({ rangeType, ...props }) => { 

  const { range } = props as RangeProps;
  const { min, max } = props as MinMaxProps;
  const [initialMin, setInitialMin] = useState<number>(min || 0);
  const [initialMax, setInitialMax] = useState<number>(max || 0);
  const [minValue, setMinValue] = useState<number>(min || (range && range[0]) || 0);
  const [maxValue, setMaxValue] = useState<number>(max || (range && range[range.length - 1]) || 100);
  const lineRef = useRef<HTMLDivElement>(null);
  const isRange = useRef<boolean>(Array.isArray(range) && range.length > 0 && range.every(item => typeof item === 'number'))

  useEffect(() => {
    if (lineRef.current) {
      if (initialMin !== undefined && initialMax !== undefined) {
        setInitialMin(initialMin);
        setInitialMax(initialMax);
      } 
    }
  }, [initialMin, initialMax]);

  const calcPercentage = (e: MouseEvent): number => {
    const { left, width } = lineRef.current.getBoundingClientRect()
    return (e.clientX - left) / width
  }

  const calcNewValue = (e: MouseEvent): number => {
    let newValueIndex = Math.round(calcPercentage(e) * (range.length - 1))
    newValueIndex = Math.max(0, Math.min(newValueIndex, range.length - 1))
    return range[newValueIndex]
  }

  const handleMinDrag = (e: MouseEvent): void => {
    e.preventDefault()
    console.log(e.clientX)
    if (lineRef.current) {
      if (isRange.current) {
        const newValue = calcNewValue(e)
        if (newValue < maxValue) {
          setMinValue(newValue)
        }
      } else {
        const newValue = Math.min(maxValue, Math.max(initialMin, Math.round(initialMin + calcPercentage(e) * (initialMax - initialMin))))
        setMinValue(newValue)
      }
    };
  };

  const handleMaxDrag = (e: MouseEvent): void => {
    e.preventDefault()
    if (lineRef.current) {
      if (isRange.current) {
        const newValue = calcNewValue(e)
        if (newValue > minValue) {
          setMaxValue(newValue);
        }
      } else {
        const newValue = Math.max(minValue, Math.min(initialMax, Math.round(initialMin + calcPercentage(e) * (initialMax - initialMin))));
        setMaxValue(newValue);
      }
    };
  };

  const handleMouseDownMin = (): void => {
    document.addEventListener('mousemove', handleMinDrag);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDownMax = (): void => {
    document.addEventListener('mousemove', handleMaxDrag);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = (): void => {
    document.removeEventListener('mousemove', handleMinDrag);
    document.removeEventListener('mousemove', handleMaxDrag);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const MinDragLeftPosition = isRange.current ? ((minValue - range[0]) / (range[range.length - 1] - range[0])) * 100 : ((minValue - initialMin) / (initialMax - initialMin)) * 100;
  const MaxDragLeftPosition = isRange.current ? ((maxValue - range[0]) / (range[range.length - 1] - range[0])) * 100 : ((maxValue - initialMin) / (initialMax - initialMin)) * 100;
  const SelectedRangeWidth = isRange.current ? ((maxValue - minValue) / (range[range.length - 1] - range[0])) * 100 : ((maxValue - minValue) / (initialMax - initialMin)) * 100;
  
  const handleOnChangeMinValue = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = parseInt(e.target.value);
    if (newValue >= 1 && newValue <= initialMax) {
      setInitialMin(newValue);
      setMinValue(newValue);
    }
  }; 

  const handleOnChangeMaxValue = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = parseInt(e.target.value);
    if (newValue >= initialMin) {
      setInitialMax(newValue);
      setMaxValue(newValue);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center justify-between w-full">
        <div className='relative w-[12%] mr-4'>
          <ExtremeField value={minValue} disabled={isRange.current} onChange={handleOnChangeMinValue} aria-label="Valor minimo"/>
        </div>
        <div ref={lineRef} className="relative w-[76%] h-2 bg-gray-300 rounded-full">
          <div
            className="absolute top-1/2 w-4 h-4 active:w-5 active:h-5 bg-black rounded-full shadow-md flex items-center justify-center cursor-grab"
            style={{ left: `${MinDragLeftPosition}%`, transform: 'translate(-50%, -50%)' }}
            onMouseDown={handleMouseDownMin}
            data-testid="min-handle"
          ></div>
          <div
            className="absolute top-1/2 w-4 h-4 active:w-5 active:h-5 bg-black rounded-full shadow-md flex items-center justify-center cursor-grab"
            style={{ left: `${MaxDragLeftPosition}%`, transform: 'translate(-50%, -50%)' }}
            onMouseDown={handleMouseDownMax}
            data-testid="max-handle"
          ></div>
          <div
            className="absolute top-0 bg-black h-2 rounded-full"
            style={{
              width: `${SelectedRangeWidth}%`,
              left: `${MinDragLeftPosition}%`,
            }}
          ></div>
        </div>
        <div className='relative w-[12%] ml-4'>
          <ExtremeField value={maxValue} disabled={isRange.current} onChange={handleOnChangeMaxValue} aria-label="Valor maximo"/>
        </div>
      </div>
    </div>
  );
};