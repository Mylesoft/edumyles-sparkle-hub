import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { AppStore } from "@/components/AppStore";
import { TenantManager } from "@/components/TenantManager";
import { ModuleDetails } from "@/components/ModuleDetails";
import { ModuleAnalytics } from "@/components/ModuleAnalytics";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    <Header />
    <div className="flex">
      <Navigation />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthLayout />} />
            
            {/* Protected routes */}
            <Route path="/app-store" element={
              <ProtectedRoute>
                <MainLayout>
                  <AppStore />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/app-store/module/:moduleId" element={
              <ProtectedRoute>
                <MainLayout>
                  <ModuleDetails />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/analytics" element={
              <ProtectedRoute allowedRoles={['super_admin', 'tenant_admin']}>
                <MainLayout>
                  <ModuleAnalytics />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/tenant-manager" element={
              <ProtectedRoute allowedRoles={['super_admin']}>
                <MainLayout>
                  <TenantManager />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Redirect authenticated users away from auth page */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Navigate to="/app-store" replace />
              </ProtectedRoute>
            } />
            
            {/* Unauthorized access page */}
            <Route path="/unauthorized" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-2">Unauthorized</h1>
                  <p className="text-muted-foreground">You don't have permission to access this page.</p>
                </div>
              </div>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
