"use client"

import { Bar, BarChart, Line, LineChart, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "January", activeUsers: 2500, sessionDuration: 240 },
  { month: "February", activeUsers: 2800, sessionDuration: 290 },
  { month: "March", activeUsers: 3200, sessionDuration: 310 },
  { month: "April", activeUsers: 3100, sessionDuration: 330 },
  { month: "May", activeUsers: 3400, sessionDuration: 360 },
  { month: "June", activeUsers: 3800, sessionDuration: 350 },
];

const chartConfig = {
  activeUsers: {
    label: "Active Users",
    color: "hsl(var(--primary))",
  },
  sessionDuration: {
    label: "Avg. Session (sec)",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function EngagementChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <ComposedChart 
        accessibilityLayer
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar yAxisId="left" dataKey="activeUsers" fill="var(--color-activeUsers)" radius={[4, 4, 0, 0]} />
        <Line yAxisId="right" type="monotone" dataKey="sessionDuration" stroke="var(--color-sessionDuration)" strokeWidth={2} dot={false} />
      </ComposedChart>
    </ChartContainer>
  )
}
