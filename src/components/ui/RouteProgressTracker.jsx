import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const RouteProgressTracker = ({ 
  currentStep = 1, 
  totalSteps = 5, 
  onEmergencyContact,
  routeInfo = {
    currentLocation: 'Accra Central',
    nextStop: 'Kaneshie Market',
    estimatedTime: '12 min',
    fare: '₵2.50'
  },
  className = '' 
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleEmergencyCall = () => {
    if (onEmergencyContact) {
      onEmergencyContact();
    } else {
      window.location.href = 'tel:191';
    }
  };

  return (
    <div className={`bg-card border-t border-border shadow-elevation-2 ${className}`}>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground font-body">
              En route to {routeInfo?.nextStop}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground font-mono">
            <Icon name="Clock" size={12} />
            <span>{routeInfo?.estimatedTime}</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-muted-foreground font-caption">
              Progress
            </span>
            <span className="text-xs text-muted-foreground font-caption">
              {currentStep} of {totalSteps} stops
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-xs text-muted-foreground font-caption">Current</div>
              <div className="text-sm font-medium text-foreground font-body truncate max-w-20">
                {routeInfo?.currentLocation}
              </div>
            </div>
            <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
            <div className="text-center">
              <div className="text-xs text-muted-foreground font-caption">Next</div>
              <div className="text-sm font-medium text-foreground font-body truncate max-w-20">
                {routeInfo?.nextStop}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-xs text-muted-foreground font-caption">Fare</div>
              <div className="text-sm font-medium text-primary font-mono">
                {routeInfo?.fare}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleEmergencyCall}
              iconName="Phone"
              iconSize={14}
              className="ml-2"
              aria-label="Emergency contact"
            >
              SOS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteProgressTracker;