import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Act Think Overcome Maintain
          </h1>
          <h2 className="text-5xl font-bold text-foreground">
            Let's get started with ATOM
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with licensed therapists and start your mental health journey
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => navigate('/therapists')} 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
          >
            Find Therapists
          </Button>
          <Button 
            onClick={() => navigate('/depression-test')}
            variant="outline" 
            size="lg"
            className="px-8 py-3 text-lg"
          >
            Take Depression Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
