import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Users, 
  Building, 
  TrendingUp,
  Globe,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from "lucide-react";

const SuperAdminPanel = () => {
  const platformMetrics = [
    {
      title: "Active Tenants",
      value: "127",
      change: "+12%",
      icon: Building,
      trend: "up"
    },
    {
      title: "Total Users",
      value: "45,230",
      change: "+8.5%",
      icon: Users,
      trend: "up"
    },
    {
      title: "Platform Health",
      value: "99.8%",
      change: "Excellent",
      icon: CheckCircle,
      trend: "stable"
    },
    {
      title: "Monthly Revenue",
      value: "$124K",
      change: "+15.2%",
      icon: DollarSign,
      trend: "up"
    }
  ];

  const partnerTiers = [
    {
      tier: "Tier 1 - Brand Partner",
      count: 8,
      commission: "25%",
      schools: 45,
      status: "active"
    },
    {
      tier: "Tier 2 - Co-Brand",
      count: 3,
      commission: "35%",
      schools: 28,
      status: "active"
    },
    {
      tier: "Tier 3 - White-Label",
      count: 2,
      commission: "45%",
      schools: 54,
      status: "expanding"
    }
  ];

  const systemAlerts = [
    {
      type: "warning",
      message: "Server capacity at 75% - scaling recommended",
      time: "2 hours ago"
    },
    {
      type: "info",
      message: "New partner onboarding: Nairobi Education Solutions",
      time: "4 hours ago"
    },
    {
      type: "success",
      message: "System update v2.1.4 deployed successfully",
      time: "1 day ago"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Super Admin Panel</h1>
          <p className="text-muted-foreground mt-1">Platform governance & ecosystem management</p>
        </div>
        <Badge variant="outline" className="bg-gradient-primary text-primary-foreground">
          <Shield className="w-3 h-3 mr-1" />
          Super Admin Access
        </Badge>
      </div>

      {/* Platform Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platformMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="shadow-card hover:shadow-elevated transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className={`text-xs ${
                      metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {metric.change}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Partner Performance */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Partner Ecosystem</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {partnerTiers.map((partner, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{partner.tier}</p>
                      <p className="text-xs text-muted-foreground">{partner.count} partners • {partner.schools} schools</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={partner.status === 'expanding' ? 'default' : 'secondary'}>
                        {partner.commission}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Alerts */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>System Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {systemAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/20">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === 'warning' ? 'bg-yellow-500' :
                      alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {alert.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="partners" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Partner Management</CardTitle>
              <p className="text-sm text-muted-foreground">Manage white-label reseller ecosystem</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Button variant="default">
                    <Users className="w-4 h-4 mr-2" />
                    Onboard New Partner
                  </Button>
                  <Button variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Performance Reports
                  </Button>
                </div>
                
                <div className="text-center text-muted-foreground py-8">
                  Partner management interface would be implemented here with detailed partner profiles, 
                  commission tracking, and performance analytics.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tenants" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Tenant Administration</CardTitle>
              <p className="text-sm text-muted-foreground">Manage school tenants and multi-campus hierarchies</p>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Tenant management interface with onboarding automation, health monitoring, 
                and scaling operations would be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>System Health & Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Real-time system monitoring, performance metrics, and infrastructure 
                management dashboard would be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Platform Analytics</CardTitle>
              <p className="text-sm text-muted-foreground">Comprehensive usage and business intelligence</p>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Advanced analytics dashboard with cross-tenant insights, usage patterns, 
                and business intelligence would be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminPanel;