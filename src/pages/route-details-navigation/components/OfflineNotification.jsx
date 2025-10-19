import React from 'react';
import Icon from '../../../components/AppIcon';

const OfflineNotification = ({ 
  isVisible = false, 
  hasOfflineData = true,
  className = '' 
}) => {
  if (!isVisible) return null;

  return (
    <div className={`bg-warning/10 border border-warning/20 rounded-lg p-3 mb-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <Icon name="WifiOff" size={20} className="text-warning flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="text-sm font-medium text-warning font-heading mb-1">
            Offline Mode Active
          </h4>
          <p className="text-xs text-warning/80 font-body mb-2">
            {hasOfflineData 
              ? "Using cached route data. GPS tracking continues to work." :"Limited functionality available. Some features may not work."
            }
          </p>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <Icon name={hasOfflineData ? "CheckCircle" : "XCircle"} size={12} className="text-warning" />
              <span className="font-caption">
                Route data: {hasOfflineData ? "Available" : "Limited"}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Navigation" size={12} className="text-warning" />
              <span className="font-caption">GPS: Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineNotification;