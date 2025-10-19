import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MapContainer = ({ 
  selectedRoute, 
  currentLocation, 
  onLocationUpdate,
  showTrafficOverlay = false,
  className = '' 
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState(currentLocation);

  // Mock coordinates for Accra, Ghana
  const defaultCenter = { lat: 5.6037, lng: -0.1870 };

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          };
          setUserLocation(newLocation);
          onLocationUpdate?.(newLocation);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to mock location
          const mockLocation = { lat: 5.6037, lng: -0.1870 };
          setUserLocation(mockLocation);
          onLocationUpdate?.(mockLocation);
        }
      );
    }
  };

  if (!mapLoaded) {
    return (
      <div className={`relative w-full h-full bg-muted animate-pulse ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground font-body">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Google Maps Embed */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Tro-Tro Route Map"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${userLocation?.lat || defaultCenter?.lat},${userLocation?.lng || defaultCenter?.lng}&z=14&output=embed`}
        className="w-full h-full border-0"
      />
      {/* Traffic Overlay Indicator */}
      {showTrafficOverlay && (
        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-elevation-1">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-foreground font-caption">
              Live Traffic
            </span>
          </div>
        </div>
      )}
      {/* Route Visualization Overlay */}
      {selectedRoute && (
        <div className="absolute top-16 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-elevation-1 max-w-48">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${
              selectedRoute?.mode === 'tro-tro' ? 'bg-primary' :
              selectedRoute?.mode === 'taxi' ? 'bg-warning' : 'bg-secondary'
            }`}></div>
            <span className="text-sm font-medium text-foreground font-body capitalize">
              {selectedRoute?.mode} Route
            </span>
          </div>
          <div className="text-xs text-muted-foreground space-y-1 font-caption">
            <div>Duration: {selectedRoute?.duration}</div>
            <div>Fare: {selectedRoute?.fare}</div>
            <div>Transfers: {selectedRoute?.transfers}</div>
          </div>
        </div>
      )}
      {/* Current Location Button */}
      <button
        onClick={handleCurrentLocationClick}
        className="absolute bottom-20 right-4 w-12 h-12 bg-card shadow-elevation-2 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
        aria-label="Get current location"
      >
        <Icon name="MapPin" size={20} />
      </button>
      {/* Zoom Controls */}
      <div className="absolute bottom-36 right-4 bg-card shadow-elevation-1 rounded-lg overflow-hidden">
        <button
          className="block w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-200"
          aria-label="Zoom in"
        >
          <Icon name="Plus" size={16} />
        </button>
        <div className="w-full h-px bg-border"></div>
        <button
          className="block w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-200"
          aria-label="Zoom out"
        >
          <Icon name="Minus" size={16} />
        </button>
      </div>
    </div>
  );
};

export default MapContainer;