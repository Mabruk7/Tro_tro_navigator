import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import OfflineIndicator from '../../components/ui/OfflineIndicator';
import AuthenticationModal from '../../components/ui/AuthenticationModal';
import MapContainer from './components/MapContainer';
import SearchBar from './components/SearchBar';
import RouteResultsSheet from './components/RouteResultsSheet';
import FilterChips from './components/FilterChips';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RouteSearchMapInterface = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [showRouteResults, setShowRouteResults] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showTrafficOverlay, setShowTrafficOverlay] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    mode: 'all',
    sortBy: 'fastest',
    accessibility: false
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [routes, setRoutes] = useState([]);

  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  }, []);

  // Get current location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          });
          setFromLocation('Current Location');
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to mock Accra location
          setCurrentLocation({ lat: 5.6037, lng: -0.1870 });
          setFromLocation('Accra Central');
        }
      );
    }
  }, []);

  const handleFromLocationChange = (location) => {
    setFromLocation(location);
  };

  const handleToLocationChange = (location) => {
    setToLocation(location);
  };

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSearch = async (searchData) => {
    setIsSearching(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock route generation based on search criteria
      const mockRoutes = generateMockRoutes(searchData, searchFilters);
      setRoutes(mockRoutes);
      setShowRouteResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const generateMockRoutes = (searchData, filters) => {
    const baseRoutes = [
      {
        id: 1,
        mode: 'tro-tro',
        duration: '25 min',
        fare: 'GH₵ 3.50',
        transfers: 1,
        walkingTime: '8 min',
        from: searchData?.from,
        to: searchData?.to,
        tags: ['Most Popular']
      },
      {
        id: 2,
        mode: 'taxi',
        duration: '18 min',
        fare: 'GH₵ 12.00',
        transfers: 0,
        walkingTime: '2 min',
        from: searchData?.from,
        to: searchData?.to,
        tags: ['Fastest', 'Direct']
      },
      {
        id: 3,
        mode: 'bus',
        duration: '35 min',
        fare: 'GH₵ 2.80',
        transfers: 2,
        walkingTime: '12 min',
        from: searchData?.from,
        to: searchData?.to,
        tags: ['Cheapest']
      }
    ];

    // Filter routes based on selected mode
    let filteredRoutes = filters?.mode === 'all' 
      ? baseRoutes 
      : baseRoutes?.filter(route => route?.mode === filters?.mode);

    // Sort routes based on selected criteria
    switch (filters?.sortBy) {
      case 'fastest':
        filteredRoutes?.sort((a, b) => parseInt(a?.duration) - parseInt(b?.duration));
        break;
      case 'cheapest':
        filteredRoutes?.sort((a, b) => 
          parseFloat(a?.fare?.replace('GH₵ ', '')) - parseFloat(b?.fare?.replace('GH₵ ', ''))
        );
        break;
      case 'least-transfers':
        filteredRoutes?.sort((a, b) => a?.transfers - b?.transfers);
        break;
    }

    return filteredRoutes;
  };

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  const handleLocationUpdate = (location) => {
    setCurrentLocation(location);
  };

  const handleFilterChange = (filters) => {
    setSearchFilters(filters);
    
    // Re-run search with new filters if we have existing results
    if (showRouteResults && fromLocation && toLocation) {
      handleSearch({ from: fromLocation, to: toLocation });
    }
  };

  const handleCloseRouteResults = () => {
    setShowRouteResults(false);
    setSelectedRoute(null);
  };

  const handleAuthSuccess = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setShowAuthModal(false);
  };

  const toggleTrafficOverlay = () => {
    setShowTrafficOverlay(!showTrafficOverlay);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Offline Indicator */}
      <OfflineIndicator />
      {/* Authentication Modal */}
      <AuthenticationModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
      {/* Main Content */}
      <div className="flex-1 relative">
        {/* Desktop Layout */}
        <div className="hidden lg:flex h-screen">
          {/* Left Sidebar - Search Panel */}
          <div className="w-80 bg-card border-r border-border flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="MapPin" size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground font-heading">
                    Tro-Tro Navigator
                  </h1>
                  <p className="text-sm text-muted-foreground font-caption">
                    Find your route
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <SearchBar
                fromLocation={fromLocation}
                toLocation={toLocation}
                onFromChange={handleFromLocationChange}
                onToChange={handleToLocationChange}
                onSwapLocations={handleSwapLocations}
                onSearch={handleSearch}
              />
            </div>

            {/* Filters */}
            <FilterChips
              selectedFilters={searchFilters}
              onFilterChange={handleFilterChange}
            />

            {/* Route Results */}
            <div className="flex-1 overflow-y-auto">
              {isSearching ? (
                <div className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground font-body">Searching routes...</p>
                  </div>
                </div>
              ) : routes?.length > 0 ? (
                <div className="p-4 space-y-3">
                  <h3 className="font-medium text-foreground font-body">
                    {routes?.length} routes found
                  </h3>
                  {routes?.map((route) => (
                    <div
                      key={route?.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                        selectedRoute?.id === route?.id
                          ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleRouteSelect(route)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Icon 
                            name={route?.mode === 'tro-tro' ? 'Bus' : route?.mode === 'taxi' ? 'Car' : 'Bus'} 
                            size={16} 
                            className="text-primary" 
                          />
                          <span className="font-medium text-foreground font-body capitalize">
                            {route?.mode}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-primary font-mono">
                          {route?.fare}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground font-caption">
                        {route?.duration} • {route?.transfers} transfer{route?.transfers !== 1 ? 's' : ''}
                      </div>
                      {route?.tags && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {route?.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded font-caption"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground font-body">
                      Enter locations to find routes
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="flex-1 relative">
            <MapContainer
              selectedRoute={selectedRoute}
              currentLocation={currentLocation}
              onLocationUpdate={handleLocationUpdate}
              showTrafficOverlay={showTrafficOverlay}
              className="h-full"
            />
            
            {/* Traffic Toggle Button */}
            <Button
              variant={showTrafficOverlay ? "default" : "outline"}
              size="sm"
              onClick={toggleTrafficOverlay}
              iconName="Activity"
              iconPosition="left"
              className="absolute top-4 left-4"
            >
              Traffic
            </Button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden h-screen flex flex-col">
          {/* Search Bar - Fixed at top */}
          <div className="relative z-30">
            <SearchBar
              fromLocation={fromLocation}
              toLocation={toLocation}
              onFromChange={handleFromLocationChange}
              onToChange={handleToLocationChange}
              onSwapLocations={handleSwapLocations}
              onSearch={handleSearch}
              className="m-4"
            />
          </div>

          {/* Map Container */}
          <div className="flex-1 relative">
            <MapContainer
              selectedRoute={selectedRoute}
              currentLocation={currentLocation}
              onLocationUpdate={handleLocationUpdate}
              showTrafficOverlay={showTrafficOverlay}
              className="h-full"
            />

            {/* Floating Action Buttons */}
            <div className="absolute top-4 right-4 space-y-2">
              <Button
                variant={showTrafficOverlay ? "default" : "outline"}
                size="icon"
                onClick={toggleTrafficOverlay}
                iconName="Activity"
                className="shadow-elevation-2"
              />
            </div>

            {/* Loading Overlay */}
            {isSearching && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-20">
                <div className="bg-card rounded-lg p-6 shadow-elevation-3">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-sm text-foreground font-body">Finding best routes...</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Route Results Bottom Sheet */}
          <RouteResultsSheet
            routes={routes}
            isVisible={showRouteResults}
            onClose={handleCloseRouteResults}
            onRouteSelect={handleRouteSelect}
          />
        </div>
      </div>
      {/* Bottom Tab Navigation - Mobile Only */}
      <BottomTabNavigation className="lg:hidden" />
    </div>
  );
};

export default RouteSearchMapInterface;