"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A linear area chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "July", desktop: 278 },
  { month: "August", desktop: 189 },
  { month: "September", desktop: 239 },
  { month: "October", desktop: 349 },
  { month: "November", desktop: 295 },
  { month: "December", desktop: 412 },
]

const chartConfig = {
  desktop: {
    label: "Earnings",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function EarningChart() {
  return (
    <Card className="h-full dark:border-[#F4B057]">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <CardTitle className="text-base sm:text-lg">Earnings Overview</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Showing total earning for the last 12 months
            </CardDescription>
          </div>
          <div className="flex w-full items-start pr-5 gap-2 text-sm sm:w-auto">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none"><TrendingUp className="h-4 w-4" />Trending up by 5.2% this month
              </div>

            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-full p-2 sm:p-4 md:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="desktop"
              type="linear"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
