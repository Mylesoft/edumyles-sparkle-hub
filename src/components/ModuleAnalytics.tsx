import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp,
  Users,
  Download,
  Star,
  DollarSign,
  Activity,
  Calendar,
  BarChart3
} from "lucide-react";

const downloadData = [
  { month: 'Jan', downloads: 1200, revenue: 15000 },
  { month: 'Feb', downloads: 1900, revenue: 23000 },
  { month: 'Mar', downloads: 2100, revenue: 28000 },
  { month: 'Apr', downloads: 2800, revenue: 35000 },
  { month: 'May', downloads: 3200, revenue: 42000 },
  { month: 'Jun', downloads: 3800, revenue: 48000 },
];

const categoryData = [
  { name: 'Academic', value: 35, color: '#3b82f6' },
  { name: 'Administration', value: 25, color: '#10b981' },
  { name: 'Communication', value: 20, color: '#f59e0b' },
  { name: 'Analytics', value: 12, color: '#ef4444' },
  { name: 'Finance', value: 8, color: '#8b5cf6' },
];

const topModules = [
  { name: 'Student Management', downloads: 18650, rating: 4.9, revenue: 0 },
  { name: 'Parent Portal', downloads: 15420, rating: 4.8, revenue: 8500 },
  { name: 'Library System', downloads: 12340, rating: 4.7, revenue: 9872 },
  { name: 'Fee Management', downloads: 11200, rating: 4.5, revenue: 17920 },
  { name: 'Transport Tracker', downloads: 7890, rating: 4.6, revenue: 14202 },
];

export const ModuleAnalytics = () => {
  const [timeRange, setTimeRange] = useState("6months");

  const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <div className="flex items-center mt-2">
              <TrendingUp className={`w-4 h-4 mr-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {change}
              </span>
              <span className="text-sm text-muted-foreground ml-1">vs last month</span>
            </div>
          </div>
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-primary" />
            Module Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Insights and performance metrics for the EduMyles ecosystem
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          Last updated: {new Date().toLocaleDateString()}
        </Badge>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Downloads"
          value="89,432"
          change="+12.5%"
          icon={Download}
          trend="up"
        />
        <StatCard
          title="Active Modules"
          value="24"
          change="+3"
          icon={Activity}
          trend="up"
        />
        <StatCard
          title="Total Revenue"
          value="KSh 2.4M"
          change="+18.2%"
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Avg Rating"
          value="4.6"
          change="+0.2"
          icon={Star}
          trend="up"
        />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="modules">Top Modules</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Downloads Over Time</CardTitle>
                <CardDescription>Module download trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={downloadData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="downloads" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Growth</CardTitle>
                <CardDescription>Monthly revenue from paid modules</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={downloadData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`KSh ${value.toLocaleString()}`, 'Revenue']} />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{fill: '#10b981', strokeWidth: 2, r: 4}}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="modules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Modules</CardTitle>
              <CardDescription>Most downloaded and highest rated modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topModules.map((module, index) => (
                  <div key={module.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{module.name}</p>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            {module.downloads.toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                            {module.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-primary">
                        {module.revenue === 0 ? 'Free' : `KSh ${module.revenue.toLocaleString()}`}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Revenue
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Module Distribution</CardTitle>
                <CardDescription>Modules by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>Downloads by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">{category.value}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${category.value}%`,
                            backgroundColor: category.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Financial performance by module</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={topModules.filter(m => m.revenue > 0)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`KSh ${value.toLocaleString()}`, 'Revenue']} />
                  <Bar dataKey="revenue" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};