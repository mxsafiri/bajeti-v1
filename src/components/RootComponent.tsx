import React from 'react';
import '../styles/globals.css';

interface RootComponentProps {
  children: React.ReactNode;
}

export const RootComponent: React.FC<RootComponentProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <div className="relative flex min-h-screen flex-col">
        {children}
      </div>
    </div>
  );
};
