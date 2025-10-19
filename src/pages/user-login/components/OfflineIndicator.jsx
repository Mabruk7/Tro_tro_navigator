import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const OfflineIndicator = () => {
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

    // Show indicator if offline on mount
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
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out">
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
          {isOnline ? 'Back online' : 'Offline - Authentication requires internet'}
        </span>
      </div>
    </div>
  );
};

export default OfflineIndicator;