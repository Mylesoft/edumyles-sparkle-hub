import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  Briefcase, 
  Users, 
  Heart,
  Calendar,
  TrendingUp,
  Award,
  BookOpen,
  Building,
  MapPin,
  Network,
  DollarSign,
  Target,
  MessageSquare
} from "lucide-react";

const AlumniPanel = () => {
  const alumniProfile = {
    graduationYear: "2018",
    currentRole: "Software Engineer",
    company: "Safaricom PLC",
    industry: "Telecommunications",
    location: "Nairobi, Kenya",
    mentorshipStatus: "Active Mentor",
    contributionLevel: "Gold Supporter"
  };

  const networkConnections = [
    {
      name: "Mary Wanjiku",
      graduationYear: "2017",
      currentRole: "Data Scientist",
      company: "KCB Bank",
      location: "Nairobi",
      connectionType: "Classmate"
    },
    {
      name: "James Mwangi", 
      graduationYear: "2019",
      currentRole: "Business Analyst",
      company: "Equity Bank",
      location: "Mombasa",
      connectionType: "Mentee"
    },
    {
      name: "Grace Njeri",
      graduationYear: "2016", 
      currentRole: "Marketing Manager",
      company: "Coca-Cola",
      location: "Nakuru",
      connectionType: "Network Contact"
    }
  ];

  const mentorshipOpportunities = [
    {
      student: "John Doe",
      grade: "Grade 12",
      interests: ["Computer Science", "Mathematics"],
      matchScore: 95,
      status: "pending_approval"
    },
    {
      student: "Sarah Wanjiru",
      grade: "Grade 11", 
      interests: ["Engineering", "Physics"],
      matchScore: 87,
      status: "active_mentorship"
    },
    {
      student: "David Kiprotich",
      grade: "Grade 10",
      interests: ["Business", "Economics"],
      matchScore: 82,
      status: "completed"
    }
  ];

  const contributionOpportunities = [
    {
      type: "fundraising",
      title: "New Computer Lab Project",
      target: 500000,
      raised: 320000,
      deadline: "3 months",
      priority: "high"
    },
    {
      type: "volunteer",
      title: "Career Guidance Workshop",
      date: "Next Month",
      studentsImpact: 150,
      timeCommitment: "4 hours",
      priority: "medium"
    },
    {
      type: "expertise",
      title: "Technology Advisory Board",
      commitment: "Quarterly meetings", 
      impact: "Strategic planning",
      timeCommitment: "2 hours/quarter",
      priority: "high"
    }
  ];

  const schoolUpdates = [
    {
      title: "New STEM Wing Opening",
      description: "State-of-the-art science and technology facilities now open",
      date: "2 weeks ago",
      category: "facility",
      engagement: 45
    },
    {
      title: "Alumni Success Story Featured",
      description: "Mary Wanjiku (Class of 2017) featured in Business Daily for innovation",
      date: "1 month ago", 
      category: "achievement",
      engagement: 78
    },
    {
      title: "Annual Sports Day Results",
      description: "School wins regional championship in athletics and swimming",
      date: "6 weeks ago",
      category: "sports",
      engagement: 32
    }
  ];

  const careerNetworking = [
    {
      industry: "Technology",
      alumni: 45,
      activeMembers: 28,
      avgSalary: "KSh 850K",
      growthRate: "+15%"
    },
    {
      industry: "Finance & Banking",
      alumni: 38,
      activeMembers: 22,
      avgSalary: "KSh 720K", 
      growthRate: "+8%"
    },
    {
      industry: "Healthcare",
      alumni: 29,
      activeMembers: 18,
      avgSalary: "KSh 680K",
      growthRate: "+12%"
    },
    {
      industry: "Education",
      alumni: 52,
      activeMembers: 31,
      avgSalary: "KSh 450K",
      growthRate: "+5%"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alumni Community</h1>
          <p className="text-muted-foreground mt-1">Lifelong connection, mentorship & school support</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-gradient-primary text-primary-foreground">
            <GraduationCap className="w-3 h-3 mr-1" />
            Class of {alumniProfile.graduationYear}
          </Badge>
          <Badge variant="secondary">
            <Award className="w-3 h-3 mr-1" />
            {alumniProfile.contributionLevel}
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Network Size</p>
                <p className="text-2xl font-bold text-foreground">{networkConnections.length + 125}</p>
              </div>
              <Network className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Mentorships</p>
                <p className="text-2xl font-bold text-foreground">
                  {mentorshipOpportunities.filter(m => m.status !== 'completed').length}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Contributions</p>
                <p className="text-2xl font-bold text-foreground">KSh 45K</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Impact Score</p>
                <p className="text-2xl font-bold text-foreground">8.7/10</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="networking">Network</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          <TabsTrigger value="contributions">Give Back</TabsTrigger>
          <TabsTrigger value="careers">Careers</TabsTrigger>
          <TabsTrigger value="school-updates">School News</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Professional Profile */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="w-5 h-5" />
                  <span>Professional Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Role</span>
                    <span className="text-sm font-medium">{alumniProfile.currentRole}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Company</span>
                    <span className="text-sm font-medium">{alumniProfile.company}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Industry</span>
                    <span className="text-sm font-medium">{alumniProfile.industry}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Location</span>
                    <span className="text-sm font-medium flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {alumniProfile.location}
                    </span>
                  </div>
                </div>
                <div className="pt-4 space-y-2">
                  <Button variant="default" className="w-full">
                    <Building className="w-4 h-4 mr-2" />
                    Update Professional Info
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent School Updates */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>School Updates</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {schoolUpdates.slice(0, 3).map((update, index) => (
                  <div key={index} className="p-3 bg-secondary/20 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{update.title}</p>
                      <Badge variant="outline" className="text-xs">
                        {update.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{update.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{update.date}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Heart className="w-3 h-3 mr-1" />
                        {update.engagement} reactions
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="networking" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {networkConnections.map((connection, index) => (
              <Card key={index} className="shadow-card hover:shadow-elevated transition-smooth">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{connection.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        Class of {connection.graduationYear}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{connection.currentRole}</p>
                      <p className="text-xs text-muted-foreground">{connection.company}</p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {connection.location}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {connection.connectionType}
                    </Badge>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="default" className="flex-1">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mentorship" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mentorshipOpportunities.map((opportunity, index) => (
              <Card key={index} className="shadow-card hover:shadow-elevated transition-smooth">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{opportunity.student}</h3>
                      <Badge variant={
                        opportunity.status === 'active_mentorship' ? 'default' :
                        opportunity.status === 'pending_approval' ? 'secondary' : 'outline'
                      }>
                        {opportunity.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{opportunity.grade}</p>
                      <div className="flex flex-wrap gap-1">
                        {opportunity.interests.map((interest, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Match Score</span>
                        <span>{opportunity.matchScore}%</span>
                      </div>
                      <Progress value={opportunity.matchScore} className="h-2" />
                    </div>
                  </div>
                  <div className="mt-4">
                    {opportunity.status === 'pending_approval' && (
                      <div className="flex space-x-2">
                        <Button size="sm" variant="default" className="flex-1">Accept</Button>
                        <Button size="sm" variant="outline" className="flex-1">Decline</Button>
                      </div>
                    )}
                    {opportunity.status === 'active_mentorship' && (
                      <Button size="sm" variant="default" className="w-full">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Message Student
                      </Button>
                    )}
                    {opportunity.status === 'completed' && (
                      <Button size="sm" variant="outline" className="w-full" disabled>
                        Mentorship Complete
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contributions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contributionOpportunities.map((opportunity, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                    <Badge variant={
                      opportunity.priority === 'high' ? 'destructive' :
                      opportunity.priority === 'medium' ? 'default' : 'secondary'
                    }>
                      {opportunity.priority} priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {opportunity.type === 'fundraising' && (
                    <>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>KSh {opportunity.raised?.toLocaleString()} / KSh {opportunity.target?.toLocaleString()}</span>
                        </div>
                        <Progress value={(opportunity.raised! / opportunity.target!) * 100} className="h-3" />
                      </div>
                      <p className="text-sm text-muted-foreground">Deadline: {opportunity.deadline}</p>
                    </>
                  )}
                  
                  {opportunity.type === 'volunteer' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Date:</span>
                        <span>{opportunity.date}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Time Commitment:</span>
                        <span>{opportunity.timeCommitment}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Students Impacted:</span>
                        <span>{opportunity.studentsImpact}</span>
                      </div>
                    </div>
                  )}

                  {opportunity.type === 'expertise' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Commitment:</span>
                        <span>{opportunity.commitment}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Time Required:</span>
                        <span>{opportunity.timeCommitment}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Impact Area:</span>
                        <span>{opportunity.impact}</span>
                      </div>
                    </div>
                  )}

                  <Button variant="default" className="w-full">
                    {opportunity.type === 'fundraising' && <DollarSign className="w-4 h-4 mr-2" />}
                    {opportunity.type === 'volunteer' && <Calendar className="w-4 h-4 mr-2" />}
                    {opportunity.type === 'expertise' && <Target className="w-4 h-4 mr-2" />}
                    
                    {opportunity.type === 'fundraising' ? 'Contribute Funds' :
                     opportunity.type === 'volunteer' ? 'Volunteer Time' : 'Share Expertise'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="careers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careerNetworking.map((industry, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">{industry.industry}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{industry.alumni}</p>
                      <p className="text-xs text-muted-foreground">Total Alumni</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{industry.activeMembers}</p>
                      <p className="text-xs text-muted-foreground">Active Members</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Avg. Salary:</span>
                      <span className="font-medium">{industry.avgSalary}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Growth Rate:</span>
                      <span className={`font-medium ${industry.growthRate.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {industry.growthRate}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Network className="w-4 h-4 mr-2" />
                    Connect with {industry.industry} Network
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="school-updates" className="space-y-4">
          <div className="space-y-4">
            {schoolUpdates.map((update, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{update.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {update.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{update.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{update.date}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Heart className="w-4 h-4 mr-1" />
                          {update.engagement} reactions
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlumniPanel;