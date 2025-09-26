import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { AppStore } from "@/components/AppStore";
import { TenantManager } from "@/components/TenantManager";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/app-store" element={
            <div className="min-h-screen bg-background">
              <Header />
              <div className="flex">
                <Navigation />
                <main className="flex-1 overflow-auto">
                  <div className="container mx-auto p-8 max-w-7xl">
                    <AppStore />
                  </div>
                </main>
              </div>
            </div>
          } />
          <Route path="/tenant-manager" element={
            <div className="min-h-screen bg-background">
              <Header />
              <div className="flex">
                <Navigation />
                <main className="flex-1 overflow-auto">
                  <div className="container mx-auto p-8 max-w-7xl">
                    <TenantManager />
                  </div>
                </main>
              </div>
            </div>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
