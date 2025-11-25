import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = 'medium', 
  color = 'var(--accent-green)',
  className = ''
}) => {
  const getSize = () => {
    switch (size) {
      case 'small': return '1rem';
      case 'large': return '3rem';
      default: return '2rem';
    }
  };

  return (
    <div 
      className={`loader-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        className="spinner-border"
        style={{
          width: getSize(),
          height: getSize(),
          color: color
        }}
        role="status"
      >
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
};