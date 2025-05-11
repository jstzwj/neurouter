"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import Link from "next/link"

export default function UsagePage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [activeTab, setActiveTab] = useState("tokens")

  // Mock data for charts
  const tokenData = [
    { date: "Apr 1", input: 5, output: 3, total: 8 },
    { date: "Apr 5", input: 8, output: 5, total: 13 },
    { date: "Apr 10", input: 12, output: 7, total: 19 },
    { date: "Apr 15", input: 10, output: 6, total: 16 },
    { date: "Apr 20", input: 15, output: 9, total: 24 },
    { date: "Apr 25", input: 18, output: 11, total: 29 },
    { date: "May 1", input: 20, output: 12, total: 32 },
  ]

  const costData = [
    { date: "Apr 1", cost: 0.08 },
    { date: "Apr 5", cost: 0.13 },
    { date: "Apr 10", cost: 0.19 },
    { date: "Apr 15", cost: 0.16 },
    { date: "Apr 20", cost: 0.24 },
    { date: "Apr 25", cost: 0.29 },
    { date: "May 1", cost: 0.32 },
  ]

  const requestsData = [
    { date: "Apr 1", requests: 10 },
    { date: "Apr 5", requests: 15 },
    { date: "Apr 10", requests: 22 },
    { date: "Apr 15", requests: 18 },
    { date: "Apr 20", requests: 25 },
    { date: "Apr 25", requests: 30 },
    { date: "May 1", requests: 35 },
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md p-3 shadow-md">
          <p className="font-medium">{label}</p>
          <div className="space-y-1 mt-2">
            {payload.map((entry: any, index: number) => (
              <p key={index} className="text-sm flex items-center">
                <span className="w-3 h-3 inline-block mr-2" style={{ backgroundColor: entry.color }}></span>
                {entry.name}: {entry.value.toLocaleString()}
              </p>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/credits">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Credits
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Usage</h1>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="cost">Cost</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">141K</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+12%</span> from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Input Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">88K</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+15%</span> from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Output Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">53K</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+8%</span> from last period
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Token Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tokenData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="input" stackId="a" fill="#4D96FF" name="Input Tokens" />
                    <Bar dataKey="output" stackId="a" fill="#6BCB77" name="Output Tokens" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cost">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1.41</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+12%</span> from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Daily Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0.05</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+8%</span> from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Projected Monthly Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1.50</div>
                <p className="text-xs text-muted-foreground">Based on current usage</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cost Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={costData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="cost" stroke="#4D96FF" name="Cost ($)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">155</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+18%</span> from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Daily Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.2</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+10%</span> from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.7%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+1.2%</span> from last period
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Requests Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={requestsData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="requests" stroke="#6BCB77" name="Requests" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
