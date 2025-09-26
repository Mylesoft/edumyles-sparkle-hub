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
import { supabase } from '@/lib/supabase';

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          type="text"
          placeholder="Enter your full name"
          {...register('fullName')}
          className={errors.fullName ? 'border-destructive' : ''}
        />
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register('password')}
            className={errors.password ? 'border-destructive' : ''}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? 'border-destructive' : ''}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tenantId">School/Organization</Label>
        <Select onValueChange={(value) => setValue('tenantId', value)}>
          <SelectTrigger className={errors.tenantId ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select your school" />
          </SelectTrigger>
          <SelectContent>
            {tenants.map((tenant) => (
              <SelectItem key={tenant.id} value={tenant.id}>
                {tenant.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.tenantId && (
          <p className="text-sm text-destructive">{errors.tenantId.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select onValueChange={(value) => setValue('role', value)}>
          <SelectTrigger className={errors.role ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tenant_admin">Administrator</SelectItem>
            <SelectItem value="teacher">Teacher</SelectItem>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
            <SelectItem value="alumni">Alumni</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && (
          <p className="text-sm text-destructive">{errors.role.message}</p>
        )}
      </div>

        <Button
          type="submit"
          className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-3 transition-smooth"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          CREATE EDUMYLES ACCOUNT
        </Button>
    </form>
  );
};