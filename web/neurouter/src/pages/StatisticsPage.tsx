"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
} from "recharts"
import { Search, ChevronLeft, ChevronRight, Calendar, Clock, User, MapPin, Monitor, ArrowUpRight } from "lucide-react"

// Mock user data
interface UserType {
    id: string
    name: string
    email: string
    role: string
    lastLogin: string
    status: "active" | "inactive" | "pending"
    registeredDate: string
}

// Mock login data
interface LoginRecord {
    id: string
    userId: string
    userName: string
    timestamp: string
    ipAddress: string
    device: string
    location: string
    status: "success" | "failed"
}

export default function StatisticsPage() {
    const { t } = useTranslation()
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage] = useState(10)
    const [users, setUsers] = useState<UserType[]>([])
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>([])
    const [recentLogins, setRecentLogins] = useState<LoginRecord[]>([])

    // Mock data for usage statistics
    const usageData = [
        { name: "Jan", tokens: 4000, cost: 240 },
        { name: "Feb", tokens: 3000, cost: 180 },
        { name: "Mar", tokens: 2000, cost: 120 },
        { name: "Apr", tokens: 2780, cost: 167 },
        { name: "May", tokens: 1890, cost: 113 },
        { name: "Jun", tokens: 2390, cost: 143 },
        { name: "Jul", tokens: 3490, cost: 209 },
    ]

    // Mock data for model usage
    const modelData = [
        { name: "GPT-4o", value: 400 },
        { name: "Claude 3", value: 300 },
        { name: "Gemini", value: 300 },
        { name: "Llama 3", value: 200 },
        { name: "Mistral", value: 100 },
    ]

    // Mock data for user growth
    const userGrowthData = [
        { name: "Jan", users: 400 },
        { name: "Feb", users: 600 },
        { name: "Mar", users: 800 },
        { name: "Apr", users: 1200 },
        { name: "May", users: 1600 },
        { name: "Jun", users: 2100 },
        { name: "Jul", users: 2400 },
    ]

    // Mock data for site visits
    const visitData = [
        { date: "Mon", visits: 2400, uniqueVisitors: 1398, pageViews: 3800 },
        { date: "Tue", visits: 1398, uniqueVisitors: 984, pageViews: 2500 },
        { date: "Wed", visits: 2000, uniqueVisitors: 1200, pageViews: 3200 },
        { date: "Thu", visits: 2780, uniqueVisitors: 1908, pageViews: 4300 },
        { date: "Fri", visits: 1890, uniqueVisitors: 1200, pageViews: 2800 },
        { date: "Sat", visits: 2390, uniqueVisitors: 1400, pageViews: 3100 },
        { date: "Sun", visits: 3490, uniqueVisitors: 2100, pageViews: 4500 },
    ]

    // Generate mock users
    useEffect(() => {
        const mockUsers: UserType[] = Array.from({ length: 50 }, (_, i) => ({
            id: `user-${i + 1}`,
            name: `User ${i + 1}`,
            email: `user${i + 1}@example.com`,
            role: i < 5 ? "Admin" : i < 15 ? "Moderator" : "User",
            lastLogin: new Date(Date.now() - Math.floor(Math.random() * 10) * 86400000).toISOString(),
            status: i % 10 === 0 ? "inactive" : i % 15 === 0 ? "pending" : "active",
            registeredDate: new Date(Date.now() - Math.floor(Math.random() * 365) * 86400000).toISOString(),
        }))

        setUsers(mockUsers)
        setFilteredUsers(mockUsers)

        // Generate mock login records
        const mockLogins: LoginRecord[] = Array.from({ length: 20 }, (_, i) => {
            const userId = `user-${Math.floor(Math.random() * 20) + 1}`
            const userName = `User ${userId.split("-")[1]}`
            return {
                id: `login-${i + 1}`,
                userId,
                userName,
                timestamp: new Date(
                    Date.now() - Math.floor(Math.random() * 7) * 86400000 - Math.floor(Math.random() * 24) * 3600000,
                ).toISOString(),
                ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                device: Math.random() > 0.5 ? "Desktop" : Math.random() > 0.5 ? "Mobile" : "Tablet",
                location: ["New York, US", "London, UK", "Tokyo, JP", "Sydney, AU", "Berlin, DE"][
                    Math.floor(Math.random() * 5)
                ],
                status: Math.random() > 0.9 ? "failed" : "success",
            }
        }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

        setRecentLogins(mockLogins)
    }, [])

    // Filter users based on search query
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredUsers(users)
        } else {
            const query = searchQuery.toLowerCase()
            const filtered = users.filter(
                (user) =>
                    user.name.toLowerCase().includes(query) ||
                    user.email.toLowerCase().includes(query) ||
                    user.role.toLowerCase().includes(query),
            )
            setFilteredUsers(filtered)
        }
        setCurrentPage(1) // Reset to first page when search changes
    }, [searchQuery, users])

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    }

    // Format time for display
    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Site Statistics</h1>

            <Tabs defaultValue="usage" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="usage">Usage Statistics</TabsTrigger>
                    <TabsTrigger value="models">Model Usage</TabsTrigger>
                    <TabsTrigger value="visits">Visit Statistics</TabsTrigger>
                    <TabsTrigger value="logins">Recent Logins</TabsTrigger>
                    <TabsTrigger value="users">User Statistics</TabsTrigger>
                </TabsList>

                <TabsContent value="usage" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Token Usage & Cost</CardTitle>
                            <CardDescription>Monthly token usage and associated costs</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={usageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="tokens" name="Tokens (millions)" fill="#8884d8" />
                                    <Bar yAxisId="right" dataKey="cost" name="Cost ($)" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Tokens</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">19.55M</div>
                                <p className="text-muted-foreground">+12.5% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Cost</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">$1,172</div>
                                <p className="text-muted-foreground">+8.3% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Avg. Cost per 1K tokens</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">$0.06</div>
                                <p className="text-muted-foreground">-2.1% from last month</p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="models" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Model Usage Distribution</CardTitle>
                                <CardDescription>Percentage of tokens used by each model</CardDescription>
                            </CardHeader>
                            <CardContent className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={modelData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={true}
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {modelData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Top Models</CardTitle>
                                <CardDescription>Most used models by token count</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {modelData.map((model, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div
                                                    className="w-3 h-3 rounded-full mr-2"
                                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                ></div>
                                                <span>{model.name}</span>
                                            </div>
                                            <span className="font-medium">{model.value}K tokens</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="visits" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Site Visits</CardTitle>
                            <CardDescription>Daily visits, unique visitors, and page views</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={visitData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="visits"
                                        name="Total Visits"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        fillOpacity={0.3}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="uniqueVisitors"
                                        name="Unique Visitors"
                                        stroke="#82ca9d"
                                        fill="#82ca9d"
                                        fillOpacity={0.3}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="pageViews"
                                        name="Page Views"
                                        stroke="#ffc658"
                                        fill="#ffc658"
                                        fillOpacity={0.3}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">14,348</div>
                                <p className="text-xs text-muted-foreground">+5.2% from last week</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">8,190</div>
                                <p className="text-xs text-muted-foreground">+3.1% from last week</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">20,200</div>
                                <p className="text-xs text-muted-foreground">+7.4% from last week</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">42.8%</div>
                                <p className="text-xs text-muted-foreground">-1.2% from last week</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Top Pages</CardTitle>
                            <CardDescription>Most visited pages on the site</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b pb-2">
                                    <div className="flex items-center">
                                        <ArrowUpRight className="h-4 w-4 mr-2 text-green-500" />
                                        <span className="font-medium">/models</span>
                                    </div>
                                    <span>4,256 views</span>
                                </div>
                                <div className="flex items-center justify-between border-b pb-2">
                                    <div className="flex items-center">
                                        <ArrowUpRight className="h-4 w-4 mr-2 text-green-500" />
                                        <span className="font-medium">/chat</span>
                                    </div>
                                    <span>3,842 views</span>
                                </div>
                                <div className="flex items-center justify-between border-b pb-2">
                                    <div className="flex items-center">
                                        <ArrowUpRight className="h-4 w-4 mr-2 text-green-500" />
                                        <span className="font-medium">/</span>
                                    </div>
                                    <span>2,967 views</span>
                                </div>
                                <div className="flex items-center justify-between border-b pb-2">
                                    <div className="flex items-center">
                                        <ArrowUpRight className="h-4 w-4 mr-2 text-green-500" />
                                        <span className="font-medium">/rankings</span>
                                    </div>
                                    <span>1,853 views</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <ArrowUpRight className="h-4 w-4 mr-2 text-green-500" />
                                        <span className="font-medium">/docs</span>
                                    </div>
                                    <span>1,429 views</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="logins" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Logins</CardTitle>
                            <CardDescription>Last 20 login attempts to the platform</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium">User</th>
                                            <th className="text-left py-3 px-4 font-medium">Date</th>
                                            <th className="text-left py-3 px-4 font-medium">Time</th>
                                            <th className="text-left py-3 px-4 font-medium">IP Address</th>
                                            <th className="text-left py-3 px-4 font-medium">Device</th>
                                            <th className="text-left py-3 px-4 font-medium">Location</th>
                                            <th className="text-left py-3 px-4 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentLogins.map((login) => (
                                            <tr key={login.id} className="border-b hover:bg-muted/50">
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center">
                                                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                                        {login.userName}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center">
                                                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                                        {formatDate(login.timestamp)}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center">
                                                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                                        {formatTime(login.timestamp)}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">{login.ipAddress}</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center">
                                                        <Monitor className="h-4 w-4 mr-2 text-muted-foreground" />
                                                        {login.device}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center">
                                                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                                        {login.location}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${login.status === "success"
                                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                                            }`}
                                                    >
                                                        {login.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Total Logins Today</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">248</div>
                                <p className="text-xs text-muted-foreground">+12% from yesterday</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Failed Login Attempts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">18</div>
                                <p className="text-xs text-muted-foreground">-3% from yesterday</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">142</div>
                                <p className="text-xs text-muted-foreground">+5% from yesterday</p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="users" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Growth</CardTitle>
                            <CardDescription>Monthly active users over time</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={userGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="users" name="Active Users" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Users</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">2,400</div>
                                <p className="text-muted-foreground">+14.3% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>New Users</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">300</div>
                                <p className="text-muted-foreground">+5.2% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Active Users</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">1,850</div>
                                <p className="text-muted-foreground">+9.7% from last month</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>User List</CardTitle>
                            <CardDescription>Search and manage users</CardDescription>
                            <div className="relative w-full max-w-sm mt-2">
                                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search users..."
                                    className="pl-8 pr-4"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium">Name</th>
                                            <th className="text-left py-3 px-4 font-medium">Email</th>
                                            <th className="text-left py-3 px-4 font-medium">Role</th>
                                            <th className="text-left py-3 px-4 font-medium">Status</th>
                                            <th className="text-left py-3 px-4 font-medium">Registered</th>
                                            <th className="text-left py-3 px-4 font-medium">Last Login</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentUsers.map((user) => (
                                            <tr key={user.id} className="border-b hover:bg-muted/50">
                                                <td className="py-3 px-4 font-medium">{user.name}</td>
                                                <td className="py-3 px-4">{user.email}</td>
                                                <td className="py-3 px-4">{user.role}</td>
                                                <td className="py-3 px-4">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.status === "active"
                                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                                : user.status === "inactive"
                                                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                                            }`}
                                                    >
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">{formatDate(user.registeredDate)}</td>
                                                <td className="py-3 px-4">{formatDate(user.lastLogin)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
                                {filteredUsers.length} users
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Previous Page</span>
                                </Button>
                                <div className="text-sm">
                                    Page {currentPage} of {totalPages}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                    <span className="sr-only">Next Page</span>
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
