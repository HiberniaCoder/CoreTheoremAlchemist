
"use client"
export const dynamic = 'force-dynamic';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { RevenueChart } from '@/components/analytics/revenue-chart';
import { EngagementChart } from '@/components/analytics/engagement-chart';
import { TrafficSourceChart } from '@/components/analytics/traffic-source-chart';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Analytics</h1>
        <p className="text-muted-foreground">
          Dive deep into your performance metrics.
        </p>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue & Sales</TabsTrigger>
          <TabsTrigger value="engagement">User Engagement</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Monthly Revenue</CardTitle>
              <CardDescription>
                Comparison of revenue streams over the past year.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <RevenueChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">User Engagement</CardTitle>
              <CardDescription>
                Tracking active users and session duration.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <EngagementChart />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="traffic">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Website Traffic Sources</CardTitle>
              <CardDescription>
                Breakdown of where your users are coming from.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2 flex justify-center">
              <TrafficSourceChart />
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
