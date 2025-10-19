import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const OfflineIndicator = ({ className = '' }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowIndicator(true);
      setTimeout(() => setShowIndicator(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (!navigator.onLine) {
      setShowIndicator(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showIndicator) return null;

  return (
    <div 
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out ${className}`}
    >
      <div className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-elevation-2 text-sm font-medium ${
        isOnline 
          ? 'bg-success text-success-foreground' 
          : 'bg-warning text-warning-foreground'
      }`}>
        <Icon 
          name={isOnline ? 'Wifi' : 'WifiOff'} 
          size={16} 
          className="flex-shrink-0"
        />
        <span className="font-body">
          {isOnline ? 'Back online' : 'Offline mode'}
        </span>
        {!isOnline && (
          <span className="text-xs opacity-80">
            • Cached routes available
          </span>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;