import React from 'react';
import './Card.css';

/**
 * Card Component - Reusable container for forms, panels, and content blocks
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card inner body content
 * @param {string|React.ReactNode} [props.title] - Optional title for card header
 * @param {React.ReactNode} [props.headerAction] - Optional action element in header right
 * @param {React.ReactNode} [props.footer] - Optional footer content
 * @param {'glass'|'solid'|'elevated'} [props.variant='glass'] - Card visual style
 * @param {'none'|'sm'|'md'|'lg'} [props.padding='lg'] - Inner padding amount
 * @param {boolean} [props.glow=false] - Whether to show ambient light glow
 * @param {string} [props.className] - Additional CSS class names
 */
export default function Card({
  children,
  title,
  headerAction,
  footer,
  variant = 'glass',
  padding = 'lg',
  glow = false,
  className = '',
  ...rest
}) {
  const hasHeader = Boolean(title || headerAction);

  return (
    <div
      className={`app-card variant-${variant} pad-${padding} ${
        glow ? 'has-glow' : ''
      } ${className}`}
      {...rest}
    >
      {hasHeader && (
        <div className="app-card-header">
          {title && (typeof title === 'string' ? <h2 className="app-card-title">{title}</h2> : title)}
          {headerAction && <div className="app-card-action">{headerAction}</div>}
        </div>
      )}

      <div className="app-card-body">{children}</div>

      {footer && <div className="app-card-footer">{footer}</div>}
    </div>
  );
}
