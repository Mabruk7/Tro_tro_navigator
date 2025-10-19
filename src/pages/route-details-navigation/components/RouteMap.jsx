import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RouteMap = ({ 
  isCollapsed, 
  onToggleCollapse, 
  currentLocation,
  routeSteps,
  className = '' 
}) => {
  const [mapError, setMapError] = useState(false);

  const mapHeight = isCollapsed ? 'h-16' : 'h-64 md:h-80 lg:h-96';

  const handleMapError = () => {
    setMapError(true);
  };

  return (
    <div className={`bg-card border-b border-border relative ${className}`}>
      <div className={`transition-all duration-300 ease-out ${mapHeight} overflow-hidden`}>
        {!isCollapsed && (
          <div className="w-full h-full relative">
            {!mapError ? (
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Route Navigation Map"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${currentLocation?.lat},${currentLocation?.lng}&z=15&output=embed`}
                onError={handleMapError}
                className="border-0"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <div className="text-center">
                  <Icon name="MapOff" size={48} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground font-body">Map unavailable</p>
                  <p className="text-xs text-muted-foreground font-caption">Using offline navigation</p>
                </div>
              </div>
            )}

            {/* Current Location Indicator */}
            <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-elevation-1">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-foreground font-body">
                  {currentLocation?.name}
                </span>
              </div>
            </div>

            {/* Route Progress */}
            <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-elevation-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Navigation" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground font-body">
                    Next: {routeSteps?.[0]?.location}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  {routeSteps?.[0]?.distance}
                </div>
              </div>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="h-full flex items-center justify-between px-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-foreground font-body">
                Currently at: {currentLocation?.name}
              </span>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              Next: {routeSteps?.[0]?.distance}
            </div>
          </div>
        )}
      </div>
      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleCollapse}
        iconName={isCollapsed ? "ChevronDown" : "ChevronUp"}
        iconSize={16}
        className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm hover:bg-card"
      >
        {isCollapsed ? 'Show' : 'Hide'} Map
      </Button>
    </div>
  );
};

export default RouteMap;