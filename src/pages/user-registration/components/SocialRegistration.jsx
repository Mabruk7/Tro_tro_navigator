import React from 'react';

import Icon from '../../../components/AppIcon';

const SocialRegistration = ({ onSocialRegister, isLoading = false }) => {
  const socialOptions = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300',
      hoverBg: 'hover:bg-gray-50'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600',
      hoverBg: 'hover:bg-blue-700'
    }
  ];

  const handleSocialClick = (provider) => {
    if (onSocialRegister) {
      onSocialRegister(provider);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground font-body">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialOptions?.map((option) => (
          <button
            key={option?.id}
            type="button"
            onClick={() => handleSocialClick(option?.id)}
            disabled={isLoading}
            className={`
              flex items-center justify-center px-4 py-3 border rounded-lg
              font-medium text-sm transition-all duration-200 ease-out
              ${option?.bgColor} ${option?.textColor} ${option?.borderColor}
              ${option?.hoverBg} hover:shadow-elevation-1
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              min-h-[48px] touch-manipulation
            `}
            aria-label={`Continue with ${option?.name}`}
          >
            <Icon 
              name={option?.icon} 
              size={20} 
              className="mr-3 flex-shrink-0" 
            />
            <span className="font-body">
              Continue with {option?.name}
            </span>
          </button>
        ))}
      </div>
      <div className="text-center text-xs text-muted-foreground font-caption leading-relaxed">
        By continuing, you agree to our Terms of Service and acknowledge our Privacy Policy.
        <br />
        Your data will be handled securely and never shared without permission.
      </div>
    </div>
  );
};

export default SocialRegistration;