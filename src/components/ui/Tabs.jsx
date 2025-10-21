import React, { useState } from 'react';

export const Tabs = ({ defaultValue, className = '', children, ...props }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={`tabs ${className}`} {...props}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { 
            activeTab, 
            setActiveTab 
          });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList = ({ className = '', children, activeTab, setActiveTab, ...props }) => {
  return (
    <ul 
      className={`nav nav-tabs nav-fill ${className}`}
      {...props}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { 
            activeTab, 
            setActiveTab 
          });
        }
        return child;
      })}
    </ul>
  );
};

export const TabsTrigger = ({ 
  value, 
  className = '', 
  children, 
  activeTab, 
  setActiveTab, 
  ...props 
}) => {
  const isActive = activeTab === value;
  
  return (
    <li className="nav-item">
      <button
        type="button"
        className={`nav-link ${isActive ? 'active' : ''} ${className}`}
        onClick={() => setActiveTab(value)}
        {...props}
      >
        {children}
      </button>
    </li>
  );
};

export const TabsContent = ({ 
  value, 
  className = '', 
  children, 
  activeTab, 
  ...props 
}) => {
  if (activeTab !== value) return null;
  
  return (
    <div className={`tab-content ${className}`} {...props}>
      <div className="tab-pane active">
        {children}
      </div>
    </div>
  );
};
