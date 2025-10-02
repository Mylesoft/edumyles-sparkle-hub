import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Store, 
  Download, 
  Star,
  Settings, 
  Search,
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
  Smartphone,
  Clock,
  CreditCard,
  Database,
  Mail,
  TrendingUp,
  UserCheck,
  Wifi,
  BookmarkPlus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { moduleService } from "@/services/moduleService";
import type { Module } from "@/types/modules";

interface StoreModule extends Module {
  icon: any;
  isInstalled: boolean;
  isEnabled: boolean;
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

const additionalModules: StoreModule[] = [
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
    required_plan: 'basic',
    features: ['Student Profiles', 'CBC Grading', 'Attendance Tracking', 'Parent Portal'],
    created_at: '2024-01-01',
    updated_at: '2024-01-15',
    developer: 'EduMyles Team',
    downloads: 15420,
    rating: 4.8,
    reviews_count: 156
  },
  {
    id: 'attendance-tracker',
    name: 'Smart Attendance Tracker',
    description: 'Biometric and QR code-based attendance management with real-time notifications',
    category: 'academic',
    icon: UserCheck,
    version: '1.4.2',
    price: 1200,
    isInstalled: false,
    isEnabled: false,
    required_plan: 'professional',
    features: ['Biometric Integration', 'QR Code Scanning', 'Real-time Alerts', 'Parent Notifications'],
    created_at: '2024-02-01',
    updated_at: '2024-03-10',
    developer: 'EduTech Solutions',
    downloads: 8950,
    rating: 4.6,
    reviews_count: 89
  },
  {
    id: 'library-management',
    name: 'Digital Library System',
    description: 'Complete library management with book tracking and digital resources',
    category: 'academic',
    icon: BookOpen,
    version: '2.0.1',
    price: 800,
    isInstalled: false,
    isEnabled: false,
    required_plan: 'basic',
    features: ['Book Catalog', 'Digital Resources', 'Check-out System', 'Fine Management'],
    created_at: '2024-01-15',
    updated_at: '2024-03-05',
    developer: 'LibraTech',
    downloads: 12340,
    rating: 4.7,
    reviews_count: 203
  },
  {
    id: 'examination-system',
    name: 'Online Examination Platform',
    description: 'Conduct secure online exams with automated grading and proctoring',
    category: 'academic',
    icon: FileText,
    version: '3.1.0',
    price: 2000,
    isInstalled: false,
    isEnabled: false,
    required_plan: 'professional',
    features: ['Question Bank', 'Auto Grading', 'Online Proctoring', 'Result Analytics'],
    created_at: '2024-02-10',
    updated_at: '2024-03-20',
    developer: 'ExamPro',
    downloads: 6780,
    rating: 4.5,
    reviews_count: 92
  },
  {
    id: 'hostel-management',
    name: 'Hostel Management System',
    description: 'Complete hostel administration with room allocation and fee management',
    category: 'administration',
    icon: Building2,
    version: '1.6.0',
    price: 1500,
    isInstalled: false,
    isEnabled: false,
    required_plan: 'professional',
    features: ['Room Allocation', 'Mess Management', 'Visitor Tracking', 'Maintenance Requests'],
    created_at: '2024-01-20',
    updated_at: '2024-03-15',
    developer: 'HostelTech',
    downloads: 4560,
    rating: 4.4,
    reviews_count: 67
  },
  {
    id: 'transport-management',
    name: 'School Transport Tracker',
    description: 'GPS-based school bus tracking with route optimization and safety alerts',
    category: 'administration',
    icon: Globe,
    version: '2.2.0',
    price: 1800,
    isInstalled: false,
    isEnabled: false,
    required_plan: 'professional',
    features: ['GPS Tracking', 'Route Planning', 'Safety Alerts', 'Parent App'],
    created_at: '2024-02-05',
    updated_at: '2024-03-12',
    developer: 'TransportPro',
    downloads: 7890,
    rating: 4.6,
    reviews_count: 134
  },
  {
    id: 'inventory-management',
    name: 'School Inventory System',
    description: 'Track and manage school assets, supplies, and equipment efficiently',
    category: 'administration',
    icon: Database,
    version: '1.3.5',
    price: 900,
    isInstalled: false,
    isEnabled: false,
    required_plan: 'basic',
    features: ['Asset Tracking', 'Stock Management', 'Purchase Orders', 'Maintenance Logs'],
    created_at: '2024-01-25',
    updated_at: '2024-03-08',
    developer: 'InventoryMax',
    downloads: 5670,
    rating: 4.3,
    reviews_count: 78
  },
  {
    id: 'email-automation',
    name: 'Email Marketing Suite',
    description: 'Automated email campaigns for admissions, events, and communications',
    category: 'communication',
    icon: Mail,
    version: '2.4.0',
    price: 1100,
    isInstalled: false,
    isEnabled: false,
    required_plan: 'professional',
    features: ['Campaign Builder', 'Template Library', 'Analytics Dashboard', 'A/B Testing'],
    created_at: '2024-02-15',
    updated_at: '2024-03-18',
    developer: 'MailCraft',
    downloads: 9230,
    rating: 4.7,
    reviews_count: 156
  },
  {
    id: 'parent-portal',
    name: 'Parent Engagement Portal',
    description: 'Comprehensive parent portal with real-time updates and communication tools',
    category: 'communication',
    icon: Users,
    version: '2.1.3',
    price: 700,
    isInstalled: true,
    isEnabled: true,
    required_plan: 'basic',
    features: ['Progress Tracking', 'Assignment Updates', 'Teacher Chat', 'Event Calendar'],
    created_at: '2024-01-10',
    updated_at: '2024-03-22',
    developer: 'ParentConnect',
    downloads: 18650,
    rating: 4.9,
    reviews_count: 287
  },
  {
    id: 'performance-analytics',
    name: 'Performance Intelligence',
    description: 'Advanced analytics for student performance and institutional insights',
    category: 'analytics',
    icon: TrendingUp,
    version: '1.7.0',
    price: 2500,
    isInstalled: false,
    isEnabled: false,
    required_plan: 'enterprise',
    features: ['Learning Analytics', 'Predictive Modeling', 'Custom Dashboards', 'Benchmark Reports'],
    created_at: '2024-02-20',
    updated_at: '2024-03-25',
    developer: 'DataInsights',
    downloads: 3450,
    rating: 4.8,
    reviews_count: 45
  },
  {
    id: 'fee-management',
    name: 'Comprehensive Fee Manager',
    description: 'Complete fee collection and financial management system',
    category: 'finance',
    icon: CreditCard,
    version: '3.0.2',
    price: 1600,
    isInstalled: false,
    isEnabled: false,
    required_plan: 'professional',
    features: ['Online Payments', 'Installment Plans', 'Late Fee Automation', 'Financial Reports'],
    created_at: '2024-01-30',
    updated_at: '2024-03-14',
    developer: 'FinanceFlow',
    downloads: 11200,
    rating: 4.5,
    reviews_count: 189
  },
  {
    id: 'timetable-optimizer',
    name: 'AI Timetable Generator',
    description: 'Intelligent timetable creation with conflict resolution and optimization',
    category: 'administration',
    icon: Calendar,
    version: '2.3.0',
    price: 1400,
    isInstalled: false,
    isEnabled: false,
    required_plan: 'professional',
    features: ['Auto Generation', 'Conflict Detection', 'Resource Optimization', 'Quick Adjustments'],
    created_at: '2024-02-25',
    updated_at: '2024-03-30',
    developer: 'TimeTable AI',
    downloads: 6890,
    rating: 4.6,
    reviews_count: 102
  }
];

