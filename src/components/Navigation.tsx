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
  Calendar,
  Heart,
  Sparkles,
  Store
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

const navigationSections = [
  {
    title: "Core Panels",
    items: [
      {
        title: "Super Admin Panel",
        icon: Settings,
        description: "Platform governance & partner management",
        isActive: false,
        badge: "Admin",
        href: "/super-admin"
      },
      {
        title: "School Admin Panel", 
        icon: BarChart3,
        description: "Multi-campus coordination & operations",
        isActive: true,
        badge: "Active"
      },
      {
        title: "Teacher Portal",
        icon: Users, 
        description: "AI-assisted teaching & classroom intelligence",
        badge: "AI"
      },
      {
        title: "Student Panel",
        icon: GraduationCap,
        description: "Personalized learning & gamification",
        badge: "AI"
      },
      {
        title: "Parent/Guardian Panel",
        icon: MessageCircle,
        description: "Multi-child monitoring & engagement",
        badge: "Smart"
      },
      {
        title: "Staff Panel",
        icon: BookOpen,
        description: "Specialized roles: librarian, counselor, maintenance"
      },
      {
        title: "Alumni Panel",
        icon: Heart,
        description: "Career networking & school support systems"
      }
    ]
  },
  {
    title: "Academic Management",
    items: [
      {
        title: "Multi-Curriculum Suite",
        icon: BookOpen,
        description: "CBC, Cambridge, IB & custom frameworks",
        badge: "Multi"
      },
      {
        title: "Assessment Engine",
        icon: Calendar,
        description: "Competency-based & traditional grading",
        badge: "Adaptive"
      },
      {
        title: "Academic Analytics",
        icon: BarChart3,
        description: "Predictive insights & performance forecasting",
        badge: "AI"
      }
    ]
  },
  {
    title: "Operations & Services",
    items: [
      {
        title: "Financial Center",
        icon: DollarSign,
        description: "M-Pesa integration & multi-campus billing",
        badge: "M-Pesa"
      },
      {
        title: "EduRyde Transport",
        icon: Bus,
        description: "GPS tracking & route optimization",
        badge: "GPS"
      },
      {
        title: "Communication Hub",
        icon: MessageCircle,
        description: "Omnichannel messaging & AI routing",
        badge: "Smart"
      }
    ]
  },
  {
    title: "Intelligence & Support",
    items: [
      {
        title: "Myles AI Assistant",
        icon: Bot,
        description: "Universal AI intelligence across all panels",
        badge: "AI Core"
      },
      {
        title: "Universal Ticketing",
        icon: Ticket,
        description: "Cross-module support & task management",
        badge: "Universal"
      },
      {
        title: "Knowledge Hub",
        icon: BookOpen,
        description: "Role-based resources & collaboration",
        badge: "Collaborative"
      },
      {
        title: "Gamification System",
        icon: Sparkles,
        description: "Multi-role achievements & leaderboards",
        badge: "Engaging"
      }
    ]
  },
  {
    title: "App Store & Management",
    items: [
      {
        title: "EduMyles App Store",
        icon: Store,
        description: "Discover and install educational modules",
        badge: "New",
        href: "/app-store"
      },
      {
        title: "Tenant Manager",
        icon: Settings,
        description: "Super admin tenant & subscription management",
        badge: "Admin",
        href: "/tenant-manager"
      }
    ]
  }
];

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (href?: string) => {
    if (href) {
      navigate(href);
    }
  };

  return (
    <div className="w-80 bg-card border-r border-border shadow-elevated h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground mb-1">EduMyles Platform</h2>
          <p className="text-xs text-muted-foreground">Africa's Leading EdTech Ecosystem</p>
        </div>
        
        {navigationSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-2">
              {section.title}
            </h3>
            
            {section.items.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.href ? location.pathname === item.href : item.isActive;
              return (
                <Button
                  key={index}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start p-3 h-auto text-left transition-smooth relative",
                    isActive 
                      ? "bg-gradient-primary text-primary-foreground shadow-premium" 
                      : "hover:bg-secondary/60"
                  )}
                  onClick={() => handleNavigation(item.href)}
                >
                  <div className="flex items-start space-x-3 w-full">
                    <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-xs">{item.title}</div>
                        {item.badge && (
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "text-xs px-1.5 py-0.5 h-auto",
                              isActive 
                                ? "bg-primary-foreground/20 text-primary-foreground" 
                                : "bg-primary/20 text-primary"
                            )}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <div className={cn(
                        "text-xs mt-0.5 line-clamp-2",
                        isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                      )}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};