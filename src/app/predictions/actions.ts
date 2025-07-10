"use server"

import {
  generateKpiForecast,
  type GenerateKpiForecastInput,
} from "@/ai/flows/generate-kpi-forecast"
import { z } from "zod"

const inputSchema = z.object({
  kpiName: z.string(),
  historicalData: z.string(),
  forecastHorizon: z.number(),
})

export async function generateKpiForecastAction(input: GenerateKpiForecastInput) {
  const parsedInput = inputSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error("Invalid input for forecast generation.");
  }
  
  try {
    const result = await generateKpiForecast(parsedInput.data);
    return result;
  } catch (error) {
    console.error("Error in generateKpiForecast flow:", error);
    // Depending on the desired behavior, you might want to return null,
    // or re-throw a more user-friendly error.
    return null;
  }
}
