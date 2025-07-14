import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Loader2,
  ArrowRight,
  Zap,
  Image as ImageIcon,
  Layers,
  Settings,
  Play,
  Pause
} from 'lucide-react';
import { UserPersona } from './ObiModal';
import { sampleWorkflows, WorkflowStep } from '../lib/firefly-simulation';

interface WorkflowVisualizationProps {
  activeWorkflow: string | null;
  persona: UserPersona;
}

export function WorkflowVisualization({ activeWorkflow, persona }: WorkflowVisualizationProps) {
  const [currentWorkflow, setCurrentWorkflow] = useState<any>(null);
  const [executionProgress, setExecutionProgress] = useState<Record<string, string>>({});
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (activeWorkflow) {
      const workflow = sampleWorkflows.find(w => 
        w.name.toLowerCase().includes(activeWorkflow.toLowerCase())
      ) || sampleWorkflows[0];
      
      setCurrentWorkflow(workflow);
      setExecutionProgress({});
    }
  }, [activeWorkflow]);

  const runWorkflow = async () => {
    if (!currentWorkflow || isRunning) return;
    
    setIsRunning(true);
    
    for (const step of currentWorkflow.steps || []) {
      setExecutionProgress(prev => ({ ...prev, [step.id]: 'processing' }));
      
      // Simulate step execution time
      const timeMs = step.estimated_time.includes('second') ? 
        (parseInt(step.estimated_time) || 5) * 1000 : 2000;
      
      await new Promise(resolve => setTimeout(resolve, timeMs));
      
      setExecutionProgress(prev => ({ ...prev, [step.id]: 'completed' }));
    }
    
    setIsRunning(false);
  };

  const getStepIcon = (step: WorkflowStep) => {
    if (step.type === 'generation') return ImageIcon;
    if (step.type === 'processing') return Layers;
    return Settings;
  };

  const getStepStatus = (stepId: string) => {
    return executionProgress[stepId] || 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-creative-success" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (!currentWorkflow) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <div className="p-6 rounded-full bg-muted/50">
          <Zap className="h-12 w-12 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">No Active Workflow</h3>
          <p className="text-muted-foreground max-w-md">
            Start a conversation or select a quick action to visualize Firefly Services workflows in real-time.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-6">
          {sampleWorkflows.slice(0, 4).map((workflow, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-muted/70"
              onClick={() => setCurrentWorkflow(workflow)}
            >
              <div className="font-medium text-sm">{workflow.name}</div>
              <Badge variant="secondary" className="text-xs">
                {workflow.type}
              </Badge>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  const completedSteps = Object.values(executionProgress).filter(status => status === 'completed').length;
  const totalSteps = currentWorkflow.steps?.length || 0;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Workflow Header */}
      <Card className="border-border/50 bg-gradient-glass">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                {currentWorkflow.name}
              </CardTitle>
              <CardDescription className="mt-1">
                {currentWorkflow.api_endpoint} • {currentWorkflow.estimated_time}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {currentWorkflow.type}
              </Badge>
              <Button
                onClick={runWorkflow}
                disabled={isRunning}
                className="bg-gradient-primary hover:opacity-90"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Running
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Execute
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {isRunning && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{completedSteps}/{totalSteps} steps</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Workflow Steps */}
      <div className="space-y-4">
        {currentWorkflow.steps?.map((step: WorkflowStep, index: number) => {
          const StepIcon = getStepIcon(step);
          const status = getStepStatus(step.id);
          const isActive = status === 'processing';
          const isCompleted = status === 'completed';
          
          return (
            <div key={step.id} className="flex items-center gap-4">
              <div className={`
                p-3 rounded-xl border-2 transition-all duration-300
                ${isActive ? 'border-primary bg-primary/10 shadow-glow' : 
                  isCompleted ? 'border-creative-success bg-creative-success/10' :
                  'border-border bg-muted/30'}
              `}>
                <StepIcon className={`h-5 w-5 ${
                  isActive ? 'text-primary' :
                  isCompleted ? 'text-creative-success' :
                  'text-muted-foreground'
                }`} />
              </div>
              
              <div className="flex-1">
                <Card className={`
                  transition-all duration-300
                  ${isActive ? 'border-primary/50 bg-primary/5 shadow-lg' :
                    isCompleted ? 'border-creative-success/30 bg-creative-success/5' :
                    'border-border/50 bg-card'}
                `}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">{step.name}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          <code className="text-primary text-xs">{step.api_endpoint}</code>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(status)}
                        <Badge variant="outline" className="text-xs">
                          {step.estimated_time}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {step.config && (
                    <CardContent className="pt-0">
                      <div className="text-sm text-muted-foreground">
                        <strong>Configuration:</strong>
                        <pre className="mt-1 text-xs bg-muted/50 p-2 rounded overflow-x-auto">
                          {JSON.stringify(step.config, null, 2)}
                        </pre>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </div>
              
              {index < (currentWorkflow.steps?.length - 1) && (
                <div className="flex flex-col items-center ml-4">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Execution Summary */}
      {Object.keys(executionProgress).length > 0 && (
        <Card className="border-border/50 bg-gradient-glass">
          <CardHeader>
            <CardTitle className="text-lg">Execution Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-creative-success">{completedSteps}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {Object.values(executionProgress).filter(s => s === 'processing').length}
                </div>
                <div className="text-sm text-muted-foreground">Processing</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-muted-foreground">
                  {totalSteps - Object.keys(executionProgress).length}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-destructive">
                  {Object.values(executionProgress).filter(s => s === 'error').length}
                </div>
                <div className="text-sm text-muted-foreground">Errors</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}