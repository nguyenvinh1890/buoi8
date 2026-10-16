import React from 'react';
import './InputField.css';

/**
 * InputField Component - Reusable text field component with label, validation error, and helper texts
 * 
 * @param {Object} props
 * @param {string} props.label - Field label
 * @param {string|number} props.value - Input value
 * @param {(value: string) => void} [props.onChangeText] - Direct text change handler (text) => void
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange] - Native change handler (e) => void
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.error] - Validation error message to display
 * @param {string} [props.type='text'] - Input type (text, email, password, etc.)
 * @param {string} [props.id] - Unique ID for input & label pairing
 * @param {string} [props.name] - Form field name
 * @param {boolean} [props.required=false] - Whether field is required
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {React.ReactNode} [props.leftIcon] - Icon displayed at start of input
 * @param {React.ReactNode} [props.rightElement] - Action or icon at end (e.g. show/hide password)
 * @param {string} [props.helperText] - Subtext shown when there is no error
 * @param {() => void} [props.onBlur] - Focus loss event handler
 * @param {() => void} [props.onFocus] - Focus gain event handler
 * @param {string} [props.className] - Additional class names
 */
export default function InputField({
  label,
  value,
  onChangeText,
  onChange,
  placeholder,
  error,
  type = 'text',
  id,
  name,
  required = false,
  disabled = false,
  leftIcon,
  rightElement,
  helperText,
  onBlur,
  onFocus,
  className = '',
  ...rest
}) {
  const generatedId = id || (name ? `input-${name}` : undefined);
  const errorId = generatedId ? `${generatedId}-error` : undefined;
  const helperId = generatedId ? `${generatedId}-helper` : undefined;

  const handleChange = (e) => {
    if (onChangeText) {
      onChangeText(e.target.value);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const hasError = Boolean(error);

  return (
    <div className={`input-field-group ${hasError ? 'has-error' : ''} ${disabled ? 'is-disabled' : ''} ${className}`}>
      {label && (
        <label htmlFor={generatedId} className="input-field-label">
          <span>{label}</span>
          {required && <span className="label-required" aria-hidden="true">*</span>}
        </label>
      )}

      <div className={`input-field-wrapper ${leftIcon ? 'has-left-icon' : ''} ${rightElement ? 'has-right-element' : ''}`}>
        {leftIcon && <span className="input-field-left-icon">{leftIcon}</span>}

        <input
          id={generatedId}
          name={name}
          type={type}
          value={value ?? ''}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : (helperText ? helperId : undefined)}
          className="input-field-control"
          {...rest}
        />

        {rightElement && (
          <div className="input-field-right-element">
            {rightElement}
          </div>
        )}
      </div>

      {hasError ? (
        <p id={errorId} className="input-field-error" role="alert">
          <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </p>
      ) : (
        helperText && (
          <p id={helperId} className="input-field-helper">
            {helperText}
          </p>
        )
      )}
    </div>
  );
}
