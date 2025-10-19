import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      label: 'Home',
      path: '/route-search-map-interface',
      icon: 'MapPin',
      badge: null
    },
    {
      label: 'Navigation',
      path: '/route-details-navigation',
      icon: 'Navigation',
      badge: null
    },
    {
      label: 'Account',
      path: '/user-login',
      icon: 'User',
      badge: null
    }
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  const isActiveTab = (path) => {
    if (path === '/user-login') {
      return location?.pathname === '/user-login' || location?.pathname === '/user-registration';
    }
    return location?.pathname === path;
  };

  return (
    <nav 
      className={`fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 pb-safe-bottom ${className}`}
      style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center justify-around px-4 py-2 h-16">
        {tabs?.map((tab) => {
          const isActive = isActiveTab(tab?.path);
          
          return (
            <button
              key={tab?.path}
              onClick={() => handleTabClick(tab?.path)}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 py-1 px-2 rounded-lg transition-all duration-200 ease-out ${
                isActive 
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
              aria-label={tab?.label}
            >
              <div className="relative">
                <Icon 
                  name={tab?.icon} 
                  size={24} 
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-current'
                  }`}
                />
                {tab?.badge && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {tab?.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 font-caption transition-colors duration-200 ${
                isActive ? 'text-primary font-medium' : 'text-current'
              }`}>
                {tab?.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;