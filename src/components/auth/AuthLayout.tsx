import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { SupabaseStatus } from '../SupabaseStatus';

export const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="w-full max-w-4xl">
        <SupabaseStatus />
        <Card className="w-full h-[600px] overflow-hidden shadow-premium">
        <div className="flex h-full">
          {/* Left Panel - Form */}
          <div className="flex-1 p-8 bg-white">
            <div className="max-w-sm mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </h1>
                <div className="flex justify-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">f</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">G</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">in</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  or use your email password
                </p>
              </div>

              {isLogin ? <LoginForm /> : <SignupForm />}
            </div>
          </div>

          {/* Right Panel - Welcome */}
          <div className="flex-1 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white p-8 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-purple-700/90 to-purple-800/90"></div>
            <div className="relative z-10 text-center max-w-sm">
              <h2 className="text-3xl font-bold mb-4">
                {isLogin ? 'Hello, Friend!' : 'Welcome Back!'}
              </h2>
              <p className="text-purple-100 mb-8 leading-relaxed">
                {isLogin 
                  ? 'Register with your personal details to use all of our features'
                  : 'To keep connected with us please login with your personal info'
                }
              </p>
              <Button 
                variant="outline" 
                onClick={() => setIsLogin(!isLogin)}
                className="bg-transparent border-white text-white hover:bg-white hover:text-purple-700 transition-smooth"
              >
                {isLogin ? 'SIGN UP' : 'SIGN IN'}
              </Button>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/2 right-0 w-40 h-40 bg-white/5 rounded-full transform translate-x-1/2"></div>
          </div>
        </div>
      </Card>
      </div>
    </div>
  );
};