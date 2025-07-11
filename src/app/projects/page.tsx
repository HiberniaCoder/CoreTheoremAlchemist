
export const dynamic = 'force-dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Briefcase,
  CheckCircle,
  Clock,
  MessageSquareWarning,
} from 'lucide-react';
import { SummaryCard } from '@/components/projects/summary-card';

const projects = [
  {
    name: 'ClarityBoard Redesign',
    status: 'In Progress',
    owner: { name: 'Alex Johnson', avatar: 'AJ' },
    progress: 75,
    hours: 120,
    dueDate: '2024-08-15',
  },
  {
    name: 'Mobile App Launch',
    status: 'Needs Review',
    owner: { name: 'Samantha Lee', avatar: 'SL' },
    progress: 90,
    hours: 210,
    dueDate: '2024-07-30',
  },
  {
    name: 'API Integration',
    status: 'Completed',
    owner: { name: 'David Chen', avatar: 'DC' },
    progress: 100,
    hours: 80,
    dueDate: '2024-06-20',
  },
  {
    name: 'Marketing Website',
    status: 'In Progress',
    owner: { name: 'Maria Garcia', avatar: 'MG' },
    progress: 40,
    hours: 65,
    dueDate: '2024-09-01',
  },
  {
    name: 'Q3 Analytics Report',
    status: 'On Hold',
    owner: { name: 'Kenji Tanaka', avatar: 'KT' },
    progress: 10,
    hours: 15,
    dueDate: '2024-09-10',
  },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'In Progress':
      return 'secondary';
    case 'Needs Review':
      return 'default';
    case 'Completed':
      return 'outline';
    case 'On Hold':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export default function ProjectsPage() {
  const totalHours = projects.reduce((acc, p) => acc + p.hours, 0);
  const openProjects = projects.filter(p => p.status !== 'Completed').length;
  const finishedProjects = projects.filter(p => p.status === 'Completed').length;
  const needsAction = projects.filter(p => p.status === 'Needs Review').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Project Overview</h1>
        <p className="text-muted-foreground">
          Track progress and manage your team's projects.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Hours Logged"
          value={`${totalHours} hrs`}
          icon={<Clock className="h-5 w-5 text-muted-foreground" />}
        />
        <SummaryCard
          title="Open Projects"
          value={openProjects}
          icon={<Briefcase className="h-5 w-5 text-muted-foreground" />}
        />
        <SummaryCard
          title="Finished Projects"
          value={finishedProjects}
          icon={<CheckCircle className="h-5 w-5 text-muted-foreground" />}
        />
        <SummaryCard
          title="Requires Client Action"
          value={needsAction}
          icon={
            <MessageSquareWarning className="h-5 w-5 text-muted-foreground" />
          }
          className="bg-primary/10 border-primary/50"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">All Projects</CardTitle>
          <CardDescription>
            A detailed list of all projects, their status, and progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Project Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="w-[150px]">Progress</TableHead>
                <TableHead className="text-right">Hours Logged</TableHead>
                <TableHead className="text-right">Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map(project => (
                <TableRow key={project.name}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(project.status)}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`https://placehold.co/40x40.png?text=${project.owner.avatar}`}
                          alt={project.owner.name}
                          data-ai-hint="person avatar"
                        />
                        <AvatarFallback>{project.owner.avatar}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{project.owner.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="h-2" />
                      <span className="text-xs text-muted-foreground">
                        {project.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{project.hours}</TableCell>
                  <TableCell className="text-right">
                    {project.dueDate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
