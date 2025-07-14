import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Upload, 
  Eye, 
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Settings,
  Target
} from 'lucide-react';
import { UserPersona } from './FlariModal';

interface BrandContextManagerProps {
  brandContext: any;
  onBrandContextChange: (context: any) => void;
  persona: UserPersona;
}

interface CustomModel {
  id: string;
  name: string;
  status: 'training' | 'ready' | 'error';
  accuracy: number;
  createdAt: Date;
  assetCount: number;
}

export function BrandContextManager({ 
  brandContext, 
  onBrandContextChange, 
  persona 
}: BrandContextManagerProps) {
  const [customModels, setCustomModels] = useState<CustomModel[]>([
    {
      id: 'brand_holiday_v2',
      name: 'Holiday Campaign 2024',
      status: 'ready',
      accuracy: 94,
      createdAt: new Date('2024-01-15'),
      assetCount: 156
    },
    {
      id: 'brand_summer_v1',
      name: 'Summer Collection',
      status: 'training',
      accuracy: 87,
      createdAt: new Date('2024-01-10'),
      assetCount: 203
    }
  ]);

  const [brandGuidelines, setBrandGuidelines] = useState({
    primaryColor: '#2563eb',
    secondaryColor: '#7c3aed',
    fontFamily: 'Inter, Helvetica',
    logoUsage: 'Always maintain 20px minimum clearspace',
    toneOfVoice: 'Professional, approachable, innovative'
  });

  const [newModelName, setNewModelName] = useState('');
  const [isCreatingModel, setIsCreatingModel] = useState(false);

  const createCustomModel = async () => {
    if (!newModelName.trim() || isCreatingModel) return;

    setIsCreatingModel(true);
    
    // Simulate model creation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newModel: CustomModel = {
      id: `brand_${newModelName.toLowerCase().replace(/\s+/g, '_')}_v1`,
      name: newModelName,
      status: 'training',
      accuracy: 0,
      createdAt: new Date(),
      assetCount: 0
    };

    setCustomModels(prev => [...prev, newModel]);
    setNewModelName('');
    setIsCreatingModel(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <CheckCircle className="h-4 w-4 text-creative-success" />;
      case 'training': return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-creative-success/20 text-creative-success border-creative-success/30';
      case 'training': return 'bg-primary/20 text-primary border-primary/30';
      case 'error': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="models">Custom Models</TabsTrigger>
          <TabsTrigger value="guidelines">Brand Guidelines</TabsTrigger>
          <TabsTrigger value="assets">Asset Library</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="mt-6 space-y-4">
          {/* Create New Model */}
          <Card className="border-border/50 bg-gradient-glass">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Train New Custom Model
              </CardTitle>
              <CardDescription>
                Create a new Custom Model trained on your brand assets for consistent content generation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Model name (e.g., Spring Campaign 2024)"
                    value={newModelName}
                    onChange={(e) => setNewModelName(e.target.value)}
                    disabled={isCreatingModel}
                  />
                </div>
                <Button
                  onClick={createCustomModel}
                  disabled={!newModelName.trim() || isCreatingModel}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  {isCreatingModel ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Model
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Existing Models */}
          <div className="grid gap-4">
            {customModels.map((model) => (
              <Card key={model.id} className="border-border/50 bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{model.name}</CardTitle>
                      <CardDescription className="mt-1">
                        <code className="text-primary text-xs">{model.id}</code>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(model.status)}>
                        {getStatusIcon(model.status)}
                        <span className="ml-1 capitalize">{model.status}</span>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Accuracy</span>
                      <div className="font-medium text-lg">
                        {model.status === 'training' ? '...' : `${model.accuracy}%`}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Training Assets</span>
                      <div className="font-medium text-lg">{model.assetCount}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created</span>
                      <div className="font-medium">
                        {model.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      {model.status === 'ready' && (
                        <Button size="sm" variant="outline">
                          <Target className="h-3 w-3 mr-1" />
                          Use
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guidelines" className="mt-6 space-y-4">
          <Card className="border-border/50 bg-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Brand Guidelines
              </CardTitle>
              <CardDescription>
                Define your brand parameters for consistent AI generation across all assets.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded border border-border"
                      style={{ backgroundColor: brandGuidelines.primaryColor }}
                    />
                    <Input
                      id="primaryColor"
                      value={brandGuidelines.primaryColor}
                      onChange={(e) => setBrandGuidelines(prev => ({
                        ...prev,
                        primaryColor: e.target.value
                      }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded border border-border"
                      style={{ backgroundColor: brandGuidelines.secondaryColor }}
                    />
                    <Input
                      id="secondaryColor"
                      value={brandGuidelines.secondaryColor}
                      onChange={(e) => setBrandGuidelines(prev => ({
                        ...prev,
                        secondaryColor: e.target.value
                      }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontFamily">Typography</Label>
                <Input
                  id="fontFamily"
                  value={brandGuidelines.fontFamily}
                  onChange={(e) => setBrandGuidelines(prev => ({
                    ...prev,
                    fontFamily: e.target.value
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="toneOfVoice">Tone of Voice</Label>
                <Input
                  id="toneOfVoice"
                  value={brandGuidelines.toneOfVoice}
                  onChange={(e) => setBrandGuidelines(prev => ({
                    ...prev,
                    toneOfVoice: e.target.value
                  }))}
                />
              </div>

              <Button className="w-full bg-gradient-primary hover:opacity-90">
                <Settings className="h-4 w-4 mr-2" />
                Update Brand Guidelines
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="mt-6 space-y-4">
          <Card className="border-border/50 bg-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                Brand Asset Library
              </CardTitle>
              <CardDescription>
                Manage your brand assets used for Custom Model training and reference.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">Upload Brand Assets</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop your brand images here, or click to browse.
                  Recommended: 100+ high-quality images representing your brand style.
                </p>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
