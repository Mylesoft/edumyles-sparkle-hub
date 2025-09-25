import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Star, 
  Target,
  Award,
  TrendingUp,
  Users,
  Calendar,
  Zap,
  Crown,
  Medal,
  Gift,
  Heart,
  BookOpen,
  Brain,
  Flame,
  CheckCircle
} from "lucide-react";

const GamificationModule = () => {
  const playerProfile = {
    username: "Sarah Wanjiku",
    level: 12,
    totalPoints: 2850,
    rank: 5,
    streak: 15,
    badges: 8,
    nextLevelPoints: 3000
  };

  const achievements = [
    {
      id: 1,
      title: "Perfect Week",
      description: "Complete all assignments for a full week",
      icon: Calendar,
      category: "academic",
      points: 150,
      rarity: "common",
      earned: true,
      earnedDate: "2 days ago",
      progress: 100
    },
    {
      id: 2,
      title: "Math Champion", 
      description: "Score 90%+ on 5 consecutive math tests",
      icon: Trophy,
      category: "academic",
      points: 300,
      rarity: "rare",
      earned: true,
      earnedDate: "1 week ago",
      progress: 100
    },
    {
      id: 3,
      title: "Peer Helper",
      description: "Help 10 classmates with their studies",
      icon: Users,
      category: "social",
      points: 200,
      rarity: "uncommon",
      earned: true,
      earnedDate: "3 days ago", 
      progress: 100
    },
    {
      id: 4,
      title: "Science Explorer",
      description: "Complete 20 science experiments",
      icon: Brain,
      category: "academic",
      points: 400,
      rarity: "epic",
      earned: false,
      progress: 75,
      requirement: "15/20 experiments completed"
    },
    {
      id: 5,
      title: "Reading Marathon",
      description: "Read 50 books in a term",
      icon: BookOpen,
      category: "academic",
      points: 500,
      rarity: "legendary",
      earned: false,
      progress: 45,
      requirement: "22/50 books completed"
    },
    {
      id: 6,
      title: "Innovation Master",
      description: "Create 3 original projects",
      icon: Zap,
      category: "creativity",
      points: 350,
      rarity: "epic",
      earned: false,
      progress: 33,
      requirement: "1/3 projects completed"
    }
  ];

  const leaderboards = [
    {
      category: "Overall Points",
      type: "school",
      players: [
        { rank: 1, name: "John Doe", points: 3200, badge: "👑", change: "🔥" },
        { rank: 2, name: "Mary Njeri", points: 3050, badge: "🥈", change: "⬆️" },
        { rank: 3, name: "David Kiprotich", points: 2950, badge: "🥉", change: "⬇️" },
        { rank: 4, name: "Grace Wanjiru", points: 2900, badge: "⭐", change: "⬆️" },
        { rank: 5, name: "Sarah Wanjiku", points: 2850, badge: "⭐", change: "➡️" }
      ]
    },
    {
      category: "Mathematics",
      type: "grade",
      players: [
        { rank: 1, name: "Sarah Wanjiku", points: 850, badge: "👑", change: "🔥" },
        { rank: 2, name: "Peter Mwangi", points: 820, badge: "🥈", change: "⬆️" },
        { rank: 3, name: "Alice Nyong", points: 800, badge: "🥉", change: "➡️" }
      ]
    },
    {
      category: "Weekly Streaks",
      type: "class",
      players: [
        { rank: 1, name: "Sarah Wanjiku", points: 15, badge: "🔥", change: "🔥" },
        { rank: 2, name: "Michael Ochieng", points: 12, badge: "⚡", change: "⬆️" },
        { rank: 3, name: "Lucy Wambui", points: 10, badge: "💫", change: "➡️" }
      ]
    }
  ];

  const challenges = [
    {
      id: 1,
      title: "Reading Rainbow Challenge",
      description: "Read 5 books from different genres this month",
      type: "monthly",
      category: "academic",
      reward: 400,
      participants: 156,
      timeLeft: "12 days",
      progress: 60,
      status: "active",
      difficulty: "medium"
    },
    {
      id: 2,
      title: "Science Fair Innovators",
      description: "Create and present an original science project",
      type: "event",
      category: "creativity",
      reward: 600,
      participants: 89,
      timeLeft: "25 days",
      progress: 25,
      status: "active", 
      difficulty: "hard"
    },
    {
      id: 3,
      title: "Attendance Excellence",
      description: "Perfect attendance for the entire term",
      type: "term",
      category: "behavior",
      reward: 300,
      participants: 234,
      timeLeft: "45 days",
      progress: 85,
      status: "active",
      difficulty: "easy"
    },
    {
      id: 4,
      title: "Math Olympics Prep",
      description: "Complete advanced math problem sets",
      type: "weekly",
      category: "academic",
      reward: 250,
      participants: 67,
      timeLeft: "3 days",
      progress: 90,
      status: "ending_soon",
      difficulty: "hard"
    }
  ];

  const rewards = [
    {
      id: 1,
      name: "Extra Break Time",
      description: "15 minutes additional break",
      cost: 150,
      category: "time",
      availability: "Unlimited",
      icon: "⏰",
      canRedeem: true
    },
    {
      id: 2,
      name: "Homework Pass",
      description: "Skip one homework assignment",
      cost: 300,
      category: "academic",
      availability: "2 per term",
      icon: "📝",
      canRedeem: true
    },
    {
      id: 3,
      name: "Library VIP Access",
      description: "Priority access to new books",
      cost: 200,
      category: "privilege",
      availability: "Monthly", 
      icon: "📚",
      canRedeem: true
    },
    {
      id: 4,
      name: "Class Leadership Role",
      description: "Be class captain for a week",
      cost: 500,
      category: "responsibility",
      availability: "1 per month",
      icon: "👑",
      canRedeem: false
    },
    {
      id: 5,
      name: "Pizza Party Contribution",
      description: "Vote for class pizza party theme",
      cost: 100,
      category: "social",
      availability: "Term events",
      icon: "🍕",
      canRedeem: true
    },
    {
      id: 6,
      name: "Tech Lab Extra Time",
      description: "Additional computer lab session",
      cost: 250,
      category: "learning",
      availability: "Weekly",
      icon: "💻",
      canRedeem: true
    }
  ];

  const streakCalendar = [
    { day: 1, completed: true, points: 10 },
    { day: 2, completed: true, points: 10 },
    { day: 3, completed: true, points: 15 },
    { day: 4, completed: true, points: 10 },
    { day: 5, completed: true, points: 20 },
    { day: 6, completed: true, points: 10 },
    { day: 7, completed: true, points: 25 },
    { day: 8, completed: true, points: 10 },
    { day: 9, completed: true, points: 10 },
    { day: 10, completed: true, points: 15 },
    { day: 11, completed: true, points: 10 },
    { day: 12, completed: true, points: 20 },
    { day: 13, completed: true, points: 10 },
    { day: 14, completed: true, points: 25 },
    { day: 15, completed: true, points: 30 },
    { day: 16, completed: false, points: 0 },
    { day: 17, completed: false, points: 0 }
  ];

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'common': return 'text-gray-600';
      case 'uncommon': return 'text-green-600';
      case 'rare': return 'text-blue-600';
      case 'epic': return 'text-purple-600';
      case 'legendary': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch(rarity) {
      case 'common': return 'secondary';
      case 'uncommon': return 'outline';
      case 'rare': return 'default';
      case 'epic': return 'default';
      case 'legendary': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Learning Gamification</h1>
          <p className="text-muted-foreground mt-1">Achievements, challenges & rewards system</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-gradient-primary text-primary-foreground">
            <Crown className="w-3 h-3 mr-1" />
            Level {playerProfile.level}
          </Badge>
          <Badge variant="secondary">
            <Flame className="w-3 h-3 mr-1" />
            {playerProfile.streak} Day Streak
          </Badge>
        </div>
      </div>

      {/* Player Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{playerProfile.totalPoints}</div>
            <div className="text-xs text-muted-foreground">Total Points</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">#{playerProfile.rank}</div>
            <div className="text-xs text-muted-foreground">School Rank</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{playerProfile.level}</div>
            <div className="text-xs text-muted-foreground">Current Level</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{playerProfile.badges}</div>
            <div className="text-xs text-muted-foreground">Badges Earned</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{playerProfile.streak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">
              {playerProfile.nextLevelPoints - playerProfile.totalPoints}
            </div>
            <div className="text-xs text-muted-foreground">To Next Level</div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Level {playerProfile.level} Progress</span>
            <span className="text-sm text-muted-foreground">
              {playerProfile.totalPoints} / {playerProfile.nextLevelPoints} XP
            </span>
          </div>
          <Progress 
            value={(playerProfile.totalPoints / playerProfile.nextLevelPoints) * 100} 
            className="h-3"
          />
        </CardContent>
      </Card>

      {/* Main Gamification Interface */}
      <Tabs defaultValue="achievements" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboards">Leaderboards</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="streaks">Streaks</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card key={achievement.id} className={`shadow-card ${
                  achievement.earned 
                    ? 'border-primary/50 bg-primary/5' 
                    : 'opacity-80'
                }`}>
                  <CardContent className="p-6">
                    <div className="text-center space-y-3">
                      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                        achievement.earned 
                          ? 'bg-gradient-primary' 
                          : 'bg-secondary'
                      }`}>
                        <Icon className={`w-8 h-8 ${
                          achievement.earned 
                            ? 'text-primary-foreground' 
                            : 'text-muted-foreground'
                        }`} />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-sm">{achievement.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {achievement.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          <Badge variant={getRarityBadge(achievement.rarity)} className="text-xs">
                            {achievement.rarity}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {achievement.points} pts
                          </Badge>
                        </div>
                        
                        {achievement.earned ? (
                          <div className="text-xs text-green-600">
                            ✓ Earned {achievement.earnedDate}
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <Progress value={achievement.progress} className="h-2" />
                            <div className="text-xs text-muted-foreground">
                              {achievement.requirement || `${achievement.progress}% complete`}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="leaderboards" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {leaderboards.map((leaderboard, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span>{leaderboard.category}</span>
                  </CardTitle>
                  <Badge variant="outline" className="w-fit text-xs">
                    {leaderboard.type} ranking
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  {leaderboard.players.map((player, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${
                      player.name === playerProfile.username ? 'bg-primary/10 border border-primary/20' : 'bg-secondary/20'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{player.badge}</span>
                        <div>
                          <p className="font-medium text-sm">{player.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Rank #{player.rank}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex items-center space-x-2">
                        <span className="font-bold text-sm">{player.points}</span>
                        <span className="text-sm">{player.change}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className={`shadow-card ${
                challenge.status === 'ending_soon' ? 'border-orange-500/50' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <Badge variant={
                      challenge.status === 'ending_soon' ? 'destructive' : 'default'
                    }>
                      {challenge.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-foreground">{challenge.reward}</p>
                      <p className="text-xs text-muted-foreground">Points</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">{challenge.participants}</p>
                      <p className="text-xs text-muted-foreground">Participants</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">{challenge.timeLeft}</p>
                      <p className="text-xs text-muted-foreground">Remaining</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Your Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-3" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {challenge.difficulty} difficulty
                    </Badge>
                    <Button size="sm" variant="default">
                      <Target className="w-3 h-3 mr-1" />
                      Join Challenge
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <Card key={reward.id} className="shadow-card">
                <CardContent className="p-6">
                  <div className="text-center space-y-3">
                    <div className="text-4xl">{reward.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground">{reward.description}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <Badge variant="outline" className="text-sm">
                          {reward.cost} points
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {reward.category}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        {reward.availability}
                      </p>
                    </div>

                    <Button 
                      variant={reward.canRedeem ? 'default' : 'outline'}
                      disabled={!reward.canRedeem || playerProfile.totalPoints < reward.cost}
                      className="w-full"
                    >
                      <Gift className="w-4 h-4 mr-2" />
                      {reward.canRedeem && playerProfile.totalPoints >= reward.cost 
                        ? 'Redeem' 
                        : `Need ${reward.cost - playerProfile.totalPoints} more points`
                      }
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="streaks" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Streak Calendar */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span>Daily Streak Calendar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div key={index} className="text-center text-sm font-medium text-muted-foreground p-2">
                      {day}
                    </div>
                  ))}
                  {streakCalendar.map((day, index) => (
                    <div key={index} className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium ${
                      day.completed 
                        ? 'bg-gradient-primary text-primary-foreground' 
                        : 'bg-secondary text-muted-foreground'
                    }`}>
                      {day.day}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{playerProfile.streak} Days</p>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                </div>
              </CardContent>
            </Card>

            {/* Streak Rewards */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>Streak Milestones</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { days: 7, reward: "50 bonus points", achieved: true },
                  { days: 14, reward: "Achievement badge", achieved: true },
                  { days: 21, reward: "Special privileges", achieved: false },
                  { days: 30, reward: "Legendary status", achieved: false },
                  { days: 50, reward: "Hall of Fame entry", achieved: false }
                ].map((milestone, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                    milestone.achieved ? 'bg-green-50 dark:bg-green-950/20' : 'bg-secondary/20'
                  }`}>
                    <div className="flex items-center space-x-3">
                      {milestone.achieved ? 
                        <CheckCircle className="w-5 h-5 text-green-600" /> :
                        <Target className="w-5 h-5 text-muted-foreground" />
                      }
                      <div>
                        <p className="font-medium text-sm">{milestone.days} Day Streak</p>
                        <p className="text-xs text-muted-foreground">{milestone.reward}</p>
                      </div>
                    </div>
                    {milestone.achieved ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        {milestone.days - playerProfile.streak} days to go
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Gamification Analytics & Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Comprehensive progress analytics with performance trends, engagement metrics,
                achievement analytics, and gamification effectiveness tracking would be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GamificationModule;