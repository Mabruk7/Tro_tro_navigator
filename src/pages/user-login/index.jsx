import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AppHeader from './components/AppHeader';
import LoginForm from './components/LoginForm';
import SocialLoginOptions from './components/SocialLoginOptions';
import CreateAccountPrompt from './components/CreateAccountPrompt';
import OfflineIndicator from './components/OfflineIndicator';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';

const UserLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Mock credentials for testing
  const mockCredentials = {
    phoneOrEmail: 'user@example.com',
    password: 'password123'
  };

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      // Language would be applied here in a real app
      console.log('Applying saved language:', savedLanguage);
    }
  }, []);

  const validateForm = (formData) => {
    const newErrors = {};
    
    if (!formData?.phoneOrEmail) {
      newErrors.phoneOrEmail = 'Phone number or email is required';
    } else if (formData?.phoneOrEmail?.includes('@')) {
      // Email validation
      if (!/\S+@\S+\.\S+/?.test(formData?.phoneOrEmail)) {
        newErrors.phoneOrEmail = 'Please enter a valid email address';
      }
    } else {
      // Phone number validation (Ghana format)
      if (!/^(\+233|0)[2-9]\d{8}$/?.test(formData?.phoneOrEmail?.replace(/\s/g, ''))) {
        newErrors.phoneOrEmail = 'Please enter a valid Ghana phone number';
      }
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleLogin = async (formData) => {
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check mock credentials
      if (formData?.phoneOrEmail === mockCredentials?.phoneOrEmail && 
          formData?.password === mockCredentials?.password) {
        
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData?.phoneOrEmail);
        
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        // Navigate to main app
        navigate('/route-search-map-interface');
      } else {
        setErrors({
          submit: `Invalid credentials. Use: ${mockCredentials?.phoneOrEmail} / ${mockCredentials?.password}`
        });
      }
    } catch (error) {
      setErrors({
        submit: 'Login failed. Please check your internet connection and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loginProvider', provider);
      
      navigate('/route-search-map-interface');
    } catch (error) {
      setErrors({
        submit: `${provider} login failed. Please try again.`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In - Tro-Tro Navigator</title>
        <meta name="description" content="Sign in to access personalized route planning and save your favorite tro-tro routes in Ghana." />
        <meta name="keywords" content="Ghana transport, tro-tro, login, sign in, public transport" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <AppHeader />
        <OfflineIndicator />
        
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Welcome Back
              </h2>
              <p className="text-muted-foreground font-body">
                Sign in to continue your journey with Ghana's most trusted transport app
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-card rounded-lg shadow-elevation-1 p-6 space-y-6">
              <LoginForm
                onSubmit={handleLogin}
                isLoading={isLoading}
                errors={errors}
              />
              
              <SocialLoginOptions
                onSocialLogin={handleSocialLogin}
                isLoading={isLoading}
              />
            </div>

            {/* Create Account Prompt */}
            <CreateAccountPrompt />

            {/* Quick Access Info */}
            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground font-caption">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-success rounded-full"></span>
                  <span>Secure Login</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Ghana Trusted</span>
                </span>
              </div>
            </div>
          </div>
        </main>

        <BottomTabNavigation />
      </div>
    </>
  );
};

export default UserLogin;