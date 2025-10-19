import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AuthenticationModal = ({ isOpen = false, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      if (location?.pathname === '/user-registration') {
        setMode('register');
      } else {
        setMode('login');
      }
    }
  }, [isOpen, location?.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (mode === 'register') {
      if (!formData?.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      
      if (!formData?.phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required';
      }
      
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (mode === 'login') {
        console.log('Login attempt:', { email: formData?.email });
      } else {
        console.log('Registration attempt:', {
          fullName: formData?.fullName,
          email: formData?.email,
          phoneNumber: formData?.phoneNumber
        });
      }
      
      navigate('/route-search-map-interface');
      onClose();
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    const newMode = mode === 'login' ? 'register' : 'login';
    setMode(newMode);
    setErrors({});
    
    if (newMode === 'register') {
      navigate('/user-registration');
    } else {
      navigate('/user-login');
    }
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Tro-Tro Navigator
              </h2>
              <p className="text-sm text-muted-foreground">
                {mode === 'login' ? 'Welcome back' : 'Join our community'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Close"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && (
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData?.fullName}
              onChange={handleInputChange}
              error={errors?.fullName}
              required
            />
          )}

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
          />

          {mode === 'register' && (
            <Input
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData?.phoneNumber}
              onChange={handleInputChange}
              error={errors?.phoneNumber}
              required
            />
          )}

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
          />

          {mode === 'register' && (
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={handleInputChange}
              error={errors?.confirmPassword}
              required
            />
          )}

          {errors?.submit && (
            <div className="text-error text-sm text-center p-2 bg-error/10 rounded-md">
              {errors?.submit}
            </div>
          )}

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            className="mt-6"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>

          <div className="text-center pt-4">
            <button
              type="button"
              onClick={switchMode}
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200"
            >
              {mode === 'login' ? "Don't have an account? Sign up" :"Already have an account? Sign in"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthenticationModal;