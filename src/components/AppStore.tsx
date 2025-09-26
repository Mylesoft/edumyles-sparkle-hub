import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Store, 
  Download, 
  Play, 
  Pause, 
  Settings, 
  Search,
  Filter,
  GraduationCap,
  Users,
  BookOpen,
  Building2,
  Brain,
  Trophy,
  MessageSquare,
  Calendar,
  DollarSign,
  Shield,
  BarChart3,
  FileText,
  Globe,
  Smartphone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Module {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  version: string;
  price: number;
  isInstalled: boolean;
  isEnabled: boolean;
  requiredPlan: 'basic' | 'professional' | 'enterprise';
  features: string[];
}

const moduleCategories = [
  { id: 'all', name: 'All Modules', icon: Store },
  { id: 'academic', name: 'Academic Management', icon: GraduationCap },
  { id: 'administration', name: 'Administration', icon: Building2 },
  { id: 'communication', name: 'Communication', icon: MessageSquare },
  { id: 'analytics', name: 'Analytics & Reporting', icon: BarChart3 },
  { id: 'finance', name: 'Finance & Billing', icon: DollarSign },
  { id: 'ai', name: 'AI & Intelligence', icon: Brain },
];

const availableModules: Module[] = [
  {
    id: 'student-management',
    name: 'Student Management System',
    description: 'Comprehensive student information management with CBC curriculum support',
    category: 'academic',
    icon: GraduationCap,
    version: '2.1.0',
    price: 0,
    isInstalled: true,
    isEnabled: true,
    requiredPlan: 'basic',
    features: ['Student Profiles', 'CBC Grading', 'Attendance Tracking', 'Parent Portal']
  },
  {
    id: 'teacher-portal',
    name: 'Teacher Management Portal',
    description: 'Teacher dashboard with lesson planning and grade management',
    category: 'academic',
    icon: Users,
    version: '2.0.5',
    price: 0,
    isInstalled: true,
    isEnabled: true,
    requiredPlan: 'basic',
    features: ['Lesson Planning', 'Grade Book', 'Class Management', 'Resource Library']
  },
  {
    id: 'myles-ai',
    name: 'Myles AI Assistant',
    description: 'AI-powered insights and automated school operations',
    category: 'ai',
    icon: Brain,
    version: '3.2.1',
    price: 2500,
    isInstalled: true,
    isEnabled: true,
    requiredPlan: 'professional',
    features: ['Predictive Analytics', 'Smart Scheduling', 'Performance Insights', 'Automated Reports']
  },
  {
    id: 'multi-campus',
    name: 'Multi-Campus Management',
    description: 'Manage unlimited school locations from one dashboard',
    category: 'administration',
    icon: Building2,
    version: '1.8.0',
    price: 5000,
    isInstalled: true,
    isEnabled: false,
    requiredPlan: 'enterprise',
    features: ['Central Dashboard', 'Resource Sharing', 'Cross-Campus Reports', 'Unified Policies']
  },
  {
    id: 'mpesa-payments',
    name: 'M-Pesa Integration',
    description: 'Seamless fee collection with Kenya\'s mobile money platform',
    category: 'finance',
    icon: Smartphone,
    version: '1.5.2',
    price: 1500,
    isInstalled: false,
    isEnabled: false,
    requiredPlan: 'basic',
    features: ['Fee Collection', 'Payment Tracking', 'Automated Receipts', 'Financial Reports']
  },
  {
    id: 'gamification',
    name: 'Student Gamification',
    description: 'Engage students with points, badges, and achievement systems',
    category: 'academic',
    icon: Trophy,
    version: '1.2.0',
    price: 1000,
    isInstalled: true,
    isEnabled: true,
    requiredPlan: 'professional',
    features: ['Points System', 'Badges & Achievements', 'Leaderboards', 'Challenges']
  },
  {
    id: 'communication-hub',
    name: 'Communication Hub',
    description: 'Unified messaging system for parents, teachers, and students',
    category: 'communication',
    icon: MessageSquare,
    version: '2.3.1',
    price: 800,
    isInstalled: false,
    isEnabled: false,
    requiredPlan: 'basic',
    features: ['SMS Notifications', 'Parent Messaging', 'Announcements', 'Event Notifications']
  },
  {
    id: 'advanced-analytics',
    name: 'Advanced Analytics Suite',
    description: 'Deep insights into school performance and student outcomes',
    category: 'analytics',
    icon: BarChart3,
    version: '1.0.8',
    price: 3000,
    isInstalled: false,
    isEnabled: false,
    requiredPlan: 'enterprise',
    features: ['Performance Dashboards', 'Predictive Models', 'Custom Reports', 'Data Visualization']
  }
];

export const AppStore = () => {
  const [modules, setModules] = useState<Module[]>(availableModules);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAdmin, setIsAdmin] = useState(true); // This would come from auth context
  const { toast } = useToast();

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInstallModule = async (moduleId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, isInstalled: true, isEnabled: true }
        : module
    ));
    
    toast({
      title: "Module Installed",
      description: "Module has been successfully installed and enabled.",
    });
  };

  const handleToggleModule = async (moduleId: string, enabled: boolean) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, isEnabled: enabled }
        : module
    ));
    
    toast({
      title: enabled ? "Module Enabled" : "Module Disabled",
      description: `Module has been ${enabled ? 'enabled' : 'disabled'} successfully.`,
    });
  };

  const ModuleCard = ({ module }: { module: Module }) => (
    <Card className="shadow-card hover:shadow-elevated transition-smooth">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <module.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{module.name}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  v{module.version}
                </Badge>
                <Badge 
                  variant={module.requiredPlan === 'basic' ? 'default' : 
                          module.requiredPlan === 'professional' ? 'secondary' : 'outline'}
                  className="text-xs"
                >
                  {module.requiredPlan}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            {module.price === 0 ? (
              <Badge variant="secondary">Free</Badge>
            ) : (
              <div className="text-lg font-semibold text-primary">
                KSh {module.price.toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="text-sm">
          {module.description}
        </CardDescription>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Key Features:</h4>
          <div className="grid grid-cols-2 gap-1">
            {module.features.map((feature, index) => (
              <div key={index} className="text-xs text-muted-foreground flex items-center">
                <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                {feature}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          {!module.isInstalled ? (
            <Button 
              onClick={() => handleInstallModule(module.id)}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Install Module
            </Button>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <Badge variant={module.isEnabled ? "default" : "secondary"}>
                  {module.isEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              
              {isAdmin && (
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={module.isEnabled}
                    onCheckedChange={(checked) => handleToggleModule(module.id, checked)}
                  />
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <Store className="w-8 h-8 mr-3 text-primary" />
            EduMyles App Store
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover and manage educational modules for your institution
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {modules.filter(m => m.isInstalled).length} of {modules.length} installed
        </Badge>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 w-full lg:w-auto">
            {moduleCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                <category.icon className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="flex items-center space-x-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <TabsContent value={selectedCategory} className="mt-8">
          {filteredModules.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-muted-foreground">
                <Store className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No modules found</h3>
                <p>Try adjusting your search or category filter.</p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};