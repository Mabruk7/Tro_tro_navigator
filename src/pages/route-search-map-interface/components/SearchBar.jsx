import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ 
  fromLocation = '', 
  toLocation = '', 
  onFromChange, 
  onToChange, 
  onSwapLocations,
  onSearch,
  className = '' 
}) => {
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [fromFocused, setFromFocused] = useState(false);
  const [toFocused, setToFocused] = useState(false);
  
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  // Mock Ghanaian locations for autocomplete
  const ghanaianLocations = [
    "Accra Central",
    "Kaneshie Market",
    "Circle (Kwame Nkrumah Circle)",
    "Tema Station",
    "Madina Market",
    "East Legon",
    "Dansoman",
    "Kasoa",
    "Achimota Mall",
    "University of Ghana",
    "Kotoka International Airport",
    "Osu Oxford Street",
    "Labadi Beach",
    "Spintex Road",
    "Weija",
    "Mallam Junction",
    "Lapaz",
    "Adabraka",
    "North Kaneshie",
    "Abeka Junction"
  ];

  const [recentSearches] = useState([
    "Accra Central",
    "Kaneshie Market",
    "Circle",
    "Tema Station"
  ]);

  const filterSuggestions = (query) => {
    if (!query) return recentSearches?.slice(0, 4);
    return ghanaianLocations?.filter(location => 
        location?.toLowerCase()?.includes(query?.toLowerCase())
      )?.slice(0, 6);
  };

  const handleFromInputChange = (e) => {
    const value = e?.target?.value;
    onFromChange?.(value);
    setShowFromSuggestions(true);
  };

  const handleToInputChange = (e) => {
    const value = e?.target?.value;
    onToChange?.(value);
    setShowToSuggestions(true);
  };

  const handleSuggestionClick = (location, isFrom) => {
    if (isFrom) {
      onFromChange?.(location);
      setShowFromSuggestions(false);
      toInputRef?.current?.focus();
    } else {
      onToChange?.(location);
      setShowToSuggestions(false);
    }
  };

  const handleSwap = () => {
    onSwapLocations?.();
  };

  const handleSearch = () => {
    if (fromLocation && toLocation) {
      onSearch?.({ from: fromLocation, to: toLocation });
      setShowFromSuggestions(false);
      setShowToSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromInputRef?.current && !fromInputRef?.current?.contains(event?.target)) {
        setShowFromSuggestions(false);
      }
      if (toInputRef?.current && !toInputRef?.current?.contains(event?.target)) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`bg-card shadow-elevation-2 rounded-lg p-4 ${className}`}>
      <div className="space-y-3">
        {/* From Input */}
        <div className="relative" ref={fromInputRef}>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-3 h-3 bg-success rounded-full"></div>
            </div>
            <Input
              type="text"
              placeholder="From (Current location)"
              value={fromLocation}
              onChange={handleFromInputChange}
              onFocus={() => {
                setFromFocused(true);
                setShowFromSuggestions(true);
              }}
              onBlur={() => setFromFocused(false)}
              onKeyPress={handleKeyPress}
              className="pl-10"
            />
          </div>
          
          {/* From Suggestions */}
          {showFromSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-elevation-2 z-50 max-h-48 overflow-y-auto">
              {filterSuggestions(fromLocation)?.map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(location, true)}
                  className="w-full text-left px-4 py-3 hover:bg-muted transition-colors duration-200 flex items-center space-x-3 border-b border-border last:border-b-0"
                >
                  <Icon name="MapPin" size={16} className="text-muted-foreground flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground font-body">{location}</div>
                    {!fromLocation && recentSearches?.includes(location) && (
                      <div className="text-xs text-muted-foreground font-caption">Recent search</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="w-8 h-8 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
            aria-label="Swap locations"
          >
            <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* To Input */}
        <div className="relative" ref={toInputRef}>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-3 h-3 bg-error rounded-full"></div>
            </div>
            <Input
              type="text"
              placeholder="To (Destination)"
              value={toLocation}
              onChange={handleToInputChange}
              onFocus={() => {
                setToFocused(true);
                setShowToSuggestions(true);
              }}
              onBlur={() => setToFocused(false)}
              onKeyPress={handleKeyPress}
              className="pl-10"
            />
          </div>
          
          {/* To Suggestions */}
          {showToSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-elevation-2 z-50 max-h-48 overflow-y-auto">
              {filterSuggestions(toLocation)?.map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(location, false)}
                  className="w-full text-left px-4 py-3 hover:bg-muted transition-colors duration-200 flex items-center space-x-3 border-b border-border last:border-b-0"
                >
                  <Icon name="MapPin" size={16} className="text-muted-foreground flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground font-body">{location}</div>
                    {!toLocation && recentSearches?.includes(location) && (
                      <div className="text-xs text-muted-foreground font-caption">Recent search</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={!fromLocation || !toLocation}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium transition-all duration-200 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-body"
        >
          <Icon name="Search" size={18} />
          <span>Find Routes</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;