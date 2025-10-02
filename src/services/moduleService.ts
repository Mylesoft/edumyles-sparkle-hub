import type { Module, ModuleReview } from '@/types/modules';

// Temporary mock service until database tables are created
export const moduleService = {
  async getAllModules(): Promise<Module[]> {
    // Return empty array until modules table is created
    return [];
  },

  async getModuleById(id: string): Promise<Module | null> {
    // Return null until modules table is created
    return null;
  },

  async getModuleReviews(moduleId: string): Promise<ModuleReview[]> {
    // Return empty array until module_reviews table is created
    return [];
  },

  async addReview(review: Omit<ModuleReview, 'id' | 'created_at'>): Promise<ModuleReview | null> {
    // Return null until module_reviews table is created
    return null;
  }
};
