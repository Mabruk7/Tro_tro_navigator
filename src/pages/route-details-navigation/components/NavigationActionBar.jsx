import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationActionBar = ({ 
  isNavigating,
  onToggleNavigation,
  onShareRoute,
  onReportIssue,
  onVoiceToggle,
  isVoiceEnabled = false,
  className = '' 
}) => {
  return (
    <div className={`bg-card border-t border-border shadow-elevation-2 ${className}`}>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between space-x-2">
          {/* Primary Navigation Control */}
          <Button
            variant={isNavigating ? "destructive" : "default"}
            size="lg"
            onClick={onToggleNavigation}
            iconName={isNavigating ? "Square" : "Play"}
            iconPosition="left"
            className="flex-1 max-w-40"
          >
            {isNavigating ? 'Stop Navigation' : 'Start Navigation'}
          </Button>

          {/* Secondary Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="default"
              onClick={onVoiceToggle}
              iconName={isVoiceEnabled ? "VolumeX" : "Volume2"}
              iconSize={16}
              className={isVoiceEnabled ? "bg-primary/10 border-primary text-primary" : ""}
              aria-label={isVoiceEnabled ? "Disable voice" : "Enable voice"}
            />

            <Button
              variant="outline"
              size="default"
              onClick={onShareRoute}
              iconName="Share"
              iconSize={16}
              aria-label="Share route"
            />

            <Button
              variant="outline"
              size="default"
              onClick={onReportIssue}
              iconName="Flag"
              iconSize={16}
              className="text-warning border-warning hover:bg-warning hover:text-warning-foreground"
              aria-label="Report issue"
            />
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="font-caption">GPS Active</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Wifi" size={12} />
              <span className="font-caption">Online</span>
            </div>
            {isVoiceEnabled && (
              <div className="flex items-center space-x-1">
                <Icon name="Volume2" size={12} />
                <span className="font-caption">Voice On</span>
              </div>
            )}
          </div>
          
          <div className="text-right">
            <span className="font-caption">Last updated: 2 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationActionBar;