import React from 'react';
import './PrimaryButton.css';

/**
 * PrimaryButton Component - Reusable primary action button supporting disabled, loading, and variant states
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content inside button
 * @param {() => void} [props.onClick] - Click event handler
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {boolean} [props.loading=false] - Whether button is in loading state
 * @param {'button'|'submit'|'reset'} [props.type='button'] - Button HTML type
 * @param {'primary'|'secondary'|'outline'|'ghost'} [props.variant='primary'] - Style variant
 * @param {boolean} [props.fullWidth=false] - Whether button takes 100% width
 * @param {React.ReactNode} [props.icon] - Leading icon element
 * @param {string} [props.id] - Element ID
 * @param {string} [props.className] - Additional class names
 */
export default function PrimaryButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  icon,
  id,
  className = '',
  ...rest
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      id={id}
      type={type}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={`primary-btn variant-${variant} ${fullWidth ? 'btn-full' : ''} ${
        isDisabled ? 'is-disabled' : ''
      } ${loading ? 'is-loading' : ''} ${className}`}
      {...rest}
    >
      {loading ? (
        <span className="btn-spinner" aria-hidden="true" />
      ) : (
        icon && <span className="btn-icon">{icon}</span>
      )}
      <span className="btn-text">{children}</span>
    </button>
  );
}
