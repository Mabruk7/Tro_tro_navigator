import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CreateAccountPrompt = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/user-registration');
  };

  const benefits = [
    {
      icon: 'Star',
      title: 'Save Favorites',
      description: 'Bookmark your frequent routes'
    },
    {
      icon: 'Clock',
      title: 'Route History',
      description: 'Access your travel history'
    },
    {
      icon: 'MapPin',
      title: 'Personalized Routes',
      description: 'Get customized recommendations'
    }
  ];

  return (
    <div className="bg-muted/30 rounded-lg p-6 space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          New to Tro-Tro Navigator?
        </h3>
        <p className="text-sm text-muted-foreground font-body">
          Join thousands of Ghanaians who trust us for their daily commute
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {benefits?.map((benefit, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={benefit?.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground font-body">
                {benefit?.title}
              </p>
              <p className="text-xs text-muted-foreground font-caption">
                {benefit?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        size="lg"
        fullWidth
        onClick={handleCreateAccount}
        iconName="UserPlus"
        iconPosition="left"
        iconSize={18}
        className="h-12 text-base font-semibold border-2 hover:bg-primary/5"
      >
        Create Free Account
      </Button>
      <p className="text-xs text-center text-muted-foreground font-caption">
        Free forever • No hidden charges • Secure & private
      </p>
    </div>
  );
};

export default CreateAccountPrompt;