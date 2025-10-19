import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AppHeader = () => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const navigate = useNavigate();

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'TW', name: 'Twi' },
    { code: 'EW', name: 'Ewe' }
  ];

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('selectedLanguage', langCode);
  };

  const handleBackClick = () => {
    navigate('/route-search-map-interface');
  };

  return (
    <header className="bg-background border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={handleBackClick}
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted/50 transition-colors duration-200"
          aria-label="Go back"
        >
          <Icon name="ArrowLeft" size={20} className="text-foreground" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="MapPin" size={20} className="text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-heading font-semibold text-foreground">
              Tro-Tro Navigator
            </h1>
            <p className="text-xs text-muted-foreground font-caption">
              Your trusted travel companion
            </p>
          </div>
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 px-3 text-sm font-medium"
          >
            <Icon name="Globe" size={16} className="mr-1" />
            {currentLanguage}
            <Icon name="ChevronDown" size={14} className="ml-1" />
          </Button>
          
          {/* Language dropdown would be implemented here in a real app */}
          <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-elevation-2 py-1 min-w-[120px] hidden">
            {languages?.map((lang) => (
              <button
                key={lang?.code}
                onClick={() => handleLanguageChange(lang?.code)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-muted/50 transition-colors duration-200 ${
                  currentLanguage === lang?.code ? 'text-primary font-medium' : 'text-foreground'
                }`}
              >
                {lang?.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;