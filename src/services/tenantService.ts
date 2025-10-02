import { supabase } from '@/integrations/supabase/client';
import type { Tenant, TenantModule } from '@/types/modules';
import type { Tables } from '@/integrations/supabase/types';

export const tenantService = {
  async getAllTenants(): Promise<Tables<'tenants'>[]> {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getTenantModules(tenantId: string) {
    // Return empty array until tenant_modules table is created
    return [];
  },

  async installModule(tenantId: string, moduleId: string): Promise<TenantModule | null> {
    // Return null until tenant_modules table is created
    return null;
  },

  async toggleModule(tenantId: string, moduleId: string, enabled: boolean): Promise<TenantModule | null> {
    // Return null until tenant_modules table is created
    return null;
  },

  async updateTenant(id: string, updates: Partial<Tables<'tenants'>>): Promise<Tables<'tenants'> | null> {
    const { data, error } = await supabase
      .from('tenants')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
  }
};
