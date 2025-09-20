import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  BookOpen, 
  Trophy, 
  Target,
  Calendar,
  TrendingUp,
  Star,
  Award,
  Clock,
  CheckCircle,
  Zap,
  Users,
  Lightbulb
} from "lucide-react";

const StudentPanel = () => {
  const currentSubjects = [
    {
      name: "Mathematics",
      teacher: "Mr. Johnson",
      currentGrade: "A-",
      progress: 85,
      nextAssignment: "Geometry Quiz",
      dueDate: "Tomorrow"
    },
    {
      name: "English",
      teacher: "Ms. Smith",
      currentGrade: "B+",
      progress: 78,
      nextAssignment: "Essay Writing",
      dueDate: "Friday"
    },
    {
      name: "Science",
      teacher: "Dr. Wilson",
      currentGrade: "A",
      progress: 92,
      nextAssignment: "Lab Report",
      dueDate: "Next Week"
    },
    {
      name: "Kiswahili",
      teacher: "Mwalimu Ochieng",
      currentGrade: "B",
      progress: 72,
      nextAssignment: "Insha Writing",
      dueDate: "Monday"
    }
  ];

  const achievements = [
    {
      title: "Perfect Attendance",
      description: "30 days straight attendance",
      icon: Calendar,
      earned: true,
      points: 100
    },
    {
      title: "Math Champion",
      description: "Top 3 in class mathematics",
      icon: Trophy,
      earned: true,
      points: 150
    },
    {
      title: "Peer Helper",
      description: "Helped 5 classmates this month",
      icon: Users,
      earned: true,
      points: 75
    },
    {
      title: "Innovation Badge",
      description: "Creative project submission",
      icon: Lightbulb,
      earned: false,
      points: 200
    }
  ];

  const aiRecommendations = [
    {
      type: "study_plan",
      title: "Personalized Study Schedule",
      message: "Based on your performance, focus 20 minutes daily on Kiswahili grammar.",
      priority: "medium"
    },
    {
      type: "career_guidance",
      title: "Career Path Insight",
      message: "Your strong math and science scores suggest excellent STEM career opportunities.",
      priority: "low"
    },
    {
      type: "improvement",
      title: "Learning Optimization",
      message: "You learn best in the morning. Try studying difficult subjects before 10 AM.",
      priority: "high"
    }
  ];

  const upcomingAssignments = [
    {
      subject: "Mathematics",
      title: "Geometry Quiz",
      dueDate: "Tomorrow",
      status: "pending",
      difficulty: "medium"
    },
    {
      subject: "English",
      title: "Essay: My Future Dreams",
      dueDate: "Friday",
      status: "in_progress",
      difficulty: "easy"
    },
    {
      subject: "Science",
      title: "Plant Growth Lab Report",
      dueDate: "Next Week",
      status: "not_started",
      difficulty: "hard"
    }
  ];

  const weeklyGoals = [
    {
      goal: "Complete all assignments on time",
      progress: 75,
      completed: false
    },
    {
      goal: "Attend all classes",
      progress: 100,
      completed: true
    },
    {
      goal: "Help 2 classmates with studies",
      progress: 50,
      completed: false
    },
    {
      goal: "Read 3 storybooks",
      progress: 66,
      completed: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Learning Dashboard</h1>
          <p className="text-muted-foreground mt-1">Personalized learning journey with AI guidance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-gradient-primary text-primary-foreground">
            <Zap className="w-3 h-3 mr-1" />
            Level 12 Learner
          </Badge>
          <Badge variant="secondary">
            <Star className="w-3 h-3 mr-1" />
            1,250 Points
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Grade</p>
                <p className="text-2xl font-bold text-foreground">B+</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Attendance</p>
                <p className="text-2xl font-bold text-foreground">96%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Achievements</p>
                <p className="text-2xl font-bold text-foreground">
                  {achievements.filter(a => a.earned).length}
                </p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Class Rank</p>
                <p className="text-2xl font-bold text-foreground">#5</p>
              </div>
              <Award className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="subjects">My Subjects</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="ai-companion">AI Companion</TabsTrigger>
          <TabsTrigger value="goals">My Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Learning Companion */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span>Myles AI Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{rec.title}</p>
                      <Badge variant={
                        rec.priority === 'high' ? 'destructive' :
                        rec.priority === 'medium' ? 'default' : 'secondary'
                      }>
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.message}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Weekly Goals */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Weekly Goals</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {weeklyGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{goal.goal}</p>
                      {goal.completed && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">{goal.progress}% complete</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Assignments */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Upcoming Assignments</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {upcomingAssignments.map((assignment, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{assignment.subject}</Badge>
                      <Badge variant={
                        assignment.status === 'pending' ? 'destructive' :
                        assignment.status === 'in_progress' ? 'default' : 'secondary'
                      }>
                        {assignment.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{assignment.title}</p>
                      <p className="text-xs text-muted-foreground">Due: {assignment.dueDate}</p>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      {assignment.status === 'not_started' ? 'Start Assignment' : 'Continue Work'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentSubjects.map((subject, index) => (
              <Card key={index} className="shadow-card hover:shadow-elevated transition-smooth">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <Badge variant="outline">{subject.currentGrade}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Teacher: {subject.teacher}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Next Assignment:</p>
                    <p className="text-sm text-muted-foreground">{subject.nextAssignment}</p>
                    <p className="text-xs text-muted-foreground">Due: {subject.dueDate}</p>
                  </div>
                  <Button variant="default" className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Enter Classroom
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Assignment Center</CardTitle>
              <p className="text-sm text-muted-foreground">Manage and track all your assignments</p>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Assignment management interface with submission portal,
                progress tracking, and AI-powered study assistance would be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index} className={`shadow-card ${
                  achievement.earned ? 'border-primary/50 bg-primary/5' : 'opacity-60'
                }`}>
                  <CardContent className="p-6 text-center space-y-3">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-gradient-primary' : 'bg-secondary'
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        achievement.earned ? 'text-primary-foreground' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{achievement.title}</h3>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                    <Badge variant={achievement.earned ? 'default' : 'secondary'}>
                      {achievement.points} points
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="ai-companion" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-primary" />
                <span>Myles AI Learning Companion</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Your personal AI tutor for homework help and study guidance
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Interactive AI companion interface would be implemented here with:
                <br />• Homework assistance (guided, not direct answers)
                <br />• Personalized study plans
                <br />• Exam preparation schedules
                <br />• Career guidance and exploration
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Personal Learning Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Goal setting and tracking interface with progress visualization,
                milestone celebrations, and AI-powered achievement guidance would be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentPanel;