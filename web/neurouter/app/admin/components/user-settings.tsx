"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Search, UserPlus } from "lucide-react"

export function UserSettings() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "张三",
      email: "zhang@example.com",
      role: "管理员",
      status: "active",
      credits: 100.0,
      created: "2023-01-15",
    },
    {
      id: 2,
      name: "李四",
      email: "li@example.com",
      role: "用户",
      status: "active",
      credits: 25.5,
      created: "2023-02-20",
    },
    {
      id: 3,
      name: "王五",
      email: "wang@example.com",
      role: "用户",
      status: "suspended",
      credits: 0.0,
      created: "2023-03-10",
    },
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>用户管理</CardTitle>
          <CardDescription>管理系统用户</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索用户..." className="pl-8" />
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  添加用户
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>添加用户</DialogTitle>
                  <DialogDescription>添加新用户到系统中</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-name">用户名</Label>
                    <Input id="user-name" placeholder="例如：张三" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-email">邮箱</Label>
                    <Input id="user-email" type="email" placeholder="例如：zhang@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-password">密码</Label>
                    <Input id="user-password" type="password" placeholder="设置初始密码" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-role">角色</Label>
                    <Select>
                      <SelectTrigger id="user-role">
                        <SelectValue placeholder="选择角色" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">管理员</SelectItem>
                        <SelectItem value="user">用户</SelectItem>
                        <SelectItem value="guest">访客</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initial-credits">初始积分</Label>
                    <Input id="initial-credits" type="number" step="0.01" placeholder="例如：10.00" />
                  </div>
                </div>
                <DialogFooter>
                  <Button>添加用户</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>用户名</TableHead>
                <TableHead>邮箱</TableHead>
                <TableHead>角色</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>积分余额</TableHead>
                <TableHead>注册日期</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status === "active" ? "活跃" : "已停用"}
                    </span>
                  </TableCell>
                  <TableCell>${user.credits.toFixed(2)}</TableCell>
                  <TableCell>{user.created}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        编辑
                      </Button>
                      <Button variant="outline" size="sm">
                        充值
                      </Button>
                      {user.status === "active" ? (
                        <Button variant="outline" size="sm" className="text-red-500">
                          停用
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="text-green-500">
                          激活
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
