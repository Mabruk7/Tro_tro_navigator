import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RouteResultsSheet = ({ 
  routes = [], 
  isVisible = false, 
  onClose, 
  onRouteSelect,
  className = '' 
}) => {
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [sheetHeight, setSheetHeight] = useState('partial'); // partial, expanded
  const navigate = useNavigate();

  // Mock route data
  const mockRoutes = routes?.length > 0 ? routes : [
    {
      id: 1,
      mode: 'tro-tro',
      duration: '25 min',
      fare: 'GH₵ 3.50',
      transfers: 1,
      walkingTime: '8 min',
      steps: [
        { type: 'walk', description: 'Walk to Accra Central Station', duration: '3 min' },
        { type: 'tro-tro', description: 'Tro-tro to Circle', duration: '15 min', fare: 'GH₵ 2.00' },
        { type: 'transfer', description: 'Transfer at Circle', duration: '2 min' },
        { type: 'tro-tro', description: 'Tro-tro to Kaneshie Market', duration: '10 min', fare: 'GH₵ 1.50' },
        { type: 'walk', description: 'Walk to destination', duration: '3 min' }
      ],
      tags: ['Fastest', 'Most Popular']
    },
    {
      id: 2,
      mode: 'taxi',
      duration: '18 min',
      fare: 'GH₵ 12.00',
      transfers: 0,
      walkingTime: '2 min',
      steps: [
        { type: 'walk', description: 'Walk to pickup point', duration: '1 min' },
        { type: 'taxi', description: 'Direct taxi to destination', duration: '15 min', fare: 'GH₵ 12.00' },
        { type: 'walk', description: 'Walk to destination', duration: '1 min' }
      ],
      tags: ['Fastest', 'Direct']
    },
    {
      id: 3,
      mode: 'bus',
      duration: '35 min',
      fare: 'GH₵ 2.80',
      transfers: 2,
      walkingTime: '12 min',
      steps: [
        { type: 'walk', description: 'Walk to bus stop', duration: '5 min' },
        { type: 'bus', description: 'Bus to Tema Station', duration: '12 min', fare: 'GH₵ 1.50' },
        { type: 'transfer', description: 'Transfer at Tema Station', duration: '3 min' },
        { type: 'bus', description: 'Bus to Circle', duration: '8 min', fare: 'GH₵ 1.30' },
        { type: 'transfer', description: 'Transfer at Circle', duration: '2 min' },
        { type: 'tro-tro', description: 'Tro-tro to Kaneshie Market', duration: '8 min', fare: 'GH₵ 1.00' },
        { type: 'walk', description: 'Walk to destination', duration: '4 min' }
      ],
      tags: ['Cheapest']
    }
  ];

  const getModeIcon = (mode) => {
    switch (mode) {
      case 'tro-tro': return 'Bus';
      case 'taxi': return 'Car';
      case 'bus': return 'Bus';
      default: return 'MapPin';
    }
  };

  const getModeColor = (mode) => {
    switch (mode) {
      case 'tro-tro': return 'text-primary';
      case 'taxi': return 'text-warning';
      case 'bus': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  const handleRouteSelect = (route) => {
    setSelectedRouteId(route?.id);
    onRouteSelect?.(route);
  };

  const handleStartNavigation = (route) => {
    navigate('/route-details-navigation', { 
      state: { selectedRoute: route } 
    });
  };

  const handleShare = (route) => {
    if (navigator.share) {
      navigator.share({
        title: 'Tro-Tro Route',
        text: `Route via ${route?.mode}: ${route?.duration}, ${route?.fare}`,
        url: window.location?.href
      });
    } else {
      // Fallback for browsers without Web Share API
      const shareText = `Route via ${route?.mode}: ${route?.duration}, ${route?.fare}`;
      navigator.clipboard?.writeText(shareText);
    }
  };

  const toggleSheetHeight = () => {
    setSheetHeight(prev => prev === 'partial' ? 'expanded' : 'partial');
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 ${className}`}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 -z-10"
        onClick={onClose}
      />
      {/* Bottom Sheet */}
      <div className={`bg-card rounded-t-2xl shadow-elevation-3 transition-all duration-300 ease-out ${
        sheetHeight === 'expanded' ? 'h-[80vh]' : 'h-[50vh]'
      }`}>
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <button
            onClick={toggleSheetHeight}
            className="w-12 h-1 bg-muted-foreground/30 rounded-full hover:bg-muted-foreground/50 transition-colors duration-200"
            aria-label="Resize sheet"
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-foreground font-heading">
              Route Options
            </h3>
            <p className="text-sm text-muted-foreground font-caption">
              {mockRoutes?.length} routes found
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Close"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Routes List */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div className="space-y-3">
            {mockRoutes?.map((route) => (
              <div
                key={route?.id}
                className={`border rounded-lg p-4 transition-all duration-200 cursor-pointer ${
                  selectedRouteId === route?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
                }`}
                onClick={() => handleRouteSelect(route)}
              >
                {/* Route Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${getModeColor(route?.mode)}`}>
                      <Icon name={getModeIcon(route?.mode)} size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-foreground font-body capitalize">
                        {route?.mode} Route
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground font-caption">
                        <span>{route?.duration}</span>
                        <span>•</span>
                        <span>{route?.fare}</span>
                        {route?.transfers > 0 && (
                          <>
                            <span>•</span>
                            <span>{route?.transfers} transfer{route?.transfers > 1 ? 's' : ''}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        handleShare(route);
                      }}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                      aria-label="Share route"
                    >
                      <Icon name="Share2" size={18} />
                    </button>
                  </div>
                </div>

                {/* Tags */}
                {route?.tags && route?.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {route?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 text-xs rounded-full font-medium font-caption ${
                          tag === 'Fastest' ? 'bg-success/10 text-success' :
                          tag === 'Cheapest' ? 'bg-primary/10 text-primary' :
                          tag === 'Direct'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Route Steps (Expanded View) */}
                {selectedRouteId === route?.id && sheetHeight === 'expanded' && (
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-medium text-foreground font-body">Route Details:</h4>
                    {route?.steps?.map((step, index) => (
                      <div key={index} className="flex items-center space-x-3 text-sm">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          step?.type === 'walk' ? 'bg-muted text-muted-foreground' :
                          step?.type === 'transfer'? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="text-foreground font-body">{step?.description}</div>
                          <div className="text-muted-foreground font-caption">
                            {step?.duration}
                            {step?.fare && ` • ${step?.fare}`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Button */}
                {selectedRouteId === route?.id && (
                  <Button
                    variant="default"
                    fullWidth
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleStartNavigation(route);
                    }}
                    iconName="Navigation"
                    iconPosition="left"
                    className="mt-3"
                  >
                    Start Navigation
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteResultsSheet;