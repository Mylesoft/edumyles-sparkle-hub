import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export const SupabaseStatus = () => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkSupabaseConfig = () => {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      setIsConfigured(!!(supabaseUrl && supabaseAnonKey));
      setIsChecking(false);
    };

    checkSupabaseConfig();
  }, []);

  if (isChecking) return null;

  if (isConfigured) {
    return (
      <Alert className="mb-4 border-success bg-success/10">
        <CheckCircle className="h-4 w-4 text-success" />
        <AlertTitle className="text-success">Supabase Connected</AlertTitle>
        <AlertDescription className="text-success-foreground">
          Your Supabase integration is properly configured and ready to use.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="mb-4 border-warning bg-warning/10">
      <AlertTriangle className="h-4 w-4 text-warning" />
      <AlertTitle className="text-warning">Supabase Configuration Required</AlertTitle>
      <AlertDescription className="text-warning-foreground">
        Please connect to Supabase using the green Supabase button in the top right to enable authentication and database features.
        <div className="mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.location.reload()}
            className="border-warning text-warning hover:bg-warning hover:text-warning-foreground"
          >
            Refresh after connecting
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};