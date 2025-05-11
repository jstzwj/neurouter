"use client"

import { useState } from "react"
import { useI18n } from "@/components/i18n-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function AdminPage() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState("dashboard")

  const usageData = [
    { date: "2023-05-01", tokens: 250 },
    { date: "2023-05-02", tokens: 280 },
    { date: "2023-05-03", tokens: 300 },
    { date: "2023-05-04", tokens: 320 },
    { date: "2023-05-05", tokens: 350 },
    { date: "2023-05-06", tokens: 370 },
    { date: "2023-05-07", tokens: 390 },
    { date: "2023-05-08", tokens: 410 },
    { date: "2023-05-09", tokens: 430 },
    { date: "2023-05-10", tokens: 450 },
  ]

  const users = [
    { id: 1, name: "张三", email: "zhang@example.com", role: "用户", status: "活跃", created: "2023-04-15" },
    { id: 2, name: "李四", email: "li@example.com", role: "管理员", status: "活跃", created: "2023-04-10" },
    { id: 3, name: "王五", email: "wang@example.com", role: "用户", status: "已禁用", created: "2023-04-05" },
    { id: 4, name: "赵六", email: "zhao@example.com", role: "用户", status: "活跃", created: "2023-04-20" },
    { id: 5, name: "钱七", email: "qian@example.com", role: "用户", status: "活跃", created: "2023-04-25" },
  ]

  const apiKeys = [
    { id: "key_123456", name: "生产环境", created: "2023-04-15", lastUsed: "2023-05-10" },
    { id: "key_234567", name: "测试环境", created: "2023-04-20", lastUsed: "2023-05-09" },
    { id: "key_345678", name: "开发环境", created: "2023-04-25", lastUsed: "2023-05-08" },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">{t("admin")}</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">仪表盘</TabsTrigger>
          <TabsTrigger value="users">用户管理</TabsTrigger>
          <TabsTrigger value="models">模型管理</TabsTrigger>
          <TabsTrigger value="api-keys">API 密钥</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">总用户数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,345</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+12%</span> 较上月
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">总 API 调用</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2M</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+18%</span> 较上月
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">总收入</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥45,678</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+8%</span> 较上月
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>API 使用趋势 (十亿 tokens)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={usageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="tokens" stroke="#3b82f6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>用户列表</CardTitle>
              <Button>添加用户</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>姓名</TableHead>
                    <TableHead>邮箱</TableHead>
                    <TableHead>角色</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>创建日期</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.status === "活跃" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>{user.created}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          编辑
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          删除
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>模型管理</CardTitle>
              <Button>添加模型</Button>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">管理平台支持的模型和提供商</p>
              {/* 模型管理内容 */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>API 密钥</CardTitle>
              <Button>创建新密钥</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>密钥 ID</TableHead>
                    <TableHead>名称</TableHead>
                    <TableHead>创建日期</TableHead>
                    <TableHead>最后使用</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell>{key.id}</TableCell>
                      <TableCell>{key.name}</TableCell>
                      <TableCell>{key.created}</TableCell>
                      <TableCell>{key.lastUsed}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          查看
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          撤销
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
