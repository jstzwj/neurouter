"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState } from "react"
import type { ModelData } from "../types"

interface ActivityTabProps {
  model: ModelData
}

export function ActivityTab({ model }: ActivityTabProps) {
  const [timeRange, setTimeRange] = useState("2_weeks")

  // Mock data for the activity chart
  const activityData = [
    { date: "Apr 29", input: 5, prompt: 2, completion: 1, total: 8 },
    { date: "Apr 30", input: 18, prompt: 4, completion: 3, total: 25 },
    { date: "May 1", input: 22, prompt: 5, completion: 3, total: 30 },
    { date: "May 2", input: 68, prompt: 7, completion: 5, total: 80 },
    { date: "May 3", input: 42, prompt: 6, completion: 4, total: 52 },
    { date: "May 4", input: 28, prompt: 5, completion: 3, total: 36 },
    { date: "May 5", input: 18, prompt: 4, completion: 3, total: 25 },
    { date: "May 6", input: 24, prompt: 5, completion: 3, total: 32 },
    { date: "May 7", input: 38, prompt: 6, completion: 4, total: 48 },
    { date: "May 8", input: 15, prompt: 4, completion: 2, total: 21 },
    { date: "May 9", input: 5, prompt: 2, completion: 1, total: 8 },
  ]

  const formatYAxis = (value: number) => {
    if (value === 0) return "0"
    if (value < 1000) return `${value}`
    if (value < 1000000) return `${value / 1000}K`
    return `${value / 1000000}M`
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md p-3 shadow-md">
          <p className="font-medium">{label}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm flex items-center">
              <span className="w-3 h-3 inline-block mr-2 bg-[#0088FE]"></span>
              Input: {payload[0].value.toLocaleString()}M
            </p>
            <p className="text-sm flex items-center">
              <span className="w-3 h-3 inline-block mr-2 bg-[#FFBB28]"></span>
              Prompt: {payload[1].value.toLocaleString()}M
            </p>
            <p className="text-sm flex items-center">
              <span className="w-3 h-3 inline-block mr-2 bg-[#00C49F]"></span>
              Completion: {payload[2].value.toLocaleString()}M
            </p>
            <div className="border-t pt-1 mt-1">
              <p className="text-sm font-medium">Total: {payload[0].payload.total.toLocaleString()}M</p>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Recent activity on {model.name}</h2>
          <p className="text-muted-foreground">Tokens processed per day</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24_hours">Last 24 hours</SelectItem>
            <SelectItem value="7_days">Last 7 days</SelectItem>
            <SelectItem value="2_weeks">Last 2 weeks</SelectItem>
            <SelectItem value="30_days">Last 30 days</SelectItem>
            <SelectItem value="90_days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activityData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis
                  tickFormatter={formatYAxis}
                  domain={[0, 100]}
                  label={{
                    value: "Tokens (millions)",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle" },
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="input" stackId="a" fill="#0088FE" name="Input" />
                <Bar dataKey="prompt" stackId="a" fill="#FFBB28" name="Prompt" />
                <Bar dataKey="completion" stackId="a" fill="#00C49F" name="Completion" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Tokens (30 days)</p>
              <p className="text-2xl font-bold">365.2M</p>
              <p className="text-sm text-green-500">↑ 12.4% from last month</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Average Daily Usage</p>
              <p className="text-2xl font-bold">12.2M</p>
              <p className="text-sm text-green-500">↑ 8.7% from last month</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Peak Usage</p>
              <p className="text-2xl font-bold">80M</p>
              <p className="text-sm text-muted-foreground">on May 2, 2023</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "AI Assistant", usage: "124.5M", percentage: 34 },
              { name: "Content Generator", usage: "98.3M", percentage: 27 },
              { name: "Code Helper", usage: "76.2M", percentage: 21 },
              { name: "Data Analyzer", usage: "42.1M", percentage: 12 },
              { name: "Others", usage: "24.1M", percentage: 6 },
            ].map((app, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{app.name}</p>
                  <p className="text-sm text-muted-foreground">{app.usage} tokens</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${app.percentage}%` }}></div>
                  </div>
                  <span className="text-sm">{app.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
