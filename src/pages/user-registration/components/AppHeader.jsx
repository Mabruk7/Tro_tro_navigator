import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AppHeader = ({ showLanguageSelector = true }) => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tw', name: 'Twi', flag: '🇬🇭' },
    { code: 'ee', name: 'Ewe', flag: '🇬🇭' }
  ];

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    setShowLanguageMenu(false);
    // Store language preference
    localStorage.setItem('preferred-language', langCode);
  };

  const handleBackClick = () => {
    navigate('/user-login');
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-40">
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackClick}
            iconName="ArrowLeft"
            iconSize={20}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Go back to login"
          >
            Back
          </Button>

          {/* App Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={20} className="text-primary-foreground" />
            </div>
            <div className="text-center">
              <h1 className="text-lg font-heading font-bold text-foreground">
                Tro-Tro Navigator
              </h1>
              <p className="text-xs text-muted-foreground font-caption">
                Ghana's Transport Guide
              </p>
            </div>
          </div>

          {/* Language Selector */}
          {showLanguageSelector && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Select language"
              >
                <span className="text-lg mr-1">
                  {languages?.find(lang => lang?.code === currentLanguage)?.flag}
                </span>
                <Icon name="ChevronDown" size={16} />
              </Button>

              {showLanguageMenu && (
                <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-elevation-2 py-2 min-w-[120px] z-50">
                  {languages?.map((lang) => (
                    <button
                      key={lang?.code}
                      onClick={() => handleLanguageChange(lang?.code)}
                      className={`
                        w-full px-3 py-2 text-left text-sm font-body
                        hover:bg-muted transition-colors duration-200
                        flex items-center space-x-2
                        ${currentLanguage === lang?.code ? 'bg-muted text-primary' : 'text-foreground'}
                      `}
                    >
                      <span className="text-base">{lang?.flag}</span>
                      <span>{lang?.name}</span>
                      {currentLanguage === lang?.code && (
                        <Icon name="Check" size={14} className="ml-auto text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;