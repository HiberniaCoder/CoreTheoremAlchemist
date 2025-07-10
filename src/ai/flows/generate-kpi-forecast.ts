// src/ai/flows/generate-kpi-forecast.ts
'use server';
/**
 * @fileOverview Generates a KPI forecast based on historical data.
 *
 * - generateKpiForecast - A function that generates the KPI forecast.
 * - GenerateKpiForecastInput - The input type for the generateKpiForecast function.
 * - GenerateKpiForecastOutput - The return type for the generateKpiForecast function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateKpiForecastInputSchema = z.object({
  kpiName: z.string().describe('The name of the KPI to forecast.'),
  historicalData: z
    .string()
    .describe(
      'Historical data for the KPI, formatted as a comma-separated list of values.'
    ),
  forecastHorizon: z
    .number()
    .describe('The number of periods (e.g., days, weeks, months) to forecast into the future.'),
});
export type GenerateKpiForecastInput = z.infer<typeof GenerateKpiForecastInputSchema>;

const GenerateKpiForecastOutputSchema = z.object({
  forecast: z
    .string()
    .describe(
      'The forecasted KPI values, formatted as a comma-separated list of values.'
    ),
  confidenceInterval: z
    .string()
    .optional()
    .describe(
      'Optional confidence interval for the forecast, formatted as a comma-separated list of values.'
    ),
  analysis: z
    .string()
    .describe('An analysis of the forecast, including key trends and potential drivers.'),
});
export type GenerateKpiForecastOutput = z.infer<typeof GenerateKpiForecastOutputSchema>;

export async function generateKpiForecast(
  input: GenerateKpiForecastInput
): Promise<GenerateKpiForecastOutput> {
  return generateKpiForecastFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateKpiForecastPrompt',
  input: {schema: GenerateKpiForecastInputSchema},
  output: {schema: GenerateKpiForecastOutputSchema},
  prompt: `You are an expert business analyst specializing in KPI forecasting.

You will use the provided historical data to generate a forecast for the specified KPI over the given forecast horizon.

KPI Name: {{{kpiName}}}
Historical Data: {{{historicalData}}}
Forecast Horizon: {{{forecastHorizon}}}

Provide the forecast as a comma-separated list of values.
Provide an analysis of the forecast, including key trends and potential drivers.
If possible, include a confidence interval for the forecast as a comma-separated list of values.

Make sure to include units of measurement. For example, sales should include currency, website traffic should include visits per period.

{{output}}
`,
});

const generateKpiForecastFlow = ai.defineFlow(
  {
    name: 'generateKpiForecastFlow',
    inputSchema: GenerateKpiForecastInputSchema,
    outputSchema: GenerateKpiForecastOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
