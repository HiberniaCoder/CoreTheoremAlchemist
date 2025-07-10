"use client"

import { Label, Pie, PieChart, RadialBar, RadialBarChart, Tooltip } from "recharts"

import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  { source: "Organic", value: 45, fill: "var(--color-organic)" },
  { source: "Social", value: 25, fill: "var(--color-social)" },
  { source: "Direct", value: 20, fill: "var(--color-direct)" },
  { source: "Referral", value: 10, fill: "var(--color-referral)" },
];

const chartConfig = {
  value: {
    label: "Visitors",
  },
  organic: {
    label: "Organic",
    color: "hsl(var(--chart-1))",
  },
  social: {
    label: "Social",
    color: "hsl(var(--chart-2))",
  },
  direct: {
    label: "Direct",
    color: "hsl(var(--chart-3))",
  },
  referral: {
    label: "Referral",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function TrafficSourceChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[300px]"
    >
      <RadialBarChart
        data={chartData}
        innerRadius="30%"
        outerRadius="80%"
        startAngle={90}
        endAngle={-270}
      >
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="source" />}
        />
        <RadialBar dataKey="value" background cornerRadius={5} />
        <ChartLegend
            content={<ChartLegendContent nameKey="source" className="flex-wrap" />}
            className="-translate-y-4 flex-wrap items-center justify-center"
        />
      </RadialBarChart>
    </ChartContainer>
  )
}
