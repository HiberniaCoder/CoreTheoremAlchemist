"use client"

import type { GenerateKpiForecastOutput } from "@/ai/flows/generate-kpi-forecast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import { BrainCircuit } from "lucide-react"

interface ForecastDisplayProps {
  result: GenerateKpiForecastOutput
  historicalData: string
}

export function ForecastDisplay({ result, historicalData }: ForecastDisplayProps) {
  const historicalPoints = historicalData.split(",").map(v => parseFloat(v.trim()))
  const forecastPoints = result.forecast.split(",").map(v => parseFloat(v.trim()))

  const chartData = historicalPoints.map((value, index) => ({
    period: index + 1,
    historical: value,
    forecast: null,
  }));

  forecastPoints.forEach((value, index) => {
    chartData.push({
      period: historicalPoints.length + index + 1,
      historical: null,
      forecast: value,
    })
  })

  const chartConfig = {
    historical: {
      label: "Historical",
      color: "hsl(var(--muted-foreground))",
    },
    forecast: {
      label: "Forecast",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig

  return (
    <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-primary flex items-center gap-2">
                    <BrainCircuit className="h-6 w-6" />
                    Forecast Analysis
                </CardTitle>
                <CardDescription>An AI-powered analysis of your forecast.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-foreground/90">{result.analysis}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Forecast Visualization</CardTitle>
                <CardDescription>Historical data vs. AI-generated forecast.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px] w-full">
                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                        <XAxis dataKey="period" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                        <Legend />
                        <Line type="monotone" dataKey="historical" stroke="var(--color-historical)" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="forecast" stroke="var(--color-forecast)" strokeWidth={2} strokeDasharray="5 5"/>
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    </div>
  )
}
