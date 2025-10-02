// Module Types
export interface Module {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  version: string;
  price: number;
  required_plan: 'basic' | 'professional' | 'enterprise';
  features: string[];
  created_at: string;
  updated_at: string;
  developer: string;
  downloads: number;
  rating: number;
  reviews_count: number;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  subscription_plan: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
  modules_limit: number;
  current_modules: number;
}

export interface TenantModule {
  id: string;
  tenant_id: string;
  module_id: string;
  is_installed: boolean;
  is_enabled: boolean;
  installed_at: string;
  configured_at?: string;
  configuration?: Record<string, any>;
}

export interface UserProfile {
  id: string;
  tenant_id: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'super_admin' | 'tenant_admin' | 'teacher' | 'student' | 'staff' | 'alumni';
  created_at: string;
}

export interface ModuleReview {
  id: string;
  module_id: string;
  tenant_id: string;
  rating: number;
  comment: string;
  created_at: string;
  tenant_name: string;
}
