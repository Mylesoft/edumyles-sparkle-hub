import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
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

export interface ModuleReview {
  id: string;
  module_id: string;
  tenant_id: string;
  rating: number;
  comment: string;
  created_at: string;
  tenant_name: string;
}

// Database Functions
export const moduleService = {
  async getAllModules() {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .order('downloads', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getModuleById(id: string) {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getModuleReviews(moduleId: string) {
    const { data, error } = await supabase
      .from('module_reviews')
      .select('*')
      .eq('module_id', moduleId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async addReview(review: Omit<ModuleReview, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('module_reviews')
      .insert(review)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

export const tenantService = {
  async getAllTenants() {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getTenantModules(tenantId: string) {
    const { data, error } = await supabase
      .from('tenant_modules')
      .select(`
        *,
        modules (*)
      `)
      .eq('tenant_id', tenantId);
    
    if (error) throw error;
    return data;
  },

  async installModule(tenantId: string, moduleId: string) {
    const { data, error } = await supabase
      .from('tenant_modules')
      .upsert({
        tenant_id: tenantId,
        module_id: moduleId,
        is_installed: true,
        is_enabled: true,
        installed_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async toggleModule(tenantId: string, moduleId: string, enabled: boolean) {
    const { data, error } = await supabase
      .from('tenant_modules')
      .update({ is_enabled: enabled })
      .eq('tenant_id', tenantId)
      .eq('module_id', moduleId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateTenant(id: string, updates: Partial<Tenant>) {
    const { data, error } = await supabase
      .from('tenants')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};