import React from 'react';

export const Input = ({ 
  type = 'text', 
  className = '', 
  ...props 
}) => {
  return (
    <input
      type={type}
      className={`form-control ${className}`}
      {...props}
    />
  );
};

export const Label = ({ 
  htmlFor, 
  className = '', 
  children, 
  ...props 
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`form-label ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};
