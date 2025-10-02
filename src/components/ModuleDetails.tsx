import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Download, 
  Star, 
  Users, 
  Calendar,
  Settings,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { moduleService } from "@/services/moduleService";
import type { Module, ModuleReview } from "@/types/modules";

export const ModuleDetails = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [module, setModule] = useState<Module | null>(null);
  const [reviews, setReviews] = useState<ModuleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    if (moduleId) {
      loadModuleData();
    }
  }, [moduleId]);

  const loadModuleData = async () => {
    try {
      const [moduleData, reviewsData] = await Promise.all([
        moduleService.getModuleById(moduleId!),
        moduleService.getModuleReviews(moduleId!)
      ]);
      setModule(moduleData);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error loading module:', error);
      toast({
        title: "Error",
        description: "Failed to load module details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInstall = async () => {
    if (!module) return;
    
    toast({
      title: "Module Installing",
      description: `${module.name} is being installed...`,
    });
    
    // Simulate installation
    setTimeout(() => {
      toast({
        title: "Module Installed",
        description: `${module.name} has been successfully installed!`,
      });
    }, 2000);
  };

  const handleReviewSubmit = async () => {
    if (!module || !newReview.comment.trim()) return;
    
    try {
      await moduleService.addReview({
        module_id: module.id,
        tenant_id: 'current-tenant', // This would come from auth context
        tenant_name: 'Current Tenant',
        rating: newReview.rating,
        comment: newReview.comment
      });
      
      setNewReview({ rating: 5, comment: "" });
      loadModuleData(); // Reload to show new review
      
      toast({
        title: "Review Added",
        description: "Thank you for your feedback!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Module not found</h3>
        <Button onClick={() => navigate('/app-store')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Store
        </Button>
      </div>
    );
  }

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-muted-foreground'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate?.(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/app-store')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Store
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-primary/10 rounded-xl">
                    <Settings className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{module.name}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {module.description}
                    </CardDescription>
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center space-x-1">
                        {renderStars(module.rating)}
                        <span className="text-sm text-muted-foreground ml-2">
                          ({module.reviews_count} reviews)
                        </span>
                      </div>
                      <Badge variant="outline">v{module.version}</Badge>
                      <Badge variant={module.required_plan === 'basic' ? 'default' : 
                                   module.required_plan === 'professional' ? 'secondary' : 'outline'}>
                        {module.required_plan}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {module.price === 0 ? (
                    <Badge variant="secondary" className="text-lg px-3 py-1">Free</Badge>
                  ) : (
                    <div className="text-2xl font-bold text-primary">
                      KSh {module.price.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="changelog">Changelog</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>About This Module</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {module.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <Label className="text-sm font-medium">Developer</Label>
                      <p className="text-sm text-muted-foreground">{module.developer}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Downloads</Label>
                      <p className="text-sm text-muted-foreground">{module.downloads.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Category</Label>
                      <p className="text-sm text-muted-foreground capitalize">{module.category}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Last Updated</Label>
                      <p className="text-sm text-muted-foreground">
                        {new Date(module.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {module.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Add Your Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Rating</Label>
                    {renderStars(newReview.rating, true, (rating) => 
                      setNewReview(prev => ({ ...prev, rating }))
                    )}
                  </div>
                  <div>
                    <Label>Comment</Label>
                    <Textarea
                      placeholder="Share your experience with this module..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    />
                  </div>
                  <Button onClick={handleReviewSubmit}>Submit Review</Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>
                              {review.tenant_name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{review.tenant_name}</p>
                            <div className="flex items-center space-x-2">
                              {renderStars(review.rating)}
                              <span className="text-xs text-muted-foreground">
                                {new Date(review.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="changelog" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Version History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-2 border-primary pl-4">
                      <div className="flex items-center space-x-2">
                        <Badge>v{module.version}</Badge>
                        <span className="text-sm text-muted-foreground">Latest</span>
                      </div>
                      <p className="text-sm mt-2">Enhanced performance and bug fixes</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(module.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <Button onClick={handleInstall} className="w-full mb-4">
                <Download className="w-4 h-4 mr-2" />
                Install Module
              </Button>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium">
                    {module.price === 0 ? 'Free' : `KSh ${module.price.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Downloads</span>
                  <span className="font-medium">{module.downloads.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center space-x-1">
                    {renderStars(module.rating)}
                    <span className="font-medium">({module.reviews_count})</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Data encryption at rest</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>GDPR compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Regular security audits</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                System Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Minimum Plan:</span>
                <Badge variant="outline" className="ml-2">{module.required_plan}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Storage:</span>
                <span className="ml-2">50MB</span>
              </div>
              <div>
                <span className="text-muted-foreground">Dependencies:</span>
                <span className="ml-2">None</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};