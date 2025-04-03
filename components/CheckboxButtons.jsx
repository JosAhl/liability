'use client'
import React from 'react';
import "@/styles/components/checkboxButton.css";
import { useState, useEffect } from 'react';

const CheckboxButtons = ({ 
  options, 
  name, 
  selectedValues = [], 
  onChange,
  className = ''
}) => {

  const [internalSelectedValues, setInternalSelectedValues] = useState(selectedValues);

  useEffect(() =>  {
    setInternalSelectedValues(selectedValues);
  }, [selectedValues]);

  const handleToggle = (value) => {
    let newValues;
    
    if (internalSelectedValues.includes(value)) {
      // Remove if already selected
      newValues = internalSelectedValues.filter(item => item !== value);
    } else {
      // Add if not selected
      newValues = [...internalSelectedValues, value];
    }

    setInternalSelectedValues(newValues);
    
    // Create a simulated event object to match the original checkbox onChange handler
    const simulatedEvent = {
      target: {
        name,
        value,
        checked: !internalSelectedValues.includes(value)
      }
    };
    
    onChange(simulatedEvent);
  };

  return (
    <div className={`checkbox-buttons-container ${className}`}>
      {options.map((option) => {
        const isSelected = internalSelectedValues.includes(option);
        
        return (
          <button
            key={option}
            type="button"
            onClick={() => handleToggle(option)}
            className={`checkbox-button ${isSelected ? 'checkbox-button--selected' : ''}`}
            aria-pressed={isSelected}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default CheckboxButtons;