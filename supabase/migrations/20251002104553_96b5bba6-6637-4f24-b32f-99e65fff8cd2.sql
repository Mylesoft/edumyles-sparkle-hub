-- Phase 1: Database Foundation for Modular App Store

-- Create role enum type
CREATE TYPE public.app_role AS ENUM ('super_admin', 'tenant_admin', 'teacher', 'student', 'staff', 'alumni');

-- Create subscription plan enum
CREATE TYPE public.subscription_plan AS ENUM ('basic', 'professional', 'enterprise');

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create modules table
CREATE TABLE public.modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  icon TEXT,
  version TEXT NOT NULL DEFAULT '1.0.0',
  price DECIMAL(10,2) DEFAULT 0,
  required_plan subscription_plan DEFAULT 'basic',
  features JSONB DEFAULT '[]'::jsonb,
  developer TEXT,
  downloads INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  manifest JSONB, -- Module manifest with dependencies, permissions, etc.
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on modules
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;

-- Update tenants table with subscription fields
ALTER TABLE public.tenants 
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS subscription_plan subscription_plan DEFAULT 'basic',
  ADD COLUMN IF NOT EXISTS modules_limit INTEGER DEFAULT 5,
  ADD COLUMN IF NOT EXISTS current_modules INTEGER DEFAULT 0;

-- Create tenant_modules junction table
CREATE TABLE public.tenant_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE NOT NULL,
  is_installed BOOLEAN DEFAULT false,
  is_enabled BOOLEAN DEFAULT false,
  installed_at TIMESTAMP WITH TIME ZONE,
  configured_at TIMESTAMP WITH TIME ZONE,
  configuration JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(tenant_id, module_id)
);

-- Enable RLS on tenant_modules
ALTER TABLE public.tenant_modules ENABLE ROW LEVEL SECURITY;

-- Create module_reviews table
CREATE TABLE public.module_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE NOT NULL,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(module_id, tenant_id)
);

-- Enable RLS on module_reviews
ALTER TABLE public.module_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Super admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for modules
CREATE POLICY "Anyone can view active modules"
  ON public.modules FOR SELECT
  USING (is_active = true);

CREATE POLICY "Super admins can manage modules"
  ON public.modules FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for tenants
CREATE POLICY "Tenant admins can view their tenant"
  ON public.tenants FOR SELECT
  USING (
    id IN (
      SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Super admins can manage all tenants"
  ON public.tenants FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for tenant_modules
CREATE POLICY "Users can view their tenant's modules"
  ON public.tenant_modules FOR SELECT
  USING (
    tenant_id IN (
      SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Tenant admins can manage their modules"
  ON public.tenant_modules FOR ALL
  USING (
    tenant_id IN (
      SELECT up.tenant_id 
      FROM public.user_profiles up
      JOIN public.user_roles ur ON ur.user_id = up.id
      WHERE up.id = auth.uid() AND ur.role = 'tenant_admin'
    )
  );

CREATE POLICY "Super admins can manage all tenant modules"
  ON public.tenant_modules FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for module_reviews
CREATE POLICY "Anyone can view reviews"
  ON public.module_reviews FOR SELECT
  USING (true);

CREATE POLICY "Tenant admins can create reviews for their tenant"
  ON public.module_reviews FOR INSERT
  WITH CHECK (
    tenant_id IN (
      SELECT up.tenant_id 
      FROM public.user_profiles up
      JOIN public.user_roles ur ON ur.user_id = up.id
      WHERE up.id = auth.uid() AND ur.role = 'tenant_admin'
    )
  );

CREATE POLICY "Users can update their own reviews"
  ON public.module_reviews FOR UPDATE
  USING (
    tenant_id IN (
      SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
    )
  );

-- Update triggers for updated_at columns
CREATE TRIGGER update_modules_updated_at
  BEFORE UPDATE ON public.modules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tenant_modules_updated_at
  BEFORE UPDATE ON public.tenant_modules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample modules
INSERT INTO public.modules (name, description, category, icon, version, price, required_plan, features, developer, downloads, rating, reviews_count) VALUES
('Academic Management Suite', 'Complete student information system with grades, attendance, and curriculum management', 'Academic', '🎓', '1.0.0', 0, 'basic', '["Student Records", "Grade Management", "Attendance Tracking", "Curriculum Planning"]'::jsonb, 'EduMyles', 1250, 4.8, 89),
('Financial Management', 'Comprehensive fee management, invoicing, and payment processing', 'Financial', '💰', '1.0.0', 299, 'professional', '["Fee Structures", "Payment Processing", "Invoicing", "Financial Reports"]'::jsonb, 'EduMyles', 890, 4.7, 67),
('Learning Management System', 'Full-featured LMS with courses, assignments, and assessments', 'Academic', '📚', '1.0.0', 499, 'professional', '["Course Management", "Assignments", "Quizzes", "Discussion Forums"]'::jsonb, 'EduMyles', 750, 4.9, 102),
('Communication Hub', 'Multi-channel messaging, notifications, and announcements', 'Communication', '📢', '1.0.0', 149, 'basic', '["Messaging", "Email Notifications", "SMS Alerts", "Push Notifications"]'::jsonb, 'EduMyles', 1100, 4.6, 78),
('Gamification Engine', 'Badges, points, and leaderboards to boost engagement', 'Engagement', '🎮', '1.0.0', 199, 'professional', '["Points System", "Badges", "Leaderboards", "Achievements"]'::jsonb, 'EduMyles', 650, 4.5, 54),
('AI Analytics', 'Advanced analytics and insights powered by AI', 'Analytics', '🤖', '1.0.0', 599, 'enterprise', '["Predictive Analytics", "Student Insights", "Performance Tracking", "Custom Reports"]'::jsonb, 'EduMyles', 420, 4.9, 45),
('Transportation Management', 'Route planning, vehicle tracking, and parent notifications', 'Operations', '🚌', '1.0.0', 249, 'professional', '["Route Planning", "GPS Tracking", "Parent Alerts", "Driver Management"]'::jsonb, 'EduMyles', 380, 4.4, 32),
('Library Management', 'Digital library with book tracking and reservations', 'Academic', '📖', '1.0.0', 99, 'basic', '["Catalog Management", "Book Tracking", "Reservations", "Fine Management"]'::jsonb, 'EduMyles', 560, 4.3, 41);

-- Create sample tenant with proper subscription
UPDATE public.tenants 
SET 
  email = 'admin@springfield.edu',
  subscription_plan = 'professional',
  modules_limit = 10,
  current_modules = 0
WHERE name = 'Springfield Elementary' OR id = (SELECT id FROM public.tenants LIMIT 1);

-- Migrate existing user_profiles roles to user_roles table
INSERT INTO public.user_roles (user_id, role)
SELECT id, role::app_role 
FROM public.user_profiles
WHERE role IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- Remove role column from user_profiles (data is now in user_roles)
ALTER TABLE public.user_profiles DROP COLUMN IF EXISTS role;