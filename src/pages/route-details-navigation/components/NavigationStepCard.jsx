import React from 'react';
import Icon from '../../../components/AppIcon';

const NavigationStepCard = ({ 
  step, 
  isActive = false, 
  isCompleted = false,
  stepNumber,
  className = '' 
}) => {
  const getTransportIcon = (mode) => {
    switch (mode?.toLowerCase()) {
      case 'tro-tro':
        return 'Bus';
      case 'taxi':
        return 'Car';
      case 'walking':
        return 'MapPin';
      case 'bus':
        return 'Bus';
      default:
        return 'Navigation';
    }
  };

  const getStepStatusIcon = () => {
    if (isCompleted) return 'CheckCircle';
    if (isActive) return 'Circle';
    return 'Circle';
  };

  const getStepStatusColor = () => {
    if (isCompleted) return 'text-success';
    if (isActive) return 'text-primary';
    return 'text-muted-foreground';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 transition-all duration-200 ${
      isActive ? 'border-primary shadow-elevation-1 bg-primary/5' : ''
    } ${className}`}>
      <div className="flex items-start space-x-3">
        {/* Step Status */}
        <div className="flex flex-col items-center mt-1">
          <Icon 
            name={getStepStatusIcon()} 
            size={20} 
            className={`${getStepStatusColor()} ${isActive ? 'animate-pulse' : ''}`}
          />
          <span className="text-xs text-muted-foreground font-mono mt-1">
            {stepNumber}
          </span>
        </div>

        {/* Step Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getTransportIcon(step?.mode)} 
                size={16} 
                className="text-primary flex-shrink-0" 
              />
              <span className="text-sm font-medium text-primary font-body capitalize">
                {step?.mode}
              </span>
              {step?.routeNumber && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-mono">
                  {step?.routeNumber}
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-foreground font-mono">
                {step?.fare}
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                {step?.duration}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={12} className="text-muted-foreground flex-shrink-0" />
              <span className="text-sm text-foreground font-body">
                {step?.from}
              </span>
            </div>
            <div className="flex items-center space-x-2 ml-3">
              <Icon name="ArrowDown" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-caption">
                {step?.distance} • {step?.stops} stops
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={12} className="text-success flex-shrink-0" />
              <span className="text-sm text-foreground font-body">
                {step?.to}
              </span>
            </div>
          </div>

          {step?.instructions && (
            <div className="mt-2 p-2 bg-muted/50 rounded text-xs text-muted-foreground font-body">
              <Icon name="Info" size={12} className="inline mr-1" />
              {step?.instructions}
            </div>
          )}

          {step?.delay && (
            <div className="mt-2 flex items-center space-x-1 text-xs text-warning">
              <Icon name="AlertTriangle" size={12} />
              <span className="font-body">Delay: {step?.delay}</span>
            </div>
          )}
        </div>
      </div>
      {isActive && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1 text-success">
              <Icon name="Navigation" size={12} />
              <span className="font-body">Current step</span>
            </div>
            <button className="text-primary hover:text-primary/80 font-medium font-body">
              Voice guidance
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationStepCard;