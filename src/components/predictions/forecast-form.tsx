"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  kpiName: z.string().min(2, {
    message: "KPI name must be at least 2 characters.",
  }),
  historicalData: z
    .string()
    .min(1, "Historical data is required.")
    .refine(
      (val) => {
        return val.split(",").every((v) => !isNaN(parseFloat(v.trim())))
      },
      { message: "Data must be a comma-separated list of numbers." }
    )
    .refine(
      (val) => {
        return val.split(",").length >= 5
      },
      { message: "Please provide at least 5 data points for a meaningful forecast." }
    ),
  forecastHorizon: z.coerce
    .number()
    .int()
    .min(1, { message: "Forecast horizon must be at least 1." })
    .max(100, { message: "Forecast horizon cannot exceed 100." }),
})

type ForecastFormValues = z.infer<typeof formSchema>

interface ForecastFormProps {
  onSubmit: (values: ForecastFormValues) => void;
  isLoading: boolean;
}

export function ForecastForm({ onSubmit, isLoading }: ForecastFormProps) {
  const form = useForm<ForecastFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kpiName: "Monthly Recurring Revenue",
      historicalData: "1000, 1100, 1050, 1200, 1250, 1300, 1400, 1350, 1500, 1600, 1550, 1700",
      forecastHorizon: 6,
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Forecast Parameters</CardTitle>
        <CardDescription>Enter your KPI data to generate a forecast.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="kpiName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>KPI Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Monthly Sales" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="forecastHorizon"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Forecast Horizon (Periods)</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="e.g., 12" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="historicalData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Historical Data</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter comma-separated values, e.g., 5, 10, 15, 20"
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide your historical data as a comma-separated list of numbers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="min-w-[150px]">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Generating..." : "Generate Forecast"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
