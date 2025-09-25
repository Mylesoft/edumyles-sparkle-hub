import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  BookOpen, 
  Heart,
  Wrench,
  Shield,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
  Settings,
  FileText,
  Activity
} from "lucide-react";

const StaffPanel = () => {
  const staffRole = {
    position: "School Librarian",
    department: "Academic Support",
    yearsOfService: 5,
    employeeId: "LIB001",
    supervisor: "Academic Director"
  };

  const libraryMetrics = [
    {
      title: "Total Books",
      value: "12,450",
      change: "+125 this month",
      icon: BookOpen,
      trend: "up"
    },
    {
      title: "Active Readers",
      value: "385",
      change: "+12% this term",
      icon: Users,
      trend: "up"
    },
    {
      title: "Books Borrowed",
      value: "234",
      change: "This week",
      icon: TrendingUp,
      trend: "stable"
    },
    {
      title: "Overdue Items",
      value: "18",
      change: "-5 from last week",
      icon: AlertTriangle,
      trend: "down"
    }
  ];

  const popularBooks = [
    {
      title: "The River and the Source",
      author: "Margaret Ogola",
      category: "Literature",
      borrowCount: 45,
      availability: "2 copies available"
    },
    {
      title: "Mathematics Grade 9",
      author: "KIE Publishers",
      category: "Textbook",
      borrowCount: 38,
      availability: "5 copies available"
    },
    {
      title: "Blossoms of the Savannah",
      author: "Henry Ole Kulet", 
      category: "Literature",
      borrowCount: 32,
      availability: "1 copy available"
    },
    {
      title: "Integrated Science",
      author: "Longhorn Publishers",
      category: "Textbook",
      borrowCount: 28,
      availability: "3 copies available"
    }
  ];

  const recentActivities = [
    {
      type: "book_return",
      description: "Sarah Wanjiku returned 'Things Fall Apart'",
      time: "2 hours ago",
      status: "completed"
    },
    {
      type: "new_acquisition",
      description: "Added 15 new Grade 10 textbooks to collection",
      time: "1 day ago", 
      status: "completed"
    },
    {
      type: "overdue_notice",
      description: "Sent overdue notices to 8 students",
      time: "2 days ago",
      status: "completed"
    },
    {
      type: "maintenance",
      description: "Catalog system maintenance scheduled",
      time: "Next week",
      status: "scheduled"
    }
  ];

  const maintenanceRequests = [
    {
      id: "REQ001",
      type: "facility",
      title: "Library Air Conditioning Repair",
      priority: "high",
      status: "in_progress",
      assignedTo: "Maintenance Team",
      dueDate: "Tomorrow",
      description: "AC unit making noise and not cooling effectively"
    },
    {
      id: "REQ002", 
      type: "equipment",
      title: "Replace Damaged Chairs",
      priority: "medium",
      status: "pending",
      assignedTo: "Procurement", 
      dueDate: "Next week",
      description: "5 reading chairs need replacement due to wear"
    },
    {
      id: "REQ003",
      type: "technology",
      title: "Update Library Management System",
      priority: "low",
      status: "completed",
      assignedTo: "IT Department",
      dueDate: "Completed",
      description: "Software upgrade to latest version"
    }
  ];

  const counselorCases = [
    {
      studentId: "STU123",
      studentName: "John Doe",
      grade: "Grade 8",
      caseType: "academic_support",
      priority: "medium",
      lastSession: "3 days ago",
      nextSession: "Tomorrow 2:00 PM",
      status: "ongoing",
      progress: 65
    },
    {
      studentId: "STU124",
      studentName: "Mary Wanjiku", 
      grade: "Grade 11",
      caseType: "career_guidance",
      priority: "low",
      lastSession: "1 week ago",
      nextSession: "Next week",
      status: "ongoing",
      progress: 80
    },
    {
      studentId: "STU125",
      studentName: "David Kiprotich",
      grade: "Grade 9",
      caseType: "behavioral_support",
      priority: "high",
      lastSession: "Yesterday",
      nextSession: "Today 3:30 PM",
      status: "critical",
      progress: 40
    }
  ];

  const wellnessMetrics = [
    {
      title: "Active Cases",
      value: counselorCases.filter(c => c.status === 'ongoing' || c.status === 'critical').length.toString(),
      change: "+2 this week",
      icon: Heart,
      trend: "up"
    },
    {
      title: "Sessions This Week",
      value: "12",
      change: "3 pending",
      icon: Calendar,
      trend: "stable"
    },
    {
      title: "Success Rate",
      value: "85%",
      change: "+5% this term",
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "Crisis Interventions",
      value: "2",
      change: "This month",
      icon: Shield,
      trend: "stable"
    }
  ];

  const securityIncidents = [
    {
      id: "SEC001",
      type: "property",
      title: "Unauthorized Entry - Computer Lab",
      severity: "high",
      reportedBy: "Night Security",
      time: "Last night 11:30 PM",
      status: "investigating",
      actionTaken: "CCTV footage reviewed, no theft detected"
    },
    {
      id: "SEC002",
      type: "safety",
      title: "Student Injury - Playground",
      severity: "medium", 
      reportedBy: "PE Teacher",
      time: "Yesterday 2:00 PM",
      status: "resolved",
      actionTaken: "First aid provided, parents notified, incident documented"
    },
    {
      id: "SEC003",
      type: "equipment",
      title: "Fire Alarm Malfunction",
      severity: "high",
      reportedBy: "Facilities Manager",
      time: "2 days ago",
      status: "resolved",
      actionTaken: "Technician called, system tested and repaired"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Portal</h1>
          <p className="text-muted-foreground mt-1">Specialized tools for support services & operations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-gradient-primary text-primary-foreground">
            <Users className="w-3 h-3 mr-1" />
            {staffRole.position}
          </Badge>
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            {staffRole.yearsOfService} Years Service
          </Badge>
        </div>
      </div>

      {/* Role-Based Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {(staffRole.position.includes('Librarian') ? libraryMetrics :
          staffRole.position.includes('Counselor') ? wellnessMetrics :
          libraryMetrics).map((metric, index) => {
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

      {/* Main Content - Role-Based Tabs */}
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          {staffRole.position.includes('Librarian') && <TabsTrigger value="library">Library</TabsTrigger>}
          {staffRole.position.includes('Counselor') && <TabsTrigger value="counseling">Counseling</TabsTrigger>}
          {staffRole.position.includes('Security') && <TabsTrigger value="security">Security</TabsTrigger>}
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Recent Activities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/20">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'completed' ? 'bg-green-500' :
                      activity.status === 'scheduled' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.description}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                        <Badge variant="outline" className="text-xs">
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Staff Profile Summary */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Staff Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Position:</span>
                    <span className="text-sm font-medium">{staffRole.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Department:</span>
                    <span className="text-sm font-medium">{staffRole.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Employee ID:</span>
                    <span className="text-sm font-medium">{staffRole.employeeId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Supervisor:</span>
                    <span className="text-sm font-medium">{staffRole.supervisor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Service Years:</span>
                    <span className="text-sm font-medium">{staffRole.yearsOfService} years</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Library Management Tab */}
        {staffRole.position.includes('Librarian') && (
          <TabsContent value="library" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Popular Books */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Popular Books This Month</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {popularBooks.map((book, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{book.title}</p>
                        <p className="text-xs text-muted-foreground">by {book.author}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">{book.category}</Badge>
                          <span className="text-xs text-muted-foreground">{book.borrowCount} borrows</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{book.availability}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Library Operations */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="default" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Process Book Returns
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Send Overdue Notices
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Generate Usage Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Catalog
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        {/* Counseling Tab */}
        {staffRole.position.includes('Counselor') && (
          <TabsContent value="counseling" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {counselorCases.map((case_, index) => (
                <Card key={index} className={`shadow-card ${
                  case_.status === 'critical' ? 'border-red-500/50' : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{case_.studentName}</h3>
                        <Badge variant={
                          case_.priority === 'high' ? 'destructive' :
                          case_.priority === 'medium' ? 'default' : 'secondary'
                        }>
                          {case_.priority}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">{case_.grade} • {case_.caseType.replace('_', ' ')}</p>
                        <p className="text-xs text-muted-foreground">Last session: {case_.lastSession}</p>
                        <p className="text-xs text-muted-foreground">Next session: {case_.nextSession}</p>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{case_.progress}%</span>
                        </div>
                        <Progress value={case_.progress} className="h-2" />
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="default" className="flex-1">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Notes
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        )}

        {/* Security Tab */}
        {staffRole.position.includes('Security') && (
          <TabsContent value="security" className="space-y-4">
            <div className="space-y-4">
              {securityIncidents.map((incident, index) => (
                <Card key={index} className={`shadow-card ${
                  incident.severity === 'high' ? 'border-red-500/50' : 
                  incident.severity === 'medium' ? 'border-yellow-500/50' : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{incident.title}</h3>
                          <Badge variant={
                            incident.severity === 'high' ? 'destructive' :
                            incident.severity === 'medium' ? 'default' : 'secondary'
                          }>
                            {incident.severity}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {incident.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Reported by {incident.reportedBy} • {incident.time}
                        </p>
                        <p className="text-sm">{incident.actionTaken}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        )}

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-4">
          <div className="space-y-4">
            {maintenanceRequests.map((request, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{request.title}</h3>
                        <Badge variant={
                          request.priority === 'high' ? 'destructive' :
                          request.priority === 'medium' ? 'default' : 'secondary'
                        }>
                          {request.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {request.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {request.id} • Assigned to {request.assignedTo} • Due: {request.dueDate}
                      </p>
                      <p className="text-sm">{request.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Wrench className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Staff Reports & Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Role-specific reporting interface with performance metrics,
                activity summaries, and departmental analytics would be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Staff Profile Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Comprehensive staff profile management with personal information,
                professional development tracking, and performance records would be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffPanel;