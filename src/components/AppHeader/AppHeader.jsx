import React from 'react';
import './AppHeader.css';

/**
 * AppHeader Component - Reusable header component for pages, modals, and cards
 * 
 * @param {Object} props
 * @param {string|React.ReactNode} props.title - Main header title
 * @param {string|React.ReactNode} [props.subtitle] - Subtitle description
 * @param {string} [props.badge] - Optional pill badge label (e.g. "Bảo mật", "Bước 1")
 * @param {React.ReactNode} [props.icon] - Optional icon displayed before badge/title
 * @param {'left'|'center'|'right'} [props.align='center'] - Alignment of content
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Heading scale
 * @param {string} [props.className] - Extra CSS classes
 */
export default function AppHeader({
  title,
  subtitle,
  badge,
  icon,
  align = 'center',
  size = 'md',
  className = ''
}) {
  return (
    <header className={`app-header align-${align} size-${size} ${className}`}>
      {(badge || icon) && (
        <div className="app-header-meta">
          {icon && <span className="app-header-icon">{icon}</span>}
          {badge && <span className="app-header-badge">{badge}</span>}
        </div>
      )}
      <h1 className="app-header-title">{title}</h1>
      {subtitle && <p className="app-header-subtitle">{subtitle}</p>}
    </header>
  );
}
