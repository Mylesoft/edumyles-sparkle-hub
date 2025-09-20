import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Users, 
  TrendingUp,
  MapPin,
  ArrowRightLeft,
  School,
  Globe,
  BarChart3,
  Settings,
  UserCheck,
  BookOpen,
  Bus
} from "lucide-react";

const MultiCampusModule = () => {
  const campuses = [
    {
      id: 1,
      name: "Main Campus - Nairobi",
      type: "main",
      students: 850,
      staff: 45,
      status: "active",
      performance: 92,
      location: "Westlands, Nairobi"
    },
    {
      id: 2,
      name: "Branch Campus - Mombasa",
      type: "branch",
      students: 650,
      staff: 32,
      status: "active",
      performance: 88,
      location: "Nyali, Mombasa"
    },
    {
      id: 3,
      name: "STEM Campus - Nakuru",
      type: "specialized",
      students: 420,
      staff: 28,
      status: "active",
      performance: 95,
      location: "Milimani, Nakuru"
    },
    {
      id: 4,
      name: "Virtual Campus",
      type: "virtual",
      students: 180,
      staff: 12,
      status: "active",
      performance: 85,
      location: "Online Platform"
    }
  ];

  const curriculumFrameworks = [
    {
      name: "CBC (Kenyan)",
      campuses: ["Main Campus", "Branch Campus"],
      students: 1200,
      status: "active"
    },
    {
      name: "Cambridge IGCSE",
      campuses: ["STEM Campus"],
      students: 300,
      status: "active"
    },
    {
      name: "IB Programme",
      campuses: ["STEM Campus"],
      students: 120,
      status: "active"
    },
    {
      name: "Montessori",
      campuses: ["Virtual Campus"],
      students: 180,
      status: "pilot"
    }
  ];

  const interCampusActivities = [
    {
      type: "student_transfer",
      description: "John Doe transferred from Nairobi to Mombasa campus",
      timestamp: "2 hours ago",
      status: "completed"
    },
    {
      type: "staff_exchange",
      description: "Mathematics teacher assigned to cover Nakuru campus",
      timestamp: "1 day ago",
      status: "in_progress"
    },
    {
      type: "resource_sharing",
      description: "Science equipment shared between Main and STEM campus",
      timestamp: "3 days ago",
      status: "completed"
    },
    {
      type: "joint_event",
      description: "Inter-campus sports competition scheduled",
      timestamp: "1 week ago",
      status: "planned"
    }
  ];

  const consolidatedMetrics = {
    totalStudents: campuses.reduce((sum, campus) => sum + campus.students, 0),
    totalStaff: campuses.reduce((sum, campus) => sum + campus.staff, 0),
    avgPerformance: Math.round(campuses.reduce((sum, campus) => sum + campus.performance, 0) / campuses.length),
    activeCampuses: campuses.filter(c => c.status === 'active').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Multi-Campus Management</h1>
          <p className="text-muted-foreground mt-1">Unified administration across all campus locations</p>
        </div>
        <Badge variant="outline" className="bg-gradient-primary text-primary-foreground">
          <Building2 className="w-3 h-3 mr-1" />
          {consolidatedMetrics.activeCampuses} Active Campuses
        </Badge>
      </div>

      {/* Consolidated Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-foreground">{consolidatedMetrics.totalStudents.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-bold text-foreground">{consolidatedMetrics.totalStaff}</p>
              </div>
              <UserCheck className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Performance</p>
                <p className="text-2xl font-bold text-foreground">{consolidatedMetrics.avgPerformance}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Curricula</p>
                <p className="text-2xl font-bold text-foreground">{curriculumFrameworks.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campuses">Campuses</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="coordination">Coordination</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Campus Quick View */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <School className="w-5 h-5" />
                  <span>Campus Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {campuses.map((campus) => (
                  <div key={campus.id} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        campus.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{campus.name}</p>
                        <p className="text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3 inline mr-1" />
                          {campus.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={campus.type === 'main' ? 'default' : 'secondary'}>
                        {campus.type}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {campus.students} students
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Inter-Campus Activities */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ArrowRightLeft className="w-5 h-5" />
                  <span>Recent Activities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {interCampusActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/20">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'completed' ? 'bg-green-500' :
                      activity.status === 'in_progress' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.description}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                        <Badge variant="outline" className="text-xs">
                          {activity.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campuses" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campuses.map((campus) => (
              <Card key={campus.id} className="shadow-card hover:shadow-elevated transition-smooth">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{campus.name}</CardTitle>
                    <Badge variant={campus.type === 'main' ? 'default' : 'secondary'}>
                      {campus.type} campus
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {campus.location}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{campus.students}</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{campus.staff}</p>
                      <p className="text-xs text-muted-foreground">Staff</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Performance Score</span>
                      <span>{campus.performance}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${campus.performance}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="default" className="flex-1">
                      <Settings className="w-3 h-3 mr-1" />
                      Manage
                    </Button>
                    <Button size="sm" variant="outline">
                      <BarChart3 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {curriculumFrameworks.map((curriculum, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{curriculum.name}</CardTitle>
                    <Badge variant={curriculum.status === 'active' ? 'default' : 'secondary'}>
                      {curriculum.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Active Campuses:</p>
                    <div className="flex flex-wrap gap-1">
                      {curriculum.campuses.map((campus, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {campus}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{curriculum.students}</p>
                      <p className="text-xs text-muted-foreground">Total Students</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <BookOpen className="w-3 h-3 mr-1" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="coordination" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Inter-Campus Operations</CardTitle>
                <p className="text-sm text-muted-foreground">Manage transfers, exchanges, and shared resources</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="default" className="w-full justify-start">
                  <ArrowRightLeft className="w-4 h-4 mr-2" />
                  Student Transfer Center
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Staff Exchange Program
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Resource Sharing Hub
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bus className="w-4 h-4 mr-2" />
                  Transport Coordination
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Communication Hub</CardTitle>
                <p className="text-sm text-muted-foreground">Cross-campus messaging and coordination</p>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  Inter-campus communication interface with unified messaging,
                  policy distribution, and collaborative tools would be implemented here.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Cross-Campus Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Comprehensive analytics dashboard with campus comparison,
                performance benchmarking, resource utilization, and strategic insights
                would be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiCampusModule;