"use client"

import React, { useState, useTransition } from "react"
import { ForecastForm } from "@/components/predictions/forecast-form"
import { ForecastDisplay } from "@/components/predictions/forecast-display"
import { generateKpiForecastAction } from "./actions"
import type { GenerateKpiForecastOutput } from "@/ai/flows/generate-kpi-forecast"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function PredictionsPage() {
  const [result, setResult] = useState<GenerateKpiForecastOutput | null>(null)
  const [historicalData, setHistoricalData] = useState<string>("")
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleForecast = async (data: {
    kpiName: string
    historicalData: string
    forecastHorizon: number
  }) => {
    startTransition(async () => {
      setError(null)
      setResult(null)
      try {
        const forecastResult = await generateKpiForecastAction(data)
        if (forecastResult) {
            setResult(forecastResult)
            setHistoricalData(data.historicalData)
        } else {
            setError("The forecast could not be generated. The AI model returned an empty result.")
        }
      } catch (e) {
        setError("An error occurred while generating the forecast. Please check your input and try again.")
        console.error(e)
      }
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">AI Forecasting</h1>
        <p className="text-muted-foreground">
          Use historical data to forecast future KPI performance.
        </p>
      </div>

      <ForecastForm onSubmit={handleForecast} isLoading={isPending} />

      {isPending && (
         <Card>
            <CardContent className="p-6 space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-64 w-full mt-4" />
            </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Forecast Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {result && <ForecastDisplay result={result} historicalData={historicalData} />}
    </div>
  )
}
