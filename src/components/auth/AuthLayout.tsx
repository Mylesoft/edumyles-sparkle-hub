import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { SupabaseStatus } from '../SupabaseStatus';
import eduMylesLogo from '@/assets/edumyles-logo.png';

export const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-hero">
      <div className="w-full max-w-4xl">
        <SupabaseStatus />
        <Card className="w-full h-[700px] overflow-hidden shadow-premium bg-card">
        <div className="flex h-full">
          {/* Left Panel - Form */}
          <div className="flex-1 p-8 bg-card">
            <div className="max-w-sm mx-auto">
              <div className="text-center mb-8">
                {/* EduMyles Logo */}
                <div className="flex justify-center mb-6">
                  <img 
                    src={eduMylesLogo} 
                    alt="EduMyles" 
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {isLogin ? 'Welcome Back' : 'Join EduMyles'}
                </h1>
                <p className="text-sm text-muted-foreground mb-8">
                  {isLogin 
                    ? 'Sign in to access your educational platform'
                    : 'Create your account to get started'
                  }
                </p>
              </div>

              {isLogin ? <LoginForm /> : <SignupForm />}
            </div>
          </div>

          {/* Right Panel - Welcome */}
          <div className="flex-1 bg-gradient-primary text-white p-8 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-primary opacity-95"></div>
            <div className="relative z-10 text-center max-w-sm">
              <div className="mb-8">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                {isLogin ? 'New to EduMyles?' : 'Already have an account?'}
              </h2>
              <p className="text-primary-foreground/90 mb-8 leading-relaxed">
                {isLogin 
                  ? 'Join thousands of educators and students transforming education across Africa. Create your account today.'
                  : 'Welcome back! Sign in to continue your educational journey with EduMyles.'
                }
              </p>
              <Button 
                variant="outline" 
                onClick={() => setIsLogin(!isLogin)}
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary transition-smooth px-8 py-3 font-semibold"
              >
                {isLogin ? 'CREATE ACCOUNT' : 'SIGN IN'}
              </Button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/2 right-0 w-40 h-40 bg-white/5 rounded-full transform translate-x-1/2"></div>
            <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-white/5 rounded-full"></div>
          </div>
        </div>
      </Card>
      </div>
    </div>
  );
};