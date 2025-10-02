import type { Module, ModuleReview, Tenant, TenantModule } from '@/types/modules';

// Temporary mock service until database tables are properly connected
export const moduleService = {
  async getAllModules(): Promise<Module[]> {
    // This will be implemented once we connect to the real database
    return [];
  },

  async getModuleById(id: string): Promise<Module | null> {
    return null;
  },

  async getModuleReviews(moduleId: string): Promise<ModuleReview[]> {
    return [];
  },

  async addReview(review: Omit<ModuleReview, 'id' | 'created_at'>): Promise<ModuleReview | null> {
    return null;
  }
};
