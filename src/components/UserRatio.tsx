"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "User ratio over months";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Generate deterministic sample data per year so selecting a different year changes numbers
function sampleDataForYear(year: number) {
  return MONTHS.map((m, i) => ({
    month: m,
    desktop: Math.floor(80 + ((year * 37 + i * 13) % 300)),
  }));
}

const chartConfig = {
  desktop: {
    label: "Users",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function UserRatio() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);

  const years = useMemo(() => {
    // show a small range: current year and 4 previous years
    return Array.from({ length: 5 }).map((_, idx) => currentYear - idx);
  }, [currentYear]);

  const chartData = useMemo(() => sampleDataForYear(year), [year]);

  return (
    <Card className="h-full dark:border-[#F4B057]">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-0">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base sm:text-lg">User Ratio</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{`January - December ${year}`}</CardDescription>
          </div>

          <div className="w-full sm:w-auto">
            <label htmlFor="year-select" className="sr-only">
              Select year
            </label>
            <select
              id="year-select"
              value={String(year)}
              onChange={(e) => setYear(Number(e.target.value))}
              className="bg-sidebar w-full rounded-md border px-3 py-1.5 text-sm sm:w-auto"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-full p-2 sm:p-4 md:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            barCategoryGap="20%"
            barGap={2}
            margin={{ left: -20, right: 10, top: 10, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ fontSize: 12 }}
              className="text-xs sm:text-sm"
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
