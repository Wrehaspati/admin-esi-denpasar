"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Inbox } from "lucide-react"
const chartData = [
  { type: "On Going", events: 10, fill: "var(--color-ongoing)" },
  { type: "Finished", events: 37, fill: "var(--color-finished)" },
  { type: "Request", events: 2, fill: "var(--color-request)" },]

const chartConfig = {
  Events: {
    label: "Events",
  },
  ongoing: {
    label: "On Going",
    color: "hsl(var(--chart-4))",
  },
  finished: {
    label: "Finished",
    color: "hsl(var(--chart-2))",
  },
  request: {
    label: "Request",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig

export function ChartEventInfo() {
  const totalEvents = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.events, 0)
  }, [])

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-start pb-0">
        <CardTitle>Quick Event Information</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-full">
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-w-[200]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="events"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalEvents.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Events
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
