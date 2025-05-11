"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DateRange } from "react-day-picker"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface LoginStatisticsProps {
  date: DateRange | undefined
}

export function LoginStatistics({ date }: LoginStatisticsProps) {
  // Mock data for logins
  const loginData = [
    { date: "2023-04-13", logins: 45 },
    { date: "2023-04-14", logins: 52 },
    { date: "2023-04-15", logins: 48 },
    { date: "2023-04-16", logins: 61 },
    { date: "2023-04-17", logins: 67 },
    { date: "2023-04-18", logins: 72 },
    { date: "2023-04-19", logins: 63 },
    { date: "2023-04-20", logins: 55 },
    { date: "2023-04-21", logins: 51 },
    { date: "2023-04-22", logins: 46 },
    { date: "2023-04-23", logins: 49 },
    { date: "2023-04-24", logins: 58 },
    { date: "2023-04-25", logins: 67 },
    { date: "2023-04-26", logins: 70 },
    { date: "2023-04-27", logins: 64 },
    { date: "2023-04-28", logins: 59 },
    { date: "2023-04-29", logins: 54 },
    { date: "2023-04-30", logins: 53 },
    { date: "2023-05-01", logins: 58 },
    { date: "2023-05-02", logins: 63 },
    { date: "2023-05-03", logins: 69 },
    { date: "2023-05-04", logins: 73 },
    { date: "2023-05-05", logins: 71 },
    { date: "2023-05-06", logins: 65 },
    { date: "2023-05-07", logins: 61 },
    { date: "2023-05-08", logins: 56 },
    { date: "2023-05-09", logins: 60 },
    { date: "2023-05-10", logins: 67 },
    { date: "2023-05-11", logins: 73 },
    { date: "2023-05-12", logins: 77 },
    { date: "2023-05-13", logins: 81 },
  ]

  // Mock data for recent logins
  const recentLogins = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      time: "2023-05-13T14:32:45",
      location: "New York, US",
      device: "Chrome / Windows",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      time: "2023-05-13T13:45:12",
      location: "London, UK",
      device: "Safari / macOS",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      time: "2023-05-13T12:18:33",
      location: "Tokyo, JP",
      device: "Firefox / Linux",
    },
    {
      id: 4,
      name: "Diana Prince",
      email: "diana@example.com",
      time: "2023-05-13T11:05:27",
      location: "Sydney, AU",
      device: "Edge / Windows",
    },
    {
      id: 5,
      name: "Ethan Hunt",
      email: "ethan@example.com",
      time: "2023-05-13T10:42:19",
      location: "Berlin, DE",
      device: "Chrome / Android",
    },
    {
      id: 6,
      name: "Fiona Apple",
      email: "fiona@example.com",
      time: "2023-05-13T09:30:55",
      location: "Paris, FR",
      device: "Safari / iOS",
    },
    {
      id: 7,
      name: "George Miller",
      email: "george@example.com",
      time: "2023-05-13T08:15:40",
      location: "Toronto, CA",
      device: "Chrome / macOS",
    },
    {
      id: 8,
      name: "Hannah Baker",
      email: "hannah@example.com",
      time: "2023-05-13T07:22:11",
      location: "Singapore, SG",
      device: "Firefox / Windows",
    },
    {
      id: 9,
      name: "Ian Malcolm",
      email: "ian@example.com",
      time: "2023-05-13T06:10:05",
      location: "Mumbai, IN",
      device: "Chrome / iOS",
    },
    {
      id: 10,
      name: "Julia Roberts",
      email: "julia@example.com",
      time: "2023-05-13T05:05:30",
      location: "São Paulo, BR",
      device: "Safari / macOS",
    },
  ]

  // Calculate total logins
  const totalLogins = loginData.reduce((sum, item) => sum + item.logins, 0)

  // Calculate unique users (mock data - in a real app this would come from analytics)
  const uniqueUsers = Math.floor(totalLogins * 0.85)

  // Calculate average logins per day
  const avgLoginsPerDay = Math.round(totalLogins / loginData.length)

  // Calculate new user registrations (mock data)
  const newRegistrations = 127

  // Format time for display
  const formatTime = (timeString: string) => {
    const date = new Date(timeString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLogins.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15.3% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+10.8% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Logins/Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgLoginsPerDay}</div>
            <p className="text-xs text-muted-foreground">+5.2% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newRegistrations}</div>
            <p className="text-xs text-muted-foreground">+22.7% from previous period</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Logins</CardTitle>
          <CardDescription>Number of logins per day during the selected period</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={loginData}>
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
              <Bar dataKey="logins" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Logins</CardTitle>
          <CardDescription>Most recent user logins with location and device information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Device</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLogins.map((login) => (
                <TableRow key={login.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`/placeholder.svg?height=32&width=32&text=${login.name.charAt(0)}`}
                        alt={login.name}
                      />
                      <AvatarFallback>{login.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{login.name}</p>
                      <p className="text-xs text-muted-foreground">{login.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{formatTime(login.time)}</TableCell>
                  <TableCell>{login.location}</TableCell>
                  <TableCell>{login.device}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
