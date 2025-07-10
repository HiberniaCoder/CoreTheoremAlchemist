"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "January", subscriptions: 186, sales: 80 },
  { month: "February", subscriptions: 305, sales: 200 },
  { month: "March", subscriptions: 237, sales: 120 },
  { month: "April", subscriptions: 273, sales: 190 },
  { month: "May", subscriptions: 209, sales: 130 },
  { month: "June", subscriptions: 214, sales: 140 },
];

const chartConfig = {
  subscriptions: {
    label: "Subscriptions",
    color: "hsl(var(--primary))",
  },
  sales: {
    label: "One-time Sales",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function RevenueChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <BarChart 
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
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar dataKey="subscriptions" fill="var(--color-subscriptions)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
