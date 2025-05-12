"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Search, UserPlus, Edit, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import type { TeamMember } from "../../types/admin"

export default function TeamManagementPanel() {
    const [searchQuery, setSearchQuery] = useState("")
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
        {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            role: "Owner",
            status: "active",
            joinedDate: "2023-01-15",
        },
        {
            id: "2",
            name: "John Doe",
            email: "john@example.com",
            role: "Admin",
            status: "active",
            joinedDate: "2023-02-20",
        },
        {
            id: "3",
            name: "Jane Smith",
            email: "jane@example.com",
            role: "Developer",
            status: "active",
            joinedDate: "2023-03-10",
        },
        {
            id: "4",
            name: "Mike Johnson",
            email: "mike@example.com",
            role: "Viewer",
            status: "active",
            joinedDate: "2023-04-05",
        },
        {
            id: "5",
            name: "Sarah Williams",
            email: "sarah@example.com",
            role: "Developer",
            status: "pending",
            joinedDate: "2023-05-15",
        },
    ])

    const filteredTeamMembers = searchQuery
        ? teamMembers.filter(
            (member) =>
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.role.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        : teamMembers

    return (
        <Card>
            <CardHeader>
                <CardTitle>团队管理</CardTitle>
                <CardDescription>管理团队成员和权限</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-6">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="搜索团队成员..."
                            className="pl-8 pr-4"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        邀请成员
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4 font-medium">成员</th>
                                <th className="text-left py-3 px-4 font-medium">角色</th>
                                <th className="text-left py-3 px-4 font-medium">状态</th>
                                <th className="text-left py-3 px-4 font-medium">加入日期</th>
                                <th className="text-left py-3 px-4 font-medium">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTeamMembers.map((member) => (
                                <tr key={member.id} className="border-b hover:bg-muted/50">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                {member.avatar ? (
                                                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                                ) : (
                                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                                )}
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{member.name}</div>
                                                <div className="text-sm text-muted-foreground">{member.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`${member.role === "Owner" ? "text-primary font-medium" : ""}`}>
                                            {member.role}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${member.status === "active"
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                    : member.status === "inactive"
                                                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                                }`}
                                        >
                                            {member.status === "active" ? "活跃" : member.status === "inactive" ? "非活跃" : "待确认"}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">{new Date(member.joinedDate).toLocaleDateString("zh-CN")}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            {member.role !== "Owner" && (
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}
