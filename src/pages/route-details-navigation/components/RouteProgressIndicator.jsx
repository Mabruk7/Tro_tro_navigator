import React from 'react';
import Icon from '../../../components/AppIcon';

const RouteProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 5, 
  completedSteps = 0,
  remainingTime = "25 min",
  remainingCost = "GH₵ 3.50",
  className = '' 
}) => {
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className={`bg-card border border-border rounded-lg p-4 shadow-elevation-1 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-foreground font-heading">
          Route Progress
        </h3>
        <div className="text-xs text-muted-foreground font-caption">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-muted-foreground font-caption">
          <span>Started</span>
          <span>{Math.round(progressPercentage)}% complete</span>
          <span>Destination</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="CheckCircle" size={16} className="text-success" />
          </div>
          <div className="text-lg font-semibold text-success font-mono">
            {completedSteps}
          </div>
          <div className="text-xs text-muted-foreground font-caption">
            Completed
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="Clock" size={16} className="text-primary" />
          </div>
          <div className="text-lg font-semibold text-foreground font-mono">
            {remainingTime}
          </div>
          <div className="text-xs text-muted-foreground font-caption">
            Remaining
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="DollarSign" size={16} className="text-accent" />
          </div>
          <div className="text-lg font-semibold text-accent font-mono">
            {remainingCost}
          </div>
          <div className="text-xs text-muted-foreground font-caption">
            Cost left
          </div>
        </div>
      </div>

      {/* Next Step Preview */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="ArrowRight" size={14} className="text-primary" />
          <span className="text-sm font-medium text-foreground font-body">
            Next: Board tro-tro at Kaneshie Market
          </span>
        </div>
        <div className="ml-6 text-xs text-muted-foreground font-caption">
          Platform 3 • Route 49 • GH₵ 1.50
        </div>
      </div>
    </div>
  );
};

export default RouteProgressIndicator;