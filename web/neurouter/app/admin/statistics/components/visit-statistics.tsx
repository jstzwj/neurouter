"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DateRange } from "react-day-picker"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface VisitStatisticsProps {
  date: DateRange | undefined
}

export function VisitStatistics({ date }: VisitStatisticsProps) {
  // Mock data for visits
  const visitData = [
    { date: "2023-04-13", visits: 120 },
    { date: "2023-04-14", visits: 145 },
    { date: "2023-04-15", visits: 132 },
    { date: "2023-04-16", visits: 167 },
    { date: "2023-04-17", visits: 189 },
    { date: "2023-04-18", visits: 201 },
    { date: "2023-04-19", visits: 176 },
    { date: "2023-04-20", visits: 154 },
    { date: "2023-04-21", visits: 143 },
    { date: "2023-04-22", visits: 128 },
    { date: "2023-04-23", visits: 135 },
    { date: "2023-04-24", visits: 162 },
    { date: "2023-04-25", visits: 187 },
    { date: "2023-04-26", visits: 195 },
    { date: "2023-04-27", visits: 178 },
    { date: "2023-04-28", visits: 165 },
    { date: "2023-04-29", visits: 152 },
    { date: "2023-04-30", visits: 147 },
    { date: "2023-05-01", visits: 163 },
    { date: "2023-05-02", visits: 175 },
    { date: "2023-05-03", visits: 192 },
    { date: "2023-05-04", visits: 205 },
    { date: "2023-05-05", visits: 198 },
    { date: "2023-05-06", visits: 183 },
    { date: "2023-05-07", visits: 170 },
    { date: "2023-05-08", visits: 156 },
    { date: "2023-05-09", visits: 169 },
    { date: "2023-05-10", visits: 187 },
    { date: "2023-05-11", visits: 203 },
    { date: "2023-05-12", visits: 215 },
    { date: "2023-05-13", visits: 227 },
  ]

  // Calculate total visits
  const totalVisits = visitData.reduce((sum, item) => sum + item.visits, 0)

  // Calculate unique visitors (mock data - in a real app this would come from analytics)
  const uniqueVisitors = Math.floor(totalVisits * 0.7)

  // Calculate average time on site (mock data)
  const avgTimeOnSite = "3m 42s"

  // Calculate bounce rate (mock data)
  const bounceRate = "32.5%"

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalVisits.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+12.5% from previous period</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueVisitors.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+8.2% from previous period</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Time on Site</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgTimeOnSite}</div>
          <p className="text-xs text-muted-foreground">+0.3% from previous period</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{bounceRate}</div>
          <p className="text-xs text-muted-foreground">-2.1% from previous period</p>
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Daily Visits</CardTitle>
          <CardDescription>Number of visits per day during the selected period</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visitData}>
              <XAxis
                dataKey="date"
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${date.getMonth() + 1}/${date.getDate()}`
                }}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Bar dataKey="visits" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
