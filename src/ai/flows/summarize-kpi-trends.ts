'use server';

/**
 * @fileOverview Summarizes trends across KPIs for users.
 *
 * - summarizeKpiTrends - A function that summarizes trends across KPIs.
 * - SummarizeKpiTrendsInput - The input type for the summarizeKpiTrends function.
 * - SummarizeKpiTrendsOutput - The return type for the summarizeKpiTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeKpiTrendsInputSchema = z.object({
  kpis: z.record(z.string(), z.number()).describe('A record of key performance indicators, where the key is the KPI name and the value is the KPI value.'),
  timePeriod: z.string().describe('The time period for which the KPIs are being summarized (e.g., last week, last month, last quarter).'),
  goal: z.string().describe('The goal or target associated with these KPIs, so the summary includes an assessment of whether the goal is being met.'),
});
export type SummarizeKpiTrendsInput = z.infer<typeof SummarizeKpiTrendsInputSchema>;

const SummarizeKpiTrendsOutputSchema = z.object({
  summary: z.string().describe('A summary of the trends across the KPIs, including whether the goal is being met.'),
});
export type SummarizeKpiTrendsOutput = z.infer<typeof SummarizeKpiTrendsOutputSchema>;

export async function summarizeKpiTrends(input: SummarizeKpiTrendsInput): Promise<SummarizeKpiTrendsOutput> {
  return summarizeKpiTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeKpiTrendsPrompt',
  input: {
    schema: SummarizeKpiTrendsInputSchema,
  },
  output: {
    schema: SummarizeKpiTrendsOutputSchema,
  },
  prompt: `You are an AI assistant helping users understand trends in their key performance indicators (KPIs).

You will be provided with a record of KPIs, a time period, and a goal. Your task is to summarize the trends across the KPIs for the given time period, and to assess whether the goal is being met.

Here is the information:
Time Period: {{{timePeriod}}}
Goal: {{{goal}}}
KPIs: {{#each kpis}}{{{@key}}}: {{{this}}}
{{/each}}

Generate a concise summary of the trends across these KPIs and state whether the goal is being met or not in the summary.
`,
});

const summarizeKpiTrendsFlow = ai.defineFlow(
  {
    name: 'summarizeKpiTrendsFlow',
    inputSchema: SummarizeKpiTrendsInputSchema,
    outputSchema: SummarizeKpiTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
