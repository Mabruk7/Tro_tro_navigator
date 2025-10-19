import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [agreements, setAgreements] = useState({
    termsAccepted: false,
    marketingConsent: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    let formattedValue = value;
    
    // Format phone number for Ghana (+233)
    if (name === 'phoneNumber') {
      // Remove all non-digits
      const digits = value?.replace(/\D/g, '');
      
      // Format as Ghana number
      if (digits?.length > 0) {
        if (digits?.startsWith('233')) {
          formattedValue = `+${digits}`;
        } else if (digits?.startsWith('0')) {
          formattedValue = `+233${digits?.substring(1)}`;
        } else {
          formattedValue = `+233${digits}`;
        }
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAgreementChange = (field, checked) => {
    setAgreements(prev => ({
      ...prev,
      [field]: checked
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Full name validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    // Phone number validation
    if (!formData?.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+233\d{9}$/?.test(formData?.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid Ghana phone number';
    }
    
    // Email validation
    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    // Confirm password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms acceptance validation
    if (!agreements?.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const registrationData = {
      ...formData,
      ...agreements
    };
    
    onSubmit(registrationData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={handleInputChange}
          error={errors?.fullName}
          required
          className="text-lg"
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          placeholder="+233 XX XXX XXXX"
          value={formData?.phoneNumber}
          onChange={handleInputChange}
          error={errors?.phoneNumber}
          description="Your primary contact number in Ghana"
          required
          className="text-lg font-mono"
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          className="text-lg"
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            description="At least 8 characters with uppercase, lowercase, and number"
            required
            className="text-lg pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={errors?.confirmPassword}
            required
            className="text-lg pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>
      </div>
      <div className="space-y-4 pt-2">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={agreements?.termsAccepted}
          onChange={(e) => handleAgreementChange('termsAccepted', e?.target?.checked)}
          error={errors?.termsAccepted}
          required
          className="text-sm"
        />

        <Checkbox
          label="I would like to receive updates about new routes and features"
          description="Optional - You can change this anytime in settings"
          checked={agreements?.marketingConsent}
          onChange={(e) => handleAgreementChange('marketingConsent', e?.target?.checked)}
          className="text-sm"
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        className="mt-8 h-14 text-lg font-semibold"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegistrationForm;