import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { FeatureCards } from "@/components/FeatureCards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SuperAdminPanel from "@/components/panels/SuperAdminPanel";
import TeacherPanel from "@/components/panels/TeacherPanel";
import StudentPanel from "@/components/panels/StudentPanel";
import AlumniPanel from "@/components/panels/AlumniPanel";
import StaffPanel from "@/components/panels/StaffPanel";
import MultiCampusModule from "@/components/modules/MultiCampusModule";
import AIAssistantModule from "@/components/modules/AIAssistantModule";
import GamificationModule from "@/components/modules/GamificationModule";
import { 
  Sparkles, 
  Rocket, 
  Heart,
  MapPin,
  Users,
  BookOpen,
  Building2,
  Brain,
  GraduationCap
} from "lucide-react";

const WelcomeSection = () => {
  return (
    <div className="mb-8">
      <Card className="shadow-elevated border-0 bg-gradient-hero text-primary-foreground overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Africa-First Design
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Heart className="w-3 h-3 mr-1 text-red-300" />
                  Built for Kenya
                </Badge>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                Welcome to EduMyles Platform
              </h1>
              <p className="text-lg opacity-90 mb-6 max-w-2xl">
                Africa's leading integrated educational technology ecosystem. Manage your school with AI-powered insights, 
                M-Pesa integration, CBC curriculum support, and comprehensive multi-campus management.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Rocket className="w-5 h-5 mr-2" />
                  Quick Setup Guide
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Platform Tour
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const KeyHighlights = () => {
  const highlights = [
    {
      title: "M-Pesa Integration",
      description: "Seamless fee collection with Kenya's #1 mobile money platform",
      icon: "🇰🇪",
      stats: "0% Transaction Fees"
    },
    {
      title: "CBC Curriculum",
      description: "100% aligned with Kenya's Competency Based Curriculum",
      icon: "📚",
      stats: "Full Compliance"
    },
    {
      title: "Multi-Campus Ready",
      description: "Manage unlimited school locations from one dashboard",
      icon: "🏫",
      stats: "Unlimited Scale"
    },
    {
      title: "Myles AI Assistant",
      description: "AI-powered insights and automated school operations",
      icon: "🤖",
      stats: "94% Accuracy"
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-foreground mb-6">Why EduMyles?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((item, index) => (
          <Card key={index} className="shadow-card hover:shadow-elevated transition-smooth">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
              <Badge variant="outline" className="text-xs">
                {item.stats}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Navigation />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-8 max-w-7xl">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-9">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="super-admin">Super Admin</TabsTrigger>
                <TabsTrigger value="teacher">Teacher</TabsTrigger>
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="alumni">Alumni</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
                <TabsTrigger value="ai-assistant">Myles AI</TabsTrigger>
                <TabsTrigger value="gamification">Gamification</TabsTrigger>
                <TabsTrigger value="multi-campus">Multi-Campus</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <WelcomeSection />
                <KeyHighlights />
                <FeatureCards />
              </TabsContent>

              <TabsContent value="super-admin">
                <SuperAdminPanel />
              </TabsContent>

              <TabsContent value="teacher">
                <TeacherPanel />
              </TabsContent>

              <TabsContent value="student">
                <StudentPanel />
              </TabsContent>

              <TabsContent value="alumni">
                <AlumniPanel />
              </TabsContent>

              <TabsContent value="staff">
                <StaffPanel />
              </TabsContent>

              <TabsContent value="ai-assistant">
                <AIAssistantModule />
              </TabsContent>

              <TabsContent value="gamification">
                <GamificationModule />
              </TabsContent>

              <TabsContent value="multi-campus">
                <MultiCampusModule />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};