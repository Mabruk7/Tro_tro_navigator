import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import OfflineIndicator from '../../components/ui/OfflineIndicator';
import NavigationHeader from './components/NavigationHeader';
import RouteMap from './components/RouteMap';
import NavigationStepCard from './components/NavigationStepCard';
import RouteProgressIndicator from './components/RouteProgressIndicator';
import NavigationActionBar from './components/NavigationActionBar';
import OfflineNotification from './components/OfflineNotification';

const RouteDetailsNavigation = () => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMapCollapsed, setIsMapCollapsed] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Mock route data
  const routeInfo = {
    from: "Accra Central",
    to: "East Legon",
    duration: "45 min",
    totalFare: "GH₵ 6.50",
    totalStops: 8,
    distance: "12.5 km"
  };

  const currentLocation = {
    name: "Accra Central Station",
    lat: 5.5502,
    lng: -0.2174
  };

  const routeSteps = [
    {
      id: 1,
      mode: "tro-tro",
      routeNumber: "49",
      from: "Accra Central Station",
      to: "Kaneshie Market",
      fare: "GH₵ 2.00",
      duration: "15 min",
      distance: "4.2 km",
      stops: 6,
      instructions: "Board the tro-tro with \'Kaneshie\' sign. Pay fare to conductor.",
      delay: null
    },
    {
      id: 2,
      mode: "walking",
      from: "Kaneshie Market",
      to: "Kaneshie Bus Terminal",
      fare: "Free",
      duration: "3 min",
      distance: "200 m",
      stops: 0,
      instructions: "Walk to the main bus terminal. Follow signs for \'East Legon\' routes.",
      delay: null
    },
    {
      id: 3,
      mode: "tro-tro",
      routeNumber: "37",
      from: "Kaneshie Bus Terminal",
      to: "37 Military Hospital",
      fare: "GH₵ 2.50",
      duration: "18 min",
      distance: "6.8 km",
      stops: 8,
      instructions: "Board tro-tro to \'37\'. Inform conductor you\'re going to East Legon.",
      delay: "5 min delay reported"
    },
    {
      id: 4,
      mode: "taxi",
      from: "37 Military Hospital",
      to: "East Legon Junction",
      fare: "GH₵ 2.00",
      duration: "7 min",
      distance: "1.3 km",
      stops: 0,
      instructions: "Take shared taxi or walk if preferred. Negotiate fare before boarding.",
      delay: null
    },
    {
      id: 5,
      mode: "walking",
      from: "East Legon Junction",
      to: "East Legon Mall",
      fare: "Free",
      duration: "2 min",
      distance: "150 m",
      stops: 0,
      instructions: "Short walk to destination. Use pedestrian crossing.",
      delay: null
    }
  ];

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const handleToggleNavigation = () => {
    setIsNavigating(!isNavigating);
    if (!isNavigating) {
      // Start navigation
      setCurrentStepIndex(0);
    }
  };

  const handleShareRoute = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Tro-Tro Route',
        text: `Route from ${routeInfo?.from} to ${routeInfo?.to} - ${routeInfo?.duration}, ${routeInfo?.totalFare}`,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
      alert('Route link copied to clipboard!');
    }
  };

  const handleReportIssue = () => {
    alert('Report issue functionality would open a form to submit route problems or delays.');
  };

  const handleVoiceToggle = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (!isVoiceEnabled) {
      // Enable voice guidance
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Voice guidance enabled');
        speechSynthesis.speak(utterance);
      }
    }
  };

  const handleEmergencyContact = () => {
    const confirmCall = window.confirm('Call emergency services (191)?');
    if (confirmCall) {
      window.location.href = 'tel:191';
    }
  };

  const completedSteps = isNavigating ? Math.min(currentStepIndex, routeSteps?.length) : 0;

  return (
    <div className="min-h-screen bg-background">
      <OfflineIndicator />
      {/* Navigation Header */}
      <NavigationHeader
        routeInfo={routeInfo}
        isNavigating={isNavigating}
        onToggleNavigation={handleToggleNavigation}
        onEmergencyContact={handleEmergencyContact}
      />
      {/* Route Map */}
      <RouteMap
        isCollapsed={isMapCollapsed}
        onToggleCollapse={() => setIsMapCollapsed(!isMapCollapsed)}
        currentLocation={currentLocation}
        routeSteps={routeSteps}
      />
      {/* Main Content */}
      <div className="flex-1 pb-32">
        <div className="p-4 space-y-4">
          {/* Offline Notification */}
          <OfflineNotification 
            isVisible={isOffline}
            hasOfflineData={true}
          />

          {/* Route Progress */}
          <RouteProgressIndicator
            currentStep={currentStepIndex + 1}
            totalSteps={routeSteps?.length}
            completedSteps={completedSteps}
            remainingTime="25 min"
            remainingCost="GH₵ 4.50"
          />

          {/* Navigation Steps */}
          <div className="space-y-3">
            <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
              Step-by-Step Directions
            </h2>
            
            {routeSteps?.map((step, index) => (
              <NavigationStepCard
                key={step?.id}
                step={step}
                stepNumber={index + 1}
                isActive={isNavigating && index === currentStepIndex}
                isCompleted={isNavigating && index < currentStepIndex}
              />
            ))}
          </div>

          {/* Route Summary */}
          <div className="bg-card border border-border rounded-lg p-4 mt-6">
            <h3 className="text-sm font-medium text-foreground font-heading mb-3">
              Route Summary
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground font-caption">Total Distance:</span>
                <div className="font-mono text-foreground">{routeInfo?.distance}</div>
              </div>
              <div>
                <span className="text-muted-foreground font-caption">Total Duration:</span>
                <div className="font-mono text-foreground">{routeInfo?.duration}</div>
              </div>
              <div>
                <span className="text-muted-foreground font-caption">Total Fare:</span>
                <div className="font-mono text-primary font-medium">{routeInfo?.totalFare}</div>
              </div>
              <div>
                <span className="text-muted-foreground font-caption">Transport Modes:</span>
                <div className="font-body text-foreground">Tro-tro, Taxi, Walking</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Action Bar */}
      <NavigationActionBar
        isNavigating={isNavigating}
        onToggleNavigation={handleToggleNavigation}
        onShareRoute={handleShareRoute}
        onReportIssue={handleReportIssue}
        onVoiceToggle={handleVoiceToggle}
        isVoiceEnabled={isVoiceEnabled}
        className="fixed bottom-16 left-0 right-0"
      />
      {/* Bottom Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default RouteDetailsNavigation;