export const AppStore = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<StoreModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAdmin, setIsAdmin] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    try {
      const dbModules = await moduleService.getAllModules();
      // Combine with additional modules for demo
      const allModules = [...additionalModules, ...dbModules.map(m => ({
        ...m,
        icon: getIconForCategory(m.category),
        isInstalled: Math.random() > 0.6, // Random for demo
        isEnabled: Math.random() > 0.5
      }))];
      setModules(allModules);
    } catch (error) {
      // Fallback to static modules if DB fails
      setModules(additionalModules);
    } finally {
      setLoading(false);
    }
  };

  const getIconForCategory = (category: string) => {
    const iconMap: Record<string, any> = {
      academic: GraduationCap,
      administration: Building2,
      communication: MessageSquare,
      analytics: BarChart3,
      finance: DollarSign,
      ai: Brain
    };
    return iconMap[category] || Settings;
  };

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

  const renderStars = (rating: number) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${
            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
          }`}
        />
      ))}
    </div>
  );

  const ModuleCard = ({ module }: { module: StoreModule }) => (
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
                  variant={module.required_plan === 'basic' ? 'default' : 
                          module.required_plan === 'professional' ? 'secondary' : 'outline'}
                  className="text-xs"
                >
                  {module.required_plan}
                </Badge>
                {module.rating && (
                  <div className="flex items-center space-x-1">
                    {renderStars(module.rating)}
                    <span className="text-xs text-muted-foreground">
                      ({module.reviews_count})
                    </span>
                  </div>
                )}
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
            <div className="flex space-x-2 w-full">
              <Button 
                onClick={() => handleInstallModule(module.id)}
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                Install Module
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate(`/app-store/module/${module.id}`)}
              >
                View Details
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <Badge variant={module.isEnabled ? "default" : "secondary"}>
                  {module.isEnabled ? "Enabled" : "Disabled"}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {module.downloads?.toLocaleString()} downloads
                </span>
              </div>
              
              {isAdmin && (
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={module.isEnabled}
                    onCheckedChange={(checked) => handleToggleModule(module.id, checked)}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/app-store/module/${module.id}`)}
                  >
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="px-3 py-1">
            {modules.filter(m => m.isInstalled).length} of {modules.length} installed
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            {modules.reduce((acc, m) => acc + (m.downloads || 0), 0).toLocaleString()} total downloads
          </Badge>
        </div>
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