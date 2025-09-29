import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { SupabaseStatus } from '../SupabaseStatus';
import { useAuth } from '@/contexts/AuthContext';
import eduMylesLogo from '@/assets/edumyles-logo.png';

export const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      navigate('/app-store');
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-hero relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="w-full max-w-5xl relative z-10">
        <SupabaseStatus />
        
        {/* Main Card */}
        <Card className="w-full min-h-[750px] overflow-hidden shadow-premium bg-card/95 backdrop-blur-sm border-2 border-border/50 animate-fade-in">
          <div className="flex h-full min-h-[750px]">
            {/* Left Panel - Form */}
            <div className="flex-1 p-12 bg-card/50 backdrop-blur-sm flex items-center">
              <div className="w-full max-w-md mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  {/* EduMyles Logo with animation */}
                  <div className="flex justify-center mb-8 transform hover:scale-105 transition-transform duration-300">
                    <div className="relative">
                      <img 
                        src={eduMylesLogo} 
                        alt="EduMyles" 
                        className="h-20 w-auto object-contain drop-shadow-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-lg blur-xl"></div>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl font-bold text-foreground mb-3 bg-gradient-primary bg-clip-text text-transparent">
                    {isLogin ? 'Welcome Back' : 'Join EduMyles'}
                  </h1>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {isLogin 
                      ? 'Sign in to access your educational platform and continue your learning journey'
                      : 'Create your account to unlock the future of education in Africa'
                    }
                  </p>
                </div>

                {/* Form Container with smooth transition */}
                <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  {isLogin ? <LoginForm /> : <SignupForm />}
                </div>
              </div>
            </div>

            {/* Right Panel - Welcome */}
            <div className="flex-1 bg-gradient-primary text-white p-12 flex flex-col justify-center items-center relative overflow-hidden">
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-secondary opacity-95"></div>
              
              {/* Content */}
              <div className="relative z-10 text-center max-w-md animate-fade-in" style={{ animationDelay: '0.6s' }}>
                {/* Icon with enhanced styling */}
                <div className="mb-10">
                  <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/30 shadow-premium hover:scale-105 transition-all duration-300">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                
                <h2 className="text-4xl font-bold mb-6 leading-tight">
                  {isLogin ? 'New to EduMyles?' : 'Already have an account?'}
                </h2>
                <p className="text-white/90 mb-10 leading-relaxed text-lg">
                  {isLogin 
                    ? 'Join thousands of educators and students transforming education across Africa. Experience the future of learning today.'
                    : 'Welcome back! Sign in to continue your educational journey and unlock your potential with EduMyles.'
                  }
                </p>
                
                {/* Enhanced call-to-action button */}
                <Button 
                  variant="outline" 
                  onClick={() => setIsLogin(!isLogin)}
                  className="bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300 px-10 py-4 font-semibold text-base backdrop-blur-sm shadow-premium hover:shadow-elevated hover:scale-105"
                >
                  {isLogin ? 'CREATE ACCOUNT' : 'SIGN IN'}
                </Button>
              </div>
              
              {/* Enhanced decorative elements */}
              <div className="absolute top-8 right-8 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 left-8 w-32 h-32 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 right-0 w-48 h-48 bg-white/5 rounded-full transform translate-x-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};