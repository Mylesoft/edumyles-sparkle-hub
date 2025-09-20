import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  BookOpen, 
  Users, 
  TrendingUp,
  MessageSquare,
  Calendar,
  Target,
  Lightbulb,
  Award,
  Clock,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const TeacherPanel = () => {
  const myClasses = [
    {
      name: "Grade 5A Mathematics",
      students: 28,
      attendance: 92,
      avgGrade: "B+",
      nextClass: "Today 10:00 AM",
      status: "active"
    },
    {
      name: "Grade 6B Science",
      students: 32,
      attendance: 88,
      avgGrade: "A-",
      nextClass: "Tomorrow 2:00 PM",
      status: "active"
    },
    {
      name: "Grade 4C Mathematics",
      students: 25,
      attendance: 95,
      avgGrade: "B",
      nextClass: "Friday 9:00 AM",
      status: "active"
    }
  ];

  const aiInsights = [
    {
      type: "student_risk",
      title: "At-Risk Student Alert",
      message: "John Doe (Grade 5A) showing declining performance. Recommend intervention.",
      priority: "high",
      actionable: true
    },
    {
      type: "teaching_suggestion",
      title: "Teaching Optimization",
      message: "Visual learning methods show 23% better results for your Grade 6B class.",
      priority: "medium",
      actionable: true
    },
    {
      type: "curriculum_alignment",
      title: "CBC Alignment Check",
      message: "Your lesson plan is 95% aligned with CBC competency standards.",
      priority: "low",
      actionable: false
    }
  ];

  const upcomingTasks = [
    {
      task: "Grade Math Assignments",
      dueDate: "Today",
      priority: "high",
      completed: false
    },
    {
      task: "Prepare Science Lesson Plan",
      dueDate: "Tomorrow",
      priority: "medium",
      completed: false
    },
    {
      task: "Parent Meeting - Sarah's Progress",
      dueDate: "Friday",
      priority: "medium",
      completed: false
    },
    {
      task: "Submit Monthly Report",
      dueDate: "Next Week",
      priority: "low",
      completed: true
    }
  ];

  const studentPerformance = [
    {
      subject: "Mathematics",
      class: "Grade 5A",
      avgScore: 78,
      improvement: "+5%",
      trend: "up"
    },
    {
      subject: "Science",
      class: "Grade 6B",
      avgScore: 85,
      improvement: "+2%",
      trend: "up"
    },
    {
      subject: "Mathematics",
      class: "Grade 4C",
      avgScore: 72,
      improvement: "-1%",
      trend: "down"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Teacher Portal</h1>
          <p className="text-muted-foreground mt-1">AI-enhanced teaching & classroom intelligence</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-gradient-primary text-primary-foreground">
            <Brain className="w-3 h-3 mr-1" />
            Myles AI Enabled
          </Badge>
          <Badge variant="secondary">
            <Award className="w-3 h-3 mr-1" />
            CBC Certified
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">My Classes</p>
                <p className="text-2xl font-bold text-foreground">{myClasses.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-foreground">
                  {myClasses.reduce((sum, cls) => sum + cls.students, 0)}
                </p>
              </div>
              <Target className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
                <p className="text-2xl font-bold text-foreground">92%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Tasks</p>
                <p className="text-2xl font-bold text-foreground">
                  {upcomingTasks.filter(task => !task.completed).length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="classes">My Classes</TabsTrigger>
          <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
          <TabsTrigger value="lesson-planning">Lesson Plans</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Myles AI Insights */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span>Myles AI Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{insight.title}</p>
                      <Badge variant={
                        insight.priority === 'high' ? 'destructive' :
                        insight.priority === 'medium' ? 'default' : 'secondary'
                      }>
                        {insight.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.message}</p>
                    {insight.actionable && (
                      <Button size="sm" variant="outline" className="mt-2">
                        <Lightbulb className="w-3 h-3 mr-1" />
                        View Suggestions
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Upcoming Tasks</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                    task.completed ? 'bg-green-50 dark:bg-green-950/20' : 'bg-secondary/20'
                  }`}>
                    <div className="flex items-center space-x-3">
                      {task.completed ? 
                        <CheckCircle className="w-4 h-4 text-green-600" /> :
                        <Clock className="w-4 h-4 text-orange-500" />
                      }
                      <div>
                        <p className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.task}
                        </p>
                        <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                      </div>
                    </div>
                    <Badge variant={
                      task.priority === 'high' ? 'destructive' :
                      task.priority === 'medium' ? 'default' : 'secondary'
                    }>
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="classes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myClasses.map((cls, index) => (
              <Card key={index} className="shadow-card hover:shadow-elevated transition-smooth">
                <CardHeader>
                  <CardTitle className="text-lg">{cls.name}</CardTitle>
                  <Badge variant="outline">{cls.students} students</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Attendance</span>
                      <span className="text-sm font-medium">{cls.attendance}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Average Grade</span>
                      <span className="text-sm font-medium">{cls.avgGrade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Next Class</span>
                      <span className="text-sm font-medium">{cls.nextClass}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="default" className="flex-1">
                      <BookOpen className="w-3 h-3 mr-1" />
                      Enter Class
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-assistant" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-primary" />
                <span>Myles AI Teaching Assistant</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Your intelligent teaching companion for lesson planning, assessment creation, and student insights
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Interactive AI assistant interface would be implemented here with:
                <br />• CBC-aligned lesson plan generation
                <br />• Assessment creation and optimization
                <br />• Student performance predictions
                <br />• Parent communication assistance
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lesson-planning" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>AI-Assisted Lesson Planning</CardTitle>
              <p className="text-sm text-muted-foreground">Create CBC-aligned lesson plans with AI assistance</p>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Lesson planning interface with AI-generated CBC-aligned content,
                competency mapping, and resource suggestions would be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Assessment Management</CardTitle>
              <p className="text-sm text-muted-foreground">Create, manage, and analyze student assessments</p>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Assessment creation tools, grading interface, and analysis dashboard
                would be implemented here with CBC competency-based evaluation.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Student Performance Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {studentPerformance.map((perf, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{perf.subject} - {perf.class}</p>
                      <p className="text-xs text-muted-foreground">Average Score: {perf.avgScore}%</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={perf.trend === 'up' ? 'default' : 'destructive'}>
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {perf.improvement}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Teaching Effectiveness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  Detailed analytics on teaching methods effectiveness,
                  student engagement patterns, and improvement recommendations
                  would be displayed here.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherPanel;