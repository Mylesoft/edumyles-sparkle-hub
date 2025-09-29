import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  tenantId: z.string().min(1, 'Please select a school/organization'),
  role: z.string().min(1, 'Please select a role'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

interface Tenant {
  id: string;
  name: string;
}

export const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    const fetchTenants = async () => {
      const { data } = await supabase
        .from('tenants')
        .select('id, name')
        .eq('status', 'active')
        .order('name');
      
      if (data) {
        setTenants(data);
      }
    };

    fetchTenants();
  }, []);

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    try {
      const { error } = await signUp(
        data.email,
        data.password,
        data.fullName,
        data.tenantId,
        data.role
      );
      
      if (error) {
        toast({
          title: "Error creating account",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account created successfully!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name Field */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Label htmlFor="fullName" className="text-sm font-semibold text-foreground">
            Full Name
          </Label>
          <div className="relative">
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              {...register('fullName')}
              className={`h-12 px-4 text-base bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 focus:scale-[1.02] hover:border-primary/50 ${
                errors.fullName 
                  ? 'border-destructive focus:border-destructive' 
                  : 'border-border focus:border-primary'
              }`}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          {errors.fullName && (
            <p className="text-sm text-destructive font-medium animate-fade-in flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Label htmlFor="email" className="text-sm font-semibold text-foreground">
            Email Address
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...register('email')}
              className={`h-12 px-4 text-base bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 focus:scale-[1.02] hover:border-primary/50 ${
                errors.email 
                  ? 'border-destructive focus:border-destructive' 
                  : 'border-border focus:border-primary'
              }`}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
          </div>
          {errors.email && (
            <p className="text-sm text-destructive font-medium animate-fade-in flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="space-y-3">
            <Label htmlFor="password" className="text-sm font-semibold text-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register('password')}
              className={`h-12 px-4 text-base bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 focus:scale-[1.02] hover:border-primary/50 ${
                errors.password 
                  ? 'border-destructive focus:border-destructive' 
                  : 'border-border focus:border-primary'
              }`}
            />
            {errors.password && (
              <p className="text-xs text-destructive font-medium animate-fade-in">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm"
              {...register('confirmPassword')}
              className={`h-12 px-4 text-base bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 focus:scale-[1.02] hover:border-primary/50 ${
                errors.confirmPassword 
                  ? 'border-destructive focus:border-destructive' 
                  : 'border-border focus:border-primary'
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive font-medium animate-fade-in">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* School/Organization Field */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Label htmlFor="tenantId" className="text-sm font-semibold text-foreground">
            School/Organization
          </Label>
          <Select onValueChange={(value) => setValue('tenantId', value)}>
            <SelectTrigger className={`h-12 text-base bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 hover:border-primary/50 ${
              errors.tenantId ? 'border-destructive' : 'border-border'
            }`}>
              <SelectValue placeholder="Select your school or organization" />
            </SelectTrigger>
            <SelectContent className="bg-background/95 backdrop-blur-sm border-2">
              {tenants.map((tenant) => (
                <SelectItem 
                  key={tenant.id} 
                  value={tenant.id}
                  className="cursor-pointer hover:bg-accent transition-colors"
                >
                  {tenant.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.tenantId && (
            <p className="text-sm text-destructive font-medium animate-fade-in flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.tenantId.message}
            </p>
          )}
        </div>

        {/* Role Field */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Label htmlFor="role" className="text-sm font-semibold text-foreground">
            Your Role
          </Label>
          <Select onValueChange={(value) => setValue('role', value)}>
            <SelectTrigger className={`h-12 text-base bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 hover:border-primary/50 ${
              errors.role ? 'border-destructive' : 'border-border'
            }`}>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent className="bg-background/95 backdrop-blur-sm border-2">
              <SelectItem value="tenant_admin" className="cursor-pointer hover:bg-accent transition-colors">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Administrator
                </div>
              </SelectItem>
              <SelectItem value="teacher" className="cursor-pointer hover:bg-accent transition-colors">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Teacher
                </div>
              </SelectItem>
              <SelectItem value="student" className="cursor-pointer hover:bg-accent transition-colors">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  Student
                </div>
              </SelectItem>
              <SelectItem value="staff" className="cursor-pointer hover:bg-accent transition-colors">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Staff
                </div>
              </SelectItem>
              <SelectItem value="alumni" className="cursor-pointer hover:bg-accent transition-colors">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Alumni
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-sm text-destructive font-medium animate-fade-in flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button
            type="submit"
            size="lg"
            className="w-full h-12 bg-gradient-primary hover:bg-gradient-primary/90 text-white font-semibold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-premium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Creating Account...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>Create EduMyles Account</span>
              </div>
            )}
          </Button>
        </div>
      </form>

      {/* Terms and Privacy Notice */}
      <div className="text-center text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: '0.7s' }}>
        By creating an account, you agree to our{' '}
        <a href="#" className="text-primary hover:text-primary-glow font-medium hover:underline transition-colors">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-primary hover:text-primary-glow font-medium hover:underline transition-colors">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};