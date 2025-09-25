import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  MessageSquare, 
  Lightbulb,
  Target,
  BookOpen,
  TrendingUp,
  Users,
  Calendar,
  Star,
  Zap,
  CheckCircle,
  Clock,
  AlertTriangle,
  Send
} from "lucide-react";
import { useState } from "react";

const AIAssistantModule = () => {
  const [chatMessage, setChatMessage] = useState("");
  
  const aiCapabilities = [
    {
      category: "Academic Support",
      features: [
        { name: "Homework Guidance", description: "Step-by-step assistance without direct answers", active: true },
        { name: "Study Plan Creation", description: "Personalized learning schedules", active: true },
        { name: "Exam Preparation", description: "Adaptive practice and revision", active: true },
        { name: "Career Counseling", description: "Path recommendations based on performance", active: false }
      ]
    },
    {
      category: "Teaching Enhancement", 
      features: [
        { name: "Lesson Planning", description: "CBC-aligned content generation", active: true },
        { name: "Assessment Creation", description: "Automated quiz and test generation", active: true },
        { name: "Student Analytics", description: "Performance prediction and intervention", active: true },
        { name: "Parent Communication", description: "Message suggestions and tone analysis", active: true }
      ]
    },
    {
      category: "Administrative Intelligence",
      features: [
        { name: "Enrollment Forecasting", description: "Predictive modeling for capacity planning", active: true },
        { name: "Financial Optimization", description: "Cost reduction and revenue enhancement", active: false },
        { name: "Performance Benchmarking", description: "School comparison and improvement areas", active: true },
        { name: "Policy Compliance", description: "Regulatory requirement tracking", active: false }
      ]
    }
  ];

  const recentInsights = [
    {
      type: "student_risk",
      title: "Early Intervention Alert",
      message: "5 students in Grade 7 showing declining math performance. Recommend targeted tutoring program.",
      priority: "high",
      timestamp: "2 hours ago",
      confidence: 94,
      actionable: true
    },
    {
      type: "teaching_optimization",
      title: "Curriculum Enhancement",
      message: "Visual learning methods show 23% better results for Grade 6 science classes.",
      priority: "medium", 
      timestamp: "4 hours ago",
      confidence: 87,
      actionable: true
    },
    {
      type: "resource_optimization",
      title: "Library Usage Pattern",
      message: "Peak library usage occurs 2-3 PM. Consider expanding afternoon study programs.",
      priority: "low",
      timestamp: "1 day ago",
      confidence: 78,
      actionable: true
    },
    {
      type: "parent_engagement",
      title: "Communication Opportunity",
      message: "Parents respond 40% better to messages sent on weekday evenings vs. mornings.",
      priority: "medium",
      timestamp: "2 days ago", 
      confidence: 82,
      actionable: true
    }
  ];

  const chatHistory = [
    {
      role: "user",
      message: "How can I help John improve his mathematics performance?",
      timestamp: "10:30 AM"
    },
    {
      role: "assistant",
      message: "Based on John's performance data, I recommend: 1) Focus on foundational concepts in fractions - he's struggling with denominators. 2) Use visual aids - his learning style indicates strong visual processing. 3) Consider peer tutoring with Sarah, who excels in math and has helped others before. Would you like me to create a specific 2-week improvement plan?",
      timestamp: "10:31 AM",
      confidence: 89
    },
    {
      role: "user",
      message: "Yes, please create the 2-week plan.",
      timestamp: "10:32 AM"
    },
    {
      role: "assistant", 
      message: "**John's 2-Week Math Improvement Plan:**\n\n**Week 1: Foundation Building**\n- Days 1-3: Fraction basics with visual pie charts\n- Days 4-5: Practice with real-world examples (pizza slices, time)\n- Weekend: Review games and family practice\n\n**Week 2: Application & Confidence**\n- Days 6-8: Peer tutoring sessions with Sarah (20 min/day)\n- Days 9-10: Progressive difficulty worksheets\n- Assessment: Friday mini-quiz to measure progress\n\n**Daily Schedule:** 15 minutes morning review, 20 minutes afternoon practice. Parent involvement recommended 3x/week. Shall I notify Sarah's teacher about the peer tutoring arrangement?",
      timestamp: "10:33 AM",
      confidence: 92
    }
  ];

  const aiMetrics = [
    {
      title: "AI Accuracy",
      value: "94.2%",
      change: "+2.1% this month",
      icon: Target,
      trend: "up"
    },
    {
      title: "Queries Handled",
      value: "2,847",
      change: "This month",
      icon: MessageSquare,
      trend: "stable"
    },
    {
      title: "Success Rate",
      value: "89.7%",
      change: "+1.8% improvement",
      icon: CheckCircle,
      trend: "up"
    },
    {
      title: "Response Time",
      value: "1.2s",
      change: "Average response",
      icon: Zap,
      trend: "stable"
    }
  ];

  const aiEthicsFramework = [
    {
      principle: "Fairness & Bias Prevention",
      status: "Active",
      description: "Continuous monitoring for demographic bias in recommendations",
      compliance: 96
    },
    {
      principle: "Transparency & Explainability", 
      status: "Active",
      description: "All AI decisions include 'why' explanations and confidence scores",
      compliance: 94
    },
    {
      principle: "Privacy Protection",
      status: "Active", 
      description: "No personal data used in training, full anonymization protocols",
      compliance: 99
    },
    {
      principle: "Human Oversight",
      status: "Active",
      description: "Human review required for critical decisions affecting students",
      compliance: 100
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Myles AI Intelligence Center</h1>
          <p className="text-muted-foreground mt-1">Advanced AI assistance across all educational functions</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-gradient-primary text-primary-foreground">
            <Brain className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
          <Badge variant="secondary">
            <Star className="w-3 h-3 mr-1" />
            Enterprise AI
          </Badge>
        </div>
      </div>

      {/* AI Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {aiMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="shadow-card">
              <CardContent className="p-4">
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
                  <Icon className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main AI Interface */}
      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="insights">Smart Insights</TabsTrigger>
          <TabsTrigger value="capabilities">AI Features</TabsTrigger>
          <TabsTrigger value="analytics">AI Analytics</TabsTrigger>
          <TabsTrigger value="ethics">AI Ethics</TabsTrigger>
          <TabsTrigger value="settings">AI Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <span>Myles AI Assistant</span>
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700">Online</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Chat Messages */}
                  <div className="h-96 overflow-y-auto space-y-4 mb-4 p-4 bg-secondary/10 rounded-lg">
                    {chatHistory.map((msg, index) => (
                      <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.role === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-background border shadow-sm'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{msg.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className={`text-xs ${msg.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                              {msg.timestamp}
                            </p>
                            {msg.role === 'assistant' && msg.confidence && (
                              <Badge variant="outline" className="text-xs">
                                {msg.confidence}% confidence
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <Textarea 
                      placeholder="Ask Myles AI about students, curriculum, school operations, or get teaching suggestions..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1"
                      rows={2}
                    />
                    <Button 
                      variant="default" 
                      className="self-end"
                      onClick={() => {
                        // Handle send message
                        setChatMessage("");
                      }}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Context */}
            <div className="space-y-4">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Quick AI Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-sm">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Generate Lesson Plan
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    Analyze Class Performance
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Create Study Schedule
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Curriculum Alignment Check
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Predict Outcomes
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">AI Context</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Role:</span>
                      <span>Teacher - Grade 5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subject:</span>
                      <span>Mathematics</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Students:</span>
                      <span>28 active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Curriculum:</span>
                      <span>CBC Kenya</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="space-y-4">
            {recentInsights.map((insight, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{insight.title}</h3>
                        <Badge variant={
                          insight.priority === 'high' ? 'destructive' :
                          insight.priority === 'medium' ? 'default' : 'secondary'
                        }>
                          {insight.priority} priority
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{insight.message}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {insight.timestamp}
                        </p>
                        {insight.actionable && (
                          <Button size="sm" variant="outline">
                            <Lightbulb className="w-3 h-3 mr-1" />
                            View Actions
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      insight.type === 'student_risk' ? 'bg-red-500' :
                      insight.type === 'teaching_optimization' ? 'bg-blue-500' :
                      insight.type === 'resource_optimization' ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="capabilities" className="space-y-4">
          <div className="space-y-6">
            {aiCapabilities.map((category, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{feature.name}</p>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {feature.active ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-orange-500" />
                        )}
                        <Badge variant={feature.active ? 'default' : 'secondary'} className="text-xs">
                          {feature.active ? 'Active' : 'Coming Soon'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>AI Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Comprehensive AI analytics dashboard with usage patterns, 
                accuracy metrics, user satisfaction scores, and improvement recommendations 
                would be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ethics" className="space-y-4">
          <div className="space-y-4">
            {aiEthicsFramework.map((principle, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{principle.principle}</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {principle.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{principle.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Compliance Score</span>
                      <span>{principle.compliance}%</span>
                    </div>
                    <Progress value={principle.compliance} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>AI Configuration & Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                AI system configuration interface with personalization settings,
                privacy controls, model selection, and integration preferences 
                would be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAssistantModule;