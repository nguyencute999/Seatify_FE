import React from 'react';

export const Badge = ({ 
  variant = 'primary', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseClasses = 'badge';
  
  const variants = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
    danger: 'bg-danger',
    warning: 'bg-warning',
    info: 'bg-info',
    light: 'bg-light text-dark',
    dark: 'bg-dark',
    custom: '' // For custom styling
  };
  
  return (
    <span
      className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
