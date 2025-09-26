import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Building2, 
  Users, 
  Settings,
  Plus,
  Search,
  Shield,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Crown,
  Star,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Tenant {
  id: string;
  name: string;
  type: 'primary' | 'secondary' | 'university' | 'training';
  plan: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'suspended' | 'trial';
  location: string;
  contactEmail: string;
  contactPhone: string;
  studentsCount: number;
  teachersCount: number;
  createdAt: string;
  enabledModules: string[];
  allowedModules: string[];
}

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    icon: Shield,
    color: 'bg-green-100 text-green-800',
    modules: ['student-management', 'teacher-portal', 'communication-hub', 'mpesa-payments']
  },
  {
    id: 'professional',
    name: 'Professional Plan',
    icon: Star,
    color: 'bg-blue-100 text-blue-800',
    modules: ['student-management', 'teacher-portal', 'communication-hub', 'mpesa-payments', 'myles-ai', 'gamification', 'basic-analytics']
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    icon: Crown,
    color: 'bg-purple-100 text-purple-800',
    modules: ['student-management', 'teacher-portal', 'communication-hub', 'mpesa-payments', 'myles-ai', 'gamification', 'multi-campus', 'advanced-analytics', 'custom-integrations']
  }
];

const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'Nairobi Primary School',
    type: 'primary',
    plan: 'professional',
    status: 'active',
    location: 'Nairobi, Kenya',
    contactEmail: 'admin@nairobiprimary.ac.ke',
    contactPhone: '+254701234567',
    studentsCount: 450,
    teachersCount: 28,
    createdAt: '2024-01-15',
    enabledModules: ['student-management', 'teacher-portal', 'myles-ai'],
    allowedModules: ['student-management', 'teacher-portal', 'communication-hub', 'mpesa-payments', 'myles-ai', 'gamification']
  },
  {
    id: '2',
    name: 'Mombasa Secondary School',
    type: 'secondary',
    plan: 'enterprise',
    status: 'active',
    location: 'Mombasa, Kenya',
    contactEmail: 'principal@mombasasec.ac.ke',
    contactPhone: '+254722345678',
    studentsCount: 1200,
    teachersCount: 85,
    createdAt: '2023-09-22',
    enabledModules: ['student-management', 'teacher-portal', 'multi-campus', 'advanced-analytics'],
    allowedModules: ['student-management', 'teacher-portal', 'communication-hub', 'mpesa-payments', 'myles-ai', 'gamification', 'multi-campus', 'advanced-analytics']
  },
  {
    id: '3',
    name: 'Kisumu Training Institute',
    type: 'training',
    plan: 'basic',
    status: 'trial',
    location: 'Kisumu, Kenya',
    contactEmail: 'info@kisumutraining.ac.ke',
    contactPhone: '+254733456789',
    studentsCount: 180,
    teachersCount: 12,
    createdAt: '2024-03-01',
    enabledModules: ['student-management', 'teacher-portal'],
    allowedModules: ['student-management', 'teacher-portal', 'communication-hub', 'mpesa-payments']
  }
];

export const TenantManager = () => {
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("all");
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const { toast } = useToast();

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlan === 'all' || tenant.plan === selectedPlan;
    return matchesSearch && matchesPlan;
  });

  const handleToggleModule = (tenantId: string, moduleId: string, enabled: boolean) => {
    setTenants(prev => prev.map(tenant => 
      tenant.id === tenantId 
        ? { 
            ...tenant, 
            enabledModules: enabled 
              ? [...tenant.enabledModules, moduleId]
              : tenant.enabledModules.filter(id => id !== moduleId)
          }
        : tenant
    ));
    
    toast({
      title: enabled ? "Module Enabled" : "Module Disabled",
      description: `Module has been ${enabled ? 'enabled' : 'disabled'} for ${tenants.find(t => t.id === tenantId)?.name}.`,
    });
  };

  const handleChangePlan = (tenantId: string, newPlan: 'basic' | 'professional' | 'enterprise') => {
    const planModules = subscriptionPlans.find(p => p.id === newPlan)?.modules || [];
    
    setTenants(prev => prev.map(tenant => 
      tenant.id === tenantId 
        ? { 
            ...tenant, 
            plan: newPlan,
            allowedModules: planModules,
            enabledModules: tenant.enabledModules.filter(moduleId => planModules.includes(moduleId))
          }
        : tenant
    ));
    
    toast({
      title: "Subscription Updated",
      description: `${tenants.find(t => t.id === tenantId)?.name} has been upgraded to ${newPlan} plan.`,
    });
  };

  const TenantCard = ({ tenant }: { tenant: Tenant }) => (
    <Card className="shadow-card hover:shadow-elevated transition-smooth">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{tenant.name}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs capitalize">
                  {tenant.type}
                </Badge>
                <Badge 
                  variant={tenant.status === 'active' ? 'default' : 
                          tenant.status === 'trial' ? 'secondary' : 'destructive'}
                  className="text-xs capitalize"
                >
                  {tenant.status}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge 
              className={`${subscriptionPlans.find(p => p.id === tenant.plan)?.color} border-0`}
            >
              {subscriptionPlans.find(p => p.id === tenant.plan)?.name}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{tenant.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{tenant.studentsCount} students</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="truncate">{tenant.contactEmail}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>Since {new Date(tenant.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Enabled Modules</h4>
            <Badge variant="outline" className="text-xs">
              {tenant.enabledModules.length} / {tenant.allowedModules.length}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1">
            {tenant.enabledModules.slice(0, 3).map((moduleId) => (
              <Badge key={moduleId} variant="secondary" className="text-xs">
                {moduleId.replace('-', ' ')}
              </Badge>
            ))}
            {tenant.enabledModules.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tenant.enabledModules.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => setSelectedTenant(tenant)}>
                <Settings className="w-4 h-4 mr-2" />
                Manage Modules
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Manage Modules - {tenant.name}</DialogTitle>
                <DialogDescription>
                  Enable or disable modules for this tenant based on their subscription plan.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Current Plan</h4>
                    <p className="text-sm text-muted-foreground">
                      {subscriptionPlans.find(p => p.id === tenant.plan)?.name}
                    </p>
                  </div>
                  <Select value={tenant.plan} onValueChange={(value: any) => handleChangePlan(tenant.id, value)}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {subscriptionPlans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          <div className="flex items-center space-x-2">
                            <plan.icon className="w-4 h-4" />
                            <span>{plan.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Available Modules</h4>
                  <div className="grid gap-3">
                    {tenant.allowedModules.map((moduleId) => (
                      <div key={moduleId} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h5 className="font-medium capitalize">{moduleId.replace('-', ' ')}</h5>
                          <p className="text-sm text-muted-foreground">
                            Module description would go here
                          </p>
                        </div>
                        <Switch
                          checked={tenant.enabledModules.includes(moduleId)}
                          onCheckedChange={(checked) => handleToggleModule(tenant.id, moduleId, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Select value={tenant.plan} onValueChange={(value: any) => handleChangePlan(tenant.id, value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {subscriptionPlans.map((plan) => (
                <SelectItem key={plan.id} value={plan.id}>
                  {plan.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <Users className="w-8 h-8 mr-3 text-primary" />
            Tenant Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage school subscriptions and module access
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Tenant
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex items-center space-x-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tenants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedPlan} onValueChange={setSelectedPlan}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              {subscriptionPlans.map((plan) => (
                <SelectItem key={plan.id} value={plan.id}>
                  {plan.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenants.map((tenant) => (
          <TenantCard key={tenant.id} tenant={tenant} />
        ))}
      </div>
    </div>
  );
};