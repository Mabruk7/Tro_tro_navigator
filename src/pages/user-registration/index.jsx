import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AppHeader from './components/AppHeader';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import LoadingOverlay from './components/LoadingOverlay';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import OfflineIndicator from '../../components/ui/OfflineIndicator';
import Icon from '../../components/AppIcon';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStep, setRegistrationStep] = useState('form');
  const [loadingMessage, setLoadingMessage] = useState('Creating your account...');

  // Mock credentials for testing
  const mockCredentials = {
    email: 'test@example.com',
    password: 'Test123!',
    phone: '+233241234567'
  };

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      // Language preference would be applied here
      console.log('Applying saved language:', savedLanguage);
    }
  }, []);

  const handleRegistrationSubmit = async (registrationData) => {
    setIsLoading(true);
    setLoadingMessage('Creating your account...');
    
    try {
      // Simulate account creation process
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoadingMessage('Setting up your profile...');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoadingMessage('Preparing your dashboard...');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      console.log('Registration successful:', {
        fullName: registrationData?.fullName,
        email: registrationData?.email,
        phone: registrationData?.phoneNumber,
        termsAccepted: registrationData?.termsAccepted,
        marketingConsent: registrationData?.marketingConsent
      });
      
      // Store user session
      localStorage.setItem('user-session', JSON.stringify({
        id: 'user_' + Date.now(),
        email: registrationData?.email,
        fullName: registrationData?.fullName,
        phone: registrationData?.phoneNumber,
        registeredAt: new Date()?.toISOString()
      }));
      
      // Navigate to main app
      navigate('/route-search-map-interface');
      
    } catch (error) {
      console.error('Registration failed:', error);
      setLoadingMessage('Registration failed. Please try again.');
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  const handleSocialRegistration = async (provider) => {
    setIsLoading(true);
    setLoadingMessage(`Connecting with ${provider}...`);
    
    try {
      // Simulate social registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`Social registration with ${provider} successful`);
      
      // Store mock social user session
      localStorage.setItem('user-session', JSON.stringify({
        id: 'social_user_' + Date.now(),
        provider: provider,
        email: `user@${provider}.com`,
        fullName: 'Social User',
        registeredAt: new Date()?.toISOString()
      }));
      
      navigate('/route-search-map-interface');
      
    } catch (error) {
      console.error(`${provider} registration failed:`, error);
      setLoadingMessage(`${provider} registration failed. Please try again.`);
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Account - Tro-Tro Navigator</title>
        <meta name="description" content="Join Tro-Tro Navigator to access personalized route planning, favorites, and history tracking for Ghana's public transportation system." />
        <meta name="keywords" content="Ghana transport, tro-tro, account registration, route planning" />
        <meta property="og:title" content="Create Account - Tro-Tro Navigator" />
        <meta property="og:description" content="Join thousands of Ghanaians using Tro-Tro Navigator for smart public transport navigation." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <OfflineIndicator />
        <AppHeader showLanguageSelector={true} />
        
        <main className="flex-1 flex flex-col">
          <div className="flex-1 max-w-md mx-auto w-full px-4 py-6">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="UserPlus" size={32} className="text-primary" />
              </div>
              <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                Join Tro-Tro Navigator
              </h1>
              <p className="text-muted-foreground font-body leading-relaxed">
                Create your account to save favorite routes, track your travel history, and get personalized recommendations for Ghana's public transport.
              </p>
            </div>

            {/* Registration Form */}
            <div className="space-y-6">
              <RegistrationForm 
                onSubmit={handleRegistrationSubmit}
                isLoading={isLoading}
              />

              <SocialRegistration 
                onSocialRegister={handleSocialRegistration}
                isLoading={isLoading}
              />
            </div>

            {/* Sign In Link */}
            <div className="text-center mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground font-body mb-2">
                Already have an account?
              </p>
              <Link
                to="/user-login"
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200 touch-manipulation"
              >
                <Icon name="LogIn" size={16} />
                <span>Sign In to Your Account</span>
              </Link>
            </div>

            {/* Help Section */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="HelpCircle" size={20} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-foreground font-medium mb-1">Need help?</p>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    Contact our support team or visit our help center for assistance with account creation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <BottomTabNavigation />
        <LoadingOverlay isVisible={isLoading} message={loadingMessage} />
      </div>
    </>
  );
};

export default UserRegistration;