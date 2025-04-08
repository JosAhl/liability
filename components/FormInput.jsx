import React from 'react';
import "@/styles/components/form-input.css";
import '@/styles/components/form.css';

const FormInput = ({
  type = 'text',
  label,
  name,
  value,
  placeholder = '',
  required = false,
  className = '',
  onChange,
  error,
  ...props
}) => {
  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label} {required && <span className="required-mark">*</span>}
        </label>
      )}
      
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className={`form-input ${error ? 'form-input-error' : ''}`}
        {...props}
      />
      
      {error && <span className="form-error-message">{error}</span>}
    </div>
  );
};

export default FormInput;