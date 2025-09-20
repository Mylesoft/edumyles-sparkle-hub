import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  DollarSign, 
  Bus,
  MessageCircle,
  BarChart3,
  Settings,
  Bot,
  Ticket,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Dashboard Overview",
    icon: BarChart3,
    description: "Complete school analytics and insights",
    isActive: true
  },
  {
    title: "Student Management", 
    icon: GraduationCap,
    description: "Enrollment, records, and academic tracking"
  },
  {
    title: "Teacher Portal",
    icon: Users, 
    description: "Staff management and professional development"
  },
  {
    title: "Academic Suite",
    icon: BookOpen,
    description: "CBC curriculum, assessments, and grades"
  },
  {
    title: "Financial Center",
    icon: DollarSign,
    description: "Fees, M-Pesa integration, and billing"
  },
  {
    title: "EduRyde Transport",
    icon: Bus,
    description: "Route management and GPS tracking"
  },
  {
    title: "Communication Hub",
    icon: MessageCircle,
    description: "Parent-teacher communication platform"
  },
  {
    title: "Myles AI Assistant",
    icon: Bot,
    description: "AI-powered insights and automation"
  },
  {
    title: "Support Tickets",
    icon: Ticket,
    description: "Technical and academic support system"
  },
  {
    title: "Academic Calendar",
    icon: Calendar,
    description: "Term planning and event management"
  },
  {
    title: "System Settings",
    icon: Settings,
    description: "Platform configuration and preferences"
  }
];

export const Navigation = () => {
  return (
    <div className="w-80 bg-card border-r border-border shadow-elevated h-screen overflow-y-auto">
      <div className="p-6 space-y-1">
        <h2 className="text-lg font-semibold text-foreground mb-4">EduMyles Platform</h2>
        
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Button
              key={index}
              variant={item.isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start p-4 h-auto text-left transition-smooth",
                item.isActive 
                  ? "bg-gradient-primary text-primary-foreground shadow-premium" 
                  : "hover:bg-secondary/60"
              )}
            >
              <div className="flex items-start space-x-3">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className={cn(
                    "text-xs mt-0.5 line-clamp-2",
                    item.isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {item.description}
                  </div>
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};