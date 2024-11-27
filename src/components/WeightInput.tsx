import React, { useState, useEffect } from 'react';

interface WeightInputProps {
  weight: number;
  unit: 'kg' | 'g';
  onChange: (weight: number) => void;
  onUnitChange: (unit: 'kg' | 'g') => void;
}

export function WeightInput({ weight, unit, onChange, onUnitChange }: WeightInputProps) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (weight) {
      if (unit === 'g') {
        setInputValue(Math.round(weight * 1000).toString());
      } else {
        setInputValue(weight.toFixed(3));
      }
    }
  }, [weight, unit]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    if (numericValue) {
      const numberValue = parseFloat(numericValue);
      if (!isNaN(numberValue)) {
        const weightInKg = unit === 'g' ? numberValue / 1000 : numberValue;
        onChange(weightInKg);
      }
    }
  };

  return (
    <div className="flex gap-1 items-center">
      <input
        type="text"
        placeholder={unit === 'g' ? "350" : "1.5"}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        className="w-14 p-1 text-sm border rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-transparent bg-white"
      />
      <select
        value={unit}
        onChange={(e) => onUnitChange(e.target.value as 'kg' | 'g')}
        className="w-14 p-1 text-sm border rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-transparent bg-white"
      >
        <option value="g">g</option>
        <option value="kg">kg</option>
      </select>
    </div>
  );
}