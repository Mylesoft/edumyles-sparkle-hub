import { 
  TrendingUp, 
  Users, 
  GraduationCap, 
  DollarSign,
  Bot,
  Globe,
  Shield,
  Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const quickActions = [
  {
    title: "AI-Powered Analytics",
    description: "Get intelligent insights into student performance, financial trends, and operational efficiency with Myles AI.",
    icon: Bot,
    gradient: "bg-gradient-primary",
    stats: "94% accuracy",
    action: "View AI Insights"
  },
  {
    title: "M-Pesa Integration", 
    description: "Seamless fee collection through Kenya's leading mobile money platform with real-time reconciliation.",
    icon: DollarSign,
    gradient: "bg-gradient-success", 
    stats: "Zero transaction fees",
    action: "Setup M-Pesa"
  },
  {
    title: "CBC Curriculum Suite",
    description: "Complete Competency Based Curriculum support with automated assessment generation and progress tracking.",
    icon: GraduationCap,
    gradient: "bg-info text-info-foreground",
    stats: "100% CBC aligned",
    action: "Explore CBC Tools"
  },
  {
    title: "Multi-Campus Management",
    description: "Manage multiple school locations from a unified dashboard with role-based access controls.",
    icon: Globe,
    gradient: "bg-warning text-warning-foreground",
    stats: "Unlimited campuses",
    action: "Add Campus"
  }
];

const statsCards = [
  { title: "Total Students", value: "2,847", change: "+12%", icon: Users, trend: "up" },
  { title: "Active Teachers", value: "156", change: "+5%", icon: GraduationCap, trend: "up" },
  { title: "Monthly Revenue", value: "KSh 1.2M", change: "+18%", icon: TrendingUp, trend: "up" },
  { title: "System Uptime", value: "99.9%", change: "Excellent", icon: Shield, trend: "stable" }
];

export const FeatureCards = () => {
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-6">School Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-card hover:shadow-elevated transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="mt-2">
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Platform Features</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card key={index} className="shadow-card hover:shadow-elevated transition-smooth border-0 overflow-hidden">
                <CardHeader className={`${action.gradient} text-white`}>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-lg">{action.title}</span>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {action.stats}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {action.description}
                  </p>
                  <Button variant="outline" className="w-full transition-bounce hover:bg-primary hover:text-primary-foreground">
                    <Zap className="w-4 h-4 mr-2" />
                    {action.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};