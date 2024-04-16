'use client';

import React, { useState, useRef, useEffect } from 'react';

type Props = {
  min?: number;
  max?: number;
  range?: number[];
};

export const Range: React.FC<Props> = ({ min: initialMin, max: initialMax, range }) => {
  const [minValue, setMinValue] = useState(initialMin || (range && range[0]) || 0);
  const [maxValue, setMaxValue] = useState(initialMax || (range && range[range.length - 1]) || 100);
  const lineRef = useRef<HTMLDivElement>(null);
  const isRange = useRef<boolean>(Array.isArray(range) && range.length > 0 && range.every(item => typeof item === 'number'))

  useEffect(() => {
    if (lineRef.current) {
      if (initialMin !== undefined && initialMax !== undefined) {
        setMinValue(initialMin);
        setMaxValue(initialMax);
      } else if (isRange.current) {
        setMinValue(range[0]);
        setMaxValue(range[range.length - 1]);
      }
    }
  }, [initialMin, initialMax, range]);

  const calcPercentage = (e: MouseEvent) => {
    const { left, width } = lineRef.current.getBoundingClientRect()
    return (e.clientX - left) / width
  }

  const handleMinDrag = (e: MouseEvent) => {
    if (lineRef.current) {
      if (isRange.current) {
        let newValueIndex = Math.round(calcPercentage(e) * (range.length - 1))
        newValueIndex = Math.max(0, Math.min(newValueIndex, range.length - 1))
        const newValue = range[newValueIndex]
        if (newValue < maxValue) {
          setMinValue(newValue)
        }
      } else {
        const newValue = Math.min(maxValue, Math.max(initialMin, Math.round(initialMin + calcPercentage(e) * (initialMax - initialMin))))
        setMinValue(newValue)
      }
    };
  };

  const handleMaxDrag = (e: MouseEvent) => {
    if (lineRef.current) {
      if (isRange.current) {
        let newValueIndex = Math.round(calcPercentage(e) * (range.length - 1));
        newValueIndex = Math.max(0, Math.min(newValueIndex, range.length - 1));
        const newValue = range[newValueIndex];
        if (newValue > minValue) {
          setMaxValue(newValue);
        }
      } else {
        const newValue = Math.max(minValue, Math.min(initialMax, Math.round(initialMin + calcPercentage(e) * (initialMax - initialMin))));
        setMaxValue(newValue);
      }
    };
  };

  const handleMouseDownMin = () => {
    document.addEventListener('mousemove', handleMinDrag);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDownMax = () => {
    document.addEventListener('mousemove', handleMaxDrag);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMinDrag);
    document.removeEventListener('mousemove', handleMaxDrag);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const MinDragLeftPosition = isRange.current ? ((minValue - range[0]) / (range[range.length - 1] - range[0])) * 100 : ((minValue - initialMin) / (initialMax - initialMin)) * 100;
  const MaxDragLeftPosition = isRange.current ? ((maxValue - range[0]) / (range[range.length - 1] - range[0])) * 100 : ((maxValue - initialMin) / (initialMax - initialMin)) * 100;
  const SelectedRangeWidth = isRange.current ? ((maxValue - minValue) / (range[range.length - 1] - range[0])) * 100 : ((maxValue - minValue) / (initialMax - initialMin)) * 100;

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center justify-between w-full">
        <div className="mr-4">{minValue}</div>
        <div ref={lineRef} className="relative w-full h-2 bg-gray-300 rounded-full">
          <div
            className="absolute -top-1/2 -ml-2 w-4 h-4 bg-black rounded-full shadow-md flex items-center justify-center cursor-grab"
            style={{ left: `${MinDragLeftPosition}%` }}
            onMouseDown={handleMouseDownMin}
          ></div>
          <div
            className="absolute -top-1/2 -ml-2 w-4 h-4 bg-black rounded-full shadow-md flex items-center justify-center cursor-grab"
            style={{ left: `${MaxDragLeftPosition}%` }}
            onMouseDown={handleMouseDownMax}
          ></div>
          <div
            className="absolute top-0 bg-black h-2 rounded-full"
            style={{
              width: `${SelectedRangeWidth}%`,
              left: `${MinDragLeftPosition}%`,
            }}
          ></div>
        </div>
        <div className='ml-4'>{maxValue}</div>
      </div>
    </div>
  );
};
