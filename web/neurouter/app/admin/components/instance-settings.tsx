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
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { Plus, RefreshCw } from "lucide-react"

export function InstanceSettings() {
  const [instances, setInstances] = useState([
    { id: 1, name: "主服务器", type: "API服务器", status: "running", ip: "10.0.1.5", port: 3000, load: 42 },
    { id: 2, name: "备用服务器", type: "API服务器", status: "running", ip: "10.0.1.6", port: 3000, load: 28 },
    { id: 3, name: "数据库服务器", type: "数据库", status: "running", ip: "10.0.1.7", port: 5432, load: 35 },
    { id: 4, name: "缓存服务器", type: "缓存", status: "stopped", ip: "10.0.1.8", port: 6379, load: 0 },
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>实例管理</CardTitle>
          <CardDescription>管理系统的服务器实例</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              刷新状态
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  添加实例
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>添加服务器实例</DialogTitle>
                  <DialogDescription>添加新的服务器实例到系统中</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="instance-name">实例名称</Label>
                    <Input id="instance-name" placeholder="例如：API服务器3" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instance-type">实例类型</Label>
                    <Select>
                      <SelectTrigger id="instance-type">
                        <SelectValue placeholder="选择实例类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="api">API服务器</SelectItem>
                        <SelectItem value="database">数据库</SelectItem>
                        <SelectItem value="cache">缓存</SelectItem>
                        <SelectItem value="worker">工作节点</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ip-address">IP地址</Label>
                      <Input id="ip-address" placeholder="例如：10.0.1.10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="port">端口</Label>
                      <Input id="port" type="number" placeholder="例如：3000" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="instance-enabled" defaultChecked />
                    <Label htmlFor="instance-enabled">启用</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button>添加实例</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>IP地址</TableHead>
                <TableHead>端口</TableHead>
                <TableHead>负载</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instances.map((instance) => (
                <TableRow key={instance.id}>
                  <TableCell className="font-medium">{instance.name}</TableCell>
                  <TableCell>{instance.type}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        instance.status === "running" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {instance.status === "running" ? "运行中" : "已停止"}
                    </span>
                  </TableCell>
                  <TableCell>{instance.ip}</TableCell>
                  <TableCell>{instance.port}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                        <div
                          className={`h-full rounded-full ${
                            instance.load < 50 ? "bg-green-500" : instance.load < 80 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${instance.load}%` }}
                        ></div>
                      </div>
                      <span>{instance.load}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        {instance.status === "running" ? "停止" : "启动"}
                      </Button>
                      <Button variant="outline" size="sm">
                        重启
                      </Button>
                      <Button variant="outline" size="sm">
                        编辑
                      </Button>
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
