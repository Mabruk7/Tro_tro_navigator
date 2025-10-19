import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ 
  onFilterChange, 
  selectedFilters = {},
  className = '' 
}) => {
  const [activeFilters, setActiveFilters] = useState({
    mode: selectedFilters?.mode || 'all',
    sortBy: selectedFilters?.sortBy || 'fastest',
    accessibility: selectedFilters?.accessibility || false,
    ...selectedFilters
  });

  const transportModes = [
    { id: 'all', label: 'All', icon: 'MapPin' },
    { id: 'tro-tro', label: 'Tro-tro', icon: 'Bus' },
    { id: 'taxi', label: 'Taxi', icon: 'Car' },
    { id: 'bus', label: 'Bus', icon: 'Bus' }
  ];

  const sortOptions = [
    { id: 'fastest', label: 'Fastest', icon: 'Zap' },
    { id: 'cheapest', label: 'Cheapest', icon: 'DollarSign' },
    { id: 'least-transfers', label: 'Fewest Transfers', icon: 'ArrowRight' }
  ];

  const handleModeChange = (modeId) => {
    const newFilters = { ...activeFilters, mode: modeId };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSortChange = (sortId) => {
    const newFilters = { ...activeFilters, sortBy: sortId };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleAccessibilityToggle = () => {
    const newFilters = { ...activeFilters, accessibility: !activeFilters?.accessibility };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      mode: 'all',
      sortBy: 'fastest',
      accessibility: false
    };
    setActiveFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  return (
    <div className={`bg-card border-b border-border ${className}`}>
      <div className="px-4 py-3">
        {/* Transport Mode Filters */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2 font-body">Transport Mode</h4>
          <div className="flex flex-wrap gap-2">
            {transportModes?.map((mode) => (
              <button
                key={mode?.id}
                onClick={() => handleModeChange(mode?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 font-caption ${
                  activeFilters?.mode === mode?.id
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                <Icon name={mode?.icon} size={16} />
                <span>{mode?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2 font-body">Sort By</h4>
          <div className="flex flex-wrap gap-2">
            {sortOptions?.map((option) => (
              <button
                key={option?.id}
                onClick={() => handleSortChange(option?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 font-caption ${
                  activeFilters?.sortBy === option?.id
                    ? 'bg-secondary text-secondary-foreground shadow-elevation-1'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                <Icon name={option?.icon} size={16} />
                <span>{option?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Additional Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Accessibility Filter */}
            <button
              onClick={handleAccessibilityToggle}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 font-caption ${
                activeFilters?.accessibility
                  ? 'bg-accent text-accent-foreground shadow-elevation-1'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              <Icon name="Accessibility" size={16} />
              <span>Accessible</span>
            </button>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearAllFilters}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-caption"
          >
            Clear all
          </button>
        </div>

        {/* Active Filter Count */}
        {(activeFilters?.mode !== 'all' || activeFilters?.sortBy !== 'fastest' || activeFilters?.accessibility) && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground font-caption">
              <Icon name="Filter" size={14} />
              <span>
                {[
                  activeFilters?.mode !== 'all' && `Mode: ${activeFilters?.mode}`,
                  activeFilters?.sortBy !== 'fastest' && `Sort: ${activeFilters?.sortBy}`,
                  activeFilters?.accessibility && 'Accessible routes'
                ]?.filter(Boolean)?.join(' • ')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterChips;