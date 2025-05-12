"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DateRange } from "react-day-picker"
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronRight, X } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ModelUsageStatisticsProps {
  date: DateRange | undefined
}

export function ModelUsageStatistics({ date: initialDate }: ModelUsageStatisticsProps) {
  const [usageType, setUsageType] = useState("global")
  const [activityType, setActivityType] = useState("cost")
  const [openModelId, setOpenModelId] = useState<string | null>(null)
  const [date, setDate] = useState<DateRange | undefined>(initialDate)

  // Mock data for model usage
  const dailySpendData = [
    { date: "2023-05-04", spend: 0.6 },
    { date: "2023-05-05", spend: 0.85 },
    { date: "2023-05-06", spend: 0.45 },
  ]

  // Mock data for top API keys
  const topApiKeys = [
    { id: "k1", alias: "Production API", spend: "$0.00" },
    { id: "k2", alias: "Development API", spend: "$0.00" },
    { id: "k3", alias: "Testing API", spend: "$0.00" },
    { id: "k4", alias: "Research API", spend: "$0.00" },
    { id: "k5", alias: "Demo API", spend: "$0.00" },
  ]

  // Mock data for top models
  const topModels = [
    { id: 1, name: "gpt-4", spend: 0.65 },
    { id: 2, name: "gpt-3.5-turbo", spend: 0.45 },
    { id: 3, name: "claude-3-opus", spend: 0.35 },
    { id: 4, name: "claude-3-sonnet", spend: 0.25 },
    { id: 5, name: "gpt-4-turbo", spend: 0.15 },
  ]

  // Mock data for provider spend
  const providerSpendData = [
    { name: "OpenAI", value: 1.25, color: "#10B981" },
    { name: "Anthropic", value: 0.6, color: "#6366F1" },
  ]

  // Provider table data
  const providerTableData = [
    { provider: "OpenAI", spend: "$0.00", successful: 10, failed: 0, tokens: 687 },
    { provider: "Azure", spend: "$0.00", successful: 1, failed: 0, tokens: 30 },
  ]

  // Calculate usage metrics
  const totalRequests = 15
  const successfulRequests = 11
  const failedRequests = 4
  const totalTokens = 867
  const avgCostPerRequest = "$0.0000"

  // Mock data for tokens over time
  const tokensOverTimeData = [
    {
      date: "2023-05-04",
      metrics_prompt_tokens: 40,
      metrics_completion_tokens: 80,
      metrics_total_tokens: 120,
    },
    {
      date: "2023-05-05",
      metrics_prompt_tokens: 150,
      metrics_completion_tokens: 250,
      metrics_total_tokens: 400,
    },
    {
      date: "2023-05-06",
      metrics_prompt_tokens: 80,
      metrics_completion_tokens: 280,
      metrics_total_tokens: 360,
    },
  ]

  // Mock data for requests over time
  const requestsOverTimeData = [
    {
      date: "2023-05-04",
      metrics_successful_requests: 2,
      metrics_failed_requests: 4,
      total_requests: 6,
      spend: 0.12,
      cache_hits: 3,
      cache_misses: 5,
    },
    {
      date: "2023-05-05",
      metrics_successful_requests: 4,
      metrics_failed_requests: 5,
      total_requests: 9,
      spend: 0.18,
      cache_hits: 6,
      cache_misses: 7,
    },
    {
      date: "2023-05-06",
      metrics_successful_requests: 5,
      metrics_failed_requests: 6,
      total_requests: 11,
      spend: 0.22,
      cache_hits: 8,
      cache_misses: 9,
    },
  ]

  // Mock data for model usage
  const modelUsageData = [
    {
      id: "qwen-plus-latest",
      spend: "$0.00",
      requests: 3,
      tokensData: tokensOverTimeData,
      requestsData: requestsOverTimeData,
    },
    {
      id: "gpt-3.5-turbo-1106",
      spend: "$0.00",
      requests: 3,
      tokensData: tokensOverTimeData.map((item) => ({
        ...item,
        metrics_prompt_tokens: item.metrics_prompt_tokens * 1.2,
        metrics_completion_tokens: item.metrics_completion_tokens * 0.9,
        metrics_total_tokens: item.metrics_prompt_tokens * 1.2 + item.metrics_completion_tokens * 0.9,
      })),
      requestsData: requestsOverTimeData.map((item) => ({
        ...item,
        metrics_successful_requests: Math.floor(item.metrics_successful_requests * 1.1),
        metrics_failed_requests: Math.floor(item.metrics_failed_requests * 0.8),
        total_requests: Math.floor(item.total_requests * 1.1),
        spend: item.spend * 1.2,
        cache_hits: Math.floor(item.cache_hits * 1.3),
        cache_misses: Math.floor(item.cache_misses * 0.9),
      })),
    },
    {
      id: "qwen-turbo",
      spend: "$0.00",
      requests: 5,
      tokensData: tokensOverTimeData.map((item) => ({
        ...item,
        metrics_prompt_tokens: item.metrics_prompt_tokens * 0.8,
        metrics_completion_tokens: item.metrics_completion_tokens * 1.2,
        metrics_total_tokens: item.metrics_prompt_tokens * 0.8 + item.metrics_completion_tokens * 1.2,
      })),
      requestsData: requestsOverTimeData.map((item) => ({
        ...item,
        metrics_successful_requests: Math.floor(item.metrics_successful_requests * 1.5),
        metrics_failed_requests: Math.floor(item.metrics_failed_requests * 0.5),
        total_requests: Math.floor(item.total_requests * 1.2),
        spend: item.spend * 0.8,
        cache_hits: Math.floor(item.cache_hits * 1.5),
        cache_misses: Math.floor(item.cache_misses * 0.7),
      })),
    },
    {
      id: "qwen-plus-2025-04-28",
      spend: "$0.00",
      requests: 1,
      tokensData: tokensOverTimeData.map((item) => ({
        ...item,
        metrics_prompt_tokens: item.metrics_prompt_tokens * 0.5,
        metrics_completion_tokens: item.metrics_completion_tokens * 0.5,
        metrics_total_tokens: item.metrics_prompt_tokens * 0.5 + item.metrics_completion_tokens * 0.5,
      })),
      requestsData: requestsOverTimeData.map((item) => ({
        ...item,
        metrics_successful_requests: Math.floor(item.metrics_successful_requests * 0.3),
        metrics_failed_requests: Math.floor(item.metrics_failed_requests * 0.3),
        total_requests: Math.floor(item.total_requests * 0.3),
        spend: item.spend * 0.3,
        cache_hits: Math.floor(item.cache_hits * 0.4),
        cache_misses: Math.floor(item.cache_misses * 0.2),
      })),
    },
  ]

  // Mock data for key usage
  const keyUsageData = [
    {
      id: "k1",
      alias: "Production API",
      spend: "$0.00",
      requests: 4,
      tokensData: tokensOverTimeData,
      requestsData: requestsOverTimeData,
    },
    {
      id: "k2",
      alias: "Development API",
      spend: "$0.00",
      requests: 2,
      tokensData: tokensOverTimeData.map((item) => ({
        ...item,
        metrics_prompt_tokens: item.metrics_prompt_tokens * 1.1,
        metrics_completion_tokens: item.metrics_completion_tokens * 0.8,
        metrics_total_tokens: item.metrics_prompt_tokens * 1.1 + item.metrics_completion_tokens * 0.8,
      })),
      requestsData: requestsOverTimeData.map((item) => ({
        ...item,
        metrics_successful_requests: Math.floor(item.metrics_successful_requests * 1.2),
        metrics_failed_requests: Math.floor(item.metrics_failed_requests * 0.7),
        total_requests: Math.floor(item.total_requests * 1.1),
        spend: item.spend * 1.1,
        cache_hits: Math.floor(item.cache_hits * 1.2),
        cache_misses: Math.floor(item.cache_misses * 0.8),
      })),
    },
    {
      id: "k3",
      alias: "Testing API",
      spend: "$0.00",
      requests: 3,
      tokensData: tokensOverTimeData.map((item) => ({
        ...item,
        metrics_prompt_tokens: item.metrics_prompt_tokens * 0.7,
        metrics_completion_tokens: item.metrics_completion_tokens * 1.3,
        metrics_total_tokens: item.metrics_prompt_tokens * 0.7 + item.metrics_completion_tokens * 1.3,
      })),
      requestsData: requestsOverTimeData.map((item) => ({
        ...item,
        metrics_successful_requests: Math.floor(item.metrics_successful_requests * 1.3),
        metrics_failed_requests: Math.floor(item.metrics_failed_requests * 0.6),
        total_requests: Math.floor(item.total_requests * 1.2),
        spend: item.spend * 0.9,
        cache_hits: Math.floor(item.cache_hits * 1.1),
        cache_misses: Math.floor(item.cache_misses * 0.9),
      })),
    },
    {
      id: "k4",
      alias: "Research API",
      spend: "$0.00",
      requests: 1,
      tokensData: tokensOverTimeData.map((item) => ({
        ...item,
        metrics_prompt_tokens: item.metrics_prompt_tokens * 0.4,
        metrics_completion_tokens: item.metrics_completion_tokens * 0.6,
        metrics_total_tokens: item.metrics_prompt_tokens * 0.4 + item.metrics_completion_tokens * 0.6,
      })),
      requestsData: requestsOverTimeData.map((item) => ({
        ...item,
        metrics_successful_requests: Math.floor(item.metrics_successful_requests * 0.5),
        metrics_failed_requests: Math.floor(item.metrics_failed_requests * 0.5),
        total_requests: Math.floor(item.total_requests * 0.5),
        spend: item.spend * 0.5,
        cache_hits: Math.floor(item.cache_hits * 0.5),
        cache_misses: Math.floor(item.cache_misses * 0.5),
      })),
    },
  ]

  // Function to clear date selection
  const clearDateSelection = () => {
    setDate(undefined)
  }

  return (
    <div className="grid gap-4">
      {/* Usage Type Tabs */}
      <Tabs value={usageType} onValueChange={setUsageType} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="global">Global Usage</TabsTrigger>
          <TabsTrigger value="team">Team Usage</TabsTrigger>
          <TabsTrigger value="tag">Tag Usage</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Date Range Selector */}
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <div className="text-sm font-medium">Select Time Range</div>
        <div className="flex gap-2 w-full max-w-md">
          <Popover>
            <PopoverTrigger asChild>
              <div className="border rounded-md px-3 py-2 flex items-center justify-between flex-1 cursor-pointer hover:bg-accent">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {date?.from ? format(date.from, "MMM d, yyyy") : "Select start date"} -
                    {date?.to ? format(date.to, "MMM d, yyyy") : "Select end date"}
                  </span>
                </div>
                {date?.from && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      clearDateSelection()
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="whitespace-nowrap">
                Select range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-2 grid gap-2">
                <Button
                  variant="outline"
                  className="justify-start font-normal"
                  onClick={() => {
                    const today = new Date()
                    setDate({
                      from: today,
                      to: today,
                    })
                  }}
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  className="justify-start font-normal"
                  onClick={() => {
                    const today = new Date()
                    const yesterday = new Date(today)
                    yesterday.setDate(yesterday.getDate() - 1)
                    setDate({
                      from: yesterday,
                      to: yesterday,
                    })
                  }}
                >
                  Yesterday
                </Button>
                <Button
                  variant="outline"
                  className="justify-start font-normal"
                  onClick={() => {
                    const today = new Date()
                    const weekAgo = new Date(today)
                    weekAgo.setDate(weekAgo.getDate() - 7)
                    setDate({
                      from: weekAgo,
                      to: today,
                    })
                  }}
                >
                  Last 7 days
                </Button>
                <Button
                  variant="outline"
                  className="justify-start font-normal"
                  onClick={() => {
                    const today = new Date()
                    const monthAgo = new Date(today)
                    monthAgo.setDate(monthAgo.getDate() - 30)
                    setDate({
                      from: monthAgo,
                      to: today,
                    })
                  }}
                >
                  Last 30 days
                </Button>
                <Button
                  variant="outline"
                  className="justify-start font-normal"
                  onClick={() => {
                    const today = new Date()
                    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
                    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
                    setDate({
                      from: startOfMonth,
                      to: endOfMonth,
                    })
                  }}
                >
                  This month
                </Button>
                <Button
                  variant="outline"
                  className="justify-start font-normal"
                  onClick={() => {
                    const today = new Date()
                    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
                    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
                    setDate({
                      from: startOfLastMonth,
                      to: endOfLastMonth,
                    })
                  }}
                >
                  Last month
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Activity Type Tabs */}
      <Tabs value={activityType} onValueChange={setActivityType} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="cost">Cost</TabsTrigger>
          <TabsTrigger value="model">Model Activity</TabsTrigger>
          <TabsTrigger value="key">Key Activity</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Project Spend Info */}
      <div className="text-sm text-muted-foreground">
        Project Spend{" "}
        {date?.from && date?.to ? `${format(date.from, "MMM d")} - ${format(date.to, "MMM d, yyyy")}` : "五月 1 - 31"}
      </div>

      {/* Content based on selected tab */}
      {activityType === "cost" && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Spend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Total Spend</p>
                    <p className="text-2xl font-bold">$0.0002</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Max Budget</p>
                    <p className="text-2xl font-bold">No limit</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            <Card className="md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalRequests}</div>
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Successful Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{successfulRequests}</div>
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Failed Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{failedRequests}</div>
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTokens}</div>
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Cost per Request</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgCostPerRequest}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daily Spend</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailySpendData}>
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => {
                      const date = new Date(value)
                      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
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
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                  />
                  <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                  <Bar dataKey="spend" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top API Keys</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="table">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="table">Table View</TabsTrigger>
                    <TabsTrigger value="chart">Chart View</TabsTrigger>
                  </TabsList>
                  <TabsContent value="table" className="pt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Key ID</TableHead>
                          <TableHead>Key Alias</TableHead>
                          <TableHead className="text-right">Spend (USD)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topApiKeys.map((key) => (
                          <TableRow key={key.id}>
                            <TableCell className="font-mono text-xs">{key.id.substring(0, 8)}...</TableCell>
                            <TableCell>{key.alias}</TableCell>
                            <TableCell className="text-right">{key.spend}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  <TabsContent value="chart" className="pt-4">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={topApiKeys} layout="vertical">
                          <XAxis type="number" hide />
                          <YAxis
                            dataKey="alias"
                            type="category"
                            width={100}
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip />
                          <Bar dataKey="spend" fill="#8884d8" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topModels} layout="vertical">
                      <XAxis
                        type="number"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value.toFixed(2)}`}
                      />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={100}
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                      <Bar dataKey="spend" fill="#06b6d4" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Spend by Provider</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-center">
                  <div className="h-[200px] w-[200px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={providerSpendData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {providerSpendData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-xl font-bold">$0.00</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Provider</TableHead>
                        <TableHead>Spend</TableHead>
                        <TableHead>Successful</TableHead>
                        <TableHead>Failed</TableHead>
                        <TableHead>Tokens</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {providerTableData.map((provider) => (
                        <TableRow key={provider.provider}>
                          <TableCell>{provider.provider}</TableCell>
                          <TableCell>{provider.spend}</TableCell>
                          <TableCell>{provider.successful}</TableCell>
                          <TableCell>{provider.failed}</TableCell>
                          <TableCell>{provider.tokens}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Model Activity Tab Content */}
      {activityType === "model" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Overall Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground">Total Requests</div>
                  <div className="text-2xl font-bold mt-1">{totalRequests}</div>
                </div>
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground">Total Successful Requests</div>
                  <div className="text-2xl font-bold mt-1">{successfulRequests}</div>
                </div>
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground">Total Tokens</div>
                  <div className="text-2xl font-bold mt-1">{totalTokens}</div>
                </div>
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground">Total Spend</div>
                  <div className="text-2xl font-bold mt-1">$0.00</div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 mt-4">
                <div className="border rounded-md p-4">
                  <div className="text-sm font-medium mb-4">Total Tokens Over Time</div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={tokensOverTimeData}>
                        <defs>
                          <linearGradient id="colorPrompt" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) => value.substring(5)}
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="metrics_prompt_tokens"
                          name="metrics.prompt_tokens"
                          stroke="#8884d8"
                          fillOpacity={1}
                          fill="url(#colorPrompt)"
                        />
                        <Area
                          type="monotone"
                          dataKey="metrics_completion_tokens"
                          name="metrics.completion_tokens"
                          stroke="#82ca9d"
                          fillOpacity={1}
                          fill="url(#colorCompletion)"
                        />
                        <Area
                          type="monotone"
                          dataKey="metrics_total_tokens"
                          name="metrics.total_tokens"
                          stroke="#8884d8"
                          fillOpacity={1}
                          fill="url(#colorTotal)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <div className="text-sm font-medium mb-4">Total Requests Over Time</div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={requestsOverTimeData}>
                        <defs>
                          <linearGradient id="colorSuccessful" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) => value.substring(5)}
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="metrics_successful_requests"
                          name="metrics.successful_requests"
                          stroke="#10B981"
                          fillOpacity={1}
                          fill="url(#colorSuccessful)"
                        />
                        <Area
                          type="monotone"
                          dataKey="metrics_failed_requests"
                          name="metrics.failed_requests"
                          stroke="#EF4444"
                          fillOpacity={1}
                          fill="url(#colorFailed)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            {modelUsageData.map((model) => (
              <Collapsible
                key={model.id}
                className="border rounded-md"
                open={openModelId === model.id}
                onOpenChange={() => {
                  setOpenModelId(openModelId === model.id ? null : model.id)
                }}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                  <div className="flex items-center gap-2">
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${openModelId === model.id ? "rotate-90" : ""}`}
                    />
                    <span>{model.id}</span>
                  </div>
                  <div className="flex items-center gap-8">
                    <span>{model.spend}</span>
                    <span>{model.requests} requests</span>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 pt-0 border-t">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Usage Details</h4>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Total Requests</TableCell>
                              <TableCell>{model.requests}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Successful Requests</TableCell>
                              <TableCell>{Math.floor(model.requests * 0.8)}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Failed Requests</TableCell>
                              <TableCell>{Math.floor(model.requests * 0.2)}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Total Tokens</TableCell>
                              <TableCell>{model.requests * 100}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Total Spend</TableCell>
                              <TableCell>{model.spend}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>

                      <div>
                        <Tabs defaultValue="requests">
                          <TabsList className="w-full">
                            <TabsTrigger value="requests">Requests</TabsTrigger>
                            <TabsTrigger value="tokens">Tokens</TabsTrigger>
                            <TabsTrigger value="spend">Spend</TabsTrigger>
                            <TabsTrigger value="cache">Cache</TabsTrigger>
                          </TabsList>

                          <TabsContent value="requests" className="pt-4">
                            <div className="h-[200px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={model.requestsData}>
                                  <defs>
                                    <linearGradient id={`colorSuccessful-${model.id}`} x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                                    </linearGradient>
                                    <linearGradient id={`colorFailed-${model.id}`} x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
                                    </linearGradient>
                                    <linearGradient id={`colorTotal-${model.id}`} x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1} />
                                    </linearGradient>
                                  </defs>
                                  <XAxis
                                    dataKey="date"
                                    tickFormatter={(value) => value.substring(5)}
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                  />
                                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                  <Tooltip />
                                  <Area
                                    type="monotone"
                                    dataKey="metrics_successful_requests"
                                    name="Successful"
                                    stroke="#10B981"
                                    fillOpacity={1}
                                    fill={`url(#colorSuccessful-${model.id})`}
                                  />
                                  <Area
                                    type="monotone"
                                    dataKey="metrics_failed_requests"
                                    name="Failed"
                                    stroke="#EF4444"
                                    fillOpacity={1}
                                    fill={`url(#colorFailed-${model.id})`}
                                  />
                                  <Area
                                    type="monotone"
                                    dataKey="total_requests"
                                    name="Total"
                                    stroke="#6366F1"
                                    fillOpacity={0.5}
                                    fill={`url(#colorTotal-${model.id})`}
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </TabsContent>

                          <TabsContent value="tokens" className="pt-4">
                            <div className="h-[200px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={model.tokensData}>
                                  <defs>
                                    <linearGradient id={`colorPrompt-${model.id}`} x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                                    </linearGradient>
                                    <linearGradient id={`colorCompletion-${model.id}`} x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                                    </linearGradient>
                                    <linearGradient id={`colorTotalTokens-${model.id}`} x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1} />
                                    </linearGradient>
                                  </defs>
                                  <XAxis
                                    dataKey="date"
                                    tickFormatter={(value) => value.substring(5)}
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                  />
                                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                  <Tooltip />
                                  <Area
                                    type="monotone"
                                    dataKey="metrics_prompt_tokens"
                                    name="Prompt Tokens"
                                    stroke="#8884d8"
                                    fillOpacity={1}
                                    fill={`url(#colorPrompt-${model.id})`}
                                  />
                                  <Area
                                    type="monotone"
                                    dataKey="metrics_completion_tokens"
                                    name="Completion Tokens"
                                    stroke="#82ca9d"
                                    fillOpacity={1}
                                    fill={`url(#colorCompletion-${model.id})`}
                                  />
                                  <Area
                                    type="monotone"
                                    dataKey="metrics_total_tokens"
                                    name="Total Tokens"
                                    stroke="#6366F1"
                                    fillOpacity={0.5}
                                    fill={`url(#colorTotalTokens-${model.id})`}
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </TabsContent>

                          <TabsContent value="spend" className="pt-4">
                            <div className="h-[200px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={model.requestsData}>
                                  <defs>
                                    <linearGradient id={`colorSpend-${model.id}`} x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
                                    </linearGradient>
                                  </defs>
                                  <XAxis
                                    dataKey="date"
                                    tickFormatter={(value) => value.substring(5)}
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
                                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                                  />
                                  <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                                  <Area
                                    type="monotone"
                                    dataKey="spend"
                                    name="Spend"
                                    stroke="#06b6d4"
                                    fillOpacity={1}
                                    fill={`url(#colorSpend-${model.id})`}
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </TabsContent>

                          <TabsContent value="cache" className="pt-4">
                            <div className="h-[200px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={model.requestsData}>
                                  <defs>
                                    <linearGradient id={`colorCacheHits-${model.id}`} x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                                    </linearGradient>
                                    <linearGradient id={`colorCacheMisses-${model.id}`} x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
                                    </linearGradient>
                                  </defs>
                                  <XAxis
                                    dataKey="date"
                                    tickFormatter={(value) => value.substring(5)}
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                  />
                                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                  <Tooltip />
                                  <Area
                                    type="monotone"
                                    dataKey="cache_hits"
                                    name="Cache Hits"
                                    stroke="#10B981"
                                    fillOpacity={1}
                                    fill={`url(#colorCacheHits-${model.id})`}
                                  />
                                  <Area
                                    type="monotone"
                                    dataKey="cache_misses"
                                    name="Cache Misses"
                                    stroke="#F59E0B"
                                    fillOpacity={1}
                                    fill={`url(#colorCacheMisses-${model.id})`}
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </>
      )}

      {/* Key Activity Tab Content */}
      {activityType === "key" && (
        <div className="grid gap-4">
          {keyUsageData.map((key) => (
            <Collapsible key={key.id}>
              <CollapsibleTrigger asChild>
                <Card className="mb-2 cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-base font-medium">
                        {key.alias} <span className="text-xs text-muted-foreground ml-2">({key.id})</span>
                      </CardTitle>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">总消耗</div>
                      <div className="text-lg font-bold">{key.spend}</div>
                    </div>
                  </CardHeader>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4">
                  <Tabs defaultValue="requests" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-4 mb-2">
                      <TabsTrigger value="requests">请求</TabsTrigger>
                      <TabsTrigger value="tokens">Token</TabsTrigger>
                      <TabsTrigger value="spend">消耗</TabsTrigger>
                      <TabsTrigger value="cache">缓存</TabsTrigger>
                    </TabsList>
                    <TabsContent value="requests" className="pt-4">
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={key.requestsData}>
                            <defs>
                              <linearGradient id={`colorSuccessful-key-${key.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                              </linearGradient>
                              <linearGradient id={`colorFailed-key-${key.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
                              </linearGradient>
                              <linearGradient id={`colorTotal-key-${key.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="date" tickFormatter={(value) => value.substring(5)} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="metrics_successful_requests" name="成功" stroke="#10B981" fillOpacity={1} fill={`url(#colorSuccessful-key-${key.id})`} />
                            <Area type="monotone" dataKey="metrics_failed_requests" name="失败" stroke="#EF4444" fillOpacity={1} fill={`url(#colorFailed-key-${key.id})`} />
                            <Area type="monotone" dataKey="total_requests" name="总数" stroke="#6366F1" fillOpacity={0.5} fill={`url(#colorTotal-key-${key.id})`} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                    <TabsContent value="tokens" className="pt-4">
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={key.tokensData}>
                            <defs>
                              <linearGradient id={`colorPrompt-key-${key.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                              </linearGradient>
                              <linearGradient id={`colorCompletion-key-${key.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                              </linearGradient>
                              <linearGradient id={`colorTotalTokens-key-${key.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="date" tickFormatter={(value) => value.substring(5)} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="metrics_prompt_tokens" name="Prompt Tokens" stroke="#8884d8" fillOpacity={1} fill={`url(#colorPrompt-key-${key.id})`} />
                            <Area type="monotone" dataKey="metrics_completion_tokens" name="Completion Tokens" stroke="#82ca9d" fillOpacity={1} fill={`url(#colorCompletion-key-${key.id})`} />
                            <Area type="monotone" dataKey="metrics_total_tokens" name="Total Tokens" stroke="#6366F1" fillOpacity={0.5} fill={`url(#colorTotalTokens-key-${key.id})`} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                    <TabsContent value="spend" className="pt-4">
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={key.requestsData}>
                            <defs>
                              <linearGradient id={`colorSpend-key-${key.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="date" tickFormatter={(value) => value.substring(5)} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value.toFixed(2)}`} />
                            <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                            <Area type="monotone" dataKey="spend" name="消耗" stroke="#06b6d4" fillOpacity={1} fill={`url(#colorSpend-key-${key.id})`} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                    <TabsContent value="cache" className="pt-4">
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={key.requestsData}>
                            <defs>
                              <linearGradient id={`colorCacheHits-key-${key.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                              </linearGradient>
                              <linearGradient id={`colorCacheMisses-key-${key.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="date" tickFormatter={(value) => value.substring(5)} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="cache_hits" name="Cache Hits" stroke="#10B981" fillOpacity={1} fill={`url(#colorCacheHits-key-${key.id})`} />
                            <Area type="monotone" dataKey="cache_misses" name="Cache Misses" stroke="#F59E0B" fillOpacity={1} fill={`url(#colorCacheMisses-key-${key.id})`} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  )
}
