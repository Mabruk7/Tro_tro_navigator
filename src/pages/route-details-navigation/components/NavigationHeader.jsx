import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationHeader = ({ 
  routeInfo, 
  isNavigating, 
  onToggleNavigation, 
  onEmergencyContact,
  className = '' 
}) => {
  const handleEmergencyCall = () => {
    if (onEmergencyContact) {
      onEmergencyContact();
    } else {
      window.location.href = 'tel:191';
    }
  };

  return (
    <div className={`bg-card border-b border-border shadow-elevation-1 ${className}`}>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Navigation" size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-heading font-semibold text-foreground">
                Route Navigation
              </h1>
              <p className="text-sm text-muted-foreground font-body">
                {routeInfo?.from} → {routeInfo?.to}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEmergencyCall}
            iconName="Phone"
            iconSize={16}
            className="text-error border-error hover:bg-error hover:text-error-foreground"
          >
            SOS
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} className="text-muted-foreground" />
              <span className="text-foreground font-mono">{routeInfo?.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="DollarSign" size={14} className="text-muted-foreground" />
              <span className="text-primary font-mono font-medium">{routeInfo?.totalFare}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} className="text-muted-foreground" />
              <span className="text-foreground font-body">{routeInfo?.totalStops} stops</span>
            </div>
          </div>

          <Button
            variant={isNavigating ? "destructive" : "default"}
            size="sm"
            onClick={onToggleNavigation}
            iconName={isNavigating ? "Square" : "Play"}
            iconSize={14}
          >
            {isNavigating ? 'Stop' : 'Start'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavigationHeader;