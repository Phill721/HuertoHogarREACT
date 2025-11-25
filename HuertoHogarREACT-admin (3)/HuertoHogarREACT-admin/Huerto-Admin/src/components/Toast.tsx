import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  duration = 3000,
  onClose
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return 'rgba(46, 139, 87, 0.95)';
      case 'error': return 'rgba(220, 53, 69, 0.95)';
      default: return 'rgba(13, 110, 253, 0.95)';
    }
  };

  return (
    <div 
      className="toast"
      style={{
        backgroundColor: getBackgroundColor(),
        color: 'white'
      }}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="d-flex">
        <div className="toast-body">
          {message}
        </div>
        <button 
          type="button" 
          className="btn-close btn-close-white me-2 m-auto"
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
        />
      </div>
    </div>
  );
};