import React from "react";
import "@/styles/components/form-input.css";
import "@/styles/components/form.css";

const FormInput = ({
  type = "text",
  label,
  name,
  value,
  placeholder = "",
  required = false,
  className = "",
  onChange,
  error,
  withLink = false,
  withImage = false,
  ...props
}) => {
  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label} {required && <span className="required-mark">*</span>}
        </label>
      )}

      <div
        className={`input-wrapper ${withLink ? "with-link-icon" : ""} ${
          withImage ? "with-image-icon" : ""
        }`}
      >
        {withLink && (
          <img
            src="/link-icon.svg"
            alt="Icon indicating this is a link input"
            className="link-icon"
          />
        )}

        <input
          type={type}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          className={`form-input ${error ? "form-input-error" : ""}`}
          {...props}
        />

        {withImage && (
          <img
            src="/image-icon.svg"
            alt="Icon indicating this is an image input"
            className="image-icon"
          />
        )}
      </div>

      {error && <span className="form-error-message">{error}</span>}
    </div>
  );
};

export default FormInput;
