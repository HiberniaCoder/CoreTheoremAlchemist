export const dynamic = 'force-dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { OverviewChart } from '@/components/dashboard/overview-chart';
import {
  Activity,
  ArrowUpRight,
  DollarSign,
  PlusCircle,
  Users,
  AlertTriangle,
} from 'lucide-react';
import { summarizeKpiTrends } from '@/ai/flows/summarize-kpi-trends';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

async function AiSummaryCard() {
  if (!process.env.GOOGLE_API_KEY) {
    return (
        <Card className="col-span-1 md:col-span-2 xl:col-span-4 bg-destructive/10 border-destructive/50">
             <CardHeader>
                <CardTitle className="font-headline text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6" />
                    Configuration Needed
                </CardTitle>
                 <CardDescription className="text-destructive/80">
                    The AI Summary widget is not configured.
                 </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-destructive/90">
                    Please set the <code>GOOGLE_API_KEY</code> environment variable in a <code>.env.local</code> file to enable this feature. You can get a key from Google AI Studio.
                </p>
            </CardContent>
        </Card>
    )
  }

  const kpis = {
    'Total Revenue': 45231.89,
    'New Customers': 235,
    'Sales Growth': 12.5,
    'Website Traffic': 123456,
  };

  try {
    const summaryData = await summarizeKpiTrends({
        kpis,
        timePeriod: 'this month',
        goal: 'Increase revenue by 10% and acquire 200 new customers.',
    });

    return (
        <Card className="col-span-1 md:col-span-2 xl:col-span-4 bg-accent/30 border-accent/50">
        <CardHeader>
            <CardTitle className="font-headline text-primary flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-6 w-6"
            >
                <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9a9 9 0 0 1-9-9c0-7.2 1.8-9 9-9Z" />
                <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path d="M12 12v6" />
            </svg>
            AI-Powered Summary
            </CardTitle>
            <CardDescription>
            A summary of your performance this month towards your goal.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-foreground/90">{summaryData.summary}</p>
        </CardContent>
        </Card>
    );
  } catch (error) {
      console.error("Error fetching AI summary:", error);
      return (
        <Card className="col-span-1 md:col-span-2 xl:col-span-4 bg-destructive/10 border-destructive/50">
             <CardHeader>
                <CardTitle className="font-headline text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6" />
                    AI Summary Error
                </CardTitle>
                 <CardDescription className="text-destructive/80">
                    Could not fetch the AI-powered summary.
                 </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-destructive/90">
                   There was an issue connecting to the AI service. Please check your API key and try again later.
                </p>
            </CardContent>
        </Card>
      )
  }

}

const AiSummaryCardSkeleton = () => (
    <Card className="col-span-1 md:col-span-2 xl:col-span-4 bg-accent/30 border-accent/50">
        <CardHeader>
            <CardTitle className="font-headline text-primary flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-6 w-6"><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9a9 9 0 0 1-9-9c0-7.2 1.8-9 9-9Z"></path><path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path><path d="M12 12v6"></path></svg>
                AI-Powered Summary
            </CardTitle>
            <CardDescription>A summary of your performance this month towards your goal.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
        </CardContent>
    </Card>
)

export default function DashboardPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your ClarityBoard.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Total Revenue"
          value="$45,231.89"
          change="+20.1% from last month"
          icon={<DollarSign className="h-5 w-5 text-muted-foreground" />}
        />
        <KpiCard
          title="New Customers"
          value="+235"
          change="+15.2% from last month"
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
        />
        <KpiCard
          title="Sales Growth"
          value="+12.5%"
          change="Trending upwards"
          icon={<Activity className="h-5 w-5 text-muted-foreground" />}
        />
        <KpiCard
          title="Website Traffic"
          value="123,456"
          change="+5.1% from last month"
          icon={<ArrowUpRight className="h-5 w-5 text-muted-foreground" />}
        />
        <Suspense fallback={<AiSummaryCardSkeleton />}>
            <AiSummaryCard />
        </Suspense>
        <Card className="col-span-1 md:col-span-2 xl:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Sales Overview</CardTitle>
            <CardDescription>A look at your sales performance over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart />
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2 xl:col-span-4 flex flex-col items-center justify-center border-dashed hover:border-primary hover:bg-muted/50 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <PlusCircle className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-medium">Add Widget</p>
            <p className="text-xs text-muted-foreground/70">Customize your dashboard</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
