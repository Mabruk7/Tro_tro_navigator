import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingOverlay = ({ isVisible, message = "Creating your account..." }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
      <div className="bg-card rounded-lg shadow-elevation-3 p-8 max-w-sm w-full text-center">
        <div className="flex flex-col items-center space-y-4">
          {/* Animated Logo */}
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-pulse">
            <Icon name="MapPin" size={32} className="text-primary-foreground" />
          </div>

          {/* Loading Spinner */}
          <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin"></div>

          {/* Loading Message */}
          <div className="space-y-2">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Almost there!
            </h3>
            <p className="text-sm text-muted-foreground font-body">
              {message}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex space-x-2 mt-4">
            {[1, 2, 3]?.map((step) => (
              <div
                key={step}
                className="w-2 h-2 rounded-full bg-primary animate-pulse"
                style={{
                  animationDelay: `${step * 0.2}s`,
                  animationDuration: '1s'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;